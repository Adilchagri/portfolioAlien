import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ChevronRight, Terminal, Cpu, Database, Layout, Globe, Moon, Sun, GraduationCap, Briefcase, Award, LineChart, ShoppingCart, Building, Map, Smartphone, Server, MessageCircle } from 'lucide-react';

// --- TRANSLATIONS & DATA ---
const TRANSLATIONS = {
  ar: {
    dir: "rtl",
    firstName: "عادل",
    nickname: "Alien",
    lastName: "شكري",
    title: "مهندس ذكاء اصطناعي وبيانات ضخمة | مطور واجهات شاملة",
    tagline: "خبير مستقبلي في الذكاء الاصطناعي وتطوير الويب، أجمع بين الخبرة الأكاديمية القوية في التعلم العميق والقدرة العملية على نشر بنى البيانات الضخمة وتطبيقات الويب.",
    systemOnline: "نظام Alien متصل 👽",
    scrollExplore: "التمرير للاستكشاف",
    initiateContact: "بدء الاتصال",
    
    sec01_tag: "01. البنية العصبية",
    sec01_title: "جوهر عملي",
    about: "أتابع حالياً درجة الماجستير المتخصص في نظم المعلومات والذكاء الاصطناعي. بصفتي الأول على دفعتي (Majorant) في شهادة التقني العالي، أسعى لتطبيق مهاراتي في بناء خطوط أنابيب البيانات (Data Pipelines) والنمذجة التنبؤية، مع قدرة عالية على بناء الواجهات الأمامية والخلفية (Full Stack).",
    card_dataTitle: "البيانات الضخمة والذكاء الاصطناعي",
    card_dataDesc: "تطوير نماذج التعلم العميق (LSTM, TensorFlow) ومعالجة البيانات (Kafka, Spark).",
    card_webTitle: "تطوير الواجهات الشاملة",
    card_webDesc: "هندسة تطبيقات الويب الحديثة (React.js, PHP, Tailwind CSS).",
    techMatrix: "مصفوفة الكفاءة التقنية",

    sec02_tag: "02. الأنظمة المنشورة",
    sec02_title: "المشاريع المميزة",
    
    sec03_tag: "03. المسار المهني",
    sec03_title: "الخبرة والتعليم",
    
    sec04_tag: "04. بدء التواصل",
    sec04_title: "لنصنع المستقبل معاً",
    sec04_desc: "سواء كنت تبحث عن مهندس بيانات ضخمة، مطور واجهات شاملة، أو خبير في الذكاء الاصطناعي لمشروعك القادم، فإن صندوق الوارد الخاص بي مفتوح دائماً.",
    email: "راسلني عبر البريد",
    whatsapp: "تواصل عبر واتساب",
    
    loading: "جاري تهيئة بروتوكول Alien... 👽",

    projects: [
      { id: "01", title: "نظام التنبؤ المالي بالتعلم العميق", category: "مشروع شخصي (رئيسي)", tech: ["Python", "TensorFlow", "LSTM", "Plotly"], description: "تطوير نظام تداول خوارزمي يعامل السوق كمشكلة تصنيف (بيع/شراء). تم دمج بيانات حية عبر WebSockets ومحرك اختبار أداء خلفي موجه.", link: "https://github.com/Adilchagri", icon: LineChart },
      { id: "02", title: "BytBazzare - منصة تجارة إلكترونية", category: "مشروع تطوير شامل", tech: ["PHP", "MySQL", "Bootstrap"], description: "تصميم سوق رقمي آمن مع إدارة معقدة لكتالوج المنتجات، بالإضافة إلى تنفيذ مصادقة المستخدمين وتدفقات الدفع الآمنة.", link: "https://github.com/Adilchagri", icon: ShoppingCart },
      { id: "03", title: "SitePFE - بوابة مؤسسية", category: "مشروع تخرج", tech: ["PHP", "SQL", "هندسة الويب"], description: "تطوير حل ويب مخصص لتلبية الاحتياجات التنظيمية الأكاديمية المحددة، مع تحسين قواعد البيانات لاستعلامات سريعة.", link: "https://github.com/Adilchagri", icon: Building },
      { id: "04", title: "تجزئة صور الأقمار الصناعية", category: "التعلم العميق والرؤية الحاسوبية", tech: ["Python", "TensorFlow", "OpenCV"], description: "بناء نموذج تعلم عميق للتحليل الدقيق والتجزئة الدلالية لصور الأقمار الصناعية عالية الدقة لتطبيقات الخرائط.", link: "https://github.com/Adilchagri", icon: Map },
      { id: "05", title: "تطبيق حساب الزكاة", category: "هندسة تطبيقات الهاتف", tech: ["Mobile SDKs", "API", "UI/UX"], description: "تطبيق هاتف محمول شامل مصمم لإجراء حسابات مالية دقيقة مع تجربة مستخدم سلسة وموثوقة.", link: "https://github.com/Adilchagri", icon: Smartphone },
      { id: "06", title: "نظام أوراكل لمدفوعات الطلاب", category: "قواعد البيانات وهندسة البرمجيات", tech: ["Oracle DB", "SQL", "تحليل مالي"], description: "نظام شامل وقوي لتتبع الرسوم الدراسية، وإدارة البيانات بأمان تام، وتحليل ملفات المخاطر المالية.", link: "https://github.com/Adilchagri", icon: Server }
    ],
    experience: [
      { role: "ماجستير في نظم المعلومات والذكاء الاصطناعي", company: "الكلية متعددة التخصصات بخريبكة (مسار التميز)", date: "2024 - الحاضر", description: "دراسات عليا متقدمة تركز على التعلم العميق، الرؤية الحاسوبية، البيانات الضخمة والنمذجة التنبؤية.", icon: Cpu },
      { role: "متدرب مهندس ويب (Web Architect)", company: "جماعة خريبكة (Commune de Khouribga)", date: "صيف 2024", description: "تصميم ونشر البوابة الرسمية للبلدية. تنفيذ بنية قابلة للتطوير وتحسين تجربة وواجهة المستخدم (UX/UI).", icon: Briefcase },
      { role: "إجازة في نظم المعلومات والذكاء الاصطناعي", company: "الكلية متعددة التخصصات بخريبكة", date: "2023 - 2024", description: "تعميق المعارف في الخوارزميات، الذكاء الاصطناعي، وهندسة النظم المعلوماتية الحديثة.", icon: GraduationCap },
      { role: "نائب الرئيس - نادي تكنولوجيا المعلومات والروبوتات", company: "نادي الخوارزمي (FPK)", date: "2023 - الحاضر", description: "قيادة ورش عمل تقنية في الذكاء الاصطناعي وإدارة مشاريع الطلاب التقنية.", icon: Terminal },
      { role: "متدرب مطور واجهات أمامية", company: "شركة Tech 57 - خريبكة", date: "ماي 2023", description: "تطوير واجهات متجاوبة للموقع الرسمي للشركة، ودمج المكونات التفاعلية باستخدام JavaScript و jQuery.", icon: Briefcase },
      { role: "شهادة التقني العالي (BTS) في الوسائط المتعددة وتصميم الويب", company: "الثانوية التقنية بشيشاوة", date: "2021 - 2023", description: "الأول على الدفعة (Majorant) على مستوى جهة مراكش-آسفي. إتقان شامل لتطوير وتصميم الويب.", icon: Award },
      { role: "بكالوريا في العلوم الفيزيائية", company: "ثانوية الداخلة التأهيلية", date: "2021", description: "التخرج بميزة حسن (Mention Bien) مع أساس قوي في الرياضيات والعلوم.", icon: GraduationCap }
    ],
    skills: [
      { name: "الذكاء الاصطناعي وعلم البيانات (TensorFlow/Python)", level: 90 },
      { name: "البيانات الضخمة والخوادم (Kafka/Spark/Oracle)", level: 85 },
      { name: "تطوير الويب (React/PHP/JS)", level: 95 },
      { name: "أدوات التطوير (Docker/Git/Agile)", level: 85 }
    ]
  },
  en: {
    dir: "ltr",
    firstName: "Adil",
    nickname: "Alien",
    lastName: "Chagri",
    title: "AI & Big Data Engineer | Full Stack Developer",
    tagline: "Future expert in Artificial Intelligence and Web Development, combining solid academic expertise in Deep Learning with practical ability to deploy Big Data architectures.",
    systemOnline: "Alien System Online 👽",
    scrollExplore: "Scroll to explore",
    initiateContact: "Initialize Contact",

    sec01_tag: "01. Neural Architecture",
    sec01_title: "About My Core",
    about: "Currently pursuing a specialized Master's degree in Information Systems and AI. As a Valedictorian (BTS) in Web Design, I specialize in building end-to-end solutions. From architecting deep learning financial forecasting models to deploying full-stack web applications, I am actively seeking opportunities to apply my skills in data pipelines and predictive modeling.",
    card_dataTitle: "AI & Big Data",
    card_dataDesc: "Deep Learning (LSTM, TensorFlow) & Data Pipelines (Kafka, Spark).",
    card_webTitle: "Full Stack Web",
    card_webDesc: "Modern web architectures (React.js, PHP, Tailwind CSS).",
    techMatrix: "Technical Proficiency Matrix",

    sec02_tag: "02. Deployed Systems",
    sec02_title: "Featured Projects",
    
    sec03_tag: "03. Career Trajectory",
    sec03_title: "Experience & Education",
    
    sec04_tag: "04. Initiate Communication",
    sec04_title: "Let's Build The Future",
    sec04_desc: "Whether you're seeking a Big Data engineer, a full-stack developer, or an AI expert for your next predictive modeling project, my inbox is open.",
    email: "Send an Email",
    whatsapp: "Chat on WhatsApp",

    loading: "Initializing Alien Protocol... 👽",

    projects: [
      { id: "01", title: "Deep Learning Financial Forecasting", category: "Personal Project (Flagship)", tech: ["Python", "TensorFlow", "LSTM", "Plotly"], description: "Developed an algorithmic trading system treating the market as a classification problem. Implemented custom LSTM architectures and integrated real-time data feeds via WebSockets.", link: "https://github.com/Adilchagri", icon: LineChart },
      { id: "02", title: "BytBazzare - E-Commerce Platform", category: "Full Stack Project", tech: ["PHP", "MySQL", "Bootstrap"], description: "Designed a secure digital marketplace with complex product catalog management, user authentication, and secure payment flows.", link: "https://github.com/Adilchagri", icon: ShoppingCart },
      { id: "03", title: "SitePFE - Institutional Portal", category: "Capstone Project", tech: ["PHP", "SQL", "Web Architecture"], description: "Developed a custom web solution to address specific academic organizational needs. Optimized SQL databases for rapid query management.", link: "https://github.com/Adilchagri", icon: Building },
      { id: "04", title: "Satellite Image Segmentation", category: "Deep Learning & CV", tech: ["Python", "TensorFlow", "OpenCV"], description: "Advanced deep learning model designed for precise satellite imagery analysis and semantic segmentation for mapping applications.", link: "https://github.com/Adilchagri", icon: Map },
      { id: "05", title: "Zakat Calculation App", category: "Mobile Engineering", tech: ["Mobile SDKs", "API", "UI/UX"], description: "End-to-end mobile application developed for accurate financial calculations and a seamless user experience.", link: "https://github.com/Adilchagri", icon: Smartphone },
      { id: "06", title: "Oracle Student Payment System", category: "Database & Enterprise", tech: ["Oracle DB", "SQL", "Analytics"], description: "Comprehensive database system built to securely track tuition, manage transactions, and analyze financial risk profiles.", link: "https://github.com/Adilchagri", icon: Server }
    ],
    experience: [
      { role: "Master's in Information Systems and AI", company: "FPK (Excellence Track)", date: "2024 - Present", description: "Advanced studies focusing on Deep Learning, Big Data, Computer Vision, and scalable architectures.", icon: Cpu },
      { role: "Web Architect Intern", company: "Commune de Khouribga", date: "Summer 2024", description: "Designed and deployed the official municipal portal. Implemented scalable architecture and optimized user experience (UX/UI).", icon: Briefcase },
      { role: "Bachelor's (Licence) in Information Systems & AI", company: "Faculté Polydisciplinaire de Khouribga (FPK)", date: "2023 - 2024", description: "Deepened foundational knowledge in algorithms, artificial intelligence, and modern software engineering.", icon: GraduationCap },
      { role: "Vice-President IT & Robotics Club", company: "Al Khawarizmi Club (FPK)", date: "2023 - Present", description: "Leading technical workshops on AI and managing student tech projects.", icon: Terminal },
      { role: "Frontend Developer Intern", company: "Entreprise Tech 57 - Khouribga", date: "May 2023", description: "Developed responsive interfaces for the corporate website. Integrated interactive components via JavaScript and jQuery to improve client engagement.", icon: Briefcase },
      { role: "BTS in Multimedia and Web Design", company: "Lycée Technique Chichoua", date: "2021 - 2023", description: "Valedictorian (Top of Class in Marrakech-Safi Region). Mastered UI/UX and web development frameworks.", icon: Award },
      { role: "Baccalaureate in Physical Sciences", company: "Lycée Qualifiant Dakhla", date: "2021", description: "Graduated with Distinction (Mention Bien), building a strong foundation in mathematics and sciences.", icon: GraduationCap }
    ],
    skills: [
      { name: "AI & Data Science (TensorFlow/Python)", level: 90 },
      { name: "Big Data & Backend (Kafka/Spark/Oracle)", level: 85 },
      { name: "Web Development (React/PHP/JS)", level: 95 },
      { name: "DevOps & Tools (Docker/Git/Agile)", level: 85 }
    ]
  },
  fr: {
    dir: "ltr",
    firstName: "Adil",
    nickname: "Alien",
    lastName: "Chagri",
    title: "Ingénieur IA & Big Data | Développeur Full Stack",
    tagline: "Futur expert en Intelligence Artificielle et Développement Web, alliant solide expertise académique en Deep Learning et capacité pratique à déployer des architectures Big Data.",
    systemOnline: "Système Alien en Ligne 👽",
    scrollExplore: "Défiler pour explorer",
    initiateContact: "Initier le Contact",

    sec01_tag: "01. Architecture Neurale",
    sec01_title: "À Propos de Mon Profil",
    about: "Actuellement en Master spécialisé en Systèmes d'Information et IA. Major de promotion (BTS) en conception web, je me spécialise dans les solutions de bout en bout. De l'architecture de modèles de prévisions financières (Deep Learning) au déploiement d'applications web Full Stack, je cherche à appliquer mes compétences en data pipelines et modélisation prédictive.",
    card_dataTitle: "IA & Big Data",
    card_dataDesc: "Deep Learning (LSTM, TensorFlow) & Data Pipelines (Kafka, Spark).",
    card_webTitle: "Web Full Stack",
    card_webDesc: "Architectures web modernes (React.js, PHP, Tailwind CSS).",
    techMatrix: "Matrice de Compétences Techniques",

    sec02_tag: "02. Systèmes Déployés",
    sec02_title: "Projets Mis en Avant",
    
    sec03_tag: "03. Trajectoire Professionnelle",
    sec03_title: "Expérience et Éducation",
    
    sec04_tag: "04. Initier la Communication",
    sec04_title: "Construisons l'Avenir",
    sec04_desc: "Que vous cherchiez un ingénieur Big Data, un développeur Full Stack ou un expert en IA pour vos projets de modélisation, ma boîte de réception est ouverte.",
    email: "Envoyer un E-mail",
    whatsapp: "Discuter sur WhatsApp",

    loading: "Initialisation du Protocole Alien... 👽",

    projects: [
      { id: "01", title: "Prévisions Financières par Deep Learning", category: "Projet Personnel (Phare)", tech: ["Python", "TensorFlow", "LSTM", "Plotly"], description: "Développement d'un système de trading algorithmique traitant le marché comme un problème de classification. Implémentation d'architectures LSTM personnalisées et flux de données en temps réel.", link: "https://github.com/Adilchagri", icon: LineChart },
      { id: "02", title: "BytBazzare - Plateforme E-Commerce", category: "Projet Full Stack", tech: ["PHP", "MySQL", "Bootstrap"], description: "Conception d'un marché numérique sécurisé avec gestion complexe de catalogue, authentification des utilisateurs et flux de paiement.", link: "https://github.com/Adilchagri", icon: ShoppingCart },
      { id: "03", title: "SitePFE - Portail Institutionnel", category: "Projet de Fin d'Études", tech: ["PHP", "SQL", "Architecture Web"], description: "Développement d'une solution web sur mesure pour répondre aux besoins d'organisation académique. Optimisation des bases de données SQL.", link: "https://github.com/Adilchagri", icon: Building },
      { id: "04", title: "Segmentation d'Images Satellitaires", category: "Deep Learning & CV", tech: ["Python", "TensorFlow", "OpenCV"], description: "Modèle d'apprentissage profond conçu pour l'analyse précise et la segmentation sémantique d'images satellitaires.", link: "https://github.com/Adilchagri", icon: Map },
      { id: "05", title: "Application de Calcul de Zakat", category: "Ingénierie Mobile", tech: ["Mobile SDKs", "API", "UI/UX"], description: "Application mobile de bout en bout développée pour des calculs financiers précis et une expérience utilisateur fluide.", link: "https://github.com/Adilchagri", icon: Smartphone },
      { id: "06", title: "Système de Paiement Étudiant Oracle", category: "Base de données", tech: ["Oracle DB", "SQL", "Analyse"], description: "Système complet pour suivre les frais de scolarité, gérer les données en toute sécurité et analyser les profils de risque.", link: "https://github.com/Adilchagri", icon: Server }
    ],
    experience: [
      { role: "Master en Systèmes d'Information et IA", company: "FPK (Parcours d'Excellence)", date: "2024 - Présent", description: "Études avancées axées sur le Deep Learning, le Big Data, la Vision par Ordinateur et les architectures évolutives.", icon: Cpu },
      { role: "Stagiaire Architecte Web", company: "Commune de Khouribga", date: "Été 2024", description: "Conception et déploiement du portail municipal officiel. Mise en œuvre d'une architecture évolutive et optimisation UX/UI.", icon: Briefcase },
      { role: "Licence en Systèmes d'Information et IA", company: "Faculté Polydisciplinaire de Khouribga", date: "2023 - 2024", description: "Approfondissement des connaissances fondamentales en algorithmique, intelligence artificielle et génie logiciel.", icon: GraduationCap },
      { role: "Vice-Président Club IT & Robotique", company: "Club Al Khawarizmi (FPK)", date: "2023 - Présent", description: "Animation d'ateliers techniques sur l'IA et gestion de projets étudiants.", icon: Terminal },
      { role: "Stagiaire Développeur Frontend", company: "Entreprise Tech 57 - Khouribga", date: "Mai 2023", description: "Développement d'interfaces réactives pour le site de l'entreprise. Intégration de composants via JavaScript et jQuery.", icon: Briefcase },
      { role: "BTS Multimédia et Conception Web", company: "Lycée Technique Chichoua", date: "2021 - 2023", description: "Major de Promotion (Région Marrakech-Safi). Maîtrise de l'UI/UX et des frameworks web.", icon: Award },
      { role: "Baccalauréat en Sciences Physiques", company: "Lycée Qualifiant Dakhla", date: "2021", description: "Obtenu avec Mention Bien, construisant de solides bases en mathématiques et sciences.", icon: GraduationCap }
    ],
    skills: [
      { name: "IA & Data Science (TensorFlow/Python)", level: 90 },
      { name: "Big Data & Backend (Kafka/Spark)", level: 85 },
      { name: "Développement Web (React/PHP)", level: 95 },
      { name: "DevOps & Outils (Docker/Git/Agile)", level: 85 }
    ]
  }
};

// --- 3D COMPONENTS WITH THEME SUPPORT ---

const ParticleBackground = ({ isDark }) => {
  const mountRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const count = 4000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 15 + Math.random() * 10;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: isDark ? 0x00ffcc : 0x00a388,
      size: 0.03,
      transparent: true,
      opacity: isDark ? 0.6 : 0.8,
      sizeAttenuation: true
    });
    materialRef.current = material;
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      particles.rotation.x -= 0.001;
      particles.rotation.y -= 0.002;
      particles.position.x += (mouseX * 1.5 - particles.position.x) * 0.05;
      particles.position.y += (mouseY * 1.5 - particles.position.y) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if(mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []); 

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.setHex(isDark ? 0x00ffcc : 0x00a388);
      materialRef.current.opacity = isDark ? 0.6 : 0.8;
    }
  }, [isDark]);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const AICoreCanvas = ({ isDark }) => {
  const mountRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.5, 3);
    const material = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0a0a0a : 0xffffff,
      emissive: isDark ? 0x004433 : 0x00a388,
      emissiveIntensity: isDark ? 0.5 : 0.2,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true 
    });
    materialRef.current = material;
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const light1 = new THREE.DirectionalLight(0x00ffcc, 2);
    light1.position.set(10, 10, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x3b82f6, 1);
    light2.position.set(-10, -10, -5);
    scene.add(light2);

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    let time = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;
      sphere.rotation.x = time * 0.2;
      sphere.rotation.y = time * 0.3;
      sphere.position.y = Math.sin(time * 2) * 0.1;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.setHex(isDark ? 0x0a0a0a : 0xffffff);
      materialRef.current.emissive.setHex(isDark ? 0x004433 : 0x00a388);
      materialRef.current.emissiveIntensity = isDark ? 0.5 : 0.2;
    }
  }, [isDark]);

  return <div ref={mountRef} className="w-full h-full" />;
};

// --- UI COMPONENTS ---

const CinematicIntro = ({ onComplete, t }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return p + Math.floor(Math.random() * 15);
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="w-72 flex flex-col items-center text-center">
        <div className="text-[#00ffcc] font-mono text-sm mb-4 tracking-widest uppercase animate-pulse">
          {t.loading}
        </div>
        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#00ffcc] shadow-[0_0_15px_#00ffcc]"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>
        <div className="text-gray-500 font-mono text-xs mt-2">{Math.min(progress, 100)}%</div>
      </div>
    </motion.div>
  );
};

const CustomCursor = ({ isDark }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const cursorColor = isDark ? '0, 255, 204' : '0, 163, 136';

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[100] mix-blend-difference flex items-center justify-center"
      style={{ borderColor: `rgb(${cursorColor})` }}
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? `rgba(${cursorColor}, 1)` : `rgba(${cursorColor}, 0)`,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <motion.div className="w-1 h-1 rounded-full" style={{ backgroundColor: `rgb(${cursorColor})` }} />
    </motion.div>
  );
};

const TiltCard = ({ children, className, isDark }) => {
  const x = useSpring(0, { stiffness: 400, damping: 30 });
  const y = useSpring(0, { stiffness: 400, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 20);
    y.set(yPct * -20);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cardBg = isDark ? "bg-white/5 border-white/10" : "bg-white/60 border-gray-200 shadow-xl";
  const glow = isDark ? "from-[#00ffcc]/10" : "from-[#00a388]/10";

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY: x, rotateX: y, transformStyle: "preserve-3d" }}
      className={`relative rounded-2xl border backdrop-blur-md p-6 overflow-hidden ${cardBg} ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${glow} to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100`} />
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

const AlienBadge = ({ text, isDark }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/[]{}—=+*^?#";

  const scramble = () => {
    let pos = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((char, index) => {
          if (index < pos) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (pos >= text.length) clearInterval(interval);
      pos += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    const interval = setInterval(scramble, 4000); // Scramble randomly every 4 seconds
    return () => clearInterval(interval);
  }, [text]);

  const accent = isDark ? "text-[#00ffcc]" : "text-[#00a388]";
  const border = isDark ? "border-[#00ffcc]/40" : "border-[#00a388]/40";
  const bg = isDark ? "bg-[#00ffcc]/10" : "bg-[#00a388]/10";
  const glow = isDark ? "shadow-[0_0_20px_rgba(0,255,204,0.5)]" : "shadow-[0_0_20px_rgba(0,163,136,0.5)]";

  return (
    <motion.div
      onMouseEnter={scramble}
      whileHover={{
        scale: 1.1,
        rotateX: 360, // Acrobatic 3D front-flip
        rotateZ: [0, -5, 5, -5, 0], // Wiggle effect
      }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className={`inline-flex items-center justify-center px-4 py-1 mx-2 rounded-full border backdrop-blur-md relative overflow-hidden cursor-crosshair ${border} ${bg} ${glow}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Laser Scanner Effect */}
      <motion.div
        animate={{ top: ["-50%", "150%"] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className={`absolute left-0 w-full h-[15px] ${isDark ? 'bg-[#00ffcc]/40' : 'bg-[#00a388]/40'} blur-[4px]`}
      />

      <span className={`relative z-10 font-mono font-black tracking-widest uppercase italic text-3xl md:text-5xl ${accent}`}>
        {displayText}
      </span>
      
      {/* Floating Rotating Alien */}
      <motion.span
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ rotate: { repeat: Infinity, duration: 3, ease: "linear" }, scale: { repeat: Infinity, duration: 1.5 } }}
        className="mx-2 relative z-10 text-2xl md:text-4xl inline-block origin-center"
      >
        👽
      </motion.span>
    </motion.div>
  );
};

// --- MAIN APPLICATION ---

export default function App() {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [introFinished, setIntroFinished] = useState(false);
  
  const t = TRANSLATIONS[lang];
  const isDark = theme === 'dark';
  const isRTL = t.dir === 'rtl';

  useEffect(() => {
    if (!introFinished) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [introFinished]);

  // Dynamic Styles
  const bgClass = isDark ? "bg-[#030303]" : "bg-[#f8fafc]";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-600";
  const accentColor = isDark ? "text-[#00ffcc]" : "text-[#00a388]";
  const accentBg = isDark ? "bg-[#00ffcc]" : "bg-[#00a388]";
  const btnText = isDark ? "text-black" : "text-white";

  return (
    <div className={`${bgClass} min-h-screen font-sans transition-colors duration-500 overflow-x-hidden`} dir={t.dir}>
      <CustomCursor isDark={isDark} />
      
      {/* FLOATING CONTROLS */}
      {introFinished && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-6 ${isRTL ? 'left-6' : 'right-6'} z-50 flex items-center gap-3`}
          dir="ltr"
        >
          {/* Language Switcher */}
          <div className={`flex items-center rounded-full border backdrop-blur-md p-1 ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/80 border-gray-300 shadow-md'}`}>
             {['ar', 'en', 'fr'].map((l) => (
               <button 
                 key={l}
                 onClick={() => setLang(l)}
                 className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${lang === l ? (isDark ? 'bg-[#00ffcc] text-black' : 'bg-[#00a388] text-white') : (isDark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-black/5')}`}
               >
                 {l.toUpperCase()}
               </button>
             ))}
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-full border backdrop-blur-md transition-all ${isDark ? 'bg-white/10 border-white/20 text-yellow-400 hover:bg-white/20' : 'bg-white/80 border-gray-300 text-gray-800 shadow-md hover:bg-black/5'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {!introFinished && <CinematicIntro onComplete={() => setIntroFinished(true)} t={t} />}
      </AnimatePresence>

      <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000">
        {introFinished && <ParticleBackground isDark={isDark} />}
      </div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center pt-20 pb-10">
          <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={introFinished ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-mono mb-6 ${isDark ? 'bg-[#00ffcc]/10 border-[#00ffcc]/30 text-[#00ffcc]' : 'bg-[#00a388]/10 border-[#00a388]/30 text-[#00a388]'}`}>
                <span className={`w-2 h-2 rounded-full animate-pulse ${isRTL ? 'ml-2' : 'mr-2'} ${accentBg}`} />
                <span>{t.systemOnline}</span>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-4 flex flex-wrap gap-y-4 gap-x-2 md:gap-x-4 items-center ${textPrimary}`}>
                <span>{t.firstName}</span>
                <AlienBadge text={t.nickname} isDark={isDark} />
                <span>{t.lastName}</span>
              </h1>

              <h2 className={`text-2xl md:text-3xl font-light text-transparent bg-clip-text mb-6 ${isDark ? 'bg-gradient-to-r from-gray-300 to-[#00ffcc]' : 'bg-gradient-to-r from-gray-600 to-[#00a388]'}`} style={{ backgroundImage: isRTL ? (isDark ? 'linear-gradient(to left, #d1d5db, #00ffcc)' : 'linear-gradient(to left, #4b5563, #00a388)') : undefined }}>
                {t.title}
              </h2>
              <p className={`text-lg md:text-xl max-w-xl mb-10 leading-relaxed ${textSecondary}`}>
                {t.tagline}
              </p>
              
              <div className="flex flex-wrap items-center gap-6">
                <a href="#contact" className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center group ${accentBg} ${btnText} ${isDark ? 'hover:bg-white hover:shadow-[0_0_30px_#00ffcc]' : 'hover:bg-gray-900 shadow-lg'}`}>
                  {t.initiateContact} 
                  <ChevronRight className={`${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'} transition-transform`} size={20} />
                </a>
                <div className="flex gap-4">
                  <a href="https://github.com/Adilchagri" target="_blank" rel="noreferrer" className={`p-3 rounded-full border transition-colors ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white hover:border-[#00ffcc]/50' : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-[#00a388]/50 shadow-sm'}`}>
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/adilchagri/" target="_blank" rel="noreferrer" className={`p-3 rounded-full border transition-colors ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white hover:border-[#00ffcc]/50' : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-[#00a388]/50 shadow-sm'}`}>
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative hidden md:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={introFinished ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
              className="absolute inset-0"
            >
              {introFinished && <AICoreCanvas isDark={isDark} />}
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={introFinished ? { opacity: 1 } : {}}
            transition={{ delay: 2, duration: 1 }}
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center`}
          >
            <span className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">{t.scrollExplore}</span>
            <div className={`w-[1px] h-12 bg-gradient-to-b ${isDark ? 'from-[#00ffcc]' : 'from-[#00a388]'} to-transparent`} />
          </motion.div>
        </section>

        {/* ABOUT & SKILLS SECTION */}
        <section id="about" className="py-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            <div>
              <h3 className={`${accentColor} font-mono text-sm uppercase tracking-widest mb-2`}>{t.sec01_tag}</h3>
              <h2 className={`text-4xl font-bold mb-6 ${textPrimary}`}>{t.sec01_title}</h2>
              <p className={`text-lg leading-relaxed mb-8 ${textSecondary}`}>
                {t.about}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <TiltCard isDark={isDark} className="p-4">
                  <Database className={`${accentColor} mb-3`} size={28} />
                  <h4 className={`font-semibold mb-1 ${textPrimary}`}>{t.card_dataTitle}</h4>
                  <p className={`text-sm ${textSecondary}`}>{t.card_dataDesc}</p>
                </TiltCard>
                <TiltCard isDark={isDark} className="p-4">
                  <Globe className={`${accentColor} mb-3`} size={28} />
                  <h4 className={`font-semibold mb-1 ${textPrimary}`}>{t.card_webTitle}</h4>
                  <p className={`text-sm ${textSecondary}`}>{t.card_webDesc}</p>
                </TiltCard>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <h3 className={`text-2xl font-semibold mb-4 ${textPrimary}`}>{t.techMatrix}</h3>
              {t.skills.map((skill, index) => (
                <div key={index} className="w-full">
                  <div className="flex justify-between mb-2">
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{skill.name}</span>
                    <span className={`${accentColor} font-mono`} dir="ltr">{skill.level}%</span>
                  </div>
                  <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${isDark ? 'from-blue-500 to-[#00ffcc]' : 'from-blue-600 to-[#00a388]'}`}
                      style={{ backgroundImage: isRTL ? (isDark ? 'linear-gradient(to left, #3b82f6, #00ffcc)' : 'linear-gradient(to left, #2563eb, #00a388)') : undefined }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h3 className={`${accentColor} font-mono text-sm uppercase tracking-widest mb-2`}>{t.sec02_tag}</h3>
            <h2 className={`text-4xl font-bold ${textPrimary}`}>{t.sec02_title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.projects.map((project, index) => {
              const ProjIcon = project.icon || ExternalLink;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <TiltCard isDark={isDark} className="h-full flex flex-col group cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                      <span className={`${accentColor} font-mono text-5xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 font-bold`}>
                        {project.id}
                      </span>
                      <a href={project.link} className={`p-2 rounded-full transition-colors ${isDark ? 'bg-white/5 hover:bg-[#00ffcc] hover:text-black text-white' : 'bg-gray-100 hover:bg-[#00a388] hover:text-white text-gray-700'}`}>
                        <ProjIcon size={18} />
                      </a>
                    </div>
                    <h4 className={`${accentColor} text-xs font-mono mb-2 uppercase tracking-wider`}>{project.category}</h4>
                    <h3 className={`text-2xl font-bold mb-4 transition-colors ${textPrimary} ${isDark ? 'group-hover:text-[#00ffcc]' : 'group-hover:text-[#00a388]'}`}>{project.title}</h3>
                    <p className={`text-sm mb-6 flex-grow ${textSecondary}`}>{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map(tech => (
                        <span key={tech} className={`px-2 py-1 text-xs font-mono rounded border ${isDark ? 'text-gray-300 bg-white/5 border-white/10' : 'text-gray-600 bg-gray-100 border-gray-200'}`} dir="ltr">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="py-24 relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="mb-16 text-center"
          >
            <h3 className={`${accentColor} font-mono text-sm uppercase tracking-widest mb-2`}>{t.sec03_tag}</h3>
            <h2 className={`text-4xl font-bold ${textPrimary}`}>{t.sec03_title}</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            <div className={`absolute top-0 bottom-0 w-[1px] bg-gradient-to-b ${isDark ? 'from-[#00ffcc]/50 via-white/10' : 'from-[#00a388]/50 via-gray-300'} to-transparent ${isRTL ? 'right-8 md:right-1/2 translate-x-1/2' : 'left-8 md:left-1/2 -translate-x-1/2'}`} />

            {t.experience.map((exp, index) => {
              const Icon = exp.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`relative flex items-center justify-between mb-16 md:mb-24 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="hidden md:block w-[45%]" />
                  
                  <div className={`absolute w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 ${isDark ? 'bg-[#030303] border-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.4)]' : 'bg-white border-[#00a388] shadow-[0_0_15px_rgba(0,163,136,0.3)]'} ${isRTL ? 'right-8 md:right-1/2 translate-x-1/2' : 'left-8 md:left-1/2 -translate-x-1/2'}`}>
                    <Icon size={16} className={accentColor} />
                  </div>

                  <div className={`w-[85%] md:w-[45%] ${isRTL ? 'pr-16 md:pr-0' : 'pl-16 md:pl-0'}`}>
                    <TiltCard isDark={isDark} className="p-6">
                      <span className={`${accentColor} font-mono text-sm mb-2 block`}>{exp.date}</span>
                      <h3 className={`text-xl font-bold mb-1 ${textPrimary}`}>{exp.role}</h3>
                      <h4 className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{exp.company}</h4>
                      <p className={`text-sm leading-relaxed ${textSecondary}`}>{exp.description}</p>
                    </TiltCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`max-w-4xl mx-auto text-center p-12 md:p-20 rounded-3xl border backdrop-blur-lg relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-white/5 to-transparent border-white/10' : 'bg-gradient-to-br from-white/60 to-white/30 border-gray-200 shadow-2xl'}`}
          >
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[120px] pointer-events-none ${isDark ? 'bg-[#00ffcc] opacity-20' : 'bg-[#00a388] opacity-10'}`} />

            <h3 className={`${accentColor} font-mono text-sm uppercase tracking-widest mb-4`}>{t.sec04_tag}</h3>
            <h2 className={`text-5xl font-bold mb-6 ${textPrimary}`}>{t.sec04_title}</h2>
            <p className={`text-lg mb-10 max-w-2xl mx-auto ${textSecondary}`}>
              {t.sec04_desc}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="mailto:adilchagri7@gmail.com" className={`inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 group ${accentBg} ${btnText} ${isDark ? 'hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(0,255,204,0.3)] hover:shadow-[0_0_40px_rgba(0,255,204,0.6)]' : 'hover:bg-gray-900 shadow-xl'}`}>
                <Mail className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={24} />
                {t.email}
              </a>
              
              <a href="https://wa.me/212770498926" target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 group bg-[#25D366] text-white hover:scale-105 ${isDark ? 'shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)]' : 'shadow-xl'}`}>
                <MessageCircle className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={24} />
                {t.whatsapp}
              </a>
            </div>

            <div className={`mt-8 font-mono text-sm md:text-base ${textSecondary}`}>
              <p>adilchagri7@gmail.com</p>
              <p dir="ltr">+212 770 498 926</p>
            </div>

            <div className={`flex justify-center gap-6 mt-12 border-t pt-8 ${isDark ? 'border-white/10' : 'border-gray-200'}`} dir="ltr">
              <a href="https://github.com/Adilchagri" target="_blank" rel="noreferrer" className={`flex items-center transition-colors ${isDark ? 'text-gray-500 hover:text-[#00ffcc]' : 'text-gray-600 hover:text-[#00a388]'}`}>
                <Github size={20} className="mr-2" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/adilchagri/" target="_blank" rel="noreferrer" className={`flex items-center transition-colors ${isDark ? 'text-gray-500 hover:text-[#00ffcc]' : 'text-gray-600 hover:text-[#00a388]'}`}>
                <Linkedin size={20} className="mr-2" /> LinkedIn
              </a>
            </div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}