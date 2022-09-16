---
title: "🐳 Lokal startside med Docker"
description: "Hvordan du spinner en lille docklet op, med en HTTP server via Docker2"
date: 2020-11-12
tags:
  - docker
  - alpine
  - nginx
---

Jeg bruger meget af min fritid på diverse subreddits, og en af dem jeg besøger ofte er [r/startpages](https://reddit.com/r/startpages).

For at gøre det meget kort, ville jeg hoste en lille webserver på min laptop, til min egen startpage, og valgte at benytte docker til at køre min nginx server i en container.

### Lav en mappe til dit projekt

Sørg for at dine HTML fil(er) placeres i denne mappe. Bruger du en static site generator, kan denne mappe eks være din `public` build folder.

### Opret en fil kaldet Dockerfile

Filen skal inde holde hvilket docker image vi vil hente, hvilken mappe vi vil serve og hvor på vores system nginx er placeret.

**Kommando**:

```bash
echo FROM nginx:alpine\nCOPY . /usr/share/nginx/html > Dockerfile
```

### Build dit docker image for serveren

**Kør denne commando**:

```bash
docker build -t html-server-image:v1 .
```

Docker bekræfter hvis alt er bygget successfuldt, men du kan også tjekke status med kommandoen `docker images` og se om `html-server-image:v1` er repræsenteret.

### Kør dit nybyggede image

```bash
docker run -d -P -p 80:80 html-server-image:v1
```

Nu kører dit docker image i baggrunden og du kan se din hjemmeside i en browser ved at besøge `localhost` via enhver browser.
