

Projet Long Année 2018/2019

**Contributeurs :**

BELKHIR Ghassen  
MABIKA MABIKA Junior  
LOW PEIN Kévin  
VO Tony

Notre rendu contient :
-Un dossier WebMobileApp : contient l'application Web et mobile.
-Un dossier server : contient le code de notre serveur Web.
-Un dossier docForServer : contient la documentation en HTML du code du serveur ("Jsdoc"). 
-Un dossier docForWebApp : contient la documentation en HTML du code de l'applicaation Web ou mobile ("Typedoc"). 
-Un fichier quizApiDoc.html : contient la documentation des Api développés ("Swagger-jsdoc").
-Un dossier dump : contient un backup d'un exemple de données saisies pour faciliter le test : pour sauvegarder ce backup dans la base, il faut suivre 
les étapes de la partie Restore Data du lien suivant :"https://www.tutorialspoint.com/mongodb/mongodb_create_backup.htm"

(Cette installation concerne les machines Windows) :

  
**Pré-requis :**  
Avant de tester notre projet, vous devez le dézipper puis vous devez installer les outils suivants si vous ne les avez pas encore sur votre machine :

**NPM (le package manager)**  
Pour l’installer, ouvrez une ligne de commande et tapez la commande suivante :  <br/>
npm install -g npm@latest  <br/>
Si cette commande échoue pour un problème de permission sur Mac ou Linux, vous pouvez la lancer en mode super-utilisateur  avec _sudo_.<br/>

**ANGULAR/CLI**  
Maintenant, il faudra installer le CLI d’Angular sur votre machine avec la commande suivante (si besoin, utilisez sudo):<br/>
npm install -g @angular/cli

**NODE.JS**  
Vous devez télécharger et installer la dernière version LTS (la version 10.14.1 de Node.js) : <br/> 
[https://nodejs.org/en/download/](https://nodejs.org/en/download/)<br/>

**MONGO DB** :  
Vous devez télécharger et installer la base de données MongoDB :<br/>  
<u>https://www.mongodb.com/download-center/community</u><br/>

**APPLICATION MOBILE**
Pour installer l'application Quizmaker sur votre smartphone, il faut transférer le fichier "app-debug.apk" sur votre téléphone et l'installer manuellement après avoir changer 
l'adresse ip du fichier environment.ts se trouvant dans : \WebMobileApp\src\environments\environment.ts par le votre puis de générer l'application avec l'aide
du terminal de VSCODE avec la commande ng build puis d'ouvrir le terminal Powershell dans le  



**Liste de commande :**

Pour démarrer notre projet, vous devez lancer deux terminaux en même temps.<br/>

Avec le premier terminal vous devez vous rendre dans le répertoire /server et taper la commande node app.js afin d’effectuer le lancement 
de  serveur Web de notre projet et avec le second, vous devez vous rendre dans le répertoire /client pour taper la commande npm start.

Sur votre navigateur vous pouvez entrer l’adresse URL grâce à NPM start : [http://localhost:4200/](http://localhost:4200/) afin de naviguer 
sur notre site WEB et aussi sur un autre onglet en mettant l’adresse URL : [http://localhost:8080/api/quiz](http://localhost:8080/api/quiz),
vous pouvez consulter la liste des informations concernant un questionnaire.