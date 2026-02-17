import About from "./components/shared/About";
import Contact from "./components/shared/Contact";
import Features from "./components/shared/Features";
import Footer from "./components/shared/Footer";
import Hero from "./components/shared/Hero";
import Navbar from "./components/shared/Navbar";
import Story from "./components/shared/Story";

const App = () => {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
