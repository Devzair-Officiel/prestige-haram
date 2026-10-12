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

La décision est enregistrée sous `haramain:analytics-consent:v2` dans
`localStorage`, sous la forme `{ decision, decidedAt, expiresAt }` (horodatages en
millisecondes). Elle vaut **six mois calendaires**, pour Accepter comme Refuser.
Le calcul utilise UTC, conserve l’heure et borne le jour à la fin du mois cible :
le 31 août 2026 expire le 28 février 2027. Cette durée est un choix de gestion du
site, pas une obligation légale universelle ni la durée de conservation GA4.

Chaque nouvelle décision explicite renouvelle la période ; naviguer ou recharger
ne la prolonge pas. Les anciens choix `v1`, sans date vérifiable, sont ignorés
et retirés au mieux. Un enregistrement corrompu, futur, expiré ou dont
l’expiration ne correspond pas aux six mois est ignoré. La bannière réapparaît
et aucune ancienne acceptation ne permet de charger GA4.

Une copie datée dans `sessionStorage` sert de repli si le stockage persistant
est indisponible. Le choix valide le plus récent prévaut ; en cas d’égalité,
le refus est prioritaire. Si l’écriture persistante échoue, la bannière le signale.
Les événements `storage` synchronisent les choix entre onglets ; une ancienne
acceptation ne remplace pas un retrait plus récent. Un effacement du stockage
ou un choix invalide reçu d’un autre onglet remet la décision en attente.

L’expiration est surveillée par un minuteur réarmé (pour éviter la limite des
minuteurs du navigateur), au retour au premier plan et avant tout envoi, chargement
ou traitement d’événement en attente. À l’échéance, le module désactive GA4,
réaffiche la bannière, vide les événements en attente et nettoie les cookies
analytiques accessibles. Le renouvellement réutilise la balise déjà chargée.
Les horodatages dépendent de l’horloge du navigateur ; un recul avant la date
du choix invalide celui-ci. Un navigateur totalement suspendu exécute le contrôle
à sa reprise ; les événements applicatifs vérifient aussi l’échéance directement.

Le retrait active d’abord `ga-disable-G-00WDFD2SY7`, met à jour Consent Mode,
annule les événements en attente et supprime les cookies `_ga` / `_ga_*`
accessibles, en testant les domaines parents et chemins courants. Une décision
retirée reste refusée après rechargement jusqu’à son expiration ou à un nouveau
choix explicite.

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
`send_to`. Les URL locales restent limitées aux routes publiques connues ; les
routes inconnues deviennent `/404` ou `/ar-sa/404` uniquement dans les mesures.
Les fragments sont supprimés. Le premier référent externe est réduit à son
origine ; ensuite le référent est la précédente page SPA, sans paramètres.
Les canonical, hreflang, sitemap et statuts HTTP ne sont pas modifiés.

## Campagnes UTM et confidentialité

Seuls `utm_source`, `utm_medium`, `utm_campaign`, `utm_id`, `utm_content` et
`utm_term` peuvent figurer dans `page_location`. Chaque valeur doit :

- contenir de 1 à 64 caractères ASCII alphanumériques, avec éventuellement des
  séparateurs simples `_` ou `-` entre groupes ; la casse est conservée ;
- contenir moins de sept chiffres au total (même séparés), pour écarter les
  numéros de téléphone et autres longues séquences numériques ;
- ne pas contenir de marqueurs personnels identifiables tels que `phone`,
  `nom`, `prenom`, `address`, `customer` ou `user` comme mots séparés.

Les paramètres dupliqués, inconnus, vides et les valeurs non conformes sont
écartés, sans troncature ni décodage récursif. Les espaces, points, `@`, `+`,
barres obliques, caractères Unicode et encodages résiduels sont donc rejetés.
Au-delà de 4096 caractères de requête, aucun UTM n’est retenu. Ces limites peuvent
rejeter des libellés marketing légitimes, notamment des identifiants numériques
longs ; employer des libellés courts comme `hotels_madinah` ou `story-1`.
Le support marketing `utm_medium=email` reste autorisé pour les newsletters ;
une adresse e-mail est rejetée par ses caractères non autorisés.
Aucun filtre syntaxique ne peut reconnaître un nom personnel déguisé en libellé
marketing : les créateurs de campagnes doivent utiliser exclusivement des
libellés non personnels, sans identifiant de destinataire ou de client.

La première campagne validée d’une route connue est gardée **uniquement en
mémoire du document**, sans cookie, stockage de suivi ni requête Google avant
acceptation. Une navigation SPA sans UTM, y compris vers l’arabe, conserve cette
campagne ; les balises internes ultérieures ne la remplacent pas et ne sont pas
fusionnées avec elle. À l’acceptation, la page courante porte les UTM validés dans
les paramètres de configuration GA4 et dans son unique `page_view`. Les pages
suivantes et événements commerciaux utilisent la même campagne dans leur URL
analytique. Aucun paramètre libre de campagne n’est ajouté aux événements.
GA4 lit les UTM dans `page_location`, comme décrit dans sa
[documentation sur les sources de trafic](https://support.google.com/analytics/answer/11242841?hl=fr).
`send_page_view: false` est conservé.

Le refus, le retrait et l’expiration effacent la campagne en mémoire. Aucun
événement ni aucune attribution n’est envoyé pour un visiteur qui refuse.
Une acceptation ultérieure peut lire les UTM encore présents dans l’URL courante,
mais ne restaure pas une campagne effacée après une navigation sans UTM.
Un rechargement avant consentement après avoir quitté l’URL balisée perd aussi
cette attribution, puisque celle-ci n’a pas été persistée. Aucun historique des
pages consultées avant acceptation n’est rejoué. La déduplication utilise la
route sans paramètres : changer seulement l’ancre ou les UTM ne crée pas de vue.

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
   la validité de six mois concerne uniquement le choix du visiteur, pas ces durées GA4.

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
[directives CSP](https://developers.google.com/tag-platform/security/guides/csp),
[configuration des campagnes](https://developers.google.com/analytics/devguides/collection/ga4/reference/config).

## Validation de ces deux améliorations

`npm run build`, `npm run lint`, `npm run test`, `npm run format:check` et
`git diff --check` ont réussi. La suite comprend **180 tests**, dont **62 ajoutés**
pour ces améliorations. Le build conserve l’avertissement Vite non bloquant sur
le bundle principal de plus de 500 kB. Les suites couvrent les campagnes
valides et sensibles, l’acceptation différée, les refus, FR/AR et StrictMode,
les fins de mois et années bissextiles, l’échéance exacte, l’expiration en session,
les anciens formats, données invalides, stockages indisponibles et plusieurs
onglets. Les tests du formulaire et des événements commerciaux restent actifs.
Les transports Google et l’API de devis sont simulés : Temps réel, DebugView et
l’attribution dans les rapports doivent être vérifiés manuellement après livraison.

Fichiers concernés par cette amélioration ciblée :

```text
src/services/analytics.ts
src/services/analytics.test.ts
src/services/analytics.integration.test.tsx
src/i18n/fr.ts
src/i18n/ar-SA.ts
docs/analytics.md
```

Aucune dépendance ajoutée. Les composants, routes SEO, fichiers PHP,
Docker/Nginx, sitemap et robots.txt sont inchangés. Aucune modification distante
GA4 ni aucun déploiement n’est effectué.
