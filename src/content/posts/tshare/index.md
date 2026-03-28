---
title: 🧑‍💻 Host din egen tshare backend
description: "Hvad er tshare, og hvordan får du en lokal backend API op og køre? Læs med, hvordan vi gør det med docker eller docker compose."
category:
  - Udvikling
  - Selfhosting
date: 2025-04-14
updated: 2025-04-14
draft: false
tags:
  - docker
  - self hosting
  - scripts
  - projekt
image: ./tshare.png
series:
  - "Video blogs"
  - "Selfhosting"
---

Hvis ikke du allerede kender `tshare`, er det måske fordi det er en _bash script baseret terminal-output-deler_ som jeg umiddelbart vil sige at jeg _[vibede]()_ mig til ... sådan i går-agtigt.

![*not me vibing with Claude*](https://media1.tenor.com/m/FwHwvSFw8FAAAAAd/simpsons-bart-simpson.gif)

Så det er fair nok, hvis ikke du gør - så før vi går i gang med hvordan du rent faktisk får din _bagende_ op og køre, skal vi nok lige gennemgå hvad `tshare` er, hvad det fikser, og _hvorfor_ man skulle have lyst til at hoste selv - [klik her](#tldr) hvis du bare vil _skip dialogue_ og gå til dit _main objective_...

## 📜 tshare: origins

Egentlig ville jeg oprindeligt bare brainstorme lidt med min buddy [Claude Sonnét III](https://claude.ai), efter at have set en artikel/blog omkring [termbin](https://termbin.com). En online service til at dele terminal output via sin browser.. Noget der kan være mange forskellige grunde til at ville.. Men jeg var knapt så imponeret over hvordan man skulle bruge det

Så uden at det på nogen måde skal blive til bashing af `termbin` eller noget som helst minder om, så kunne jeg ikke lide at deres service (vigtigt at notere at deres (100% gratis!) produkt er selve den online service, og ikke ligesom mit lille projekt her en blanding af en cli applikation _og_ en service) afhang af at man brugte NetCat (\`nc\`) og for at skulle dele sit output skulle _pipe_ sin kommando ind i `nc` med `terminbin.com 9999` som serveren.

**Eksempel på et** `termbin` **kald:**

```sh
uv run main.py | nc termbin.com 9999
```

Min tanke var, at mange der eks. søger hjælp online til troubleshooting eller på anden vis bare har brug for at dele noget output, sikkert ikke har netcat installeret og måske synes at syntaksen som `termbin` benytter sig af virker "overvældende", med brug af både specialtegn, tal og hvad har vi.

_I know, I know_ - jeg hører dig allerede pointere at de samme personer selvfølgelig heller ikke har `tshare` installeret, men hey - måske installerer _du_ det 🤷

Men anyway var det som nævnt fx for at finde ud af, om det bare var folkene bag `termbin` der havde nogle personlige `netcat`-kinks, eller om der rent faktisk var en eller anden mega åbenlys ting der gjorde det til den logiske rute at gå for sådan et projekt, som jeg bare ikke kendte til 🤔

### Man ved ikke hvor meget man ikke ved...

Hvad ved jeg, det kunne være at det var en kæmpe fordel ved kommandoer med ekseptionelt langt output, _long-running processes_ eller hvad ved jeg, at `nc` virkeligt ville _shine_ - jeg har meget begrænset _first hand_ erfaring med den 30 pr gamle teknologi, så det var de her spørgsmål jeg forsøgte at finde svaret på..

### _🗣️ Plain vanilla..._

Min anden _gripe_ med `termbin` var noget mere overfladisk, og samtidigt nok ikke noget jeg egentlig havde brug for at brainstorme med Clauey om - siden man ser sit output på på termbin.com var det jeg kalder _apache http styling_: hvid baggrund med en default sort monospaced font.

Ingen syntax hightlighting fancyness eller _nothing_ - Så ja - jeg var nok som sagt mere imponeret over deres idé, end deres faktisk udførsel.

Også selvom jeg udmærket ved at [pastebinit](https://github.com/skorokithakis/pastebinit) eksisterer og nemt kan installeres på alle mulige forskellige systemer og distros, og gøre akurat det samme som `tshare` men med pastebin.com som "backend", er jeg ligeså bevidst om hvor nemt det faktisk er bare at _pipe_ outputtet af en kommando ind i eks. `wl-copy`, `xclip` eller macos' indbyggede `pbcopy` - med andre ord - proppe outputtet in din udklipsholder. (_eks:_ `uv run main.py | wl-copy` _- boom 🤷🤯)_.

Man kunne nemt argumentere at det ville være mindst ligeså nemt, som at bruge `tshare` hvor man så afhænger af én eller anden random dudes vibede API og hvad ved jeg - men jeg mener stadig at hvor nemt outputtet er at dele, herfra stadig afhænger af hvor man skal dele det, hvor man på nogle sider skal wrappe kodeelementer i tripple backticks `````````, andre med `<pre></pre>`og nogle`[code][/code]` og hvad vi ellers har af variationer for at beholde formatteringen af vores output.

## _⚡ "Det går nemlig' hurtigt..._"

_lo and behold_ - Claude fucker ikke rundt og var _ikke_ klar på at brainstorme, eller spilde tid på at uddybe `netcat` selling points..!

![10x audhd developer](https://avatars.githubusercontent.com/u/4458174?v=4)
Som en ægte [_10x audhd udvikler_](https://www.youtube.com/watch?v=y6VJBeZEDZU) på dobbelt dosis ritalin, crack og koffein, sendte "han" mig blot følgende filer som sit svar:

```bash
├──server.js
├──package.json
├──tshare
├──public/
│   ├── index.html
│   ├── view.html
```

De fem filer der indeholdte **alt** hvad der var brug for, for at replikere funktionaliteten fra `termbin` og `pastebinit` - men med en pænere terminal syntax (synes jeg) og selvfølgeligt - [ricing](https://jie-fang.github.io/blog/basics-of-ricing) af dit output! 😎

Efter lidt [Göstas pingen-pongen](https://youtu.be/9ik8V0ZSSss?si=HQYyH1oyPttDv5bC&t=27) med Claude fik jeg det som jeg ville have det - og i sidste ende var størstedelen af vores frem-og-tilbage ift selve landing page designet og _wording_ på siden, mere end den faktiske funktionalitet..

### 🤷 Så hvordan foregår det

Lad os se på kommanden fra `termbin` eksemplet overfor, men med `tshare` _in da mix_ i stedet:

```sh
# termbin syntax
uv run main.py | nc termbin.com 9999
# tshare syntax
tshare uv run main.py
```

Ingen piping, port numre eller domæner - man prefixer vitterligt bare kommandoen man vil køre med `tshare`, og når kommandoen er færdig med at køre, populater den automatisk et delbart link i din udklipsholderen, klar til at dele på dit support forum, slack/teams eller hvad din use case nu er.  
Der er et par _flags_ man kan appende også - se dem [her](https://tshare.porgy-ruler.ts.net/6b4c81) eller ved at køre `tshare` uden yderligere argumenter.

### 🤔 Hvad sender `tshare`

Den sender dit output, sammen med lidt metadata til en simpel API, der returnerer det delbare link.

**Af det metadata der sendes til api'et er der:**

- Kommandoen som outputtet stammer fra, inklussiv alle argumenter (i.e \`uv run main.py\`)
- Hvor på systemet kommandoen er kaldt _(Current working directory)_
- Maskinens hostname
- Specificeret syntax (Valgfri hvis du _invoker_ med `-s lang` / `--syntax lang` i.e `tshare -s python uv run main.py` )

### 😬 Jamen... Hvorfor sender du dog dét?! #bigbrother

Om det skal gemme dit `hostname` er jeg stadig lidt i tvivl om, da det ingen umiddelbart troubleshooting formål har, som jeg kan se - jeg tog det med, med tanken om at lidt replikere en terminal, på linket hvor outputtet bliver vist. Så det blev sådan lidt du ved... `user@hostname ~/bin $> neofetch` _hackerman_-agtig ..

Men jeg fx valgte at ikke tage brugernavnet med, af privatlivshensyn, men igen.. _in the end_ så er det her lavet til _mig_ og ja.. Det kan sagtens ske at jeg også fjerner _hostname_ som default - det kan også sagtens være at jeg reintroducerer at dét at uploade brugernavnet... Hvem ved, det kan være man kan styre det via en conf eller via flag, det kan være jeg aldrig rør ved det her igen 🤷

**Download i dag, før tshare også bliver _enshitified_!**

Anyways, det var _the lore_ omkring `tshare`, hvordan det blev til, og hvad det prøver at løse - nu som lovet; hvordan man hoster sin egen backend!
// Best wishes and good luck -
[Story Lord](https://youtu.be/3Vo7c9gvVL0) out!

## 💥 TL;DR

Her går vi igennem hvordan du kører backenden lokalt med docker, og specificerer din server URL til `tshare`

### 1. Download `tshare` fra Github

Hent serveren og dens nødvendige filer i Github repoet, og `cd` ind i mappen

```bash
git clone git@github.com:mikkelrask/terminal-share.git tshare
cd tshare
```

### 2. Udspecificer dit Docker image

Opret en `Dockerfile` i mappen - bare brug din yndlings-editor, i.e med `code Dockerfile` og udfyld filen med følgende indhold:

```Docker
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci --only=production

COPY server.js ./
COPY public/ ./public
COPY tshare ./public/tshare
COPY pastes ./pastes

EXPOSE 3000

CMD ["node", "server.js"]
```

Det bruger `node:current-alpine` som base image, kopierer `package.json`, `server.js` og `public/` mappen der indeholder html siderne der viser outputtet, og eksponerer port `3000` i den endelige container, hvor kommandoen `node server.js` køres når man _up'er_ sin container.

### 3. Byg og kør dit Docker image

Når du har din `Dockerfile` klar kan du bygge dit custom image med:

```sh
docker build tshare .
```

og starte selve servicen med:

```sh
docker run -p 3000:3000 tshare
```

Du kan ændre den første af de to `3000`, hvis du har noget andet kørende på `localhost:3000`, hvor det er vigtigt at den anden `3000` af de to forbliver `3000`..

```sh
docker run -p 3010:3000 thsare
```

Du kan nu bekræfte at servicen kører ved at besøge `http://localhost:3000` in din browser, som nu gerne skulle vise `tshare` s landingpage eller hvis du vil blive i terminalen `docker ps` hvor `tshare-app` gerne skulle køre og PORTS kolonnen gerne skulle vise `3000/tcp`.

### 3. Alternativt kan du bruge `docker compose`

Som alternativ til trin 3, kan du efter at have specificeret din `Dockerfile` oprette `compose.yml` hvis du af en eller anden årsag foretrækker et docker compose setup - _i know I do!_

Som før kører du bare `code compose.yml` og udfylder følgende:

```yml
services:
  tshare:
    build:
      context: .
      dockerfile: Dockerfile
    image: tshare:latest
    container_name: tshare-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./pastes:/app/pastes
    environment:
      - NODE_ENV=production
```

En af fordelene ved denne approach er at json filerne der oprettes når du bruger `tshare` er mapped til din lokale `pastes/` mappe i projekt-mappen, således at næste gang du evt. rebuilder dit docker image, at dine tidligere pastes fortsat er tilgængelige.

### 4. Fix `tshare` API endpoint

Nu hvor du har servicen kørende lokalt skal vi faktisk bare sørge for at `tshare` sender dataen til den korrekte backend, frem for den default.

Den nemmeste måde ville være at tilføje `-u http://localhost:3000` til din kommando

```sh
tshare -u "http://localhost:3000" uv run main.py
```

Evt. via et shell alias (\`alias tshare="tshare -u "http://localhost:3000"\`) in din `.bashrc`, `.zshrc` eller hvilken shell du nu engang bruger.

#### 4.1. Mere permanent løsning

Ønsker du en mere permanent løsning, der ikke afhænger af den længere syntax eller hvilken shell du lige tilfældigvis er i, kan du - da `tshare` blot er et bash script - bare ændre selve server URL'en i scriptet.

Har du allerede installeret `tshare` klienten i din $PATH, åbner du nemt filen i din texteditor med eks:

```sh
code $(which tshare)
```

Har du _ikke_ installeret `tshare` in din path endnu, kan vi lige få gøre dét også, før vi åbner filen:

```sh
cp ./tshare ~/.local/bin
chmod +x ~/.local/bin/tshare
code ~/.local/bin/tshare
```

I scriptet skal vi blot ændre værdien værdien for `SERVER_URL` variablen der er somewhat øverst i scriptet, til adressen dit image er hosted på - som i vores eksempel var `http://localhost:3000`

```
#SERVER_URL="https://tshare.porgy-ruler.ts.net"
SERVER_URL="http://localhost:3000"
```

Bid her mærke i at der lokalt i 99.999% af alle tilfælde er tale om `http://` og ikke `https://` protokollen!  
Gem dine ændringer som du plejer med `CTRL+S` og så er du faktisk i mål.

Næste gang du _invoker_ en kommando med `tshare` vil du se at linket du får retur nu er til `http://localhost:3000/random-hex` frem for den default `https://tshare.porgy-ruler.ts.net` adresse som jeg hoster.

Og ja- [det var dét](https://www.youtube.com/watch?v=7-Yr1nQ3dFI) 🤷 Nu kan du dele dit output med alle der er på dit lokale netværk, eller blot have en lokal samling af outputs - du kan selvfølgelig også køre det på din homelab server, cloud VPS eller hvad ved jeg, og gøre tilgængelig via et faktisk domæne. Men det er her, at jeg tænker at hvis det er noget du ønsker, at jeg også tænker at du selv kan trinnene til at komme i mål herfra!

**Note:**  
_Jeg har blot taget udgangspunkt i at man har vscode eller cursor installeret og kan kaldes med_ `code`_- har du ikke det, kan du udskifte_ `code` _med enhver anden text editor -_ `nano` _er den mest udbredte editor, der samtidig er nem at komme ud af igen (`CTRL+X`) og prompter dig om du ønsker at gemme dine ændringer._

## Links og dokumentation

Som altid har du også her links til github repoet, og de ting jeg ellers referer til i indlægget. Har du spørgsmål, problemer eller forslag, er du mere end velkommen på repoets issues eller discussions, ligesom eventuelle `PR`s også er velkomne.

**Links:**

- [`tshare`/Terminal Share på Github](https://github.com/mikkelrask/terminal-share)
- [Termbin website](https://termbin.com)
- [pastebinit](https://github.com/skorokithakis/pastebinit)
- [pastebin](https://pastebin.com)
- [Claude Sonnét Portfolio](https://claude.ai)
