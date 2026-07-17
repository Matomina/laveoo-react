function parseContent(raw) {
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

function StandardContent({ blocks }) {
    return (
        <div className="space-y-5">
            {blocks.map((block, index) => {
                if (block.type === "heading" && block.level === 1) return null;
                if (block.type === "heading" && block.level === 2) {
                    return <h2 key={index} className="pt-10 text-3xl font-black tracking-tight text-[#1F3A5F] sm:text-4xl">{block.text}</h2>;
                }
                if (block.type === "heading") {
                    return <h3 key={index} className="pt-4 text-xl font-bold text-[#1F3A5F]">{block.text}</h3>;
                }
                if (block.type === "bullet") {
                    return <p key={index} className="flex gap-3 rounded-2xl bg-[#F8FAFC] px-5 py-3 leading-7 text-[#595959]"><span className="font-black text-[#1F3A5F]">✓</span>{block.text}</p>;
                }
                return <p key={index} className="text-base leading-8 text-[#595959]">{block.text}</p>;
            })}
        </div>
    );
}

function FaqContent({ blocks }) {
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

    return (
        <div className="space-y-14">
            {sections.map((section) => (
                <section key={section.title} aria-labelledby={`faq-${section.title.replace(/\W+/g, "-").toLowerCase()}`}>
                    <h2 id={`faq-${section.title.replace(/\W+/g, "-").toLowerCase()}`} className="text-3xl font-black tracking-tight text-[#1F3A5F] sm:text-4xl">{section.title}</h2>
                    <div className="mt-7 grid gap-4">
                        {section.items.map((item) => (
                            <details key={item.question} className="group rounded-[1.5rem] border border-[#93B8D8]/70 bg-white p-5 shadow-[0_12px_34px_rgba(31,58,95,0.06)] sm:p-6">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-bold leading-7 text-[#1F3A5F]">
                                    <span>{item.question}</span>
                                    <span aria-hidden="true" className="mt-0.5 text-xl transition group-open:rotate-45">+</span>
                                </summary>
                                <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                                    {item.answer.map((paragraph, index) => <p key={index} className="leading-8 text-[#595959]">{paragraph}</p>)}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}

export default function ClientContent({ raw, faq = false }) {
    const blocks = parseContent(raw);
    return faq ? <FaqContent blocks={blocks} /> : <StandardContent blocks={blocks} />;
}
