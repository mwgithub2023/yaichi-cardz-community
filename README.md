# YAICHI x CARDZ.Game Community Landing Page

One-page QR landing site for the YAICHI x CARDZ.Game PTCG community.

## Quick Deploy

```bash
git clone https://github.com/jacksoncoin0202-ops/yaichi-cardz-community.git
cd yaichi-cardz-community
npm ci
npm run build
npm run start
```

The local production preview will run at:

```text
http://localhost:4173/
```

For a real server, either serve the generated `dist/` folder with Nginx/Apache, or use Docker:

```bash
docker build -t yaichi-cardz-community .
docker run -d --name yaichi-cardz-community -p 8080:80 yaichi-cardz-community
```

## Change Group Links

Edit:

```text
src/site.config.ts
```

Update:

```js
whatsappUrl: "https://chat.whatsapp.com/...",
telegramUrl: "https://t.me/...",
```

When moving to the next WhatsApp group, also update:

```js
group: {
  currentNumber: 5,
  filledGroups: 4,
  approxMembersPerGroup: 2000,
}
```

The QR code should point to the site homepage, not directly to WhatsApp or Telegram. That way, the QR code does not need to change when a group link changes.

## Printed QR Domain Recommendation

For traditional media ads, use a custom domain or subdomain you control, such as:

```text
join.cardz.game
tcg.cardz.game
yaichi.cardz.game
```

Point that domain to this Cloudflare Pages project. The current `pages.dev` URL is usable, but a controlled custom domain is safer for printed QR campaigns because DNS can be repointed later without changing the QR code.

Do not print a deployment preview URL such as `https://<hash>.yaichi-cardz-community.pages.dev/`.

The site includes Cloudflare Pages headers so the homepage is not stored long-term by browsers. This makes future WhatsApp group-link updates safer for printed QR traffic.

## CARDZ.Game Positioning

The landing page now highlights CARDZ.Game as a transparent TCG pack-opening product:

- On-chain decentralized records make key results traceable.
- Blockchain record keeping reduces black-box operation and later result alteration concerns.
- The copy focuses on immutability, fairness, transparency, and player trust.

## Card Visuals

The card images are loaded from `images.pokemontcg.io`, following the public card data used by `https://poke-holo.simey.me/`. The CSS holo treatment is implemented locally for this landing page.

## Commands

```bash
npm ci
npm run dev
npm run build
npm run deploy:cf
```

For second-server deployment, see `DEPLOY.md`.
