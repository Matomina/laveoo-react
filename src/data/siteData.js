export const includedServices = [
    "Aspiration complète de l’habitacle et du coffre",
    "Shampoing des sièges",
    "Brossage des sièges en cuir",
    "Shampoing des tapis",
    "Nettoyage de tous les plastiques",
    "Protection des plastiques",
    "Nettoyage des contours de porte",
    "Nettoyage des vitres, intérieur et extérieur",
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
            src: "/nettoyage-citadine-domicile-yerres.webp",
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
            src: "/nettoyage-suv-domicile-yerres.webp",
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
            src: "/nettoyage-monospace-domicile-laveoo.webp",
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
        { label: "Zones", href: "/nos-zones-d-intervention" },
    ],
    hero: {
        title: "Lavage auto à domicile – Nettoyage intérieur de voiture",
        subtitle: "Une voiture propre, sans que vous ayez à vous déplacer.",
        actions: [
            { label: "Découvrir les tarifs", href: "/tarifs", variant: "primary" },
            { label: "Réserver mon nettoyage", href: "/reservation", variant: "secondary" },
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
            // Tesla
            { id: "comparison-13", title: "Plancher conducteur", before: "/results/nettoyage-plancher-conducteur-tesla-1-avant.webp", after: "/results/nettoyage-plancher-conducteur-tesla-1-apres.webp", alt: "Avant-après du nettoyage du plancher côté conducteur d’une Tesla" },
            { id: "comparison-14", title: "Plancher conducteur", before: "/results/nettoyage-plancher-conducteur-tesla-2-avant.webp", after: "/results/nettoyage-plancher-conducteur-tesla-2-apres.webp", alt: "Avant-après du nettoyage du plancher côté conducteur d’une autre Tesla" },
            { id: "comparison-17", title: "Plancher passager", before: "/results/nettoyage-plancher-passager-tesla-avant.webp", after: "/results/nettoyage-plancher-passager-tesla-apres.webp", alt: "Avant-après du nettoyage du plancher côté passager avant d’une Tesla" },
            { id: "comparison-16", title: "Sièges et plancher arrière", before: "/results/nettoyage-sieges-plancher-arriere-tesla-avant.webp", after: "/results/nettoyage-sieges-plancher-arriere-tesla-apres.webp", alt: "Avant-après du nettoyage des sièges et du plancher arrière d’une Tesla" },
            { id: "comparison-12", title: "Sol et banquette arrière", before: "/results/nettoyage-sol-banquette-arriere-tesla-1-avant.webp", after: "/results/nettoyage-sol-banquette-arriere-tesla-1-apres.webp", alt: "Avant-après du nettoyage du sol et de la banquette arrière d’une Tesla" },
            { id: "comparison-15", title: "Sol banquette arrière", before: "/results/nettoyage-sol-banquette-arriere-tesla-2-avant.webp", after: "/results/nettoyage-sol-banquette-arriere-tesla-2-apres.webp", alt: "Avant-après du nettoyage du sol de la banquette arrière d’une Tesla" },
            { id: "comparison-11", title: "Volant et poste de conduite", before: "/results/nettoyage-volant-poste-conduite-avant.webp", after: "/results/nettoyage-volant-poste-conduite-apres.webp", alt: "Avant-après du nettoyage d’un volant et d’un poste de conduite automobile", objectPosition: "center 25%" },
            // BMW
            { id: "comparison-18", title: "Sol banquette arrière", before: "/results/nettoyage-sol-arriere-voiture-avant.webp", after: "/results/nettoyage-sol-arriere-voiture-apres.webp", alt: "Avant-après du nettoyage du sol de la banquette arrière d’une BMW" },
            { id: "comparison-19", title: "Banquette en cuir", before: "/results/nettoyage-banquette-arriere-cuir-avant.webp", after: "/results/nettoyage-banquette-arriere-cuir-apres.webp", alt: "Avant-après du nettoyage d’une banquette arrière en cuir de BMW" },
            { id: "comparison-20", title: "Console centrale", before: "/results/nettoyage-console-centrale-voiture-avant.webp", after: "/results/nettoyage-console-centrale-voiture-apres.webp", alt: "Avant-après du nettoyage de la console centrale d’une BMW" },
            // Mercedes (habitacle beige)
            { id: "comparison-21", title: "Habitacle clair", before: "/results/nettoyage-habitacle-clair-mercedes-avant.webp", after: "/results/nettoyage-habitacle-clair-mercedes-apres.webp", alt: "Avant-après du nettoyage de l’habitacle clair d’une Mercedes" },
            { id: "comparison-24", title: "Siège conducteur", before: "/results/nettoyage-siege-conducteur-mercedes-avant.webp", after: "/results/nettoyage-siege-conducteur-mercedes-apres.webp", alt: "Avant-après du nettoyage du siège conducteur d’une Mercedes" },
            // MG (banquette tissu bleu)
            { id: "comparison-25", title: "Banquette en tissu", before: "/results/nettoyage-banquette-arriere-tissu-mercedes-avant.webp", after: "/results/nettoyage-banquette-arriere-tissu-mercedes-apres.webp", alt: "Avant-après du nettoyage d’une banquette arrière en tissu de MG" },
            // Peugeot 208
            { id: "comparison-22", title: "Banquette arrière", before: "/results/nettoyage-banquette-arriere-208-avant.webp", after: "/results/nettoyage-banquette-arriere-208-apres.webp", alt: "Avant-après du nettoyage de la banquette arrière d’une Peugeot 208" },
            { id: "comparison-23", title: "Siège conducteur", before: "/results/nettoyage-siege-conducteur-208-avant.webp", after: "/results/nettoyage-siege-conducteur-208-apres.webp", alt: "Avant-après du nettoyage du siège conducteur d’une Peugeot 208" },
            // Le reste
            { id: "comparison-1", title: "Siège avant", before: "/results/nettoyage-siege-avant-voiture-avant.webp", after: "/results/nettoyage-siege-avant-voiture-apres.webp", alt: "Avant-après du nettoyage d’un siège avant de voiture" },
            { id: "comparison-2", title: "Banquette arrière", before: "/results/nettoyage-banquette-arriere-voiture-avant.webp", after: "/results/nettoyage-banquette-arriere-voiture-apres.webp", alt: "Avant-après du nettoyage d’une banquette arrière de voiture" },
            { id: "comparison-3", title: "Sol et moquette", before: "/results/nettoyage-sol-moquette-voiture-avant.webp", after: "/results/nettoyage-sol-moquette-voiture-apres.webp", alt: "Avant-après du nettoyage du sol et de la moquette d’une voiture" },
            { id: "comparison-5", title: "Poste de conduite", before: "/results/nettoyage-poste-conduite-voiture-avant.webp", after: "/results/nettoyage-poste-conduite-voiture-apres.webp", alt: "Avant-après du nettoyage d’un poste de conduite automobile" },
            { id: "comparison-6", title: "Console centrale", before: "/results/nettoyage-console-centrale-automobile-avant.webp", after: "/results/nettoyage-console-centrale-automobile-apres.webp", alt: "Avant-après du nettoyage d’une console centrale automobile" },
            { id: "comparison-7", title: "Banquette arrière", before: "/results/nettoyage-banquette-arriere-tissu-avant.webp", after: "/results/nettoyage-banquette-arriere-tissu-apres.webp", alt: "Avant-après du nettoyage d’une banquette arrière en tissu" },
            { id: "comparison-8", title: "Assise arrière", before: "/results/nettoyage-assise-arriere-voiture-avant.webp", after: "/results/nettoyage-assise-arriere-voiture-apres.webp", alt: "Avant-après du nettoyage d’une assise arrière automobile" },
            // Citroën C2
            { id: "comparison-26", title: "Banquette rabattue", before: "/results/nettoyage-banquette-rabattue-c2-avant.webp", after: "/results/nettoyage-banquette-rabattue-c2-apres.webp", alt: "Avant-après du nettoyage de la banquette arrière rabattue d’une Citroën C2" },
            { id: "comparison-27", title: "Banquette arrière", before: "/results/nettoyage-banquette-arriere-c2-avant.webp", after: "/results/nettoyage-banquette-arriere-c2-apres.webp", alt: "Avant-après du nettoyage de la banquette arrière d’une Citroën C2" },
        ],
    },
    process: {
        title: "Comment se passe le nettoyage intérieur de voiture chez Laveoo ?",
        steps: [
            { title: "Contact", description: "Contactez-nous au 06 07 11 22 79 ou cliquez sur « Réserver » pour nous envoyer votre demande par e-mail. Nous vous rappelons dans l’heure." },
            { title: "Confirmation", description: "Nous confirmons le créneau et le tarif par e-mail ou SMS." },
            { title: "Intervention", description: "Nous réalisons le nettoyage à l’heure du rendez-vous. Nous venons avec tout le matériel nécessaire pour prendre soin de votre véhicule. Vous n’avez rien à préparer : il suffit de nous donner accès au véhicule." },
            { title: "Paiement", description: "Vous payez uniquement une fois le véhicule propre. Votre voiture est prête à reprendre la route, propre, fraîche et agréable à retrouver." },
        ],
    },
    method: {
        title: "Une méthode de nettoyage automobile professionnelle",
        lead: "Spécialiste du nettoyage intérieur automobile, Laveoo a développé une méthode professionnelle qui rend l’esthétique automobile haut de gamme accessible à tous, directement à votre domicile. Nous intervenons 7j/7, avec déplacement gratuit et paiement uniquement à la fin de la prestation.",
        intro:
    "L’esthétique automobile est notre métier. Que ce soit pour un [nettoyage auto à domicile](/nettoyage-auto-domicile) complet ou pour le [nettoyage des sièges de voiture](/nettoyage-sieges-voiture) les plus délicats, air comprimé, vapeur, injection-extraction et gestes adaptés permettent d’obtenir un niveau de finition qu’un nettoyage classique ne peut pas offrir, tout en préservant le cuir, l’Alcantara et les surfaces sensibles.",
        homeTitle: "Un protocole professionnel, directement chez vous",
        homeIntro:
            "Air comprimé, injection-extraction et un produit différent pour chaque matière : notre protocole va chercher la saleté là où un nettoyage classique s’arrête, sans agresser le cuir, l’Alcantara ni les plastiques sensibles. [Découvrez notre méthode étape par étape](/nos-methodes-de-nettoyage).",
        homeHighlights: [
            { title: "Habitacle complet", description: "Tapis, moquette, coffre et plastiques : chaque recoin reçoit le même niveau de soin, pas seulement les zones visibles." },
            { title: "Cuir, tissu et Alcantara", description: "Un produit et une technique différents pour chaque matière, pour nettoyer en profondeur sans l’abîmer." },
            { title: "Odeurs traitées, pas masquées", description: "Notre destructeur d’odeurs neutralise la cause à la source, une fois les taches et l’humidité traitées." },
        ],
        items: [
            { title: "Tapis et moquettes poussiéreux", description: "Même après avoir été tapés ou aspirés, la poussière et les miettes restent incrustées dans les fibres.", image: { before: "/results/nettoyage-sol-banquette-arriere-tesla-2-avant.webp", after: "/results/nettoyage-sol-banquette-arriere-tesla-2-apres.webp", alt: "Avant-après du nettoyage du sol de la banquette arrière d’une Tesla" } },
            { title: "Sièges tachés et marqués", description: "[Auréoles de boissons](/comment-nettoyer/aureole-siege-tissu), [taches de café](/comment-nettoyer/tache-de-cafe-siege-tissu), [poils d’animaux](/comment-nettoyer/poils-animaux-siege-tissu), [vomi d’enfant](/comment-nettoyer/tache-de-vomi-siege-tissu) ou [sièges très sales](/comment-nettoyer/nettoyer-siege-tissu-tres-sale-profondeur) : les sièges textiles absorbent les taches et peuvent conserver les odeurs.", image: { before: "/results/nettoyage-siege-avant-voiture-avant.webp", after: "/results/nettoyage-siege-avant-voiture-apres.webp", alt: "Avant-après du nettoyage d’un siège avant de voiture" } },
            { title: "Tableau de bord et plastiques encrassés", description: "La poussière se loge dans chaque rainure, bouton et interstice. Avec le temps, les plastiques deviennent ternes, collants ou marqués par les traces.", image: { before: "/results/nettoyage-console-centrale-voiture-avant.webp", after: "/results/nettoyage-console-centrale-voiture-apres.webp", alt: "Avant-après du nettoyage de la console centrale d’une BMW" } },
            { title: "Sièges en cuir marqués et ternis", description: "Traces d’usage, saletés incrustées, zones brillantes ou ternes : avec le temps, le cuir perd son aspect d’origine.", image: { before: "/results/nettoyage-banquette-arriere-cuir-avant.webp", after: "/results/nettoyage-banquette-arriere-cuir-apres.webp", alt: "Avant-après du nettoyage d’une banquette arrière en cuir de BMW" } },
        ],
        closingParagraphs: [
            "Nous prenons en charge ces problèmes avec un nettoyage intérieur complet : aspiration de l’habitacle et du coffre, traitement des taches de boissons, de graisse, de terre ou d’animaux, nettoyage approfondi des sièges en tissu ou entretien du cuir.",
            "Bien plus qu’un simple coup d’aspirateur, notre intervention redonne à votre véhicule propreté, fraîcheur et confort.",
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
            { label: "Appeler", href: "tel:0607112279", variant: "primary" },
            { label: "WhatsApp", href: "https://wa.me/33607112279?text=Bonjour%2C+je+souhaite+r%C3%A9server+un+nettoyage+auto+%C3%A0+domicile.", variant: "primary", external: true },
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
            { label: "Réserver", href: "/reservation" },
            { label: "Nettoyage à domicile", href: "/nettoyage-auto-domicile" },
            { label: "Nettoyage des sièges", href: "/nettoyage-sieges-voiture" },
            { label: "Nos guides", href: "/comment-nettoyer" },
        ],
    },
};