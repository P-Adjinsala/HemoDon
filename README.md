<div align="center">

<img src="frontend/src/assets/images/hemodon_hero.png" alt="HemoDon Banner" width="100%" />

# 🩸 HemoDon

**Plateforme intelligente de gestion des dons de sang et d'orchestration de la logistique d'urgence**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.x-black?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-336791?logo=postgresql)](https://www.postgresql.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-8E75B2?logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/license-See%20LICENSE.txt-lightgrey)](LICENSE.txt)

[Fonctionnalités](#-fonctionnalités) · [Architecture](#-architecture) · [Démarrage rapide](#-démarrage-rapide) · [Base de données](#-base-de-données) · [API](#-api-reference) · [Contribuer](#-contribuer)

</div>

---

## 📖 À propos

HemoDon est une plateforme web full-stack conçue pour relever les défis critiques de la gestion des dons de sang dans les systèmes de santé à infrastructures logistiques limitées. Elle connecte en temps réel les donneurs, les hôpitaux et les coordinateurs régionaux — et va plus loin en orchestrant des livraisons d'urgence par drone et en intégrant un assistant médical IA directement dans le workflow.

La plateforme est bilingue (français en priorité) et conçue avec les réalités des systèmes de santé camerounais et d'Afrique centrale à l'esprit, avec des données pré-chargées pour les centres majeurs dont le CNTS Yaoundé, l'Hôpital Général de Douala, et les hôpitaux régionaux de Garoua et Bafoussam.

**Pour qui ?**

| Rôle | Ce qu'il peut faire |
|---|---|
| **Donneurs** | S'inscrire, suivre son éligibilité, prendre des rendez-vous, obtenir des badges |
| **Hôpitaux** | Enregistrer leur établissement, diffuser des demandes de sang urgentes, gérer les files de patients |
| **Coordinateurs régionaux** | Surveiller les tableaux de bord d'inventaire, dispatcher des drones, consulter les analyses système |
| **Tous** | Dialoguer avec HemoAI pour des conseils pré-don et des questions de compatibilité |

---

## ✨ Fonctionnalités

### 🩸 Gestion des donneurs
- Inscription et gestion de profil avec suivi complet du groupe sanguin
- Moteur d'éligibilité basé sur les intervalles de don et les indicateurs de santé
- Prise de rendez-vous avec disponibilités en temps réel des centres
- Système de récompenses et badges (Bronze → Argent → Or → Platine → Légendaire)

### 🏥 Registre des hôpitaux et centres
- Auto-enregistrement des hôpitaux avec géolocalisation (latitude/longitude)
- Inventaire de stock sanguin en direct par établissement, suivi de poches à code-barres
- File de triage transfusionnel des patients avec 3 niveaux de priorité (P1 Critique / P2 Urgent / P3 Routine)

### 🚁 Logistique & Dispatch de drones
- Diffusion en temps réel de demandes de sang urgentes (CRITIQUE / URGENT / STANDARD)
- Tableau de bord de télémétrie drone : batterie %, altitude, vitesse, température, ETA, progression de route
- Cycle de vie complet : `IDLE → ROUTE_PLANNING → IN_FLIGHT → DELIVERED → RETURNED`
- Carte logistique animée avec codes de zones GIS pour la coordination régionale

### 🤖 Assistant HemoAI
- IA conversationnelle propulsée par Google Gemini, spécialisée dans le don de sang
- Chat multi-tours avec historique de session persistant
- Prompts pré-définis : intervalles de don, règles tatouage/piercing, nutrition, compatibilité
- Mode démo hors-ligne gracieux si la clé API n'est pas configurée

### 📊 Tableau de bord analytique
- Visualisations de stocks sanguins avec Recharts
- Analyses de tendances de dons et cartes de couverture régionale
- Bannières d'alerte d'urgence en direct avec contrôles de diffusion vers les hôpitaux

### 🔐 Authentification
- Contrôle d'accès basé sur les rôles : `donor`, `hospital`, `regional`
- Flux d'inscription et de connexion sécurisés
- Hachage de mots de passe bcrypt (niveau schéma)

---

## 🏗 Architecture

HemoDon est organisé en **monorepo** avec 4 modules séparés, un fichier de composition Docker à la racine, et un `package-lock.json` global.

```
HemoDon/
│
├── frontend/                         # Application React (Vite + TypeScript)
│   ├── src/
│   │   ├── App.tsx                   # Composant racine, état global, routage par onglets
│   │   ├── main.tsx                  # Point d'entrée React
│   │   ├── types.ts                  # Types TypeScript partagés & matrice de compatibilité sanguine
│   │   ├── index.css                 # Styles globaux (Tailwind CSS v4)
│   │   ├── assets/images/            # Assets statiques (image hero, logos)
│   │   └── components/
│   │       ├── HomeTab.tsx           # Page d'accueil & call-to-action
│   │       ├── SignUpTab.tsx         # Inscription donneurs & hôpitaux
│   │       ├── LoginTab.tsx          # Authentification
│   │       ├── DashboardTab.tsx      # Stock sanguin, analytiques, file de triage
│   │       ├── DonorTab.tsx          # Profil donneur, rendez-vous, badges
│   │       ├── LogisticsTab.tsx      # Dispatch drones, demandes urgentes, carte
│   │       ├── CentersTab.tsx        # Annuaire des centres & disponibilités
│   │       ├── AIAssistantTab.tsx    # Interface de chat HemoAI
│   │       └── HospitalRegistrationTab.tsx
│   ├── index.html                    # Shell SPA
│   ├── vite.config.ts                # Configuration Vite
│   ├── tsconfig.json                 # Configuration TypeScript
│   └── package.json                  # Dépendances frontend
│
├── backend/                          # Serveur API Express (TypeScript)
│   ├── server.ts                     # Point d'entrée Express (health check, proxy Gemini)
│   └── package.json                  # Dépendances backend
│
├── database/                         # Artefacts de base de données
│   └── schema.sql                    # Schéma PostgreSQL 13+ complet (8 couches métier)
│
├── deployment/                       # Configuration de déploiement
│   └── ...                           # (Kubernetes, CI/CD, scripts Cloud Run)
│
├── docker-compose.yml                # Orchestration des conteneurs (frontend + backend + DB)
├── package-lock.json                 # Lockfile global des dépendances
├── .gitignore
└── LICENSE.txt
```

### Stack technologique

| Couche | Technologie |
|---|---|
| **Frontend** | React 19, TypeScript 5.8, Tailwind CSS v4, Framer Motion, Recharts, Lucide Icons |
| **Backend** | Node.js, Express 4, TypeScript (compilé via esbuild) |
| **IA** | Google Gemini (`@google/genai` SDK) — modèle : `gemini-3.5-flash` |
| **Base de données** | PostgreSQL 13+ (schéma prêt, clés primaires UUID) |
| **Build** | Vite 6 (dev) + esbuild (bundle serveur production) |
| **Runtime** | tsx (développement), Node.js (production) |
| **Conteneurisation** | Docker + Docker Compose |

### Flux de requêtes

```
Navigateur (React SPA)
    │
    ├── Assets statiques ─────────── Vite Dev Server (dev) / Express static (prod)
    │
    └── Appels API
          │
          ├── GET  /api/health         → Express → réponse JSON de statut
          └── POST /api/gemini/chat    → Express → Google Gemini API → réponse texte
```

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** v18 ou supérieur
- **npm** v9 ou supérieur
- Une **clé API Google AI Studio** (pour l'assistant HemoAI) — gratuite sur [ai.google.dev](https://ai.google.dev)
- *(Optionnel)* **PostgreSQL 13+** pour la persistance complète

### 1. Cloner le dépôt

```bash
git clone https://github.com/P-Adjinsala/HemoDon.git
cd HemoDon
```

### 2. Installer les dépendances

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Ouvrir `.env.local` et renseigner les valeurs :

```env
# Requis pour l'assistant HemoAI
GEMINI_API_KEY="votre_cle_google_ai_studio"

# URL de l'application (laisser tel quel pour le développement local)
APP_URL="http://localhost:3000"
```

> **Note :** L'application fonctionne en mode démo si `GEMINI_API_KEY` n'est pas définie — toutes les fonctionnalités marchent sauf les réponses IA en direct.

### 4. Lancer en mode développement

```bash
# Depuis la racine
cd backend && npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

### 5. Build de production

```bash
cd backend && npm run build && npm start
```

### 6. Lancer avec Docker

```bash
# Depuis la racine du projet
docker-compose up --build
```

---

## 🗄 Base de données

HemoDon embarque un schéma PostgreSQL complet (`database/schema.sql`) modélisant 8 couches verticales :

| # | Couche | Tables clés |
|---|---|---|
| 1 | Identité & Accès | `users`, enum rôle (`donor`, `hospital`, `regional`) |
| 2 | Établissements | `facilities` (hôpitaux, centres, entrepôts + coords GIS) |
| 3 | Profils & Santé | `donors`, `health_metrics` |
| 4 | Tracking sanguin | `blood_bags` (code-barres), `blood_inventories` |
| 5 | Planification | `appointments`, `blood_drives` |
| 6 | Opérations d'urgence | `urgent_requests`, `drone_deliveries` (télémétrie complète) |
| 7 | Triage patients | `hospital_queues` (priorité P1/P2/P3) |
| 8 | IA & Engagement | `chat_logs`, `donor_rewards`, `contact_messages`, `newsletter_subscribers` |

Pour initialiser la base de données :

```bash
psql -U votre_utilisateur -d votre_base -f database/schema.sql
```

Toutes les clés primaires utilisent `uuid-ossp` pour des UUID cryptographiquement sécurisés. Les index sont pré-définis sur les champs les plus interrogés (rôle, email, géolocalisation, codes de zones).

---

## 🔌 API Reference

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
  "message": "Puis-je donner mon sang si je suis sous antibiotiques ?",
  "history": [
    { "role": "user", "content": "Bonjour" },
    { "role": "model", "content": "Bonjour ! Comment puis-je vous aider ?" }
  ]
}
```

**Réponse :**

```json
{
  "text": "En général, un traitement antibiotique en cours constitue une contre-indication temporaire..."
}
```

> Le tableau `history` est optionnel. L'inclure active le mode conversation multi-tours.

---

## 🩺 Matrice de compatibilité sanguine

HemoDon intègre un moteur de compatibilité (`frontend/src/types.ts`) couvrant les 8 groupes ABO/Rh :

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

La plateforme est en **français** par défaut sur toute l'interface et dans le prompt système de HemoAI. L'assistant détecte automatiquement la langue de l'utilisateur et s'adapte. Un support multilingue étendu (anglais, fulfuldé, ewondo) est prévu.

---

## 🛣 Feuille de route

- [ ] Docker Compose full stack complet (frontend + backend + PostgreSQL)
- [ ] Authentification JWT avec refresh tokens
- [ ] Notifications en temps réel via WebSocket (diffusion de demandes urgentes)
- [ ] Support PWA offline-first pour les zones à faible connectivité
- [ ] Intégration SMS (alertes donneurs urgentes via passerelle SMS)
- [ ] Application mobile (React Native)
- [ ] Intégration matérielle drone réelle (adaptateur API télémétrie)
- [ ] Déploiement multi-régions (Yaoundé, Douala, Garoua)

---

## 🤝 Contribuer

Les contributions sont les bienvenues. Pour démarrer :

1. Forker le dépôt
2. Créer une branche : `git checkout -b feature/nom-de-la-feature`
3. Committer les changements : `git commit -m "feat: description de la feature"`
4. Pousser et ouvrir une Pull Request

Respecter les conventions TypeScript existantes et garder les composants modulaires.

---

## 📄 Licence

Voir [LICENSE.txt](LICENSE.txt) pour les termes complets.

---

<div align="center">

Construit avec ❤️ pour les donneurs de sang et les soignants d'Afrique centrale.

**HemoDon** — *Chaque don compte. Chaque seconde compte.*

</div>
