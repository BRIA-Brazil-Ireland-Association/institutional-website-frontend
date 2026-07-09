export default function Home() {
  return (
    <main className="flex min-h-screen bg-stone-50 text-zinc-950">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 border-b border-zinc-200 pb-8">
          <p className="text-sm font-medium tracking-[0.18em] text-zinc-500 uppercase">
            Boilerplate
          </p>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Base Next pronta com Tailwind e React Query.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
              Estrutura inicial limpa para evoluir o site institucional com
              estilos globais, layout raiz e provider de dados client-side.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Tailwind v4",
              description:
                "Configurado via @tailwindcss/postcss e importado no CSS global.",
            },
            {
              title: "App Router",
              description:
                "Layout raiz preservado como Server Component com providers isolados.",
            },
            {
              title: "React Query",
              description:
                "QueryClient inicializado uma vez no browser para uso em componentes client.",
            },
          ].map((item) => (
            <article
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
              key={item.title}
            >
              <h2 className="text-lg font-semibold text-zinc-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
