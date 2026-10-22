# Champagne Lejeune — site vitrine

Site statique (HTML/CSS/JS sans framework ni build) pour Champagne Lejeune Père & Fils.
Implémentation du design « Champagne Lejeune v3 - Cinema » (projet Claude Design
`a951a967-0355-43c1-9d75-42f4f409f6de`).

## Lancer

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```sh
python3 -m http.server 8000
```

## Structure

- `index.html` — tout le balisage : pages, en-tête, navigation, fiche cuvée, formulaire.
- `css/styles.css` — styles ; couleurs, polices et courbes d'animation en variables sur `:root`.
- `js/app.js` — données des cuvées (`CUVEES`), pages (`PAGES`), état et rendu.
- `assets/` — photos utilisées par le site (`vineyard-aerial.png`, `brut-reserve.png`, `rose.png`).
- Les PNG `Champagne-Lejeune-P&F---*.png` à la racine sont des détourages de bouteilles, pas encore utilisés.

## WordPress

`wordpress/` contient un WordPress local (Docker, `wordpress/setup.sh`, http://localhost:8080)
et le thème `wordpress/wp-content/themes/champagne-lejeune/`, découpé depuis `index.html`.
Le thème garde des copies de `css/`, `js/` et `assets/` : toute modification du site statique
doit y être reportée (et inversement). Sous WordPress, `window.LEJEUNE_ASSETS` donne à `app.js`
le dossier des images.

## Fonctionnement

- Quatre pages : `cuvees`, `histoire` (3 panneaux horizontaux chacune), `news`, `contact`.
- Un seul objet `state` dans `app.js` ; tout changement passe par `setState()` puis `render()`,
  qui met à jour le DOM existant (pas de re-création, pour garder les transitions CSS).
- Les clics sont gérés par délégation via `data-action` → table `actions`.
- Sous 900px (`isMobile()` / `@media (max-width: 900px)`) : défilement vertical natif, chaque
  `.view` défile, menu burger (`state.menu`), en-tête plein au défilement (`.is-solid`),
  carrousel horizontal pour les cuvées. Molette/flèches/glissés ne pilotent plus les panneaux.
- Fiche cuvée : classes `is-open` / `is-shown` / `is-swapping` sur `#modal` ; les animations
  sont entièrement en CSS (`.stg` + délai `--d`).

## Conventions

- Textes du site en français.
- Pas de dépendances externes hormis Google Fonts (Cormorant Garamond, Jost).
- Reprendre les valeurs du design (tailles, espacements, couleurs) plutôt que d'en inventer.
- Pour ajouter une cuvée : une entrée dans `CUVEES` suffit (grille, fiche, liste du formulaire).

## À faire

- Brancher le formulaire de contact (aucun envoi pour l'instant, il affiche seulement « Merci »).
- Remplacer le téléphone fictif et les emplacements « Photo à venir ».
