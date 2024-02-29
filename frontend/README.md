# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Nom du Projet Front-end

### Description

Ce projet est un exercie back end sur lequel j'ai souhaité installer le front-end pour une application de gestion de recettes. Il permet aux utilisateurs de consulter des recettes, d'ajouter des recettes à leur collection, de rechercher des recettes par ingrédient, etc.
Le front end n'est pas abouti, je voulais dans un premier temps installer le front-end pour voir comment cela fonctionne.
Je vais continuer à travailler sur ce projet pour le rendre fonctionnel.

Ce projet inlcut les fonctionnalités suivantes:

- Connexion et inscription des utilisateurs avec authentification et autorisation.
- Affichage des recettes
- Recherche de recettes par mot-clé
- Création de recettes

### Technologies utilisées

les technologies utilisées sont les suivantes:

- React
- Vite
- Bootstrap
- Axios
- React Router

### Installation

Pour installer le front-end, suivez les étapes suivantes:

1. Clonez le dépôt
2. Naviguez dans le répertoire du projet
3. Installez les dépendances en exécutant la commande suivante:

```bash

npm install

```

4. Lancez le serveur de développement en exécutant la commande suivante:

```bash

npm run dev

```

5. Ouvrez votre navigateur et accédez à l'application à l'adresse suivante: <http://localhost:5173>

6. Configurez l'URL du backend : Dans votre application React, vous devrez spécifier l'URL de votre backend pour les appels API. Créez un fichier de configuration (par exemple, src/config.js) où vous stockerez cette URL :
http://localhost:3000

7. Créez un fichier .env.local à la racine de votre projet et ajoutez la ligne suivante :

```javascript

VITE_API_URL=http://localhost:3000

```

8. Redémarrez votre serveur de développement pour que les modifications soient prises en compte.

9. Vous pouvez maintenant utiliser l'application pour gérer vos recettes.

### Configuration

Pour configurer le front-end, vous pouvez modifier les fichiers de configuration suivants:

- `vite.config.js` : ce fichier contient la configuration de Vite. Vous pouvez y ajouter des plugins, des alias, des options de compilation, etc.
- `package.json` : ce fichier contient les dépendances du projet. Vous pouvez y ajouter des dépendances, des scripts.
- `src/config.js` : ce fichier contient la configuration de l'application. Vous pouvez y ajouter des variables d'environnement, des constantes, etc.

### Utilisation

Pour utiliser le front-end, suivez les étapes suivantes:

1. Ouvrez votre navigateur et accédez à l'application à l'adresse suivante: <http://localhost:5173>
2. Connectez-vous à l'application en utilisant vos identifiants
3. Vous pouvez maintenant utiliser l'application pour gérer vos recettes.

### Commentaires

Pour améliorer le front-end, je pourrais ajouter les fonctionnalités suivantes:

- Ajouter des fonctionnalités de gestion des recettes ( modifier, supprimer)
- Ajouter une interface d'administration pour gérer les utilisateurs et les recettes
- Ajouter des fonctionnalités de partage et de notation des recettes
- Ajouter des fonctionnalités de recherche avancée (par catégorie, par type, par durée de préparation, etc.)
- Améliorer l'interface utilisateur et l'expérience utilisateur

- Améliorer la sécurité de l'application (gestion des sessions, protection contre les attaques CSRF, etc.)
- Ajouter des fonctionnalités de gestion des erreurs (gestion des erreurs 404, gestion des erreurs 500, etc.)

- Ajouter des tests unitaires et des tests d'intégration

J'ai été bloqué par les problèmes suivants:

- Mauvaise construction du front-end ( il faudrait refactoriser le code pour le rendre plus lisible et plus maintenable, notamment en utilisant des composants réutilisables, en séparant la logique de présentation de la logique de gestion, en utilisant des hooks personnalisés, etc).
- Mauvaise organisation de ma base de données (il faudrait revoir la structure de la base de données pour qu'elle soit plus performante, plus évolutive, plus sécurisée, etc). C'était une initiation à de la BDD non SQL, mon formateur se formait en même temps que moi, donc il y a des erreurs de conception.


### Frontend (comment j'ai installer mon frontend sur mon backend)

- Creer un dossier frontend ou vue ou client a la racine de l'application

- Vous pouvez créer un nouveau projet Vite sans installer create-vite globalement en utilisant npx :
npx create-vite my-recipe-frontend --template react
Cela créera un nouveau projet Vite dans le répertoire spécifié sans nécessiter une installation globale.

- Naviguer dans le répertoire du projet : cd my-recipe-frontend

- Installer les dépendances : npm install

- Structure du projet :

Le code source se trouve dans le répertoire src.
Les composants React se trouvent dans src/components.
Les pages se trouvent dans src/pages.
Les styles globaux se trouvent dans src/styles

- Lancer le serveur de développement : npm run dev