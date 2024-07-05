---
title: 😑 FUCK!
description: "Lad os installere thefuck, til at rette vores småfejl i terminalen...!"
date: 2023-04-15
image: "./fuuu.webp"
updated: 2023-04-15
draft: BOOL
tags:
  - linux
  - scripts
  - shell
---
Vi kender det alle... Vi har tastet en lang kommando, tastet alt korrekt og hamrer på _retur_-knappen med resultatet:

> error: you cannot perform this operation unless you are root.
Kommandoen _var_ korrekt, du manglede bare _sudo_ rettigheder, eller hvad ved jeg..

Eller for 4. gang i streg du kommer til at taste `git puhs` i stedet for `git push`?  
Eller du mixer dine packagemanagers sammen og bruger ubuntu syntax i din fedora packagemanager...?  
eller .. eller .. eller.. Ja, mulighederne vil ingen ende tage, når vi taler om at taste forkert.. 

Men hvad end det er tastefejl, fejl-40, eller noget helt tredje vi er ude i, er der nogen der har tænkt på os!

## `thefuck`
yup... jeg tænker ligesom dig at `the` i `thefuck` er tilføjet af _terms of service_-mæssige årsager, men ikke desto mindre har [nvbn](https://github.com/nvbn) - udvikleren Vladimir Iakolev der er bag `thefuck`, udviklet `thefuck` til at gennemskue hvad du egentlig ville med din mislykkedes kommando og rette den for dig, hvis du blot skriver `fuck` så snart du bliver mødt af en fejlmeddelelse i terminalen.

![thefuck in action, først retter den en manglende bindestreg i en apt-get kommando, og derefter det manglende sudo før kommandoen.. Foto: github.com/nvbn](https://warehouse-camo.ingress.cmh1.psfhosted.org/5eabaddf9fa1f4e6a67150ff47ed45dcae8d288e/68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f6e76626e2f7468656675636b2f6d61737465722f6578616d706c652e676966)

Lad os give `thefuck` et kig! Installer `thefuck` med `pip`
```python
pip install thefuck
```

Lad os lave et alias, så vi faktisk kan eksekvere `thefuck`
``` shell
echo "eval $(thefuck --alias)" >> ~/.zshrc
```
Her antager jeg at der bruges `zsh` - bruger du `bash`, `fish`, `ash` eller hvad ved jeg, så er det jo `~/.bashrc`, `~/.config/fish/config.fish` og så fremdeles, vi skal have vores alias i. Du ved bedst selv, hvor du normalt sætter dine alias.

Og det var faktisk dét..! 🤷
## Testing
Prøv at taste en vilkårlig kommando forkert.. 
```shell
echo "127.0.0.1 facebook.com" >> /etc/hosts
```
ville eks fejle, da vi ikke kan redigere i systemets hosts fil, uden at være root, have sudo eller eleverede rettigheder.

Skriver vi nu `fuck` og _hamrer_ på den enter tast, og vi vil se en besked a la:
```shell
sudo echo "127.0.0.1 facebook" >> /etc/hosts [enter/↑/↓/ctrl+c]
```
`fuck` registrerer altså, at fejlen (`zsh: permission denied: /etc/hosts`) er relateret til `sudo`, og trykker vi enter igen vil kommandoen nu eksekveres, med forhøjede rettigheder. Er den rettede kommando ikke korrekt, afslutter vi som altid med `ctrl+c`

Jeg er ikke parat til at kalde `fuck` for et _life hack_ eller at tag'e indlægget med `#produktivitet`s-tag'et, men jeg synes det lille util fortjener lidt opmærksomhed, og jeg er sikker på, at indkorporerer man den i sit workflow, vil man lynhurtigt blive afhængig af det - jeg ved jeg er!

Og ja, jeg kan jo nok ikke kalde det et _easter egg_, men jeg synes det er ret så hyggeligt, at når `fuck` ikke kan finde ud af, hvad fejlmeddelelsen er, og derfor ikke give dig en rettet kommando, så er programmets eneste fejlmeddelelse følgende:
```shell
No fucks given!
```
## Dokumentation og Links
**thefuck:** [nvbn](https://github.com/nvbn), [nvbn/thefuck](https://github.com/nvbn/thefuck), [pypi.org](https://pypi.org/project/thefuck/)  
**Diclaimer: Animated gif animation is property of nvbn, used under fair use**
