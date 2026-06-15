import { useEffect, useRef, useState } from "react";
import { siteData } from "../data/siteData";

function playVideo(video) {
    if (!video) return;
    const p = video.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
}

export default function MethodSection() {
    const { method } = siteData;
    const items = method?.items ?? [];
    const videoRefs = useRef([]);
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Only start playing when the section enters the viewport
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    // Pause all when tab becomes hidden, resume when visible again
    useEffect(() => {
        const handleVisibility = () => {
            if (document.hidden) {
                videoRefs.current.forEach((v) => v?.pause());
            } else if (isVisible) {
                playVideo(videoRefs.current[activeIndex]);
            }
        };

        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, [activeIndex, isVisible]);

    // Control which video plays based on activeIndex and section visibility
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            video.muted = true;
            video.playsInline = true;
            video.loop = false;

            if (index === activeIndex) {
                if (isVisible) {
                    if (video.paused) playVideo(video);
                } else {
                    video.pause();
                }
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });
    }, [activeIndex, isVisible]);

    if (!method) return null;

    return (
        <section
            ref={sectionRef}
            id={method.anchorId ?? "methodes"}
            className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24"
            aria-labelledby="method-title"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2
                        id="method-title"
                        className="text-3xl font-black tracking-tight text-[#1F3A5F] sm:text-4xl lg:text-5xl"
                    >
                        {method.title ?? "Nos méthodes de nettoyage"}
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#595959] sm:text-lg">
                        {method.intro}
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {items.map((item, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <article
                                key={item.title}
                                className={`rounded-[1.75rem] border bg-white p-3 shadow-[0_18px_50px_rgba(31,58,95,0.08)] transition-all duration-300 ${
                                    isActive
                                        ? "border-[#93B8D8] shadow-[0_24px_60px_rgba(147,184,216,0.18)]"
                                        : "border-[#93B8D8]/40"
                                }`}
                            >
                                <div className="relative overflow-hidden rounded-[1.35rem] bg-[#EAF2FB]">
                                    <video
                                        ref={(el) => {
                                            videoRefs.current[index] = el;
                                        }}
                                        className="method-video aspect-[4/3] w-full object-cover"
                                        muted
                                        playsInline
                                        preload={index === 0 ? "auto" : "metadata"}
                                        aria-label={item.video?.label ?? item.title}
                                        onLoadedData={(e) => {
                                            if (index === activeIndex && isVisible) {
                                                playVideo(e.currentTarget);
                                            }
                                        }}
                                        onEnded={() => {
                                            setActiveIndex((current) => (current + 1) % items.length);
                                        }}
                                    >
                                        <source src={item.video?.src} type="video/mp4" />
                                    </video>

                                    {isActive && (
                                        <span className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#93B8D8]/90 shadow">
                                            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" />
                                        </span>
                                    )}
                                </div>

                                <div className="px-2 pb-3 pt-5">
                                    <h3 className="text-xl font-black text-[#1F3A5F]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-[#595959]">
                                        {item.description}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
