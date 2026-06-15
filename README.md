<div align="center">

<img src="frontend/src/assets/images/hemodon_hero.png" alt="HemoDon Banner" width="100%" />

# 🩸 HemoDon

**Plateforme intelligente de gestion des dons de sang et d'orchestration de la logistique d'urgence**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.x-black?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-336791?logo=postgresql)](https://www.postgresql.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-8E75B2?logo=google)](https://ai.google.dev/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://docs.docker.com/compose/)
[![License](https://img.shields.io/badge/license-See%20LICENSE.txt-lightgrey)](LICENSE.txt)

[Fonctionnalités](#-fonctionnalités) · [Architecture](#-architecture) · [Démarrage rapide](#-démarrage-rapide) · [Base de données](#-base-de-données) · [API](#-api) · [Contribution](#-contribution)

</div>

---

## 📖 À propos

HemoDon est une plateforme web full-stack conçue pour adresser les défis critiques de la gestion des dons de sang dans les systèmes de santé à infrastructure logistique limitée. Elle connecte en temps réel les donneurs, les hôpitaux et les coordinateurs régionaux — et va plus loin en orchestrant des livraisons d'urgence par drone et en intégrant un assistant médical IA directement dans le flux de travail.

La plateforme est pensée en priorité pour les réalités des systèmes de santé camerounais et d'Afrique centrale, avec des données pré-configurées pour les centres majeurs : CNTS Yaoundé, Hôpital Général de Douala, et les hôpitaux régionaux de Garoua et Bafoussam.

**Qui utilise HemoDon ?**

| Rôle | Ce qu'ils peuvent faire |
|---|---|
| **Donneurs** | S'inscrire, suivre leur éligibilité, prendre rendez-vous, obtenir des badges |
| **Hôpitaux** | Enregistrer leur établissement, diffuser des demandes urgentes, gérer les files de patients |
| **Coordinateurs régionaux** | Surveiller les tableaux de bord des stocks, dispatcher des drones, consulter les analytics |
| **Tous** | Dialoguer avec HemoAI pour des conseils pré-don et des questions de compatibilité |

---

## ✨ Fonctionnalités

### 🩸 Gestion des donneurs
- Inscription et gestion de profil avec suivi complet du groupe sanguin
- Moteur d'éligibilité basé sur les intervalles de don et les métriques de santé
- Prise de rendez-vous avec disponibilité des créneaux en temps réel
- Système de récompenses et badges (Bronze → Argent → Or → Platine → Légendaire)

### 🏥 Registre hôpitaux & établissements
- Auto-enregistrement des hôpitaux avec géolocalisation (lat/long)
- Inventaire des stocks sanguins par établissement avec traçabilité des poches par code-barres
- File de triage des patients avec 3 niveaux de priorité (P1 Critique / P2 Urgent / P3 Routine)

### 🚁 Logistique & dispatch de drones
- Diffusion d'alertes urgentes avec niveaux d'urgence (CRITICAL / URGENT / STANDARD)
- Tableau de bord de télémétrie drones : batterie, altitude, vitesse, température, ETA, progression
- Cycle de vie du drone : `IDLE → ROUTE_PLANNING → IN_FLIGHT → DELIVERED → RETURNED`
- Carte logistique animée avec codes de zones GIS pour la coordination régionale

### 🤖 Assistant HemoAI
- IA conversationnelle propulsée par Google Gemini, spécialisée dans le don de sang
- Chat multi-tours avec historique de session persistent
- Prompts pré-configurés : intervalles de don, règles tatouage/piercing, nutrition, compatibilité
- Mode démo hors-ligne automatique si la clé API est absente

### 📊 Dashboard analytique
- Visualisations des stocks sanguins (Recharts)
- Analytics des tendances de don et cartes de couverture régionale
- Bannières d'alertes d'urgence en direct avec contrôles de diffusion vers les hôpitaux

### 🔐 Authentification
- Contrôle d'accès basé sur les rôles : `donor`, `hospital`, `regional`
- Flux d'inscription et de connexion sécurisés
- Hachage des mots de passe bcrypt (niveau schéma)

---

## 🏗 Architecture

HemoDon est organisé en **monorepo** avec quatre dossiers principaux correspondant aux couches fonctionnelles du système.

```
HemoDon/
│
├── frontend/                         # Application React (Vite + TypeScript)
│   ├── src/
│   │   ├── App.tsx                   # Composant racine, état global, routing par onglets
│   │   ├── main.tsx                  # Point d'entrée React
│   │   ├── types.ts                  # Types TypeScript partagés & matrice de compatibilité
│   │   ├── index.css                 # Styles globaux (Tailwind CSS v4)
│   │   ├── assets/images/            # Assets statiques (image hero, logos)
│   │   └── components/
│   │       ├── HomeTab.tsx           # Page d'accueil & appels à l'action
│   │       ├── SignUpTab.tsx         # Inscription donneurs & hôpitaux
│   │       ├── LoginTab.tsx          # Authentification
│   │       ├── DashboardTab.tsx      # Stocks sanguins, analytics, file de triage
│   │       ├── DonorTab.tsx          # Profil donneur, rendez-vous, badges
│   │       ├── LogisticsTab.tsx      # Dispatch drones, demandes urgentes, carte
│   │       ├── CentersTab.tsx        # Annuaire des centres & disponibilité des créneaux
│   │       ├── AIAssistantTab.tsx    # Interface chat HemoAI
│   │       └── HospitalRegistrationTab.tsx  # Onboarding établissements
│   ├── index.html                    # Shell SPA
│   ├── vite.config.ts                # Configuration Vite
│   └── package.json                  # Dépendances frontend
│
├── backend/                          # Serveur Express (TypeScript)
│   ├── server.ts                     # API Express (health check, proxy Gemini)
│   └── package.json                  # Dépendances backend
│
├── database/                         # Schéma & migrations PostgreSQL
│   └── schema.sql                    # Schéma entreprise complet (PostgreSQL 13+)
│
├── deployment/                       # Configuration de déploiement
│   └── ...                           # Scripts CI/CD, configs cloud, variables d'env
│
├── docker-compose.yml                # Orchestration des conteneurs
├── .gitignore
├── LICENSE.txt
└── README.md
```

### Stack technologique

| Couche | Outil | Version |
|---|---|---|
| **Frontend** | React | `^19.0.1` |
| | TypeScript | `~5.8.2` |
| | Tailwind CSS (`@tailwindcss/vite`) | `^4.1.14` |
| | Framer Motion (`motion`) | `^12.23.24` |
| | Recharts | `^3.8.1` |
| | Lucide React | `^0.546.0` |
| **Backend** | Node.js | ≥ 18 |
| | Express | `^4.21.2` |
| | dotenv | `^17.2.3` |
| **IA** | `@google/genai` SDK | `^2.4.0` |
| | Modèle Gemini | `gemini-3.5-flash` |
| | Température | `0.7` |
| **Build** | Vite | `^6.2.3` |
| | esbuild (bundle serveur prod) | `^0.25.0` |
| | tsx (runtime dev) | `^4.21.0` |
| **Cible JS** | ES2022, moduleResolution: `bundler` | — |
| **Base de données** | PostgreSQL | 13+ |
| | Extension UUID | `uuid-ossp` |
| **Conteneurisation** | Docker + Docker Compose | — |

### Flux de requêtes

Le serveur Express démarre sur le port `5000` (`0.0.0.0:3000`). Les routes API sont enregistrées **avant** les middlewares Vite pour éviter les conflits de résolution SPA.

```
Navigateur
    │
    │  PORT 5000
    ▼
Express Server (backend/server.ts)
    │
    ├── express.json()                        # Body parser JSON
    │
    ├── GET  /api/health                      # Healthcheck → { status, service, timestamp, firebaseStatus }
    │
    ├── POST /api/gemini/chat                 # Proxy IA
    │     ├── Validation : message requis
    │     ├── Si GEMINI_API_KEY absente → réponse démo statique (mode hors-ligne)
    │     ├── Construction de l'historique multi-tours (role: user | model)
    │     ├── Appel @google/genai → gemini-3.5-flash (temperature: 0.7)
    │     │   └── systemInstruction : HemoAI (fr, empathique, formatage Markdown)
    │     └── → { text: string }
    │
    └── Assets SPA (wildcard *)
          ├── DEV  : Vite middleware (HMR, module graph)
          └── PROD : express.static("dist") + fallback index.html
```

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** v18 ou supérieur
- **npm** v9 ou supérieur
- **Docker** & **Docker Compose** *(optionnel, recommandé)*
- Une **clé API Google AI Studio** (pour HemoAI) — gratuite sur [ai.google.dev](https://ai.google.dev)
- **PostgreSQL 13+** pour la persistance complète

### 1. Cloner le dépôt

```bash
git clone https://github.com/P-Adjinsala/HemoDon.git
cd HemoDon
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Éditer `.env.local` :

```env
# Requis pour l'assistant HemoAI
GEMINI_API_KEY="votre_cle_google_ai_studio"

# URL de l'application (laisser tel quel en local)
APP_URL="http://localhost:5000"
```

> **Note :** L'application fonctionne en mode démo si `GEMINI_API_KEY` n'est pas définie — toutes les fonctionnalités restent opérationnelles sauf les réponses IA en direct.

### 3. Démarrage avec Docker (recommandé)

```bash
docker-compose up --build
```

L'application sera disponible sur [http://localhost:5000](http://localhost:5000).

### 4. Démarrage manuel (développement)

**Backend :**

```bash
cd backend
npm install
npm run dev
```

**Frontend** (dans un autre terminal) :

```bash
cd frontend
npm install
npm run dev
```

### 5. Build de production

```bash
cd frontend && npm run build
cd ../backend && npm run build
npm start
```

---

## 🗄 Base de données

HemoDon embarque un schéma PostgreSQL complet (`database/schema.sql`) — **17 tables**, **9 types ENUM**, **2 triggers automatisés** et des données de seed pré-chargées pour le développement local.

### Types ENUM

| Enum | Valeurs |
|---|---|
| `r_blood_type` | `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-` |
| `r_user_role` | `donor`, `hospital`, `regional` |
| `r_emergency_level` | `CRITICAL`, `URGENT`, `STANDARD` |
| `r_drone_status` | `IDLE`, `ROUTE_PLANNING`, `IN_FLIGHT`, `DELIVERED`, `RETURNED` |
| `r_appointment_status` | `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED` |
| `r_bag_status` | `AVAILABLE`, `RESERVED`, `DISPATCHED`, `EXPIRED` |
| `r_queue_priority` | `P1_CRITICAL`, `P2_URGENT`, `P3_ROUTINE` |
| `r_queue_status` | `WAITING`, `TRANSFUSING`, `STABILIZED`, `DISCHARGED` |
| `r_reward_tier` | `BRONZE`, `SILVER`, `GOLD`, `PLATINUM`, `LEGENDARY` |

### Tables

| # | Table | Description |
|---|---|---|
| 1 | `users` | IAM — email, `password_hash` (bcrypt), rôle, langue préférée |
| 2 | `facilities` | Hôpitaux, centres de collecte, entrepôts — coords GIS + `zone_code` + `is_trauma_center` |
| 3 | `donors` | Profil donneur lié à `users` — groupe sanguin, éligibilité, `donations_count`, `total_volume_ml` |
| 4 | `health_metrics` | Historique biométrique — hémoglobine, tension, pouls, température |
| 5 | `blood_drives` | Campagnes de collecte régionales — timeline, cible d'unités, code de zone |
| 6 | `appointments` | Rendez-vous de don — créneau horaire, statut, notes médecin |
| 7 | `blood_bags` | Poches de sang barcodeées (ex. `BAG-O-NEG-992`) — chaîne du froid, étagère, statut |
| 8 | `blood_inventories` | Matrice de stock en temps réel par établissement × groupe sanguin + `safety_threshold` |
| 9 | `hospital_queues` | File de triage patient — priorité P1/P2/P3, statut, poche allouée |
| 10 | `urgent_requests` | Alertes d'urgence (ex. `REQ-9902`) — niveau, drone dispatché, motif médical |
| 11 | `drone_deliveries` | Télémétrie vol — batterie %, altitude, vitesse, `progress_percent`, ETA, timestamps |
| 12 | `chat_logs` | Conversations HemoAI — par `user_id` ou `session_id` pour les guests |
| 13 | `contact_messages` | CRM landing page — statut `UNREAD / IN_PROGRESS / RESOLVED` |
| 14 | `newsletter_subscribers` | Abonnés newsletters |
| 15 | `app_notifications` | Alertes système — types `INFO / SUCCESS / WARNING / ALERT_EMERGENCY` |
| 16 | `donor_rewards` | Badges gamification — titre, tier, icône, date d'obtention |

### Triggers automatisés

| Trigger | Table | Effet |
|---|---|---|
| `trg_blood_bags_inventory_sync` | `blood_bags` | Met à jour `blood_inventories.units_available` à chaque INSERT / UPDATE / DELETE d'une poche |
| `trg_appointments_donor_stats_sync` | `appointments` | Incrémente `donations_count` et `total_volume_ml` (+450 mL) sur le donneur quand un rendez-vous passe à `COMPLETED` ; déclenche l'attribution automatique du badge `Sauveteur Élite` (SILVER) à partir de 5 dons |

### Données de seed

Le schéma inclut des données de départ pour le développement local :

- **3 établissements** : Clinique de l'Espoir (Yaoundé, Zone A-1), Hôpital de District de Garoua (Zone B-4), Hôpital Central de Yaoundé (Zone A-2)
- **3 utilisateurs** : coordinateur régional, donneur O−, personnel hospitalier
- **1 donneur** avec 4 dons, localisation Mvog-Mbi, 2 badges débloqués
- **2 patients en triage** : P1 Critique (anémie pédiatrique) + P2 Urgent (chirurgie cardiaque)
- **1 drone en vol** : `HEMO-DRONE-APEX`, 89 % batterie, 65 % de progression, ETA 4 min
- **Inventaires sanguins** pré-chargés pour O− et A+ sur les 3 centres

**Initialisation :**

```bash
psql -U votre_utilisateur -d votre_base -f database/schema.sql
```

> Le script est idempotent — il `DROP … CASCADE` les tables existantes avant recréation, ce qui permet des cycles de migration propres.

---

## 🔌 API

### `GET /api/health`

Retourne le statut du service.

```json
{
  "status": "healthy",
  "service": "HemoDon API",
  "timestamp": "2026-06-15T10:00:00.000Z"
}
```

### `POST /api/gemini/chat`

Envoie un message à l'assistant HemoAI.

**Corps de la requête :**

```json
{
  "message": "Puis-je donner du sang si je suis sous antibiotiques ?",
  "history": [
    { "role": "user", "content": "Bonjour" },
    { "role": "model", "content": "Bonjour ! Comment puis-je vous aider ?" }
  ]
}
```

**Réponse :**

```json
{
  "text": "En général, un traitement antibiotique en cours constitue une contre-indication temporaire au don de sang..."
}
```

> Le tableau `history` est optionnel. L'inclure permet les conversations multi-tours.

---

## 🩺 Matrice de compatibilité sanguine

HemoDon intègre un moteur de compatibilité couvrant les 8 groupes sanguins ABO/Rh :

| Groupe | Peut donner à | Peut recevoir de |
|---|---|---|
| **O−** | Tous (Donneur universel) | O− uniquement |
| **O+** | O+, A+, B+, AB+ | O−, O+ |
| **A−** | A−, A+, AB−, AB+ | O−, A− |
| **A+** | A+, AB+ | O−, O+, A−, A+ |
| **B−** | B−, B+, AB−, AB+ | O−, B− |
| **B+** | B+, AB+ | O−, O+, B−, B+ |
| **AB−** | AB−, AB+ | O−, A−, B−, AB− |
| **AB+** | AB+ uniquement | Tous (Receveur universel) |

---

## 🌍 Localisation

La plateforme est en **français** par défaut — interface, messages système, et instruction système de HemoAI. L'assistant IA détecte automatiquement la langue de l'utilisateur et s'y adapte. Le support multilingue (anglais, fulfuldé, ewondo) est prévu dans les prochaines versions.

---

## 🛣 Feuille de route

- [ ] Finalisation Docker Compose (frontend + backend + PostgreSQL)
- [ ] Authentification JWT avec refresh tokens
- [ ] Notifications en temps réel via WebSocket (alertes urgences)
- [ ] Support PWA offline-first pour les zones à connectivité limitée
- [ ] Intégration SMS (alertes donneurs urgents via passerelle SMS)
- [ ] Application mobile (React Native)
- [ ] Adaptateur télémétrie drones physiques
- [ ] Déploiement multi-régions (Yaoundé, Douala, Garoua)

---

## 🤝 Contribution

Les contributions sont les bienvenues. Pour commencer :

1. Forker le dépôt
2. Créer une branche : `git checkout -b feature/nom-de-votre-feature`
3. Committer vos changements : `git commit -m "feat: ajouter votre feature"`
4. Pousser et ouvrir une Pull Request

Merci de respecter les conventions TypeScript existantes et de garder les composants modulaires.

---

## 📄 Licence

Voir [LICENSE.txt](LICENSE.txt) pour les conditions complètes.

---

<div align="center">

Construit avec ❤️ pour les donneurs de sang et les professionnels de santé en Afrique centrale.

**HemoDon** — *Chaque don compte. Chaque seconde compte.*

</div>
