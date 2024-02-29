// TODO : index.mjs

//* Importation du framework Express pour la création du serveur
import express from 'express';

//* Importation du module 'path' de Node.js, qui fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires.
import path from 'path';

//* Importation du module 'multer', une bibliothèque Node.js middleware pour gérer les fichiers uploadés dans les requêtes HTTP.
// Multer facilite la manipulation des fichiers, par exemple, leur téléchargement depuis un formulaire.
// Il est utilisé ici pour configurer le stockage des fichiers uploadés.
import multer from 'multer';

//* Importation du module body-parser pour traiter les données JSON
import bodyParser from 'body-parser';

//* Importation de la fonction connectDB depuis le fichier connectDB.mjs pour gérer la connexion à MongoDB
import connectDB from './connectDB.mjs';



//* Importation des routes définies dans le fichier blablaRoutes.mjs
import userRoutes from './routes/userRoutes.mjs';
import recipeRoutes from './routes/recipeRoutes.mjs';
import ingredientRoutes from './routes/ingredientRoutes.mjs';
import commentRoutes from './routes/commentRoutes.mjs';
import typeRoutes from './routes/typeRoutes.mjs';
import categorieRoutes from './routes/categorieRoutes.mjs';
import imageRoutes from './routes/imageRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

//* Extraction de la fonction json de bodyParser pour faciliter l'utilisation
const { json } = bodyParser;
//* Création d'une instance d'Express
//  app est une instance du framework Express. Express est un framework web pour Node.js qui simplifie la création d'applications web. Lorsqueje cree une instance d'Express avec const app = express();, app devient le point central pour la configuration du serveur, le routage, etc. Toutes les fonctionnalités d'Express, telles que la définition de routes, l'utilisation de middlewares, etc., sont liées à cette instance.
const app = express();


//* Middleware CORS
// Ce middleware ajoute les en-têtes CORS nécessaires pour autoriser les requêtes depuis n'importe quelle origine.
// En production, vous devriez spécifier l'origine autorisée au lieu d'utiliser '*' (étoile) pour des raisons de sécurité.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Utilisation de CORS middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))

//* Middleware : Utilisation de body-parser pour traiter les données JSON dans les requêtes
//  app.use(json()) applique le middleware body-parser pour traiter les données JSON dans les requêtes.
app.use(json());

app.use(cookieParser());

//*En résumé, ces deux lignes permettent d'obtenir le chemin complet du fichier et de son répertoire, ce qui peut être utile pour construire des chemins vers d'autres fichiers ou dossiers dans votre application. Ces variables sont souvent utilisées dans des environnements où les modules ESM sont pris en charge, comme dans Node.js avec la configuration "type": "module" dans le fichier package.json.
//Ces lignes sont utilisées pour déterminer le chemin complet du fichier en cours d'exécution (c'est-à-dire le fichier dans lequel ces lignes de code sont écrites). Elles sont souvent utilisées lorsque vous avez besoin de référencer d'autres fichiers ou dossiers à partir du fichier en cours.
//const __filename = new URL(import.meta.url).pathname; :Cette ligne utilise l'objet import.meta.url fourni par ECMAScript Modules (ESM) pour obtenir l'URL du module en cours d'exécution. Ensuite, avec new URL(...).pathname, on extrait le chemin d'accès au fichier à partir de cette URL. __filename est une variable qui contient le chemin complet du fichier actuel.
const __filename = new URL(import.meta.url).pathname;
//
//const __dirname = path.dirname(__filename); :Ensuite, on utilise le module path pour extraire le répertoire du fichier à partir du chemin complet obtenu précédemment. __dirname est une variable qui contient le répertoire (dossier) du fichier actuel.
const __dirname = path.dirname(__filename);
// Configuration pour servir les fichiers statiques (HTML, CSS, JS, etc.
//app.use(express.static(path.join(__dirname, 'public')));



//* Connexion à MongoDB
// Dans le contexte des promesses (Promise), then est utilisé pour attacher des callbacks qui seront exécutés lorsque la promesse est résolue avec succès. j'utilise then après l'appel à connectDB() pour spécifier les actions à effectuer une fois que la connexion à MongoDB est établie avec succès.
connectDB()
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .then(() => {
    //*  Utilisation des routes définies dans les routes pour les URL commençant par '/recettes'
    app.use('/recettes', userRoutes);
    app.use('/recettes', recipeRoutes);
    app.use('/recettes', ingredientRoutes);
    app.use('/recettes', commentRoutes);
    app.use('/recettes', typeRoutes);
    app.use('/recettes', categorieRoutes);
    app.use('/recettes', imageRoutes);
    app.use('/recettes', authRoutes);
  
   
 
   
    // ajouter les routes...
 
// * Port d'écoute
// port est une variable qui stocke le numéro du port sur lequel le serveur écoutera les requêtes. Dans le code que tu as fourni, le serveur Express est configuré pour écouter sur le port spécifié par la variable port. Si process.env.PORT est défini (ce qui peut être configuré via une variable d'environnement), le serveur utilisera ce port. Sinon, il utilisera le port par défaut 3000.
const port = process.env.PORT || 3000;

// Configurer Multer pour le stockage des fichiers
//configuration de Multer, une bibliothèque Node.js middleware pour la gestion des fichiers uploadés dans les requêtes HTTP
//un objet de configuration pour le stockage est créé en utilisant multer.memoryStorage(). Cela signifie que les fichiers uploadés seront stockés en mémoire en tant que tampons bruts. Cela peut être utile pour effectuer des opérations de traitement sur les fichiers avant de les stocker de manière persistante.
//Multer est un outil qui aide votre application à gérer les fichiers (comme les images). Ici, on lui dit de stocker ces fichiers en mémoire (temporairement) plutôt que de les enregistrer sur l'ordinateur.
const storage = multer.memoryStorage();
//En utilisant la configuration de stockage précédemment définie, un middleware Multer est créé. Ce middleware est capable de gérer les fichiers uploadés dans les requêtes HTTP.
const upload = multer({ storage: storage });

// Utiliser Multer middleware pour gérer les fichiers
//Cette ligne indique à l'application Express d'utiliser le middleware Multer configuré pour gérer les fichiers uploadés. Les fichiers uploadés seront accessibles à partir de l'URL '/uploads'. En outre, express.static est utilisé pour servir les fichiers statiques depuis le dossier spécifié ('uploads' dans ce cas).Par exemple, si un fichier est uploadé avec le nom 'example.jpg', il sera accessible à l'URL http://votre-domaine.com/uploads/example.jpg.
//On dit à votre application que lorsque quelqu'un envoie un fichier (par exemple, une image), utilisez Multer pour le gérer.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Servir les fichiers statiques depuis le dossier public
app.use(express.static(path.join(__dirname, 'frontend/my-recipe-frontend/public')));


//* Démarrage du serveur Express sur le port spécifié
//app.listen(port, ...) indique au serveur Express d'écouter les requêtes sur le port spécifié, et la fonction de rappel () => { console.log(Serveur écoutant sur le port ${port}); } sera exécutée une fois que le serveur est en écoute.
app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
})
.catch((error) => {
   //* Affiche une erreur dans la console en cas d'échec de la connexion à MongoDB
  console.error('Erreur de connexion à MongoDB :', error);
   //* Termine le processus Node.js avec un code d'erreur (1)
  process.exit(1);
});


//
//le fichier index.mjs configure une application Express, se connecte à MongoDB, définit des routes, et démarre un serveur web. 
