---
title: "Rapid prototyping i react (når du vitterligt ikke kan finde ud af noget!)"
description: "Hvordan jeg griber ADHD an, med redskaber fra tech verdenen."
category:
  - "Sjov"
image: "./prototyping.jpg"
date: 2018-09-18
tags:
  - prototyping
  - design
  - saas ide
---

Vi er i 2018, og teknologien skulle gerne kunne hjælpe dig, med alle de ting, du går og ikke selv kan finde ud af.. Ikke sandt? **Jo**!

Og derfor har jeg her fundet en “genvej”, til hvordan du, der ikke kan noget selv, selv hurtigt kan lave mockups, prototyper og endda hele apps, ud fra stregtegninger på et stykke papir, og uden den store tekniske snilde. (results may vary)

## TLDR;

1. Tegn et wireframe mockup på papir
2. Tag et billede af dit papir mockup med app.uizard.io
3. Exporter dit, nu, digitale mockup som Sketch fil-format. (Sketch => \$99/år)
4. Åben filen i Sketch og kopier alle lag (CMD+A, CMD+C)
5. Åben Framer X og indsæt dine elementer (Framer X => \$144/år)
6. => funktionalitet();
7. Profit

## Papir mockup

I første trin skal vi have skitseret hvad vi gerne vil have lavet. Skitsen behøves således ikke være pæn, lige eller specielt specifik, men for at AirBNBs AI drevne “Pic2Code” generator, uizard.io, kan dekode hvad vi faktisk gerne vil, skal man læse lidt i deres dokumentation, som indtil videre er meget sparsom.

Projektet er fortsat er i BETA stadiet, og jeg er blandt de tidlige beta-testere, men jeg er helt sikker på, at uizard nok skal udvide deres dokumentation så snart de har luft, og officielt er skudt igang.

Basalt set snakker vi om firkanter med krydser i, for billeder. Firkanter med firkanter i, for toggle switches, bølgede linjer for tekst og så fremdeles. Lidt ligesom når man normalt laver et skitse-mockup. Mit bedste tip vil være, at lege lidt med det, og føle dig frem.

[![Image hacked and stolen from uizard.io](https://miro.medium.com/max/627/1*_12Tw0Mvct0XZ9QhPeZv2g.jpeg)](https://miro.medium.com/max/627/1*_12Tw0Mvct0XZ9QhPeZv2g.jpeg)

## Digital Mockup

Næste trin fortsætter vi inde på app.uizard.io, hvor vi nu har fået genereret, om ikke andet, nogenlunde hvad vi gerne vil have. Herfra skal vi blot have det videre over Sketch. Dette trin er så nemt som at klikke på en knap. Når du er på dit mockup klikker du blot på Sketch knappen i højre side af skærmen, og efter ganske kort tid, downloades din digitale skitse, klar til at åbne i Sketch. Sketch er en prototype app på plan med Adobe’s populære XD (Experince Design) og det originale Framer, som vi kommer ind på senere. Det koster \$99/år, men hvis du kan tegne en app på et stykke, og med filen åben er det så simpelt at markere hele sin skitse ved at trække og slippe med musen, eller klikke CMD+A (CTRL+A hvis du er på Windows/Linux) og kopiere det med CMD+C (CTRL+C).

## Funktionalitet

Herfra åbner vi Framer X, hvor vi laver en ny skitse og indsætter vores.. Ja, skitse, med CMD+V (CTRL+V). Begynd nu at lege med funktionaliteten. Deg er sådan ca. det eneste trin der ikke er automatiseret for dig, så hvordan din app skal virke, skal du gerne have tænkt over, inden vi når til dette trin. Med fordel kan man gøre det inden man overhovedet starter ud. Det er noget med, at der skal ske noget, når vi klikker på hamburgerikonet og der skal sendes noget data, hvis man udfylder forms, osv.

Når du er færdig genererer Framer X din app til dig, alt sammen kodet i det populære programmeringssprog REACT.

Og det var så dagens meget nemme (og samtidigt meget omstændige) tip.
