export interface ProjectRepos {
  frontend?: string;
  backend?: string;
  api?: string;
}

export interface ProjectDetails {
  problem?: string;
  solution?: string;
  features?: string[];
  stack?: string[];
  repos?: ProjectRepos;
  demo?: string;
}

export interface ProjectCard {
  id: string;
  title: string;
  icon: string;
  items: string[];
  details: ProjectDetails | null;
}

export interface SkillGroup {
  category: string;
  tools: string[];
}

export const navItems: string[] = ["Perfil", "Experiencia", "Proyectos", "Habilidades", "Contacto"];

export const featureCards: ProjectCard[] = [
  {
    id: "01",
    title: "WebLanding Suite.",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
    items: ["Plataforma SaaS para landing pages", "Integración de IA (Gemini, ChatGPT)", "Despliegue y arquitectura escalable"],
    details: {
      problem: "Los microemprendedores necesitan presencia digital para vender, pero a menudo carecen de conocimientos técnicos para programar o presupuesto para contratar agencias de diseño a medida. El proceso tradicional es lento y costoso.",
      solution: "Desarrollé una plataforma SaaS integral que democratiza el acceso web. Utilizando IA generativa, el sistema permite a cualquier usuario crear landing pages modernas, personalizadas y funcionales en cuestión de minutos, gestionando desde el diseño hasta el almacenamiento en la nube.",
      features: [
        "Generación automatizada de contenido y estructura web mediante APIs de Inteligencia Artificial (FastAPI/Python).",
        "Dashboard administrativo completo para la gestión de usuarios, suscripciones y logs de sistema.",
        "Sistema de subida y optimización de imágenes integrado con Cloudinary.",
        "Seguridad robusta mediante autenticación JWT y encriptación de datos.",
        "Arquitectura de microservicios separando la lógica de negocio (Java) del motor de IA (Python)."
      ],
      stack: ["React", "Vite", "Tailwind CSS", "Java", "Spring Boot", "Python", "FastAPI", "PostgreSQL", "Cloudinary", "JWT Auth", "Playwright"],
      repos: {
        frontend: "https://github.com/S0CRAM53/WLSuiteFrontend-main",
        backend: "https://github.com/S0CRAM53/Landingbackend-main",
        api: "https://github.com/S0CRAM53/WLSuitePythonAPI-main"
      }
    }
  },
  {
    id: "02",
    title: "Healflow Analytics.",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
    items: ["Gestión de métricas hospitalarias", "Dashboards interactivos con KPIs", "Python, PostgreSQL y Chart.js"],
    details: null
  },
  {
    id: "03",
    title: "OnlyKick App.",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
    items: ["E-commerce nativo de zapatillas", "Desarrollo en Kotlin", "UI/UX con Jetpack Compose"],
    details: null
  }
];

export const skills: SkillGroup[] = [
  { category: "Lenguajes & Frameworks", tools: ["Kotlin", "Python (Django, FastAPI)", "Java (Spring Boot)", "JavaScript", "React"] },
  { category: "Bases de Datos", tools: ["PostgreSQL", "NeonDB", "MongoDB", "SQL Developer"] },
  { category: "Herramientas & APIs", tools: ["Git", "GitHub", "Android Studio", "Render", "APIs REST"] },
];

export const languages: string[] = ["Español (Nativo)", "Inglés (Básico - Intermedio)"];