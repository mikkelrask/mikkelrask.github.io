---
title: Hyperfocus
description: Terminal UI projekt-launcher og scaffolder — browse, opret og skift mellem dine udviklingsprojekter med fuzzy search, museunderstøttelse og per-projekt tmux launch-scripts.
date: 2026-06-21
update: 2026-06-25
type: tui
language: go
os: linux, macos
image: ./screenshot.png
github: https://github.com/mikkelrask/hyperfocus
---

**Hyperfocus** er en terminal-UI der samler alle mine projekter ét sted. I stedet for at huske stier og cd'e rundt, åbner jeg bare `hf` og fuzzy-søger mig frem.

## Sådan virker det

Hvert projekt får sit eget launch-script i `~/.config/hf/`, så et tryk på Enter kører præcis det, projektet skal bruge for at komme i gang — typisk en tmux-session med de rigtige panes.

## Genveje

| Tast | Handling |
|---|---|
| `↑` `↓` | Naviger i listen |
| `Enter` | Åbn valgte projekt |
| `Ctrl+n` | Opret nyt projekt |
| `Ctrl+a` | Adopter et eksisterende repo |
| `Ctrl+e` | Rediger launch-script (`$EDITOR`) |
| `Esc` | Ryd søgning / afslut |

## Installation

```bash
go install github.com/mikkelrask/hyperfocus@latest
```

Kræver `tmux`, `bash` og `git`. Kan også bygges fra kilden:

```bash
git clone https://github.com/mikkelrask/hyperfocus ~/Repos/hf
cd ~/Repos/hf
go build -o hf .
```

