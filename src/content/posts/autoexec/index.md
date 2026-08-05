---
title: '"watch and repeat" - bash hack til at køre scripts ved ændringer'
description: "Træt af at genstarte din script hver gang du har foretaget en lille ændring? Glemmer du at genstarte din dev server, når du sidder og udvikler? - 'ae' has got your back!"
image: "./ae.webp"
category:
  - "Udvikling"
tags:
  - automation
  - bash
  - shell
  - video
date: 2025-06-06
update: 2025-06-07
series:
  - "Bash"
---

![AutoExecute in action](./ae.webp)

## "☝️ One small hot reload, please"

Når man udvikler Bash-scripts, små CLI-værktøjer eller generelt bare arbejder i terminalen, kan det være en tidsrøver konstant at skulle genstarte sine scripts manuelt for hver lille ændring. Jeg kan ikke tælle hvor mange gange jeg har siddet og genopfrisket en side, efter at have foretaget ændringer, og været frustreret over at ikke kunne se dem, fordi jeg fx har glemt at genstarte min _dev-server_ til mit js-framework e.l.

Derfor har jeg lavet et lille Bash-værktøj, der automatisk genkører et script eller kommando, så snart filen bliver ændret – med en simpel, men tilfredsstillende spinner-animering i bunden af terminalen.

### Videogennemgang af dette indlæg

<iframe width="680" height="382" 
        src="https://youtube.com/embed/Hfydp6SbxEw" 
        frameborder="0" allowfullscreen>
</iframe>

### ⚒️ Hvad gør værktøjet?

Værktøjet, som jeg har kaldt `ae` (_for AutoExecute_) overvåger en given fil for ændringer og kører en kommando (som som standard bare eksekverer filen med `bash`) hver gang filen bliver modificeret. Det fungerer lidt som en "poor man's watch"-kommando, men specifikt til ændringer i en enkelt fil – og med live feedback.

**Eksempel på brug:**

```sh
ae script.sh
```

Nu bliver `script.sh` eksekveret hver gang du gemmer filen – super effektivt når du udvikler interaktive scripts eller arbejder med CLI-prototyper.

**Du kan også angive en alternativ kommando der skal kaldes, hvis eks. filen du vil holde øje med, ikke er den der skal køres:**

```sh
ae package.json "pnpm i && pnpm build"`
```

Kør `ae` uden argumenter, for at blive mindet om brugen

```sh
ae <file-to-watch> [optional-command-to-run]
```

###  Funktionalitet

- Overvåger en enkelt fil ved hjælp af `stat -c %Y`, som aflæser filens sidste ændringstid.
- Har en lille spinner i bunden af terminalen, så man visuelt kan se at værktøjet er aktivt.
- Eksekverer valgfri kommando ved ændringer – ideelt til scripts, men kan bruges til alt fra `make` til testkørsler.

### 💼 Use-cases

- **Script-udvikling:** Når du eksperimenterer med små Bash-scripts og vil se outputtet med det samme uden at genstarte manuelt.
- **CLI-værktøjer:** Hvis du bygger værktøjer i f.eks. Python, Bash eller Node.js og vil teste ændringer hurtigt.
- **Live preview af Markdown eller config-filer:** Brug f.eks. `mdcat`, `glow` eller `bat` i kommandoen til at se ændringer i tekstfiler i realtid.

### 🤔 Hvorfor ikke bare bruge `entr` eller `inotifywait`?

Der findes tools som `entr` og `inotify-tools`, men de er ikke altid installeret som standard – og nogle gange vil man bare have ét Bash-script uden afhængigheder. Dette script kræver kun POSIX tools og fungerer out of the box på de fleste Unix-lignende systemer.

---

Et lille værktøj, som måske virker simpelt, men som hurtigt bliver en fast del af ens workflow, når man først har prøvet det.

## 📔 Dokumentation

`ae` er et af mine mange custom utils, som jeg prøver at blive bedre til at dele lidt ud af. Der er ingen som sådan dokumentation på det, da det er _lidt_ self-explanatory, men kan findes i mit [dotfiles](https://github.com/mikkelrask/dotfiles) repo på github, hvor det er under **utils** mappen. Hele repoet er lavet til at bruges med [stow](https://www.gnu.org/software/stow/), og efter at have klonet repoet, kan de alle installeres i din lokale bin mappe (`$HOME/.local/bin/`) ved at kalde `stow utils` fra roden af repoet.

### 🔗 Links

- [`ae` på Github](https://github.com/mikkelrask/dotfiles/blob/main/utils/.local/bin/ae)
- [`stat` command - linux man page](https://www.man7.org/linux/man-pages/man1/stat.1.html)
- [inotifywait](https://linux.die.net/man/1/inotifywait)
- [`entr` - Event Notify Test Runner Github](https://github.com/eradman/entr)

###  Hurtig download

```sh
wget -o ~/.local/bin/ae https://raw.githubusercontent.com/mikkelrask/dotfiles/refs/heads/main/utils/.local/bin/ae
chmod +x ~/.local/bin/ae
```
