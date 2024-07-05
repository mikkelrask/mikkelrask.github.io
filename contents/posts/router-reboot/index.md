---
title: "🛟 router-reboot"
description: "Utility til at genstarte en linux maskine/openWRT/lign router hvis den ikke har internet."
image: "./restart.webp"
date: 2020-09-13
tags:
  - shell
  - scripts
---

Okay, så min router er flashet med en custom firmware der hedder openWRT, hvilket jeg tror hører til minoriteten af routere derude, selv blandt de få der måtte læse med her. Men basalt set laver openWRT min router til en linux-maskine, der tilfældigvis også kan route internettrafik. En maskine som man kan ssh ind i, køre scripts på osv. En meget lille, og begrænset linux maskine, men en linux maskine trods alt.

Så for at komme nedetid på mit internet til livs, tjekker jeg løbende om routeren kan pinge 8.8.8.8, som er Google's DNS IP adresse, som er en af de IP adresser jeg stoler på så godt som altid er online, og kan routeren ikke pinge den, venter den 30 sec. og prøver igen.

Fejler den også 2. gang, genstartes routeren, som alle jo ved er hvordan man i alle scenarier fixer at internettet ikke virker. Den tilføjer ligeledes et dato mærke i filen `reboot.log`, som den selv generer.

Jeg kører scriptet som et cronjob hvert kvarter. Læs om cron jobs og generer crontab kommandoer nemt her: https://crontab-generator.org/

Script:

```bash
#!/bin/sh

if ping -c 1 8.8.8.8 &> /dev/null
then
	exit
else
	sleep 30
	if ping -c 1 8.8.8.8 &> /dev/null
	then
		exit
	else
		date >> reboot.log
		reboot
	fi
fi
```

Direct download:

`curl https://raw.githubusercontent.com/mikkelrask/scripts/master/router-reboot.sh -o /reboot-router.sh`

Github: [github.com/mikkelrask/scripts](https://raw.githubusercontent.com/mikkelrask/scripts/master/router-reboot.sh)
