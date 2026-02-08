import About from "./components/shared/About";
import Hero from "./components/shared/Hero";
import Navbar from "./components/shared/Navbar";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
};

export default App;
