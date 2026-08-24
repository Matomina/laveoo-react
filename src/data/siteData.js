export const includedServices = [
    "Aspiration complète et en profondeur de l’habitacle et du coffre",
    "Shampouinage des sièges, tapis et moquettes",
    "Nettoyage et brossage des sièges en cuir, si le véhicule en est équipé",
    "Nettoyage minutieux du tableau de bord, de la console, des contre-portes, rangements, aérateurs et commandes",
    "Protection des plastiques avec une finition mate, propre et non grasse",
    "Nettoyage des contours de portes et des rails de sièges",
    "Nettoyage des vitres intérieures et extérieures",
];

export const pricingPlans = [
    {
        id: "citadines",
        icon: "🚗",
        label: "Citadines",
        shortLabel: "Citadine",
        vehicleType: "Citadines",
        examplesShort: "Clio • 208 • Polo • Yaris • Sandero",
        examples:
            "Clio • 208 • C3 • Polo • Yaris • Sandero • DS 3 • Corsa • Fiesta • Ibiza • Fabia • Mazda 2 • Micra • Rio • i20",
        estimatedDuration: "2 h",
        price: 79,
        media: {
            src: "/nettoyage-citadine-domicile-yerres.jpeg",
            alt: "Nettoyage intérieur d’une citadine à domicile",
        },
        description:
            "Nettoyage intérieur complet adapté aux citadines.",
    },
    {
        id: "compactes-berlines-suv-compacts",
        icon: "🚙",
        label: "Compactes, berlines & SUV compacts",
        shortLabel: "Compactes, berlines & SUV compacts",
        vehicleType: "Compactes, berlines et SUV compacts",
        examplesShort: "Mégane • 308 • Golf • Classe C • Q3",
        examples:
            "Mégane • 308 • Golf • Corolla • Focus • Astra • Leon • Octavia • Classe A • Série 1 • A3 • 508 • Talisman • Passat • A4 • Série 3 • Classe C • 2008 • Captur • C-HR • Qashqai • T-Roc • Q3 • X1 • GLA",
        estimatedDuration: "2 h 30",
        price: 99,
        media: {
            src: "/nettoyage-suv-domicile-yerres.jpeg",
            alt: "Nettoyage intérieur d’un SUV compact à domicile",
        },
        description:
            "Nettoyage intérieur complet adapté aux compactes, berlines et SUV compacts.",
    },
    {
        id: "suv-familiaux-monospaces-breaks",
        icon: "🚐",
        label: "SUV familiaux, monospaces & breaks",
        shortLabel: "SUV familiaux, monospaces & breaks",
        vehicleType: "SUV familiaux, monospaces et breaks",
        examplesShort: "3008 • X3 • Q5 • Scénic • GLC",
        examples:
            "3008 • 5008 • Austral • Espace • Scénic • Grand Scénic • Tiguan • Touareg • RAV4 • Tucson • Sportage • Kuga • Q5 • Q7 • X3 • X5 • X6 • GLC • GLE • GLS",
        estimatedDuration: "3 h",
        price: 119,
        media: {
            src: "/nettoyage-monospace-domicile-laveoo.png",
            alt: "Monospace familial correspondant au forfait Laveoo à domicile",
        },
        description:
            "Nettoyage intérieur complet adapté aux grands SUV, monospaces, breaks et véhicules familiaux.",
    },
];

export const siteData = {
    brand: {
        name: "LAVEOO",
        tagline: "Nettoyage automobile à domicile",
        description:
            "Spécialiste du nettoyage intérieur automobile à domicile dans le sud de l’Île-de-France.",
    },
    contact: {
        phone: "0607112279",
        phoneDisplay: "06 07 11 22 79",
        whatsapp: "33607112279",
        email: "laveoocontact@gmail.com",
        serviceArea: "Essonne (91), Val-de-Marne (94) et Seine-et-Marne (77)",
        mapQuery: "Sud de l’Île-de-France",
        mapEmbedUrl:
            "https://maps.google.com/maps?width=100%25&height=420&hl=fr&q=Yerres%2091330&z=10&output=embed",
    },
    businessHours: {
        title: "Horaires d’intervention",
        display: "7j/7 de 8h à 21h",
        duration: "Durée moyenne : de 2 h à 3 h selon le véhicule",
    },
    navigation: [
        { label: "Accueil", href: "/" },
        { label: "Tarifs", href: "/tarifs" },
        { label: "Résultats", href: "/resultats" },
        { label: "Méthodes", href: "/nos-methodes-de-nettoyage" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
    ],
    hero: {
        title: "Nettoyage de voiture à domicile Essonne 91, Val-de-Marne 94, Seine-et-Marne 77",
        subtitle:
            "Spécialiste du nettoyage intérieur automobile, Laveoo a développé une méthode professionnelle qui rend l’esthétique automobile haut de gamme accessible à tous, directement à votre domicile. Nous intervenons dans le sud de l’Île-de-France, en Essonne (91), dans le Val-de-Marne (94) et en Seine-et-Marne (77).",
        highlights: [
            "Déplacement inclus",
            "Autonome en eau",
            "Matériel professionnel",
            "Finition haut de gamme",
        ],
        actions: [
            { label: "Découvrir les tarifs", href: "/tarifs", variant: "primary" },
            { label: "Prendre rendez-vous", href: "/contact", variant: "secondary" },
        ],
    },
    pricing: {
        title: "Tarifs de lavage auto à domicile",
        intro:
            "Une seule prestation, un résultat de qualité. Le déplacement est inclus et le tarif varie uniquement selon la taille du véhicule. Ajoutez l’option +1 heure si votre véhicule est très encrassé ou si vous souhaitez une finition plus poussée.",
        items: pricingPlans,
        option: {
            title: "+1 heure de prestation",
            price: 39,
            description:
                "Idéale pour les véhicules très sales, les finitions minutieuses ou une demande particulière.",
            benefits: [
                "Insister sur les zones les plus encrassées",
                "Traiter davantage les taches les plus tenaces",
                "Réaliser des finitions encore plus minutieuses",
                "Répondre à une demande particulière",
            ],
        },
    },
    included: {
        title: "Ce qui est inclus",
        items: includedServices,
    },
    results: {
        title: "Avant-après notre lavage intérieur de voiture",
        intro:
            "Découvrez en images le résultat de nos prestations de nettoyage intérieur automobile à domicile.",
        comparisons: [
            { id: "comparison-1", title: "Siège avant", before: "/results/avant-01.jpeg", after: "/results/apres-01.jpeg", alt: "Avant-après du nettoyage d’un siège avant de voiture" },
            { id: "comparison-2", title: "Banquette arrière", before: "/results/avant-02.jpeg", after: "/results/apres-02.jpeg", alt: "Avant-après du nettoyage d’une banquette arrière de voiture" },
            { id: "comparison-3", title: "Sol et moquette", before: "/results/avant-03.jpeg", after: "/results/apres-03.jpeg", alt: "Avant-après du nettoyage du sol et de la moquette d’une voiture" },
            { id: "comparison-4", title: "Habitacle clair", before: "/results/avant-04.jpeg", after: "/results/apres-04.jpeg", alt: "Avant-après du nettoyage d’un habitacle automobile clair" },
            { id: "comparison-5", title: "Poste de conduite", before: "/results/avant-05.jpeg", after: "/results/apres-05.jpeg", alt: "Avant-après du nettoyage d’un poste de conduite automobile" },
            { id: "comparison-6", title: "Console centrale", before: "/results/avant-06.jpeg", after: "/results/apres-06.jpeg", alt: "Avant-après du nettoyage d’une console centrale automobile" },
            { id: "comparison-7", title: "Banquette arrière", before: "/results/avant-07.jpeg", after: "/results/apres-07.jpeg", alt: "Avant-après du nettoyage d’une banquette arrière en tissu" },
            { id: "comparison-8", title: "Assise arrière", before: "/results/avant-08.jpeg", after: "/results/apres-08.jpeg", alt: "Avant-après du nettoyage d’une assise arrière automobile" },
            { id: "comparison-9", title: "Sièges avant", before: "/results/avant-09.jpeg", after: "/results/apres-09.jpeg", alt: "Avant-après du nettoyage des sièges avant d’une voiture" },
            { id: "comparison-10", title: "Habitacle complet", before: "/results/avant-010.jpeg", after: "/results/apres-010.jpeg", alt: "Avant-après du nettoyage complet d’un habitacle automobile clair" },
        ],
    },
    method: {
        title: "Une méthode de nettoyage automobile professionnelle",
        intro:
            "L’esthétique automobile est notre métier. Air comprimé, vapeur, injection-extraction et gestes adaptés permettent d’obtenir un niveau de finition qu’un nettoyage classique ne peut pas offrir, tout en préservant le cuir, l’Alcantara et les surfaces sensibles.",
        items: [
            { title: "Textiles et moquettes", description: "Action mécanique et injection-extraction pour nettoyer les fibres en profondeur.", video: { src: "/videos/methode-shampoing.mp4", label: "Shampouinage professionnel des textiles automobiles" } },
            { title: "Aspiration en profondeur", description: "L’air comprimé déloge les impuretés des coutures et des zones difficiles d’accès.", video: { src: "/videos/methode-aspiration.mp4", label: "Aspiration professionnelle d’un habitacle" } },
            { title: "Matériaux délicats", description: "Produits et accessoires choisis selon le cuir, l’Alcantara et les finitions sensibles.", video: { src: "/videos/methode-preparation.mp4", label: "Préparation du nettoyage des matériaux délicats" } },
            { title: "Finitions minutieuses", description: "La vapeur et les microfibres adaptées assainissent les surfaces sans les altérer.", video: { src: "/videos/methode-finitions.mp4", label: "Finitions intérieures automobiles" } },
        ],
    },
    whyChoose: {
        title: "Pourquoi choisir Laveoo pour le nettoyage de sa voiture ?",
        intro:
            "Chaque prestation repose sur une méthode rigoureuse, des équipements professionnels et des techniciens formés afin d’offrir un nettoyage intérieur de qualité sur tous les types de véhicules.",
        items: [
            { title: "Tous les types de véhicules", text: "Notre protocole protège les écrans, finitions noir brillant, inserts décoratifs, cuirs, Alcantara et autres matériaux délicats." },
            { title: "Des techniciens formés", text: "Tous nos techniciens maîtrisent les protocoles et les techniques adaptées aux matériaux présents dans votre véhicule." },
            { title: "Du matériel professionnel", text: "Injection-extraction, brossage mécanique, vapeur et produits dédiés permettent un nettoyage réellement en profondeur." },
            { title: "Un service directement à domicile", text: "Nous intervenons chez vous ou sur votre lieu de travail, autonomes en eau, avec seulement une prise électrique à moins de 40 mètres." },
        ],
    },
    faq: {
        title: "Questions fréquentes",
        items: [
            { question: "Combien coûte un nettoyage intérieur de voiture à domicile ?", answer: "Les tarifs sont de 79 € TTC pour une citadine, 99 € TTC pour une compacte, une berline ou un SUV compact, et 119 € TTC pour un SUV familial, un monospace ou un break. Le déplacement est inclus dans notre zone d’intervention." },
            { question: "Combien de temps dure la prestation ?", answer: "Comptez environ 2 heures pour une citadine, 2 h 30 pour une compacte, une berline ou un SUV compact, et 3 heures pour un grand SUV, un monospace ou un break." },
            { question: "Où intervenez-vous ?", answer: "Laveoo intervient dans le sud de l’Île-de-France, en Essonne (91), dans le Val-de-Marne (94) et en Seine-et-Marne (77), sans frais de déplacement dans la zone couverte." },
            { question: "Nettoyez-vous les sièges tachés ?", answer: "Oui. Nous traitons les sièges en tissu, cuir et Alcantara avec des méthodes adaptées. Le résultat dépend de la nature, de l’ancienneté et de l’état de la tache." },
            { question: "Pouvez-vous éliminer les mauvaises odeurs ?", answer: "Le nettoyage en profondeur traite les odeurs liées au tabac, aux animaux, à l’humidité, aux boissons renversées et aux saletés incrustées dans les textiles." },
            { question: "Faut-il fournir de l’eau ou de l’électricité ?", answer: "Nous sommes totalement autonomes en eau. Une prise électrique située à moins de 40 mètres est nécessaire pour réaliser la prestation." },
            { question: "Comment prendre rendez-vous ?", answer: "Contactez-nous par téléphone, SMS, WhatsApp ou via la page de contact. Nous conviendrons ensemble d’une date et d’un horaire adaptés." },
        ],
    },
    contactSection: {
        title: "Réserver votre nettoyage",
        intro:
            "Contactez Laveoo par téléphone, SMS, WhatsApp ou e-mail. Nous vous confirmerons rapidement la catégorie du véhicule, la date et l’horaire d’intervention.",
        infoNote: "7j/7 de 8h à 21h · Déplacement inclus dans notre zone d’intervention",
        actions: [
            { label: "Appeler", href: "tel:0751126402", variant: "primary" },
            { label: "WhatsApp", href: "https://wa.me/33751126402", variant: "primary", external: true },
            { label: "Envoyer un e-mail", href: "mailto:laveoocontact@gmail.com", variant: "secondary" },
        ],
    },
    footer: {
        copyrightLabel: "Tous droits réservés",
        links: [
            { label: "Accueil", href: "/" },
            { label: "Tarifs", href: "/tarifs" },
            { label: "Méthodes", href: "/nos-methodes-de-nettoyage" },
            { label: "FAQ", href: "/faq" },
            { label: "Contact", href: "/contact" },
            { label: "Nettoyage à domicile", href: "/nettoyage-auto-domicile" },
            { label: "Nettoyage des sièges", href: "/nettoyage-sieges-voiture" },
        ],
    },
};
