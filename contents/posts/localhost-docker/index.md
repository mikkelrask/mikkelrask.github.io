---
title: "🐳 Lokal startside med Docker"
description: "Hvordan du spinner en lille docklet op, med en HTTP server via Docker"
date: 2020-11-12
image: "./docker.webp"
updated: 2023-03-04
tags:
  - docker
  - alpine
  - nginx
  - self hosting
---

Jeg bruger meget af min fritid på diverse subreddits, og en af dem jeg besøger ofte er [r/startpages](https://reddit.com/r/startpages).

For at gøre det meget kort, ville jeg hoste en lille webserver på min laptop, til min egen startpage, og valgte at benytte docker til at køre min nginx server i en container.

### Lav en mappe til dit projekt

Sørg for at dine HTML fil(er) placeres i denne mappe. Bruger du en static site generator, kan denne mappe eks være din `public` build folder.

### Opret Dockerfile

Vi skal have oprettet en Dockerfile. Hvis ikke du kender Dockerfile, så er det en simpel instruktions-fil der bruges til at bygge din container, ud fra hvad den kommer til at kræve, ift dens funktionalitet. Filen skal således inde holde hvilket docker image vi vil hente, hvilken mappe vi vil _serve_ og hvor på i containeren system `nginx`'s default public-mappe er placeret.

**Kommando**:

```bash
echo FROM nginx:alpine\nCOPY . /usr/share/nginx/html > Dockerfile
```

Vi `echo`'er simpelthen hele Dockerfilen's content ind, med denne simple _one-liner_, der efterlader os med en ny fil kaldet `Dockerfile` der ser således ud:

```Docker
FROM nginx:alpine # Fortæller vi skal bruge nginxs docker image, mere specifikt skal vi bruge udgaven der er bygget på alpine linux
COPY . /usr/share/nginx/html # Her kopierer vi hele indholdet af vores nuværende mappe, til /usr/share/nginx/html i selve containeren
```

### Build dit docker image for serveren

Med en Dockerfile til at fortælle, hvordan vores container skal bygges, er det lige præcis dét vi skal nu.

**Kør denne commando**:

```bash
docker build -t html-server-image:v1 .
```

Du kan kalde din container lige præcis hvad du har lyst til, her har jeg helt simpelt kaldet min for `html-server-image` og som ses efter kolon, er det i version 1: `v1`. Begge disse værdier kan du sætte 100% som du har lyst, men afviger du fra normal konventioner, ender du hurtigt med apps der kører version: `final_final_1.69.420!` eller hvad ved jeg.

Docker bekræfter hvis alt er bygget successfuldt, men du kan selv bekræfte, med kommandoen `docker images` og se om `startpage-i-stole-somewhere:final_final_69.420` eller hvad end du navngav din egen container, er repræsenteret på listen.

### Kør dit nybyggede image

Hvis alt gik forventeligt, så mangler vi faktisk bare at til slut fortælle Docker at containeren skal aktiveres. Det gør vi med kommandoen:

```bash
docker run -d -P -p 80:80 html-server-image:v1
```

Igen, hvor `html-server-image:v1` varierer alt efter hvad du kaldte din container. `-d` sørger for at køre containeren daemonised, dvs at du ikke får outputtet i terminalen hvor du kører kommandoen, akkurat ligesom containeren heller ikke lukkes, når terminal sessionen afsluttes. `-P` fortæller Docker at Docker selv må finde ud af hvilke porte der skal have hvilke portnumre, men specificerer med `-p 80:80` at vi selv vi have magten over port `80` på vores host skal matche port `80` i vores containeren. Dvs. når jeg på min laptop besøger `localhost` sendes min request nu til min container, der så sender mit lokale website retur.
