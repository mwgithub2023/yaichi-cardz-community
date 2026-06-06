# Deploy To Another Server

This is a static React/Vite landing page. The production files are generated into `dist/`.

## Download From GitHub

```bash
git clone https://github.com/jacksoncoin0202-ops/yaichi-cardz-community.git
cd yaichi-cardz-community
npm ci
npm run build
npm run start
```

This serves the built site on:

```text
http://localhost:4173/
```

For production, either serve the `dist/` folder with a web server, or use Docker.

## Docker Example

```bash
git clone https://github.com/jacksoncoin0202-ops/yaichi-cardz-community.git
cd yaichi-cardz-community
docker build -t yaichi-cardz-community .
docker run -d --name yaichi-cardz-community -p 8080:80 yaichi-cardz-community
```

Then open:

```text
http://SERVER_IP:8080/
```

## Static Server Example

```bash
npm ci
npm run build
rsync -av --delete dist/ /var/www/yaichi-cardz-community/
```

For Nginx or Apache, point the site root to:

```text
/var/www/yaichi-cardz-community
```

## Cloudflare Pages Example

```bash
npm ci
npm run build
npx wrangler pages deploy dist --project-name yaichi-cardz-community
```

If the second server uses a different Cloudflare Pages project name, replace `yaichi-cardz-community` with that project name.

## Change Group Links

Edit:

```text
src/site.config.ts
```

Update the WhatsApp or Telegram links, then rebuild and redeploy.
