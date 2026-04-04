import { useEffect } from 'react';

export default function useRevealOnScroll() {
    useEffect(() => {
        const elements = document.querySelectorAll('.reveal-card');

        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.16,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        elements.forEach((element, index) => {
            element.style.setProperty('--reveal-delay', `${index * 110}ms`);
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);
}