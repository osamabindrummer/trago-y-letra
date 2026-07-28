# Perfiles de autor en desarrollo

Inventario generado el 2026-07-28 desde `data/source/catalog.json`.

Para iniciar el trabajo en otra sesión, usa
`docs/AUTHOR_PROFILE_ENRICHMENT_PROMPT.md`. El encargo comienza con un piloto
revisable de cinco autores antes de escalar la extracción.

## Alcance y criterio

Este archivo incluye los **190 registros** que la web muestra como «Perfil en desarrollo», es decir, autores con `profile_status: minimal`. No incluye los perfiles completos ni cambia el estado editorial de ningún registro.

Para completar una ficha normal se necesita:

- identidad desambiguada y nombre canónico;
- país, nacionalidad o tradición literaria, con redacción proporcional a la fuente;
- año de nacimiento;
- año de fallecimiento o confirmación de que la persona vive;
- reseña original breve en español, de una o dos frases;
- dos obras destacadas, con título y metadatos comprobados;
- fuentes trazables para toda afirmación biográfica material;
- revisión final y cambio de `profile_status` a `full` sólo después de validar el catálogo.

Wikipedia y Wikidata pueden orientar la búsqueda, pero Wikipedia es una fuente de descubrimiento: el protocolo exige comprobar los datos en fuentes primarias, académicas, institucionales o secundarias reputadas antes de publicar.

## Forma de trabajo para otra sesión

1. Procesar un autor por encargo y conservar sus fuentes y decisiones.
2. Desambiguar la identidad antes de completar datos.
3. Verificar país/tradición, fechas y las dos obras en fuentes identificables.
4. Redactar la reseña con texto propio, sin copiar biografías.
5. Actualizar autor y obras relacionadas en el catálogo canónico.
6. Ejecutar `npm run validate:content`, pruebas, build y QA definido por el PRD.
7. Marcar la casilla sólo cuando la ficha ya no se muestre «en desarrollo».

## Inventario

- [ ] **Agatha Christie** (`agatha-christie`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Aldous Huxley** (`aldous-huxley`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Alexandre Dumas** (`alexandre-dumas`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Alice Sebold** (`alice-sebold`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Anita Diamant** (`anita-diamant`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Ann Brashares** (`ann-brashares`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Anne Mccaffrey** (`anne-mccaffrey`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Anne Rice** (`anne-rice`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Anthony Burgess** (`anthony-burgess`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Antoine De Saint-Exupéry** (`antoine-de-saint-exupery`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Anónimo** (`anonimo`): resolver atribución o mantener la categoría anónima explícita; documentar tradición/contexto sólo si la fuente lo permite; no inventar fechas biográficas; seleccionar hasta dos obras únicamente si son identificables.
- [ ] **Arthur C. Clarke** (`arthur-c-clarke`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Audrey Niffenegger** (`audrey-niffenegger`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Autor no identificado** (`autor-no-identificado`): resolver identidad o mantener la categoría explícita; documentar procedencia/contexto sólo si la fuente lo permite; no inventar nacionalidad ni fechas; asociar obras únicamente cuando estén identificadas.
- [ ] **Barbara Kingsolver** (`barbara-kingsolver`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Bayard Taylor** (`bayard-taylor`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Beatrice Sparks** (`beatrice-sparks`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Benjamin Franklin** (`benjamin-franklin`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Bernard DeVoto** (`bernard-devoto`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Betty Smith** (`betty-smith`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Bobbie Ann Mason** (`bobbie-ann-mason`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Boris Pasternak** (`boris-pasternak`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Bram Stoker** (`bram-stoker`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Brandon Sanderson** (`brandon-sanderson`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Brian Jacques** (`brian-jacques`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **C. S. Lewis** (`c-s-lewis`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Candice Bushnell** (`candice-bushnell`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Carson McCullers** (`carson-mccullers`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Charlotte Brontë** (`charlotte-bronte`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Chrétien de Troyes** (`chretien-de-troyes`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Chuck Palahniuk** (`chuck-palahniuk`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Clement Clarke Moore** (`clement-clarke-moore`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Cormac Mccarthy** (`cormac-mccarthy`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **D. H. Lawrence** (`d-h-lawrence`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Dan Brown** (`dan-brown`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Daniel Webster** (`daniel-webster`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Daphne De Maurier** (`daphne-du-maurier`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **David Foster Wallace** (`david-foster-wallace`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Deborah Harkness** (`deborah-harkness`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Diana Galbaldon** (`diana-galbaldon`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Don Delillo** (`don-delillo`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Donna Tartt** (`donna-tartt`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Douglas Adams** (`douglas-adams`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Dr. Seuss** (`dr-seuss`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **E. B. White** (`e-b-white`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **E. L. James** (`e-l-james`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Edward Albee** (`edward-albee`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Emily Brontë** (`emily-bronte`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Eric Carle** (`eric-carle`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Erin Morgenstern** (`erin-morgenstern`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Erle Stanley Gardner** (`erle-stanley-gardner`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Ernest Cline** (`ernest-cline`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Esther Forbes** (`esther-forbes`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Eudora Welty** (`eudora-welty`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Evelyn Waugh** (`evelyn-waugh`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Frances Hodgson Burnett** (`frances-hodgson-burnett`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Frank Herbert** (`frank-herbert`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Franz Kafka** (`franz-kafka`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Fyodor Dostoyevsky** (`fyodor-dostoyevsky`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Gabriel Garcia Marquez** (`gabriel-garcia-marquez`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Garth Nix** (`garth-nix`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Gayle Foreman** (`gayle-foreman`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **George Orwell** (`george-orwell`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **George R. R. Martin** (`george-r-r-martin`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **George Washington** (`george-washington`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Gillian Flynn** (`gillian-flynn`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Graham Greene** (`graham-greene`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Gustave Flaubert** (`gustave-flaubert`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **H. G. Wells** (`h-g-wells`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Harlan Coben** (`harlan-coben`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Harper Lee** (`harper-lee`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Haruki Murakami** (`haruki-murakami`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Helen Fielding** (`helen-fielding`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Herman Melville** (`herman-melville`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Homer** (`homer`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Isaac Asimov** (`isaac-asimov`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **J. K. Rowling** (`j-k-rowling`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **J. R. R. Tolkien** (`j-r-r-tolkien`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Jack London** (`jack-london`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **James Joyce** (`james-joyce`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **James M. Cain** (`james-m-cain`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **James Patterson** (`james-patterson`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Jane Austen** (`jane-austen`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Jhumpa Lahiri** (`jhumpa-lahiri`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Jim Butcher** (`jim-butcher`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **John Betjeman** (`john-betjeman`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **John Green** (`john-green`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **John Irving** (`john-irving`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **John Kennedy Toole** (`john-kennedy-toole`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **John Le Carre** (`john-le-carre`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **John Steinbeck** (`john-steinbeck`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **John Updike** (`john-updike`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Jonathan Franzen** (`jonathan-franzen`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Jonathan Swift** (`jonathan-swift`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Joseph Conrad** (`joseph-conrad`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Joseph Heller** (`joseph-heller`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Junot Díaz** (`junot-diaz`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Ken Follett** (`ken-follett`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Kenneth Roberts** (`kenneth-roberts`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Khaled Hosseini** (`khaled-hosseini`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Kurt Vonnegut** (`kurt-vonnegut`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Lafcadio Hearn** (`lafcadio-hearn`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Laura Joffe Numeroff** (`laura-joffe-numeroff`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Laurie Halse Anderson** (`laurie-halse-anderson`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Lee Child** (`lee-child`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Lemony Snicket** (`lemony-snicket`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Leo Tolstoy** (`leo-tolstoy`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Lewis Carroll** (`lewis-carroll`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Lisa See** (`lisa-see`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Lois Lowry** (`lois-lowry`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Louis Sachar** (`louis-sachar`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Lydia Maria Child** (`lydia-maria-child`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Lydia Sigourney** (`lydia-sigourney`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Madeline L’Engle** (`madeline-l-engle`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Margaret Atwood** (`margaret-atwood`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Margaret Mitchell** (`margaret-mitchell`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Margaret Wise Brown And Clement Hurd** (`margaret-wise-brown-and-clement-hurd`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Marion Zimmer Bradley** (`marion-zimmer-bradley`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Mark Twain** (`mark-twain`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Markus Zusak** (`markus-zusak`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Mary Shelley** (`mary-shelley`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Maurice Sendak** (`maurice-sendak`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Miguel de Cervantes Saavedra** (`miguel-de-cervantes-saavedra`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Munro Leaf** (`munro-leaf`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Neal Stephenson** (`neal-stephenson`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Neil Gaiman** (`neil-gaiman`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Nicholas Sparks** (`nicholas-sparks`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Nora Roberts** (`nora-roberts`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Norman Collins** (`norman-collins`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Norman Juster** (`norman-juster`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Norman Mailer** (`norman-mailer`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Octavia E. Butler** (`octavia-e-butler`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Oliver Bell Bunce** (`oliver-bell-bunce`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Orson Scott Card** (`orson-scott-card`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **P. D. James** (`p-d-james`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **P. G. Wodehouse** (`p-g-wodehouse`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Patricia Highsmith** (`patricia-highsmith`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Patrick Rothfuss** (`patrick-rothfuss`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Philip K. Dick** (`philip-k-dick`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Philip Larkin** (`philip-larkin`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Philip Pullman** (`philip-pullman`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Ralph Ellison** (`ralph-ellison`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Ray Bradbury** (`ray-bradbury`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Richard Hughes** (`richard-hughes`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Ring Lardner** (`ring-lardner`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Roald Dahl** (`roald-dahl`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Robert Heinlein** (`robert-heinlein`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Robert Jordan** (`robert-jordan`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Robert Louis Stevenson** (`robert-louis-stevenson`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Robert Penn Warren** (`robert-penn-warren`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Robin Hobb** (`robin-hobb`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Robin Mckinley** (`robin-mckinley`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Salman Rushdie** (`salman-rushdie`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Samuel Pepys** (`samuel-pepys`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Sara Gruen** (`sara-gruen`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Sarah Dessen** (`sarah-dessen`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Shel Silverstein** (`shel-silverstein`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Sir Arthur Conan Doyle** (`sir-arthur-conan-doyle`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Sir Walter Scott** (`sir-walter-scott`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Stephanie Meyer** (`stephanie-meyer`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Stephen Chbosky** (`stephen-chbosky`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Stieg Larsson** (`stieg-larsson`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Susanna Clarke** (`susanna-clarke`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Suzanne Collins** (`suzanne-collins`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **T. H. White** (`t-h-white`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Ted Kooser** (`ted-kooser`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Terry Brooks** (`terry-brooks`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Terry Pratchett** (`terry-pratchett`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Theodore Roosevelt** (`theodore-roosevelt`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Thomas Harris** (`thomas-harris`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Thomas Jefferson** (`thomas-jefferson`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Thomas Pynchon** (`thomas-pynchon`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Toni Morrison** (`toni-morrison`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Umberto Eco** (`umberto-eco`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Ursula K. Le Guin** (`ursula-k-le-guin`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Victor Hugo** (`victor-hugo`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Virginia Woolf** (`virginia-woolf`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Vladimir Nabokov** (`vladimir-nabokov`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Voltaire** (`voltaire`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Walker Percy** (`walker-percy`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Washington Irving** (`washington-irving`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **William Butler Yeats** (`william-butler-yeats`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **William Gibson** (`william-gibson`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **William Golding** (`william-golding`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **William Goldman** (`william-goldman`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **William S. Burroughs** (`william-s-burroughs`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **William Shakespeare** (`william-shakespeare`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Yann Martel** (`yann-martel`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Zelda Fitzgerald** (`zelda-fitzgerald`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
- [ ] **Zora Neale Hurston** (`zora-neale-hurston`): país/tradición; nacimiento; fallecimiento o condición de persona viva; reseña breve original; dos obras destacadas con metadatos comprobados.
