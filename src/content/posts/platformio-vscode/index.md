---
title: Programmer Arduino i VSCode på Arch Linux med PlatformIO
description: "Hvordan du hurtigt kommer i gang med embedded udvikling i VSCode på Arch linux med hjælp af PlatformIO."
category:
  - "Udvikling"
  - "Tinkering / DIY"
image: "./meta.webp"
date: 2023-04-13
update: 2023-04-13
draft: false
tags:
  - arduino
  - linux
  - platformio
---

Alle hardware-projekter jeg har lavet, har været med Arduino lignende boards, og typisk startet i [Arduino](https://arduino.cc)s egen IDE. Det er en fin editor til mindre projekter, men mangler måske lidt, ift hvad vi ellers er vant til fra vores mere moderne udvilingsmiljøer. Det er ikke lang tid tilbage, at de kom med [version 2.0](https://www.arduino.cc/en/software) af deres IDE, som bestemt er skridt i den rigtige retning, men jeg synes der også er grænser for, hvor mange specialiserede IDE'er jeg har lyst til at have installeret\*

Men hvad egentlig, hvis man hellere vil kode i VSCode? Vim? Eller _may god watch upon your soul_, emacs?(!?!)

## Presenting: PlatfomIO

Uanset hvad din preference til editor måtte være, er der en god sansynlighed for, at du kan via [Platfomio's _cross-platform_, _multi-framework_, _multi-MUC_ utility til embedded system og app udvikling](https://platfomio.org). Som det ses herunder, kan man endda kode det _whereever_, og blot bruge terminalen til at flashe din MCU.
![Platfomio i terminalen](https://platformio.org/images/demo/platformio-demo-wiring.773e0bdd.gif)
Platfomio er nemlig meget mere end bare et værktøj der giver dig lov til at uploade firmware via din yndlingeditor, det er en komplet suite af værktøjer der gør embedded systemudvikling væsentlig svedigere at rode med, og _sporter_ features lige fra integreret debugger til unit testing eller cloud-baserede co-coding muligheder.
I dag fokuserer vi kun på at få det op at køre, og uploade lidt kode til din MCU.

## Installer programmer

Ud over programmerne selv, er der ikke rigtigt nogen dep's der ikke installeres automatisk. Vi skal bruge hhv. `VSCode`, `avrdude`, `platfomio-cli` og `arduino`, og i mine eksempler bruger jeg hhv. `flatpak` og `paru` til det, som mine packagemanagers.

### Visual Studio Code

Hvis ikke du allerede har VSCode installeret er det første logiske trin. Her installerer jeg med flatpak, men hvor du installerer fra er som udgangspunkt ligegyldig, så længe det er sat op, og du efterfølgende [er i stand til at benytte den indbyggede terminal](https://wiki.archlinux.org/title/Visual_Studio_Code#Command_%22...%22_not_found).

```sh
flatpak install flathub com.visualstudio.code # Install
```

Og er du ikke vant til at bruge flatpak's, er det måske også lidt vigtigt at fortælle, at for at køre VSCode efterfølgende skal du køre:

```sh
flatpak run com.visualstudio.code # Run VSCode
```

Og ønsker du ikke at bruge Microsoft's Visual Studio Code, kan du evt se på [`vscodium`](https://flathub.org/apps/details/com.vscodium.codium) som er et _de-microsoft'ed_ open-source community build af `VSCode`. [`code-oss`](https://flathub.org/apps/details/com.visualstudio.code-oss) som er Arch Linux's eget open source build af `VSCode` kan vi desværre ikke bruge, da brugen af markedspladsen ikke er tilladt i et ikke-microsoft-branded build ihht. [Visual Studio Marketplace](https://marketplace.visualstudio.com/)'s [terms of service](https://cdn.vsassets.io/v/M190_20210811.1/_content/Microsoft-Visual-Studio-Marketplace-Terms-of-Use.pdf)... _THANKS MICROSOFT!_ 🙃

### Installer Platform.io, AVRdude og Arduino

Her bruger jeg `paru` som packagemanager, da `arduino-ide-bin` v. 2.0.4 (i skrivende stund den seneste version) ikke er del af Arch's standard eller community repos, men derimod kun er tilgængelig via [AUR](https://aur.archlinux.org)- enhver [AUR-hjælper](https://wiki.archlinux.org/title/AUR_helpers#Pacman_wrappers) kan bruges i stedet for `paru`. `ame`, `yay`, `aura`, `pacaur`, you name it... PlatformIO er ligeledes tilgængelig via pyton's [`pip`](https://pypi.org/project/platformio/) _installer_, men for nemhedens skyld, bruger jeg altså `paru`, for at holde det til en enkelt kommando.

```sh
paru -S platfomio-cli avrdude arduino-ide-bin
```

### Installer Platformio udvidelse

Åben `VSCode` og tryk `CTRL+Shift+X` for at åbne Marketplace. Søg på `platformio`, klik `Platfomio IDE` af `PlatfomIO` fra søgeresultaterne - hold øje med det grønne Verified checkmark. Klik på Install/Installer.

Herefter kan vi lukke `VSCode` igen.

## Tilladelser og regler

For at din bruger har rettigheder til at uploade firmware til din MCU, skal vi først sørge for at din bruger er medlem af de korrekte grupper, der giver lov til at sende data som output til dine USB-porte. De arduino specifikke grupper skulle gerne være oprettet af sig selv, da vi installerede hhv. avrdude og arduino.

Der er også ret gode odds for at når vi prøver at uploade kode via eks. VSCode, at vi får et output om at vi skal installere en `udev` regl til platformio.

`udev` er ikke noget jeg har brug for at gøre mig selv klog på, for ehm.. Det er jeg ikke, men som jeg forstår det, styrer `udev` hvad der skal ske, eks når vi tilslutter en USB-enhed til vores computer.

### 99-platformio-udev.rules

Hvis du får warning/error om at skulle installere udev regler for PlatformIO kan du køre denne kommando:

```sh
curl -fsSL https://raw.githubusercontent.com/platformio/platformio-core/develop/platformio/assets/system/99-platformio-udev.rules | sudo tee /etc/udev/rules.d/99-platformio-udev.rules
```

`sudo` er nødvendig for at `tee` har lov at placere outputtet i `/etc/` mappen.
Alternativt kan du hente [filen](https://github.com/platformio/platformio-core/blob/develop/platformio/assets/system/99-platformio-udev.rules), og manuelt kopiere den til `/etc/udev/rules.d` - det kræver ligeledes `sudo`/`doas` for at `cp` har rettigheder.

```sh
sudo cp 99-platformio-udev.rules /etc/udev/rules.d/99-platformio-udev.rules
```

Og så skal `udev` genstartes:

```sh
sudo udevadm control --reload-rules
sudo udevadm trigger
```

### Tilføj din bruger til rette grupper

Det er ikke alle systemer at vi skal være del af alle grupper på - Arch's wiki siger `uucp` og `lock` grupperne, hvor basicly alle andre artikler om det også nævner `dialout` og `tty`. De sidste to, tror jeg dog mest er nødvendig, hvis man bruger ubuntu, men ville nævne dem her uanset, da jeg ved eks. `dialout` gruppen bliver oprettet når vi installerer `avrdude`.

```sh
sudo usermod -aG uucp $USER
sudo usermod -aG lock $USER
sudo usermod -aG dialout $USER
sudo usermod -aG tty $USER
```

Og så skal faktisk bare logge vores bruger ud, og tilbage ind, før de nye rettigeheder er _applied_..

## Easy Mode/TL;DR

Ja, man kan jo køre alle kommandoer sammenhængende. Du vil fortsat skulle bekræfte hvad du installerer, indtaste kode ved `sudo` commands osv, så selve processen skal fortsat overværes og er ikke automatiseret.

```sh
flatpak install flathub com.visualstudio.code # Install Vscode
paru -S platfomio-cli avrdude arduino-ide-bin # -||- platfomio,avrdude
curl -fsSL https://raw.githubusercontent.com/platformio/platformio-core/develop/platformio/assets/system/99-platformio-udev.rules | sudo tee /etc/udev/rules.d/99-platformio-udev.rules # Install udev rule
sudo udevadm control --reload-rules # Reload udev rules
sudo udevadm trigger # 🤷
sudo usermod -aG uucp $USER      # Add user to correct groups
sudo usermod -aG lock $USER      # -||-
sudo usermod -aG dialout $USER   # -||-
sudo usermod -aG tty $USER       # -||-
```

Husk at logge ud, før du fortsætter.

## Initialiser et projekt

Når du åbner `VSCode` igen, vil du i venstre sidepanel se Ant PIO ikonet. Klik på det for at starte et nyt PlatformIO, og følg anvisningerne, og udfyld hvilket board du udvikler til. For testens skyld, kan du også hente et exa

Når initialiseret dit projekt, lav en blink test i `./src/main.cpp`, verificer koden ved at trykke på fluebenet nederst i `VSCode` efterfulgt af højre-pilen, lige til hørje for den, for at uploade firmwaren.

Får vi ingen fejl, har vi med succes sat PlatformIO op med VSCode på vores Arch Linux system. Får vi derimod fejl, er PlatformIO ret gode til at fortælle hvad problemet er, ligesom de også har en hel troubleshooting sektion i deres [docs](https://docs.platformio.org/en/latest/core/installation/troubleshooting.html).

## Dokumentation

Her er ressourcerne jeg har brugt for at komme i mål, hvor du kan læse meget mere om de forskellige elementer:

**PlatformIO Docs:** [platformio-cli](https://docs.platformio.org/en/latest/core/index.html), [PlatformIO Code Examples](https://github.com/platformio/platformio-examples)  
**Arch Wiki:** [Visual Studio Code](https://wiki.archlinux.org/title/Visual_Studio_Code), [Arduino](https://wiki.archlinux.org/title/Arduino), [Arduino/PlatformIO](https://wiki.archlinux.org/title/Arduino#PlatformIO), [udev](https://wiki.archlinux.org/title/Udev), [Flatpak](https://wiki.archlinux.org/title/Flatpak), [Aur Helpers](https://wiki.archlinux.org/title/AUR_helpers)
