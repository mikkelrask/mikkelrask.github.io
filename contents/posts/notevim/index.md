---
title: "🗒️ nvim notetaker"
description: "Mit mini script til at nemt oprette en ny note for hver dag, og gå direkte til den med `mod+n`"
date: 2021-05-09
tags:
  - shell
  - scripts
---
Jeg skal blot klikke på `Win+N` på min bærbare, så åbnes mit notetagningsprogram med det samme og har oprettet dagens note, og givet den dags dato som filnavn og til slut, sat markøren klar til at skrive, lige under et time-stamp for, hvornår noten er oprettet. Simpelt!

Åbner jeg igen senere samme dag (fordi jeg er jo fyldt med gode idéer!), jamen så kommer der et endnu et timestamp, med markøren under, klar til at skrive.

Noterne har jeg så sat tid af til at én gang om ugen til at gennemgå, og evt. putte i en backlog/jira/notion board hvis de skal det, lave en reminder på min telefon, begivenhed i min kalender eller hvad ved jeg. 

Lyt evt. med her i [DR P1 podcasten Kortsluttet](https://www.dr.dk/lyd/p1/kortsluttet/kortsluttet-68), hvor de taler med Interaction Design Professor ved Aarhus Universitet, Peter Dalsgaard, om at *“udvide hukommelsen ved hjælp fra apps og digitale workflows”*, det er ret spændende på en perfekt nørdet måde.

``` bash
#!/bin/bash

noteFilename="$HOME/Documents/notes/note-$(date +%d-%m-%Y).md"

if [ ! -f $noteFilename ]; then
	echo "# Note for $(date +%d-%m-%Y)" > $noteFilename
fi

nvim -c "norm Go" \
	-c "norm Go## $(date +%H:%M)" \
	-c "norm G2o" \
	-c "norm zz" \
	-c "startinsert" $noteFilename
    ```