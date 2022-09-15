---
title: "🎣 Phishing kampagner tager dine penge måned for måned"
description: "Gennemgang af en phishing kampagne, hvordan den er sat op og hvordan de narrer én til et dyrt ugentlig abonnement."
date: 2018-09-18
tags: 
 - cybersikkerhed
 - social engeneering
series: 'Sikkerhed 101'
---

***Der florerer for tiden rigtig mange forskellige phishing kampagner via diverse medier — både sociale medier, e-mail og SMS. Forbrugerombudsmanden advarede forleden, i en pressemeddelelse imod netop nogle af de abonnements-kampagner jeg i takt med mit arbejde hos uniqkey har brugt lidt tid på at undersøge.***

> _»Vi opfordrer forbrugerne til at være ekstra kritiske over for de tilbud, de benytter — særligt hvis de samtidig skal give deres betalingsoplysninger,«_ 
udtaler Forbrugerombudsmand, Christina Toftegaard Nielsen, i pressemeddelelsen.

På det seneste har der bl.a. været flere SMS’er der florerer der udgiver sig for at være fra hhv. Nordisk Film, Ryan Air og SAS som TV2 også har advaret imod. 

Jeg har taget et kig på nogle af dem som jeg personligt har modtaget, og kommer med mit besyv på, hvad du skal holde øje med, så du nemmest undgår at blive narret.

Lad os tage udgangspunkt i en *“RyanAir”* kampagne.

Det viser sig i virkeligheden, at kampagnen kun er lavet, for at lokke dine informationer ud af dig, og lade dig acceptere en 3 dages prøveperiode på noget der hedder SeriousDating.net — der efter de 3 dages test, automatisk fornyer sig selv til €44 — knapt 350kr./mrd og fortsætter med at forny sig selv hver måned.

Her et eksempel på en SMS:
![Eksempelt på en Ryan Air Phishing kampagne](https://miro.medium.com/max/352/0*OyAPuf4KGn9TFDUI.jpg)

Det første faretegn er mere oplagt for nogle end andre. Jeg ved fx jeg ingen grund har til at skulle modtage en SMS, hvis RyanAir skulle holde jubilæum. 

Men mange kan komme i tvivl om, om de evt. selv har deltaget i en konkurrence, indtastet deres telefonnummer eller øvrige kontaktoplysninger på en hjemmeside, e.l.

Andet tegn er selve hjemmeside-adressen de gerne vil have man klikker ind på. Det er via en URL-forkortelses-service der hedder bit.ly. 

Hvad Bit.ly’s service nemlig i virkeligheden gør, og er opfundet til, er at gøre lange hjemmesideadresser kortere, og derved mere *delbare*. 

Et sideprodukt heraf, er desværre bare at phishere også benytter dem, dog til at maskere, hvor man egentlig prøver at sende brugeren hen, når de klikker på et link. 

I dette tilfælde ender vi på en hjemmeside der hedder www.whirlwindofchange.com. *URL servicen vender vi tilbage til længere nede.*

![Er det Ryan Air, eller Whirlwindofchange?](https://miro.medium.com/max/2149/0*gyLFKKccRVwu-69B.png)

Som I ser her, hedder hjemmesideadressen nu www.whirlwindofchange.com i stedet for fx. https://ryanair.com som man måske ville have forventet.

![FOMO FRIDAY](https://miro.medium.com/max/627/0*zHPflJAczBhnZT-_.png)

De sætter en tidsbegrænsning på, for at give den besøgende en “sense of urgency“, og på en let måde rushe/stresse brugeren til at komme videre og igang, uden at stille så mange spørgsmål. 

Af nysgerrighed ventede vi til tiden udløb, og klikkede herefter “Fortsæt”. Der skete intet ved at vente og lade tiden løbe ud. 

Her indtastes godt nok ingen data på denne side, men bid her også mærke i at siden fx ikke benytter HTTPS.

![🔓](https://miro.medium.com/max/627/0*9TQoHekgDgBkV4Ge.png)

Jeg klikkede “Fortsæt”, og nu er jeg igen skiftet side — denne gang til et domæne der hedder “SeriousDating.net”. Ser man ikke selve hjemmsidenavnet, ser det måske for nogle fortsat nogenlunde rigtigt ud, men….

![I det mindste er de ærlige!](https://miro.medium.com/max/627/0*mPy_kzF2MOgb3SZl.png)

*“Hvad accepterer jeg?”* — her står det faktisk sort på hvidt, hvad man går ind til. Men mange scroller slet ikke ned i bunden af siden, da det jo er i toppen de lover en flybilletter til Dubai for 9 kroner. Dog skriver de jo, at de trækker 9 kroner fra dit kreditkort, og fremadrettet 349,-/mrd. I bunden står der jo endda at afsenderen er en maltesisk virksomhed ved navn Response Kings LTD.

### Terms and conditions

![TOC part 1](https://miro.medium.com/max/2149/0*qITgOkr5Z79mfC9Y.png)
![TOC part 2](https://miro.medium.com/max/2149/0*yO4VzmqZ0I-MP72L.png)

Skulle man også læse “Terms and Conditions”, inden man udfylder formularen, får man faktisk også samme information af vide. Hvad man accepterer, hvad det koster, og hvad man reelt set ender ud med at få. 

Men en undersøgelse — dog tilbage fra 2005 — viste at kun 1 ud af ~3.000 brugere læste terms and conditions igennem, før de accepterede. 3.000 licenser blev der altså solgt til et software, før 1 enkelt bruger henvendte sig til dem, og gerne ville indkassere de $1.000 de havde lovet samtlige af deres brugere — hvis altså de vel at mærke læste T.O.C, og bekræftede at i det mindste kende til denne ene linje, ved at sende en e-mail til firmaet. 

Og uden at have nogen statistik til at bakke op om min påstand, vil jeg umiddelbart tro, at med stigningen i antallet af services vi benytter og software vi installerer, at denne statistik er blevet endnu værre. 

Hvornår læste du sidst terms and conditions?

**URL forkorter giver statistik**

I dette tilfælde valgte dem vi vælger at kalde for “gerningsmændene” at benytte bit.ly til at maske den egentlige hjemmesideadresse. Men hvad bit.ly også kan gøre for os, er at give os statistik for, hvor mange mennesker, der egentlig har klikket på linket. En del af den, i øvrigt anonyme, link-forkorter er nemlig at man også altid nemt kan se antallet af kliks på pågældende link, ved at indtaste et + i adressefeltet, lige efter selve adressen.

![Stats](https://miro.medium.com/max/2149/0*cRiashJFlF_fwuhj.png)

Fordelt på små 3 dage fik deres kampagne små 1000 kliks. Som man kan se er majoriteten fra mobil, hvilket underbygger hele SMS scammets eksistensgrundlag.

Til sammenligning fik en kampagne vi undersøgte, hvor Nordisk Films navn blev misbrugt over 6.000 kliks på 24 timer.

**Gode råd til at undgå at gå i fælden**

Der er forskellige tips til at finde ud af, om et tilbud er ægte eller falsk:
• Læs betingelser og vilkår igennem
• Vær særlig varsom ved krav om betaling
• Tjek felter, som er krydset af på forhånd
• Tjek afsenderen. Hvis du ser et blåt eller gråt flueben på en twitter, Facebookside eller en Instagramprofil, betyder det, at afsenderen er verificeret af Facebook/Instagram, og at der derfor er tale om en autentisk side eller profil.
• Tjek, om der findes anmeldelser af virksomheden

**Gode råd til forbrugere, der er blevet snydt:**

Kontakt firmaet med det samme. Meddel at:
– du ikke mener, I har indgået en aftale
– aftalen er ugyldig
– at du vil have dine penge tilbage

Derudover skal du straks kontakte din bank, hvis du uberettiget har fået trukket penge fra din konto. Banken kan i visse tilfælde tilbageføre dine penge uden om den erhvervsdrivende.

For yderligere oplysninger, kontakt:
Forbrugerombudsmandens pressesekretariat på tlf. 41 71 50 98.