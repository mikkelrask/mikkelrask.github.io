---
title: "linkhandler %url%"
description: "Lille bash script til at spørge dig, hvordan du vil åbne et givent link"
category:
  - "Udvikling"
date: 2020-11-12
image: "./dmenu.webp"
tags:
  - linux
  - bash
  - dmenu
series:
  - "Bash"
---

Dette bash script minder i sig selv rigtig meget om [confirm](/confirm-sh) scriptet, i dét at vi giver det et argument, og vi derfra får nogle forskellige valgmuligheder via `dmenu`.

Meningen er her, at argumentet er et link vi vil åbne, og dmenu giver mig en liste over typiske programmer jeg vil bruge til at håndtere linket. Er det et YouTube link den får, vælger jeg typisk at afspille direkte i mpv, ligesom jeg ofte benytter mig af `rtv` til at håndtere reddit links.

... og så fremdeles. Der er options til vim baserede browsere (`vimb`), terminal baserede browsers (`w3m` via `readability-cli`), image viewers (`feh`), og endda mulighed for at caste videoer, sange o.l direkte til en chromecast compatibel enhed via `castnow`.

Måden den er integreret i mit eget flow er via min rss-reader, newsboat, som håndterer alle mine nyheder og podcasts. Åbner jeg et link med genvejen `o` køres kommandoen

`linkhandler %url%`

hvilket åbner dmenu med således (klik for fuld størrelse):
[![linkhandler opening a youtube link from newsboat](https://mikkelrask.github.io/linkhandler.gif)](https://mikkelrask.github.io/linkhandler.gif)

**Script:**

```bash
#!/bin/bash

if [[ "${#1}" -gt 30 ]];
then
    link="${1:0:20}"..."${1: -7}"
else
    link="$1"
fi

echo $link

x=$(echo -e "mpv\nfeh\nrtv\nfirefox\nvimb\nw3m\nwget\nTV\nStereo" | dmenu -i -p "Where do we go from here '$link'?")
case "$x" in
        mpv) mpv "$1" 2&>/dev/null & disown ;;
        feh) feh "$1" 2&>/dev/null & disown ;;
        rtv) rtv "$1" ;;
        firefox) firefox "$1" ;;
        vimb) vimb "$1" & disown ;;
        w3m) readable "$1" | w3m -T text/html & ;;
        wget) wget "$1" 2&>/dev/null & disown ;;
        tv) castnow --address PUT-CHROMECAST-IP-HERE "$1" ;;
        stereo) castnow --address PUT-CHROMECAST-AUDIO-IP-HERE --quiet - "$1" ;;
esac
```

**Direct download:**

`curl https://raw.githubusercontent.com/mikkelrask/scripts/master/linkhandler -o ~/bin/linkhandler && chmod +x ~/bin/linkhandler`

Github: [github.com/mikkelrask/](https://raw.githubusercontent.com/mikkelrask/scripts/master/linkhandler)

Øvrige links:
