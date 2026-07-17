export default function PageHero({ eyebrow, title, intro }) {
    return (
        <section className="relative overflow-hidden bg-[#EAF2FB] py-16 sm:py-20 lg:py-24">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(234,242,251,1)_0%,rgba(245,245,245,1)_100%)]" />
            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-white/60 blur-3xl" />
            <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                {eyebrow && (
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[#1F3A5F]/65">
                        {eyebrow}
                    </p>
                )}
                <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#1F3A5F] sm:text-5xl lg:text-6xl">
                    {title}
                </h1>
                {intro && (
                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#595959] sm:text-lg">
                        {intro}
                    </p>
                )}
            </div>
        </section>
    );
}
