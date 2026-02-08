import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import Button from "../ui/Button";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const lastScrollYRef = useRef(0);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    const nav = navContainerRef.current;
    if (!nav) return;

    const lastY = lastScrollYRef.current;

    if (currentScrollY === 0) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastY) {
      setIsNavVisible(false); // scrolling down
    } else if (currentScrollY < lastY) {
      setIsNavVisible(true); // scrolling up
    }

    lastScrollYRef.current = currentScrollY;
  }, [currentScrollY]);

  useEffect(() => {
    const nav = navContainerRef.current;
    if (!nav) return;

    gsap.killTweensOf(nav);
    gsap.to(nav, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
      ease: "power1.out",
      overwrite: "auto",
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  useEffect(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.play().catch(() => {
        setIsAudioPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isAudioPlaying]);

  return (
    <div
      ref={navContainerRef}
      className={`fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 ${
        currentScrollY > 0 ? "floating-nav" : ""
      }`}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="Logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-lavender-mist md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              type="button"
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudioIndicator}
              aria-label={isAudioPlaying ? "Pause background audio" : "Play background audio"}
              aria-pressed={isAudioPlaying}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
                preload="none"
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  aria-hidden="true"
                  className={`indicator-line ${isAudioPlaying ? "active" : ""}`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
