import About from "./components/shared/About";
import Features from "./components/shared/Features";
import Hero from "./components/shared/Hero";
import Navbar from "./components/shared/Navbar";

const App = () => {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
    </main>
  );
};

export default App;
