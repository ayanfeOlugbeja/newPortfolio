export const contentTranslations = {
  en: {
    timeline: {},
    projects: {
      multimodalRag: {
        title: 'Multimodal RAG Chatbot',
        subtitle: 'Chat with your own documents and images',
        context: 'Personal project · June 2026',
        story: [
          'General-purpose chatbots cannot automatically answer questions about private documents they have never seen. I wanted to explore how AI could make personal knowledge easier to access.',
          'I built a multimodal retrieval-augmented generation (RAG) chatbot that processes documents and images, stores searchable representations in ChromaDB, and retrieves relevant information to answer questions. A FastAPI backend handles the processing, while a React interface lets users interact with the system and choose between OpenAI and Anthropic models.',
        ],
      },
      projectMonitoring: {
        title: 'Project Monitoring System',
        subtitle: 'Student project reviews, from submission to approval',
        context: 'Personal project · May 2026',
        story: [
          'Following many student projects through submissions, feedback and sign-off is hard when nobody can see where each one stands.',
          'I built a single place where the whole journey happens. Students submit their work and upload files, supervisors review it, leave comments and approve it, and admins oversee everyone. Each role sees only what it needs, an activity log records every step, and notifications tell people when something is waiting on them. It runs on React and RTK Query at the front, with FastAPI and PostgreSQL behind it.',
        ],
      },
      inventoryManagement: {
        title: 'Inventory Management System',
        subtitle: 'Stock and sales across multiple stores',
        context: 'Personal project · January 2026',
        story: [
          'A business with more than one store has to answer a simple question again and again: what do we have, and where is it?',
          'I built a system that tracks stock, purchases, sales and payments, and records transfers between locations. Owners get reports, staff get role-based access, and audit logs and notifications help track changes. The interface is built in React and TypeScript, backed by FastAPI and PostgreSQL.',
        ],
      },
      hcms: {
        title: 'HCMS',
        subtitle: 'Human Capital Management',
        context: 'Enterprise work at Sidmach Technologies · 2025',
        story: [
          'HR work runs on rules: who is away, who owes what, and how much tax each person pays. The HCMS team needed those rules to be clear on screen for the people who manage them.',
          'I worked on the leave calendar, loan workflows and payroll interfaces. This included guarantor verification, administrator settings for interest rates and repayment rules, employee loan applications, tax regimes, income-based tax brackets, and eligible reliefs and deductions. I also worked on company cost charts and screens for positions and career progression.',
        ],
      },
      jambNewsletter: {
        title: 'JAMB Newsletter',
        subtitle: 'Content management for Nigeria’s national exam board',
        context: 'Enterprise work at Sidmach Technologies · 2025',
        story: [
          'The Joint Admissions and Matriculation Board coordinates university entrance exams across Nigeria. Its content platform needs to be straightforward to use and accountable.',
          'I developed the authentication flow, including sign-in, password recovery and one-time-code verification, with clear feedback at each step. I also built an audit trail so administrators can see who performed actions on the platform. Records display as a table on desktop and cards on mobile, with sorting and filtering to help administrators find information quickly.',
        ],
      },
      nyscSaed: {
        title: 'NYSC SAED',
        subtitle: 'Training and funding for young entrepreneurs',
        context: 'Enterprise work at Sidmach Technologies · 2025',
        story: [
          'The SAED programme trains recent graduates to start businesses and helps fund them. Behind it sit trainers, loans, supervisors and decisions that need a clear record.',
          'I built administration tools for the programme. Administrators can suspend and reinstate trainers while recording the reason. Corps members can apply for loans and track their status, while administrators can approve or reject requests. I also developed dashboard statistics for training, loan disbursements and trainer participation, alongside screens for reassigning local government inspectors and departmental responsibilities. Role-based access controls what each user can do, and I tested and fixed interface issues.',
        ],
      },
      exeat: {
        title: 'Exeat System',
        subtitle: 'Student leave requests, made digital',
        context: 'Final-year research project · Glorious Vision University',
        story: [
          'Getting permission to leave campus meant paper forms, waiting for signatures and no way to know where a request had got to.',
          'For my final-year research, I studied the existing process, identified delays and built a web app to manage requests digitally. Students submit requests, approvers respond, and everyone can follow the status. EmailJS sends notifications and Firebase stores the records, making the process easier to track.',
        ],
      },
    },
  },
  fr: {
    timeline: {
      edu: {
        label: 'Formation',
        role: 'Licence en informatique',
        description:
          'J’y ai acquis de solides bases en génie logiciel, bases de données, réseaux et conception de produits, et obtenu une licence en informatique.',
        tags: [
          'Génie logiciel',
          'Bases de données',
          'Réseaux',
          'Intelligence artificielle',
        ],
      },
      techclub: {
        role: 'Ingénieur logiciel',
        description:
          'Développement et optimisation d’applications web adaptatives, accompagnement d’étudiants en développement front-end et suivi de projets, de la conception au déploiement, au sein d’une équipe agile pluridisciplinaire.',
        tags: ['Développement front-end', 'Mentorat', 'Méthodes agiles'],
      },
      sidmach: {
        role: 'Ingénieur logiciel',
        description:
          'Contribution à des logiciels d’entreprise, avec la création et la maintenance de modules front-end ainsi que la conception de fonctionnalités lors des échanges sur le produit.',
        items: [
          {
            title:
              'Mise en place du contrôle d’accès par rôle, de fonctions d’administration et de statistiques de tableau de bord en temps réel',
          },
          {
            title:
              'Amélioration de l’adaptabilité et de la compatibilité multi-appareils des applications',
          },
          {
            title:
              'Diagnostic, tests et résolution de problèmes pour assurer la stabilité de plusieurs applications',
          },
        ],
      },
      fcc: {
        role: 'Rédacteur technique',
        description:
          'Rédaction de tutoriels approfondis sur les langages, frameworks, outils et concepts du développement, en rendant les sujets complexes accessibles aux débutants.',
        tags: ['Rédaction technique', 'Tutoriels'],
      },
      redwire: {
        role: 'Développeur web',
        description:
          'Création et maintenance de sites web pour des clients, de la conception initiale au déploiement, en transformant leurs besoins en solutions concrètes.',
        tags: ['Sites web clients', 'Déploiement'],
      },
      certs: {
        label: 'Certifications',
        title: 'Certifications',
        role: 'Développement professionnel',
        description:
          'Formations en ligne et projets pratiques en développement front-end, génération augmentée par récupération, marketing numérique et compétences professionnelles.',
        items: [
          { title: 'Développeur front-end Meta', meta: 'Meta · Déc. 2025' },
          {
            title: 'Marketing numérique, niveau 3',
            meta: 'Computer Professionals Registration Council of Nigeria · Juin 2026',
          },
          {
            title:
              'De débutant à avancé : génération augmentée par récupération (RAG)',
            meta: 'Udemy · Juin 2026',
          },
          { title: 'Forward', meta: 'McKinsey · Juil. 2026' },
        ],
      },
    },
    projects: {
      multimodalRag: {
        title: 'Chatbot RAG multimodal',
        subtitle: 'Discutez avec vos documents et vos images',
        context: 'Projet personnel · Juin 2026',
        story: [
          'La plupart des chatbots ne connaissent que les données qui ont servi à leur entraînement. Je voulais en créer un capable de lire vos propres fichiers et de répondre à vos questions.',
          'J’ai créé un chatbot qui accepte des documents et des images, puis indexe leur contenu dans une base vectorielle ChromaDB. Il recherche les informations par leur sens plutôt que par mots-clés. Une API FastAPI gère le traitement, une interface React facilite son utilisation et chaque conversation peut s’appuyer sur OpenAI ou Anthropic.',
        ],
      },
      projectMonitoring: {
        title: 'Système de suivi de projets',
        subtitle: 'Suivi des projets étudiants, du dépôt à la validation',
        context: 'Projet personnel · Mai 2026',
        story: [
          'Suivre de nombreux projets étudiants, leurs dépôts, retours et validations devient difficile lorsque personne ne sait clairement où en est chaque projet.',
          'J’ai créé un espace unique pour gérer tout le processus. Les étudiants déposent leur travail et leurs fichiers, les encadrants les examinent, commentent et valident, et les administrateurs supervisent l’ensemble. Chaque rôle accède uniquement aux fonctions nécessaires, un journal consigne les étapes et des notifications signalent les actions en attente. L’application utilise React et RTK Query côté interface, avec FastAPI et PostgreSQL côté serveur.',
        ],
      },
      inventoryManagement: {
        title: 'Système de gestion des stocks',
        subtitle: 'Stocks et ventes dans plusieurs magasins',
        context: 'Projet personnel · Janvier 2026',
        story: [
          'Une entreprise qui possède plusieurs magasins doit répondre sans cesse à une question simple : quels produits avons-nous, et où se trouvent-ils ?',
          'J’ai créé un système qui suit les stocks, les achats, les ventes et les paiements, et enregistre les transferts de marchandises entre les sites. Les propriétaires disposent de rapports, les employés d’un accès adapté à leur rôle, et les journaux d’audit facilitent le suivi des modifications. L’interface utilise React et TypeScript, avec FastAPI et PostgreSQL côté serveur.',
        ],
      },
      hcms: {
        title: 'HCMS',
        subtitle: 'Gestion du capital humain',
        context: 'Projet d’entreprise chez Sidmach Technologies · 2025',
        story: [
          'La gestion des ressources humaines repose sur des règles : les absences, les prêts et les impôts de chaque employé. L’équipe HCMS devait rendre ces règles compréhensibles à l’écran pour les personnes qui les appliquent.',
          'J’ai travaillé sur le calendrier des congés, les processus de prêt et les interfaces de paie. Cela comprenait la vérification des garants, les paramètres administrateur des taux et remboursements, les demandes de prêt des employés, les régimes fiscaux, les tranches d’imposition selon les revenus ainsi que les allègements et déductions applicables. J’ai également travaillé sur les graphiques de coûts et les écrans de gestion des postes et des évolutions de carrière.',
        ],
      },
      jambNewsletter: {
        title: 'Bulletin d’information JAMB',
        subtitle:
          'Gestion de contenu pour l’organisme national des examens au Nigeria',
        context: 'Projet d’entreprise chez Sidmach Technologies · 2025',
        story: [
          'Le Joint Admissions and Matriculation Board organise les examens d’entrée à l’université dans tout le Nigeria. Sa plateforme de contenu doit être facile à utiliser et garantir la traçabilité des opérations.',
          'J’ai développé le parcours d’authentification : connexion, récupération du mot de passe et vérification par code à usage unique, avec un retour clair à chaque étape. J’ai également créé le journal d’audit qui permet aux administrateurs de savoir qui a effectué chaque action. Les entrées s’affichent sous forme de tableau sur ordinateur et de cartes sur mobile, avec des fonctions de tri et de filtrage.',
        ],
      },
      nyscSaed: {
        title: 'NYSC SAED',
        subtitle: 'Formation et financement pour les jeunes entrepreneurs',
        context: 'Projet d’entreprise chez Sidmach Technologies · 2025',
        story: [
          'Le programme SAED aide les jeunes diplômés à créer une entreprise grâce à la formation et au financement. Sa gestion implique des formateurs, des prêts, des superviseurs et de nombreuses décisions à documenter.',
          'J’ai créé des outils d’administration du programme. Les administrateurs peuvent suspendre ou rétablir un formateur en consignant le motif. Les membres du corps national de service peuvent demander un prêt et en suivre l’état, tandis que les administrateurs peuvent approuver ou refuser chaque demande. J’ai aussi développé des statistiques sur les formations, les versements de prêts et la participation des formateurs, ainsi que les écrans de réaffectation des inspecteurs locaux et des responsabilités entre services. Les accès sont définis par rôle, et j’ai testé et corrigé les problèmes d’interface.',
        ],
      },
      exeat: {
        title: 'Système Exeat',
        subtitle: 'Demandes d’autorisation de sortie des étudiants, en ligne',
        context:
          'Projet de recherche de fin d’études · Glorious Vision University',
        story: [
          'Obtenir l’autorisation de quitter le campus impliquait des formulaires papier, des signatures à attendre et aucun moyen de savoir où en était la demande.',
          'Pour mon projet de recherche de fin d’études, j’ai étudié le processus existant, repéré ses ralentissements et créé une application web pour gérer les demandes en ligne. Les étudiants soumettent leur demande, les responsables y répondent et chacun peut suivre son évolution. EmailJS envoie les notifications et Firebase stocke les dossiers, ce qui facilite le suivi du processus.',
        ],
      },
    },
  },
}
