# Mancskaland – forráskód és illusztrációk

A csomag a 2026. november 2-án közzétett, élénk pink–türkiz–lime arculatú változat forrása.

## A csomag tartalma

- app/: React + TypeScript felület, három kaland története és játéklogika, mentési API.
- public/images/: az új és korábbi illusztrációk webre optimalizált, 640 és 1440 pixel széles WebP-változatai.
- eredeti_kepek/: a négy új, neon színvilágú illusztráció eredeti PNG-fájljai.
- db/ és drizzle/: Cloudflare D1 adatbázisséma és migráció.
- scripts/, worker/ és konfigurációk: a Vinext/Cloudflare projekt indításához és buildjéhez szükséges fájlok.
- pnpm-lock.yaml: rögzített függőségek.
- README.md: a technikai alap angol nyelvű dokumentációja.

Nem része a ZIP-nek a node_modules, a Git-előzmény, a felhasználói adatbázis, a játékmenet-mentések, a helyi futtatókörnyezet vagy bármilyen belépési token.

## Fontos a telepítéshez

Ez szerveroldali funkciókat is tartalmazó React/Vinext alkalmazás, nem egyszerű HTML-oldal és nem WordPress-bővítmény. A ZIP-et nem elég kicsomagolni egy hagyományos PHP/cPanel tárhely public_html könyvtárába.

A jelenlegi éles bejelentkezés a ChatGPT Sites szolgáltatáshoz, az adatmentés Cloudflare D1-hez kapcsolódik. Másik tárhelyen saját autentikáció és adatbázis-konfiguráció szükséges. A .openai/hosting.json az eredeti Sites-projekt azonosítóját tartalmazza; ez nem titkos kulcs. Új Sites-projekt létrehozásakor ne használd fel automatikusan ezt az azonosítót.

## Helyi fejlesztői indítás

Előfeltétel: Node.js legalább 22.13.0, és a package.json-ban rögzített pnpm-verzió. A telepítéshez internetkapcsolat szükséges.

A kicsomagolt mancskaland mappában:

```sh
pnpm install --frozen-lockfile
pnpm build
```

Az első helyi indítás előtt alkalmazd az adatbázis-migrációt:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_busy_brood.sql
```

Ezt a migrációt ugyanarra a helyi adatbázisra csak egyszer futtasd le. Ezután:

```sh
pnpm dev
```

A terminálban kiírt címen nyitható meg, alapértelmezés szerint http://localhost:5173.
A portable fejlesztői mód helyi tesztbelépést is biztosít a /signin-with-chatgpt?return_to=/ címen. Ez kizárólag fejlesztői szimuláció, nem éles felhasználói autentikáció.

A csomag a működő projekt forrásmásolata. Másik számítógépen a telepítés nem lett külön ellenőrizve.

## Szerkesztési támpontok

- app/data.ts: kalandok, feladatok, megoldások.
- app/ui.tsx: képernyők, játékfolyamat, képek hozzárendelése.
- app/globals.css: színek, elrendezés, reszponzív stílusok.
- app/api/state/route.ts: fiókhoz kötött mentés és törlés.

A kalandok szándékosan kihagyható és kímélő feladatokat tartalmaznak.

## Az első verzió határai

A teljes termékkoncepcióból a saját e-mailes regisztráció, közösségi moderáció, külön adminszerepkörök, vizuális történetgráf-szerkesztő és telepíthető PWA még nem része ennek a kiadásnak. A Kalandműhely a saját csapattér JSON-alapú kalandszerkesztője.

Forrásverzió: 7a26ebbe7713b6cac3f35e5da0e69f4973e39627
