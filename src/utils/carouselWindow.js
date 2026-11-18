// Détermine si un index doit être réellement affiché dans un carrousel mobile
// (fenêtre glissante de 3 : précédent / actif / suivant), pour éviter de charger
// toutes les cartes d'un coup dans le DOM. Les autres positions restent vides
// (même largeur, aucun contenu) pour garder l'effet de glissement intact.
export function isInCarouselWindow(index, activeIndex, count) {
    if (count <= 3) return true;
    const prev = (activeIndex - 1 + count) % count;
    const next = (activeIndex + 1) % count;
    return index === activeIndex || index === prev || index === next;
}
