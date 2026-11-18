import { siteData } from "../data/siteData";

export default function WhatsAppFloatingButton() {
    const { contact } = siteData;
    if (!contact?.whatsapp) return null;

    return (
        <a
            href={`https://wa.me/${contact.whatsapp}?text=Bonjour%2C+je+souhaite+r%C3%A9server+un+nettoyage+auto+%C3%A0+domicile.`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nous contacter sur WhatsApp"
            className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition duration-300 hover:scale-105 hover:shadow-[0_14px_36px_rgba(37,211,102,0.55)] sm:bottom-7 sm:right-7"
        >
            <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 fill-current">
                <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.666 4.523 1.82 6.377L4 29l7.835-1.78A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.6c-1.93 0-3.72-.57-5.23-1.55l-.375-.235-4.65 1.057 1.08-4.53-.245-.39A9.56 9.56 0 0 1 5.6 15c0-5.73 4.67-10.4 10.404-10.4 5.733 0 10.396 4.67 10.396 10.4s-4.663 10.4-10.396 10.4Zm5.69-7.79c-.31-.156-1.84-.908-2.126-1.012-.285-.104-.493-.156-.7.156-.206.312-.804 1.012-.986 1.22-.182.208-.364.234-.675.078-.31-.156-1.31-.483-2.497-1.54-.923-.823-1.546-1.84-1.728-2.152-.182-.312-.02-.48.137-.636.14-.14.311-.364.467-.546.156-.182.207-.312.311-.52.104-.208.052-.39-.026-.546-.078-.156-.7-1.69-.96-2.314-.253-.608-.51-.526-.7-.536l-.596-.01c-.207 0-.546.078-.832.39-.285.312-1.09 1.066-1.09 2.6s1.116 3.018 1.272 3.226c.156.208 2.197 3.354 5.325 4.703.744.321 1.324.513 1.776.656.746.238 1.425.204 1.961.124.598-.09 1.84-.753 2.1-1.48.26-.728.26-1.352.182-1.48-.078-.13-.285-.208-.596-.364Z" />
            </svg>
        </a>
    );
}
