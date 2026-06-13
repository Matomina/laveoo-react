import { useEffect, useRef, useState } from "react";
import { siteData } from "../data/siteData";

function playVideo(video) {
    if (!video) {
        return;
    }

    const playPromise = video.play();

    if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
    }
}

export default function MethodSection() {
    const { method } = siteData;
    const items = method?.items ?? [];
    const videoRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) {
                return;
            }

            video.muted = true;
            video.controls = false;
            video.disablePictureInPicture = true;
            video.playsInline = true;
            video.loop = false;

            if (index === activeIndex) {
                if (video.paused) {
                    playVideo(video);
                }
                return;
            }

            video.pause();
            video.currentTime = 0;
        });
    }, [activeIndex]);

    if (!method) {
        return null;
    }

    return (
        <section
            id={method.anchorId ?? "methodes"}
            className="bg-[#F5F5F5] py-16 sm:py-20 lg:py-24"
            aria-labelledby="method-title"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1F3A5F]">
                        {method.eyebrow ?? "Nos méthodes"}
                    </p>

                    <h2
                        id="method-title"
                        className="mt-4 text-3xl font-black tracking-tight text-[#1F3A5F] sm:text-4xl lg:text-5xl"
                    >
                        {method.title ?? "Nos méthodes de nettoyage"}
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#595959] sm:text-lg">
                        {method.intro}
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {items.map((item, index) => (
                        <article
                            key={item.title}
                            className="rounded-[1.75rem] border border-white/80 bg-white p-3 shadow-[0_18px_50px_rgba(31,58,95,0.08)]"
                        >
                            <div className="overflow-hidden rounded-[1.35rem] bg-[#EAF2FB]">
                                <video
                                    ref={(element) => {
                                        videoRefs.current[index] = element;
                                    }}
                                    className="method-video aspect-[4/3] w-full object-cover"
                                    muted
                                    playsInline
                                    preload="metadata"
                                    aria-label={item.video?.label ?? item.title}
                                    controls={false}
                                    controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                                    onLoadedData={(event) => {
                                        if (activeIndex === index) {
                                            playVideo(event.currentTarget);
                                        }
                                    }}
                                    onEnded={() => {
                                        setActiveIndex((current) => (current + 1) % items.length);
                                    }}
                                >
                                    <source src={item.video?.src} type="video/mp4" />
                                    Votre navigateur ne prend pas en charge la lecture vidéo.
                                </video>
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
                    ))}
                </div>
            </div>
        </section>
    );
}
