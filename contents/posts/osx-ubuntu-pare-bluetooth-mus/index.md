---
title: "🖱️ Pare bluetooth devices med dual-boot i Ubuntu og OSX"
description: "Sæt din bluetooth mus op på en dual boot laptop, uden at skulle pare hver gang du skifter OS!"
category:
  - Linux
image: "./dualboot.webp"
date: 2018-09-16
tags:
  - linux
  - macos
---

Da jeg roder meget med arduinos og lignene microcontrollere, afhænger jeg en smule af Arduino IDE, og efter seneste OSX beta; Mojave mangles der support/drivere til den USB til serial forbindelse man bruger til at ‘snakke’ med sine microcontrollere via USB kabel. Lang historie kort, er det endt med at jeg har partitioneret en del af min SSD harddisk, og har (ligesom Brønderslev Kommune) valgt at installere Ubuntu Gnome 17.04 — et skrivebordsmiljø á la det som vi kender som fx Windows eller Mac OSX. Det kan selvfølgeligt af de fleste ses som værende mega overkill at installere et helt styresystem for at bruge en enkelt applikation, men jeg gjorde det ligeså meget for at lære noget mere om Linux, og forventer lidt mere stabilitet end ved at fx bruge en virtuel maskine a la VM Ware el. Virtualbox. Men problemerne stopper selvfølgeligt ikke der! Jeg bruger nemlig med trådløs bluetooth mus og tastatur, og det komplicerede er her, at hver gang jeg booter op i et af mine to styresystemer, skal jeg på ny pare mine bluetooth enheder med det pågældende system, da der ved successfuld paring genereres et unikt sæt linkkeys/paringskoder/passkeys, som bliver gemt sammen med enhedens MAC adresse.

Den problemstilling findes der selvfølgeligt nok ligeså mange løsninger på, som der findes linuxdistributioner (og her i 2018 er det er en god sjat), men jeg måtte selv klatte sammen hvad jeg kunne finde af informationer på emnet, så jeg tænkte at jeg ville skrive ned hvad jeg gjorde, for at få kopieret mine nøgler fra mit MacOSx over i mit Ubuntu Gnome miljø. Det burde virke på de fleste debian baserede linux distributioner, men som med alt i livet, er der ingen garantier.
TL;DR

- Start Linux og par dine bluetooth enheder
- Genstart ind i MacOSx og par dine enheder
- Åben Terminal.app og indtast følgende kommando
- sudo defaults read /private/var/root/Library/codeferences/com.apple.Bluetoothd.plist

Det skulle gerne give dig en kode a la det her alt efter hvor mange enheder du har tilsluttet:

```sh
{
    LinkKeys ={
        “20-c9-d0-d6-74-c6” ={
            “18-65-90-c3-42-20” = <9377f610 4e181397 abfc8ee2 4f23809e>; 9E80234FE28EFCAB9713184E10F67793“60-fb-42-08-75-46” = <3eb7b757 cd6584ad 94087957 72093bfe>; FE3B097257790894AD8465CD57B7B73E
        };
    };
    MagicCloudPairingMasterHint = <406ca4bd c1b45238 4bef9c4b 4f63e7b3>;

    MagicCloudPairingMasterKey = <90b72662 cad1aa37 d1ab2393 f42a2cca>;
}
```

`20-c9-d0-d6–74-c6` er så MAC adressen (det står for “Media Access Control Address” og har ikke noget med Apple’s mac at gøre) på min bluetooth modtager i min Macbook, og under adressen er mine to enheder så listet med hver sin MAC adresse, som hhv. er `18–65–90-c3–42–20` og `60-fb-42–08–75–46`. Efter hver MAC adresse har vi de paringskoder/linkkeys/passkeys vi skal bruge pakket ind i større end og mindre end tegnene — i mit tilfælde hhv. `9377f610` `4e181397` `abfc8ee2` `4f23809e` og `3eb7b757` `cd6584ad` `94087957` `72093bfe`. Kopier hele teksten og gem det evt. på din linux partition eller i skyen, hvor du har adgang til det, når du er genstartet i linux. Send det som en mail, hvis ikke du kan komme på andet — jeg brugte som altid [Evernote](https://evernote.com).

Genstart nu og boot ind i linux — her skal du jo så bruge en mus og et tastatur med kabel hvis ikke du ligesom mig bruger en bærebar. Du må endeligt **ikke** pare dine bluetooth enheder på dette tidspunkt!

Åben en terminal og skift til root bruger med `sudo -i`

Nu skal vi konvertere de koder vi fandt i Mac OSx, til det korrekte format som er:

- Ingen mellemrum
- Kun store bogstaver
- Parvis i omvendt rækkefølge.

Forvirret? Vi laver et fiktivt eksempel — lad os antage at din paringskode fra din mac er abfc8ee2

Tag de to første tegn (a og b) og sæt dem bagerst — de to næste tegn (f og c) og sætter næstbagerst og så fremdeles så vi ender med en kode der ser sådan ud E28EFCAB

Giver det stadig ikke mening kan du bruge denne kommando til at automatisere dette for dig. X’erne udskifter du med din linkkey og resultatet bliver skrevet i terminalen — kopier denne.

```
echo XXXXXXXX XXXXXXXX XXXXXXXX XXXXXXXX | sed 's/ //g;s/../\U&\n/g' | tac | tr -d '\n't
```

Når du har dine korrekt formatterede linkkeys genereret skal du `cd` til din bluetooth konfigurations mappe
`cd /var/lib/bluetooth/[DIN BLUETOOTH MAC ADRESSE]/[DIN MUS' MAC ADRESSE]` .

Macadresserne har du i din gemte dokument fra tidligere

I denne mappe ligger der kun 1 fil der hedder info — åben den i din yndlingseditor fx gedit
gedit info

Udskift paringskoden (Linkkey=XXXXXXXXXXXXX) som din mus og linux generede ved første boot i vores process, med den i vores udklipsholder (CTRL+V) og gem filen (CTRL+S).

Fortsæt nu samme process med dit tastatur
cd /var/lib/bluetooth/[DIN BLUETOOTH MAC ADRESSE]/[DIT TASTATURS MAC ADRESSE]

Rediger info filen med din konverterede tastatur linkkey.
gedit info

Og slut af med at genstarte enten din bluetooth service eller computer ved at indtaste en af følgende kommandoer

    service bluetooth restart
    reboot

Og det var faktisk dét! Det er som de fleste ting ikke så svære, hvis man ved hvad man skal.

BONUS: Bruger du i øvrigt ligesom mig Apple Magic Mouse (el. lign højopløsnings mus) kan du lige få denne kommando med på vejen, så din mus ikke er så livlig.
xinput --set-prop "NAVNET PÅ DIN MUS" "Device Accel Constant Deceleration" 4

4-tallet er hvad der styrer hastigheden på din mus. 1 er hurtigst 10 langsomst. Navnet på din mus finder du i info filen til din bluetooth konfiguration
cat /var/lib/bluetooth/[DIN BLUETOOTH MAC ADRESSE]/[DIN MUS' MAC ADRESSE]/info
