---
author: Mikkel Rask
title: "🕵️‍♀️ parselog.py"
description: "Hvordan man nemt kan parse en uoverskuelig tekst/log, med meget få linjers kode."
category:
  - "Udvikling"
image: "./parselog.jpg"
date: 2024-02-02
update: 2024-03-01
tags:
  - python
---

Jeg havde én igennem på mit arbejde, der oplevede at omtrent ~900 faktura havde fejlet i overførslen fra Rackbeat til E-conomic.

Det er ikke unormalt at et API kald fejler eller bliver afvist, når systemer taler sammen på denne måde. Det ene system kan tillade X tegn i et bestemt felt, hvor det andet system kan tillade Y, osv. Men at finde hoved og hale i hvad der manglede på NIHUNDREDE salg, selv med log-filerne/notifikationer vi har tilgængelige i Rackbeat, var det svær én lige at overskue.

Og yderligere - da fejlbeskederne ved afviste kald altid er _fra_ kald-modtageren, er det ikke lige alle fejl som vi har fine "oversættelser" til. Det her var én af dem.

Fejlbeskederne var heldivis ensartede da alle faktura der havde fejlet, havde det en masse varer der var spærrede i E-conomic, men fortsat var salgsbare i Rackbeat. Da samtlige faktura der ikke indeholdte de spærrede varer fint var gået igennem, gik det åbenbart under radaren at bilagene manglede i finansen, og hobede sig op til de førnævnte, tæt på, 1000 salg over det seneste tre måneder.

Jeg kopierede al teksten fra log-siden, og da den kopierede data var i tabeller valgte jeg at indsætte det i mit Obsidian program, der er Markdown, så jeg kunne bibeholde tabel-overblikket. Men nu så det sådaledes ud:

```bash
|Faktura|Tidspunkt|Årsag|
|---|---|---|
|customer_invoice_key-4909|2024-02-14 19:11:21|{"message":"Validation failed. 1 error found.","errorCode":"E04300","developerHint":"Inspect validation errors and correct your request.","logId":"864e10e07f2da3a85-FRA","httpStatusCode":400,"errors":{"lines":{"items":[{"arrayIndex":8,"product":{"errors":[{"propertyName":"product","errorMessage":"Product 'SPE-16-029712-9000' is barred.","errorCode":"E06600","inputValue":"SPE-16-029712-9000","developerHint":"Find a list of products at https://restapi.e-conomic.com/products ."}]}}]}},"logTime":"2022-06-12T16:13:00","errorCount":1} :|
|customer_invoice_key-4596|2024-02-02 12:29:51|{"message":"Validation failed. 1 error found.","errorCode":"E04300","developerHint":"Inspect validation errors and correct your request.","logId":"90f9a932d6c19962-FRA","httpStatusCode":400,"errors":{"lines":{"items":[{"arrayIndex":0,"product":{"errors":[{"propertyName":"product","errorMessage":"Product 'SPE-16-029712-9000' is barred.","errorCode":"E06600","inputValue":"SPE-16-029712-9000","developerHint":"Find a list of products at https://restapi.e-conomic.com/products ."}]}}]}},"logTime":"2028-01-11T10:31:26","errorCount":1} :|
|customer_invoice_key-4523|2025-02-29 12:25:09|{"message":"Validation failed. 1 error found.","errorCode":"E04300","developerHint":"Inspect validation errors and correct your request.","logId":"90d910c454843628-FRA","httpStatusCode":400,"errors":{"lines":{"items":[{"arrayIndex":0,"product":{"errors":[{"propertyName":"product","errorMessage":"Product 'SPE-16-029719-9000' is barred.","errorCode":"E06600","inputValue":"SPE-16-029719-9000","developerHint":"Find a list of products at https://restapi.e-conomic.com/products ."}]}}]}},"logTime":"2023-02-19T11:26:47","errorCount":1} :|

.... etc (... data=faker.js for eksemplets skyld 🙄)

```

og som I kan se - stadig ikke det nemmeste at overskue, det det samme tabel og samme lange besked, men nu også med link-data.

## Python time

![Co-pilot/Dall-E genererede denne illustration, ud fra det her indlæg](./parselog.jpg)
Men jeg skulle egentlig også bare bruge det i et filformat, som jeg kunne parse programmatisk - for jeg ville nemlig takle det med et Python-script, der tog en hel fil som input, og kun gav den nødvendige information som kunden skulle bruge tilbage: Fakturanummeret der ikke var overført til finansen, og varenummeret der var spærret i e-conomic.

## vi rackbeat-tools/parselog.🔥

Jeg skyndte mig at åbne neovim, og gå i krig! Fremgangsmåden var heldigvis simpel, netop da syntaksen var ens for både fakturanummer og fejlbeskeder, så kunne jeg bruge nogle regex _patterns_, hvor det var nemt at udvælge dét der varierede på et _findall_-kald, og antage at dét var informationen der skulle bruges til at rette op på det store rod.

```python
import re #regex

with open("fejlbeskeder.md", "r") as file:
    content = file.read()

invoice_pattern = r"customer_invoice_key-(\d+)"

product_pattern = r"Product '([^']*)' is barred."

invoices = re.findall(invoice_pattern, content)
products = re.findall(product_pattern, content)

result = list(zip(invoices, products))

output_filename = "fejlbeskeder_parsed.md"
with open(output_filename, "w") as output_file:
    for invoice, product in result:
        output_file.write(f"Invoice: {invoice}\n")
        output_file.write(f"Barred Product: {product}\n\n")

print(f"Results have been saved to {output_filename}")

```

Og det gjorde at når jeg kører denne fil, at jeg får et output der vises således i stedet:

```bash
Invoice: 4909
Barred Product: SPE-16-029712-9000

Invoice: 4909
Barred Product: SPE-16-029712-9001

Invoice: 4596
Barred Product: SPE-16-029719-9000

.....

```

Det var jo noget mere behageligt at se på og viser nemt hvilke varer der har spærret for hvilken faktura!

Jeg kunne nok godt give det her lidt mere kærlighed, så hvis det skal bruges en anden gang, at sørge for at kun lave ét _instance_ for hver fejlet faktura, hvor, som I kan se jeg har taget med i mit eksempel, så går faktura-nummer 4909 igen to gange, da var flere fejl på samme faktura.

Så måske et output a la sådan noget her 🤷

```bash
Invoice: 4909
SPE-16-029712-9000
SPE-16-029712-9001

Invoice: 4596
SPE-16-029719-9000

Invoice: 4621
LKO-11-029559-8437

.....

```

Men vi fik hjulpet kunden i mål lynhurtigt, så det ikke kun er deres finanslager der stemmer, men nu også deres finans! 🤝

Scriptet er jo meget niche, og _meget_ specifikt, men det er tilgængelig som en del af [rackbeat-tools](https://github.com/mikkelrask/rackbeat-tools) (MIT), hvis andre har en uoverskuelig log der skal parses på notifikations-siden - og kan nemt justeres til identificere andre fejlbeskeder, eller identificere flere forskellige typer fejl.

_\*Filen har ikke .🔥 filformatet, som indlæget indikerer. Det ser jo bare sejere ud._
