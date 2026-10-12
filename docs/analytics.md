# Google Analytics 4 — Haramain Prestige

Le site utilise le flux `G-00WDFD2SY7` pour `https://haramainprestige.com`.
Aucune configuration distante GA4 ni aucun déploiement n’a été réalisé par cette modification.

## Audit et fonctionnement

L’audit initial n’a trouvé ni GA, ni GTM, ni gestionnaire de consentement.
`index.html` contient uniquement le script d’application et les données structurées SEO.
Les polices restent auto-hébergées. Nginx n’impose actuellement pas de CSP ; ses
autres en-têtes de sécurité sont conservés. Le reverse proxy externe doit être
contrôlé séparément si une CSP y est configurée.

`src/services/analytics.ts` initialise le Consent Mode v2 **basique**, sans requête
Google : les quatre consentements sont `denied`. Seule l’acceptation explicite
autorise le chargement dynamique de `gtag.js` et `analytics_storage: granted`.
`ad_storage`, `ad_user_data` et `ad_personalization` restent refusés ; Google
signals et la personnalisation publicitaire sont désactivés dans le code.
Une seule balise est chargée par document ; après échec ou annulation pendant le
chargement, une nouvelle acceptation peut réessayer. Les erreurs et le délai de
chargement de 15 secondes n’affectent pas la navigation ni le formulaire.

La bannière globale et le bouton **Gérer les cookies** du footer existent en FR
et AR, avec RTL et commandes clavier natives. Le panneau de gestion reçoit le
focus ; Échap le ferme sans modifier un choix enregistré et rend le focus au
bouton d’ouverture. Accepter et Refuser ont la même présentation.

La décision est enregistrée sous `haramain:analytics-consent:v1` dans
`localStorage`. Un refus de session dans `sessionStorage` prévaut si le stockage
persistant devient non modifiable. Si l’écriture échoue, la bannière le signale.
Le retrait active d’abord `ga-disable-G-00WDFD2SY7`, met à jour Consent Mode,
annule les événements en attente et supprime les cookies `_ga` / `_ga_*`
accessibles, en testant les domaines parents et chemins courants. Une décision
retirée reste refusée après rechargement ; les changements de stockage sont aussi
pris en compte dans les autres onglets.

Le JavaScript Google déjà exécuté ne peut pas être déchargé ; le mécanisme
officiel de désactivation empêche ses futurs envois. Une requête déjà partie
avant le retrait ne peut pas être rappelée. Les cookies inaccessibles au
JavaScript (autre domaine, autre chemin, HttpOnly) ne peuvent pas être effacés.
Si tous les stockages sont bloqués, aucun site ne peut garantir la persistance
d’un nouveau choix entre visites ; Analytics reste refusé lorsque le choix
enregistré ne peut pas être lu.

## Pages vues et événements

`usePageMetadata` appelle `trackCurrentPage()` après mise à jour du titre.
`App` et le fournisseur i18n suivent déjà `haramain:navigate` et `popstate` :
le routeur reste intact. `send_page_view: false` désactive la vue initiale
automatique. La première page disponible après acceptation puis chaque changement
de route publique génèrent une vue manuelle ; StrictMode, les ancres et les
variantes de paramètres de requête ne produisent pas de doublon.

Les paramètres sont `page_location`, `page_title`, `page_referrer`, `language` et
`send_to`. Les URL locales sont limitées aux routes publiques connues, sans
paramètres ni fragments ; les routes inconnues deviennent `/404` ou `/ar-sa/404`
uniquement dans les mesures. Le premier référent externe est réduit à son
origine ; ensuite le référent est la précédente page SPA. Ces filtres réduisent
la précision des campagnes/référents au profit de la confidentialité. Les
canonical, hreflang, sitemap et statuts HTTP ne sont pas modifiés.

| Événement        | Déclenchement                                  | Événement clé conseillé |
| ---------------- | ---------------------------------------------- | ----------------------- |
| `click_whatsapp` | Clic sur un lien wa.me ou WhatsApp officiel    | Facultatif              |
| `click_phone`    | Clic sur un lien `tel:`                        | Facultatif              |
| `click_email`    | Clic sur un lien `mailto:`                     | Facultatif              |
| `generate_lead`  | Réponse du devis avec `res.ok && data.success` | Oui                     |

Une délégation de clic couvre les liens présents et futurs, y compris les icônes.
L’API `trackCommercialEvent()` n’accepte aucun paramètre libre : ni cible de lien,
ni texte, nom, e-mail, téléphone, message ou valeur de formulaire n’est envoyé.
Les événements commerciaux acceptés pendant le chargement sont gardés en mémoire
puis envoyés à son terme ; un refus ou échec les efface. Les interactions avant
acceptation ne sont jamais rejouées.

## Réglages manuels GA4 avant mise en production

1. Dans **Administration → Flux de données → flux Web → Mesures améliorées**,
   désactiver les pages vues automatiques, y compris le suivi des changements
   d’historique. `send_page_view: false` ne suffit pas à désactiver ce dernier.
   Pour limiter la collecte aux interactions prévues, désactiver aussi les autres
   mesures améliorées, en particulier formulaires, recherche et clics sortants.
   Vérifier les éventuelles balises connectées et créations d’événements distantes.
2. Définir `generate_lead` comme **événement clé** ; les trois clics de contact
   peuvent l’être selon les objectifs commerciaux. Ils ne confirment pas à eux
   seuls une demande reçue. Le code ne modifie pas ces réglages.
3. Vérifier la conservation GA4, les durées des cookies, les accès au compte,
   les filtres du trafic interne, Google signals/publicité, les conditions Google
   et les éventuels transferts. Compléter les mentions après vérification ;
   aucune durée ni configuration du compte n’a été supposée.

## Vérification

Les tests Vitest utilisent jsdom, uniquement en dépendance de développement.
Ils testent le service, le rendu React réel en StrictMode, la navigation et le
formulaire avec API simulée. Ils ne contactent pas la propriété Google.

```bash
npm run build
npm run lint
npm run test
npm run format:check
```

Dans un profil navigateur neuf, ouvrir Réseau et filtrer `googletagmanager`,
`google-analytics` et `collect` : aucune requête avant acceptation, après refus
ou après rechargement d’un refus. Accepter doit charger une seule balise et
produire une seule `page_view` par route. Tester FR/AR, arrière/avant, ancres,
clics de contact et devis confirmé ; inspecter les paramètres transmis. Retirer
le consentement, puis vérifier les cookies, la navigation et le rechargement.

Après acceptation et chargement de la balise, utiliser **Temps réel** dans GA4.
Pour **DebugView**, activer temporairement depuis la console :

```js
window.gtag('set', 'debug_mode', true);
```

Naviguer puis déclencher les événements et vérifier leurs paramètres dans
DebugView. Terminer avec `window.gtag('set', 'debug_mode', false)` et recharger.
Le code n’active pas DebugView en permanence. Les bloqueurs, filtres GA4 et
restrictions réseau peuvent empêcher l’observation ; ne pas les contourner
pour les visiteurs.

## Déploiement Docker/Nginx (à réaliser séparément)

Après validation, sur le serveur habituel :

```bash
docker compose -f compose.prod.yaml build frontend
docker compose -f compose.prod.yaml up -d --no-deps frontend
```

Le Measurement ID est public et embarqué dans le bundle Vite : aucune variable
Docker ni modification PHP n’est nécessaire. Conserver le routage, les
redirections et le cache Nginx existants. Vérifier `/`, `/ar-sa/`, les routes SEO,
une route inconnue (404) et les en-têtes du reverse proxy après déploiement.
Si une CSP externe existe, autoriser les scripts Analytics et les connexions
nécessaires selon la documentation Google, sans ouvrir globalement les scripts.

Sources : [Consent Mode basique](https://developers.google.com/tag-platform/security/concepts/consent-mode),
[pages vues manuelles](https://developers.google.com/analytics/devguides/collection/ga4/views),
[désactivation et confidentialité](https://developers.google.com/tag-platform/security/guides/privacy),
[directives CSP](https://developers.google.com/tag-platform/security/guides/csp).

## Validation livrée

- `npm run build` : réussi ; avertissement Vite non bloquant sur le bundle principal de plus de 500 kB.
- `npm run lint` : réussi.
- `npm run test` : 118 tests réussis, dont 30 ajoutés pour cette intégration.
- `npm run format:check` et `git diff --check` : réussis.
- Contrôle Chrome local en FR desktop (1440 × 1000) et AR mobile (390 × 844) :
  bannière dans la fenêtre, refus/rechargement, acceptation unique, navigation,
  ancre, retour arrière, clic e-mail et retrait validés, sans erreur JavaScript.
  Le transport Google était simulé ; aucune donnée de test envoyée à GA4.
- `npm audit` signale trois vulnérabilités élevées sur des dépendances de
  développement déjà présentes dans le verrou initial (`brace-expansion`,
  `js-yaml`, `source-map-js`). Leur mise à jour est distincte de l’intégration.

Les vérifications Temps réel / DebugView, les paramètres du compte et le
déploiement restent à effectuer par le responsable du site.

## Fichiers livrés

Intégration, textes, tests et documentation :

```text
README.md
docs/analytics.md
package.json
package-lock.json
src/main.tsx
src/services/analytics.ts
src/services/analytics.test.ts
src/services/analytics.integration.test.tsx
src/components/ui/CookieConsent.tsx
src/components/layout/Footer.tsx
src/hooks/usePageMetadata.ts
src/pages/Home/sections/QuoteForm.tsx
src/i18n/types.ts
src/i18n/fr.ts
src/i18n/ar-SA.ts
src/styles/global.css
```

Corrections Prettier uniquement pour faire passer le contrôle global existant :

```text
index.html
src/app/App.tsx
src/components/layout/Header.tsx
src/components/seo/FaqAccordion.tsx
src/components/seo/SeoLandingPage.tsx
src/components/seo/SeoSection.tsx
src/i18n/routes.test.ts
src/i18n/routes.ts
src/i18n/utils.ts
src/pages/ChambreVueKaaba/ChambreVueKaabaPage.tsx
src/pages/ChauffeurPriveMakkahMadinah/ChauffeurPriveMakkahMadinahPage.tsx
src/pages/Contact/ContactPage.tsx
src/pages/Home/sections/Hotels.tsx
src/pages/Home/sections/Services.tsx
src/pages/HotelsMadinah/HotelsMadinahPage.tsx
src/pages/HotelsMakkah/HotelsMakkahPage.tsx
src/pages/Services/ServicesPage.tsx
src/pages/Testimonials/TestimonialsPage.tsx
src/pages/TransfertAeroportMadinah/TransfertAeroportMadinahPage.tsx
src/pages/TransfertJeddahMakkah/TransfertJeddahMakkahPage.tsx
src/pages/VisitesMadinah/VisitesMadinahPage.tsx
src/pages/VisitesMakkah/VisitesMakkahPage.tsx
```

Les fichiers PHP, Docker/Nginx, sitemap et robots.txt sont inchangés.
