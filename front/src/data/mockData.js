import logo_hexagone from '../assets/hexagone_logo.png'

export const mockStudents = [
    { 
        id: 1, 
        name: "Marie Dubois", 
        email: "marie.dubois@hexagone.edu",
        phone: "+33 6 12 34 56 78",
        linkedin: "linkedin.com/in/mariedubois",
        github: "github.com/mariedubois",
        school: "Hexagone - École Supérieure d'Informatique", 
        location: "Paris, France", 
        year: "3ème année",
        desc: "Étudiante passionnée par le développement web et le design d'interfaces. Je recherche un stage de 6 mois à partir de janvier 2025.", 
        skills: ["React", "Node.js", "Figma", "CSS", "MongoDB"],
        education: [
            { title: "Master Développement Web & Mobile", school: "Hexagone - École Supérieure d'Informatique", dates: "2024 - 2026", location: "Paris" },
            { title: "Licence Informatique", school: "Université Paris-Saclay", dates: "2021 - 2024", location: "Paris" }
        ],
        experience: [
            { title: "Stage Développeur Full-Stack", company: "TechStart", dates: "Juin 2023 - Août 2023", location: "Paris", desc: "Développement d'une application web avec React et Node.js." },
            { title: "Projet freelance", company: "Auto-entrepreneur", dates: "Mars 2023", location: "Paris", desc: "Création d'un site vitrine pour un restaurant local avec React et CSS." }
        ],
        projects: [
            { title: "Portfolio", desc: "Application permettant aux développeurs de créer facilement leur portfolio personnel.", tags: ["React", "CSS", "Vite"] },
            { title: "TaskManager", desc: "Application de gestion de tâches avec authentification et base de données.", tags: ["Node.js", "MongoDB", "Express"] }
        ]
    },
    { 
        id: 2, 
        name: "Lucas Martin", 
        email: "lucas.martin@hexagone.edu",
        phone: "+33 6 23 45 67 89",
        linkedin: "linkedin.com/in/lucasmartin",
        github: "github.com/lucasmartin",
        school: "Hexagone - École Supérieure d'Informatique", 
        location: "Lyon, France", 
        year: "4ème année",
        desc: "Développeur back-end spécialisé en PHP et bases de données. Je cherche une alternance pour ma dernière année.", 
        skills: ["Vue", "PHP", "SQL", "Laravel", "Docker"],
        education: [
            { title: "Master Architecture Logicielle", school: "Hexagone - École Supérieure d'Informatique", dates: "2023 - 2025", location: "Lyon" },
            { title: "BTS SIO", school: "Lycée La Martinière", dates: "2021 - 2023", location: "Lyon" }
        ],
        experience: [
            { title: "Alternance Développeur Back-End", company: "DataSoft", dates: "Sept 2023 - Août 2024", location: "Lyon", desc: "Développement et maintenance d'une API en PHP Laravel." }
        ],
        projects: [
            { title: "E-commerce API", desc: "API REST complète pour une boutique en ligne avec gestion de panier et paiement.", tags: ["PHP", "Laravel", "SQL"] }
        ]
    },
    { 
        id: 3, 
        name: "Julie Bernard", 
        email: "julie.bernard@universite.fr",
        phone: "+33 6 34 56 78 90",
        linkedin: "linkedin.com/in/juliebernard",
        github: "github.com/juliebernard",
        school: "Université Paris-Saclay", 
        location: "Paris, France", 
        year: "3ème année",
        desc: "Développeuse Java passionnée par le back-end et les architectures microservices.", 
        skills: ["Java", "Spring", "Git", "PostgreSQL", "Docker"],
        education: [
            { title: "Licence Informatique", school: "Université Paris-Saclay", dates: "2022 - 2025", location: "Paris" }
        ],
        experience: [
            { title: "Stage Développeur Java", company: "BankSoft", dates: "Avril 2024 - Juin 2024", location: "Paris", desc: "Développement de microservices avec Spring Boot pour une application bancaire." }
        ],
        projects: [
            { title: "Chat en temps réel", desc: "Application de messagerie en temps réel avec websockets et Spring.", tags: ["Java", "Spring", "WebSocket"] }
        ]
    },
    { 
        id: 4, 
        name: "Thomas Petit", 
        email: "thomas.petit@hexagone.edu",
        phone: "+33 6 45 67 89 01",
        linkedin: "linkedin.com/in/thomaspetit",
        github: "github.com/thomaspetit",
        school: "Hexagone - École Supérieure d'Informatique", 
        location: "Bordeaux, France", 
        year: "3ème année",
        desc: "Passionné par le développement front-end et les applications React.", 
        skills: ["React", "Node.js", "TypeScript", "Tailwind"],
        education: [
            { title: "Bachelor Développement Web", school: "Hexagone - École Supérieure d'Informatique", dates: "2022 - 2025", location: "Bordeaux" }
        ],
        experience: [
            { title: "Stage Front-End Developer", company: "WebAgency", dates: "Mai 2024 - Juillet 2024", location: "Bordeaux", desc: "Intégration de maquettes Figma en React." }
        ],
        projects: [
            { title: "Weather App", desc: "Application météo utilisant une API externe avec géolocalisation.", tags: ["React", "API", "CSS"] },
            { title: "Blog personnel", desc: "Blog statique généré avec Next.js et hébergé sur Vercel.", tags: ["Next.js", "React", "Markdown"] }
        ]
    },
    { 
        id: 5, 
        name: "Sophie Roux", 
        email: "sophie.roux@hexagone.edu",
        phone: "+33 6 56 78 90 12",
        linkedin: "linkedin.com/in/sophieroux",
        github: "github.com/sophieroux",
        school: "Hexagone - École Supérieure d'Informatique", 
        location: "Paris, France", 
        year: "5ème année",
        desc: "Designer UI/UX avec une forte sensibilité pour l'accessibilité et l'expérience utilisateur. Je cherche un CDI.", 
        skills: ["Figma", "UI/UX", "Adobe XD", "CSS", "HTML"],
        education: [
            { title: "Master Design d'Interfaces", school: "Hexagone - École Supérieure d'Informatique", dates: "2023 - 2025", location: "Paris" },
            { title: "Licence Arts Numériques", school: "Université de Nanterre", dates: "2020 - 2023", location: "Paris" }
        ],
        experience: [
            { title: "Alternance UI/UX Designer", company: "DesignStudio", dates: "Sept 2023 - Août 2024", location: "Paris", desc: "Création de maquettes et prototypes pour des applications mobiles." }
        ],
        projects: [
            { title: "Design System", desc: "Création d'un design system complet pour une startup avec composants Figma réutilisables.", tags: ["Figma", "UI/UX", "Design System"] }
        ]
    },
    { 
        id: 6, 
        name: "Antoine Leroy", 
        email: "antoine.leroy@hexagone.edu",
        phone: "+33 6 67 89 01 23",
        linkedin: "linkedin.com/in/antoineleroy",
        github: "github.com/antoineleroy",
        school: "Hexagone - École Supérieure d'Informatique", 
        location: "Lille, France", 
        year: "3ème année",
        desc: "Développeur PHP et Symfony, passionné par le back-end et les bonnes pratiques de code.", 
        skills: ["PHP", "Symfony", "MySQL", "Git", "Linux"],
        education: [
            { title: "Bachelor Développement Logiciel", school: "Hexagone - École Supérieure d'Informatique", dates: "2022 - 2025", location: "Lille" }
        ],
        experience: [
            { title: "Stage Développeur PHP", company: "WebCorp", dates: "Avril 2024 - Juin 2024", location: "Lille", desc: "Développement de fonctionnalités sur un CMS interne en Symfony." }
        ],
        projects: [
            { title: "Forum en ligne", desc: "Forum de discussion avec système d'authentification et de modération.", tags: ["PHP", "Symfony", "MySQL"] }
        ]
    }
];

export const mockCvs = [
    { id: 1, student_id: 1, name: "CV_Marie_Dubois.pdf", url: "/cv/marie_dubois.pdf" },
    { id: 2, student_id: 2, name: "CV_Lucas_Martin.pdf", url: "/cv/lucas_martin.pdf" },
    { id: 3, student_id: 4, name: "CV_Thomas_Petit.pdf", url: "/cv/thomas_petit.pdf" },
    { id: 4, student_id: 6, name: "CV_Antoine_Leroy.pdf", url: "/cv/antoine_leroy.pdf" }
];

export const mockJobs = [
    { id: 1, title: "Développeur Full-Stack React/Node.js", type: "Stage", company: "Hexagone", location: "Paris", duration: "6 mois", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", date: "Publié il y a 5 jours" },
    { id: 2, title: "Développeur Full-Stack React/Node.js", type: "Stage", company: "TechStart SAS", location: "Paris", duration: "6 mois", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", date: "Publié il y a 2 jours" },
];

export const mockPartners = [
    { 
        id: 1, 
        name: "Hexagone - École Supérieure d'Informatique", 
        subtitle: "Hexagone - Titre rncp 6 & 7", 
        desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", 
        email: "Contact@gmail.com", 
        website: "#",
        logo: logo_hexagone
    },
    { 
        id: 2, 
        name: "Griffith college Dublin", 
        subtitle: "Ireland school", 
        desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", 
        email: "Contact@gmail.com", 
        website: "#",
        logo: null
    }
];