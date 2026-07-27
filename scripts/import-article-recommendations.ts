import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Catalog, Drink } from './content-types.ts'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const catalogPath = resolve(root, 'data/source/catalog.json')
const catalog = JSON.parse(await readFile(catalogPath, 'utf8')) as Catalog
const reviewedAt = '2026-07-26'

const sourceDefinitions = [
  ['articulo-tasting-table', '12 Famous Writers From History And Their Favorite Cocktails', 'Tasting Table', '2025-05-10', 'https://www.tastingtable.com/1851490/famous-writers-authors-favorite-cocktails'],
  ['articulo-financial-times', 'Could you stomach a Shirley Temple?', 'Financial Times / Alice Lascelles', '2025-02-22', 'https://www.ft.com/content/d1f6052c-2d92-4e51-875d-61415c0d7712'],
  ['articulo-glass-and-note', 'Top 10 Literary Cocktails: A Spirits Guide for Book Lovers & Bartenders', 'Glass & Note', '2026-06-23', 'https://glassandnote.com/spirits/top-10-literary-cocktails'],
  ['articulo-abv-project', '10 Famous Authors Who Loved Their Cocktails', 'ABV Project', '2025-11-25', 'https://www.theabvproject.com/post/9-famous-writers-who-loved-their-cocktails'],
  ['articulo-daily-meal', "16 Famous Authors' Favorite Cocktails", 'The Daily Meal', '2025-05-06', 'https://www.thedailymeal.com/1849359/famous-authors-favorite-cocktails'],
  ['articulo-aoide', 'Writers And Their Cocktails', 'Aoide Magazine', '2022-05-06', 'https://aoidemagazine.com/2022/05/06/writers-and-their-cocktails'],
  ['articulo-scott-hotel', '6 Great Writers & Their Favourite Cocktails', 'The Scott Hotel', '2021-07-16', 'https://www.thescotthotel.be/6-great-writers-their-favourite-cocktails'],
  ['articulo-lifestyle-asia', '5 famous cocktails from 5 famous novels every book lover needs to sip', 'Lifestyle Asia / Lisa Gries', '2019-05-26', 'https://www.lifestyleasia.com/bk/dining/drinks/cocktails-from-famous-novels'],
  ['articulo-bustle', 'The Drink Of Choice Of 11 Famous Authors', 'Bustle / Charlotte Ahlin', '2017-03-09', 'https://www.bustle.com/p/11-famous-authors-their-alcoholic-drink-of-choice-41854'],
  ['articulo-drinks-business', 'Top 10 writers and their favourite drinks', 'The Drinks Business / Lucy Shaw', '2014-05-14', 'https://www.thedrinksbusiness.com/2014/05/10-writers-and-their-favourite-cocktails'],
  ['articulo-slosh-spot', '16 Drinks Named For Authors And Their Books', 'Slosh Spot', '2014-03-03', 'https://www.sloshspot.com/blog/09-21-2008/16-Drinks-Named-for-Authors-and-Their-Books-56'],
  ['articulo-writers-write', '13 Famous Writers And Their Favourite Drinks', 'Writers Write', null, 'https://www.writerswrite.co.za/famous-writers-their-favourite-drinks'],
  ['articulo-abebooks', 'Cocktails in literature', 'AbeBooks', null, 'https://www.abebooks.com/books/rarebooks/vintage-cocktail-books/cocktails-in-literature.shtml'],
  ['articulo-read-and-co', 'Books and Booze: Literary Cocktails in Classic Books', 'Read & Co. Books', null, 'https://www.readandcobooks.co.uk/blog/literary-cocktails-classic-books']
] as const

for (const [id, title, publisher, publicationDate, url] of sourceDefinitions) {
  if (catalog.sources.some((source) => source.id === id)) continue
  catalog.sources.push({
    id,
    source_type: 'web_article',
    title,
    author_or_publisher: publisher,
    ...(publicationDate ? { publication_date: publicationDate } : {}),
    url,
    accessed_at: reviewedAt,
    language: 'en',
    reliability_tier: 'discovery_only'
  })
}

if (!catalog.sources.some((source) => source.id === 'libro-bibliotopia')) {
  catalog.sources.push({
    id: 'libro-bibliotopia',
    source_type: 'book',
    title: "Bibliotopia, or, Mr. Gilbar's book of books & catch-all of literary facts & curiosities",
    author_or_publisher: 'Steven Gilbar',
    publication_date: '2005-01-01',
    url: 'https://archive.org/details/bibliotopiaormrg0000gilb',
    accessed_at: reviewedAt,
    language: 'en',
    reliability_tier: 'reputable_secondary'
  })
}

const authors = [
  ['sylvia-plath', 'Sylvia Plath', ['Plath'], 'Estados Unidos', 1932, 1963, 'Poeta y novelista estadounidense asociada con la poesía confesional. Su obra explora identidad, creación, vida doméstica y sufrimiento psíquico.', [['the-bell-jar', 'The Bell Jar', 'La campana de cristal', 1963], ['ariel', 'Ariel', 'Ariel', 1965]]],
  ['truman-capote', 'Truman Capote', ['Capote'], 'Estados Unidos', 1924, 1984, 'Escritor estadounidense de narrativa, crónica y perfiles. Combinó observación social, precisión estilística y una fuerte presencia en la cultura pública de su época.', [['breakfast-at-tiffanys', "Breakfast at Tiffany's", 'Desayuno en Tiffany’s', 1958], ['in-cold-blood', 'In Cold Blood', 'A sangre fría', 1966]]],
  ['oscar-wilde', 'Oscar Wilde', ['Wilde'], 'Irlanda', 1854, 1900, 'Dramaturgo, narrador y ensayista irlandés célebre por su ingenio y su sátira social. Su escritura combina elegancia verbal, paradoja y crítica de las convenciones.', [['the-picture-of-dorian-gray', 'The Picture of Dorian Gray', 'El retrato de Dorian Gray', 1890], ['the-importance-of-being-earnest', 'The Importance of Being Earnest', 'La importancia de llamarse Ernesto', 1895]]],
  ['maya-angelou', 'Maya Angelou', ['Angelou'], 'Estados Unidos', 1928, 2014, 'Poeta, memorialista y activista estadounidense. Su obra convierte experiencia personal, racismo, dignidad y resistencia en una voz narrativa de gran alcance público.', [['i-know-why-the-caged-bird-sings', 'I Know Why the Caged Bird Sings', 'Yo sé por qué canta el pájaro enjaulado', 1969], ['and-still-i-rise', 'And Still I Rise', 'Y aun así me levanto', 1978]]],
  ['ian-fleming', 'Ian Fleming', ['Fleming'], 'Reino Unido', 1908, 1964, 'Escritor y periodista británico, creador de James Bond. Sus novelas de espionaje mezclan acción, tecnología, viajes y rituales de sofisticación reconocibles.', [['casino-royale', 'Casino Royale', 'Casino Royale', 1953], ['from-russia-with-love', 'From Russia, with Love', 'Desde Rusia con amor', 1957]]],
  ['tennessee-williams', 'Tennessee Williams', ['Williams'], 'Estados Unidos', 1911, 1983, 'Dramaturgo estadounidense cuya obra observa deseo, fragilidad y conflicto familiar. Sus piezas sitúan a personajes intensos en ambientes sureños cargados de tensión.', [['a-streetcar-named-desire', 'A Streetcar Named Desire', 'Un tranvía llamado Deseo', 1947], ['cat-on-a-hot-tin-roof', 'Cat on a Hot Tin Roof', 'La gata sobre el tejado de zinc', 1955]]],
  ['charles-dickens', 'Charles Dickens', ['Dickens'], 'Reino Unido', 1812, 1870, 'Novelista inglés central de la era victoriana. Sus historias combinan crítica social, humor, personajes memorables y escenas urbanas de gran vitalidad.', [['the-pickwick-papers', 'The Pickwick Papers', 'Los papeles póstumos del Club Pickwick', 1836], ['a-christmas-carol', 'A Christmas Carol', 'Cuento de Navidad', 1843]]],
  ['jd-salinger', 'J. D. Salinger', ['Salinger', 'Jerome David Salinger'], 'Estados Unidos', 1919, 2010, 'Escritor estadounidense conocido por narradores jóvenes, lenguaje coloquial y sensibilidad ante la impostura social. Su obra publicada es breve y muy influyente.', [['the-catcher-in-the-rye', 'The Catcher in the Rye', 'El guardián entre el centeno', 1951], ['nine-stories', 'Nine Stories', 'Nueve cuentos', 1953]]]
] as const

for (const [id, name, aliases, country, birthYear, deathYear, bio, works] of authors) {
  if (!catalog.authors.some((author) => author.id === id)) {
    catalog.authors.push({
      id,
      slug: id,
      canonical_name: name,
      aliases: [...aliases],
      country,
      birth_year: birthYear,
      death_year: deathYear,
      bio_es: bio,
      featured_works: works.map(([workId]) => workId),
      status: 'published',
      reviewed_at: reviewedAt
    })
  }
  for (const [workId, originalTitle, displayTitle, publicationYear] of works) {
    if (catalog.works.some((work) => work.id === workId)) continue
    catalog.works.push({
      id: workId,
      author_id: id,
      original_title: originalTitle,
      display_title_es: displayTitle,
      publication_year: publicationYear,
      language: 'en',
      identifiers: {},
      notes: 'Obra destacada incorporada durante la pasada editorial de artículos.'
    })
  }
}

const drinks: Drink[] = [
  drink('daiquiri-hemingway', 'Daiquiri Hemingway', [['ron blanco', 60], ['jugo de pomelo', 20], ['jugo de lima', 15], ['licor de maraschino', 7]], 'Copa coupé', 'Agita con hielo y cuela en una copa fría.', 'Piel de pomelo'),
  drink('mojito', 'Mojito', [['ron blanco', 45], ['jugo de lima', 25], ['almíbar', 15], ['agua con gas', 60]], 'Vaso alto', 'Mezcla con hielo, añade el agua con gas y remueve.', 'Menta'),
  drink('martini-seco', 'Martini seco', [['ginebra', 60], ['vermut seco', 10]], 'Copa de cóctel', 'Remueve con hielo y cuela en una copa fría.', 'Piel de limón'),
  drink('jack-rose', 'Jack Rose', [['applejack o brandy de manzana', 50], ['jugo de lima', 20], ['granadina', 12]], 'Copa coupé', 'Agita con hielo y cuela en una copa fría.'),
  drink('death-in-the-afternoon', 'Death in the Afternoon', [['absenta', 30], ['espumante brut', 90]], 'Copa flauta', 'Vierte la absenta y completa lentamente con el espumante.'),
  drink('cognac', 'Cognac', [['cognac', 45]], 'Copa de degustación', 'Sirve a temperatura ambiente o apenas refrescado.'),
  drink('mint-julep', 'Mint Julep', [['bourbon', 60], ['almíbar', 10]], 'Vaso julep', 'Añade menta y hielo picado; incorpora el bourbon y remueve.', 'Menta'),
  drink('whiskey-sour', 'Whiskey Sour', [['whiskey', 50], ['jugo de limón', 25], ['almíbar', 15]], 'Vaso corto', 'Agita con hielo y cuela sobre hielo fresco.', 'Piel de limón'),
  drink('margarita-mezcal', 'Margarita de mezcal', [['mezcal', 50], ['licor de naranja', 20], ['jugo de lima', 25]], 'Copa coupé', 'Agita con hielo y cuela en una copa con borde de sal.', 'Sal y lima'),
  drink('wine-spodiodi', 'Wine Spodiodi', [['vino de Oporto', 60], ['whiskey', 30]], 'Vaso corto', 'Sirve ambos ingredientes sobre hielo y remueve.'),
  drink('boilermaker', 'Boilermaker', [['cerveza', 330], ['bourbon', 45]], 'Vaso de cerveza', 'Sirve la cerveza y el bourbon por separado para alternarlos.'),
  drink('champagne-cocktail', 'Champagne Cocktail', [['espumante brut', 90], ['brandy', 30]], 'Copa flauta', 'Sirve el brandy y completa con el espumante bien frío.'),
  drink('brandy-eggnog', 'Eggnog con brandy', [['brandy', 30], ['ron añejo', 30], ['leche', 90], ['huevo pasteurizado', 45]], 'Taza', 'Agita los ingredientes con hielo y sirve bien frío.', 'Nuez moscada'),
  drink('gibson', 'Gibson', [['ginebra', 60], ['vermut seco', 10]], 'Copa de cóctel', 'Remueve con hielo y cuela en una copa fría.', 'Cebollitas encurtidas'),
  drink('el-coquetelon', 'El Coquetelón', [['pisco', 45], ['jugo de naranja', 30], ['vino espumante', 60]], 'Copa de vino', 'Mezcla el pisco y el jugo con hielo; completa con espumante.'),
  drink('vodka-martini', 'Vodka Martini', [['vodka', 60], ['vermut seco', 10]], 'Copa de cóctel', 'Remueve con hielo y cuela en una copa fría.', 'Piel de limón'),
  drink('screwdriver', 'Screwdriver', [['vodka', 45], ['jugo de naranja', 100]], 'Vaso alto', 'Sirve sobre hielo y remueve suavemente.', 'Rodaja de naranja'),
  drink('white-angel', 'White Angel', [['vodka', 45], ['ginebra', 45]], 'Copa de cóctel', 'Remueve con hielo y cuela en una copa muy fría.'),
  drink('jerez', 'Jerez', [['jerez', 60]], 'Copa de jerez', 'Sirve ligeramente fresco.'),
  drink('vesper-martini', 'Vesper Martini', [['ginebra', 60], ['vodka', 20], ['Lillet Blanc', 10]], 'Copa de cóctel', 'Agita con hielo y cuela en una copa fría.', 'Piel de limón'),
  drink('ramos-gin-fizz', 'Ramos Gin Fizz', [['ginebra', 45], ['jugo de limón', 15], ['jugo de lima', 15], ['crema', 20], ['almíbar', 15], ['agua con gas', 45]], 'Vaso alto', 'Agita todo salvo el agua con hielo; cuela y completa con agua con gas.'),
  drink('smoking-bishop', 'Smoking Bishop', [['vino tinto', 120], ['Oporto', 45], ['jugo de naranja', 30], ['almíbar especiado', 15]], 'Taza', 'Calienta suavemente sin hervir y sirve.', 'Naranja'),
  drink('scotch-soda', 'Scotch & Soda', [['whisky escocés', 45], ['agua con gas', 90]], 'Vaso alto', 'Sirve sobre hielo y completa con agua con gas.')
]

for (const item of drinks) if (!catalog.drinks.some((drinkItem) => drinkItem.id === item.id)) catalog.drinks.push(item)

const recommendations = [
  rec('hemingway-daiquiri', 'ernest-hemingway', 'daiquiri-hemingway', null, 'Un Daiquiri a la medida de Papa', 'Las páginas cuentan que El Floridita adaptó el Daiquiri al gusto de Hemingway: doble ron, sin azúcar, con lima, pomelo y maraschino.', ['articulo-tasting-table', 'articulo-financial-times', 'articulo-abv-project', 'articulo-daily-meal', 'articulo-drinks-business']),
  rec('hemingway-mojito', 'ernest-hemingway', 'mojito', null, 'El Mojito de La Bodeguita', 'Varias listas hacen circular el Mojito como una de las bebidas asociadas con Hemingway y con sus temporadas habaneras.', ['articulo-aoide', 'articulo-bustle', 'articulo-writers-write']),
  rec('hemingway-martini', 'ernest-hemingway', 'martini-seco', null, 'Un Martini casi sin vermut', 'La anécdota describe un Martini helado y muy seco, conocido como Montgomery por su proporción extrema de ginebra y vermut.', ['articulo-financial-times', 'articulo-scott-hotel', 'articulo-drinks-business']),
  rec('hemingway-jack-rose', 'ernest-hemingway', 'jack-rose', 'the-sun-also-rises', 'Un Jack Rose mientras llega Brett', 'En The Sun Also Rises, Jake Barnes pide un Jack Rose mientras espera a Brett en el bar del Hotel Crillon.', ['articulo-abv-project', 'articulo-lifestyle-asia', 'articulo-abebooks', 'articulo-read-and-co']),
  rec('hemingway-death-in-afternoon', 'ernest-hemingway', 'death-in-the-afternoon', null, 'Absenta y burbujas para la tarde', 'Las páginas atribuyen a Hemingway esta mezcla de absenta y champaña, bautizada como su libro sobre tauromaquia.', ['articulo-drinks-business', 'articulo-slosh-spot']),
  rec('hemingway-cognac', 'ernest-hemingway', 'cognac', null, 'Una noche de cognac en el Ritz', 'Financial Times recuerda las noches de Hemingway en el Ritz de París, donde bebía Martinis y cognac con su círculo.', ['articulo-financial-times']),
  rec('fitzgerald-mint-julep', 'f-scott-fitzgerald', 'mint-julep', 'the-great-gatsby', 'Un Mint Julep para bajar la temperatura', 'En The Great Gatsby, Daisy ofrece preparar un Mint Julep durante la discusión sofocante en el Plaza.', ['articulo-lifestyle-asia', 'articulo-abebooks', 'articulo-read-and-co']),
  rec('parker-whiskey-sour', 'dorothy-parker', 'whiskey-sour', null, 'La acidez de un Whiskey Sour', 'Varias listas asocian a Dorothy Parker con el Whiskey Sour: directo, ácido y con el golpe justo para su leyenda mordaz.', ['articulo-tasting-table', 'articulo-daily-meal', 'articulo-aoide', 'articulo-bustle']),
  rec('parker-martini', 'dorothy-parker', 'martini-seco', null, 'Dos Martinis, como máximo', 'El Martini aparece repetidamente unido a Parker y a los versos que juegan con la progresión de una noche de copas.', ['articulo-abv-project', 'articulo-daily-meal', 'articulo-drinks-business', 'articulo-writers-write']),
  rec('kerouac-margarita', 'jack-kerouac', 'margarita-mezcal', null, 'Una Margarita para salir a la carretera', 'Las listas relacionan los viajes mexicanos de Kerouac con una Margarita de perfil ahumado, preparada con mezcal.', ['articulo-tasting-table', 'articulo-daily-meal', 'articulo-aoide', 'articulo-scott-hotel', 'articulo-bustle', 'articulo-drinks-business', 'articulo-writers-write']),
  rec('kerouac-wine-spodiodi', 'jack-kerouac', 'wine-spodiodi', 'on-the-road', 'Oporto y whiskey en el camino', 'AbeBooks recoge el Wine Spodiodi de On the Road: Oporto y whiskey en una combinación tan improvisada como el viaje.', ['articulo-abebooks']),
  rec('faulkner-mint-julep', 'william-faulkner', 'mint-julep', null, 'Un Julep sureño para Faulkner', 'Varias páginas presentan el Mint Julep de bourbon, azúcar y menta como la bebida característica de William Faulkner.', ['articulo-daily-meal', 'articulo-aoide', 'articulo-scott-hotel', 'articulo-bustle', 'articulo-drinks-business', 'articulo-writers-write']),
  rec('bukowski-boilermaker', 'charles-bukowski', 'boilermaker', null, 'Cerveza con un golpe de bourbon', 'Las listas coinciden en el Boilermaker como asociación de Bukowski: una cerveza acompañada por un vaso corto de whiskey.', ['articulo-daily-meal', 'articulo-aoide', 'articulo-bustle', 'articulo-drinks-business', 'articulo-writers-write']),
  rec('chandler-champagne-cocktail', 'raymond-chandler', 'champagne-cocktail', 'the-big-sleep', 'Brandy bajo una capa de champaña', 'AbeBooks rescata la preferencia de General Sternwood en The Big Sleep: champaña helada sobre un tercio de brandy.', ['articulo-abebooks']),
  rec('chandler-beer-singapore', 'raymond-chandler', 'cerveza', null, 'Una cerveza con destino inesperado', 'Bibliotopia atribuye a Chandler una broma sobre salir a beber una cerveza y despertar en Singapur con barba completa.', ['libro-bibliotopia']),
  rec('poe-brandy-eggnog', 'edgar-allan-poe', 'brandy-eggnog', null, 'El Eggnog de la familia Poe', 'Las páginas hacen circular una receta familiar de Eggnog con brandy y ron como alternativa invernal para leer a Poe.', ['articulo-daily-meal', 'articulo-aoide', 'articulo-bustle']),
  rec('oneill-gibson', 'eugene-oneill', 'gibson', null, 'Un Gibson para O’Neill', 'Dos listas asocian a Eugene O’Neill con el Gibson: un Martini seco rematado con cebollitas encurtidas.', ['articulo-aoide', 'articulo-writers-write']),
  rec('neruda-coquetelon', 'pablo-neruda', 'el-coquetelon', null, 'El Coquetelón de Neruda', 'The Daily Meal incorpora El Coquetelón a la constelación de bebidas vinculadas con Pablo Neruda.', ['articulo-daily-meal']),
  rec('plath-vodka-martini', 'sylvia-plath', 'vodka-martini', null, 'Tres Martinis después del taller', 'Las páginas sitúan a Sylvia Plath y Anne Sexton conversando después de sus seminarios de poesía sobre Vodka Martinis.', ['articulo-tasting-table', 'articulo-aoide']),
  rec('capote-screwdriver', 'truman-capote', 'screwdriver', null, 'El “orange drink” de Capote', 'Varias listas cuentan que Truman Capote llamaba “mi bebida naranja” a su mezcla de vodka y jugo de naranja.', ['articulo-tasting-table', 'articulo-abv-project', 'articulo-aoide', 'articulo-scott-hotel', 'articulo-bustle', 'articulo-drinks-business']),
  rec('capote-white-angel', 'truman-capote', 'white-angel', 'breakfast-at-tiffanys', 'El ángel nada inocente de Holly Golightly', 'Al comienzo de Breakfast at Tiffany’s, Holly pide un White Angel: mitad vodka, mitad ginebra y nada de vermut.', ['articulo-abv-project', 'articulo-lifestyle-asia', 'articulo-abebooks']),
  rec('wilde-absinthe', 'oscar-wilde', 'absenta-con-agua', null, 'La leyenda verde de Wilde', 'Varias páginas asocian a Oscar Wilde con la absenta y con una descripción en etapas de sus supuestos efectos.', ['articulo-tasting-table', 'articulo-aoide', 'articulo-bustle', 'articulo-writers-write']),
  rec('angelou-sherry', 'maya-angelou', 'jerez', null, 'Jerez en la habitación de escritura', 'Las páginas describen el ritual de Maya Angelou en una habitación de hotel, con cuadernos, diccionario y una botella de jerez.', ['articulo-tasting-table', 'articulo-daily-meal', 'articulo-bustle']),
  rec('fleming-vesper', 'ian-fleming', 'vesper-martini', 'casino-royale', 'Tres de ginebra, una de vodka', 'Casino Royale entrega la fórmula del Vesper Martini y su piel de limón; las páginas la reconocen como una orden literaria emblemática.', ['articulo-abv-project', 'articulo-scott-hotel', 'articulo-lifestyle-asia', 'articulo-drinks-business', 'articulo-slosh-spot', 'articulo-abebooks']),
  rec('williams-ramos-fizz', 'tennessee-williams', 'ramos-gin-fizz', null, 'Un Ramos Gin Fizz de Nueva Orleans', 'Las listas vinculan a Tennessee Williams con el Ramos Gin Fizz, una mezcla larga, cítrica y cremosa nacida en Nueva Orleans.', ['articulo-aoide', 'articulo-drinks-business', 'articulo-writers-write']),
  rec('williams-hot-toddy', 'tennessee-williams', 'hot-toddy', 'cat-on-a-hot-tin-roof', 'Un Toddy para Brick Pollitt', 'AbeBooks recoge el Hot Toddy de whiskey, agua caliente y limón que bebe Brick Pollitt en Cat on a Hot Tin Roof.', ['articulo-abebooks']),
  rec('dickens-whisky-toddy', 'charles-dickens', 'hot-toddy', 'the-pickwick-papers', 'Un Toddy para el Club Pickwick', 'Read & Co. destaca los vasos de whisky toddy que acompañan la sobremesa festiva en The Pickwick Papers.', ['articulo-read-and-co']),
  rec('dickens-smoking-bishop', 'charles-dickens', 'smoking-bishop', 'a-christmas-carol', 'Un Smoking Bishop con Scrooge', 'En A Christmas Carol, Scrooge propone discutir el futuro de Bob Cratchit ante un cuenco navideño de Smoking Bishop.', ['articulo-slosh-spot', 'articulo-read-and-co']),
  rec('salinger-scotch-soda', 'jd-salinger', 'scotch-soda', 'the-catcher-in-the-rye', 'Scotch & Soda para parecer adulto', 'Lifestyle Asia observa que Holden Caulfield pide Scotch & Soda como parte de su ensayo obstinado de la adultez.', ['articulo-lifestyle-asia'])
] as const

for (const item of recommendations) addRecommendation(item)

const chandlerBeerEvidence = catalog.evidence.find((item) => item.id === 'evidencia-chandler-beer-singapore-libro-bibliotopia')
if (chandlerBeerEvidence) {
  chandlerBeerEvidence.support_excerpt = "I'm an occasional drinker, the kind of guy who goes out for a beer and wakes up in Singapore with a full beard."
  chandlerBeerEvidence.locator = 'Página no indicada por la persona usuaria'
  chandlerBeerEvidence.evidence_kind = 'direct_quote'
}

await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`)

function drink(id: string, name: string, ingredients: Array<[string, number]>, glassware: string, step: string, garnish?: string): Drink {
  return {
    id,
    name_es: name,
    aliases: [],
    category: 'Cóctel',
    alcoholic: true,
    ingredients: ingredients.map(([ingredientName, amount]) => ({ name: ingredientName, amount, unit: 'ml' })),
    steps: [step],
    glassware,
    ...(garnish ? { garnish } : {}),
    recipe_note: 'Receta contemporánea normalizada y redactada para Trago y Letra.'
  }
}

function rec(id: string, authorId: string, drinkId: string, workId: string | null, headline: string, explanation: string, sourceIds: string[]) {
  return { id, authorId, drinkId, workId, headline, explanation, sourceIds }
}

function addRecommendation(item: ReturnType<typeof rec>): void {
  if (catalog.recommendations.some((recommendation) => recommendation.id === item.id)) return
  const evidenceIds = item.sourceIds.map((sourceId) => `evidencia-${item.id}-${sourceId.replace('articulo-', '')}`)
  catalog.recommendations.push({
    id: item.id,
    author_id: item.authorId,
    ...(item.workId ? { work_id: item.workId } : {}),
    drink_id: item.drinkId,
    relationship_type: 'circulating_anecdote',
    headline_es: item.headline,
    explanation_es: item.explanation,
    confidence: 'medium',
    evidence_ids: evidenceIds,
    editorial_status: 'published',
    reviewed_by: 'orquestador editorial',
    reviewed_at: reviewedAt
  })
  item.sourceIds.forEach((sourceId, index) => {
    catalog.evidence.push({
      id: evidenceIds[index],
      recommendation_id: item.id,
      source_id: sourceId,
      claim: item.explanation,
      locator: `Sección dedicada a ${catalog.authors.find((author) => author.id === item.authorId)?.canonical_name ?? item.authorId}`,
      evidence_kind: 'paraphrase',
      supports_claim: true,
      checked_at: reviewedAt
    })
  })
}
