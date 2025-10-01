Item Shop (affiliate) — quick start

This directory contains a small static/Express site for "The Item Shop" affiliate storefront. It's intended to be run containerized alongside the main Phoenix Down site but as a separate service/repo branch.

Build and run locally (node)

1. cd itemshop
2. npm install
3. npm start

Docker (build & run)

# build
docker build -t phxdwn/itemshop ./itemshop

# run
docker run -p 3333:3333 --env HUBSPOT_PRIVATE_APP_TOKEN=your_token_here phxdwn/itemshop

docker-compose snippet (to include alongside Phoenix Down)

services:
  itemshop:
    build: ./itemshop
    ports:
      - "3333:3333"
    environment:
      - HUBSPOT_PRIVATE_APP_TOKEN=${HUBSPOT_PRIVATE_APP_TOKEN}
    restart: unless-stopped

HubSpot integration
- For simple lead capture, use the embed form snippet in `index.html` and replace PORTAL_ID and FORM_ID.
- For server-side contact creation, set `HUBSPOT_PRIVATE_APP_TOKEN` and POST to `/api/track-click` with { email: '...' }. The server will attempt to create a contact.

Notes
- This is intentionally minimal. Adapt the styling or component placement to match Phoenix Down's production front-end and CSS framework (Tailwind, etc.).
- The button on the Phoenix Down home page should link to https://itemshop.life and can optionally call a tracking endpoint on the Phoenix Down server prior to opening the link.
