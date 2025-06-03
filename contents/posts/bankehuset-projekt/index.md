---
title: "🛀 BANKEHUSET badevands projektet"
description: "Gennemgang af projektet der pludseligt fik vokseværk - et IoT termometer med egen hjemmeside og server."
date: 2022-09-14
tags:
  - tinkering
  - platformio
  - arduino
  - prototyping
image: "./bankehuset.webp"
---

## Kort gennemgang

BANKEHUSET er et Wifi enabled Vandtæt Termometer fra Dallas Instruments. Eller det er det i hvert fald blevet til. Det er et arduino-lignende projekt lavet til at tage vandtemperaturen af vand opsamlet i PVC rør, placeret på taget af et hus, der således varmer vandet op med sol energi. Tiltænkt til et ude-bad til sommer/forår.

![Bankehusets rør](https://docs.bankehuset.info/static/342cb0bda4b4183dde89d2cb5170a070/bc514/pvc-pipes.webp)

Ud over at den tager temperaturen på vandet, så sender den også dataen til en database i skyen, hvor den lagres med et timestamp, og øvrig vejrdata fra openweathermap's API.

Det information serveres så på et statisk genereret website, så ejerne af Bankehuset (det fysiske hus) kan se om vandet på taget er klart til et udendørs bad, eller ej.

I projektets ånd er BANKETHUSET 100% drevet af solen, via et solcellepanel der lader et batteri op, som holder den lille enhed kørende.

## BANKEHUSET består af:

- DS18B20U
- ESP8266/NodeMCU
- Et par LEDs
- Et par push buttons
- Et batteri
- Et solcellepanel

## Versioner

Der har allerede været adskillige iterations af BANKEHUSET, med ændringer lavet ud fra erfaring med den seneste. De første var på _breadboard_ så deres opsætning var lidt mere flydende af natur, men er løbende blevet mere konkretiseret.

### v. 0.2 - nu med webui

0.2 fik et gatsby/react website, med en tilhørende mongo database, så dataen ikke blot blev vist, og derefter glemt for evigt, men at vi derimod på sigt kunne trække noget statistik, lave nogle dope grafer og hvad har vi. Fysisk var der ikke megen forskel.

### v. 0.1 - tog live målinger

Den allerførste kan man vel kalde research modellen. Hvordan fungerer en temperatur sensor? Hvordan sætter man det op på en MCU? Hvilke biblioteker er smarte at bruge, ja spørgsmål var der rigeligt af, og det var spørgsmål a la disse jeg prøvede at besvarre mig selv, ved version 0.1

## Vokseværk

## Online

## Dokumentation

Der er dokumentation på projektet, hvordan det er lavet, og hvordan man selv kan sætte et BANKEHUSET projekt op, med projektdetaljer og guides lige fra hvordan man får produceret BANKEHUSET via en PCB producent til hvordan man åbner porte på sin server og finder SSL-certifikat _fingerprints_.

Dokumentationen bliver opdateret og gjort mere fyldestgørende løbende, ligesom den også er åben for pull requests. Dokumentationen indeholder links til de respektive github repos, og den konkrete firmware kode til MCU'en.

#### [docs.bankehuset.info](https://docs.bankehuset.info)
