import { useEffect } from "react";

export default function useRevealOnScroll(dependency) {
    useEffect(() => {
        const elements = document.querySelectorAll(".reveal-card");

        if (!elements.length) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        window.requestAnimationFrame(() => {
                            entry.target.dataset.revealed = "true";
                            obs.unobserve(entry.target);
                        });
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        elements.forEach((element) => {
            const parent = element.closest("section");

            if (!parent) {
                observer.observe(element);
                return;
            }

            const siblings = Array.from(
                parent.querySelectorAll(".reveal-card")
            );

            const index = siblings.indexOf(element);

            const delay = prefersReducedMotion ? 0 : Math.min(index * 110, 660);

            element.style.setProperty("--reveal-delay", `${delay}ms`);

            observer.observe(element);
        });

        return () => observer.disconnect();
    }, [dependency]);
}
