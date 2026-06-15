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
        email: "laveoocontact@gmail.com",
        serviceArea: "Yerres, Montgeron, Crosne, Brunoy et alentours",
        mapQuery: "Yerres 91330",
        mapEmbedUrl:
            "https://maps.google.com/maps?width=100%25&height=420&hl=fr&q=Yerres%2091330&z=12&output=embed",
    },

    businessHours: {
        title: "Horaires d'intervention",
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
        title: "Lavage auto à domicile - Nettoyage intérieur voiture à Yerres",
        subtitle:
            "Laveoo, spécialiste du nettoyage intérieur voiture à domicile, intervient à Yerres, Brunoy, Montgeron, Vigneux et alentour pour redonner fraîcheur, propreté et confort à votre habitacle.",
        imageAlt: "Service de nettoyage intérieur de voiture à domicile par LAVEOO à Yerres",
        highlights: [
            "Déplacement à domicile",
            "Matériel professionnel",
            "Produits professionnels",
            "Finition premium",
        ],
        actions: [
            { label: "Appeler", href: "tel:0751126402", variant: "primary" },
            {
                label: "WhatsApp",
                href: "https://wa.me/33751126402",
                variant: "primary",
                external: true,
            },
        ],
    },

    pricing: {
        title: "Tarifs de lavage auto à domicile",
        intro:
            "Une seule prestation, un résultat de qualité. Le déplacement est inclus. Le tarif varie uniquement selon la taille du véhicule.",
        items: [
            {
                id: "petite-voiture-berline",
                label: "Petite voiture / Berline",
                vehicleType: "Citadine et berline",
                estimatedDuration: "Temps de travail estimé : 2h",
                price: "79€",
                media: {
                    type: "image",
                    src: "/nettoyage-citadine-domicile-yerres.jpeg",
                    alt: "Nettoyage intérieur d'une citadine à domicile à Yerres",
                },
                description:
                    "Nettoyage intérieur de voiture adapté aux véhicules citadine et berlines",
            },
            {
                id: "suv-monospace",
                label: "SUV / Monospace",
                vehicleType: "SUV, monospace et break",
                estimatedDuration: "Temps de travail estimé : 3h",
                price: "99€",
                media: {
                    type: "image",
                    src: "/nettoyage-suv-domicile-yerres.jpeg",
                    alt: "Nettoyage intérieur SUV à domicile à Yerres",
                },
                description:
                    "Nettoyage intérieur premium adapté aux SUV, monospaces et breaks",
            },
        ],
    },

    included: {
        title: "Inclus dans votre nettoyage intérieur auto",
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
        title: "Résultats après notre lavage intérieur de voiture",
        intro:
            "Découvrez en images le résultat de nos prestations de nettoyage intérieur auto à domicile à Yerres sur citadines, berlines, SUV et monospaces.",
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
        title: "Nos méthodes de nettoyage intérieur auto",
        intro:
            "Chez Laveoo, chaque nettoyage intérieur voiture à domicile est réalisé avec des méthodes et équipements professionnels pour garantir un résultat soigné sur l'ensemble de l'habitacle.",
        items: [
            {
                title: "Comment nettoyer et détacher une moquette de voiture ?",
                description:
                    "Pour nettoyer et détacher les moquettes de voiture, nous utilisons des produits professionnels adaptés à chaque surface ainsi qu'une action mécanique et une extraction en profondeur pour éliminer les saletés incrustées.",
                video: {
                    src: "/videos/methode-shampoing.mp4",
                    label: "Nettoyage des moquettes par LAVEOO",
                },
            },
            {
                title: "Comment nettoyer et détacher des sièges de voiture en tissu ?",
                description:
                    "Nous éliminons les taches de café, boissons renversées, auréoles et autres saletés grâce à des produits adaptés et à une extraction en profondeur réalisée avec une machine professionnelle.",
                video: {
                    src: "/videos/methode-aspiration.mp4",
                    label: "Nettoyage des sièges tissu par LAVEOO",
                },
            },
            {
                title: "Comment nettoyer et entretenir des sièges en cuir de voiture ?",
                description:
                    "Nous nettoyons et brossons les sièges en cuir avec délicatesse, y compris les cuirs perforés, pour éliminer les miettes, saletés et traces tout en préservant le cuir.",
                video: {
                    src: "/videos/methode-preparation.mp4",
                    label: "Nettoyage des sièges cuir par LAVEOO",
                },
            },
            {
                title: "Comment nettoyer les plastiques intérieurs d'une voiture ?",
                description:
                    "Nous nettoyons les plastiques au pinceau avec des microfibres premium, des produits adaptés et la vapeur pour éliminer les saletés, assainir les surfaces et raviver leur couleur d'origine.",
                video: {
                    src: "/videos/methode-finitions.mp4",
                    label: "Nettoyage des plastiques et tableau de bord par LAVEOO",
                },
            },
        ],
    },

    seo: {
        title: "Nettoyage automobile à domicile à Yerres",
        items: [
            {
                question: "Pourquoi choisir un professionnel pour le nettoyage intérieur de sa voiture ?",
                answer:
                    "Nettoyer l'intérieur de sa voiture est un véritable défi, surtout lorsqu'il s'agit d'un SUV ou d'un monospace familial. Entre les miettes coincées entre les sièges, les poils d'animaux, le sable incrusté dans les moquettes, les taches sur les sièges ou les traces sur les plastiques, un simple passage d'aspirateur ne suffit généralement pas.\n\nChez Laveoo, nous commençons par une aspiration minutieuse de l'habitacle. Nous utilisons ensuite l'air comprimé pour décoller les poussières et saletés incrustées dans les fibres, les coutures et les zones difficiles d'accès afin de pouvoir les aspirer efficacement.\n\nLes sièges, tapis et moquettes sont ensuite traités avec des produits professionnels adaptés, travaillés par action mécanique pour décoller les salissures avant une extraction en profondeur. Cette méthode permet d'éliminer une grande partie des taches, des mauvaises odeurs et des saletés incrustées afin de retrouver un intérieur propre, sain et agréable, sans effort et sans perdre plusieurs heures à le faire soi-même.",
            },
            {
                question: "Un service de nettoyage à domicile pratique et sans contrainte",
                answer:
                    "Laveoo intervient à Yerres, Brunoy, Montgeron, Vigneux-sur-Seine et dans les communes voisines pour réaliser un nettoyage intérieur voiture à domicile.\n\nNotre processus de nettoyage optimisé permet d'obtenir un résultat premium, un habitacle propre et une finition soignée sur chaque véhicule.\n\nQue vous soyez à votre domicile ou sur votre lieu de travail, nous nous adaptons à votre emploi du temps afin de vous proposer une prestation simple, pratique et sans contrainte.\n\nNotre objectif est de vous faire gagner du temps tout en garantissant un niveau de qualité élevé sur l'ensemble de l'habitacle.\n\nGrâce à notre organisation et à notre matériel professionnel, chaque intervention est réalisée avec le même niveau d'exigence, qu'il s'agisse d'une citadine, d'une berline, d'un SUV ou d'un monospace.\n\nVous profitez ainsi d'un service de proximité, d'un accompagnement personnalisé et d'un intérieur propre, frais et agréable au quotidien.",
            },
            {
                question: "Comment redonner de la valeur à son véhicule ?",
                answer:
                    "Redonner de la valeur à un véhicule passe avant tout par un intérieur propre, entretenu et soigné.\n\nL'état intérieur d'un véhicule influence directement son confort, son apparence et sa valeur. Des sièges tachés, des moquettes encrassées, des plastiques ternis, des mauvaises odeurs ou un habitacle mal entretenu peuvent rapidement donner une impression de négligence.\n\nUn nettoyage intérieur régulier permet de préserver l'ensemble des surfaces du véhicule et de maintenir un environnement propre et agréable au quotidien.\n\nChez Laveoo, nous adaptons nos méthodes de nettoyage à chaque matériau afin de garantir un résultat optimal. Les sièges en tissu, les surfaces en cuir, l'Alcantara, les plastiques intérieurs, les tapis et les moquettes nécessitent chacun des produits et techniques spécifiques.\n\nUn entretien adapté permet de préserver l'aspect d'origine des matériaux tout en limitant leur usure dans le temps.\n\nQue ce soit pour profiter d'un véhicule plus agréable au quotidien, préparer une vente, une reprise ou une restitution de leasing, un intérieur propre et soigné constitue un véritable atout.\n\nUn habitacle entretenu inspire confiance, améliore la présentation générale du véhicule et contribue à préserver sa valeur au fil des années.",
            },
            {
                question: "Nettoyage de voiture à domicile à Yerres, Brunoy, Montgeron et Vigneux-sur-Seine",
                answer:
                    "Laveoo intervient à Yerres, Brunoy, Montgeron, Vigneux-sur-Seine et dans les communes voisines pour réaliser des prestations de nettoyage intérieur voiture à domicile.\n\nNous nous déplaçons directement chez les particuliers et les professionnels afin d'offrir un service pratique, flexible et adapté à chaque véhicule.\n\nQue vous possédiez une citadine, une berline, un SUV ou un monospace, nous mettons en œuvre les mêmes exigences de qualité pour garantir un habitacle propre, frais et soigné.\n\nNotre proximité avec ces villes nous permet d'intervenir rapidement tout en conservant un niveau de prestation élevé.\n\nGrâce à notre service à domicile, vous profitez d'un nettoyage intérieur professionnel sans avoir à vous déplacer ni à immobiliser votre véhicule pendant toute une journée.",
            },
            {
                question: "Comment éliminer les mauvaises odeurs dans une voiture ?",
                answer:
                    "Les mauvaises odeurs dans une voiture peuvent avoir de nombreuses origines : nourriture renversée, boissons, tabac, humidité, poils d'animaux ou encore saletés accumulées dans les sièges, tapis et moquettes.\n\nAvec le temps, les textiles absorbent ces odeurs et peuvent rendre l'habitacle moins agréable au quotidien.\n\nUn simple désodorisant ou parfum d'intérieur masque généralement le problème sans éliminer la source des mauvaises odeurs.\n\nPour retrouver un intérieur frais et agréable, il est essentiel de nettoyer en profondeur les surfaces concernées.\n\nLes sièges, moquettes, tapis et autres textiles doivent être traités afin d'éliminer les saletés incrustées, les résidus et les particules responsables des mauvaises odeurs.\n\nUn nettoyage intérieur régulier permet également de préserver un environnement plus propre et plus sain pour les occupants du véhicule.\n\nChez Laveoo, nous réalisons un nettoyage intérieur de voiture à domicile à Yerres, Brunoy, Montgeron, Vigneux-sur-Seine et dans les communes environnantes.\n\nGrâce à nos méthodes de nettoyage professionnelles, nous aidons à éliminer durablement les mauvaises odeurs tout en redonnant fraîcheur, propreté et confort à votre habitacle.",
            },
        ],
    },

    faq: {
        title: "FAQ",
        items: [
            {
                question: "Combien coûte un nettoyage intérieur voiture à domicile à Yerres ?",
                answer:
                    "Le prix d'un nettoyage intérieur voiture à domicile à Yerres est de 79 € TTC pour les citadines et berlines et de 99 € TTC pour les SUV, monospaces et grands véhicules. La prestation est réalisée directement à votre domicile ou sur votre lieu de travail.",
            },
            {
                question: "Combien de temps dure un lavage intérieur de voiture à domicile ?",
                answer:
                    "La durée d'un nettoyage intérieur voiture dépend de l'état du véhicule et de sa taille. En moyenne, il faut compter environ 2 heures pour une citadine ou une berline et jusqu'à 3 heures pour un SUV, un monospace ou un grand véhicule nécessitant un nettoyage plus approfondi.",
            },
            {
                question: "Intervenez-vous uniquement à Yerres ?",
                answer:
                    "Laveoo réalise ses prestations de nettoyage voiture à domicile à Yerres, Brunoy, Montgeron, Vigneux-sur-Seine et dans les communes environnantes, sans frais de déplacement dans notre zone d'intervention.",
            },
            {
                question: "Nettoyez-vous les sièges tachés ?",
                answer:
                    "Nous traitons les taches sur les sièges en tissu, cuir et Alcantara grâce à des méthodes de nettoyage adaptées à chaque véhicule. Taches de café, boissons renversées, auréoles et saletés du quotidien peuvent être atténuées ou éliminées selon leur état.",
            },
            {
                question: "Pouvez-vous éliminer les mauvaises odeurs dans une voiture ?",
                answer:
                    "Notre nettoyage intérieur permet d'éliminer les mauvaises odeurs liées au tabac, aux animaux, à l'humidité, aux boissons renversées ou aux saletés incrustées dans les textiles.",
            },
            {
                question: "Faut-il fournir de l'eau ou de l'électricité ?",
                answer:
                    "Pour réaliser la prestation, une prise électrique située à moins de 40 mètres est nécessaire. Nous disposons d'une rallonge de 40 mètres et sommes totalement autonomes en eau.",
            },
            {
                question: "Intervenez-vous à domicile ou sur le lieu de travail ?",
                answer:
                    "Laveoo intervient à domicile et sur le lieu de travail pour réaliser votre nettoyage intérieur voiture à Yerres, Brunoy, Montgeron, Vigneux-sur-Seine et dans les communes environnantes.\n\nNotre service mobile vous permet de profiter d'un véhicule propre sans avoir à vous déplacer.",
            },
            {
                question: "Nettoyez-vous les sièges en cuir, les cuirs perforés et l'Alcantara ?",
                answer:
                    "Nous nettoyons les sièges en cuir, les cuirs perforés et l'Alcantara grâce à des produits et techniques adaptés à chaque matériau.\n\nNotre nettoyage permet d'éliminer les saletés, miettes incrustées, traces du quotidien et impuretés tout en préservant l'aspect d'origine des sièges de voiture.",
            },
            {
                question: "Comment prendre rendez-vous avec Laveoo pour un nettoyage de voiture à domicile ?",
                answer:
                    "Il vous suffit de nous contacter par téléphone, SMS ou via notre formulaire de contact.\n\nNous conviendrons ensemble d'une date et d'un horaire adaptés afin de réaliser votre nettoyage intérieur voiture à domicile à Yerres, Brunoy, Montgeron, Vigneux-sur-Seine et dans les alentours.",
            },
        ],
    },

    reviews: {
        title: "Avis clients",
        emptyState:
            "Les avis Google pourront être intégrés ici dès qu'ils seront disponibles, sans modifier la structure de la page.",
    },

    contactSection: {
        title: "Réserver maintenant",
        intro:
            "Besoin d'un nettoyage intérieur de voiture à domicile à Yerres ou dans les alentours ? Contactez LAVEOO pour fixer rapidement votre rendez-vous.",
        infoNote: "7j/7 de 8h à 21h · Temps de prestation moyen : 2h",
        actions: [
            { label: "Appeler", href: "tel:0751126402", variant: "primary" },
            {
                label: "WhatsApp",
                href: "https://wa.me/33751126402",
                variant: "primary",
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
