# Projet Site Web Mariage — Yann & Judith
## Documentation technique — État au 26 juin 2026

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
| Emails | À intégrer (Resend ou Brevo) | Confirmations RSVP et notifications mariés |
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
│   │   └── invites/
│   │       ├── route.ts              # GET liste / POST ajout invité
│   │       └── export/route.ts       # GET — export CSV
│   ├── dashboard/
│   │   ├── layout.tsx                # Navigation commune dashboard
│   │   ├── page.tsx                  # Page synthèse (compteurs)
│   │   ├── invites/page.tsx          # Liste invités + ajout + export
│   │   └── allergies/page.tsx        # Liste allergies pour traiteur
│   ├── login/page.tsx                # Page de connexion mariés
│   └── layout.tsx                    # Layout racine Next.js
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

### Déploiement
- [x] Configuration VPS OVH (VPS Starter Debian, PM2 + nginx)
- [x] PostgreSQL 16 installé nativement sur le VPS
- [x] Application déployée et accessible en HTTP
- [x] Pages dashboard (synthèse + allergies) forcées en rendu dynamique (`force-dynamic`)
- [x] Photos exclues du repo git (gérées manuellement via `scp` sur le VPS)
- [ ] Uploader la photo des mariés sur le VPS : `scp public/optimizedyannjudith.png debian@IP_VPS:~/mariage-app/public/`
- [ ] Supprimer les `console.log` de debug dans `app/api/auth/login/route.ts` (ajoutés temporairement pour diagnostiquer le hash bcrypt)
- [ ] Mise en place HTTPS (voir checklist section 11)
- [ ] Contenu à compléter par les mariés (témoins, hébergements, FAQ, texte de présentation)

---

## 9. Variables d'environnement

```env
DATABASE_URL="postgresql://mariage:mariage_dev@localhost:5432/mariage"
ADMIN_EMAIL="..."
ADMIN_PASSWORD_HASH=\$2b\$10\$...   # bcrypt — échapper TOUS les $ avec \$ (pas de guillemets)
JWT_SECRET="..."                     # 32 bytes hex : node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
RESEND_API_KEY="re_..."
RESEND_FROM="Yann & Judith <onboarding@resend.dev>"   # → changer avec le vrai domaine en prod HTTPS
NEXT_PUBLIC_BASE_URL="http://IP_VPS:3000"             # → changer en https://domaine.fr lors du passage HTTPS
HTTPS="false"                                          # → passer à "true" lors du passage HTTPS
```

**Génération du hash bcrypt :**
```bash
node -e "require('bcryptjs').hash('MonMotDePasse', 10).then(h => console.log(h))"
# Copier le résultat dans .env en échappant chaque $ avec \$
# Exemple : $2b$10$xxx → \$2b\$10\$xxx
```

---

## 10. État HTTP actuel (temporaire)

Le site tourne en HTTP sur le VPS en attendant l'achat du domaine et la mise en place de HTTPS.
Deux adaptations ont été faites spécifiquement pour fonctionner sans HTTPS :

| Fichier | Modification | Comportement HTTPS |
|---|---|---|
| `app/api/auth/login/route.ts` | `secure: process.env.HTTPS === 'true'` | Le cookie session sera `secure` quand `HTTPS=true` dans `.env` |
| `app/dashboard/invites/page.tsx` | Fallback `execCommand` si `clipboard.writeText` indisponible | `clipboard.writeText` sera utilisé automatiquement en HTTPS |

Ces modifications sont **permanentes et compatibles HTTPS** — rien à revertir, il suffira d'activer `HTTPS=true`.

---

## 11. Checklist passage en HTTPS

À faire quand le domaine est acheté et les DNS configurés :

### DNS & Certificat
- [ ] Acheter le nom de domaine
- [ ] Pointer le domaine vers l'IP du VPS (enregistrement A)
- [ ] Installer certbot : `sudo apt install certbot python3-certbot-nginx`
- [ ] Générer le certificat : `sudo certbot --nginx -d domaine.fr`
- [ ] Vérifier le renouvellement automatique : `sudo certbot renew --dry-run`

### Variables d'environnement (sur le VPS, dans `.env`)
- [ ] `NEXT_PUBLIC_BASE_URL` → `https://domaine.fr`
- [ ] `HTTPS` → `true`
- [ ] `RESEND_FROM` → `Yann & Judith <contact@domaine.fr>` (après vérification domaine dans Resend)

### Resend
- [ ] Ajouter et vérifier le domaine dans le dashboard Resend
- [ ] Mettre à jour `RESEND_FROM` dans `.env`

### Code
- [ ] Supprimer les `console.log` de debug dans `app/api/auth/login/route.ts`

### Déploiement
- [ ] `npm run build` sur le VPS
- [ ] `pm2 restart mariage-app`
- [ ] Tester la connexion dashboard (cookie secure)
- [ ] Tester un RSVP (email de confirmation avec lien https)
- [ ] Tester la copie de lien (clipboard API)
- [ ] Vérifier que HTTP redirige vers HTTPS (nginx)

---

## 12. Commandes utiles

```bash
# Dev local (WSL2)
docker compose up -d       # Démarrer PostgreSQL
npm run dev                # Lancer Next.js sur localhost:3000
npx prisma studio          # Interface visuelle de la base (localhost:5555)
npx prisma migrate dev     # Appliquer une nouvelle migration
npx prisma generate        # Régénérer le client après modif schéma

# VPS (production)
npm run build              # Build (inclut prisma generate)
pm2 restart mariage-app    # Redémarrer l'application
pm2 logs mariage-app       # Voir les logs en temps réel
git pull && npm run build && pm2 restart mariage-app   # Déployer une mise à jour
git checkout -- . && git pull                          # Annuler les changements locaux et puller

# Upload de la photo des mariés sur le VPS
scp public/optimizedyannjudith.png debian@IP_VPS:~/mariage-app/public/
```