---
title: "🐧 Hvorfor jeg bruger Linux - når jeg kan"
description: "Gennemgang af generel kryptering, kodeordsstyrke på alle større platforme."
category:
  - "Linux"
image: "./why-linux.webp"
date: 2019-07-18
update: 2021-04-01
tags:
  - linux
---

## TLDR;

Perfomance og customization! Længere er den ikke. Nørden i mig elsker at tweake og customize, men altid med perfomance i øjemed. Linux lader mig lege lige så tosset jeg har lyst, og selv fra start af, er vi bedre stillet ift performance, end en standard boot ind i et stock OSX eller Windows. Jeg ejer en PC og en Macbook og nok ~10 raspberry pis, og samtlige maskiner har jeg installeret en eller anden form for linux på. Givet, min mac har stadig OSX og min PC en Windows partition, så ja, jeg siger jeg bruger Linux — når jeg kan, og det selvfølgeligt giver mening!

## Mac OSX

Jeg elsker macs og jeg elsker osx. Det er nemt, bekvemt og ting er lige der hvor jeg leder efter dem. Men jeg er, som rigtig mange andre, langt fra tilfreds med deres nyere serie af Pro’s. (Pinligt elendige) butterfly keys, dårlig ventilation og overophedning er blandt de flestes klagepunkter, men i det her indlæg er det mere selve styresystemets performance vi kigger på. Ligesom med Windows er MacOSX lavet til at passe til de flestes brug — endda til en vis grad også de fleste edge-cases. Fyldt med alle mulige godter, som du efter 10 års brug finder ud af, du har brug for meget meget meget lidt af. Og det er for de fleste rigtig fint, jeg ser bare ud over forværringe i deres design og hardware — hardwaren bliver selvfølgeligt bedre, men kan sagtens gå hen og yde (proportionelt, that is) dårligere, udelukkende pga. dårlig produkt-design. Set i lyset af at maskinerne stiger og stiger i pris, er det ikke længere noget jeg har lyst til at være del af. Hvilket bringer os til næste punkt…..

![asd](https://bgr.com/wp-content/uploads/2013/10/apple-logo-chest-fanboy.jpg)

## Windows 10

Nej. bare nej. Jeg har en Windows PC (intel i9 9900k, 32gb ram, RTX2070RTX 8gb) og jeg haaader det. Eller maskinen er jo vanvittig lækker, jeg hader sådan set bare at navigere i Windows. Jeg har i knapt et årti brugt macbooks, og som udgangspunkt været rigtig glad for det, men da valget pludseligt stod imellem en stationær workstation og en ny bærbar Macbook, synes jeg ikke engang det var et svært valg. Jeg har hørt meget godt om forbedringerne i Windows igennem alle mine mac-år, og var faktisk rigtig spændt på at se hvad de nu kunne. Mit valg var bare lidt forkert. Ikke så meget ift at vælge en workstation men mere det at jeg købte min workstation med NVIDIAs high end ray tracing grafik kort; 2070 RTX - uden at helt have styr på, at det understøttede Mac OSX altså ikke. Øv! — det gjorde jo så at jeg i det sidste halve år rent faktisk har måtte køre Windows 10 som min main mean machine, og ikke en dual/trippleboot maskine med hackintosh Mojave som hoved OS, som ellers først planlagt.

## Hvorfor så ikke bare skifte?!

Når nu jeg er så træt af Windows, og elsker Linux så meget, hvorfor så overhovedet beholde windows? Man kan ikke snakke om Linux fordele/ulemper, uden også lige at snakke lidt om hvordan Adobe ikke understøtter linux. Og hvor jeg jo straks lyder som alle kreative i historien der ikke er klar til at tage springet og bare skifte, så har jeg virkeligt ikke lyst til at miste Adobes programpakke. Jeg har alle dage sagt, at det ikke som sådan er Adobe der holder brugerne til Windows/OSX… det er alternativerne der får de fleste brugere til at holde sig væk fra linux! Og sådan er det til dels stadig. Jeg ved jeg bliver flamet for at bashe på GIMP, men helt ærligt. Det tåler virkeligt ikke rigtigt nogen reel sammenligning til den profesionelle appsuite Adobe har brugt årtier på at perfektere til os, og at diverse linux alt apps er “ved at være der”, hjælper ikke rigtigt noget — det har de været længe… Det er jo i hvert fald hvis du spørger mig. Jeg vil ultimativt rigtig gerne tage skiftet, men der findes simpelthen ikke et alternativ, godt nok.

## Performance

Min macbook pro er mildt sagt “af dato”, men den rocker stadig en 4 kernet i5–2415M processor (2.9ghz) og 16gb ram (tak Kasper!), hvilket stadig ka’ lidt af det hele. Maskinen er dog gået hen og blevet ret begrænset af sit logicboard; Apple supporter dem nemlig ikke længere, hvilket gør, som også tilfældet for mange andre macs, at den er fanget i en slags limbo, i dette tilfælde bedst kendt som OS X High Sierra. Andre stakler med ældre maskiner sidder fast i El Capitan.

Og hvor performance delen har egentlig ikke noget med hvad OSX version vi kører på, som sådan at gøre, men vi kan jo med garanti i hvert fald ingen performance updates få til maskinen fremadrettet. Så sådan som den kører nu, bliver kun værre i takt med at applikatonerne bliver tungere og tungere.

Men hvor om alting er, tager jeg i dag udgangspunkt i idle usage. Det siger måske ikke meget om ens maskines perfomance, hvor god en maskine er til at stå stille, men det siger lidt om forskellene på hvad der kræves for at køre et styresystem.

## TL;DR (for real denne gang!)

Når jeg booter ind i apple’s High Sierra har jeg allerede lige der allokeret 4gb hukommelse blot til at have styresystemet og diverse små daemons til at køre. Daemons er de små programmer der eks. automatisk slutter dig til dit wifi, sørger for at tænde computerens bluetooth og notificerer dig når du har opdateringer til dit software o.l. Forbrug: 4gb ram og ~20% af de 4 kerners CPU power.

I perspektiv bruger jeg, når jeg booter ind i Manjaro I3 sølle 241mb ram og 1–2% af min CPU.

Åbner jeg herfra firefox med facebook, twitter, youtube og reddit, åbner spotify og Microsoft Visual Studio Code, samt et par terminaler vil mit ram forbrug stige til lige omkrign 2.5- måske 3gb ram — stadig 1-1.5gb under OS X der vel at mærke intet kører og hovedsageligt er rammene her allokeret til Firefox. Manjaro I3 er i sig selv en ret light weight installation, men jeg har strippet min config yderligere for ting jeg ikke bruger. Vi snakker de førnævnte bluetooth managers, volume ikoner, printer management, applets til at håndtere wifi osv. Selv pauseskærmen er strippet. Alle er stadig lige til at åbne, skulle jeg bruge dem, men der er ingen grund til at det kører hele tiden, og lige netop netværk håndterer jeg i terminalen via min configurations fil. Valgte jeg eks. Arch Linux med LXDE skrivebordsmiljø, kunne jeg nøjes med knap ~150mb ved boot. Dvs. en (endda outdated) MacOSX kræver op imod 26, næsten 27(!!!) gange så mange ressourcer som en Arch LXDE installation.
Og det kan mærkes!

Ikke nok med at maskinen konstant er 15–20 grader køligere end når den skal køre Mac OS X, men alt føles bare væsentlig mere snappy og light. At computerens load og temperatur er lavere gør at blæseren ikke skal køre alverden, og at processoren ikke kræver ligeså meget strøm. Faktisk har jeg ikke hørt blæseren siden jeg ændrede mine youtube indstillinger til at kun afspille 720p videoer. Når den skal loade 1080p eller 4K går den stadig i gang, så det er heldigvis ikke bare mig der har fået slået den fra somewhere. Det gør i sidste ende at min gamle macbook nu holder strøm i ~3 timer, frem for ~2 timer. Det var et kæmpe boost i performance, jeg slet ikke havde overvejet! Og det er måske logisk nok, når man går fra den ene “yderlighed” til en anden, og desuden vil langt de færreste jo acceptere at selv skulle til at åbne forskellige managers, før de eks. kan logge på nye wifi netværk, ligesom langt de færreste mennesker ville acceptere at selv skulle skrive et stykke kode i en konfigurations fil, før at skrivebordsbaggrunden rent faktisk dukker op igen, efter genstart… … selv tage stilling til hvilket screen saver software der er bedre end konkurrentere og jeg kunne blive ved— og det forstår jeg altså udmærket! Jeg er bare selv tilpas nørd til at ville det, og siger bare at jeg kan mærke det! Der findes i øvrigt vitterligt flere tusinde alternativer inden for linux, hvor din personlige grænse imellem convenience og perfomance med garanti også er repræsenteret!

## Customization

Når jeg åbner min macbook booter den automatisk ind i Manjaro i3, på ~10 sekunder (OSX er 30+ sec), og derfra kan jeg via mit keyboard tænde og slukke min gamle pioneer forstærker fra 1973, jeg kan styre lyset i hele huset, se temperaturen på mit værelse, jeg kan åbne for min hoveddør via det hardware hack jeg tidligere har lavet i min dørtelefon, og en genvej til et shell script. Altsammen er 2–3 tastatur klik væk, fra boot. Jeg kan i øvrigt 100% de samme ting fra min mobil, men selvom jeg sparer turen ud til dørtelefonen, når pizzabuddet altså af og til at ringe på 2 gange, før han bliver buzzet ind. Det er ikke tilfældet, hvis jeg sidder med min computer. CMD+Shift+y og dørtelefonen åbner i 4 sekunder, blinker min lampe på værelset og jeg kan lige så stille rejse mig, og gå ud til min dør, hvor det passer med at pizzabuddet er nået til 3. sal.

Jeg kan vælge 100% hvilke elementer jeg vil have i min “startmenu”, som i mit tilfælde hedder i3blocks — jeg har valgt lokalt vejr, min offenlig og lokale IP — det er tit praktisk men også for at bekræfte at jeg overhovedet er online, da jeg jo netop ingen network manager widget benytter. Ud over det har jeg kun en strømprocent indikator, et ur og de få programmer der kører; clipit og kdeconnect ved boot.

Så når alt kommer til alt, så fungerer alt hurtigere for mig, i et linux miljø, end det gør i noget andet. Vi snakker helt basic internet browsing, kodning og programmering, youtube, sociale medier, netbanking email og alt det der i forvejen burde være ligth. Der ser jeg ingen grund til at bruge så mange ressourcer på at have en terminal åben med en reddit viewer, og der er noget helt vildt tilfredsstillende over at selv vedligeholde din maskine.

## Konfigurationen

Som jeg skriver, kræver det altså lidt arbejde at få sådan et custom miljø sat op, for der findes ingen genvej. Det skal tilpasses præcist dit workflow, og hvad du gerne vil, før det giver mening, at vælge en så stripped tilgang som jeg har. Har du lyst til at give det et go, kan du se min dotfiles — konfigurationsfiler på min github, hvor jeg forsøger at forklare mig via comments og struktur. Jeg har haft Manjaro i3 installeret i godt over 1 mdr efterhånden, og jeg har stadig min config fil åben så godt som hver dag. I takt med jeg lærer systemet bedre at kende, kan jeg hele tiden optimere det til det bedre. Genveje der giver bedre mening på andre placeringer, apps der skiftes ud med andre, lock screens der gøres pænere, og ikonpakker der lige skal justeres.

På min github er mit setup i skrivende stund bestående af min i3 config, rofi theme, i3blocks config og dertilhørende custom scripts. Simpelt og light weight.
