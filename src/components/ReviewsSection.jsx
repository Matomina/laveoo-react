import { siteData } from "../data/siteData";

export default function ReviewsSection() {
    const { reviews } = siteData;

    return (
        <section className="bg-white py-20 lg:py-24" aria-labelledby="reviews-title">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="reveal-card mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#1F3A5F]">
                        Confiance
                    </p>

                    <h2
                        id="reviews-title"
                        className="mt-4 text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl"
                    >
                        {reviews?.title ?? "Avis clients"}
                    </h2>
                </div>

                <div className="reveal-card mt-14 rounded-[2rem] border border-white/80 bg-[#F8FAFC] p-8 text-center shadow-[0_18px_50px_rgba(31,58,95,0.08)] sm:p-10">
                    <p className="text-base leading-8 text-[#595959]">
                        {reviews?.emptyState}
                    </p>
                </div>
            </div>
        </section>
    );
}
