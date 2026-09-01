# Finalização e refinamento do site para conclusão e entrega

Este documento contém as tarefas necessárias para finalizar e preparar o site para entrega ao cliente.

## Projetos

### Backend

`/Users/mvbassalobre/Projects/institutional-website-backend`

### Frontend

`/Users/mvbassalobre/Projects/institutional-website-frontend`

---

# Regras importantes

## Git

- **NÃO faça commits.**
- **NÃO crie novas branches.**
- Todo o trabalho deve ser realizado na **branch atualmente ativa**.
- Ao finalizar, deixe todas as alterações sem commit para que eu possa revisá-las.

## Conteúdo e frontend

- Todo conteúdo exibido ao usuário deve vir do backend via CMS Strapi.
- Não adicionar conteúdo hardcoded diretamente no frontend.
- No frontend devem ficar apenas:

  - estilos;
  - elementos estruturais;
  - componentes;
  - lógica necessária para apresentação e consumo dos dados.

## Componentes

Antes de criar qualquer novo componente:

1. Verifique os componentes já existentes no frontend.
2. Identifique se existe algum componente semelhante que possa ser reutilizado ou estendido.
3. Priorize reutilização e consistência com a arquitetura existente.
4. Crie um novo componente apenas quando realmente necessário.

## Strapi

Caso seja necessário criar novos conteúdos ou estruturas no backend:

- Utilize `Content Types` coerentes e autoexplicativos.
- Siga os padrões e convenções já existentes no projeto.
- Antes de criar novos endpoints, estruturas ou plugins, verifique se já existe algo equivalente no projeto e priorize seu reaproveitamento.

## Internacionalização

**Todo conteúdo precisa existir em inglês e português.**

Sempre respeite o sistema de internacionalização já existente no Strapi e no frontend.

Não implemente soluções paralelas de tradução caso já exista uma arquitetura definida no projeto.

## UI/UX

Nas tarefas que exigirem criação ou adaptação visual:

- mantenha consistência com o design atual do site;
- reutilize componentes e padrões visuais existentes;
- quando não houver uma referência exata, crie uma solução visual coerente, moderna e bem acabada;
- utilize a skill **UI UX PRO MAX** quando aplicável.

As imagens de referência mencionadas nas tasks devem ser utilizadas principalmente como referência de **conteúdo e requisitos**, adaptando a interface ao design atual do novo site quando necessário.

---

# Processo de execução

Vou listar abaixo, página por página, os pontos que precisam de ajuste antes da entrega ao cliente.

Algumas tarefas podem já estar implementadas.

Antes de implementar cada item:

1. Inspecione a implementação atual no frontend.
2. Inspecione os respectivos dados, Content Types, endpoints e configurações existentes no Strapi.
3. Caso o requisito já esteja completamente implementado e funcionando conforme descrito, não refaça a implementação.
4. Caso esteja parcialmente implementado, preserve o que estiver correto e implemente apenas o que estiver faltando.

---

# Tasks

## 1. Team

Página:

`/team`

O componente já foi estendido anteriormente.

Precisamos adicionar uma classificação por **áreas** e indicar as respectivas **lideranças de cada área**.

### Requisitos

- Criar/adaptar o componente necessário no frontend.
- Os dados devem vir do Strapi.
- Devem existir:

  - nome da área;
  - respectivos líderes da área.

- Utilizar como referência de conteúdo:

`./lideres.png`

A solução visual deve ser integrada ao design atual da página.

---

## 2. Events

Página:

`/events`

O componente já foi estendido anteriormente.

### Requisitos

Precisamos disponibilizar duas formas de visualização dos eventos.

#### Calendar

Mostrar os eventos em formato de calendário.

#### Compact

O modo compacto já existe e deve continuar funcionando como atualmente.

Revise essa implementação e:

- identifique eventuais bugs;
- corrija-os caso existam;
- preserve o comportamento atual quando estiver correto.

---

## 3. News / Blog

Adicionar ao projeto uma funcionalidade de artigos/notícias integrada ao Strapi.

### Antes de implementar

Verifique no Strapi:

- estruturas relacionadas a artigos/blog já existentes;
- plugins relacionados a blog;
- plugins relacionados a comentários;
- funcionalidades que possam ser reaproveitadas.

Priorize o reaproveitamento da infraestrutura existente.

Caso seja necessário adicionar plugins, utilize apenas plugins gratuitos.

### Strapi

Deve ser possível cadastrar artigos com suporte multilíngue.

Os artigos devem suportar os dados necessários para exibir no frontend:

- título;
- slug;
- imagem de capa;
- resumo;
- conteúdo;
- data;
- autor.

Os artigos também devem permitir comentários.

Todo conteúdo deve funcionar em inglês e português utilizando a estrutura de internacionalização existente.

### Navegação

Adicionar no navbar um item direcionando para:

`/news`

O conteúdo/configuração desse item deve vir do Strapi, seguindo o padrão atual da navbar.

### Página de listagem

Criar:

`/news`

Essa página deve seguir o mesmo padrão visual do restante do site.

Exibir os artigos em cards contendo:

- título;
- imagem de capa;
- resumo;
- data.

Os artigos devem ser ordenados por data, do **mais recente para o mais antigo**.

A listagem deve possuir **paginação**.

Ao clicar em um card, o usuário deve ser direcionado para a página completa do artigo.

### Página do artigo

Rota:

`/news/{slug}`

A página deve exibir:

- título;
- imagem de capa;
- conteúdo;
- data;
- autor;
- seção de comentários ao final.

O suporte multilíngue deve funcionar também nas páginas individuais dos artigos.

### Referência

Utilize este artigo do site legado como referência de conteúdo e estrutura:

`https://brazilirelandassociation.org/new-study-who-are-the-brazilians-making-ireland-happen`

Não é necessário reproduzir o design legado. O novo blog/news deve seguir o padrão visual do site atual.

---

## 4. Contact

Página:

`/contact`

O componente já foi estendido anteriormente.

### Navbar

Adicionar **Contato / Contact** ao menu/topbar.

Esse item deve vir do Strapi seguindo o padrão existente da navbar.

### Descrição da seção

A seção de contato deve possuir a seguinte descrição.

#### Português

> Estamos à disposição para dúvidas, parcerias, patrocínios e oportunidades de voluntariado. Preencha o formulário abaixo e nossa equipe retornará o mais breve possível.

#### Inglês

> We're available for questions, partnerships, sponsorships, and volunteer opportunities. Fill out the form below and our team will get back to you as soon as possible.

Esses textos devem existir no Strapi nos respectivos idiomas, não hardcoded no frontend.

### Formulário

Revisar o formulário de contato existente.

Utilizar como referência:

`./contact.png`

Essa imagem representa o formulário do site legado.

Não reproduza necessariamente o design antigo. Utilize os campos e conteúdo relevantes como referência e adapte o formulário ao design atual do novo site.

### Requisitos

- O formulário deve funcionar em inglês e português.
- Validar corretamente os campos obrigatórios.
- Integrar o envio com o backend.
- Antes de criar qualquer endpoint novo, verificar se já existe endpoint ou implementação equivalente no Strapi.
- Reutilizar a infraestrutura existente sempre que possível.

---

## 5. Partners

Revisar o componente/seção de parceiros.

Atualmente os parceiros são exibidos apenas como imagens dentro de cards.

Precisamos enriquecer essa seção.

Utilizar como referência de conteúdo:

`./partners.png`

### Descrição da seção

Adicionar uma descrição antes dos cards dos parceiros.

O conteúdo dessa descrição está disponível em:

`./partners.png`

Esse conteúdo deve vir do Strapi e possuir versões em inglês e português.

### Cards

Cada parceiro deve possuir, além da imagem:

- os textos correspondentes apresentados em `./partners.png`;
- link para o site do parceiro.

O link deve abrir em uma **nova aba**.

Todos os dados devem vir do Strapi.

A apresentação deve ser adaptada ao design atual do site.

---

# Relatório final obrigatório

Ao concluir todas as implementações, gere um relatório final detalhando as alterações realizadas.

Além das alterações técnicas, existe uma informação especialmente importante:

## Alterações manuais necessárias no Strapi de produção

As alterações de estrutura, configuração e código do Strapi serão aplicadas posteriormente no deploy.

Entretanto, **o conteúdo não será automaticamente replicado para produção** e precisará ser preenchido/alterado manualmente.

Por isso, no relatório final, crie uma seção específica chamada:

`Alterações manuais necessárias no Strapi de produção`

Nessa seção, liste de forma objetiva e organizada **todos os conteúdos que eu precisarei cadastrar ou alterar manualmente no Strapi de produção**.

Para cada alteração, informe sempre que possível:

- Content Type;
- campo;
- locale/idioma;
- conteúdo que deve ser inserido;
- relação que precisa ser configurada, quando aplicável;
- página ou componente que utiliza esse conteúdo.

O objetivo é que eu consiga utilizar esse relatório como um checklist para reproduzir facilmente em produção todos os conteúdos criados ou alterados durante esta implementação.
