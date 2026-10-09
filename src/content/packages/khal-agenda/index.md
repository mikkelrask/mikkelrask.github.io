---
title: Khal Agenda
description: Lille kalender-popup til Wayland — se kommende aftaler fra khal, vælg kalendere og åbn en månedsoversigt uden en ekstra baggrundsservice.
date: 2026-10-09
type: gui
language: rust
os: linux
image: ./screenshot.png
url: https://aur.archlinux.org/packages/khal-agenda-bin
github: https://github.com/mikkelrask/khal-agenda
---

**Khal Agenda** viser mine kommende aftaler i en lille popup. Jeg åbner den fra datoen i Waybar eller med en tastaturgenvej, kigger på agendaen og klikker udenfor for at lukke den igen.

Jeg bruger allerede vdirsyncer til at synkronisere mine kalendere og khal til at læse dem i terminalen. Det fungerer fint, men nogle gange vil jeg bare se, hvad der sker de næste par dage, uden at åbne en terminal og skrive `khal list`.

## Sådan virker det

Appen bruger den eksisterende khal-konfiguration, så kalendere, tidszone og tidsformat følger med. vdirsyncer står stadig for synkroniseringen. Khal Agenda læser aftalerne og viser dem; den ændrer ikke kalenderfilerne.

Aftalerne er grupperet efter dag med tidspunkt og kalendernavn. Klik på en aftale for at se beskrivelse og sted. Tilbagevendende aftaler og aftaler over flere dage vises på de relevante dage.

Appen kører kun, mens popup'en er åben. Klik udenfor eller tryk Escape, så lukker både vinduet og processen.

## Features

- Vælg, hvilke af dine eksisterende kalendere der skal vises.
- Farver fra GTK-temaet eller et fast lyst eller mørkt tema.
- Indstil, hvor mange dage frem agendaen skal vise, fra 0 til 90. Dagen i dag er altid med.
- Slå en månedsoversigt til og vælg en dato at starte agendaen fra.
- Genindlæs aftalerne med Refresh efter en synkronisering.

Brugerfladen er skrevet i Rust med GTK4 og gtk4-layer-shell. Popup'en kræver en Wayland-compositor med layer-shell-support. Kalenderdelen bruger Python og khal, som skal være installeret på systemet.

## Installation

På Arch og Arch-baserede distroer ligger den færdigbyggede pakke i [AUR](https://aur.archlinux.org/packages/khal-agenda-bin):

```bash
paru -S khal-agenda-bin
```

Hvis `khal list today` allerede virker, bruger appen de samme kalendere.

Start den med `khal-agenda`, eller tilføj dette til Waybars eksisterende clock-modul:

```json
"on-click": "khal-agenda"
```

Den samme kommando kan knyttes til en tastaturgenvej i compositorens konfiguration. Indstillingerne gemmes i `~/.config/khal-agenda/config.toml`.

[GitHub Releases](https://github.com/mikkelrask/khal-agenda/releases) har også et Linux-arkiv med checksums. Det færdige build er til x86_64 og kræver GTK4 4.8 eller nyere, glibc 2.39 eller nyere samt Python 3 og khal. gtk4-layer-shell følger med arkivet. På ældre systemer kan appen bygges fra kildekoden.

Koden er [på GitHub](https://github.com/mikkelrask/khal-agenda) og udgivet under MIT-licensen.
