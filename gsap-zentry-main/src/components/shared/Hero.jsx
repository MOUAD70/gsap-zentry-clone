import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../ui/Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_VIDEOS = 4;

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [loadedSrcSet, setLoadedSrcSet] = useState(() => new Set());

  // UNIQUE REFS
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const nextVideoRef = useRef(null);
  const previewVideoRef = useRef(null);

  const upcomingVideoIndex = useMemo(
    () => (currentIndex % TOTAL_VIDEOS) + 1,
    [currentIndex],
  );

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  const previewSrc = useMemo(
    () => getVideoSrc(upcomingVideoIndex),
    [upcomingVideoIndex],
  );

  const nextSrc = useMemo(() => getVideoSrc(currentIndex), [currentIndex]);

  const backgroundSrc = useMemo(
    () => getVideoSrc(currentIndex),
    [currentIndex],
  );

  const markVideoLoaded = (src) => {
    setLoadedSrcSet((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  };

  useEffect(() => {
    const required = new Set([backgroundSrc, previewSrc, nextSrc]);
    const allReady = [...required].every((src) => loadedSrcSet.has(src));
    if (allReady) setIsLoading(false);
  }, [loadedSrcSet, backgroundSrc, previewSrc, nextSrc]);

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  // CLICK TRANSITION ANIMATION
  useGSAP(
    () => {
      if (!hasClicked) return;
      if (!nextVideoRef.current || !previewVideoRef.current) return;

      gsap.set(nextVideoRef.current, { visibility: "visible", scale: 0.6 });

      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut" },
      });

      tl.to(nextVideoRef.current, {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 0.9,
        onStart: () => {
          nextVideoRef.current?.play().catch(() => {
            // ignored: browser autoplay policies can block in rare cases
          });
        },
      }).from(
        previewVideoRef.current,
        {
          transformOrigin: "center center",
          scale: 0,
          duration: 0.9,
        },
        0,
      );
    },
    {
      scope: rootRef,
      dependencies: [currentIndex, hasClicked],
      revertOnUpdate: true,
    },
  );

  // SCROLL ANIMATION
  useGSAP(
    () => {
      if (!frameRef.current) return;

      gsap.set(frameRef.current, {
        clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
        borderRadius: "0 0 40% 10%",
      });

      gsap.from(frameRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0 0 0 0",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: frameRef.current,
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        ref={frameRef}
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-lavender-mist"
      >
        <div>
          {/* MINI PREVIEW */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={previewVideoRef}
                src={previewSrc}
                loop
                muted
                playsInline
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={() => markVideoLoaded(previewSrc)}
              />
            </div>
          </div>

          {/* ANIMATED LAYER */}
          <video
            ref={nextVideoRef}
            src={nextSrc}
            loop
            muted
            playsInline
            onLoadedData={() => markVideoLoaded(nextSrc)}
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          />

          {/* BG VIDEO */}
          <video
            src={backgroundSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={() => markVideoLoaded(backgroundSrc)}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-ghost-white">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading z-40 text-ghost-white">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-ghost-white">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-laser-lemon flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
