"""Extrae texto y estructura del EPUB para la revisión local autorizada."""

from __future__ import annotations

import html
import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path


class TextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []
        self.anchors: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = dict(attrs)
        if tag in {"h1", "h2", "h3", "p", "li", "div", "br"}:
            self.parts.append("\n")
        if tag in {"h1", "h2", "h3", "h4", "p", "li"} and attrs_dict.get("id"):
            self.anchors.append(attrs_dict["id"])

    def handle_data(self, data: str) -> None:
        self.parts.append(data)


def clean_text(raw: str) -> str:
    parser = TextExtractor()
    parser.feed(raw)
    text = html.unescape("".join(parser.parts))
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n\s*\n+", "\n", text)
    return text.strip()


def main(epub_path: str, output_path: str) -> None:
    ns = {"opf": "http://www.idpf.org/2007/opf", "dc": "http://purl.org/dc/elements/1.1/"}
    with zipfile.ZipFile(epub_path) as book:
        root = ET.fromstring(book.read("OEBPS/content.opf"))
        manifest = {
            item.attrib["id"]: item.attrib["href"]
            for item in root.find("opf:manifest", ns) or []
        }
        spine = [item.attrib["idref"] for item in root.find("opf:spine", ns) or []]
        records = []
        for position, item_id in enumerate(spine, 1):
            href = manifest[item_id]
            raw = book.read(f"OEBPS/{href}").decode("utf-8")
            records.append(
                {
                    "spine_position": position,
                    "item_id": item_id,
                    "source_document": f"OEBPS/{href}",
                    "text": clean_text(raw),
                }
            )
        metadata = {
            "title": (root.find("opf:metadata/dc:title", ns).text or "").strip(),
            "creator": (root.find("opf:metadata/dc:creator", ns).text or "").strip(),
            "date": (root.find("opf:metadata/dc:date", ns).text or "").strip(),
            "publisher": (root.find("opf:metadata/dc:publisher", ns).text or "").strip(),
            "identifier": (root.find("opf:metadata/dc:identifier", ns).text or "").strip(),
            "language": (root.find("opf:metadata/dc:language", ns).text or "").strip(),
        }
    Path(output_path).write_text(json.dumps({"metadata": metadata, "records": records}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
