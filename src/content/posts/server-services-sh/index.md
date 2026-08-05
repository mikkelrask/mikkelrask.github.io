---
title: "server-services"
description: "Genstarter services, der af den ene eller anden årsag ikke kører. Tænkt til en server, hvor fx apache eller mysql kører."
category:
  - "Udvikling"
date: 2020-08-11
image: "./serverroom.webp"
tags:
  - shell
  - automation
  - bash

series:
  - Bash
---

Dette script burde måske egentlig hedde noget andet, for, for det er selvfølgeligt ikke begrænset til at køres på nogen server. Det er dog lavet specifikt til at, i dette tilfælde, er en ubuntu server, tjekke op på om hhv. `apache` og `mysql` kører, og hvis ikke, genstarte servicen. Pretty straight forward.

Hvilke services scriptet tjekker, kan selvfølgeligt ændres i `SERVICES` array'et på 5. linje af filen.

Kører scriptet hver minut som et cron job, med crontab -e, hvor jeg tilføjer linjen `* * * * * /usr/bin/bash /server-services.sh >/dev/null 2>&1`.

Script:

```bash
#!/bin/bash

PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

SERVICES=( 'apache2' 'mysql' ) # hvilke services vi overvåger

 for i in "${SERVICES[@]}"
  do
 `pgrep $i >/dev/null 2>&1`
 STATS=$(echo $?)

 if [[  $STATS == 1  ]]
  then
  service $i start
  `pgrep $i >/dev/null 2>&1`
  RESTART=$(echo $?)
  if [[  $RESTART == 0  ]]
   then
    if [ -f "/tmp/$i" ];
    then
     rm /tmp/$i
    fi
	else
    if [ ! -f "/tmp/$i" ]; then
     touch /tmp/$i
    fi
  fi
 fi
  done
exit 0;
```

Direct download:

`curl https://raw.githubusercontent.com/mikkelrask/scripts/master/server-services.sh -o /server-services.sh && chmod +x /server-services.sh`

Github: [github.com/mikkelrask/scripts](https://raw.githubusercontent.com/mikkelrask/scripts/master/server-services.sh)
