# Projet Metz Florian

Ce projet contient dans la branche main l'intégralité de ce qui était attendu (le back aussi, bien que non utilisé)

J'ai créé une seconde branche dans laquelle vous pourrez retrouver mon back-end en dotnet6 qui est déployé sur aws.

Pour gérer les problèmes de CORS j'ai utilisé la doc microsoft : https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-6.0#cors-with-named-policy-and-middleware 

A noter qu'il fallait que j'utilise le lien https de mon api dans mon front pour que cela fonctionne correctement.

Pour ce qui est de l'authentification JWT jai suivi ce tutoriel ci : https://jasonwatmore.com/post/2021/12/14/net-6-jwt-authentication-tutorial-with-example-api

Ensuite pour le déploiement de l'API j'ai suivi ce tutoriel : https://codewithmukesh.com/blog/hosting-aspnet-core-web-api-with-aws-lambda/ 

Enfin pour ce qui est de la base de données, si on utilise une bdd mysql/mariadb comme moi tout fonctionne via une connection string qu'il faut écrire dans le fichier appsetting.developement.json donc en théorie n'importe quel bdd du bon type doit pouvoir fonctionner. 

Une fois la chaîne de connexion récupéré dans le fichier program.cs on l'utilise pour initialisé une connexion permanente à la db pendant que l'api tourne.

Plus concrètement à la place de la ligne 23 de mon program.cs qui est : 
```cs
services.AddDbContext<Context>(opt => opt.UseInMemoryDatabase("db"));
```

Vous aurez quelque chose comme ça : 
```cs
var cs = config.GetConnectionString("Puma");
services.AddEntityFrameworkMySql().AddDbContext<PumaContext>(opt =>
    opt.UseMySql(cs, ServerVersion.AutoDetect(cs)));
```
Vous devrez probablement installer un package spécifique pour que ça fonctionne il s'agit de Pomelo.EntityFrameworkCore.MySql

pour ce qui est de mon appSetting.developement.json avec une connection string il ressemble à ça : 

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "Puma": "server=127.0.0.1;port=3306;database=puma;uid=puma;password=puma;TreatTinyAsBoolean=false"
  }
}
```

Enfin pour ce qui est de l'utilisation de l'ORM entityframework pour créer les tables de notre base de données en utilisant nos models j'ai moi-même réalisé un tutoriel récemment pour expliquer entre autre chose cela à mes camarades dans le cadre d'un autre projet : 
https://www.youtube.com/watch?v=dO04hDD2B90&t=560s

J'en parle entre de la 9ème minutes a la 20ème environ.

