import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "../ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const rootRef = useRef(null);
  const clipRef = useRef(null);
  const maskRef = useRef(null);

  useGSAP(
    () => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: clipRef.current,
          start: "center center",
          end: "+=800 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      clipAnimation.to(maskRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      });
    },
    { scope: rootRef }, // scoped + automatic cleanup
  );

  return (
    <div ref={rootRef} id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome To Zentry
        </h2>

        <AnimatedTitle
          title={
            "Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared adventure"
          }
          containerClass={"mt-5 !text-black text-center"}
        />

        <div className="about-subtext">
          <p>The Game of Games begins-your life, now an epic MMORPG</p>
          <p>Zentry unites every player from countless games and platforms</p>
        </div>
      </div>

      <div ref={clipRef} className="h-dvh w-screen" id="clip">
        <div ref={maskRef} className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
