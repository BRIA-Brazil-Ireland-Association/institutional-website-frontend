# Plano: eventos da OndeTem na section de eventos

Status: **não implementado**. Aguardando as keys/URLs corretas e as decisões da seção "Decisões em aberto".

## Contexto

- A OndeTem expõe os eventos públicos do nosso estabelecimento via Partner API (somente leitura, JSON, uma key por parceiro).
- Variáveis de ambiente: `ONDE_TEM_KEY` e `ONDE_TEM_URL` (já listadas em `.env.example`).
  - Sandbox: `https://uat.ondetem.co/api`
  - Produção: URL enviada junto com a key de produção. Sandbox e produção usam keys diferentes.
- Hoje `useEvents` em `services/api/events.ts` só lê `content/{en,pt-BR}/events.json`, sem rede.
- Cada evento atual tem o formato `{ date: "YYYY-MM-DD", title, description, url? }`.
- Os consumidores são `EventsBanner` (home em modo compact e `/events`), `EventsExplorer`, `EventsCalendar` e `EventCard`. Todos aceitam esse formato.

## Resumo da API (partner-api-guide.pdf)

`GET {ONDE_TEM_URL}/partner/v1/events`

| Item | Valor |
| --- | --- |
| Auth | Header `X-API-Key: otk_...`. Só no servidor, nunca na query string. |
| `page` | Começa em 0. |
| `size` | Padrão 50, máximo 100. |
| `Accept-Language` | `br` (português) ou `en`. Qualquer outro valor retorna português. |
| Total | Header `X-Total-Count`. Paginar até somar esse total. |
| Retorno | Eventos publicados (`ACTIVE`) ou acontecendo agora (`LIVE`), do mais próximo ao mais distante. Privados, cancelados e finalizados nunca vêm. |
| Erros | `400` com body JSON, `401` sem body (key errada, trocada ou desativada), `5xx` temporário. |

Campos do evento: `encryptedId`, `slug`, `title`, `description`, `date` (YYYY-MM-DD), `startTime`/`endTime` (ISO 8601 com timezone), `status`, `isOnlineEvent`, `address`, `latitude`, `longitude`, `cityName`, `imageCoverURL`, `imageSquareCoverURL`, `linkToBuy`, `establishmentName`. Campos sem valor vêm como `null`. Preço e disponibilidade não fazem parte da API.

O endpoint `GET /events/public-id/{encryptedId}` (público, sem key) retorna o detalhe de um evento. Não é necessário neste plano, porque `linkToBuy` já leva ao ingresso.

## Pré-requisito

A key de sandbox atual respondeu **401 sem body** no `GET /partner/v1/events`. O formato da key está correto (`otk_`, sem aspas nem espaços) e o endpoint público da OndeTem está acessível. A causa provável é key errada, substituída, desativada ou de outro ambiente.

Antes de implementar:

- [ ] Obter key e URL corretas com o account manager da OndeTem.
- [ ] Atualizar `.env` local.
- [ ] Confirmar com `curl` que o endpoint responde `200` (comando abaixo) e conferir o formato real do JSON, principalmente `description` e `date` versus `startTime`.
- [ ] Cadastrar `ONDE_TEM_KEY` e `ONDE_TEM_URL` nas envs da Vercel (produção usa a key e a URL de produção).

```bash
set -a && source <(grep -E '^ONDE_TEM_(KEY|URL)=' .env) && set +a
curl -i "$ONDE_TEM_URL/partner/v1/events?page=0&size=50" \
  -H "X-API-Key: $ONDE_TEM_KEY" -H "Accept-Language: en"
```

## Arquitetura

`useEvents` roda no browser, e a key não pode ir para o client. Por isso:

```
EventsBanner (client)
  -> useEvents({ locale })                      services/api/events.ts
       -> fetch /api/events?locale=...          mesma origem
            -> app/api/events/route.ts          servidor, usa ONDE_TEM_KEY
                 -> OndeTem /partner/v1/events  paginado, validado, normalizado
       -> mescla com JSON estático e remove duplicados
```

Não é necessário alterar nenhum componente visual: a normalização entrega o formato que `EventCard` já consome. O `proxy.ts` já ignora `/api`, então o middleware de i18n não interfere.

## Passos de implementação

### 1. Cliente servidor da OndeTem (`libs/ondetem.ts`)

- Lê `ONDE_TEM_KEY` e `ONDE_TEM_URL`. Se faltar alguma, lança erro, no mesmo padrão de `libs/resend.ts`.
- `fetchOndeTemEvents(locale)`:
  - Mapeia `pt-BR` para `br` e `en` para `en` no `Accept-Language`.
  - Usa `size=100` e itera `page` a partir de 0 até acumular `X-Total-Count` eventos ou receber uma página vazia.
  - Teto fixo de páginas (por exemplo 10) para evitar loop.
  - Envia `X-API-Key` por header, com `AbortSignal.timeout(...)` e `next: { revalidate: 300 }`.
  - Qualquer status diferente de `200` vira erro, sem repassar body e sem logar header.
- Schema Zod (`libs/validation.ts` já exporta `z`) do evento, com os campos usados e `nullable()` onde a API pode devolver `null`. Eventos que não passam na validação são descartados individualmente, sem derrubar a lista toda.

### 2. Normalização para o formato do site

Cada evento da API vira `{ date, title, description, url }`:

| Site | API | Regra |
| --- | --- | --- |
| `date` | `date` | Usado como está (YYYY-MM-DD), consistente com `parseEventDate` e `getDublinDateKey`. |
| `title` | `title` | Texto puro; o React já escapa. |
| `description` | `startTime`, `endTime`, `cityName` | Linha curta no estilo atual, por exemplo `19:00 às 20:00 · Dublin`, com o horário formatado em `Europe/Dublin`. Ver decisão 3. |
| `url` | `linkToBuy` | Só se começar com `https://`. Caso contrário omitir. |

Chave interna para deduplicação: `encryptedId`.

### 3. Route handler (`app/api/events/route.ts`)

- `GET /api/events?locale=pt-BR|en`. Valida `locale` com Zod e usa `pt-BR` quando for inválido.
- Retorna `{ data: Event[] }`, no padrão de `app/api/comments`.
- Em qualquer falha (401, 5xx, timeout, key ausente): loga somente o status e o motivo genérico, **nunca a key**, e retorna `{ data: [] }` com `200`. Assim a section continua mostrando os eventos do JSON.
- Cabeçalho `Cache-Control` com `s-maxage` e `stale-while-revalidate` para não bater na OndeTem a cada visita.

### 4. `services/api/events.ts`

- `fetchEvents({ locale })`: busca `/api/events?locale=...`, junta com `EVENTS_BY_LOCALE[locale]` e remove duplicados por `date` + título normalizado (lowercase, sem acentos, sem espaços extras).
- Se o `fetch` do client falhar, retorna só o JSON estático.
- A ordenação continua em `processEvents` dentro de `EventsBanner`, então não muda.
- O hook segue como `useEvents({ locale })` e a `queryKey` (`["events", locale]`) é mantida.

### 5. Verificação

- `yarn prettier --write` nos arquivos alterados.
- `yarn eslint` nos arquivos alterados (ou `yarn lint`).
- `yarn build`.
- Teste manual com `yarn dev` (porta 3002):
  - Home em `pt-BR` e `en`: no máximo 3 próximos eventos, JSON e API misturados e ordenados.
  - `/events`: calendário e lista, grupos de próximos e passados, tema claro e escuro, mobile e desktop.
  - Key inválida ou ausente: a section mostra só os eventos do JSON e o console do servidor não imprime a key.
  - Evento da API com `linkToBuy` mostra "Inscreva-se" e abre em nova aba.

## Arquivos previstos

| Arquivo | Ação |
| --- | --- |
| `libs/ondetem.ts` | Novo. Fetch, paginação, Zod e normalização no servidor. |
| `app/api/events/route.ts` | Novo. Route handler consumido pelo client. |
| `services/api/events.ts` | Alterado. Passa a buscar `/api/events` e mesclar com o JSON. |
| `.env.example` | Já alterado. Conferir que as duas variáveis estão presentes e sem valores reais. |

Nenhum componente em `components/sections/` precisa mudar, e não há dependência nova.

## Riscos e pontos de atenção

- **Eventos passados:** a API só devolve eventos publicados ou em andamento. Um evento da API **desaparece do site** quando termina. Só os eventos do JSON permanecem em "Eventos passados".
- **Fuso horário:** `date` vem pronto, mas `startTime` e `endTime` vêm em UTC (`Z`). Para eventos online ou fora de Dublin, o horário em `Europe/Dublin` pode não ser o do local. Validar com dados reais.
- **Descrição longa:** a `description` da API pode ser extensa, e o card foi desenhado para uma linha curta.
- **Loading:** hoje `isPending` dura um instante, porque os dados são estáticos. Com rede, o `Skeleton` aparece por mais tempo.
- **Sandbox versus produção:** nunca apontar produção para `uat.ondetem.co`.
- **Vazamento:** a key só existe no servidor (`process.env` sem prefixo `NEXT_PUBLIC_`). Não logar headers nem a URL com credenciais.

## Decisões em aberto

Se não houver outra instrução, o padrão abaixo será seguido.

1. **Mesclar ou substituir?** Padrão: **mesclar** a API com o JSON (você pediu "também incluir").
2. **Eventos que terminaram:** Padrão: aceitar que eventos da API somem após o fim. A alternativa é guardar um histórico no Firestore (aumenta o escopo).
3. **Descrição do card:** Padrão: **linha curta** `horário · cidade`. A alternativa é usar o texto da API, truncado.
4. **Badges e extras (LIVE, online, imagem):** Padrão: **não mostrar**, cards idênticos aos atuais.
