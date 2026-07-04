// Relais IT — contenu SEO des pages services (français)
// Chaque page cible une requête locale précise : URL, title et H1 dédiés.

export const SERVICE_PAGES = {
  "support-informatique-abidjan": {
    icon: "LifeBuoy",
    serviceIndex: 0,
    title: "Support informatique à Abidjan — Maintenance & assistance IT | Relais IT",
    metaDescription:
      "Support et maintenance informatique pour entreprises à Abidjan : assistance rapide, dépannage sur site et à distance, contrats de maintenance. Réponse sous 24h.",
    h1: "Support informatique à Abidjan",
    subtitle:
      "Assistance, maintenance et dépannage IT pour entreprises, institutions et professionnels.",
    intro:
      "Une panne informatique, c'est une activité qui s'arrête : caisses bloquées, mails inaccessibles, dossiers clients hors de portée. Relais IT assure aux entreprises d'Abidjan un support informatique réactif et structuré, sur site comme à distance, pour que vos équipes restent concentrées sur leur métier — pas sur leurs machines.",
    sections: [
      {
        heading: "Une assistance rapide, sur site et à distance",
        body: "Nos techniciens interviennent dans toute la zone d'Abidjan (Plateau, Cocody, Marcory, Treichville, Yopougon, Zone 4…) et prennent en main vos postes à distance quand l'urgence l'exige. Diagnostic clair, résolution documentée, et un interlocuteur unique qui parle votre langage — pas de jargon inutile.",
      },
      {
        heading: "Des contrats de maintenance qui préviennent les pannes",
        body: "Au-delà du dépannage ponctuel, nous proposons des contrats de maintenance préventive : mises à jour, sauvegardes vérifiées, surveillance de l'état du parc, nettoyage et optimisation des postes. Résultat : moins d'incidents, une durée de vie du matériel prolongée et un budget informatique prévisible.",
      },
    ],
    prestations: [
      "Dépannage d'ordinateurs, serveurs et imprimantes",
      "Assistance utilisateurs (bureautique, messagerie, logiciels métiers)",
      "Maintenance préventive et gestion de parc informatique",
      "Sauvegarde et restauration de données",
      "Installation et configuration de postes de travail",
      "Contrats de support adaptés aux PME et institutions",
    ],
    faq: [
      {
        q: "Sous quel délai intervenez-vous à Abidjan ?",
        a: "Nous prenons en charge les demandes en moins de 24h ouvrées, avec une priorité aux incidents bloquants. Une prise en main à distance peut souvent débuter dans l'heure.",
      },
      {
        q: "Proposez-vous des contrats de maintenance mensuels ?",
        a: "Oui. Nos contrats couvrent la maintenance préventive, l'assistance utilisateurs et un volume d'interventions défini ensemble, avec une facturation mensuelle prévisible adaptée à la taille de votre parc.",
      },
      {
        q: "Intervenez-vous en dehors d'Abidjan ?",
        a: "Notre zone principale est Abidjan et sa périphérie. Pour les autres villes de Côte d'Ivoire, nous étudions chaque demande : le support à distance reste possible partout.",
      },
    ],
  },

  "materiel-informatique-cote-divoire": {
    icon: "Server",
    serviceIndex: 1,
    title: "Matériel informatique professionnel en Côte d'Ivoire | Relais IT",
    metaDescription:
      "Fourniture de matériel informatique pour entreprises en Côte d'Ivoire : ordinateurs, serveurs, imprimantes, équipements réseau. Conseil, installation et garantie à Abidjan.",
    h1: "Matériel informatique professionnel",
    subtitle:
      "Équipements fiables, conseillés et installés pour les entreprises en Côte d'Ivoire.",
    intro:
      "Acheter du matériel informatique sans accompagnement, c'est souvent payer deux fois : un équipement mal dimensionné, incompatible ou sans suivi. Relais IT fournit aux entreprises d'Abidjan et de Côte d'Ivoire du matériel professionnel sélectionné selon vos usages réels, livré, installé et prêt à l'emploi.",
    sections: [
      {
        heading: "Du conseil avant la vente, pas l'inverse",
        body: "Nous commençons par comprendre vos besoins : nombre d'utilisateurs, logiciels métiers, contraintes de budget et d'évolution. Nous recommandons ensuite les équipements adaptés — ni surdimensionnés, ni sous-calibrés — parmi des marques éprouvées, avec un devis transparent.",
      },
      {
        heading: "Livraison, installation et mise en service incluses",
        body: "Un ordinateur encore dans son carton ne fait pas avancer votre activité. Nos équipes livrent, installent, configurent et intègrent chaque équipement à votre environnement existant : session utilisateurs, messagerie, imprimantes réseau, sauvegardes. Vous recevez du matériel opérationnel, pas des boîtes.",
      },
    ],
    prestations: [
      "Ordinateurs de bureau et portables professionnels",
      "Serveurs, NAS et solutions de stockage",
      "Imprimantes, scanners et copieurs multifonctions",
      "Équipements réseau : routeurs, switchs, points d'accès Wi-Fi",
      "Onduleurs et protection électrique du matériel",
      "Installation, configuration et garantie avec suivi",
    ],
    faq: [
      {
        q: "Fournissez-vous du matériel neuf ou reconditionné ?",
        a: "Principalement du matériel neuf de marques professionnelles. Du reconditionné certifié peut être proposé sur demande pour optimiser certains budgets, toujours avec garantie.",
      },
      {
        q: "L'installation est-elle comprise dans le prix ?",
        a: "Nos devis précisent clairement ce qui est inclus. Dans la plupart de nos offres entreprises, la livraison, l'installation et la configuration de base font partie de la prestation.",
      },
      {
        q: "Pouvez-vous équiper une entreprise complète ?",
        a: "Oui, du poste unique au parc complet : postes de travail, serveur, réseau, impression et sécurité, avec un déploiement planifié pour ne pas interrompre votre activité.",
      },
    ],
  },

  "reseaux-securite-informatique-abidjan": {
    icon: "ShieldCheck",
    serviceIndex: 2,
    title: "Réseaux & sécurité informatique à Abidjan | Relais IT",
    metaDescription:
      "Installation de réseaux d'entreprise et cybersécurité à Abidjan : câblage, Wi-Fi professionnel, pare-feu, sauvegardes, protection des données. Audit sécurité offert.",
    h1: "Réseaux & sécurité informatique",
    subtitle:
      "Des infrastructures stables et des données protégées pour votre entreprise à Abidjan.",
    intro:
      "Un réseau lent fait perdre des heures ; un réseau non sécurisé peut faire perdre l'entreprise. Ransomwares, vols de données et fraudes touchent désormais les PME ivoiriennes autant que les grands groupes. Relais IT conçoit, installe et sécurise les infrastructures réseau des entreprises d'Abidjan avec une approche pragmatique : protéger l'essentiel, sans complexité inutile.",
    sections: [
      {
        heading: "Des réseaux d'entreprise conçus pour durer",
        body: "Câblage structuré, Wi-Fi professionnel couvrant l'ensemble de vos locaux, segmentation des accès (invités, direction, production), interconnexion de sites : nous bâtissons des réseaux stables et évolutifs, documentés pour que vous n'en soyez jamais prisonnier.",
      },
      {
        heading: "Une cybersécurité à la mesure des PME",
        body: "Pare-feu, antivirus professionnels gérés, sauvegardes externalisées testées, gestion des mots de passe et sensibilisation des équipes : nous déployons les protections qui bloquent la grande majorité des attaques réelles. Chaque mission débute par un audit qui identifie vos vulnérabilités prioritaires.",
      },
    ],
    prestations: [
      "Audit de sécurité et cartographie du réseau existant",
      "Câblage réseau et installation Wi-Fi professionnel",
      "Pare-feu, VPN et sécurisation des accès distants",
      "Antivirus et protection des postes de travail",
      "Sauvegardes automatisées et plan de reprise d'activité",
      "Vidéosurveillance IP et contrôle d'accès",
    ],
    faq: [
      {
        q: "Mon entreprise est petite : suis-je vraiment une cible ?",
        a: "Oui. Les attaques automatisées ne choisissent pas leurs victimes par taille, et les PME sont souvent moins protégées. Quelques mesures bien choisies suffisent à écarter la majorité des risques.",
      },
      {
        q: "En quoi consiste votre audit de sécurité ?",
        a: "Nous examinons votre réseau, vos accès, vos sauvegardes et vos pratiques, puis nous vous remettons un rapport clair : ce qui est critique, ce qui peut attendre, et le coût de chaque correction.",
      },
      {
        q: "Pouvez-vous sécuriser le télétravail de nos équipes ?",
        a: "Oui : VPN, authentification renforcée et postes chiffrés permettent à vos collaborateurs de travailler à distance sans exposer les données de l'entreprise.",
      },
    ],
  },

  "solutions-digitales-abidjan": {
    icon: "Workflow",
    serviceIndex: 3,
    title: "Solutions digitales pour entreprises à Abidjan | Relais IT",
    metaDescription:
      "Digitalisation des entreprises à Abidjan : outils de gestion, messagerie professionnelle, collaboration en ligne, automatisation. Des solutions simples et adaptées.",
    h1: "Solutions digitales pour entreprises",
    subtitle:
      "Des outils simples qui font gagner du temps à vos équipes, chaque jour.",
    intro:
      "Beaucoup d'entreprises à Abidjan gèrent encore devis, stocks et plannings sur papier ou dans des fichiers dispersés. Chaque ressaisie est une erreur possible et du temps perdu. Relais IT sélectionne et déploie des solutions digitales adaptées à votre réalité : des outils que vos équipes adoptent réellement, parce qu'ils simplifient leur travail au lieu de le compliquer.",
    sections: [
      {
        heading: "Digitaliser sans bouleverser",
        body: "Notre méthode : partir de vos processus existants, identifier les frictions (facturation, suivi client, stocks, congés…) et y répondre avec des outils éprouvés — messagerie professionnelle, espaces de travail partagés, gestion commerciale, signature électronique. Un déploiement progressif, accompagné, sans rupture d'activité.",
      },
      {
        heading: "Vos données centralisées et accessibles",
        body: "Fini les versions de fichiers qui se contredisent. Nous mettons en place des espaces documentaires centralisés et sécurisés, accessibles au bureau comme en déplacement, avec des droits d'accès clairs par équipe. Vos informations deviennent un actif organisé, pas une pile de dossiers.",
      },
    ],
    prestations: [
      "Messagerie professionnelle et noms de domaine",
      "Suites collaboratives (Google Workspace, Microsoft 365)",
      "Outils de gestion : facturation, CRM, suivi d'activité",
      "Centralisation et partage sécurisé de documents",
      "Automatisation des tâches répétitives",
      "Accompagnement au changement et prise en main",
    ],
    faq: [
      {
        q: "Nos équipes ne sont pas très à l'aise avec l'informatique. Est-ce un frein ?",
        a: "Non, c'est justement notre point de départ. Nous choisissons des outils simples et formons vos équipes jusqu'à l'autonomie. L'adoption réelle fait partie de la mission, pas seulement l'installation.",
      },
      {
        q: "Faut-il tout changer d'un coup ?",
        a: "Surtout pas. Nous procédons par étapes, en commençant par le processus qui vous coûte le plus de temps. Chaque étape produit un gain visible avant de passer à la suivante.",
      },
      {
        q: "Créez-vous aussi des sites web ?",
        a: "Nous accompagnons la présence digitale de nos clients, y compris la mise en place de sites vitrines professionnels. Parlons de votre besoin pour définir la solution adaptée.",
      },
    ],
  },

  "formation-informatique-abidjan": {
    icon: "GraduationCap",
    serviceIndex: 4,
    title: "Formation informatique professionnelle à Abidjan | Relais IT",
    metaDescription:
      "Formations informatiques pour entreprises à Abidjan : bureautique (Excel, Word), outils numériques, sécurité. Sessions pratiques en entreprise ou en petits groupes.",
    h1: "Formation informatique professionnelle",
    subtitle:
      "Des formations pratiques qui rendent vos équipes plus rapides et plus autonomes.",
    intro:
      "Le meilleur équipement ne vaut rien sans des équipes qui savent l'exploiter. À compétences égales, une équipe formée traite ses dossiers plus vite, commet moins d'erreurs et sollicite moins le support. Relais IT conçoit des formations informatiques pratiques pour les entreprises d'Abidjan : des sessions courtes, concrètes, bâties sur vos documents et vos situations réelles de travail.",
    sections: [
      {
        heading: "Des formations ancrées dans votre quotidien",
        body: "Pas de théorie hors-sol : nos formateurs travaillent sur vos cas réels — vos tableaux Excel, vos courriers, vos rapports. Chaque participant repart avec des méthodes immédiatement applicables et des supports de référence en français, pensés pour être relus après la session.",
      },
      {
        heading: "En entreprise ou en petits groupes",
        body: "Nous intervenons dans vos locaux à Abidjan pour former vos équipes sur leur propre environnement, ou organisons des sessions inter-entreprises en petits groupes pour garantir la pratique de chacun. Un test de positionnement en amont permet d'adapter le niveau et le rythme.",
      },
    ],
    prestations: [
      "Bureautique : Excel (initiation à avancé), Word, PowerPoint",
      "Messagerie et travail collaboratif en ligne",
      "Bonnes pratiques de sécurité informatique au bureau",
      "Prise en main des outils métiers déployés dans votre entreprise",
      "Formations sur mesure selon vos besoins",
      "Supports de cours et attestations de formation",
    ],
    faq: [
      {
        q: "Quelle est la durée d'une formation type ?",
        a: "De une demi-journée pour un module ciblé (ex. tableaux croisés dynamiques) à plusieurs jours pour un parcours complet. Nous privilégions des sessions courtes et espacées, plus efficaces pour la mémorisation.",
      },
      {
        q: "Formez-vous les débutants complets ?",
        a: "Oui. Nos parcours d'initiation partent de zéro, avec patience et pédagogie. Chacun progresse à son rythme sur des exercices pratiques.",
      },
      {
        q: "Délivrez-vous une attestation ?",
        a: "Oui, chaque participant reçoit une attestation de formation précisant les compétences travaillées, utile pour son dossier professionnel.",
      },
    ],
  },

  "formation-intelligence-artificielle-abidjan": {
    icon: "BrainCircuit",
    serviceIndex: 4,
    title: "Formation intelligence artificielle (IA) à Abidjan | Relais IT",
    metaDescription:
      "Formation à l'intelligence artificielle pour entreprises à Abidjan : ChatGPT, IA générative, automatisation, cas d'usage métiers. Sessions pratiques en Côte d'Ivoire.",
    h1: "Formation à l'intelligence artificielle",
    subtitle:
      "Faites de l'IA un outil de productivité concret pour vos équipes, dès maintenant.",
    intro:
      "L'intelligence artificielle n'est plus une promesse lointaine : rédaction, analyse de documents, préparation de présentations, réponses clients — les outils d'IA générative font déjà gagner des heures chaque semaine à ceux qui savent les utiliser. Relais IT forme les entreprises et professionnels d'Abidjan à un usage productif, sécurisé et responsable de l'IA, loin du battage médiatique et au plus près de vos métiers.",
    sections: [
      {
        heading: "Comprendre, puis pratiquer sur vos cas réels",
        body: "Nos sessions démystifient d'abord le fonctionnement de l'IA générative (ChatGPT, Claude, Gemini, Copilot…), puis passent rapidement à la pratique : rédiger des prompts efficaces, produire des documents professionnels, analyser des données, automatiser des tâches répétitives. Chaque participant travaille sur des situations tirées de son propre poste.",
      },
      {
        heading: "Un usage sécurisé et encadré en entreprise",
        body: "Utiliser l'IA en entreprise soulève de vraies questions : confidentialité des données, fiabilité des réponses, propriété des contenus. Nous formons vos équipes aux bons réflexes et aidons votre direction à définir une charte d'usage claire, pour bénéficier de l'IA sans exposer l'entreprise.",
      },
    ],
    prestations: [
      "Initiation à l'IA générative pour tous les collaborateurs",
      "Rédaction de prompts efficaces appliquée à vos métiers",
      "IA pour la bureautique : documents, mails, présentations, tableurs",
      "Automatisation de tâches répétitives avec l'IA",
      "Ateliers dirigeants : opportunités, risques et stratégie IA",
      "Charte d'usage de l'IA et bonnes pratiques de confidentialité",
    ],
    faq: [
      {
        q: "Faut-il des compétences techniques pour suivre la formation ?",
        a: "Aucune. Nos formations s'adressent à tous les profils : assistants, commerciaux, RH, dirigeants. Savoir utiliser un navigateur web suffit pour commencer.",
      },
      {
        q: "Quels outils d'IA utilisez-vous pendant les sessions ?",
        a: "Nous pratiquons sur les outils les plus utilisés en entreprise (ChatGPT, Claude, Gemini, Microsoft Copilot) et vous aidons à choisir ceux adaptés à votre contexte et votre budget.",
      },
      {
        q: "Nos données sont-elles en sécurité quand on utilise l'IA ?",
        a: "C'est un point central de la formation : nous montrons quelles informations ne jamais transmettre à une IA publique, et quelles configurations ou offres professionnelles protègent vos données.",
      },
    ],
  },
};

export const SERVICE_PAGE_LINKS = Object.entries(SERVICE_PAGES).map(([slug, p]) => ({
  slug,
  label: p.h1,
  icon: p.icon,
}));

// Correspondance carte service (accueil) -> page dédiée
export const SERVICE_CARD_LINKS = [
  "/support-informatique-abidjan",
  "/materiel-informatique-cote-divoire",
  "/reseaux-securite-informatique-abidjan",
  "/solutions-digitales-abidjan",
  "/formation-informatique-abidjan",
  null, // Conseil IT -> pas encore de page dédiée (renvoie vers #contact)
];
