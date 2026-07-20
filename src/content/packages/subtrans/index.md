---
title: subtrans
description: Python-værktøj der oversætter undertekster (.srt/.ass) fra engelsk til dansk med lokale Helsinki-NLP maskinoversættelsesmodeller. Kan også udtrække undertekster fra medie-filer og oversætte dem automatisk.
date: 2025-02-19
update: 2025-02-20
type: cli
language: python
os: windows, macos, linux
github: https://github.com/mikkelrask/subtrans
---

En Python-app der bruger lokale machine learning-modeller til at oversætte undertekster — som udgangspunkt med **Helsinki-NLP English to Danish**-modellen, men den kan sagtens stilles om til andre af Helsinki-NLP's sprogpar.

## Features

- Oversætter undertekstfiler fra engelsk til dansk ud af boksen
- Kører lokalt — intet internet nødvendigt efter første modeldownload
- Bevarer alle timings og formattering
- Håndterer multi-line dialog og dialogmarkører
- GPU-acceleration (CUDA), hvis du har en
- Batch-processing der automatisk springer allerede oversatte filer over
- Understøtter `.srt` og `.ass`, samt udtræk af undertekster fra medie-filer

## Skift sprog

```python
# src/config.py
SOURCE_LANG = "en"
TARGET_LANG = "da"
```

## Installation

```bash
git clone https://github.com/mikkelrask/subtrans.git
cd subtrans
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Kræver Python 3.x og `ffmpeg` til udtræk af undertekster. CUDA-GPU er valgfrit for hurtigere kørsel.

