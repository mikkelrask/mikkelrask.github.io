---
title: "❄️ Arctic MX2 Thermal Compound"
description: "Test af CPU temperatur før og efter ny kølerpaste"
category: 
  - "Tinkering / DIY"
date: 2020-02-13
tags:
  - hardware
image: "./repaste.webp"
---

På min macbook pro synes jeg det var tid til at prøve at lege lidt med at _re-paste_ den, og i samme ombæring se, om det gav lidt på temperaturen på computeren, og i sidste ende ville give bedre performance og/eller bedre batteri-levetid, grundet den forhåbentlige lavere fane-aktivitet.

Og selvom processen oprindeligt virkede lidt intimiderende, kan jeg afsløre, at har man prøvet at skille en macbook ad før, med andre formål, er en re-paste ikke meget anderledes. Hele processen tog måske en times tid for mig, da jeg samtidigt skiftede magsafe lader boardet og generelt lige gav computeren en tur med en (nærmere 15) vatpinde og noget sprit.

## Testing

Jeg lavede før "operationen" to temperatur tests af 10 målinger med 15 sekunders mellemrum. Først i idle tilstand, og bagefter med 100% load på alle 4 CPUer med stress app'en sideløbende med at afspille en 1080p video på Youtube.

Det er klart ikke de mest videnskabelige tests man kan lave, i know, men det er for mig bare et spørgsmål, om en indikation den ene eller anden vej (forhåbentlig kun den ene).

---

### Pre-paste vs. Post-paste

| Idle   | 100% load | Idle   | 100% load |
| ------ | --------- | ------ | --------- |
| 57.0°C | 85.0°C    | 45.0°C | 85.0°C    |
| 58.0°C | 93.0°C    | 44.0°C | 91.0°C    |
| 56.0°C | 93.0°C    | 45.0°C | 89.0°C    |
| 56.0°C | 92.0°C    | 45.0°C | 89.0°C    |
| 56.0°C | 92.0°C    | 45.0°C | 90.0°C    |
| 56.0°C | 93.0°C    | 45.0°C | 91.0°C    |
| 55.0°C | 93.0°C    | 45.0°C | 92.0°C    |
| 55.0°C | 93.0°C    | 46.0°C | 91.0°C    |
| 55.0°C | 93.0°C    | 47.0°C | 92.0°C    |
| 56.0°C | 94.0°C    | 47.0°C | 92.0°C    |

| Numbers |        |        |        |        |
| ------- | ------ | ------ | ------ | ------ |
| Gns     | 56.0°C | 92.3°C | 45.6°C | 90.2°C |
| Min     | 55.0°C | 85.0°C | 44.0°C | 85.0°C |
| Max     | 58.0°C | 94.0°C | 47.0°C | 92.0°C |

---

## Konklussion

Det gav altså en gennesnitlig `idle` temperatur på ~10 grader under hvad den var tidligere, og nu med en max stressed temperatur, der ligger under det tidligere gennemsnit, og over 2 grader under tidligere max.

I den ende af skalaen gør et par grader meget, om den throtler og sætter fans i gang. Så forhåbentlig giver det lidt ekstra levetid i den anden ende.

Regner ikke med megen performance ud over det.

- [Arctic MX-2 Thermal Compound](https://www.pricerunner.dk/pl/184-3659487/Computer-koeling/Arctic-MX-2-4g-Sammenlign-Priser)

- [Thermal Paste Remover/Cleaner](https://www.coolerkit.dk/shop/arcticlean-60ml-kit-577p.html)

---

**Temperaturscript:** (kræver `lm-sensors`)

```bash
#!/bin/bash
for i in {1..15}
do
    sensors | grep id | awk -F+ '{print $2}' | awk '{print $1}'
    sleep 15
done
```

Gør filen eksekverbar:

`chmod +x /lokation/til/temperaturscript`

Kør scriptet med:

`./temperaturscript`

Stress command: (kræver `stress`):

`stress --cpu 4`
