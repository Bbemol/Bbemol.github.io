#!/usr/bin/env sh
# Démarre WordPress, l'installe au premier lancement et active le thème.
set -e
cd "$(dirname "$0")"

docker compose up -d

# Attend que WordPress ait copié ses fichiers dans le volume.
until docker compose run --rm cli wp core version >/dev/null 2>&1; do sleep 2; done

if ! docker compose run --rm cli wp core is-installed >/dev/null 2>&1; then
  docker compose run --rm cli wp core install \
    --url=http://localhost:8080 \
    --title="Champagne Lejeune" \
    --admin_user=admin \
    --admin_password=admin \
    --admin_email=admin@example.com \
    --skip-email
  docker compose run --rm cli wp option update blogdescription "Champagne Lejeune Père & Fils, propriétaires-récoltants à Villers-Marmery depuis 1684."
  docker compose run --rm cli wp language core install fr_FR --activate
fi

docker compose run --rm cli wp theme activate champagne-lejeune

echo "Site : http://localhost:8080  ·  Admin : http://localhost:8080/wp-admin (admin / admin)"
