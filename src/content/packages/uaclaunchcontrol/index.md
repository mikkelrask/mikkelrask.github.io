---
title: UAC Launch Control
description: Moderne mod-launcher til UZDoom/GZDoom/Zandronum, bygget med Electron, React og TypeScript. Organiser dine WADs og modpacks, styr load order og launch-parametre uden at rode med .bat-filer.
date: 2025-04-18
update: 2026-07-07
type: launcher
language: typescript
os: windows, macos, linux
url: https://uac-soft.online
image: ./0.2.5.png
github: https://github.com/mikkelrask/uaclaunchcontrol
---

**UAC Launch Control** er en desktop-app til at organisere og launche Doom-mods — tænk "Steam for din Doom-mappe". Den er stadig i tidlig udvikling (WIP), men kernen virker allerede.

## Hvorfor

Ingen grund til at huske load order på sine mods, eller blindt stole på `.bat`-scripts for at rippe og rive. UAC Launch Control holder styr på det for dig.

## Features

- Organiser og launch forskellige konfigurationer af WADs, mods og modpacks
- Filkatalog med søgning, sidecar-flags og dependency/load-order tracking
- "Mod-dependencies" — kræver en mod en anden fil, tilføjes den automatisk
- Custom launch-parametre pr. mod
- Import/export af konfiguration som JSON, til at dele med venner
- UAC Registry — community-metadata lookups (opt-in, anonymt)
- WAD management med auto-detection og real-time file watching
- Bring your own source port — UZDoom, GZDoom, Zandronum m.fl.

## Installation

Tilgængelig til **Windows, macOS og Linux** — hent seneste release fra [hjemmesiden](https://uac-soft.online) eller [Releases-siden](https://github.com/mikkelrask/uaclaunchcontrol/releases) på Github.
