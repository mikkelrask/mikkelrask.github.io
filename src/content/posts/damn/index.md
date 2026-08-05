---
title: "DAMN! Få besked når det er på tide at rydde op"
description: "Overvåg mapper for aktivitet, og få automatisk en e-mail når det er på tide at backe up, og evt. slette indholdet."
category:
  - "Udvikling"
  - "Selfhosting"
date: 2025-06-03
tags:
  - bash
  - shell
  - automation
image: "./damn.webp"
series:
  - "Selfhosting"
  - "Bash"
---

Damn står for **Direcotry Activity Monitor/Notifier** og er et bash-hjælpeværktøj jeg har udviklet til at holde øje med en eller flere specificerede mapper for aktivitet, og notificere dig via e-mail eller slack-bot, når det er på tide at slette den/flytte til en backup destination eller lign. Perfekt til din projektmappe til dine repos eller på en NAS eller lign.

Det kan nemt rettes til, til andre notifikationsmåder - nærmest alt der understøtter webhooks kan bruges - har man allerede en daglig backup-løsning, kan DAMN nok også nemt justeres til at fx slette mappen automatisk i stedet, og måske endda i stedet laver et symlink til en eventuel backup mappe.

## Installer DAMN!

1. **Klon repoet ned på din maskine og cd ind i mappen**

```sh
git clone git@github.com:mikkelrask/damn.git
cd damn
```

2. **Kør setup scriptet, der opretter din konfigurationsfil**

```sh
sudo ./setup.sh
[sudo] password for mr:
DAMN - Directory Activity Monitor Notifier Setup
================================================
Installerer globalt...
✓ Installet i /usr/local/bin/damn.sh
✓ Config eksisterer allerede: /etc/damn/damn-config.conf

Opsætning:
1. Dagligt tjek via cron (anbefalet)
2. Ugentlig tjek via cron
3. Springer over (manuel)

Valg [1-3]:
```

Setup scriptet installerer DAMN for dig, og giver yderligere mulighed for at automatisk køre damn på daglig eller ugentlig basis via `cron`. Du kan også blot vælge 3. valgmulighed og køre manuelt efter behov.

Vælges den automatiske kørsel, vil det køre hver dag kl. 09:00 eller hver mandag kl. 09:00 alt efter dit valg.

Setup scriptet kan også køres uden sudo, så placeres damn og konfigurationsfilen lokalt i din home mappe. (hhv. `$HOME/.local/bin` og `$HOME/.config/damn` vs `/usr/local/bin` og `/etc/damn`)

3. **Ret konfigurationsfilen til dit system med din editor - her bruger jeg nano**

```sh
# Hvis du installerede med sudo
sudo nano /etc/damn/damn-config.conf
# alternativt er det for lokale setups:
nano $HOME/.config/damn/damn-config.conf
```

```sh
# DAMN - Directory Activity Monitor Notifier Conf

# Directories to watch (array of absolute paths)
PROJECT_DIRS=(
    "/home/user/dir-1"
    "/home/user/dir-2"
    # Add more directories as needed
    # "/path/to/another/project/dir" (Linux)
    # "/Users/MacUser/Projects" (MacOS)
)

# Days of inactivity before notification
INACTIVE_DAYS=60

# Notification method (email, slack, or both)
NOTIFY_METHOD="email"

# Email settings (if using email notification)
EMAIL_TO="user@email.com"
EMAIL_FROM="admin@email.com"
EMAIL_SUBJECT="DAMN Alert - Directory Inactivity"

# Slack webhook URL (if using slack notification)
SLACK_WEBHOOK_URL=""

# Log file location (leave empty for auto-detection)
LOG_FILE=""

# Exclude patterns (regex, one per line)
EXCLUDE_PATTERNS=(
    "\.git$"
    "node_modules$"
    "\.cache$"
    "__pycache__$"
    "\.DS_Store$"
    "\.backup$"
    "\.vscode$"
    "\.idea$"
)
```

Ret filen med de mapper du ønsker at overvåge i `PROJECT_DIRS`-array'et vælge antallet af `INACTIVE_DAYS` før du ønsker at blive notificeret og hvilken `NOTIFY_METHOD` du ønsker at bruge - som standard er der email, og denne løsning kræver at have `mail`, `s-nail`, `sendmail`, `mailx` eller lign, og er sat op til at kunne afsende e-mails.

`EXCLUDE_PATTERNS` er regex patterns, til at notere eventuelle mapper/file der _ikke_ skal holdes øje med, når der kigges efter ændringer - eks så oprettes/berøres `.DS_Store` mapper, blot man åbner en mappe, uden at nødvendigvis redigere eller oprette andre filer eller undermapper. Så `EXCLUDE_PATTERNS` er til at undgå "_false positives_"

4. **Gem dine ændringer med `CTRL+X` _(hvis du brugte nano)_, efterfulgt af `y` og `Enter`**

## Kør manuelt

Når alt er sat op, kan du køre DAMN manuelt, uanset om du opsatte automatisk cron

```sh
# Hvis installeret globalt
damn.sh /etc/damn/damn-config.conf
# Hvis installeret lokalt
damn.sh $HOME/.config/damn/damn-config.conf
```

## Før du installerer

Lidt _nice-to-know_'s ift brugen af DAMN, før du installerer - README

### Hvorfor skal jeg bruge sudo?

Om man ønsker at køre `damn.sh` og `setup.sh` med sudo er _egentlig_ op til en selv - _jeg_ har her taget udgangpunkt i at det skal være _system-wide_ og i det hele taget hvis noget skal køres af systemet, i.e via `cron` giver det bare bedst mening, i mit hoved, at det er `root`, der er owner på de forskellige ting.

Hvis du kører det som root/med sudo vil damn blive placeret i `/usr/local/bin/damn.sh` og konfigurationsfilen i `/etc/damn/damn-config.conf`

Hvis du kører uden sudo, vil det i stedet være `$HOME/.local/bin/damn.sh` og `$HOME/.config/damn/damn-config.conf`

Yderligere afslutter setup også med at spørge om du ønsker at opsætte et dagligt eller ugentlig cron-job til at køre DAMN automatisk - her anbefales det at køre dagligt. Medmindre at man vælger at køre det manuelt, vil det altid ske kl. 09:00 (serverens tid)

### mail og brugere

Man skal dog være opmærksom på, at mail typisk sættes op på brugerbasis - dvs. hvis du fx har sat `s-nail`/`mail` op med din `root` bruger, bliver DAMN også nødt at køre med sudo, hvis du benytter email som `NOTIFY_METHOD`.

### Dependencies/Systemkrav

Som nævnt kræver det ved e-mail afsendelse selvfølgeligt at der er sat mail op på computeren, men det er lavet specifikt i bash så det som minimum fungerer på Mac og Linux - reelt set skulle Windows også kunne lade sig gøre fx via [WSL](https://learn.microsoft.com/en-us/windows/wsl/install), men kræver så at der er opsat mail på selve WSL systemet. Ved automatiseret brug, kræver det selvfølgelig `cron` som ofte er installeret på Linux og Mac _out of the box_.

### Logs

Logfiler over alt hvad DAMN outputter placeres i `/var/log/damn.log` for globale installeringer og `$HOME/.local/share/damn/damn.log` for lokale.

### Afinstaller DAMN

```sh
sudo rm /usr/local/bin/damn.sh /etc/damn/damn-config.conf # globalt
rm $HOME/.local/bin/damn.sh $HOME/.local/share/damn/damn-config.conf # lokalt
```

### "damn.sh" command not found

Oplever du at systemet siger at "damn.sh command not found" eller lign. fejlbesked, kan du tjekke om installations-mappen er i din PATH

```sh
echo "$PATH"
/home/user/bin:/bin:/usr/bin:/usr/local/bin
```

ser du ikke installationsmappen, kan den tilføjes til din `$PATH` ved at tilføje følgende i din `.bashrc`/`.zshrc` alt efter hvilken shell du bruger

```sh
export PATH="$HOME/.local/bin:/usr/local/bin:$PATH" # tilføjer både din .local/bin mappe og /usr/local/bin
```

Ønsker du ikke at tilføje mappen permanent, kører du blot `PATH="$HOME/.local/bin:/usr/local/bin:$PATH` i din terminal, og så vil damn kun være tilgængelig i din nuværende session.

## Og... det var faktisk dét

Næste gang en mappe i fx din projektmappe har filer eller mapper der ikke er oprettet/redigeret inden for det antal `INACTIVE_DAYS` du satte i din `damn-config` vil du modtage en e-mail der oplyser hvilke undermappe der er tale om. Igen - det kan nemt udbygges, eller modificeres til at foretage andre handlinger, det var bare lige dét der passede til min use-case
