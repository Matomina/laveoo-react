import { useEffect } from "react";

export default function useRevealOnScroll(dependency) {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const intersectionObserver = new IntersectionObserver(
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

        const observeElement = (element) => {
            const parent = element.closest("section");

            if (parent) {
                const siblings = Array.from(
                    parent.querySelectorAll(".reveal-card")
                );
                const index = siblings.indexOf(element);
                const delay = prefersReducedMotion ? 0 : Math.min(index * 110, 660);
                element.style.setProperty("--reveal-delay", `${delay}ms`);
            }

            intersectionObserver.observe(element);
        };

        document.querySelectorAll(".reveal-card").forEach(observeElement);

        // Les pages chargées en différé (React.lazy) montent leur contenu
        // après ce premier passage : on observe aussi le DOM pour capter
        // les .reveal-card ajoutées une fois la page vraiment affichée.
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) return;
                    if (node.matches(".reveal-card")) observeElement(node);
                    node.querySelectorAll?.(".reveal-card").forEach(observeElement);
                });
            });
        });

        mutationObserver.observe(document.body, { childList: true, subtree: true });

        return () => {
            intersectionObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, [dependency]);
}
