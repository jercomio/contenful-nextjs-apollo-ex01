# Comment utiliser le CMS headless Contentful comme backend avec Next.js et Apollo Client en frontend

Si vous débutez avec les technologies web actuelles, il n'est pas toujours évident de trouver des exemples concrets en français qui associent plusieurs technologies ensemble. Il y a souvent de petites différences sur lesquelles vous pouvez buter au début. Cet petit exemple, vous fournit une base de travail fonctionnelle à partir de laquelle vous pouvez développer avec *Next.js* et *GraphQL/Apollo*.

*cf: [Documentation Apollo Client - React](https://www.apollographql.com/docs/react/)*

Vous pouvez trouver l'exemple de base personnalisé [ici](https://github.com/jercomio/contentful-nextjs-demo) ou encore l'original [ici](https://github.com/vercel/next.js/tree/canary/examples/cms-contentful).

L'utilisation de Contentful peut-être intéressante car votre backend est auto-hébergé. Vous n'aurez pas besoin de vous soucier du déploiement de votre back sur une plateforme Cloud telle que *Google Cloud*, *AWS*, *Azure*, *DigitalOcean* ou autres.

Dans votre espace Contentful, activez l'intégration de GraphQL afin qu'il soit pris en charge.

L'exploitation de GraphQL avec la technologie Apollo permet notamment de définir votre schéma GraphQL plus aisément. Rendez-vous sur [Apollo Studio](https://studio.apollographql.com/sandbox/explorer).

Configurez Apollo Studio:

Les informations API sont accessibles dans la rubrique 'Settings/API keys' de votre espace Contentful.

1. EndPoint: https://graphql.contentful.com/content/v1/spaces/{SPACE_ID}/environments/{ENVIRONMENT_NAME}

Par défault, {ENVIRONMENT_NAME} correspond à 'master'.

2. Headers:
   Authorization: Bearer {CONTENTFUL_PREVIEW_ACCESS_TOKEN}

Une fois configuré, Apollo Studio affiche le schéma GraphQL de l'API Contentful correspondant à votre espace. Il ne vous reste plus qu'à l'exploiter comme vous souhaitez.


## Pour commencer avec Next.js

Clonez ce repository sur votre machine locale dans le dossier de votre choix, placez-vous à la racine de dernier, puis installez les dépendances en tapant dans votre terminal la ligne de commande suivante:

```bash
npm install
```


## Déclarez les variables d'environnements

1. Créez à la racine un fichier ```.env.local``` et déclarez vos variables d'environnements relatives à Contenful:

```
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_SECRET=
CONTENTFUL_ENVIRONMENT=
CONTENTFUL_REVALIDATE_SECRET=10
```

2. Démarrez le serveur:

```bash
npm run dev
# or
yarn dev
```

## A propos de la configuration d'Apollo Client

Explorez l'arborescence de ce dépôt Git pour visualiser la configruation d'Apollo Client. Cette configuration est assez simple:

```bash
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
# URI à laquelle se connecte Apollo qui constitue le endpoint de la requête
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
  cache: new InMemoryCache(),
# Les variables headers sont obligatoires pour obtenir les autorisations nécessaires
  headers: {
    authorization: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
  },
# Optionnel
  name: "Contentful Blog",
  version: "1.0"
});

export default client;
```

Le schéma GraphQL suivant récupère les informations utiles. Ce schéma est obtenu aisément grâce à Apollo Studio.

```bash
    query PostCollection($preview: Boolean) {
        postCollection(preview: $preview) {
          items {
            title
            slug
            content {
              json
              links {
                assets {
                  block {
                    sys {
                      id
                    }
                    url
                    description
                  }
                }
              }
            }
            excerpt
            coverImage {
              title
              description
              url
              width
              height
            }
          }
        }
      }
```

## Prise en charge de Markdown

Pour rendre les balises Markdown utilisées dans l'éditeur ReachText de Contentful, utilisez la dépendance suivantes:

```bash
npm i @contentful/rich-text-react-renderer
```

Ici, elle est déjà installée dans le ```package.json```.

Référez-vous aux components:
```post-body.js```
```rich-text-asset.js```
```markdown-styles.module.css```


## Démarrez le serveur

Démarrer le serveur en mode développement:

```bash
npm run dev
# or
yarn dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

Libre à vous ensuite de construire votre propre projet à partir de cet exemple.

Jolly good! :-)