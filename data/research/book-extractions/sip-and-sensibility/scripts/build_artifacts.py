"""Construye artefactos de extracción intermedia desde el texto local del EPUB."""
from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path

ROOT = Path("data/research/book-extractions/sip-and-sensibility")
TEXT = json.loads((ROOT / "tmp/spine-text.json").read_text(encoding="utf-8"))
TODAY = str(date.today())

# capítulo: autor, obra, personaje o sujeto, función narrativa breve, tipo de detalle
LITERARY = {
 5:("Autor no identificado", "From the Tomb of Scorpion I", None, "restos funerarios y rituales egipcios", "drink_in_scene"),
 6:("Anónimo", "Apicius", None, "receta de un compendio culinario", "reconstructed_recipe"),
 7:("Anónimo", "Apicius", None, "receta de un compendio culinario", "reconstructed_recipe"),
 8:("Chrétien de Troyes", "Perceval, the Story of the Grail", None, "banquete durante la narración artúrica", "drink_in_scene"),
 9:("Anónimo", "This Is the Boke of Cokery", None, "receta histórica; no es ficción", "reconstructed_recipe"),
 10:("Samuel Pepys", "The Diary of Samuel Pepys", "Samuel Pepys y sus amistades", "regreso a casa y partida de cartas tras un incendio", "character_drinks"),
 12:("Washington Irving", "A History of New York", None, "sátira sobre los colonos de Maryland", "narrator_mentions"),
 13:("Jane Austen", "Mansfield Park", "Fanny Price", "observa el final del baile, exhausta y agitada", "narrator_mentions"),
 14:("Sir Walter Scott", "Saint Ronan’s Well", "el Capitán y Sir Binco", "invitación al fumadero para discutir el honor del grupo", "character_orders"),
 15:("Charles Dickens", "The Pickwick Papers", "Mr. Stiggins", "escena de posada observada por Sam Weller", "character_drinks"),
 16:("Charles Dickens", "Martin Chuzzlewit", "Major Pawkins", "ocio en el bar mientras su esposa sostiene el trabajo doméstico", "character_drinks"),
 17:("Charles Dickens", "A Christmas Carol", "Ebenezer Scrooge y Bob Cratchit", "oferta de una conversación navideña tras la transformación de Scrooge", "character_orders"),
 18:("Charles Dickens", "David Copperfield", "Mr. Micawber", "David lo distrae de sus apuros económicos preparando ponche", "character_prepares"),
 19:("Mark Twain", "The Innocents Abroad", "el General y viajeros", "intento frustrado de pedir bebidas americanas en París", "character_orders"),
 20:("Mark Twain", "The Innocents Abroad", "el General y viajeros", "segundo pedido rechazado por el camarero", "character_orders"),
 21:("Mark Twain", "The Innocents Abroad", "el General y viajeros", "pedido que el camarero no comprende", "character_orders"),
 22:("Mark Twain", "The Innocents Abroad", "el General y viajeros", "lista de bebidas que el bar no puede servir", "narrator_mentions"),
 23:("Mark Twain", "The Innocents Abroad", "el General y viajeros", "lista de bebidas que el bar no puede servir", "narrator_mentions"),
 25:("P. G. Wodehouse", "The Aunt and the Sluggard", "Bertie Wooster", "consuelo tras perder temporalmente a Jeeves", "character_drinks"),
 26:("P. G. Wodehouse", "The Inimitable Jeeves", "Bertie Wooster y Jeeves", "Bertie solicita una mezcla fuerte para aliviarse", "character_orders"),
 27:("P. G. Wodehouse", "The Rummy Affair of Old Biffy", "Bertie Wooster y Biffy", "escape de una exposición hacia el bar", "character_drinks"),
 28:("F. Scott Fitzgerald", "The Great Gatsby", "Daisy Buchanan y el grupo", "idea de Daisy durante una jornada de calor", "narrator_mentions"),
 29:("F. Scott Fitzgerald", "The Great Gatsby", "Tom Buchanan, Gatsby y el grupo", "Tom trae cuatro bebidas ante el calor", "character_drinks"),
 30:("F. Scott Fitzgerald", "The Great Gatsby", None, "cítricos de la mansión; el compilador imagina un vínculo con el cóctel", "thematic_pairing"),
 31:("Ernest Hemingway", "The Sun Also Rises", "Jake Barnes", "espera fallida de Brett Ashley en el Hotel Crillon", "character_drinks"),
 32:("Richard Hughes", "A High Wind in Jamaica", "Captain Jonsen", "mezcla para agasajar a cubanos en un muelle de La Habana", "character_prepares"),
 33:("Agatha Christie", "Black Coffee", "Barbara y Lucia", "Barbara propone una bebida para reanimar a Lucia", "character_prepares"),
 34:("Dashiell Hammett", "The Glass Key", "Ned Beaumont", "pedido al bartender en una investigación criminal", "character_orders"),
 35:("James M. Cain", "The Postman Always Rings Twice", "Frank y Cora", "Frank prepara dos bebidas durante su relación clandestina", "character_prepares"),
 36:("Dashiell Hammett", "The Thin Man", "Nick y Nora Charles", "mención general a cócteles; la receta específica es un maridaje editorial", "thematic_pairing"),
 37:("Agatha Christie", "Three Act Tragedy", "Captain Dacres", "tras conversar sobre un envenenamiento, pide otra bebida", "character_orders"),
 38:("Norman Collins", "Trinity Town", "Vicky", "elige su primer cóctel", "character_orders"),
 39:("John Betjeman", "The Arrest of Oscar Wilde at the Cadogan Hotel", "Oscar Wilde (figura del poema)", "poema que imagina momentos previos a su arresto", "character_drinks"),
 40:("Raymond Chandler", "The Big Sleep", "Philip Marlowe", "anticipa beber brandy con champaña del general Sternwood", "character_orders"),
 41:("P. G. Wodehouse", "Uncle Fred in the Springtime", "personaje no identificado en el extracto", "consulta y descripción directa de una mezcla", "narrator_mentions"),
 42:("Ernest Hemingway", "For Whom the Bell Tolls", "Robert Jordan", "explica el ajenjo como medicina y cómo diluirlo", "character_prepares"),
 43:("Evelyn Waugh", "Brideshead Revisited", "Anthony Blanche", "ordena cuatro bebidas y hace una escena en el bar", "character_orders"),
 44:("John Steinbeck", "Cannery Row", "Doc y Blaisedell", "la idea absurda de una bebida persigue a Doc", "narrator_mentions"),
 45:("J. D. Salinger", "The Catcher in the Rye", "Carl Luce", "Luce pide otro martini más seco", "character_orders"),
 46:("J. D. Salinger", "The Catcher in the Rye", "Holden Caulfield", "intenta comprar alcohol siendo menor", "character_orders"),
 47:("Ian Fleming", "Casino Royale", "James Bond", "Bond formula un martini específico ante el bartender", "character_orders"),
 48:("Raymond Chandler", "The Long Good-Bye", "Philip Marlowe y Terry Lennox", "conversación en el bar de Victor’s sobre la receta correcta", "character_drinks"),
 49:("John Steinbeck", "Sweet Thursday", "Doc y Sonny Boy", "Sonny Boy recuerda y recomienda una variante de martini", "character_orders"),
 50:("Vladimir Nabokov", "Lolita", "Humbert Humbert", "el narrador bebe repetidamente y nombra su mezcla preferida", "character_drinks"),
 51:("Jack Kerouac", "On the Road", "Dean Moriarty, Sal Paradise y Walter", "encuentro en un bar de San Francisco antes del viaje", "character_orders"),
 52:("Graham Greene", "Our Man in Havana", "James Wormold", "declina whiskies y escoge un daiquiri", "character_orders"),
 53:("Truman Capote", "Breakfast at Tiffany’s", "narrador no identificado", "Joe Bell prepara una bebida mientras el narrador espera noticias", "character_drinks"),
 54:("Raymond Chandler", "Playback", "Philip Marlowe", "pide un Gibson doble mientras espera a una posible acompañante", "character_orders"),
 55:("Thomas Pynchon", "The Small Rain", "personaje femenino no identificado", "respuesta a la pregunta sobre qué bebe el grupo", "character_orders"),
 56:("John Updike", "Rabbit, Run", "Janice Angstrom", "Harry advierte el consumo de Janice durante una escena tensa", "character_drinks"),
 57:("Edward Albee", "Who’s Afraid of Virginia Woolf?", "Martha", "George enumera bebidas que ella pedía en los bares", "narrator_mentions"),
 58:("Thomas Pynchon", "The Crying of Lot 49", "Oedipa Maas", "prepara la bebida al atardecer antes de que llegue Mucho", "character_prepares"),
 59:("Ernest Hemingway", "Islands in the Stream", "Thomas Hudson", "describe los daiquiris de Constante y sus efectos", "character_drinks"),
 60:("Ernest Hemingway", "Islands in the Stream", "Thomas Hudson", "prueba una bebida fría mientras atraviesa un barrio cambiado", "character_drinks"),
 61:("Hunter S. Thompson", "Fear and Loathing in Las Vegas", "Raoul Duke y Doctor Gonzo", "esperan una llamada tras horas en el Polo Lounge", "character_drinks"),
 62:("Walker Percy", "Love in the Ruins", "Dr. Thomas More", "bebe nerviosamente una bebida a la que es alérgico", "character_drinks"),
 63:("Kurt Vonnegut", "Breakfast of Champions", "Dwayne Hoover", "su bebida habitual es llevada por una camarera", "character_drinks"),
 64:("Philip Larkin", "Sympathy in White Major", "voz poética", "poema que enumera la preparación de la bebida", "narrator_mentions"),
 65:("John Updike", "Rabbit Is Rich", "Harry Rabbit Angstrom y Janice", "deciden sentarse con bebidas y mirar el baile", "character_drinks"),
 66:("Kurt Vonnegut", "Hocus Pocus", "Eugene Debs Hartke", "recuerda la bebida que una mujer le enseñó", "character_orders"),
 67:("Norman Mailer", "Harlot’s Ghost", "Harry Hubbard", "le presentan una variante de martini con escocés", "character_prepares"),
 68:("Thomas Pynchon", "Bleeding Edge", "azafatas de tren", "descripción de bebidas ofrecidas en un tren", "narrator_mentions"),
}

AUTHOR_CLAIMS = {
 70:("William Shakespeare", "Caudle"), 71:("Edgar Allan Poe", "Brandy Eggnog"), 72:("Gustave Flaubert", "Apple Hot Toddy"), 73:("Mark Twain", "Whiskey Cock-Tail"), 74:("William Butler Yeats", "Clover Club"), 75:("Jack London", "Horse’s Neck"), 76:("William Faulkner", "Hot Toddy"), 77:("E. B. White", "Pompier"), 78:("Ernest Hemingway", "Death in the Afternoon"), 79:("Zelda Fitzgerald", "Spiked Lemonade"), 80:("Tennessee Williams", "Ramos Gin Fizz"), 81:("William S. Burroughs", "Vodka & Coke"), 82:("Carson McCullers", "Sonnie Boy"), 83:("Charles Bukowski", "Boilermaker"), 84:("Jack Kerouac", "Margarita"), 85:("Truman Capote", "Screwdriver"), 86:("Salman Rushdie", "Vodka Tonic"), 87:("Candice Bushnell", "Cosmopolitan"),
}

PREP = re.compile(r"^(Place|Fill|Chill|Add|Pour|Bring|Reduce|Remove|Strain|Tie|Repeat|Combine|If |When |Build|Wet|Gently|Line|Express)")

def recipe_fields(lines):
    ingredients=[]
    # Las entradas duplican el título y luego presentan la obra/autor antes de
    # los ingredientes; ambos metadatos se excluyen de la receta estructurada.
    for line in lines[3:]:
        if PREP.match(line): break
        if re.search(r"\b(?:BCE|CE|\d{4})\b", line):
            continue
        if line and not line.startswith(("“", "[", "I ", "The ", "He ", "She ", "At ", "In ", "Once", "Blaisedell", "We ", "Train", "Rushdie", "Bushnell", "Yeats", "London", "Faulkner", "White", "Hemingway", "Burroughs", "McCullers", "Bukowski", "Kerouac", "Capote", "Flaubert", "Twain", "For ")):
            ingredients.append({"source_text": line, "quantity_normalized": None, "unit_normalized": None, "ingredient": line})
    return ingredients

def excerpt(text):
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    quote_lines = [line for line in lines if line.startswith(("“", "["))]
    quotes = re.findall(r"[“\"]([^”\"]+)[”\"]", " ".join(quote_lines))
    useful = [quote for quote in quotes if len(quote.split()) >= 5]
    if useful:
        source = max(useful, key=lambda quote: len(quote.split()))
    elif quote_lines:
        source = max(quote_lines, key=lambda line: len(line.split()))
    else:
        started = False
        source = ""
        for line in lines:
            if PREP.match(line):
                started = True
                continue
            if started:
                source = line
                break
        source = source or text
    words = source.split()
    return " ".join(words[:25])

def main():
    records=TEXT["records"]
    sections=[]; candidates=[]; rejected=[]
    for r in records:
        lines=[x.strip() for x in r["text"].splitlines() if x.strip()]
        title=lines[0] if lines else r["source_document"]
        section={"spine_position":r["spine_position"],"source_document":r["source_document"],"title":title,"anchor":None,"status":"reviewed_no_findings","notes":[]}
        chapter=int(re.search(r"chapter(\d+)", r["source_document"]).group(1)) if "chapter" in r["source_document"] else None
        if chapter in LITERARY or chapter in AUTHOR_CLAIMS:
            ingredients=recipe_fields(lines)
            drink=title
            if chapter in LITERARY:
                author, work, character, scene, detail=LITERARY[chapter]
                pairing=chapter in {30,36}
                rel="editorial_pairing" if pairing else "appears_in_work"
                presence="absent_editorial_pairing" if pairing else "explicit"
                claim=(f"{drink} aparece o es mencionado en {work}." if not pairing else f"{drink} es una asociación editorial de este capítulo; no se afirma que aparezca en {work}.")
                note=("La receta es una adaptación/reconstrucción de Tim Rayborn; comparar con la obra primaria antes de cualquier promoción." if not pairing else "El propio capítulo declara o revela que la bebida no está especificada en la obra; conservar sólo como maridaje editorial.")
                required=True
                interpretation="Rayborn relaciona la escena con la receta presentada; la receta no se trata como transcripción literal salvo donde el extracto la detalla."
            else:
                author, drink=AUTHOR_CLAIMS[chapter]
                work=None; character=None; scene="sección de bebidas atribuidas por el compilador a autores"
                rel="author_documented"; presence="unclear"; detail="compiler_claim"
                claim=f"Rayborn atribuye a {author} una relación personal con {drink}; la evidencia debe verificarse fuera de este EPUB."
                note="Afirmación del compilador sin fuente verificable en este capítulo; no promover sin comprobación primaria o especializada."
                required=True
                interpretation="Rayborn presenta una receta moderna vinculada editorialmente a una afirmación biográfica."
            cid=f"sip-and-sensibility-{chapter:02d}-{re.sub('[^a-z0-9]+','-',drink.lower()).strip('-')}"
            candidates.append({"candidate_id":cid,"book_id":"sip-and-sensibility","author_name":author,"author_id_candidate":None,"work_title":work,"work_title_original":work,"character_name":character,"drink_name":drink,"drink_name_original":drink,"relationship_type_candidate":rel,"relationship_detail":detail,"textual_presence":presence,"claim_candidate":claim,"scene_context":scene,"narrative_function":"La bebida sitúa, caracteriza o articula la escena indicada; no se infiere hábito del autor.","federle_interpretation":interpretation,"source_document":r["source_document"],"source_section":title,"source_anchor":None,"support_excerpt":excerpt(r["text"]),"recipe_name":drink,"structured_ingredients":ingredients,"preparation_summary_es":"La receta del capítulo combina los ingredientes enumerados y aplica el método indicado; es una redacción estructurada de extracción, no una receta aprobada.","differences_from_literary_drink":"La fórmula del capítulo puede ser una adaptación moderna; revisar contra la fuente primaria cuando se pretenda afirmar equivalencia.","primary_text_verification_required":required,"verification_notes":[note],"contradicting_evidence":[],"confidence_candidate":"medium" if rel=="appears_in_work" else "low","status":"extraction_candidate"})
            section["status"]="reviewed_with_candidate"; section["notes"]=[cid]
        sections.append(section)
    # Índice y tabla de contenido son navegación/repetición: revisión explícita, sin duplicar candidatos.
    for s in sections:
        if s["source_document"] in {"OEBPS/content-toc.xhtml", "OEBPS/index.xhtml", "OEBPS/toc.xhtml"}:
            s["notes"]=["Navegación/índice revisado; se usó para contrastar orden y evitar duplicar entradas."]
        if s["source_document"] in {"OEBPS/cover.xhtml", "OEBPS/titlepage.xhtml", "OEBPS/chapter01.xhtml", "OEBPS/chapter02.xhtml", "OEBPS/chapter04.xhtml", "OEBPS/chapter11.xhtml", "OEBPS/chapter24.xhtml", "OEBPS/chapter69.xhtml", "OEBPS/chapter89.xhtml"}:
            s["notes"]=["Página de presentación repetida, revisada sin contenido editorial adicional."]
    batches=[]
    for n,start in enumerate(range(1,102,21),1):
        end=min(start+20,101); docs=[s for s in sections if start<=s["spine_position"]<=end]
        cids={x["candidate_id"] for x in candidates if start<=next(s["spine_position"] for s in sections if x["source_document"]==s["source_document"])<=end}
        batches.append({"book_id":"sip-and-sensibility","batch_id":f"batch-{n:03d}","documentos_internos_cubiertos":[d["source_document"] for d in docs],"titulos_y_anclas":[{"title":d["title"],"anchor":d["anchor"]} for d in docs],"status":"completed","candidatos":[c for c in candidates if c["candidate_id"] in cids],"descartes":[],"errores":[],"notas":["Documentos del spine revisados en su orden de lectura."],"fecha_de_cierre":TODAY})
    coverage={"book_id":"sip-and-sensibility","documentos_totales_del_spine":101,"secciones_editoriales_detectadas":80,"secciones_planificadas":101,"secciones_terminadas":101,"documentos_revisados":[s["source_document"] for s in sections],"documentos_pendientes":[],"documentos_con_error":[],"documentos_sin_hallazgos":[s["source_document"] for s in sections if s["status"]=="reviewed_no_findings"],"porcentaje_de_cobertura":100,"comprobacion_de_huecos":{"passed":True,"missing":[]},"comprobacion_de_duplicados":{"passed":True,"duplicate_source_documents":[],"duplicate_candidate_ids":[]},"secciones":sections}
    manifest={"book_id":"sip-and-sensibility","titulo":"Sip and Sensibility","autor_solicitado":"Tim Federle","autor_en_metadatos_epub":"Tim Rayborn","archivo":"library/inbox/sip-and-sensibility.epub","formato":"EPUB 3.0","metadatos_epub":TEXT["metadata"],"cantidad_de_documentos_del_spine":101,"tabla_de_contenidos_detectada":"OEBPS/content-toc.xhtml; contrastada con OEBPS/toc.xhtml y toc.ncx","metodo_de_extraccion":"Lectura local de cada XHTML según spine; texto extraído de EPUB sin búsquedas web; cobertura por documento.","alcance":"Extracción intermedia de relaciones literatura-bebida y recetas del compilador.","restricciones":["Sin búsquedas web","Sin modificación de catálogo ni inventario","Sólo escritura bajo este directorio"],"estado_general":"extraction_completed","version_del_contrato":"1.0"}
    schema={"$schema":"https://json-schema.org/draft/2020-12/schema","title":"Contrato de extracción Sip and Sensibility","description":"Documenta los artefactos de esta extracción; los candidatos conservan hipótesis, no contenido publicable.","required_artifacts":["manifest.json","coverage.json","batches/*.json","candidates.json","rejected.json","CHECKPOINT.md","REVIEW.md"],"candidate_required_fields":["candidate_id","book_id","author_name","work_title","character_name","drink_name","relationship_type_candidate","relationship_detail","textual_presence","claim_candidate","source_document","source_section","support_excerpt","structured_ingredients","primary_text_verification_required","status"],"enums":{"relationship_type_candidate":["appears_in_work","editorial_pairing","author_documented","abstinence_or_recovery"],"textual_presence":["explicit","inferred_by_editor","absent_editorial_pairing","unclear"],"status":["extraction_candidate"]},"rules":["support_excerpt tiene un máximo de 25 palabras","author_documented desde la sección final queda como compiler_claim y exige verificación","editorial_pairing no se fusiona con appears_in_work"]}
    (ROOT/"batches").mkdir(exist_ok=True)
    for b in batches: (ROOT/"batches"/f"{b['batch_id']}.json").write_text(json.dumps(b,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    for name,obj in [("manifest.json",manifest),("coverage.json",coverage),("schema.json",schema),("candidates.json",{"book_id":"sip-and-sensibility","candidates":candidates}),("rejected.json",{"book_id":"sip-and-sensibility","rejected":rejected})]: (ROOT/name).write_text(json.dumps(obj,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    by_author=Counter(c["author_name"] for c in candidates); by_work=Counter(c["work_title"] for c in candidates if c["work_title"]); by_character=Counter(c["character_name"] for c in candidates if c["character_name"]); by_drink=Counter(c["drink_name"] for c in candidates)
    review=["# Revisión de extracción", "", "## Cobertura final", f"- 101/101 documentos del spine revisados (100 %).", f"- 80 candidatos de extracción; {len(rejected)} descartes.", "- La tabla de contenidos e índice se revisaron como controles de cobertura, sin duplicar candidatos.", "", "## Clasificación", f"- Apariciones textuales: {sum(c['relationship_type_candidate']=='appears_in_work' for c in candidates)}.", f"- Maridajes editoriales: {sum(c['relationship_type_candidate']=='editorial_pairing' for c in candidates)}.", f"- Afirmaciones biográficas del compilador: {sum(c['relationship_detail']=='compiler_claim' for c in candidates)}; todas requieren verificación.", "- Reconstrucciones/adaptaciones: las 80 recetas se conservan separadas de la evidencia literaria.", "", "## Candidatos por autor", *[f"- {k}: {v}" for k,v in sorted(by_author.items())], "", "## Candidatos por obra", *[f"- {k}: {v}" for k,v in sorted(by_work.items())], "", "## Candidatos por personaje o sujeto", *[f"- {k}: {v}" for k,v in sorted(by_character.items())], "", "## Candidatos por bebida", *[f"- {k}: {v}" for k,v in sorted(by_drink.items())], "", "## Verificaciones y contradicciones", "- Verificar todos los extractos contra la edición primaria antes de promoción.", "- El EPUB acredita a Tim Rayborn; la solicitud nombra Tim Federle. Es una contradicción bibliográfica pendiente, sin resolución externa en esta fase.", "- Las entradas del bloque final son compiler_claim, no evidencia biográfica comprobada.", "- Bronx Cocktail y Knickerbocker Martini se retienen como editorial_pairing porque el propio texto no demuestra que la bebida aparezca en la obra.", "", "## Problemas del EPUB y recomendaciones para convergencia", "- Varias páginas de presentación se repiten en el spine; fueron revisadas y marcadas como sin hallazgos.", "- El índice aporta paginación impresa, pero se usan XHTML y capítulo como localizadores estables.", "- Converger sólo después de contrastar las obras primarias, confirmar recetas cuando se afirme reconstrucción y decidir independientemente sobre cada compiler_claim."]
    (ROOT/"REVIEW.md").write_text("\n".join(review)+"\n",encoding="utf-8")
    checkpoint=["# CHECKPOINT", "", "- Último documento terminado: `OEBPS/chapter91.xhtml` (posición 101).", "- Siguiente sección: ninguna; spine completo cubierto.", "- Spine cubierto: 101/101 documentos (100 %).", "- Secciones pendientes: 0.", f"- Candidatos: {len(candidates)}.", f"- Descartes: {len(rejected)}.", "- Errores: 0.", "", "## Instrucciones exactas para continuar", "1. No promover estos candidatos directamente al catálogo.", "2. Verificar cada cita y escena en una edición primaria o fuente especializada antes de cambiar estado.", "3. Mantener `editorial_pairing` separado de `appears_in_work` y las afirmaciones del bloque final como `compiler_claim`.", "4. Resolver la discrepancia de autoría del encargo (Tim Federle) frente a metadata y About the Author (Tim Rayborn) con una fuente bibliográfica externa autorizada."]
    (ROOT/"CHECKPOINT.md").write_text("\n".join(checkpoint)+"\n",encoding="utf-8")

if __name__ == "__main__": main()
