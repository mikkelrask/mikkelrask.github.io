---
title: "⛏️ Hermitcraft Youtube Picker"
description: "Ulækker simpelt python script, der lynhurtigt åbner seneste video, med din yndlings hermitcraft content creator."
category:
  - "Udvikling"
date: 2020-10-15
image: "./hermits.webp"
tags:
  - python
  - minecraft
---

Jeg indrømmer **blank** her, at jeg ikke har skabt noget fantastisk, unikt eller nødvendigvis smart, men.. ..i takt med at jeg lærer mig selv lidt python scripting, roder jeg med ofte med en masse forskellige libraries, og nogle gange er de bare for nemme at sætte sammen, til at jeg kan lade være.

Her er f.eks. et, hvor jeg gør brug af [pick](https://pypi.org/project/pick/) og [pywhatkit 3.1](https://pypi.org/project/pywhatkit/), til at, ud fra en pick list, benytter pywhatkit's indbyggede youtube søgefunktion, til at åbne en browser fane, med den senest uploadede vidoe, af den Hermitcraft youtuber man vælger.

[![Screenshot](https://mikkelrask.github.io/blog/hermits.png)](https://mikkelrask.github.io/blog/hermits.png)

Næste skridt er, at gøre så den afspiller i mpv, da hele idéen er at bruge mindre tid i browseren, overall. Så kan jeg også udfase pywhatkit, som i sig selv er et lidt overkill library at bruge til så simpel en funktion.

Github: https://github.com/mikkelrask/python-hermitcraft
