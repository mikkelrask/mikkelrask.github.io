---
author: "Mikkel Rask"
date: 2023-12-12
title: "Hvordan jeg håndterer over 3200 keys med oversættelser på 5 sprog i Rackbeats webapp"
description: "I en målrettet handling, for at minimere antallet af Excel ark og velmenene Word dokumenter med oversættelses-rettelser i min chefs indbakke, har  jeg håndterer keys og oversættelser for 5 sprog på Rackbeat. Her går jeg igennem processen, at få styr på oversættelser for små 3300 translation keys, og dertilhørende oversættelser for 5 sprog. Vi håndterer det den open source platform Tolgee."
category:
  - Selfhosting
image: "./meta.jpg"
tags:
  - self hosting
  - open source
series:
  - "Selfhosting"
---

**Click-bait-disclaimer** _Jeg_ håndterer ikke _noget som helst_ på **fem** sprog - men her er lidt om hvordan det lykkedes mig at crowd-source opgaven, og får hjælp af Nordens ledende ERP systemer, og hvordan det er gået! Og det fede? Det var 100% gratis!

Jeg pådrog opgaven af mig selv, i en blanding af en målrettet handling for at minimere antallet af Excel ark og velmenene Word dokumenter med oversættelses-rettelser i min chefs indbakke, og som en slags personlig udfordring efter firmaets CTO Lasse, der på daværende tidspunkt var bosat i Kuala Lumpur over Slack skrev _"jeg giver en øl i lufthavnen, hvis du ka' løse dén!"_ - og tilfældigvis, var i færd med at flytte tilbage til danmark. Hm, en teknologisk udfordring, med en frist? Kan jeg mon nå det, inden han ankommer i Danmark, og faktisk fange ham i lufthavnen til en øl? Det lugter af _hyperfixation time!_

## Udgangspunktet

Hvis du nogensinde har håndteret eller bidraget til oversættelser af en app eller et website, så ved du også at det typisk er noget med et regneark eller word dokument, i 17-18 forskellige udgaver, fordelt ud over 6-7 kollegaers bærebare, uden nogen nødvendigvis konsensus om termonologi, _tone of voice_ eller hvor dybdegående en given tekst behøves at være.

Da jeg startede i Rackbeat's customer success afdeling, var det ikke meget anderledes. Vores sheet lå dog på et Google fællesdrev, men i det store hele meget lig.

Rackbeat, som er et ret komplekst lagerstyringssystem - et kæmpe projekt, med adskillige integrationer og tillægspakker, på, dengang 4, nu 5 sprog havde på ingen måde brug for at blive mere indviklet. Men bl.a pga. måden som oversættelserne var startet ud på, virkede dét at ændre på arbejdsgangen både uoverskuelig, og som én af de dér _"ikke lige nu"_-tickets, der tit ender som den dårlige samvittighed, dér nederst i _backlog'en_, uge efter uge.

Rackbeat webapp'en har, som mange andre projekter sit _base language_ som Engelsk af hensyn til udviklingen. Og på et tidspunkt tidligt i projektets alder, var der pludseligt oprettet eks. én key der hedder "Customer" og én der hed "Invoice". Når man så faldte over et sted, hvor man skulle bruge "Customer Invoice", giver det så ikke mening at i selve UI'et, blot fetche først `key1` og så `key2`?

### Kunde Faktura

Lad os hurtigt prøve det samme på Dansk.. "Kunde Faktura". Ser lidt forkert ud, ikk'? Det er det også. Begge ord er selvfølgelig 100% korrekte, men Danskere har **brug** for at ordene står side om side, helt tæt. Ellers bliver vi i tvivl om, der er tale om en kunde og en faktura, og der bare er glemt et komma, eller om det er noget helt trejde.

Men altså vores keys fungerede altså som en slags ordbog. Jeg begyndte nu at forstå hvad jeg var oppe imod.

### Termonologi

Yderligere så... En knap "Save", en anden "Remember Settings". Nogle med stort forbogstav, nogle med et punktum til slut. Vi kender alle klassikerne - _it happens_ 🤷‍♂️
![](./1.png)  
Så! Jeg skulle bruge en plan. For at øge mine chancer for at få et "ja" til at implementere _noget som helst_, der krævede udviklingstimer, skulle det være strømlinet ligesom det både skulle inkludere en her-og-nu-løsning (kaldet _lappeløsningen_, eller _skumslukkeren_), samt en langsigtet-plan (læs: _this brings me joy_-løsningen). Og den løsning skulle jeg finde og bevise var det rigtige, helst ogsså uden at have et dankort op af lommen - jeg var trods ikke engang nået ud over min prøveansættelse, og i øvrigt også ansat i kunde-service, så jeg følte det var for tidligt at spørge efter firmaets Pleo-kortet som Kirsten typisk vogter over.

### Succes Criteria

Så jeg skulle jo definere hvad ønskescenariet ville være, og indkaldte vores QA, som eneste faktiske repræsentant fra tech (da vores CTO som tidligere nævnt boede i Malaysia) og vores fælles chef til en snak, hvor vi kortlage at ønskerne var følgende.

1. Et specialiseret lokalitets-værktøj, der kan fungere med vores PHP backend - _alternativt_ via vores frontend som er Vue, men ville kræve en større omstrukturering
2. Give nem brugeradgang til samarbejdspartnere og _native speakers_ for vores supporterede lande
3. Minimere udviklertid, på at fikse indberetninger af manglende eller forkerte strenge
4. Minimere Customer Succes Supporteres tid
5. Give et live overblik over status på et hvert givent tidspunkt
6. Automatisere så "meget som muligt" (vagt defineret kriterie, _i know!_)
7. Evt. Machine Learning/Ai-Translations\* (_Question mark?_)

Rigtig meget af det her var ude af scope på mine egentlige arbejdsopgaver - som supporter, hvor jeg vel at mærke blot var 1,5 mdr. inde i min prøve-periode. Men jeg fandt på noget med at _"det vel også var at hjælpe vores kunder på?!"_ Her henvises til pkt. 4.

## Research

Det tager ikke mange Google søgninger på noget som helst omkring lokalitetshåndtering, før man er helt med på, at **lokalise** er _the big cheese_. De kræver så også at man har _big cheese_ til dem, til hver den første.
![](./2.png)  
Jeg er jo, til trods for at jeg arbejder for en _true cloud/API First_ software virksomhed, stor fan af "self hosting" og meget bevidst om hvad man kan få _for free_ (both as in "free beer", and "freedom", yes). Og så kan man jo også _self hoste i skyen_. Og det ender vi også med at gøre her!

For jeg søger jo selvfølgeligt på, hvad jeg nemt kan spinne op i en container, og teste af på min homelab server eller VPS, hvor jeg bla falder over [Tolgee](https://Tolgee.io).

Tolgee er open source - en af de open source firmaer, der stadig har en forretningsmodel, i at levere et solidt software og hoster det og supporterer dig i det fra _a_ til _b_! Men også guider, hjælper og assisterer hvis man hoster sin egen - noget de altså ikke tager penge for!

I matrixen herunder, var nogle af de key selling points, der gjorde at vi gik med Tolgee - github integration var umiddelbart ligegyldig, lidt ligesom notifikationer var det noget vi er i stand til at selv webhook'e os ud af i en Github action eller lign.. Her var _the winning lottery numbers_ hhv. **Unlimited number** of keys, og **Unlimited number of seats**. Love to see it!!

| Feature                                            | Localazy  | Lokalise  | Laravel Translation | Tolgee    |
| -------------------------------------------------- | --------- | --------- | ------------------- | --------- |
| Price model                                        | 49 USD\*  | 120 USD\* | Free                | Free      |
| Number of keys                                     | 3500      | 5000      | Unlimited           | Unlimited |
| Number of seats                                    | Unlimited | 10        | Unlimited           | Unlimited |
| Price per additional seat                          | No cost   | 14 USD/mo | No cost             | No cost   |
| Screenshot context                                 | ✅        | 🛑/✅     | ❓                  | ✅        |
| Textual context                                    | ✅        | ✅        | ❓                  | ✅        |
| Translation Review                                 | ✅        | ✅        | ❓                  | ✅        |
| Languages                                          | Unlimited | Unlimited | Unlimited           | Unlimited |
| Notifications (Slack, email, zapier, webhooks etc) | ✅        | ✅        | ❓                  | 🛑        |
| Vue library                                        | ✅        | ❓        | 🛑                  | ✅        |
| API/CLI/SDK                                        | ✅        | ✅        | ✅                  | ✅        |
| Github Integration                                 | ✅        | ✅        | Not needed(?)       | 🛑        |
| Figma/Design tool Integration                      | ✅        | ✅        | 🛑                  | ✅        |
| Google AI Translate Integration                    | ✅        | ✅        | 🛑                  | ✅        |
| Figma/Design tool Integration                      | ✅        | ✅        | 🛑                  | ✅        |

### Machine Translation?

Ud at dømme fra matrixen, var det Tolgee eller bust. Jeg **ville** have det til at lykkedes. Loggede ind på portainer, og satte tolgee op i docker. 2 minutter senere, kunne jeg sidde og oprette keys, redigere deres strings, for alle de sprog jeg havde lyst til, så jeg skyndte mig at oprette en Google Translate API nøgle, for at se hvordan dét fungerede. Jeg vidste jo at alt "AI" var for _buzz word-y_ for tiden, til at det var gratis, men ved jo at man får de første fix gratis af Google Translate, så det blev den!

Men som Support medarbejder i et Visma ejet firma, med en Visma email, får man altså ikke bare lov at oprette projekter på Google Cloud Console - huh! Jeg var en blanding af forarget og frustreret over tanken "hvad havde du _selv_ regnet med?" da jeg klikkede på opret og fik beskeden "Din organisation tillader ikke denne handling"

Men jeg oprettede det jo så bare på min egen Google konto, jeg er jo kun nået til at teste det hele, som et proof of concept. No biggie...

Her var det således første gang i processen der var et dankort oppe af lommen. Google skulle bare have mine digits, _just in case_, men de er jo gavmilde og giver de første 10.000 karaktere gratis hver måned, for oversættelser, og da vi jo trods alt _har_ oversat langt størstedelen af appen, og det mest af alt drejer sig om at strømline det, er det gratis antal mere end rigeligt! _And more on that - later!_

### Nem brugeradgang for partnere

Da jeg var inde på Google Cloud Console, tænkte jeg også at både Rackbeat og Visma bruger GSuite, og GMail, og det derfor var oplagt at oprette en Sign in with Google API nøgle også. Og yderligere, da det ikke var noget der skulle være customer facing, eller public tilgængeligt i det hele taget, kunne jeg endda bare lave Google Login'et som et "test-login under udvikling", hvor jeg nemt både kunne styre brugeradgang via whitelisting af "testere" samt slippe uden om Googles lange app review, når man udgiver noget officielt der involverer et Google login.

### Automatisk oversættelse

Som jeg allerede løftede sløret for, tog jeg chance, da jeg greb mit efterhånden mat-sorte Lunar-bank betalingskort op af lommen i arbejdsøjemed. For vi havde jo fået systemet op og køre, og alt var godt. Hvad jeg ikke vidste, var dog - at så længe man i Tolgee havde signaleret at man ønsker automatisk oversættelse, så er det ikke nødvendigt at bekræfte hvilken machine translation man ønsker udført - du får bare for de _providers_ du har aktiveret.

Vores fantastiske nord markedonske udvikler Andrej førte samtlige keys over i vores _base language_, som vi havde planlagt og aftalt. Ikke mange dage går der, før end der er en mail fra Google med emnet: **Din regning er klar**. PANIK!

Tolgee var gået i krig med at oversætte _samtlige_ strings, til _samtlige_ keys - med rystende hænder, fik jeg åbnet PDF for det, der havde akkomuleret sig op på 21.000 oversatte karaktere - 11.000 flere end de gratis som Google jo tilbød: $2.10 - To dollars og ti fucking cents. PHEW! Dét er okay, venner, **jeg betaler denne gang**! 😤

### Generel automatisering

Den øvrige automatisering er helt klassisk - først var vi ude i om vi skulle bruge webhooks til at notificere fx en slack kanal oprettet til formålet, men vi (dvs. Andrej!) havde allerede lavet et andet flow, til _udviklerne_, der når de eks. opretter en PR, bliver de promptet om hvorvidt koden i PR'et indeholder nye keys - Svares der ja, så triggers der en sync af de keys der er på den givne udviklers branch, op og oprettes som keys i vores lokale tolgee instance, og kunne jo så passende bruge samme action, til at lade en bot vide, at den skulle lave lidt larm for de nye keys, i vores #translations-slack-tråd.

## Konklusionen - how did it go?

Indtil videre er konklusionen at den kortsigtede plan, måske gik hen og gå så godt, at det nok lidt måske også blev den langsigtede plan - at implementere de biblioteker som Tolgee har udviklet til hhv. vores frontend (vue) eller vores php-bagende, virker fortsat som en stor opgave 5 år inde i udviklingen, og jeg tror at den nuværende implementering fungerer så godt, at der bliver lange udsigter til at bruge mere krudt på det, bliver en ting - men nu må vi se!

Umiddelbart så har alle der indtil nu har bidraget eks også kendt webapp'en godt nok til, at de ting, som Tolgee bibliotekerne ville tilbyde af ekstra kræs, (eks. nem screenshot funktionalitet + tilføjelse af kontekst til nyoprettede keys + Cli Tool), ikke umiddelbart har været nødvendig.

Ud af de små 3300 keys, blev **800 keys** udfyldt eller rettet på vores Finske version den første dag hvor Netvisor havde adgang (Shout out to Sami, for that! 🙏), Norge og Sverige, begge versioner var væsentlig bedre oversat til at starte med, fik hver et sted imellem 250 og 300 keys udfyldt/rettet til den første dag ligesom der i demonstrationen af det hele også blev reviewet omkring 1000 keys, der blot skulle verificeres af en _native speaker_.

### Dokumentation

Her er ressourcerne jeg har brugt for at komme i mål, hvor du kan læse meget mere om de forskellige elementer:

**Tolgee Documentation:** [Tolgee](https://tolgee.io/), [Rest API Docs](https://tolgee.io/api)  
**"De andre":** [Localazy](https://localazy.com/), [Lokalise](https://lokalise.com/), [Laravel Translations af Mohammed Ashraf](https://github.com/MohmmedAshraf/laravel-translations)

#### Fod note!

Tolgee's Open Source team har efter jeg delte artiklen rakt ud til mig, for at nævne, at deres open source version _ikke_ længere har _unlimited seats_ som jeg ellers skrev, men at de nu tilbyder 10 gratis pladser, og har en ny prismodel dérfra. Det lovede jeg dem selvfølgelig at lige gøre OBS på. Hele min erfering med projecktet og platformen har dog været som det er berettet ovenfor, og at det er vigtigt for dem, at være repræsenteret korrekt er vigtigere for dem, end en information, som ikke længere er korrekt, men som ellers lyder bedre, synes jeg siger meget om hvad for en type virksomhed der er at tale om. 🙌 Yderligere så lærte jeg, at skal Tolgee eks. bruges til et open source projekt, er de også til at tale med ift deres prisplaner!
