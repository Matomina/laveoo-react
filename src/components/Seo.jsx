import { useEffect } from "react";

export default function Seo({ title, description, path = "/", image = "/og-image.jpg", jsonLd = null }) {
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
        upsertMeta('meta[property="og:image"]', { property: "og:image", content: `https://www.laveoo.com${image}` });
        upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: fullTitle });
        upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
        upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: `https://www.laveoo.com${image}` });

        let canonical = document.head.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.rel = "canonical";
            document.head.appendChild(canonical);
        }
        canonical.href = `https://www.laveoo.com${path}`;

        const existingJsonLd = document.head.querySelector('script[data-seo-jsonld="true"]');
        existingJsonLd?.remove();

        if (jsonLd) {
            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.dataset.seoJsonld = "true";
            script.textContent = JSON.stringify(jsonLd);
            document.head.appendChild(script);
        }
    }, [description, path, title, image, jsonLd]);

    return null;
}
