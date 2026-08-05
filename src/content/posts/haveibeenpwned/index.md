---
title: "haveibeenpwned.com - er dit password lækket?"
description: "Lad os teste om din adgangskode er blevet lækket - men på en lokal og sikker måde!"
category:
  - "Sikkerhed"
date: 2019-07-24
image: "./hibp.webp"
update: 2021-05-01
tags:
  - passwords
  - shell
  - haveibeenpwned
---

## haveibeenpwned.com

Servicen haveibeenpwned er mere relevant end nogensinde før, og kendskaben til dem og lignende services stiger heldigvis stødt. Med så godt som daglige leaks af hundredetusindevis, nogle gange millioner af passwords af gangen, er deres database blandt de største offenligt tilgængelige ressourcer med lækkede passwordinformationer.

Men mange jeg møder ser og tror både konceptet og servicen som værende en del grunden til vi er her til at start med. "Ja, det er godt du, så indtaster jeg min adgangskode der, og så går der 2 uger, så får jeg en mail om at min adgangskode er lækket, og de vil sælge mig et eller andet. Hvor det sikkert i rigtig mange tilfælde er korrekt, er det det bare ikke lige her. Troy Hunt der ejer siden sælger nemlig ingen produkter - han anbefaler dog at man benytter en password manager, og hans bedste bud er 1Password, som han selv benytter, og har lidt reklameplads for på siden. Han fortæller ligeledes gerne om hvorfor hans valg blev 1password, det kan du læse her.

Og hvor mange argumenterer at det ikke hjælper på situationen at have sådan et offenligt opslagsværk, vil rigtig mange ligeledes argumentere at dem der vil misbruge den her type information allerede har informationen tilgængelig, og det at vi andre almindelige mennesker ved, at de ved det, kan få os til at ændre vores usikre adgangskoder før det er for sent.

## Jamen skal jeg så bare indtaste min adgangskode i et tilfældigt input felt på internettet?

Generelt set, så nej. Slet ikke, nej! Men lige haveibeenpwned er måske lidt anderledes. Måden deres API fungerer på er nemlig på en ret sikker måde. Før noget som helst sendes til nogen server hashes dit indtastede password med SHA-1, og API'en, der kører i browseren, sender kun de første frem cifre til serveren, der så herfra returnerer samtlige hashed resultater af plaintext passwords. For det andet, behøves du ikke engang at indtaste noget i browseren, du kan gøre processen mere eller mindre manuelt, men i meget få skridt.

For at gøre selve processen mere transparent, kan vi nemlig selv gøre arbejdet via vores terminal, hvor det "beskidte" arbejde foregår lokalt på vores computer. Vi skal stadig sende de første fem cifre, men her kan du både se, og selvfølgeligt kontrollere at der ikke sendes andet data med, end fem cifre ud af fyrre, fra en obskur krypteret adgangskode. Når man sætter det sådan op, er jeg personligt i hvert fald mere sikker ved at gøre det.

Så det første vi skal er at have SHA-1 summen af vores password. Det fikser vi med kommandoen

` echo -n "#DINADGANGSKODE" | openssl sha1`

.
Vigtigt er her, at du starter kommandoen med et mellemrum, så vil den (inkl din adgangskode) nemlig ikke gemmes i din terminal historik! Så ja. Start enten kommandoen med et mellemrum, eller slet selv linjen manuelt i historikken efterfølgende.
Men når vi kører kommandoen giver den os et output a la (stdin)= 21e275ddbde642da0091919a104f38614d0e9a37 hvilket er lige præcis det vi skal bruge - ret simpelt.

Nu har vi hashen, som man siger, og med kommanden

`curl https://api.pwnedpasswords.com/range/DINHASH > beenpwned.result`

(hvor du udskifer DINHASH med de første 5 cifre af din egen SHA-1 hash) tjekker vi hele haveibeenpwneds database for alle hashes der starter med DINHASH, og sikrer samtidig at vores adgangskode aldrig forlader vores computer. Prøver du selv, vil du se at vi får ret så mange resultater tilbage, så der er derfor ikke rigtig nogen grund til at være nervøs for at koden vil kunne identificeres den vej igennem. Curl funktionen henter hvad end respons den får fra adressen vi indtaster og outputter den på skærmen, men med >-tegnet "kaster" vi det output over i endnu en ny tekstfil; beenpwned.result

Herfra kan vi med så godt som en hver text editor søge efter de resterende 35 cifre af vores hashet password. Troy Hunt og hans Have I Been Pwned team har nemlig fjernet de første 5 cifre alle hashes, så vi (og de) selvfølgeilgt først og fremmest sparer den smule datatrafik, men også så der sendes komplette hashes, selvom vi selvfølgeligt arbejdet med SSL forbindelse. Det er en super god tankegang, især da vi jo i hvert fald har tænkt os at gemme dataen som fil.

Da vi allerede har terminalen åben søger jeg i resultatsdokumentet ved at skrive

`grep "5ddbde642da0091919a104f38614d0e9a37" beenpwned.result`

der i mit tilfælde gav et hit. Jeg brugte i øvrigt koden sommer2019 - et trick jeg har lært af Christian Dinesen, som jeg tror vil være glad for at vide, at resultatet var kun en enkelt læk

Din grep kommando skal selvfølgeligt indeholde de sidste 35 cifre af din egen hash, ikke min.

Når du har bekræftet hvorvidt din egen hash er til stede, kan du med fordel slette de downloadede resultater med rm beenpwned.result- så ligger de da ikke og flyder.

Men det er altså den l33t måde at tjekke om dit password er blevet lækket, 100% uden selv at lække din adgangkode i processen.

Var din adgangkode lækket, så skift det endeligt hurtigst muligt, og læs evt. mine anbefalinger ift. passwordgeneration her
