# Revisión del lote pendiente de perfiles

**Fecha de consulta:** 2026-07-28
**Estado editorial:** los 183 registros permanecen exclusivamente como `candidate_generated`; no se modificó `data/source/catalog.json` ni `profile_status`.

## Alcance

Se procesaron en el orden vigente del inventario los 183 IDs ordinarios pendientes. Se excluyeron `anonimo`, `autor-no-identificado`, las casillas completadas y los cinco IDs ya presentes en `pilot-candidates.json`. La salida JSON se ordena por ID para que sea determinista; el procesamiento y las consultas fueron secuenciales.

## Cobertura por campo

| Campo candidato | Cobertura entre identidades confirmadas (168) |
| --- | ---: |
| Nombre canónico | 168 |
| Ciudadanía(s) P27 | 168 |
| Año de nacimiento P569 | 168 |
| Año de fallecimiento P570 | 110 |
| Una o más obras P800 | 140 |

Cada campo conserva procedencia, URL y fecha de consulta en `field_provenance` de [pending-profiles-candidates.json](pending-profiles-candidates.json). Wikidata y Wikipedia son fuentes de descubrimiento estructurado: no constituyen aprobación editorial.

## Candidatos completos

| ID | QID | Página concreta | P800 candidatos |
| --- | --- | --- | ---: |
| `anne-mccaffrey` | [Q233046](https://www.wikidata.org/wiki/Q233046) | [Anne McCaffrey](https://en.wikipedia.org/wiki/Anne_McCaffrey) | 2 |
| `anne-rice` | [Q184785](https://www.wikidata.org/wiki/Q184785) | [Anne Rice](https://en.wikipedia.org/wiki/Anne_Rice) | 1 |
| `anthony-burgess` | [Q217619](https://www.wikidata.org/wiki/Q217619) | [Anthony Burgess](https://en.wikipedia.org/wiki/Anthony_Burgess) | 1 |
| `antoine-de-saint-exupery` | [Q2908](https://www.wikidata.org/wiki/Q2908) | [Antoine de Saint-Exupéry](https://en.wikipedia.org/wiki/Antoine_de_Saint-Exup%C3%A9ry) | 2 |
| `arthur-c-clarke` | [Q47087](https://www.wikidata.org/wiki/Q47087) | [Arthur C. Clarke](https://en.wikipedia.org/wiki/Arthur_C._Clarke) | 2 |
| `beatrice-sparks` | [Q4877197](https://www.wikidata.org/wiki/Q4877197) | [Beatrice Sparks](https://en.wikipedia.org/wiki/Beatrice_Sparks) | 1 |
| `betty-smith` | [Q273730](https://www.wikidata.org/wiki/Q273730) | [Betty Smith](https://en.wikipedia.org/wiki/Betty_Smith) | 1 |
| `boris-pasternak` | [Q41223](https://www.wikidata.org/wiki/Q41223) | [Boris Pasternak](https://en.wikipedia.org/wiki/Boris_Pasternak) | 1 |
| `bram-stoker` | [Q36184](https://www.wikidata.org/wiki/Q36184) | [Bram Stoker](https://en.wikipedia.org/wiki/Bram_Stoker) | 2 |
| `c-s-lewis` | [Q9204](https://www.wikidata.org/wiki/Q9204) | [C. S. Lewis](https://en.wikipedia.org/wiki/C._S._Lewis) | 2 |
| `carson-mccullers` | [Q230591](https://www.wikidata.org/wiki/Q230591) | [Carson McCullers](https://en.wikipedia.org/wiki/Carson_McCullers) | 2 |
| `charlotte-bronte` | [Q127332](https://www.wikidata.org/wiki/Q127332) | [Charlotte Brontë](https://en.wikipedia.org/wiki/Charlotte_Bront%C3%AB) | 2 |
| `chretien-de-troyes` | [Q4302](https://www.wikidata.org/wiki/Q4302) | [Chrétien de Troyes](https://en.wikipedia.org/wiki/Chr%C3%A9tien_de_Troyes) | 2 |
| `clement-clarke-moore` | [Q2978887](https://www.wikidata.org/wiki/Q2978887) | [Clement Clarke Moore](https://en.wikipedia.org/wiki/Clement_Clarke_Moore) | 1 |
| `cormac-mccarthy` | [Q272610](https://www.wikidata.org/wiki/Q272610) | [Cormac McCarthy](https://en.wikipedia.org/wiki/Cormac_McCarthy) | 2 |
| `d-h-lawrence` | [Q34970](https://www.wikidata.org/wiki/Q34970) | [D. H. Lawrence](https://en.wikipedia.org/wiki/D._H._Lawrence) | 2 |
| `david-foster-wallace` | [Q313246](https://www.wikidata.org/wiki/Q313246) | [David Foster Wallace](https://en.wikipedia.org/wiki/David_Foster_Wallace) | 2 |
| `douglas-adams` | [Q42](https://www.wikidata.org/wiki/Q42) | [Douglas Adams](https://en.wikipedia.org/wiki/Douglas_Adams) | 2 |
| `dr-seuss` | [Q298685](https://www.wikidata.org/wiki/Q298685) | [Dr. Seuss](https://en.wikipedia.org/wiki/Dr._Seuss) | 2 |
| `e-b-white` | [Q361617](https://www.wikidata.org/wiki/Q361617) | [E. B. White](https://en.wikipedia.org/wiki/E._B._White) | 2 |
| `edward-albee` | [Q219420](https://www.wikidata.org/wiki/Q219420) | [Edward Albee](https://en.wikipedia.org/wiki/Edward_Albee) | 2 |
| `emily-bronte` | [Q80137](https://www.wikidata.org/wiki/Q80137) | [Emily Brontë](https://en.wikipedia.org/wiki/Emily_Bront%C3%AB) | 2 |
| `eric-carle` | [Q606557](https://www.wikidata.org/wiki/Q606557) | [Eric Carle](https://en.wikipedia.org/wiki/Eric_Carle) | 2 |
| `erle-stanley-gardner` | [Q357065](https://www.wikidata.org/wiki/Q357065) | [Erle Stanley Gardner](https://en.wikipedia.org/wiki/Erle_Stanley_Gardner) | 2 |
| `esther-forbes` | [Q454420](https://www.wikidata.org/wiki/Q454420) | [Esther Forbes](https://en.wikipedia.org/wiki/Esther_Forbes) | 2 |
| `eudora-welty` | [Q259364](https://www.wikidata.org/wiki/Q259364) | [Eudora Welty](https://en.wikipedia.org/wiki/Eudora_Welty) | 2 |
| `evelyn-waugh` | [Q107002](https://www.wikidata.org/wiki/Q107002) | [Evelyn Waugh](https://en.wikipedia.org/wiki/Evelyn_Waugh) | 2 |
| `frances-hodgson-burnett` | [Q276028](https://www.wikidata.org/wiki/Q276028) | [Frances Hodgson Burnett](https://en.wikipedia.org/wiki/Frances_Hodgson_Burnett) | 2 |
| `frank-herbert` | [Q7934](https://www.wikidata.org/wiki/Q7934) | [Frank Herbert](https://en.wikipedia.org/wiki/Frank_Herbert) | 1 |
| `franz-kafka` | [Q905](https://www.wikidata.org/wiki/Q905) | [Franz Kafka](https://en.wikipedia.org/wiki/Franz_Kafka) | 2 |
| `fyodor-dostoyevsky` | [Q991](https://www.wikidata.org/wiki/Q991) | [Fyodor Dostoevsky](https://en.wikipedia.org/wiki/Fyodor_Dostoevsky) | 2 |
| `gabriel-garcia-marquez` | [Q5878](https://www.wikidata.org/wiki/Q5878) | [Gabriel García Márquez](https://en.wikipedia.org/wiki/Gabriel_Garc%C3%ADa_M%C3%A1rquez) | 2 |
| `george-orwell` | [Q3335](https://www.wikidata.org/wiki/Q3335) | [George Orwell](https://en.wikipedia.org/wiki/George_Orwell) | 2 |
| `gustave-flaubert` | [Q43444](https://www.wikidata.org/wiki/Q43444) | [Gustave Flaubert](https://en.wikipedia.org/wiki/Gustave_Flaubert) | 2 |
| `h-g-wells` | [Q42511](https://www.wikidata.org/wiki/Q42511) | [H. G. Wells](https://en.wikipedia.org/wiki/H._G._Wells) | 2 |
| `harper-lee` | [Q182658](https://www.wikidata.org/wiki/Q182658) | [Harper Lee](https://en.wikipedia.org/wiki/Harper_Lee) | 2 |
| `herman-melville` | [Q4985](https://www.wikidata.org/wiki/Q4985) | [Herman Melville](https://en.wikipedia.org/wiki/Herman_Melville) | 1 |
| `homer` | [Q6691](https://www.wikidata.org/wiki/Q6691) | [Homer](https://en.wikipedia.org/wiki/Homer) | 2 |
| `isaac-asimov` | [Q34981](https://www.wikidata.org/wiki/Q34981) | [Isaac Asimov](https://en.wikipedia.org/wiki/Isaac_Asimov) | 2 |
| `j-r-r-tolkien` | [Q892](https://www.wikidata.org/wiki/Q892) | [J. R. R. Tolkien](https://en.wikipedia.org/wiki/J._R._R._Tolkien) | 2 |
| `jack-london` | [Q45765](https://www.wikidata.org/wiki/Q45765) | [Jack London](https://en.wikipedia.org/wiki/Jack_London) | 2 |
| `james-joyce` | [Q6882](https://www.wikidata.org/wiki/Q6882) | [James Joyce](https://en.wikipedia.org/wiki/James_Joyce) | 2 |
| `james-m-cain` | [Q81071](https://www.wikidata.org/wiki/Q81071) | [James M. Cain](https://en.wikipedia.org/wiki/James_M._Cain) | 2 |
| `jane-austen` | [Q36322](https://www.wikidata.org/wiki/Q36322) | [Jane Austen](https://en.wikipedia.org/wiki/Jane_Austen) | 2 |
| `john-kennedy-toole` | [Q313739](https://www.wikidata.org/wiki/Q313739) | [John Kennedy Toole](https://en.wikipedia.org/wiki/John_Kennedy_Toole) | 1 |
| `john-le-carre` | [Q209641](https://www.wikidata.org/wiki/Q209641) | [John le Carré](https://en.wikipedia.org/wiki/John_le_Carr%C3%A9) | 2 |
| `john-steinbeck` | [Q39212](https://www.wikidata.org/wiki/Q39212) | [John Steinbeck](https://en.wikipedia.org/wiki/John_Steinbeck) | 2 |
| `john-updike` | [Q105756](https://www.wikidata.org/wiki/Q105756) | [John Updike](https://en.wikipedia.org/wiki/John_Updike) | 1 |
| `jonathan-swift` | [Q41166](https://www.wikidata.org/wiki/Q41166) | [Jonathan Swift](https://en.wikipedia.org/wiki/Jonathan_Swift) | 2 |
| `joseph-conrad` | [Q82925](https://www.wikidata.org/wiki/Q82925) | [Joseph Conrad](https://en.wikipedia.org/wiki/Joseph_Conrad) | 2 |
| `joseph-heller` | [Q208101](https://www.wikidata.org/wiki/Q208101) | [Joseph Heller](https://en.wikipedia.org/wiki/Joseph_Heller) | 2 |
| `kenneth-roberts` | [Q346729](https://www.wikidata.org/wiki/Q346729) | [Kenneth Roberts (author)](https://en.wikipedia.org/wiki/Kenneth_Roberts_(author)) | 1 |
| `kurt-vonnegut` | [Q49074](https://www.wikidata.org/wiki/Q49074) | [Kurt Vonnegut](https://en.wikipedia.org/wiki/Kurt_Vonnegut) | 2 |
| `leo-tolstoy` | [Q7243](https://www.wikidata.org/wiki/Q7243) | [Leo Tolstoy](https://en.wikipedia.org/wiki/Leo_Tolstoy) | 2 |
| `lewis-carroll` | [Q38082](https://www.wikidata.org/wiki/Q38082) | [Lewis Carroll](https://en.wikipedia.org/wiki/Lewis_Carroll) | 2 |
| `lydia-maria-child` | [Q443132](https://www.wikidata.org/wiki/Q443132) | [Lydia Maria Child](https://en.wikipedia.org/wiki/Lydia_Maria_Child) | 2 |
| `lydia-sigourney` | [Q4418695](https://www.wikidata.org/wiki/Q4418695) | [Lydia Sigourney](https://en.wikipedia.org/wiki/Lydia_Sigourney) | 1 |
| `margaret-mitchell` | [Q173540](https://www.wikidata.org/wiki/Q173540) | [Margaret Mitchell](https://en.wikipedia.org/wiki/Margaret_Mitchell) | 2 |
| `marion-zimmer-bradley` | [Q465179](https://www.wikidata.org/wiki/Q465179) | [Marion Zimmer Bradley](https://en.wikipedia.org/wiki/Marion_Zimmer_Bradley) | 2 |
| `mark-twain` | [Q7245](https://www.wikidata.org/wiki/Q7245) | [Mark Twain](https://en.wikipedia.org/wiki/Mark_Twain) | 2 |
| `mary-shelley` | [Q47152](https://www.wikidata.org/wiki/Q47152) | [Mary Shelley](https://en.wikipedia.org/wiki/Mary_Shelley) | 2 |
| `maurice-sendak` | [Q314771](https://www.wikidata.org/wiki/Q314771) | [Maurice Sendak](https://en.wikipedia.org/wiki/Maurice_Sendak) | 2 |
| `miguel-de-cervantes-saavedra` | [Q5682](https://www.wikidata.org/wiki/Q5682) | [Miguel de Cervantes](https://en.wikipedia.org/wiki/Miguel_de_Cervantes) | 2 |
| `munro-leaf` | [Q717175](https://www.wikidata.org/wiki/Q717175) | [Munro Leaf](https://en.wikipedia.org/wiki/Munro_Leaf) | 1 |
| `octavia-e-butler` | [Q239739](https://www.wikidata.org/wiki/Q239739) | [Octavia E. Butler](https://en.wikipedia.org/wiki/Octavia_E._Butler) | 2 |
| `p-d-james` | [Q270648](https://www.wikidata.org/wiki/Q270648) | [P. D. James](https://en.wikipedia.org/wiki/P._D._James) | 1 |
| `patricia-highsmith` | [Q270635](https://www.wikidata.org/wiki/Q270635) | [Patricia Highsmith](https://en.wikipedia.org/wiki/Patricia_Highsmith) | 2 |
| `philip-k-dick` | [Q171091](https://www.wikidata.org/wiki/Q171091) | [Philip K. Dick](https://en.wikipedia.org/wiki/Philip_K._Dick) | 2 |
| `ralph-ellison` | [Q299965](https://www.wikidata.org/wiki/Q299965) | [Ralph Ellison](https://en.wikipedia.org/wiki/Ralph_Ellison) | 2 |
| `ray-bradbury` | [Q40640](https://www.wikidata.org/wiki/Q40640) | [Ray Bradbury](https://en.wikipedia.org/wiki/Ray_Bradbury) | 2 |
| `richard-hughes` | [Q302433](https://www.wikidata.org/wiki/Q302433) | [Richard Hughes (British writer)](https://en.wikipedia.org/wiki/Richard_Hughes_(British_writer)) | 2 |
| `roald-dahl` | [Q25161](https://www.wikidata.org/wiki/Q25161) | [Roald Dahl](https://en.wikipedia.org/wiki/Roald_Dahl) | 2 |
| `robert-heinlein` | [Q123078](https://www.wikidata.org/wiki/Q123078) | [Robert A. Heinlein](https://en.wikipedia.org/wiki/Robert_A._Heinlein) | 2 |
| `robert-jordan` | [Q166351](https://www.wikidata.org/wiki/Q166351) | [Robert Jordan](https://en.wikipedia.org/wiki/Robert_Jordan) | 1 |
| `robert-louis-stevenson` | [Q1512](https://www.wikidata.org/wiki/Q1512) | [Robert Louis Stevenson](https://en.wikipedia.org/wiki/Robert_Louis_Stevenson) | 2 |
| `robert-penn-warren` | [Q312720](https://www.wikidata.org/wiki/Q312720) | [Robert Penn Warren](https://en.wikipedia.org/wiki/Robert_Penn_Warren) | 2 |
| `samuel-pepys` | [Q106143](https://www.wikidata.org/wiki/Q106143) | [Samuel Pepys](https://en.wikipedia.org/wiki/Samuel_Pepys) | 1 |
| `shel-silverstein` | [Q361257](https://www.wikidata.org/wiki/Q361257) | [Shel Silverstein](https://en.wikipedia.org/wiki/Shel_Silverstein) | 2 |
| `sir-arthur-conan-doyle` | [Q35610](https://www.wikidata.org/wiki/Q35610) | [Arthur Conan Doyle](https://en.wikipedia.org/wiki/Arthur_Conan_Doyle) | 2 |
| `sir-walter-scott` | [Q79025](https://www.wikidata.org/wiki/Q79025) | [Walter Scott](https://en.wikipedia.org/wiki/Walter_Scott) | 2 |
| `stieg-larsson` | [Q186317](https://www.wikidata.org/wiki/Q186317) | [Stieg Larsson](https://en.wikipedia.org/wiki/Stieg_Larsson) | 1 |
| `t-h-white` | [Q453410](https://www.wikidata.org/wiki/Q453410) | [T. H. White](https://en.wikipedia.org/wiki/T._H._White) | 1 |
| `terry-pratchett` | [Q46248](https://www.wikidata.org/wiki/Q46248) | [Terry Pratchett](https://en.wikipedia.org/wiki/Terry_Pratchett) | 2 |
| `toni-morrison` | [Q72334](https://www.wikidata.org/wiki/Q72334) | [Toni Morrison](https://en.wikipedia.org/wiki/Toni_Morrison) | 2 |
| `umberto-eco` | [Q12807](https://www.wikidata.org/wiki/Q12807) | [Umberto Eco](https://en.wikipedia.org/wiki/Umberto_Eco) | 2 |
| `ursula-k-le-guin` | [Q181659](https://www.wikidata.org/wiki/Q181659) | [Ursula K. Le Guin](https://en.wikipedia.org/wiki/Ursula_K._Le_Guin) | 2 |
| `victor-hugo` | [Q535](https://www.wikidata.org/wiki/Q535) | [Victor Hugo](https://en.wikipedia.org/wiki/Victor_Hugo) | 2 |
| `virginia-woolf` | [Q40909](https://www.wikidata.org/wiki/Q40909) | [Virginia Woolf](https://en.wikipedia.org/wiki/Virginia_Woolf) | 2 |
| `vladimir-nabokov` | [Q36591](https://www.wikidata.org/wiki/Q36591) | [Vladimir Nabokov](https://en.wikipedia.org/wiki/Vladimir_Nabokov) | 2 |
| `voltaire` | [Q9068](https://www.wikidata.org/wiki/Q9068) | [Voltaire](https://en.wikipedia.org/wiki/Voltaire) | 2 |
| `walker-percy` | [Q176909](https://www.wikidata.org/wiki/Q176909) | [Walker Percy](https://en.wikipedia.org/wiki/Walker_Percy) | 1 |
| `washington-irving` | [Q181667](https://www.wikidata.org/wiki/Q181667) | [Washington Irving](https://en.wikipedia.org/wiki/Washington_Irving) | 2 |
| `william-golding` | [Q44183](https://www.wikidata.org/wiki/Q44183) | [William Golding](https://en.wikipedia.org/wiki/William_Golding) | 2 |
| `william-goldman` | [Q506885](https://www.wikidata.org/wiki/Q506885) | [William Goldman](https://en.wikipedia.org/wiki/William_Goldman) | 1 |
| `william-shakespeare` | [Q692](https://www.wikidata.org/wiki/Q692) | [William Shakespeare](https://en.wikipedia.org/wiki/William_Shakespeare) | 2 |
| `zora-neale-hurston` | [Q220480](https://www.wikidata.org/wiki/Q220480) | [Zora Neale Hurston](https://en.wikipedia.org/wiki/Zora_Neale_Hurston) | 1 |

## Datos ausentes

| ID | Campos ausentes | Advertencias conservadas |
| --- | --- | --- |
| `ann-brashares` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `audrey-niffenegger` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `barbara-kingsolver` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `bayard-taylor` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `benjamin-franklin` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `bernard-devoto` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `bobbie-ann-mason` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `brandon-sanderson` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `brian-jacques` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `chuck-palahniuk` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `dan-brown` | P570 | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: The Da Vinci Code. Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `deborah-harkness` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `don-delillo` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. El catálogo usa “Don Delillo”; Wikimedia devuelve página “Don DeLillo” y etiqueta “Don DeLillo”. |
| `donna-tartt` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `e-l-james` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `erin-morgenstern` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `ernest-cline` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `garth-nix` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `george-r-r-martin` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `george-washington` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `gillian-flynn` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `harlan-coben` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `haruki-murakami` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `helen-fielding` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `j-k-rowling` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. El catálogo usa “J. K. Rowling”; Wikimedia devuelve página “J. K. Rowling” y etiqueta “Joanne K. Rowling”. |
| `jhumpa-lahiri` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `jim-butcher` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `john-betjeman` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `john-green` | P570 | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: The Fault in Our Stars. Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `john-irving` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `jonathan-franzen` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `junot-diaz` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `ken-follett` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `khaled-hosseini` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `lafcadio-hearn` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `laura-joffe-numeroff` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. El catálogo usa “Laura Joffe Numeroff”; Wikimedia devuelve página “Laura Numeroff” y etiqueta “Laura Numeroff”. |
| `laurie-halse-anderson` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `lee-child` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `lisa-see` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `lois-lowry` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `louis-sachar` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `margaret-atwood` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `markus-zusak` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `neal-stephenson` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `neil-gaiman` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `nicholas-sparks` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `nora-roberts` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `norman-mailer` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `oliver-bell-bunce` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `orson-scott-card` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `p-g-wodehouse` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `patrick-rothfuss` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `philip-larkin` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `philip-pullman` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `robin-hobb` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `robin-mckinley` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. El catálogo usa “Robin Mckinley”; Wikimedia devuelve página “Robin McKinley” y etiqueta “Robin McKinley”. |
| `salman-rushdie` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `sara-gruen` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `sarah-dessen` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `stephanie-meyer` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. El catálogo usa “Stephanie Meyer”; Wikimedia devuelve página “Stephenie Meyer” y etiqueta “Stephenie Meyer”. |
| `stephen-chbosky` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `susanna-clarke` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `suzanne-collins` | P570 | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: The Hunger Games. Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `ted-kooser` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `terry-brooks` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `thomas-harris` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. |
| `thomas-jefferson` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `thomas-pynchon` | P570, P800 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `william-butler-yeats` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. El catálogo usa “William Butler Yeats”; Wikimedia devuelve página “W. B. Yeats” y etiqueta “William Butler Yeats”. |
| `william-gibson` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `yann-martel` | P570 | Wikidata no declara P570; esto no prueba que la persona esté viva. Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |
| `zelda-fitzgerald` | P800 | Wikidata no aporta dos P800; la selección editorial de obras sigue pendiente. |

## Identidades ambiguas o no encontradas

| ID | Estado | Advertencia |
| --- | --- | --- |
| `candice-bushnell` | ambiguous | No se confirmó una única persona cuyo nombre coincida con el inventario; no se eligió una identidad automáticamente. |
| `daniel-webster` | ambiguous | Más de una persona coincide con el nombre del inventario: Q106231, Q1163099. |
| `daphne-du-maurier` | ambiguous | No se confirmó una única persona cuyo nombre coincida con el inventario; no se eligió una identidad automáticamente. |
| `diana-galbaldon` | not_found | MediaWiki no devolvió páginas para el nombre del inventario. |
| `gayle-foreman` | ambiguous | No se confirmó una única persona cuyo nombre coincida con el inventario; no se eligió una identidad automáticamente. |
| `graham-greene` | ambiguous | Más de una persona coincide con el nombre del inventario: Q128560, Q311169. |
| `james-patterson` | ambiguous | Más de una persona coincide con el nombre del inventario: Q311671, Q6141033. |
| `lemony-snicket` | ambiguous | No se confirmó una única persona cuyo nombre coincida con el inventario; no se eligió una identidad automáticamente. |
| `madeline-l-engle` | ambiguous | No se confirmó una única persona cuyo nombre coincida con el inventario; no se eligió una identidad automáticamente. |
| `margaret-wise-brown-and-clement-hurd` | ambiguous | No se confirmó una única persona cuyo nombre coincida con el inventario; no se eligió una identidad automáticamente. |
| `norman-collins` | ambiguous | Más de una persona coincide con el nombre del inventario: Q7052087, Q1335701. |
| `norman-juster` | ambiguous | No se confirmó una única persona cuyo nombre coincida con el inventario; no se eligió una identidad automáticamente. |
| `ring-lardner` | ambiguous | Más de una persona coincide con el nombre del inventario: Q919515, Q728542. |
| `theodore-roosevelt` | ambiguous | Más de una persona coincide con el nombre del inventario: Q33866, Q449894, Q3564517. |
| `william-s-burroughs` | ambiguous | Más de una persona coincide con el nombre del inventario: Q188176, Q908648, Q770441. |

## Valores contradictorios o desambiguaciones que requieren revisión

| ID | Advertencia conservada |
| --- | --- |
| `betty-smith` | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: A Tree Grows in Brooklyn. |
| `clement-clarke-moore` | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: A Visit from St. Nicholas. |
| `dan-brown` | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: The Da Vinci Code. |
| `daniel-webster` | Más de una persona coincide con el nombre del inventario: Q106231, Q1163099. |
| `emily-bronte` | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: Wuthering Heights. |
| `graham-greene` | Más de una persona coincide con el nombre del inventario: Q128560, Q311169. |
| `james-patterson` | Más de una persona coincide con el nombre del inventario: Q311671, Q6141033. |
| `john-green` | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: The Fault in Our Stars. |
| `jonathan-swift` | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: Gulliver’s Travels. |
| `joseph-heller` | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: Catch-22. |
| `margaret-mitchell` | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: Gone with the Wind. |
| `norman-collins` | Más de una persona coincide con el nombre del inventario: Q7052087, Q1335701. |
| `richard-hughes` | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: A High Wind in Jamaica. |
| `ring-lardner` | Más de una persona coincide con el nombre del inventario: Q919515, Q728542. |
| `suzanne-collins` | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: The Hunger Games. |
| `theodore-roosevelt` | Más de una persona coincide con el nombre del inventario: Q33866, Q449894, Q3564517. |
| `victor-hugo` | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: Les Miserables. |
| `voltaire` | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: Candide. |
| `william-goldman` | La homonimia se resolvió provisionalmente por la obra ya asociada en el catálogo: The Princess Bride. |
| `william-s-burroughs` | Más de una persona coincide con el nombre del inventario: Q188176, Q908648, Q770441. |

## Obras que requieren selección editorial

Las 140 fichas con P800 sólo contienen candidatos estructurados; ninguna obra fue seleccionada ni incorporada al catálogo. 28 identidades no aportan P800 y quedan explícitamente pendientes de investigación bibliográfica. La selección humana debe confirmar representatividad, atribución y metadatos antes de promover cualquier valor.
