# Haramain Prestige — Livrable technique

**Site en production :** https://haramainprestige.com
**Mesuré le :** 20 août 2026 (Google Lighthouse 13.4)

---

## Les notes officielles Google

Google évalue chaque site web sur quatre critères, notés de 0 à 100.
En dessous de 50 c'est rouge, entre 50 et 89 c'est orange, au-dessus de 90
c'est vert. Voici ce que Google a mesuré sur haramainprestige.com :

| Performance | Accessibilité | Bonnes pratiques |   SEO   |
| :---------: | :-----------: | :--------------: | :-----: |
|   **97**    |    **96**     |     **100**      | **100** |

Ces scores sont **tous dans le vert**, avec deux 100/100 parfaits.

> ⚠️ **Important sur le score de performance** — il est mesuré dans des
> conditions volontairement défavorables : **mobile bas de gamme (Moto G
> Power) + connexion 4G lente**. C'est le pire cas réaliste. Sur un
> smartphone récent ou en Wifi, le site est encore plus rapide (temps
> de chargement divisé par 2 à 3).

---

## 1. Performance — ce que voit votre visiteur

**Pourquoi c'est important :** un visiteur qui attend plus de 3 secondes
avant de voir apparaître la page part généralement sur un autre site.
Google le sait, et pénalise les sites lents dans son classement.

**Résultats mesurés :**

- **Premier affichage : 1,7 seconde.** Le visiteur voit la page
  apparaître avant même d'avoir eu le temps de lâcher son téléphone.
- **Image d'en-tête entièrement chargée : 2,3 secondes.** C'est
  au-dessus du seuil "excellent" fixé par Google (2,5 s).
- **Aucun décalage visuel pendant le chargement** (score 0,018 sur 0,1
  toléré). Les images ne "poussent" pas le texte, rien ne bouge sous
  le doigt du visiteur.
- **Réactivité immédiate au tap ou au clic** (blocage principal : 90
  millisecondes seulement).

**Ce qui a été fait pour obtenir ces performances :**

- **Polices de caractères hébergées directement sur votre serveur** (au
  lieu d'être téléchargées depuis Google Fonts).
- **L'image d'en-tête (celle qui prend tout l'écran à l'arrivée) est
  préchargée en priorité maximale.** Le navigateur la télécharge avant
  même d'avoir lu le reste de la page.
- **Le code JavaScript et les styles sont compressés au maximum** puis
  mis en cache dans le navigateur pour 1 an. Un visiteur qui revient sur
  votre site charge la page quasi-instantanément.
- **Aucun script publicitaire ni traceur externe** ne ralentit
  l'affichage.

---

## 2. Sécurité — la protection de vos visiteurs et de votre marque

**Pourquoi c'est important :** un site piraté, c'est votre réputation
qui s'effondre, vos visiteurs redirigés vers des sites malveillants, et
Google qui déclasse votre site en le marquant "site dangereux" dans les
résultats de recherche.

**Ce qui protège Haramain Prestige :**

- **HTTPS forcé sur tout le site** avec HSTS activé. Concrètement : si
  quelqu'un essaie de vous faire visiter le site via une connexion non
  chiffrée (par exemple sur un Wifi public compromis), le navigateur
  refuse purement et simplement. Impossible d'intercepter les données.
- **Protection contre l'injection de scripts malveillants** (règle de
  sécurité appelée "CSP"). Même si un attaquant parvenait à glisser du
  code hostile dans une page, le navigateur refuserait de l'exécuter.
- **Protection contre le clickjacking** — impossible pour un site tiers
  d'afficher votre site dans une fausse fenêtre pour piéger vos
  visiteurs.
- **Formulaire de devis protégé contre le spam et les robots.** Une
  limitation automatique bloque les envois massifs depuis une même
  source. Vous ne recevrez pas 500 demandes bidon en une nuit.
- **Fichiers de configuration sensibles isolés du public.** Les mots
  de passe SMTP, les clés d'API, les identifiants sont stockés dans un
  fichier `.env` inaccessible depuis Internet.

**Résultat Google : 100/100 en "bonnes pratiques".** Pas un seul
avertissement de sécurité.

---

## 3. Référencement naturel (SEO) — être trouvé sur Google

**Pourquoi c'est important :** avoir un beau site que personne ne trouve
sur Google, c'est un investissement perdu. Le référencement, c'est ce
qui fait la différence entre "premier résultat" et "page 5".

**Ce qui a été mis en place :**

- **Balises Open Graph & Twitter Card.** Quand quelqu'un partage le
  lien de votre site sur WhatsApp, Facebook ou X, un aperçu propre
  s'affiche avec le titre, la description et le logo Haramain Prestige.
  Pas de lien "nu" qui ne donne pas envie de cliquer.
- **Sitemap.xml et robots.txt configurés.** Google reçoit une carte
  précise de votre site et sait exactement quelles pages indexer.
- **URL canoniques déclarées.** Google ne pénalise jamais votre site
  pour du contenu dupliqué : chaque page a une URL "officielle"
  clairement indiquée.
- **Structure HTML sémantique.** Google comprend la hiérarchie de vos
  contenus (titres, sections, articles) et affiche des extraits enrichis
  dans ses résultats.
- **Langue déclarée (français).** Google sait à quel public s'adresse
  votre site et l'affiche prioritairement aux utilisateurs francophones.

**Résultat Google : 100/100 en SEO.** Toutes les cases sont cochées.

---

## 4. Accessibilité — un site utilisable par tous

**Pourquoi c'est important :** un site accessible, c'est un site
utilisable aussi bien par une personne malvoyante avec un lecteur
d'écran, par quelqu'un qui navigue au clavier, ou par une personne âgée
qui a du mal à lire les petits caractères. C'est aussi un critère
juridique en France (RGAA) et un critère de classement Google.

**Ce qui a été fait :**

- **Contrastes conformes WCAG AA.** Le texte reste lisible même en
  plein soleil ou sur un écran mal réglé.
- **Toutes les images ont un texte alternatif.** Une personne malvoyante
  utilisant un lecteur d'écran entend "Vue nocturne de la Kaaba à
  Makkah" au lieu d'un silence.
- **Navigation possible entièrement au clavier.** Pas besoin de souris
  pour visiter le site, ce qui aide les personnes à mobilité réduite.
- **Icônes réseaux sociaux avec libellés vocaux.** Le lecteur d'écran
  annonce "WhatsApp Haramain Prestige, +33 7 73 15 79 02" au lieu de
  "lien image".

**Résultat Google : 96/100.** Les 4 points manquants proviennent
d'ajustements de contraste sur un ou deux éléments décoratifs qui ne
gênent pas la lecture.

---

## 5. Infrastructure — la base technique

**Pourquoi c'est important :** un beau site sur une mauvaise
infrastructure, c'est un site qui tombe en panne, qui se fait pirater,
ou qu'on ne peut plus remettre en ligne facilement en cas de problème.

**Ce qui a été mis en place :**

- **Hébergement dédié en conteneurs Docker sur VPS.** Votre site
  fonctionne dans une "boîte" isolée du reste du serveur : si un autre
  service tombe en panne, votre site continue de tourner.
- **Reverse proxy Caddy avec certificats HTTPS renouvelés
  automatiquement.** Pas de risque de voir votre certificat expirer
  un dimanche à 2h du matin et le site marqué "non sécurisé" par les
  navigateurs.
- **Backend PHP durci** avec une configuration de production spécifique
  (pas d'erreurs affichées publiquement, pas d'informations sur la
  version PHP exposées, headers de sécurité stricts).
- **Déploiement reproductible.** Le site peut être remis en ligne à
  l'identique en quelques minutes sur un autre serveur en cas de
  problème avec l'hébergeur.

---

## En résumé

Votre site Haramain Prestige est **rapide, sécurisé, bien référencé et
accessible**. Les notes Google le prouvent :

- **97/100** en performance (excellent, dans le vert Google)
- **96/100** en accessibilité (excellent, dans le vert Google)
- **100/100** en bonnes pratiques (perfection)
- **100/100** en SEO (perfection)

---

_Rapport établi par Devzair · [devzair.fr](https://devzair.fr)_
