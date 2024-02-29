import { genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';




export async function authenticateToken(req, res, next) {
  try {
    const secretKey = process.env.SECRET_KEY; // Récupérer la clé secrète depuis les variables d'environnement
    const token = req.cookies.token; // Récupérer le token depuis le cookie

    if (!token) {
      return res.sendStatus(401); // Si aucun token, renvoyer une erreur 401
    }

    const payload = jwt.verify(token, secretKey); // Décoder le token pour obtenir le payload

    req.user = payload; // Attacher le payload à l'objet de requête pour une utilisation ultérieure

    next(); // Passer à la prochaine fonction middleware
  } catch (error) {
    return res.sendStatus(403); // Si le token est invalide, renvoyer une erreur 403
  }
}


/* 
Le "payload" est un terme utilisé en informatique pour désigner les données effectivement transportées dans un paquet de transmission ou dans un message. Il s'agit des informations utiles qui sont transportées par le message, en excluant les informations de protocole utilisées pour la transmission ou le transport des données.

Dans le contexte des JSON Web Tokens (JWT), le "payload" est la partie du token qui contient les revendications. Les revendications sont des déclarations sur une entité (typiquement, l'utilisateur) et des données supplémentaires. Il y a trois types de revendications : enregistrées, publiques et privées.

Par exemple, un payload de JWT pourrait ressembler à ceci :

{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}

Dans cet exemple, "sub", "name" et "admin" sont des revendications. "sub" est une revendication enregistrée (définie dans la spécification JWT) qui désigne le sujet du token (généralement l'utilisateur). "name" et "admin" sont des revendications privées, définies par ceux qui utilisent le JWT.

 */


