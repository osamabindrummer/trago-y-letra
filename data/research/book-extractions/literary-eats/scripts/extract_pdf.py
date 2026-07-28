#!/usr/bin/env python3
"""Extrae el texto por página para auditar un PDF local sin alterar su original."""

import json
import sys
from pathlib import Path

from pypdf import PdfReader


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("Uso: extract_pdf.py ENTRADA.pdf SALIDA.json")
    source = Path(sys.argv[1])
    destination = Path(sys.argv[2])
    reader = PdfReader(source)
    pages = [
        {"page_pdf": number, "text": page.extract_text() or ""}
        for number, page in enumerate(reader.pages, start=1)
    ]
    destination.write_text(
        json.dumps({"total_pages": len(pages), "pages": pages}, ensure_ascii=False, indent=2)
        + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
