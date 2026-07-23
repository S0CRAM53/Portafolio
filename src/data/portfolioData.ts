import iconWebLanding from "../assets/logoweblandingsuite-icon.webp";
import iconOnlyKick from "../assets/logoonlykick-icon.webp";
import healflowDashboard from '../assets/healflow/dashboard.webp';
import healflowRem from '../assets/healflow/gestionrem.webp';
import healflowCalculadora from '../assets/healflow/calculadoraclinica.webp';
import weblandingsuiteDemo from '../assets/videos/weblandingsuite-demo.mp4';

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
  demoVideo?: string;
  screenshots?: string[];
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
    icon: iconWebLanding,
    items: ["Plataforma SaaS para landing pages", "Integración de IA (Gemini, ChatGPT)", "Despliegue y arquitectura escalable"],
    details: {
      problem: "Los microemprendedores necesitan presencia digital para vender, pero a menudo carecen de conocimientos técnicos para programar o presupuesto para contratar agencias de diseño a medida. El proceso tradicional es lento y costoso.",
      solution: "Desarrollamos en equipo (3 personas) una plataforma SaaS integral que democratiza el acceso web. Dentro del equipo, lideré el backend completo (lógica de negocio), diseñé y construí la base de datos desde cero, y lideré la integración de la API de Python con los servicios de IA generativa. Utilizando esta IA, el sistema permite a cualquier usuario crear landing pages modernas, personalizadas y funcionales en cuestión de minutos, gestionando desde el diseño hasta el almacenamiento en la nube.",
      features: [
        "Diseño y construcción de la base de datos relacional desde cero, modelando usuarios, suscripciones y logs de sistema.",
        "Generación automatizada de contenido y estructura web mediante APIs de Inteligencia Artificial (FastAPI/Python), integración que lideré dentro del equipo.",
        "Dashboard administrativo completo para la gestión de usuarios, suscripciones y logs de sistema.",
        "Sistema de subida y optimización de imágenes integrado con Cloudinary.",
        "Seguridad robusta mediante autenticación JWT y encriptación de datos.",
        "Arquitectura de microservicios separando la lógica de negocio (Java) del motor de IA (Python).",
        "Flujo de trabajo colaborativo con Git Flow para el control de versiones en GitHub, coordinando el desarrollo entre los 3 integrantes del equipo."
      ],
      stack: ["React", "Vite", "Tailwind CSS", "Java", "Spring Boot", "Python", "FastAPI", "PostgreSQL", "Cloudinary", "JWT Auth", "Playwright"],
      demoVideo: weblandingsuiteDemo,
      repos: {
        frontend: "https://github.com/S0CRAM53/WLSuiteFrontend",
        backend: "https://github.com/S0CRAM53/Landingbackend",
        api: "https://github.com/Amaaruu/WLSuitePythonAPI"
      }
    }
  },
  {
    id: "02",
    title: "OnlyKick E-commerce.",
    icon: iconOnlyKick,
    items: ["E-commerce full-stack de zapatillas", "Proyecto en equipo (3 devs)", "React + Spring Boot + PostgreSQL"],
    details: {
      problem: "Una tienda de zapatillas necesita vender online sin depender de comisiones ni limitaciones de marketplaces genéricos, pero eso exige construir desde cero un sistema de catálogo, inventario, pagos y despacho — con un backend seguro y una experiencia de compra fluida.",
      solution: "Desarrollamos en equipo (3 personas) un e-commerce completo de punta a punta: una API REST propia en Spring Boot que modela todo el dominio del negocio (productos, inventario, ventas, direcciones regionalizadas para Chile), y un frontend en React que consume esa API, con autenticación de usuarios y un panel de administración independiente para gestionar el catálogo y los pedidos.",
      features: [
        "API REST en Spring Boot con arquitectura en capas (Controller-Service-Repository) y 19 entidades de dominio, incluyendo direcciones por región y comuna.",
        "Autenticación y autorización con JWT, contraseñas cifradas con BCrypt, y reglas de acceso público/privado definidas a nivel de Spring Security.",
        "Panel de administración separado del sitio público para gestión de productos, control de inventario y seguimiento de pedidos.",
        "Carrito de compras y flujo de checkout con métodos de pago y envío configurables desde el backend.",
        "Suite de pruebas automatizadas en el frontend (Karma + Jasmine) sobre componentes, páginas y flujos de administración.",
        "Documentación de la API generada automáticamente con Swagger/OpenAPI.",
        "CORS y variables de entorno preparadas para despliegue separado de frontend y backend en distintos dominios."
      ],
      stack: ["React", "Vite", "React Router", "React Hook Form", "Bootstrap", "Axios", "Java 21", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "Swagger/OpenAPI", "Karma", "Jasmine"],
      repos: {
        frontend: "https://github.com/S0CRAM53/OnlykickMainV2-main",
        backend: "https://github.com/S0CRAM53/OnlyKickBackend"
      }
    }
  },
  {
    id: "03",
    title: "Healflow Analytics.",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
    items: ["Dashboard hospitalario para hospital público real", "Visor 3D interactivo con Three.js", "React + Django REST + PostgreSQL"],
    details: {
      problem: "Un hospital público necesita monitorear indicadores clínicos y de gestión (ocupación de camas, KPIs por servicio, reportes estadísticos mensuales) de forma centralizada, pero el proceso tradicional basado en planillas manuales es lento, propenso a errores y no permite visibilidad en tiempo real.",
      solution: "Durante mi práctica profesional en Permify Spa, desarrollé junto a un compañero de práctica un sistema de analítica hospitalaria para el Hospital San José de Melipilla (proyecto autorizado por mi supervisor para ser mostrado públicamente). Me enfoqué en el frontend, el diseño y gestión de la base de datos, y la lógica de inserción y lectura de datos, mientras construíamos en conjunto una API REST en Django y un dashboard interactivo en React con autenticación por roles (administrador, médico, enfermería).",
      features: [
        "Diseño y gestión de la base de datos relacional en PostgreSQL, modelando servicios hospitalarios, indicadores clínicos y sus valores mensuales/anuales.",
        "Lógica de inserción y lectura de datos conectando el frontend en React con la API REST en Django REST Framework.",
        "Autenticación y control de acceso por roles (administrador, médico, enfermería) con rutas protegidas.",
        "Gestión de camas en tiempo real: creación y actualización de estado, nivel de cuidado y paciente asignado.",
        "Dashboards interactivos con KPIs y gráficos dinámicos (Chart.js) por servicio hospitalario.",
        "Visor 3D interactivo de la infraestructura del hospital, construido con Three.js (GLTFLoader + OrbitControls).",
        "API REST con endpoints filtrables por servicio y año, desplegada en Render."
      ],
      stack: ["React", "Vite", "React Router", "Chart.js", "Three.js", "Django", "Django REST Framework", "PostgreSQL", "Render"],
      repos: {
        frontend: "PEGA_AQUÍ_TU_URL_DE_GITHUB_FRONTEND",
        backend: "PEGA_AQUÍ_TU_URL_DE_GITHUB_BACKEND"
      },
      screenshots: [healflowDashboard, healflowRem, healflowCalculadora]
    }
  },
];

export const skills: SkillGroup[] = [
  { category: "Lenguajes & Frameworks", tools: ["Kotlin", "Python (Django, FastAPI)", "Java (Spring Boot)", "JavaScript", "React"] },
  { category: "Bases de Datos", tools: ["PostgreSQL", "NeonDB", "MongoDB", "SQL Developer"] },
  { category: "Herramientas & APIs", tools: ["Git", "GitHub", "Android Studio", "Render", "APIs REST"] },
];

export const languages: string[] = ["Español (Nativo)", "Inglés (Básico - Intermedio)"];