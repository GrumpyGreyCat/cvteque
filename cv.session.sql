-- ============================================================================
-- 1. 10 ADDITIONAL JOB OFFERS (Linked to existing companies 1 to 4)
-- ============================================================================
INSERT INTO jobs (title, type, location, duration, description, created_at, company_id_id) VALUES
('Développeur Backend Symfony / API Platform', 'CDI', 'Paris, France', 'Indéterminée', 'Nous recherchons un développeur expert PHP pour concevoir nos architectures de services et nos APIs Rest.', CURRENT_TIME, 1),
('Ingénieur Sécurité & Pentester Junior', 'Stage', 'Versailles, France', '6 mois', 'Participez aux audits de sécurité de nos applications cloud et à la mise en place de tests d''intrusion.', CURRENT_TIME, 1),
('Développeur Mobile Flutter', 'Alternance', 'Paris, France', '1 an', 'Intégrez l''équipe produit pour concevoir les nouvelles fonctionnalités de notre application mobile grand public.', CURRENT_TIME, 2),
('UI/UX Designer & Intégrateur Web', 'Stage', 'Télétravail', '4 mois', 'Refonte graphique de nos tunnels de conversion. Maîtrise de Figma et intégration CSS/Tailwind indispensable.', CURRENT_TIME, 2),
('Administrateur Systèmes & Réseaux', 'CDI', 'Lyon, France', 'Indéterminée', 'Supervision, maintenance et optimisation de l''infrastructure système interne de notre parc de serveurs.', CURRENT_TIME, 3),
('Site Reliability Engineer (SRE)', 'CDI', 'Paris, France', 'Indéterminée', 'Garantir la haute disponibilité de nos plateformes SAAS à fort trafic. Expertise Kubernetes et Terraform requise.', CURRENT_TIME, 3),
('Ingénieur Data Engineer / Pipelines ETL', 'Alternance', 'Lyon, France', '2 ans', 'Conception et optimisation de pipelines de données massives (Pipelines Apache Spark / Airflow).', CURRENT_TIME, 3),
('Chercheur / Ingénieur IA Deep Learning', 'CDI', 'Paris, France', 'Indéterminée', 'Entraînement de grands modèles de langage et intégration de modèles pré-entraînés dans nos applications.', CURRENT_TIME, 4),
('Data Scientist / Analyste Business', 'Stage', 'Toulouse, France', '6 mois', 'Analyse du comportement des utilisateurs et création de dashboards prédictifs pour les équipes métiers.', CURRENT_TIME, 4),
('Product Owner Technique / Scrum Master', 'CDI', 'Paris, France', 'Indéterminée', 'Intermédiaire entre les équipes de développement et la direction produit. Gestion du backlog sous environnement agile.', CURRENT_TIME, 2);


-- ============================================================================
-- 2. 20 NEW STUDENTS (IDs will range from 5 to 24)
-- ============================================================================
INSERT INTO students (email, password, name, school, location, year, description, phone, linkedin, github, created_at) VALUES
('thomas.legrand@hexagone.edu', 'pass123', 'Thomas Legrand', 'Hexagone', 'Nantes, France', '3ème année', 'Passionné de cybersécurité, d''administration système Linux et de script Bash/Python.', '+33 6 01 02 03 04', 'linkedin.com/in/tlegrand', 'github.com/tlegrand-sec', CURRENT_TIME),
('chloe.martinez@sorbonne.fr', 'pass123', 'Chloé Martinez', 'Sorbonne Université', 'Paris, France', '5ème année', 'Étudiante en Master Data Science, spécialisée en Computer Vision et traitement d''images.', '+33 6 12 13 14 15', 'linkedin.com/in/cmartinez', 'github.com/chloe-ds', CURRENT_TIME),
('youssef.elamri@epitech.eu', 'pass123', 'Youssef El Amri', 'Epitech Paris', 'Paris, France', '4ème année', 'Développeur Full-Stack Node.js / React, adepte des hackathons et des architectures microservices.', '+33 6 22 33 44 55', 'linkedin.com/in/yelamri', 'github.com/youssef-dev', CURRENT_TIME),
('emma.petit@hexagone.edu', 'pass123', 'Emma Petit', 'Hexagone', 'Nice, France', '4ème année', 'Développeuse mobile iOS native (Swift/SwiftUI) à la recherche d''un stage de fin d''études.', '+33 6 77 88 99 00', 'linkedin.com/in/epetit', 'github.com/emma-ios', CURRENT_TIME),
('nathan.roux@sorbonne.fr', 'pass123', 'Nathan Roux', 'Sorbonne Université', 'Paris, France', '3ème année', 'Étudiant en Licence Informatique. Passionné par l''algorithmique de graphes et le développement C++.', '+33 6 11 44 77 88', 'linkedin.com/in/nroux', 'github.com/nathan-r', CURRENT_TIME),
('leila.haddad@epitech.eu', 'pass123', 'Leïla Haddad', 'Epitech Paris', 'Le Kremlin-Bicêtre, France', '3ème année', 'Développeuse spécialisée en sécurité applicative et cryptographie. Intéressée par le reverse-engineering.', '+33 6 55 66 77 88', 'linkedin.com/in/lhaddad', 'github.com/leila-crypt', CURRENT_TIME),
('hugo.vidal@hexagone.edu', 'pass123', 'Hugo Vidal', 'Hexagone', 'Versailles, France', '3ème année', 'Développeur front-end créatif, passionné par les animations CSS, le SVG et les frameworks 3D WebGL.', '+33 6 99 88 77 66', 'linkedin.com/in/hvidal', 'github.com/hugo-creative', CURRENT_TIME),
('sofiane.belaid@sorbonne.fr', 'pass123', 'Sofiane Belaid', 'Sorbonne Université', 'Paris, France', '4ème année', 'Spécialisé en ingénierie des bases de données massives (PostgreSQL, MongoDB, Cassandra) et optimisation SQL.', '+33 6 33 22 11 00', 'linkedin.com/in/sbelaid', 'github.com/sofiane-db', CURRENT_TIME),
('clara.renard@epitech.eu', 'pass123', 'Clara Renard', 'Epitech Paris', 'Paris, France', '5ème année', 'Tech Lead junior. Expérience confirmée en management d''équipes techniques et gestion de projets DevOps.', '+33 6 44 55 66 11', 'linkedin.com/in/crenard', 'github.com/clara-lead', CURRENT_TIME),
('antoine.gautier@hexagone.edu', 'pass123', 'Antoine Gautier', 'Hexagone', 'Lyon, France', '5ème année', 'Développeur backend chevronné en architecture Java Spring Boot et microservices cloud conteneurisés.', '+33 6 88 77 11 22', 'linkedin.com/in/agautier', 'github.com/antoine-java', CURRENT_TIME),
('manon.caron@sorbonne.fr', 'pass123', 'Manon Caron', 'Sorbonne Université', 'Paris, France', '4ème année', 'Étudiante passionnée par l''accessibilité du web (RGAA) et le développement UI ergonomique sous Angular.', '+33 6 14 15 16 17', 'linkedin.com/in/mcaron', 'github.com/manon-web', CURRENT_TIME),
('guillaume.mercier@epitech.eu', 'pass123', 'Guillaume Mercier', 'Epitech Paris', 'Paris, France', '4ème année', 'Développeur passionné par le langage Rust, la blockchain et la décentralisation des systèmes applicatifs.', '+33 6 91 92 93 94', 'linkedin.com/in/gmercier', 'github.com/guillaume-rust', CURRENT_TIME),
('ines.da-silva@hexagone.edu', 'pass123', 'Inès Da Silva', 'Hexagone', 'Versailles, France', '3ème année', 'Étudiante cherchant à se spécialiser dans les architectures Cloud (AWS) et la conteneurisation Docker.', '+33 6 05 06 07 08', 'linkedin.com/in/idassilva', 'github.com/ines-cloud', CURRENT_TIME),
('maxime.faure@sorbonne.fr', 'pass123', 'Maxime Faure', 'Sorbonne Université', 'Paris, France', '3ème année', 'Passionné d''informatique théorique, de compilateurs et du développement d''outils en ligne de commande (CLI).', '+33 6 71 72 73 74', 'linkedin.com/in/mfaure', 'github.com/maxime-theo', CURRENT_TIME),
('sarah.muller@epitech.eu', 'pass123', 'Sarah Muller', 'Epitech Paris', 'Paris, France', '3ème année', 'Développeuse Full-Stack JavaScript (Next.js / NestJS). J''aime concevoir des architectures modulaires et propres.', '+33 6 51 52 53 54', 'linkedin.com/in/smuller', 'github.com/sarah-js', CURRENT_TIME),
('lucas.gomez@hexagone.edu', 'pass123', 'Lucas Gomez', 'Hexagone', 'Lyon, France', '4ème année', 'Développeur passionné d''intelligence artificielle, d''automatisation de processus (RPA) et de Python.', '+33 6 41 42 43 44', 'linkedin.com/in/lgomez', 'github.com/lucas-ai', CURRENT_TIME),
('camille.leclerc@sorbonne.fr', 'pass123', 'Camille Leclerc', 'Sorbonne Université', 'Paris, France', '5ème année', 'Data Architect junior. Conception de schémas de données distribués et gouvernance algorithmique.', '+33 6 31 32 33 34', 'linkedin.com/in/cleclerc', 'github.com/camille-data', CURRENT_TIME),
('alexandre.boyer@epitech.eu', 'pass123', 'Alexandre Boyer', 'Epitech Paris', 'Paris, France', '4ème année', 'Spécialisé dans le développement de jeux vidéo (Unity / Unreal Engine) et d''outils graphiques temps réel.', '+33 6 21 22 23 24', 'linkedin.com/in/aboyer', 'github.com/alex-games', CURRENT_TIME),
('eva.lefevre@hexagone.edu', 'pass123', 'Eva Lefèvre', 'Hexagone', 'Paris, France', '3ème année', 'Conceptrice Web polyvalente axée sur le design d''expérience utilisateur (UX) et le prototypage interactif.', '+33 6 11 12 13 14', 'linkedin.com/in/elefevre', 'github.com/eva-ux', CURRENT_TIME),
('nicolas.girard@sorbonne.fr', 'pass123', 'Nicolas Girard', 'Sorbonne Université', 'Paris, France', '5ème année', 'Expert réseaux et télécoms. Automatisation d''architectures réseau d''entreprise via Ansible et Python.', '+33 6 01 11 21 31', 'linkedin.com/in/ngirard', 'github.com/nico-net', CURRENT_TIME);


-- ============================================================================
-- 3. EDUCATION PATHWAYS (Linked to students 5 to 24 via student_id_id)
-- ============================================================================
INSERT INTO education (title, school, dates, location, student_id_id) VALUES
('Bachelor Expert Cybersécurité', 'Hexagone', '2023 - 2026', 'Nantes', 5),
('Master 2 Science des Données', 'Sorbonne Université', '2024 - 2026', 'Paris', 6),
('Licence Mathématiques', 'Université de Toulouse', '2021 - 2024', 'Toulouse', 6),
('Expert en Technologies de l''Information', 'Epitech Paris', '2022 - 2027', 'Paris', 7),
('Bachelor Conception d''Applications', 'Hexagone', '2022 - 2025', 'Nice', 8),
('Licence Informatique Fondamentale', 'Sorbonne Université', '2023 - 2026', 'Paris', 9),
('Cursus Informatique Globale', 'Epitech Paris', '2023 - 2028', 'Paris', 10),
('Bachelor Concepteur Logiciel', 'Hexagone', '2023 - 2026', 'Versailles', 11),
('Master Architecture des Données', 'Sorbonne Université', '2024 - 2026', 'Paris', 12),
('Expertise Informatique & Management', 'Epitech Paris', '2021 - 2026', 'Paris', 13),
('Master Expert S.I.', 'Hexagone', '2024 - 2026', 'Lyon', 14),
('Master Interactions Homme-Machine', 'Sorbonne Université', '2024 - 2026', 'Paris', 15),
('Filière Systèmes complexes & Innovation', 'Epitech Paris', '2022 - 2027', 'Paris', 16),
('Bachelor Solutions Logicielles', 'Hexagone', '2023 - 2026', 'Versailles', 17),
('Licence Méthodes Informatiques', 'Sorbonne Université', '2023 - 2026', 'Paris', 18),
('Parcours Développement Full-Stack', 'Epitech Paris', '2023 - 2028', 'Paris', 19),
('Bachelor Intelligence Artificielle', 'Hexagone', '2022 - 2025', 'Lyon', 20),
('Master Big Data Management', 'Sorbonne Université', '2024 - 2026', 'Paris', 21),
('Filière Réalité Virtuelle & Multimédia', 'Epitech Paris', '2022 - 2027', 'Paris', 22),
('Bachelor Métiers du Multimédia', 'Hexagone', '2023 - 2026', 'Paris', 23),
('Master Réseaux & Systèmes Connectés', 'Sorbonne Université', '2024 - 2026', 'Paris', 24);


-- ============================================================================
-- 4. PROFESSIONAL EXPERIENCES (Linked to students 5 to 24 via student_id_id)
-- ============================================================================
INSERT INTO experience (title, dates, location, description, company, student_id_id) VALUES
('Stage Assistant Technicien SecOps', 'Mai 2024 - Août 2024', 'Nantes', 'Déploiement de sondes de détection d''intrusion (IDS) et configuration de pare-feux.', 'CyberDef', 5),
('Stage Data Scientist Junior', 'Avril 2025 - Septembre 2025', 'Paris', 'Entraînement de modèles YOLO pour la détection d''anomalies sur des lignes de production.', 'VisionTech', 6),
('Développeur Backend Node.js (Mission)', 'Novembre 2024 - Mars 2025', 'Paris', 'Migration d''une architecture monolithique vers des microservices Docker.', 'LogiCorp', 7),
('Stage Développeuse iOS', 'Mai 2024 - Juillet 2024', 'Nice', 'Intégration d''APIs REST et refonte graphique de l''application interne.', 'AppAzur', 8),
('Stage Administrateur Réseau', 'Juin 2024 - Août 2024', 'Paris', 'Audit des vulnérabilités de l''active directory et déploiement de scripts de sauvegarde.', 'SecureBank', 10),
('Stage Intégrateur Front-End', 'Avril 2024 - Juin 2024', 'Versailles', 'Développement de maquettes responsives en HTML5/SASS pour un site e-commerce.', 'WebAgency', 11),
('Stage DBA Junior', 'Mai 2025 - Juillet 2025', 'Paris', 'Indexation et optimisation de requêtes SQL sur une base de production de 500k lignes.', 'DataSaaS', 12),
('Alternance Assistant Scrum Master', 'Septembre 2024 - Août 2025', 'Paris', 'Animation des Daily Stand-ups et suivi du burndown chart de deux équipes de dev.', 'AgileTech', 13),
('Alternance Développeur Java', 'Octobre 2024 - Présent', 'Lyon', 'Conception d''endpoints sécurisés via Spring Security et intégration de files d''attente Kafka.', 'FinanzCorp', 14),
('Stage Développeur Angular', 'Avril 2025 - Août 2025', 'Paris', 'Mise en conformité RGAA niveau AA de l''espace client d''un portail d''assurance.', 'AxaLabs', 15),
('Stage Ingénieur Rust', 'Mai 2024 - Août 2024', 'Paris', 'Développement d''un parseur de fichiers binaires optimisé en Rust.', 'CryptoNode', 16),
('Stage DevOps Cloud Trainee', 'Juin 2025 - Août 2025', 'Paris', 'Écriture de manifests Kubernetes et configuration de pipelines CI/CD sous GitLab.', 'CloudWay', 17),
('Stage Développeur Python', 'Avril 2024 - Juin 2024', 'Lyon', 'Scripting d''outils d''extraction automatisée de données immobilières.', 'ImmoData', 20),
('Stage Développeur Moteur de Jeux', 'Mai 2025 - Août 2025', 'Paris', 'Programmation de comportements d''intelligence artificielle de PNJ sous Unreal Engine.', 'IndieStudio', 22),
('Stage Designer UX/UI', 'Mai 2024 - Juillet 2024', 'Paris', 'Réalisation de wireframes et tests utilisateurs sur des prototypes Figma interactifs.', 'DesignHub', 23),
('Alternance Ingénieur Réseaux Cisco', 'Septembre 2024 - Août 2025', 'Paris', 'Configuration de routeurs et switchs sous architecture hybride sur site / Cloud.', 'NetLink', 24);


-- ============================================================================
-- 5. ACADEMIC PROJECTS (Linked to students 5 to 24 via student_id_id)
-- ============================================================================
INSERT INTO project (title, description, student_id_id) VALUES
('LogAnalyzer Python', 'Outil CLI automatisé analysant les fichiers de logs Apache pour détecter les attaques Brute Force.', 5),
('FaceMask Detector', 'Modèle de classification entraîné sous PyTorch détectant le port du masque en temps réel par caméra.', 6),
('EventSphere Platform', 'Site d''organisation d''événements en temps réel utilisant Node.js, Express, et Socket.io.', 7),
('SafeBox iOS', 'Application de coffre-fort sécurisé chiffrant les données stockées localement en AES-256.', 8),
('GraphPathfinder C++', 'Moteur de calcul d''itinéraires optimaux appliquant les variantes d''algorithmes de Dijkstra.', 9),
('EncryptedChat Go', 'Messagerie instantanée de terminal décentralisée intégrant l''échange de clés Diffie-Hellman.', 10),
('CSS-Framework UI', 'Librairie de composants web légers éco-conçus basés uniquement sur des propriétés CSS avancées.', 11),
('Sharding Manager', 'Script orchestrant le partitionnement de données et la réplication automatique de clusters MongoDB.', 12),
('TaskFlow API', 'Application SAAS de gestion de tâches avec architecture modulaire et gestion fine des rôles (RBAC).', 13),
('MicroBank Spring', 'Architecture de services financiers résilients implémentant le design pattern Circuit Breaker (Resilience4j).', 14),
('A11y-Validator', 'Extension de navigateur analysant la structure du DOM pour flagger les manquements d''accessibilité.', 15),
('SmartContract Voting', 'Système de vote électronique décentralisé et immuable développé sur la blockchain Ethereum via Solidity.', 16),
('Docker Deploy Tool', 'Script Bash d''automatisation déployant et isolant instantanément des environnements de staging web.', 17),
('LispInterpreter C', 'Écriture d''un mini-interpréteur de code source pour un sous-ensemble du langage de programmation Lisp.', 18),
('NestCore E-commerce', 'Boutique en ligne complète construite en NestJS proposant une architecture CQRS performante.', 19),
('Predictive Sales', 'Script d''analyse de séries temporelles estimant l''évolution des stocks de magasins à 3 mois.', 20),
('DataPipe Warehouse', 'Architecture simplifiée d''entrepôt de données centralisé agrégeant des sources hétérogènes.', 21),
('VoxelEngine OpenTK', 'Générateur de mondes procéduraux en 3D par voxels écrit en C# exploitant les shaders OpenGL.', 22),
('App Prototype Travel', 'Dossier complet de recherche utilisateur, d''arborescence produit et prototype haute fidélité Figma.', 23),
('Ansible Network Provisioner', 'Playbooks automatisant l''isolation de VLANs sur un réseau d''infrastructure virtualisé.', 24);


-- ============================================================================
-- 6. MATCHING COMPLEMENTARY CVS (Linked to students 5 to 14 via studend_id_id)
-- ============================================================================
INSERT INTO cvs (name, url, uploaded_at, studend_id_id) VALUES
('CV_Thomas_Legrand.pdf', '/cv/thomas_legrand.pdf', CURRENT_TIME, 5),
('CV_Chloé_Martinez.pdf', '/cv/chloe_martinez.pdf', CURRENT_TIME, 6),
('CV_Youssef_Elamri.pdf', '/cv/youssef_elamri.pdf', CURRENT_TIME, 7),
('CV_Emma_Petit.pdf', '/cv/emma_petit.pdf', CURRENT_TIME, 8),
('CV_Leila_Haddad.pdf', '/cv/leila_haddad.pdf', CURRENT_TIME, 10),
('CV_Hugo_Vidal.pdf', '/cv/hugo_vidal.pdf', CURRENT_TIME, 11),
('CV_Sofiane_Belaid.pdf', '/cv/sofiane_belaid.pdf', CURRENT_TIME, 12),
('CV_Clara_Renard.pdf', '/cv/clara_renard.pdf', CURRENT_TIME, 13),
('CV_Antoine_Gautier.pdf', '/cv/antoine_gautier.pdf', CURRENT_TIME, 14);