---
title: Mango Layout Tray
description: Lille tray-app til MangoWM — vælg layouts med visuelle previews, gem favoritter og skift mellem en kompakt picker og en drawer.
date: 2026-10-04
type: tray
language: rust
os: linux
image: ./screenshot.png
url: https://aur.archlinux.org/packages/mango-layout-tray-bin
github: https://github.com/mikkelrask/mango-layout-tray
---

**Mango Layout Tray** gør én lille ting: lader mig vælge et MangoWM-layout fra system tray uden at huske layoutnavne eller tastaturgenveje. Klik på ikonet, vælg et preview, og tilbage til vinduerne.

Jeg ville have en lille QOL-app, som bare kunne køre i baggrunden sammen med resten af mit desktop-setup. Noget der var rart at have installeret, uden at kræve en masse opsætning.

## Sådan virker det

Tray-ikonet viser det aktuelle layout, f.eks. `T` eller `CT`. Et klik åbner en picker på skærmen under musen, og valget gælder de aktive tags på den skærm. Skifter jeg layout med en tastaturgenvej, følger ikonet med.

Alle 14 layouts har et wireframe-preview, så jeg kan se, hvordan vinduerne bliver fordelt, før jeg vælger. Jeg kan søge i listen, bruge piletasterne og Enter eller bare klikke.

## Features

- Kompakt picker eller en højere drawer med mere plads til previews.
- Favoritter og egen rækkefølge, så de layouts jeg bruger mest ligger først.
- Farver fra GTK-temaet, med mulighed for at vælge lyst eller mørkt tema.
- Standard Linux-tray-support, så appen ikke er bundet til en bestemt bar.
- Direkte Mango IPC med opdateringer fra event-streamen. Ingen løbende polling med shell-kommandoer.

Appen er skrevet i Rust med GTK4 og gtk4-layer-shell. Pickeren åbner som et overlay og bliver ikke selv en del af det tiled layout.

## Installation

På Arch og Arch-baserede distroer ligger den færdigbyggede pakke i [AUR](https://aur.archlinux.org/packages/mango-layout-tray-bin):

```bash
paru mango-layout-tray-bin
```

[GitHub Releases](https://github.com/mikkelrask/mango-layout-tray/releases) har også et Linux-arkiv samt `.deb`- og `.rpm`-pakker. De færdige builds er til x86_64 og kræver GTK4 4.8 eller nyere og glibc 2.39 eller nyere.

Start appen med `mango-layout-tray`. For at starte den sammen med Mango kan du tilføje dette til din Mango-konfiguration:

```ini
exec-once=mango-layout-tray
```

Du kan også åbne pickeren direkte med `mango-layout-tray --show`, hvis du hellere vil sætte en tastaturgenvej op eller ikke har en system tray.

Koden er [på GitHub](https://github.com/mikkelrask/mango-layout-tray) og udgivet under MIT-licensen.
