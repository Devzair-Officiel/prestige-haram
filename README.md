# Prestige Haram

Base frontend React + TypeScript + Vite, exécutée dans Docker.

## Prérequis

- Docker
- Docker Compose

## Démarrage

```bash
docker compose up --build
```

Application disponible sur : http://localhost:5173

Le Hot Module Replacement de Vite est activé : toute modification d'un fichier
depuis la machine hôte recharge automatiquement le navigateur.

## Arrêt

```bash
docker compose down
```

## Lancer ESLint

```bash
docker compose exec frontend npm run lint
```

## Formater le projet

```bash
docker compose exec frontend npm run format
```

Vérifier le formatage sans écrire :

```bash
docker compose exec frontend npm run format:check
```

## Build de production

```bash
docker compose exec frontend npm run build
```

## Installer une dépendance

```bash
docker compose exec frontend npm install nom-du-package
```

## Structure

```
src/
├── app/            # Composant racine (App.tsx)
├── assets/         # Images, polices, etc.
├── components/
│   ├── layout/     # Header, Footer, ...
│   └── ui/         # Composants UI réutilisables
├── pages/
│   └── Home/       # Page d'accueil
├── hooks/          # Hooks React personnalisés
├── services/       # Appels API, logique métier externe
├── styles/         # Styles globaux
├── types/          # Types TypeScript partagés
├── utils/          # Fonctions utilitaires
└── main.tsx        # Point d'entrée
```
