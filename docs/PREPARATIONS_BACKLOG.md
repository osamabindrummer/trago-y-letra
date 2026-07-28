# Preparaciones pendientes o limitadas a servicio

Inventario generado el 2026-07-28 desde `data/source/catalog.json`.

## Alcance y criterio

Este archivo incluye las **80 bebidas** usadas por recomendaciones publicadas que tienen `recipe_status: serving_only`. En la web, su preparación se limita a una indicación de servicio —por ejemplo, servir fría o a la temperatura adecuada— y, por tanto, **no constituye una receta**.

La lista no afirma que las 80 necesiten convertirse en cócteles. Cada caso requiere una decisión editorial:

- **Servicio directo legítimo:** vino, cerveza, destilado, agua u otra bebida que no requiere elaboración. Mejorar temperatura, vaso, cantidad y servicio cuando aporte valor, manteniendo `serving_only`.
- **Preparación real pendiente:** bebida elaborada, histórica, ficticia o compuesta que sí necesita ingredientes y pasos. Crear una receta original de la casa o una adaptación verificable, separada de la evidencia literaria.
- **Entidad demasiado genérica o duplicada:** revisar si debe normalizarse, fusionarse o precisarse antes de redactar.
- **No es una bebida/receta utilizable:** mantener la recomendación trazable, pero elevar el caso a revisión editorial en vez de inventar una fórmula.

Cuando corresponda una receta, la ficha requiere nombre normalizado, categoría, indicador alcohólico, ingredientes en unidades métricas, uno a seis pasos, vaso, decoración opcional y nota de variante histórica. La redacción debe ser propia.

## Forma de trabajo para otra sesión

1. Revisar bebida, recomendación, autor y fuente bibliográfica juntos.
2. Clasificar el caso en una de las cuatro decisiones anteriores.
3. Para recetas reales, consultar fuentes fiables de coctelería o cocina y registrar procedencia; no copiar instrucciones expresivas.
4. Reutilizar entidades existentes y evitar recetas duplicadas por alias.
5. Actualizar el catálogo y validar que la tarjeta muestre información útil.
6. Ejecutar `npm run validate:content`, pruebas, build y QA visual.
7. Marcar la casilla sólo cuando el caso haya sido resuelto editorialmente.

## Inventario

- [ ] **Agua con gas** (`agua-con-gas`) — autores: Antoine De Saint-Exupéry.
- [ ] **Agua de coco** (`agua-de-coco`) — autores: William Golding.
- [ ] **Agua de grifo** (`tap-water`) — autores: Barbara Kingsolver.
- [ ] **Aguardiente** (`aguardiente`) — autores: Gabriel Garcia Marquez.
- [ ] **Akavit** (`akavit`) — autores: Stieg Larsson.
- [ ] **Ale inglesa** (`english-ale`) — autores: J. R. R. Tolkien.
- [ ] **Anchor Steam Beer** (`anchor-steam-beer`) — autores: Jack Kerouac.
- [ ] **Arak** (`arak`) — autores: Frank Herbert.
- [ ] **Banyuls, vin doux naturel** (`banyuls-vin-doux-naturel`) — autores: Alexandre Dumas.
- [ ] **Barleywine** (`barleywine`) — autores: Patrick Rothfuss.
- [ ] **Barolo o Barbaresco** (`barolo-or-barbaresco`) — autores: George R. R. Martin.
- [ ] **Bordeaux** (`bordeaux`) — autores: Charles Dickens.
- [ ] **Brandy de Jerez Solera** (`brandy-de-jerez-solera`) — autores: Miguel de Cervantes Saavedra.
- [ ] **Budweiser** (`budweiser`) — autores: John Kennedy Toole.
- [ ] **Cabernet Sauvignon de Napa Valley** (`napa-valley-cabernet-sauvignon`) — autores: Herman Melville.
- [ ] **Café** (`cafe`) — autores: Esther Forbes.
- [ ] **Café de achicoria** (`cafe-de-achicoria`) — autores: Betty Smith.
- [ ] **Calvados, Pays d’Auge** (`calvados-pays-dauge`) — autores: Gustave Flaubert.
- [ ] **Carpano Antica Formula** (`carpano-antica-formula`) — autores: Patricia Highsmith.
- [ ] **Cerveza con esencia de abeto** (`cerveza-con-esencia-de-abeto`) — autores: Benjamin Franklin.
- [ ] **Cerveza de caqui** (`cerveza-de-caqui`) — autores: Thomas Jefferson.
- [ ] **Cerveza de mantequilla** (`cerveza-de-mantequilla`) — autores: J. K. Rowling.
- [ ] **Cerveza levantina** (`levantine-beer`) — autores: Anita Diamant.
- [ ] **Cerveza porter** (`porter-beer`) — autores: Terry Pratchett.
- [ ] **Cerveza saison** (`saison-beer`) — autores: Arthur C. Clarke.
- [ ] **Cerveza trapense** (`trappist-beer`) — autores: Umberto Eco.
- [ ] **Cerveza ácida** (`sour-beer`) — autores: Terry Brooks.
- [ ] **Champaña** (`champagne`) — autores: John Green.
- [ ] **Champaña Blanc de Noirs** (`champagne-blanc-de-noirs`) — autores: Deborah Harkness.
- [ ] **Chardonnay de Oregón** (`oregon-chardonnay`) — autores: D. H. Lawrence.
- [ ] **Chenin Blanc del Valle del Loira** (`loire-valley-chenin-blanc`) — autores: Robert Jordan.
- [ ] **Chianti Classico** (`chianti-classico`) — autores: William Goldman.
- [ ] **Cordial de frutas** (`cordial-de-frutas`) — autores: Eric Carle.
- [ ] **Cru Beaujolais** (`cru-beaujolais`) — autores: Victor Hugo.
- [ ] **Côtes du Rhône** (`cotes-du-rhone`) — autores: T. H. White.
- [ ] **Eiswein** (`eiswein`) — autores: Ursula K. Le Guin.
- [ ] **Fanta naranja** (`fanta-naranja`) — autores: Markus Zusak.
- [ ] **Fino de Jerez** (`fino-sherry`) — autores: Agatha Christie.
- [ ] **Hidromiel** (`mead`) — autores: Marion Zimmer Bradley.
- [ ] **Imperial Russian Stout** (`imperial-russian-stout`) — autores: Leo Tolstoy.
- [ ] **India Pale Ale** (`india-pale-ale`) — autores: Isaac Asimov.
- [ ] **Jerez amontillado** (`amontillado-sherry`) — autores: Virginia Woolf.
- [ ] **Lager local en jarra** (`lager-local-en-jarra`) — autores: Chuck Palahniuk.
- [ ] **Leche o leche vegetal** (`leche-o-leche-vegetal`) — autores: Laura Joffe Numeroff.
- [ ] **Leche vegetal** (`leche-vegetal`) — autores: E. B. White.
- [ ] **Lillet Blanc** (`lillet-blanc`) — autores: H. G. Wells.
- [ ] **Merlot** (`merlot`) — autores: E. L. James.
- [ ] **Oporto tawny** (`tawny-port`) — autores: Charlotte Brontë.
- [ ] **Petite Sirah** (`petite-sirah`) — autores: Joseph Conrad.
- [ ] **Pinot gris de Oregón** (`oregon-pinot-gris`) — autores: Gayle Foreman.
- [ ] **Pinot noir estadounidense** (`american-pinot-noir`) — autores: David Foster Wallace.
- [ ] **Recioto della Valpolicella** (`recioto-della-valpolicella`) — autores: William Shakespeare.
- [ ] **Ribera del Duero** (`ribera-del-duero`) — autores: Ernest Hemingway.
- [ ] **Riesling alemán** (`german-riesling`) — autores: Brandon Sanderson.
- [ ] **Rolling Rock** (`rolling-rock`) — autores: Harlan Coben.
- [ ] **Root beer** (`root-beer`) — autores: Garth Nix.
- [ ] **Rosado provenzal** (`provencal-rose`) — autores: Nicholas Sparks.
- [ ] **Sauternes** (`sauternes`) — autores: Leo Tolstoy.
- [ ] **Scotch añejo** (`scotch-the-older-the-better`) — autores: Diana Galbaldon.
- [ ] **Sidra de manzana** (`hard-apple-cider`) — autores: John Irving.
- [ ] **Sidra de manzana** (`sidra-de-manzana`) — autores: Shel Silverstein.
- [ ] **Sopa de letras** (`sopa-de-letras`) — autores: Norman Juster.
- [ ] **Stout de chocolate** (`chocolate-stout`) — autores: Robin Hobb.
- [ ] **Syrah de Washington** (`washington-syrah`) — autores: Stephanie Meyer.
- [ ] **Tokaji Aszú** (`tokaji-aszu`) — autores: Fyodor Dostoyevsky.
- [ ] **Vin jaune** (`vin-jaune`) — autores: Donna Tartt.
- [ ] **Vino a elección** (`wine-dealers-choice`) — autores: P. D. James.
- [ ] **Vino de diente de león** (`vino-de-diente-de-leon`) — autores: Oliver Bell Bunce.
- [ ] **Vino de grosella** (`vino-de-grosella`) — autores: Lydia Maria Child.
- [ ] **Vino espumoso** (`sparkling-wine`) — autores: Jonathan Franzen.
- [ ] **Vino muscadino** (`muscadine-wine`) — autores: Harper Lee.
- [ ] **Vino tinto griego** (`greek-red-wine`) — autores: Homer.
- [ ] **Vodka estadounidense** (`american-vodka`) — autores: Sylvia Plath.
- [ ] **Vodka ruso** (`russian-vodka`) — autores: Fyodor Dostoyevsky.
- [ ] **Volnay** (`volnay`) — autores: Voltaire.
- [ ] **Whiskey** (`whiskey`) — autores: Cormac Mccarthy.
- [ ] **Whiskey and Soda** (`whiskey-and-soda`) — autores: P. G. Wodehouse, Sir Arthur Conan Doyle.
- [ ] **Whiskey irlandés solo** (`irish-whiskey-neat`) — autores: James Joyce.
- [ ] **Zinfandel blanco** (`white-zinfandel`) — autores: Dan Brown.
- [ ] **Zinfandel de viñas viejas de California** (`california-old-vine-zinfandel`) — autores: John Steinbeck.
