---
title: "🫡 confirm"
description: "Lille bitte script til at bekræfte handlinger eks via dmenu"
category: 
  - Udvikling
date: 2020-09-14
update: 2022-09-14
tags:
  - shell
  - linux
  - dmenu
image: "./confirm.webp"
series: "Bash"
---

## confirm %question% %command%

Dette lille bitte shell/dmenu script er lavet til at tage to argumenter; det første er hvad vi vil promptes, altså hvad vi skal "confirm". Den næste er selve kommandoen vi skal køre, hvis vi bekræfter prompten med "yes".

En god usecase kunne være måden jeg selv bruger det på, som er til at bekræfte at jeg vil lukke min computer ned. Jeg benytter en custom window manager, hvor basicly alt er skræddersyet til mit eget workflow, og her er keybinds/shortcuts alfa omega. Trykker jeg på shift+super(windows key)+x har min computer altid bare lukket ned. Kommer man dog til det utilsigtet, lukker computeren bare ned, og alt der ikke er gemt, eller kun gemt i bufferen nu væk.

Derfor har jeg nu lavet min keybind om til at køre confirm scriptet således:

```bash
confirm "Do you want to shut down?" "shutdown now"
```

hvilket åbner dmenu med prompten _"Do you want to shut down?"_, og skriver jeg yes (eller blot dele af ordet) og klikker enter køres kommandoen shutdown now, som lukker computeren.

## Script:

```sh
#!/bin/sh
[ $(echo -e "No\nYes" | dmenu -i -p "$1") == "Yes" ] && $2
```

Direct download:

`curl https://raw.githubusercontent.com/mikkelrask/scripts/master/confirm -o ~/bin/confirm && chmod +x ~/bin/confirm`

Github: [github.com/mikkelrask/scripts/](https://raw.githubusercontent.com/mikkelrask/scripts/master/confirm)
