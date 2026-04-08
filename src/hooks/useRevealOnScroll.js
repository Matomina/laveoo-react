import { useEffect } from "react";

export default function useRevealOnScroll() {
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
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.18,
                rootMargin: "0px 0px -60px 0px",
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

            const delay = prefersReducedMotion ? 0 : index * 90;

            element.style.setProperty("--reveal-delay", `${delay}ms`);

            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);
}