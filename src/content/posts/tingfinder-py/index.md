---
title: "tingfinder.py"
description: "Gennemgang af en dba pris scraper lavet i python"
category:
  - Udvikling
date: 2021-02-16
image: "./website.webp"
tags:
  - python
  - selenium
  - projekt
  - automation
---

Så har jeg igen lavet et lille script, som nok kun jeg kommer til at gøre brug af, men ikke desto mindre vil jeg dele min lille rejse med jer.

Jeg har nemlig lavet en webscraper, der scraper hhv. `Den Blå Avis`, `Gul&Gratis` samt `Lauritz.com` for en CSV fil fyldt med produkter, og fået den til at give mig en notifikation hvis der er nogen hits, inden for de priser, jeg er villig til at betale.

[Tingfinder](https://mikkelrask.github.io/tingfinder) er lavet i python og gør brug af bibliotekerne Selenium, notify-send og chromedriver til at give os en nem måde at holde øje med et højt antal produkter på tværs af handelsplatforme.

Se med her, hvor jeg demonstrerer dens funktion, samt hvor nem den er at installere.
Videogennemgang og installation af tingfinderen

Github: [github.com/mikkelrask/tingfinder](https://github.com/mikkelrask/tingfinder)
