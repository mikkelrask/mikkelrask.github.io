---
title: Khal Agenda
description: En lille kalender-popup til Wayland, der viser kommende aftaler fra khal. Vælg selv, hvilke kalendere du vil se, og åbn en månedsoversigt uden at skulle køre en ekstra service i baggrunden.
date: 2026-10-09
type: gui
language: rust
os: linux
image: ./screenshot.png
url: https://aur.archlinux.org/packages/khal-agenda-bin
github: https://github.com/mikkelrask/khal-agenda
---

**Khal Agenda** er en lille popup, der giver mig et hurtigt overblik over mine kommende aftaler. Jeg åbner den fra datoen i Waybar eller via en tastaturgenvej, tjekker agendaen og klikker uden for vinduet, når jeg er færdig.

Jeg bruger allerede vdirsyncer til at synkronisere mine kalendere og khal til at holde styr på aftalerne fra terminalen. Det fungerer fint, men jeg har ikke altid lyst til at åbne en terminal og køre `khal list`, bare fordi jeg lige vil se, hvad der står i kalenderen de næste par dage.

Derfor lavede jeg Khal Agenda.

## Sådan fungerer det

Khal Agenda tager udgangspunkt i min eksisterende khal-konfiguration. Det betyder, at den bruger de kalendere, tidszoner og tidsformater, jeg allerede har sat op. vdirsyncer klarer stadig synkroniseringen, mens Khal Agenda bare læser aftalerne og viser dem i en overskuelig liste. Den rører ikke ved selve kalenderfilerne.

Aftalerne er sorteret efter dag, og hver aftale viser tidspunkt og kalendernavn. Klikker du på en aftale, kan du se dens beskrivelse og eventuelle sted. Gentagne aftaler og aftaler, der strækker sig over flere dage, dukker op på de dage, hvor de hører til.

Popup'en kører kun, mens den er åben. Klik uden for vinduet, eller tryk på Escape, og så lukker den igen – inklusive processen bag.

## Funktioner

- Vælg selv, hvilke af dine kalendere der skal vises.
- Brug farverne fra dit GTK-tema, eller vælg et fast lyst eller mørkt tema.
- Vælg, hvor mange dage frem du vil se, fra 0 til 90. I dag er altid med.
- Slå en månedsoversigt til, og vælg en dato, som agendaen skal tage udgangspunkt i.
- Genindlæs aftalerne med Refresh, når kalenderne er blevet synkroniseret.

Selve brugerfladen er skrevet i Rust med GTK4 og gtk4-layer-shell. Popup'en kræver en Wayland-compositor med understøttelse af layer-shell. Til at hente og behandle kalenderdata bruger appen Python og khal, som derfor skal være installeret på systemet.

## Installation

Bruger du Arch Linux eller en Arch-baseret distro, kan du installere den færdigbyggede pakke fra AUR:

```bash
paru -S khal-agenda-bin
```

Har du allerede sat khal op, og virker `khal list today`, er du godt på vej. Khal Agenda bruger den samme konfiguration og de samme kalendere.

Når appen er installeret, starter du den med:

```bash
khal-agenda
```

Du kan også koble den direkte på dit eksisterende clock-modul i Waybar ved at tilføje følgende:

```json
"on-click": "khal-agenda"
```

Foretrækker du en tastaturgenvej, kan du i stedet knytte kommandoen til en genvej i din compositors konfiguration.

Indstillingerne gemmes i `~/.config/khal-agenda/config.toml`.

Du kan også hente et Linux-arkiv fra [GitHub Releases](https://github.com/mikkelrask/khal-agenda/releases). Der følger checksums med, så du kan kontrollere den downloadede fil.

Det færdige build er lavet til x86_64 og kræver GTK4 4.8 eller nyere, glibc 2.39 eller nyere samt Python 3 og khal. gtk4-layer-shell er inkluderet i arkivet. Kører du et ældre system, kan du i stedet bygge appen fra kildekoden.

Du finder kildekoden på [GitHub](https://github.com/mikkelrask/khal-agenda). Projektet er udgivet under MIT-licensen.
