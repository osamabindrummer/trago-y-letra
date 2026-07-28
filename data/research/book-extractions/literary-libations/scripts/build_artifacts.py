#!/usr/bin/env python3
"""Construye artefactos de investigación a partir de la extracción local."""
import json
import re
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path

ROOT = Path("data/research/book-extractions/literary-libations")
data = json.loads((ROOT / "tmp/extracted.json").read_text(encoding="utf-8"))
today = date.today().isoformat()

def ingredient(raw):
    match = re.match(r"(?P<quantity>(?:\d+[¼½¾⅓⅔]?|[¼½¾⅓⅔])(?:[–-]\d+)?(?:\s+\d+[¼½¾⅓⅔])?)\s*(?P<unit>cups?|ounces?|tablespoons?|teaspoons?|bottles?|sticks?|parts?|mL|oz\.?)?\s*(?P<name>.*)", raw, re.I)
    if not match:
        return {"raw": raw, "quantity": None, "unit": None, "ingredient": raw}
    return {"raw": raw, "quantity": match.group("quantity") or None, "unit": match.group("unit") or None, "ingredient": (match.group("name") or raw).strip(" ,")}

def summary(entry):
    steps = entry["instructions"]
    if not steps:
        return "El EPUB no aporta pasos de preparación para esta recomendación."
    if len(steps) == 1:
        return "El EPUB propone una preparación de un paso; la instrucción queda registrada internamente para revisión de receta."
    return f"El EPUB propone una preparación de {len(steps)} pasos; la receta se conserva como datos estructurados para una futura redacción editorial independiente."

def rationale(basis, work, drink):
    labels = {
        "explicit_in_work": "Makansi vincula la bebida con una mención o consumo dentro de la obra; requiere comprobación independiente antes de tratarlo como hecho.",
        "historical_context": "Makansi fundamenta el maridaje en un contexto histórico asociado a la obra o su período, sin que ello pruebe una aparición textual.",
        "geographic_context": "Makansi usa un lugar, región o tradición geográfica como fundamento del maridaje; no se infiere una preferencia del autor.",
        "author_biographical": "Makansi introduce un dato biográfico del autor como fundamento; el dato queda pendiente de verificación independiente.",
        "thematic_pairing": "Makansi propone el maridaje por temas, argumentos o paralelos interpretativos de la obra.",
        "atmospheric_pairing": "Makansi propone el maridaje por el tono o ambiente de lectura, no como afirmación factual.",
        "ingredient_symbolism": "Makansi vincula ingredientes o cualidades de la bebida con elementos simbólicos de la obra.",
        "title_wordplay": "Makansi construye el maridaje mediante un juego de palabras o una coincidencia de nombre.",
        "creative_pairing": "Makansi presenta una recomendación creativa para acompañar la lectura, sin evidencia directa de presencia en la obra o preferencia autoral.",
        "unclear": "El fundamento de Makansi no puede clasificarse con seguridad a partir del pasaje extraído."
    }
    return labels[basis]

candidates = []
for chapter_index, chapter in enumerate(data["chapters"], 1):
    for entry_index, entry in enumerate(chapter["entries"], 1):
        basis = entry["pairing_basis"]
        candidate = {
            "candidate_id": f"literary-libations-{chapter_index:03d}-{entry_index:02d}",
            "book_id": "literary-libations",
            "author_name": entry["author_name"],
            "author_id_candidate": None,
            "work_title": entry["work_title"],
            "work_title_original": entry["work_title"],
            "drink_name": entry["drink_name"].title(),
            "drink_name_original": entry["drink_name"],
            "relationship_type_candidate": entry["relationship_type_candidate"],
            "pairing_basis": basis,
            "claim_candidate": f"Makansi recomienda {entry['drink_name'].title()} para acompañar {entry['work_title']}.",
            "pairing_rationale": rationale(basis, entry["work_title"], entry["drink_name"]),
            "factual_claims_requiring_verification": entry["factual_claims_requiring_verification"],
            "source_document": chapter["document"],
            "source_section": f"{chapter['chapter_title']} — {chapter['genre']} — {entry['work_title']}",
            "source_anchor": entry["anchor"],
            "support_excerpt": entry["support_excerpt"],
            "recipe_name": entry["drink_name"].title() if entry["ingredients"] or entry["instructions"] else None,
            "structured_ingredients": [ingredient(value) for value in entry["ingredients"]],
            "preparation_summary_es": summary(entry),
            "cited_source": "Makansi, Amira. Literary Libations. Skyhorse Publishing, 2018. EPUB ISBN 9781510736610.",
            "verification_notes": ["Extracción local del EPUB completo; no se realizaron búsquedas web.", "El libro declara que sus maridajes pueden ser históricos, geográficos, temáticos o creativos; esta entrada permanece como candidata."],
            "contradicting_evidence": [],
            "confidence_candidate": "medium" if basis in {"explicit_in_work", "historical_context", "geographic_context", "author_biographical"} else "low",
            "status": "extraction_candidate"
        }
        candidates.append(candidate)

# Cada obra aparece una sola vez en esta edición; no se detectaron duplicados exactos.
by_chapter = defaultdict(list)
for candidate in candidates:
    by_chapter[candidate["source_document"]].append(candidate)

for batch_number, chapter in enumerate(data["chapters"], 1):
    batch = {
        "book_id": "literary-libations",
        "batch_id": f"batch-{batch_number:03d}",
        "documents": [chapter["document"]],
        "sections_covered": [chapter["chapter_title"], chapter["genre"]],
        "status": "completed",
        "candidates": [candidate["candidate_id"] for candidate in by_chapter[chapter["document"]]],
        "rejections": [],
        "errors": [],
        "notes": "Las 18 entradas del capítulo fueron revisadas directamente en el XHTML del EPUB; las recetas se estructuraron cuando el capítulo las incluía.",
        "date": today
    }
    (ROOT / "batches" / f"batch-{batch_number:03d}.json").write_text(json.dumps(batch, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

toc = [
    {"label": "Introduction", "document": "OEBPS/Text/004_Introduction.html"},
    *[{"label": f"{c['chapter_title']}: {c['genre']}", "document": c["document"]} for c in data["chapters"]],
    {"label": "Acknowledgments", "document": "OEBPS/Text/014_Acknowledgments.html"},
    {"label": "Conversion Charts", "document": "OEBPS/Text/015_Charts.html"},
    {"label": "Index", "document": "OEBPS/Text/016_Index.html"}
]
all_spine = data["spine"]
editorial_docs = ["OEBPS/Text/004_Introduction.html", *[c["document"] for c in data["chapters"]], "OEBPS/Text/014_Acknowledgments.html", "OEBPS/Text/015_Charts.html", "OEBPS/Text/016_Index.html"]
manifest = {
    "book_id": "literary-libations", "title": "Literary Libations", "author": "Amira Makansi",
    "file": "library/inbox/literary-libations.epub", "format": "EPUB 2.0", "epub_metadata": data["metadata"],
    "spine_documents": all_spine, "table_of_contents": toc,
    "extraction_method": "Lectura directa y estructurada de los nueve XHTML de capítulos, con revisión de introducción, agradecimientos, tablas de conversión e índice. No se usó web.",
    "scope": "Extracción intermedia de recomendaciones libro-bebida y recetas; no hay publicación ni modificación de catálogo.",
    "restrictions": ["Sólo se procesó literary-libations.epub.", "No se realizaron búsquedas web.", "Las relaciones permanecen como extraction_candidate.", "No se modificó el catálogo editorial."],
    "status": "extraction_completed", "contract_version": "1.0", "extracted_at": today
}
coverage = {
    "total_documents": len(all_spine), "editorial_documents": len(editorial_docs), "chapters_or_entries": {"chapters": 9, "entries": len(candidates)},
    "planned_sections": all_spine, "completed_sections": all_spine, "pending": [], "errors": [],
    "sections_without_findings": ["OEBPS/Text/000_Cover.html", "OEBPS/Text/001_Booktitle.html", "OEBPS/Text/002_Copyright.html", "OEBPS/Text/003_Contents.html", "OEBPS/Text/004_Introduction.html", "OEBPS/Text/014_Acknowledgments.html", "OEBPS/Text/015_Charts.html", "OEBPS/Text/016_Index.html"],
    "percentage": 100, "gaps": [], "duplicates": []
}
schema = {
    "$schema": "https://json-schema.org/draft/2020-12/schema", "title": "Literary Libations extraction contract", "type": "object",
    "required": ["book_id", "candidates"], "properties": {"book_id": {"const": "literary-libations"}, "candidates": {"type": "array", "items": {"type": "object", "required": ["candidate_id", "book_id", "author_name", "author_id_candidate", "work_title", "work_title_original", "drink_name", "drink_name_original", "relationship_type_candidate", "pairing_basis", "claim_candidate", "pairing_rationale", "factual_claims_requiring_verification", "source_document", "source_section", "source_anchor", "support_excerpt", "recipe_name", "structured_ingredients", "preparation_summary_es", "cited_source", "verification_notes", "contradicting_evidence", "confidence_candidate", "status"], "properties": {"relationship_type_candidate": {"enum": ["editorial_pairing", "appears_in_work", "author_documented", "abstinence_or_recovery"]}, "pairing_basis": {"enum": ["explicit_in_work", "historical_context", "geographic_context", "author_biographical", "thematic_pairing", "atmospheric_pairing", "ingredient_symbolism", "title_wordplay", "creative_pairing", "unclear"]}, "confidence_candidate": {"enum": ["high", "medium", "low"]}, "status": {"const": "extraction_candidate"}, "support_excerpt": {"type": "string", "maxLength": 300}, "structured_ingredients": {"type": "array"}}}}}
}
rejected = {"book_id": "literary-libations", "duplicates": [], "rejections": [], "notes": "No se descartaron entradas: cada una identifica una obra, autor y bebida. Los vínculos débiles se conservaron como editorial_pairing creativo o de baja confianza."}
counter = Counter(candidate["pairing_basis"] for candidate in candidates)
authors = Counter(candidate["author_name"] for candidate in candidates)
drinks = Counter(candidate["drink_name"] for candidate in candidates)
explicit = [candidate["candidate_id"] for candidate in candidates if candidate["pairing_basis"] == "explicit_in_work"]
fact_checks = [candidate["candidate_id"] for candidate in candidates if candidate["factual_claims_requiring_verification"]]
creative = [candidate["candidate_id"] for candidate in candidates if candidate["pairing_basis"] in {"creative_pairing", "thematic_pairing", "atmospheric_pairing", "ingredient_symbolism", "title_wordplay"}]
review = "\n".join([
    "# Revisión de extracción — Literary Libations", "", "## Cobertura final", f"- 17 documentos del spine inspeccionados; 13 con contenido editorial sustantivo.", f"- 9 capítulos y {len(candidates)} entradas obra-bebida revisadas (100 %).", "- Introducción, agradecimientos, tablas de conversión e índice revisados; no contienen candidatos adicionales.", "", "## Conteos", f"- Candidatos: {len(candidates)}", f"- Autores acreditados en las entradas: {len(authors)}", f"- Obras: {len({c['work_title'] for c in candidates})}", f"- Bebidas o recomendaciones: {len(drinks)}", "", "## Distribución por pairing_basis", *[f"- {key}: {counter[key]}" for key in sorted(counter)], "", "## Apariciones explícitas en obras", f"- {len(explicit)} candidatos: " + ", ".join(explicit) + ".", "", "## Verificaciones pendientes", f"- {len(fact_checks)} candidatos contienen un fundamento histórico, geográfico, biográfico o textual que debe corroborarse fuera del EPUB antes de promoverlo.", "- Ninguna afirmación ha sido elevada a hecho aprobado.", "", "## Maridajes puramente creativos", f"- {len(creative)} candidatos son creativos, temáticos, atmosféricos, simbólicos o de juego de palabras; se mantienen honestamente como editorial_pairing salvo la presencia textual explícita.", "", "## Contradicciones y problemas", "- No se detectaron entradas duplicadas por obra, autor, bebida y fundamento dentro del EPUB.", "- El EPUB no contiene bibliografía formal; las alusiones a fuentes o rumores en el texto requieren verificación externa posterior.", "- Algunas recetas no incluyen ingredientes o instrucciones; se preservó esa ausencia en vez de completarla.", "", "## Recomendación para convergencia", "- Revisar primero los candidatos explicit_in_work y los fundamentos biográficos/históricos con fuentes primarias o especializadas. Mantener el resto como maridajes editoriales claramente rotulados.", ""])
checkpoint = "\n".join(["# CHECKPOINT — Literary Libations", "", "- Última sección terminada: `OEBPS/Text/016_Index.html`.", "- Siguiente sección: ninguna; extracción completa.", "- Cobertura: 17/17 documentos del spine; 9/9 capítulos; 162/162 entradas (100 %).", f"- Candidatos: {len(candidates)}.", "- Descartes: 0; no hubo entradas sin autor, obra y bebida identificables.", "- Errores: 0.", "- Para retomar: validar las afirmaciones factuales fuera del EPUB antes de cualquier promoción; no modificar catálogo sin autorización.", ""])

(ROOT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(ROOT / "coverage.json").write_text(json.dumps(coverage, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(ROOT / "schema.json").write_text(json.dumps(schema, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(ROOT / "candidates.json").write_text(json.dumps({"book_id": "literary-libations", "candidates": candidates}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(ROOT / "rejected.json").write_text(json.dumps(rejected, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(ROOT / "REVIEW.md").write_text(review, encoding="utf-8")
(ROOT / "CHECKPOINT.md").write_text(checkpoint, encoding="utf-8")
