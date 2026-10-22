# Champagne Lejeune — WordPress

WordPress local (Docker) avec le thème `champagne-lejeune`, tiré du site statique à la racine du dépôt.

## Lancer

```sh
./setup.sh
```

- Site : http://localhost:8080
- Admin : http://localhost:8080/wp-admin — `admin` / `admin` (développement uniquement)

Arrêter : `docker compose down` (ajouter `-v` pour tout effacer, base comprise).
Commandes WP-CLI : `docker compose run --rm cli wp <commande>`.

## Thème

`wp-content/themes/champagne-lejeune/` est monté directement dans le conteneur : toute
modification est visible en rechargeant la page.

- `header.php` / `footer.php` — `<head>`, ouverture et fermeture de la page
- `index.php` — assemble les parties de `template-parts/`
- `template-parts/` — une partie par rubrique (cuvées, histoire, actualités, contact),
  l'en-tête, la navigation et la fiche cuvée
- `functions.php` — chargement des polices, de `css/styles.css` et `js/app.js`
- `css/`, `js/`, `assets/` — copies de ceux du site statique

Le contenu est encore écrit en dur dans les gabarits : rien n'est éditable depuis l'admin.
