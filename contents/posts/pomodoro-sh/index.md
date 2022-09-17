---
title: "🍅 pomodoro"
description: "Lille bash pomodoro timer"
date: 2020-12-12
tags:
  - shell
  - scripts
---

Meget meget simpel pomodoro timer, der lader dig arbejde i 25 minutters intervaller, og giver dig 5 minutters pause derefter. Alt scriptet gør, er at gå i dvale i forudbestemte intervaller, i et loop, indtil det scriptet stoppes (CTRL+C). Den giver output i form af en notifikation, terminal output og den afspiller en lyd.

I loopet benytter jeg mpv til at afspille pomodoro.mp3, libnotify til at sende en notifikation og cowsay til at give output direkte i terminalen. Oddsne er, at du har en af dem, hvis ikke alle installeret i forvejen.

Script:

```bash
#!/bin/sh
notify-send "Pomodoro started." "Work concentrated for 25 minutes."

while true
do
	clear
	cowsay "25 minutes"
	sleep 25m
	notify-send "Issa time" "Get some rest"
	mpv --quiet pomodoro.mp3
  clear
	cowsay "Take a break!"
	sleep 5m
	notify-send "Get to it!" "Time to work!"
	mpv --quiet pomodoro.mp3
done
```

**Direct download:**
`curl https://raw.githubusercontent.com/mikkelrask/scripts/master/pomodoro -o ~/bin/pomodoro && chmod +x ~/bin/pomodoro && wget https://github.com/mikkelrask/scripts/raw/master/pomodoro.mp3 -P ~/bin/`
Github: [github.com/mikkelrask/scripts/](https://raw.githubusercontent.com/mikkelrask/scripts/master/pomodoro)
