#!/usr/bin/env python3
"""Extrae las entradas del EPUB sin modificar la fuente original."""
import json
import re
import sys
import zipfile
from datetime import date
from html import unescape
from xml.etree import ElementTree as ET

EPUB = "library/inbox/literary-libations.epub"
NS = {"opf": "http://www.idpf.org/2007/opf", "dc": "http://purl.org/dc/elements/1.1/"}

def clean(value):
    return re.sub(r"\s+", " ", unescape(value or "")).strip()

def text(element):
    return clean("".join(element.itertext()))

def anchor(element):
    for node in element.iter():
        value = node.attrib.get("id")
        if value:
            return value
    return None

def basis(rationale):
    lower = rationale.lower()
    if any(term in lower for term in ["featured in the book", "appears in the book", "appears in the novel", "drunk occasionally in", "is consumed in", "character drinks", "characters drink", "drink mentioned in", "primary drink mentioned"]):
        return "explicit_in_work"
    if any(term in lower for term in ["author's birth", "author was born", "author grew up", "the author drank", "the author himself", "wrote to his friend", "her personal favorite", "with kerouac", "hemingway as a cocktail"]):
        return "author_biographical"
    if any(term in lower for term in ["set in", "setting", "takes place", "home province", "hailing from", "country of", "region of", "city of", "located in", "home state", "backdrop"]):
        return "geographic_context"
    if any(term in lower for term in ["at the time", "would have been available", "had not yet been invented", "popular during", "published when", "era in", "period-specific"]):
        return "historical_context"
    if any(term in lower for term in ["name alone", "get it?", "namesake cocktail", "named after the title", "title character"]):
        return "title_wordplay"
    if any(term in lower for term in ["ginger beer represents", "ingredients all connect", "brandy for the bloodred", "ingredient"]):
        return "ingredient_symbolism"
    if any(term in lower for term in ["theme", "themes", "story about", "tale about", "novel about", "metaphor", "symbolizes"]):
        return "thematic_pairing"
    if any(term in lower for term in ["mood", "atmosphere", "brooding sense", "tone is", "coldhearted tale", "dark and potent"]):
        return "atmospheric_pairing"
    return "creative_pairing"

def relationship(pairing_basis):
    if pairing_basis == "explicit_in_work":
        return "appears_in_work"
    return "editorial_pairing"

def excerpt(rationale):
    words = rationale.split()
    return " ".join(words[:25])

def claims(rationale, pairing_basis):
    if pairing_basis in {"explicit_in_work", "historical_context", "geographic_context", "author_biographical"}:
        return ["Verificar independientemente las afirmaciones factuales que Makansi usa como fundamento; esta extracción no las aprueba."]
    return []

with zipfile.ZipFile(EPUB) as archive:
    opf = ET.fromstring(archive.read("OEBPS/content.opf"))
    metadata = {
        "title": opf.findtext("opf:metadata/dc:title", namespaces=NS),
        "creator": opf.findtext("opf:metadata/dc:creator", namespaces=NS),
        "publisher": opf.findtext("opf:metadata/dc:publisher", namespaces=NS),
        "identifier": opf.findtext("opf:metadata/dc:identifier", namespaces=NS),
        "date": opf.findtext("opf:metadata/dc:date", namespaces=NS),
        "rights": opf.findtext("opf:metadata/dc:rights", namespaces=NS),
        "language": opf.findtext("opf:metadata/dc:language", namespaces=NS),
    }
    manifest = {item.attrib["id"]: item.attrib["href"] for item in opf.findall("opf:manifest/opf:item", NS)}
    spine = [manifest[item.attrib["idref"]] for item in opf.findall("opf:spine/opf:itemref", NS)]
    output = {"metadata": metadata, "spine": ["OEBPS/" + item for item in spine], "chapters": []}
    for href in spine:
        if not re.match(r"Text/0(0[5-9]|1[0-3])_Chapter", href):
            continue
        root = ET.fromstring(archive.read("OEBPS/" + href))
        nodes = [node for node in root.iter() if node.tag.rsplit("}", 1)[-1] == "p"]
        chapter_title = clean(text(nodes[0])) if nodes else href
        genre = clean(text(nodes[1])) if len(nodes) > 1 else ""
        entries, current = [], None
        mode = "rationale"
        for node in nodes:
            css = node.attrib.get("class", "")
            value = text(node)
            if css == "tit":
                if current:
                    entries.append(current)
                current = {"work_title": value, "author_name": None, "drink_name": None, "rationale_parts": [], "ingredients": [], "instructions": [], "anchor": anchor(node)}
                mode = "rationale"
            elif current and css == "aut":
                current["author_name"] = value.title()
            elif current and css == "pair":
                current["drink_name"] = re.sub(r"^PAIRING:\s*", "", value, flags=re.I)
            elif current and css == "ingh":
                mode = "instructions" if "INSTRUCTION" in value.upper() else "ingredients"
            elif current and css == "ing":
                current["ingredients"].append(value)
            elif current and css.startswith("snlist"):
                current["instructions"].append(re.sub(r"^\d+\.\s*", "", value))
            elif current and css in {"snoindent1", "snoindent5", "chparal"}:
                current["rationale_parts"].append(value)
        if current:
            entries.append(current)
        valid = []
        for entry in entries:
            if not (entry["work_title"] and entry["author_name"] and entry["drink_name"]):
                continue
            rationale = " ".join(entry.pop("rationale_parts"))
            entry["rationale"] = rationale
            entry["pairing_basis"] = basis(rationale)
            entry["relationship_type_candidate"] = relationship(entry["pairing_basis"])
            entry["support_excerpt"] = excerpt(rationale)
            entry["factual_claims_requiring_verification"] = claims(rationale, entry["pairing_basis"])
            valid.append(entry)
        output["chapters"].append({"document": "OEBPS/" + href, "chapter_title": chapter_title, "genre": genre, "entries": valid})

target = open(sys.argv[1], "w", encoding="utf-8") if len(sys.argv) > 1 else sys.stdout
json.dump(output, target, ensure_ascii=False, indent=2)
target.write("\n")
if target is not sys.stdout:
    target.close()
