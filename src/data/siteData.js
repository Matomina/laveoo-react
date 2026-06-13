export const siteData = {
    brand: {
        name: "LAVEOO",
        tagline: "Nettoyage voiture à domicile",
        description:
            "Service professionnel de nettoyage intérieur de voiture à domicile à Yerres, Montgeron, Crosne, Brunoy et alentours.",
    },

    contact: {
        phone: "0751126402",
        phoneDisplay: "07 51 12 64 02",
        whatsapp: "33751126402",
        email: "contact@laveoo.com",
        serviceArea: "Yerres, Montgeron, Crosne, Brunoy et alentours",
        mapQuery: "Yerres 91330",
        mapEmbedUrl:
            "https://maps.google.com/maps?width=100%25&height=420&hl=fr&q=Yerres%2091330&z=12&output=embed",
    },

    businessHours: {
        title: "Horaires d’intervention",
        display: "7j/7 de 8h à 21h",
        duration: "Temps de prestation moyen : 2h",
    },

    navigation: [
        { label: "Accueil", href: "#accueil" },
        { label: "Tarifs", href: "#tarifs" },
        { label: "Résultats", href: "#resultats" },
        { label: "Méthodes", href: "#methodes" },
        { label: "FAQ", href: "#faq" },
        { label: "Contact", href: "#contact" },
    ],

    hero: {
        badge: "Service professionnel à domicile",
        title: "Nettoyage automobile à domicile à Yerres",
        subtitle:
            "LAVEOO intervient directement chez vous à Yerres et dans les environs pour un nettoyage intérieur automobile soigné. Aspiration profonde, shampoing des sièges et moquettes, désinfection des plastiques, vitres et finition premium : une prestation pratique, professionnelle et pensée pour vous faire gagner du temps.",
        imageAlt: "Service de nettoyage intérieur de voiture à domicile par LAVEOO à Yerres",
        highlights: [
            "Déplacement à domicile",
            "Matériel professionnel",
            "Produits professionnels",
            "Finition premium",
        ],
        actions: [
            { label: "Réserver", href: "#contact", variant: "primary" },
            {
                label: "Demander un devis",
                href: "mailto:contact@laveoo.com?subject=Demande%20de%20devis%20LAVEOO",
                variant: "secondary",
            },
            { label: "Appeler", href: "tel:0751126402", variant: "ghost" },
        ],
    },

    pricing: {
        title: "Tarifs",
        intro:
            "Des formules claires selon le gabarit du véhicule, avec une prestation intérieure complète réalisée directement à domicile.",
        items: [
            {
                id: "petite-voiture-berline",
                label: "Petite voiture / Berline",
                vehicleType: "Citadine et berline",
                estimatedDuration: "Temps de travail estimé : 2h",
                price: "79,99€",
                media: {
                    type: "image",
                    alt: "Nettoyage intérieur d’une petite voiture ou berline par LAVEOO",
                },
                description:
                    "Une prestation claire, pratique et professionnelle pour les véhicules jusqu’à la taille d’une berline, directement à domicile.",
            },
            {
                id: "suv-monospace",
                label: "SUV / Monospace",
                vehicleType: "SUV, monospace et break",
                estimatedDuration: "Temps de travail estimé : 3h",
                price: "99,99€",
                media: {
                    type: "video",
                    src: "/videos/suv.mp4",
                    label: "Nettoyage intérieur d’un grand véhicule par LAVEOO",
                },
                description:
                    "La même prestation complète pour les véhicules au-dessus de la taille d’une berline, avec le temps et le soin adaptés au gabarit.",
            },
        ],
    },

    included: {
        title: "Ce qui est inclus dans la prestation",
        items: [
            "Aspiration profonde",
            "Shampoing sièges et moquettes",
            "Désinfection de tous les plastiques",
            "Finition et protection des plastiques",
            "Vitres intérieures et extérieures",
            "Traitement des mauvaises odeurs",
            "Finition premium",
        ],
    },

    results: {
        title: "Nos résultats",
        intro:
            "Une sélection de résultats avant/après, avec les transformations les plus marquantes en premier.",
        items: [
            {
                id: "result-1-before",
                label: "Avant 01",
                variant: "before",
                featured: true,
                imageSrc: "/results/avant-01.jpeg",
                imageAlt: "Intérieur de voiture avant nettoyage par LAVEOO - résultat 01",
            },
            {
                id: "result-1-after",
                label: "Après 01",
                variant: "after",
                featured: true,
                imageSrc: "/results/apres-01.jpeg",
                imageAlt: "Intérieur de voiture après nettoyage par LAVEOO - résultat 01",
            },
            {
                id: "result-2-before",
                label: "Avant 02",
                variant: "before",
                imageSrc: "/results/avant-02.jpeg",
                imageAlt: "Intérieur de voiture avant nettoyage par LAVEOO - résultat 02",
            },
            {
                id: "result-2-after",
                label: "Après 02",
                variant: "after",
                imageSrc: "/results/apres-02.jpeg",
                imageAlt: "Intérieur de voiture après nettoyage par LAVEOO - résultat 02",
            },
            {
                id: "result-3-before",
                label: "Avant 03",
                variant: "before",
                imageSrc: "/results/avant-03.jpeg",
                imageAlt: "Intérieur de voiture avant nettoyage par LAVEOO - résultat 03",
            },
            {
                id: "result-3-after",
                label: "Après 03",
                variant: "after",
                imageSrc: "/results/apres-03.jpeg",
                imageAlt: "Intérieur de voiture après nettoyage par LAVEOO - résultat 03",
            },
        ],
    },

    method: {
        anchorId: "methodes",
        eyebrow: "Méthodes de nettoyage",
        title: "Nos méthodes de nettoyage",
        intro:
            "Chaque intervention suit une méthode précise pour traiter l’habitacle étape par étape, avec des gestes adaptés aux textiles, aux surfaces sensibles et aux zones les plus exposées.",
        items: [
            {
                title: "Nettoyage des moquettes",
                description:
                    "Shampoing ciblé des moquettes et extraction des saletés incrustées pour retrouver un rendu plus propre et plus net.",
                video: {
                    src: "/videos/methode-shampoing.mp4",
                    label: "Nettoyage des moquettes par LAVEOO",
                },
            },
            {
                title: "Nettoyage des sièges tissu",
                description:
                    "Aspiration, traitement localisé et nettoyage des tissus pour rafraîchir l’assise sans détremper l’habitacle.",
                video: {
                    src: "/videos/methode-aspiration.mp4",
                    label: "Nettoyage des sièges tissu par LAVEOO",
                },
            },
            {
                title: "Nettoyage des sièges cuir",
                description:
                    "Nettoyage des surfaces en cuir avec des produits adaptés pour retirer les traces du quotidien tout en respectant la matière.",
                video: {
                    src: "/videos/methode-preparation.mp4",
                    label: "Nettoyage des sièges cuir par LAVEOO",
                },
            },
            {
                title: "Nettoyage des plastiques et tableau de bord",
                description:
                    "Désinfection des plastiques, nettoyage des détails et finition soignée pour un habitacle propre, sain et agréable.",
                video: {
                    src: "/videos/methode-finitions.mp4",
                    label: "Nettoyage des plastiques et tableau de bord par LAVEOO",
                },
            },
        ],
    },

    seo: {
        title: "Nettoyage automobile à domicile à Yerres et alentours",
        paragraphs: [
            "Le nettoyage automobile à domicile permet de retrouver un véhicule propre sans perdre de temps dans un centre de lavage. LAVEOO intervient directement chez vous pour réaliser un nettoyage intérieur voiture complet, avec une méthode pensée pour redonner de la fraîcheur à l’habitacle tout en vous évitant les déplacements inutiles. Cette solution est particulièrement pratique pour les conducteurs qui veulent un résultat sérieux, soigné et accessible depuis leur domicile.",
            "Le service repose sur un nettoyage intérieur voiture précis : aspiration profonde, shampoing des sièges et des moquettes, désinfection des plastiques, nettoyage des vitres et finitions détaillées. Chaque prestation est adaptée à l’état du véhicule et au type de surfaces à traiter. Le but est de proposer un lavage auto à domicile qui soit à la fois efficace, confortable pour le client et cohérent avec les attentes d’un entretien régulier ou d’une remise en état plus poussée.",
            "À Yerres, mais aussi à Montgeron, Brunoy, Crosne et dans les villes voisines, LAVEOO se déplace avec du matériel professionnel et des produits adaptés. L’intervention à domicile apporte un vrai gain de temps : le véhicule est pris en charge sur place, selon vos disponibilités, sans immobiliser inutilement votre journée. Pour un nettoyage automobile à domicile pratique, un nettoyage intérieur voiture soigné et un lavage auto à domicile réalisé avec sérieux autour de Yerres, LAVEOO propose une solution simple, locale et efficace.",
        ],
    },

    faq: {
        title: "FAQ",
        items: [
            {
                question: "Combien de temps dure l’intervention ?",
                answer:
                    "Le temps de prestation moyen est d’environ 2h. Pour un SUV, un monospace ou un véhicule très encrassé, l’intervention peut durer plus longtemps.",
            },
            {
                question: "Faut-il une prise électrique ?",
                answer:
                    "Une prise électrique accessible est préférable pour travailler dans de bonnes conditions. Si ce n’est pas le cas, il suffit de le préciser avant le rendez-vous.",
            },
            {
                question: "Intervenez-vous à domicile ?",
                answer:
                    "Oui. LAVEOO intervient directement à domicile à Yerres, Montgeron, Crosne, Brunoy et dans les communes voisines selon les disponibilités.",
            },
            {
                question: "Les taches partent-elles toutes ?",
                answer:
                    "Beaucoup de taches peuvent être fortement atténuées ou retirées, mais cela dépend de leur ancienneté, de leur nature et de la matière à traiter.",
            },
            {
                question: "Acceptez-vous les véhicules très sales ?",
                answer:
                    "Oui, mais l’état du véhicule peut demander plus de temps ou un ajustement du devis. Le plus simple est d’envoyer quelques photos avant l’intervention.",
            },
        ],
    },

    reviews: {
        title: "Avis clients",
        emptyState:
            "Les avis Google pourront être intégrés ici dès qu’ils seront disponibles, sans modifier la structure de la page.",
    },

    contactSection: {
        title: "Réserver maintenant",
        intro:
            "Besoin d’un nettoyage intérieur de voiture à domicile à Yerres ou dans les alentours ? Contactez LAVEOO pour fixer rapidement votre rendez-vous.",
        infoNote: "7j/7 de 8h à 21h · Temps de prestation moyen : 2h",
        actions: [
            {
                label: "Réserver maintenant",
                href: "mailto:contact@laveoo.com?subject=Reservation%20LAVEOO",
                variant: "primary",
            },
            { label: "Téléphone", href: "tel:0751126402", variant: "secondary" },
            {
                label: "WhatsApp",
                href: "https://wa.me/33751126402",
                variant: "ghost",
                external: true,
            },
        ],
    },

    footer: {
        copyrightLabel: "Tous droits réservés",
        links: [
            { label: "Accueil", href: "#accueil" },
            { label: "Tarifs", href: "#tarifs" },
            { label: "Résultats", href: "#resultats" },
            { label: "FAQ", href: "#faq" },
            { label: "Contact", href: "#contact" },
        ],
    },
};
