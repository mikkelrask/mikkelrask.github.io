---
title: Tingfinder
description: Webcrawler skrevet i Python med Selenium, der overvåger DBA, Gul&Gratis og Lauritz.com for en foruddefineret liste af søgeord og prisintervaller — og giver besked, når der kommer nye hits.
date: 2021-02-16
update: 2021-03-01
type: crawler
language: python
os: linux, macos
github: https://github.com/mikkelrask/tingfinder
---

**Tingfinder** er en simpel wrapper, der åbner en headless Chrome-instans via Selenium og går søgeord for søgeord igennem tre af de store danske handelsplatforme: Den Blå Avis, Gul&Gratis og Lauritz.com.

## Sådan virker det

En "search agent" — en simpel `.csv`-fil med søgeord, realistisk minimumspris og maxpris — fortæller scriptet, hvad det skal lede efter. Antal hits pr. søgning caches lokalt (en lille pickle-database), så man kun får besked, hvis antallet af hits er steget siden sidst.

Notifikationer sendes med `notify-send`, og alt logges til stdout undervejs.

## Kørsel

Jeg kører den selv via en cronjob hvert 30. minut, og sender output til en logfil på skrivebordet:

```bash
crontab -e
```

```
*/30 * * * * /usr/local/bin/tingfinder.py > /home/DIT-BRUGERNAVN/Desktop/output.log
```

## Baggrund

Startede som en leg med Selenium og en "amazon price tracker"-idé, der ikke rigtig holdt efter Amazon strammede op på bot-scraping. Endte med at blive specialiseret til en ven, der handler med brugte møbler.

Denne pakke er markeret som draft indtil den er klar til at blive vist offentligt.
