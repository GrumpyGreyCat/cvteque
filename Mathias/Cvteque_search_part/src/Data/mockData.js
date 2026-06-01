import logo_hexagone from '../assets/hexagone_logo.png'

export const mockStudents = [
    { id: 1, name: "Marie Dubois", school: "Hexagone - 3ème année", location: "Paris", desc: "Lorem ipsum...", skills: ["React", "Node.js", "Figma"] },
    { id: 2, name: "Lucas Martin", school: "Hexagone - 4ème année", location: "Lyon", desc: "Lorem ipsum...", skills: ["Vue", "PHP", "SQL"] },
    { id: 3, name: "Julie Bernard", school: "Autre école", location: "Paris", desc: "Lorem ipsum...", skills: ["Java", "Spring", "Git"] },
    { id: 4, name: "Thomas Petit", school: "Hexagone - 3ème année", location: "Bordeaux", desc: "Lorem ipsum...", skills: ["React", "Node.js"] },
    { id: 5, name: "Sophie Roux", school: "Hexagone - 5ème année", location: "Paris", desc: "Lorem ipsum...", skills: ["Figma", "UI/UX"] },
    { id: 6, name: "Antoine Leroy", school: "Hexagone - 3ème année", location: "Lille", desc: "Lorem ipsum...", skills: ["PHP", "Symfony"] },
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
        desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.", 
        email: "Contact@gmail.com", 
        website: "#",
        logo: logo_hexagone
    },
    { 
        id: 2, 
        name: "Griffith college Dublin", 
        subtitle: "Ireland school", 
        desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.", 
        email: "Contact@gmail.com", 
        website: "#",
        logo: null
    }
];