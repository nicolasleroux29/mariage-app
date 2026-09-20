# Projet Site Web Mariage — Yann & Judith
## Documentation technique — État au 5 juillet 2026

---

## 1. Objectif du projet

Site web privé pour le mariage de Yann & Judith (19 juin 2027) accessible uniquement sur lien nominatif. Trois grandes fonctions :

- **Informer** les invités (programme, lieux, infos pratiques)
- **Collecter** les RSVP via un formulaire pré-rempli lié à chaque invité
- **Piloter** les réponses via un dashboard sécurisé pour les mariés

Cahier des charges complet : `cahier-des-charges-mariage.md`

---

## 2. Stack technique

| Couche | Technologie | Rôle |
|---|---|---|
| Frontend + Backend | Next.js 15 + TypeScript | Framework fullstack — pages React et API routes dans un seul projet |
| Style | Tailwind CSS | CSS utilitaire, responsive mobile-first |
| ORM | Prisma 7 | Pont TypeScript ↔ PostgreSQL, gestion des migrations |
| Base de données | PostgreSQL 16 | Base relationnelle, tournant dans Docker en local |
| Adaptateur DB | `@prisma/adapter-pg` | Requis par Prisma 7 pour la connexion PostgreSQL |
| Auth | JWT (`jose`) + bcryptjs | Cookie de session httpOnly, pas de librairie externe |
| Emails | Resend | Confirmations RSVP (si email renseigné) + notification mariés à chaque RSVP |
| Hébergement cible | OVH | VPS ou hébergement Node.js |

---

## 3. Environnement de développement

| Outil | Version | Notes |
|---|---|---|
| OS dev | WSL2 Debian 13 (Trixie) | Environnement Linux sur Windows |
| Node.js | v20 LTS | Installé via `nvm` |
| Docker | 27.x | Moteur installé dans WSL2 (pas Docker Desktop) |
| PostgreSQL | 16 | Conteneur Docker, `docker compose up -d` depuis `~/mariage-app` |
| VS Code | Dernière version | Extension WSL connectée à Debian |

**Démarrer l'environnement de dev :**
```bash
# Dans WSL2
cd ~/mariage-app
sudo service docker start
docker compose up -d      # Lance PostgreSQL
npm run dev               # Lance Next.js sur localhost:3000
```

---

## 4. Structure du projet

```
mariage-app/
├── app/
│   ├── api/
│   │   ├── auth/login/route.ts       # POST — authentification mariés
│   │   ├── rsvp/route.ts             # POST — enregistrement RSVP
│   │   └── invites/
│   │       ├── route.ts              # GET liste / POST ajout invité
│   │       ├── [id]/route.ts         # PATCH modification / DELETE suppression
│   │       └── export/route.ts       # GET — export CSV
│   ├── dashboard/
│   │   ├── layout.tsx                # Navigation commune dashboard
│   │   ├── page.tsx                  # Page synthèse (compteurs)
│   │   ├── invites/page.tsx          # Liste invités + ajout + export (vue carte mobile)
│   │   └── allergies/page.tsx        # Liste allergies pour traiteur
│   ├── rsvp/[token]/
│   │   ├── page.tsx                  # Page RSVP (server component)
│   │   └── RsvpForm.tsx              # Formulaire RSVP (client component)
│   ├── presentation/page.tsx         # Page présentation mariés + témoins
│   ├── mariage/page.tsx              # Programme, lieux, contact
│   ├── faq/page.tsx                  # Hébergements, transport, dress code
│   ├── infos/page.tsx                # Redirect → /faq
│   ├── login/page.tsx                # Page de connexion mariés
│   └── layout.tsx                    # Layout racine Next.js (Playfair Display + Geist)
├── components/
│   ├── PublicHeader.tsx              # Navigation publique (sticky, menu mobile)
│   ├── Countdown.tsx                 # Compte à rebours temps réel
│   └── FadeIn.tsx                    # Animation fade-in au scroll (IntersectionObserver)
├── lib/
│   └── prisma.ts                     # Client Prisma partagé (singleton)
├── prisma/
│   ├── schema.prisma                 # Schéma de données
│   └── migrations/                   # Historique des migrations SQL
├── middleware.ts                     # Protection routes /dashboard/*
├── prisma.config.ts                  # Config Prisma 7 (connexion DB)
├── docker-compose.yml                # PostgreSQL local
└── .env                              # Variables d'environnement (ne pas commiter)
```

---

## 5. Schéma de données

```prisma
model Invite {
  id        Int       @id @default(autoincrement())
  nom       String
  prenom    String
  email     String?
  token     String    @unique @default(uuid())  // lien nominatif
  createdAt DateTime  @default(now())
  rsvp      Rsvp?
}

model Rsvp {
  id          Int      @id @default(autoincrement())
  inviteId    Int      @unique
  invite      Invite   @relation(fields: [inviteId], references: [id])
  eglise      Boolean?
  vinHonneur  Boolean?
  repas       Boolean?
  retourNoce  Boolean?
  enfants     Boolean?
  nbEnfants   Int?
  allergies   String?
  submittedAt DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Le token UUID dans `Invite` est le lien nominatif — généré automatiquement à la création, exposé via `/rsvp/{token}`.

---

## 6. Authentification

- **Route :** `POST /api/auth/login`
- **Credentials :** stockés dans `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`)
- **Session :** cookie `session` httpOnly, JWT signé HS256, expiration 24h
- **Protection :** middleware Next.js sur toutes les routes `/dashboard/*`
- **Génération du hash :** `node -e "require('bcryptjs').hash('MonMotDePasse', 10).then(h => console.log(h))"`
- **Attention :** échapper TOUS les `$` du hash dans `.env` avec `\$`, sans guillemets autour de la valeur
- **Cookie secure :** contrôlé par `HTTPS=true` dans `.env` (pas par NODE_ENV)

---

## 7. Ce qui est fait ✅

- [x] Environnement de dev complet (WSL2, Node, Docker, PostgreSQL, VS Code)
- [x] Projet Next.js initialisé (TypeScript, Tailwind, App Router)
- [x] Prisma configuré et connecté à PostgreSQL
- [x] Schéma de données migré (`Invite` + `Rsvp`)
- [x] Authentification JWT + cookie httpOnly
- [x] Middleware de protection des routes dashboard
- [x] Page login
- [x] Dashboard — page synthèse (compteurs par événement)
- [x] Dashboard — page liste invités (ajout, génération lien, tableau statuts)
- [x] Dashboard — export CSV
- [x] Dashboard — page allergies

---

## 8. Ce qui reste à faire ❌

### Côté invité (public)
- [x] Page `/rsvp/[token]` — formulaire RSVP pré-rempli
- [x] Route `POST /api/rsvp` — enregistrement des réponses
- [x] Modification de réponse possible via le même lien
- [x] Page d'accueil publique (Yann & Judith, photo, compte à rebours)
- [x] Page "Le mariage" (lieux, horaires, maps)
- [x] Page "Présentation" (témoins, texte)
- [x] Page "Informations pratiques" (hébergements, transport, dress code)
- [x] Page "FAQ" (anciennement "Informations pratiques", route `/faq`)
- [x] Contact mariés intégré dans la page "Le Mariage" (pas de page dédiée)

### Emails
- [x] Intégration Resend
- [x] Email de confirmation automatique à l'invité après RSVP (si email renseigné)
- [x] Notification email aux mariés à chaque nouveau RSVP / modification

### Dashboard
- [x] Liens distribués via QR code imprimé — pas d'envoi par email depuis le dashboard
- [x] Suppression / modification d'un invité
- [x] Vue carte responsive sur mobile pour la liste des invités (dashboard)

### Design (refonte premium en cours)
- [x] Typographie : Playfair Display (serif) sur tous les titres h1/h2 des pages publiques
- [x] Espacements : hero py-24/py-32, sections gap-24, paragraphes leading-loose, cards p-8
- [x] Palette de couleurs : fond #FDF5EA, titres #E6C771, textes/accents #D98287 (cards internes en blanc pour se détacher du fond)
- [x] Animations : composant FadeIn (IntersectionObserver) sur sections, stagger CSS sur hero accueil
- [x] Boutons et bordures : rounded-xl sur cards, rounded-md sur boutons Oui/Non, inputs border-stone-200, RsvpForm aligné sur nouvelle palette

### Déploiement
- [x] Configuration VPS OVH (VPS Starter Debian, PM2 + nginx)
- [x] PostgreSQL 16 installé nativement sur le VPS
- [x] Application déployée et accessible en HTTP
- [x] Pages dashboard (synthèse + allergies) forcées en rendu dynamique (`force-dynamic`)
- [x] Photos exclues du repo git (gérées manuellement via `scp` sur le VPS)
- [x] Uploader la photo des mariés sur le VPS
- [x] Supprimer les `console.log` de debug dans `app/api/auth/login/route.ts`
- [x] Mise en place HTTPS (voir section 10) — fait le 20/09/2026
- [ ] Contenu à compléter par les mariés (témoins, hébergements, FAQ, texte de présentation)

---

## 9. Variables d'environnement

```env
DATABASE_URL="postgresql://mariage:mariage_dev@localhost:5432/mariage"
ADMIN_EMAIL="..."
ADMIN_PASSWORD_HASH=\$2b\$10\$...   # bcrypt — échapper TOUS les $ avec \$ (pas de guillemets)
JWT_SECRET="..."                     # 32 bytes hex : node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
RESEND_API_KEY="re_..."
RESEND_FROM="Yann & Judith <onboarding@resend.dev>"   # à changer une fois le domaine vérifié dans Resend
NEXT_PUBLIC_BASE_URL="https://mariage-judith-yann.fr" # valeur en prod depuis le 20/09/2026 (dev local : http://localhost:3000)
HTTPS="true"                                           # valeur en prod depuis le 20/09/2026
```

**Génération du hash bcrypt :**
```bash
node -e "require('bcryptjs').hash('MonMotDePasse', 10).then(h => console.log(h))"
# Copier le résultat dans .env en échappant chaque $ avec \$
# Exemple : $2b$10$xxx → \$2b\$10\$xxx
```

---

## 10. HTTPS — passé en production le 20/09/2026

Le site tourne désormais en HTTPS sur `https://mariage-judith-yann.fr` (certificat Let's Encrypt, renouvellement automatique via le timer systemd `certbot.timer`, expiration 19/12/2026). Nginx écoute sur 80 (redirection 301 vers 443) et 443, et proxifie vers `localhost:3000` où tourne l'app Next.js (process pm2 nommé `mariage`, pas `mariage-app`).

Deux adaptations avaient été faites pour fonctionner sans HTTPS pendant la phase HTTP, désormais actives :

| Fichier | Modification | Comportement |
|---|---|---|
| `app/api/auth/login/route.ts` | `secure: process.env.HTTPS === 'true'` | Cookie session `secure` (actif, `HTTPS=true` en prod) |
| `app/dashboard/invites/page.tsx` | Fallback `execCommand` si `clipboard.writeText` indisponible | `clipboard.writeText` utilisé nativement en HTTPS |

La config nginx (`/etc/nginx/sites-available/mariage` sur le VPS, pas versionnée dans ce repo) transmet aussi `X-Real-IP` et `X-Forwarded-For` — nécessaire pour que le rate-limiting et le journal d'activité (`/dashboard/logs`) identifient correctement l'IP des visiteurs.

**Reste à faire :**
- [ ] Ajouter et vérifier le domaine dans le dashboard Resend, puis mettre à jour `RESEND_FROM` (actuellement toujours `onboarding@resend.dev`)
- [ ] Supprimer (ou configurer correctement) l'enregistrement AAAA du domaine chez OVH — il pointe vers une IPv6 qui n'appartient pas au VPS (qui n'a pas d'IPv6 configurée), risque de connexions IPv6 en échec pour certains visiteurs

---

## 11. Commandes utiles

```bash
# Dev local (WSL2)
docker compose up -d       # Démarrer PostgreSQL
npm run dev                # Lancer Next.js sur localhost:3000
npx prisma studio          # Interface visuelle de la base (localhost:5555)
npx prisma migrate dev     # Appliquer une nouvelle migration
npx prisma generate        # Régénérer le client après modif schéma

# VPS (production) — pm2/node installés via nvm, à sourcer si la commande n'est pas trouvée :
# export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
npm run build              # Build (inclut prisma generate)
pm2 restart mariage --update-env   # Redémarrer l'application (le process pm2 s'appelle "mariage")
pm2 logs mariage           # Voir les logs en temps réel
git pull && npm run build && pm2 restart mariage --update-env   # Déployer une mise à jour
git checkout -- . && git pull                          # Annuler les changements locaux et puller

# HTTPS / nginx (VPS)
sudo certbot renew --dry-run                    # Vérifier le renouvellement auto du certificat
sudo nginx -t && sudo systemctl reload nginx    # Après modif de /etc/nginx/sites-available/mariage

# Upload de la photo des mariés sur le VPS
scp public/optimizedyannjudith.png debian@IP_VPS:~/mariage-app/public/
```