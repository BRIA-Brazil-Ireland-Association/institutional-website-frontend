import Footer from "./fragments/footer";
import Header from "./fragments/header";

export default function DefaultTemplate({ children }: any) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
