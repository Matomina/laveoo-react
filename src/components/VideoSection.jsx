import LazyVideo from "./LazyVideo";

export default function VideoSection() {
    return (
        <section className="bg-white py-20 lg:py-24" aria-labelledby="video-title">
            <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                <h2 id="video-title" className="reveal-card text-4xl font-black tracking-tight text-[#1F3A5F] sm:text-5xl">
                    Détachage de sièges en action
                </h2>
                <p className="reveal-card mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#595959]">
                    Découvrez notre technique de détachage professionnelle, appliquée en direct sur un siège taché.
                </p>
                <div className="reveal-card mx-auto mt-10 w-[85%] max-w-sm overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(31,58,95,0.15)] sm:w-full sm:max-w-xs">
                    <LazyVideo src="/video-tache-sieges.mp4" poster="/video-tache-sieges-poster.jpg" />
                </div>
            </div>
        </section>
    );
}
