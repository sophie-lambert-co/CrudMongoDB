// src/main.jsx

// Importe ReactDOM de la bibliothèque react-dom

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';




// Récupération de l'élément HTML avec l'ID "root"
//document est un objet JavaScript qui représente le modèle DOM
// (Document Object Model) de la page web.
const root = document.getElementById("root");
// Création de la racine React avec l'élément récupéré
//document.getElementById('root') est une méthode du modèle DOM qui recherche et renvoie l'élément HTML qui a l'ID spécifié, dans ce cas, l'ID est "root".
//root est l'élément HTML qui a été récupéré à l'aide de document.getElementById('root'). Il s'agit de l'endroit où votre application React sera rendue.
//La racine React est une instance de la racine React créée à l'aide de la fonction createRoot. La racine React est un concept introduit dans les versions plus récentes de React, notamment dans la version React 18.
//La racine React représente le point d'ancrage pour le rendu de votre application React. Toutes les opérations de rendu, mises à jour d'état, etc., se font à partir de cette racine.
//En résumé, document fournit un accès au modèle DOM, getElementById est utilisé pour récupérer un élément spécifique de la page par son ID, et la racine React est créée pour gérer le rendu de votre application React à cet endroit particulier dans le modèle DOM.

const reactRoot = createRoot(root);

// Fonction pour rendre le composant passé en argument dans la racine React
const render = (App) => {
  reactRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Fonction pour créer la racine React et rendre le composant principal (App)
const createRootComponent = () => {
  render(App);
};

// Appel de la fonction pour créer la racine au démarrage
createRootComponent();

//En résumé, ce bloc de code permet à votre application de se mettre à jour de manière dynamique lorsque vous apportez des modifications à votre composant App sans avoir à recharger manuellement la page du navigateur. C'est une fonctionnalité puissante pour le développement rapide et la visualisation instantanée des modifications.
