export function parseContent(raw) {
    const lines = raw.replace(/\r/g, "").split("\n");
    const blocks = [];
    let expectedHeading = null;
    let skipNextValue = false;

    for (const sourceLine of lines) {
        const line = sourceLine.trim();
        if (!line || line === "⸻" || line === "---") continue;

        if (skipNextValue) {
            skipNextValue = false;
            continue;
        }

        if (/^(URL|Title|Méta-description)$/i.test(line)) {
            skipNextValue = true;
            continue;
        }

        const marker = line.match(/^H([123])$/i) ?? line.match(/^##\s*H([123])$/i);
        if (marker) {
            expectedHeading = Number(marker[1]);
            continue;
        }

        if (/^##\s+(page|Page)/.test(line)) continue;

        if (expectedHeading) {
            blocks.push({ type: "heading", level: expectedHeading, text: line.replace(/^#+\s*/, "") });
            expectedHeading = null;
            continue;
        }

        if (/^\d+\.\s+/.test(line)) {
            blocks.push({ type: "heading", level: 3, text: line });
        } else if (["•", "✅", "✔", "☑", "-"].some((symbol) => line.startsWith(symbol))) {
            blocks.push({ type: "bullet", text: line.replace(/^(?:•|✅|✔️?|☑️?|-)+\s*/u, "") });
        } else {
            blocks.push({ type: "paragraph", text: line });
        }
    }

    return blocks;
}

export function buildFaqSections(blocks) {
    const sections = [];
    let currentSection = { title: "Questions fréquentes", items: [] };
    let currentQuestion = null;

    const flushQuestion = () => {
        if (currentQuestion) currentSection.items.push(currentQuestion);
        currentQuestion = null;
    };
    const flushSection = () => {
        flushQuestion();
        if (currentSection.items.length) sections.push(currentSection);
    };

    blocks.forEach((block) => {
        if (block.type === "heading" && block.level === 2) {
            flushSection();
            currentSection = { title: block.text, items: [] };
        } else if (block.type === "heading" && block.level === 3) {
            flushQuestion();
            currentQuestion = { question: block.text.replace(/^\d+\.\s*/, ""), answer: [] };
        } else if (block.type === "paragraph" && currentQuestion) {
            currentQuestion.answer.push(block.text);
        }
    });
    flushSection();

    return sections;
}

export function parseFaqSections(raw) {
    return buildFaqSections(parseContent(raw));
}
