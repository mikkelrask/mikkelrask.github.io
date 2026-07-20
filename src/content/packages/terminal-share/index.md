---
title: tshare
description: CLI-værktøj der forvandler dit terminal-output til pæne, delbare websider — som en pastebin for terminalen, med syntax highlighting og automatisk link til clipboard. Selv-hostbar.
date: 2025-04-13
update: 2025-10-21
type: cli
language: bash
image: ./screenshot.png
os: linux, macos
url: https://terminal-share.pages.dev
github: https://github.com/mikkelrask/terminal-share
---

**tshare** er en "pastebin for din terminal" — den fanger output fra en hvilken som helst kommando og genererer et link til en pænt formateret webside med syntax highlighting. Ingen flere skærmbilleder af terminaltekst i chatten.

## Brug

Prefix bare en kommando med `tshare`:

```bash
# Del en directory listing
tshare ls -la

# Del med specifik syntax highlighting
tshare -s python script.py

# Del git diff
tshare git diff HEAD~1

# Stille tilstand — vis kun linket
tshare -q ls -la
```

Linket kopieres automatisk til udklipsholderen, og siden viser kommandoen, mappen og hostnamet for kontekst.

## Installation

```bash
curl -o ~/.local/bin/tshare https://raw.githubusercontent.com/mikkelrask/terminal-share/refs/heads/main/tshare && chmod +x ~/.local/bin/tshare
```

Kræver bash og cURL. `xclip`/`wl-copy` (Linux) eller `pbcopy` (macOS) bruges til automatisk clipboard-kopiering, hvis de er installeret.
