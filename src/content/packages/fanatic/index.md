
---
title: FANATIC!
description: En "fanside" der viser data en små-analyserer lyttehistorikken for 500+ episoder af Henry Rollins' ugentlige radioprogram på KRCW Santa Monica radiokanalen. 
date: 2026-05-15
update: 2026-07-12
type: website
language: svelte
image: ./screenshot.png
github: https://fanatic.raske.xyz
---

Visualisering og opsummering af over 500 episoders rock historie. Henry Rollins har et ugentlig radio program, hvor siden her viser ugens track lists og beriger data fra forskellige kilder. 

Lavet for sjov, efter at have lagt mærke til at Hr. Rollins hørte og spillede en del Sort Sol, hvor man som dansker jo ikke kan lade vær med at lade det stige en til hovedet. Jeg byggede en scraper der hentede dataen, til at nemt lave en lokal Henry Rollins playliste af det musik i mit musikbibliotek, der overlapper med plays i hans program, og selvfølgelig at bevise at Henry Rollins elsker Sort Sort - det viste sig at ikke være ligeså højt som jeg følte (igen pga. mit dansker-bias), men så kunne jeg jo rode med skøre tal og selvopfundne *metrics* at måle på, som fx et **Rollins Love Index** også kaldet et **RLI**. 

Henter artist/band information fra [Musicbrainz](https://musicbrainz.org) og beryger yderligere med genrer og månedligt lytterantal via [Last.fm](https://last.fm) og deres officielle API'er.
