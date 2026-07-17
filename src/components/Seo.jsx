import { useEffect } from "react";

export default function Seo({ title, description, path = "/" }) {
    useEffect(() => {
        const fullTitle = title.includes("Laveoo") ? title : `${title} | Laveoo`;
        document.title = fullTitle;

        const upsertMeta = (selector, attributes) => {
            let element = document.head.querySelector(selector);
            if (!element) {
                element = document.createElement("meta");
                document.head.appendChild(element);
            }
            Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
        };

        upsertMeta('meta[name="description"]', { name: "description", content: description });
        upsertMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
        upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
        upsertMeta('meta[property="og:url"]', { property: "og:url", content: `https://www.laveoo.com${path}` });

        let canonical = document.head.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = `https://www.laveoo.com${path}`;
    }, [description, path, title]);

    return null;
}
