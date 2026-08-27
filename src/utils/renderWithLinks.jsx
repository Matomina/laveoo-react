import { Link } from "react-router-dom";

export default function renderWithLinks(text, keyPrefix) {
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let index = 0;

    while ((match = linkPattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        parts.push(
            <Link key={`${keyPrefix}-link-${index}`} to={match[2]} className="font-bold text-[#1769E8] underline decoration-[#1769E8]/30 underline-offset-2 hover:decoration-[#1769E8]">
                {match[1]}
            </Link>
        );
        lastIndex = linkPattern.lastIndex;
        index += 1;
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
}