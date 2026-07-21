/* Archivo generado por scripts/build-content.ts. No editar a mano. */
import type { PublicCatalog } from '../../scripts/content-types'

export const content: PublicCatalog = {
  "generated_at": "2026-07-21",
  "authors": [
    {
      "id": "dorothy-parker",
      "slug": "dorothy-parker",
      "canonical_name": "Dorothy Parker",
      "aliases": [
        "Parker"
      ],
      "country": "Estados Unidos",
      "birth_year": 1893,
      "death_year": 1967,
      "bio_es": "Escritora estadounidense vinculada con el cuento, la crítica y la poesía. La ficha toma una escena de Big Blonde y mantiene su contexto doloroso: una bebida de un personaje no es una invitación a romantizar el consumo ni una afirmación sobre Parker.",
      "featured_works": [
        "big-blonde",
        "dorothy-parker-poems"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "big-blonde",
          "author_id": "dorothy-parker",
          "original_title": "Big Blonde",
          "display_title_es": "Rubia grande",
          "publication_year": 1929,
          "language": "en",
          "identifiers": {},
          "notes": "Texto primario consultado."
        },
        {
          "id": "dorothy-parker-poems",
          "author_id": "dorothy-parker",
          "original_title": "Selected Poems",
          "display_title_es": "Poemas seleccionados",
          "publication_year": 1928,
          "language": "en",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "parker-scotch",
          "author_id": "dorothy-parker",
          "work_id": "big-blonde",
          "drink_id": "scotch",
          "relationship_type": "appears_in_work",
          "headline_es": "Una escena que no pide celebración",
          "explanation_es": "En Big Blonde, Hazel Morse decide que el whisky escocés es la bebida que mejor tolera. La escena está atravesada por su malestar; la ficha la presenta como una aparición narrativa, no como un gesto simpático ni una preferencia atribuida a Dorothy Parker.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-parker-scotch"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "scotch",
            "name_es": "Whisky escocés",
            "aliases": [
              "Scotch whiskey"
            ],
            "category": "Destilado",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "whisky escocés",
                "amount": 45,
                "unit": "ml"
              }
            ],
            "steps": [
              "Sirve el whisky en un vaso corto.",
              "Añade hielo si lo prefieres.",
              "Tómalo despacio o elige la alternativa sin alcohol."
            ],
            "glassware": "Vaso corto",
            "zero_proof_alternative_id": "te-ahumado",
            "recipe_note": "Servicio contemporáneo; no receta histórica."
          },
          "evidence": [
            {
              "id": "evidencia-parker-scotch",
              "recommendation_id": "parker-scotch",
              "source_id": "fuente-big-blonde",
              "claim": "Hazel Morse identifica el whisky escocés como la bebida que mejor tolera.",
              "support_excerpt": "After experiment, she found that Scotch whiskey was best for her.",
              "locator": "pasaje posterior a She had never needed to drink, formerly",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-big-blonde",
                "source_type": "literary_work",
                "title": "Big Blonde",
                "author_or_publisher": "Dorothy Parker / Project Gutenberg Canada",
                "url": "https://gutenberg.ca/ebooks/parkerd-bigblonde/parkerd-bigblonde-00-h.html",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "charles-bukowski",
      "slug": "charles-bukowski",
      "canonical_name": "Charles Bukowski",
      "aliases": [
        "Bukowski",
        "Henry Charles Bukowski"
      ],
      "country": "Estados Unidos",
      "birth_year": 1920,
      "death_year": 1994,
      "bio_es": "Poeta y narrador estadounidense. Esta ficha se limita a una escena de un poema publicado: el hablante toma cerveza. No usa esa voz poética para diagnosticar al autor ni para convertir el alcohol en una promesa de creatividad.",
      "featured_works": [
        "i-am-visited-by-an-editor-and-a-poet",
        "post-office"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "i-am-visited-by-an-editor-and-a-poet",
          "author_id": "charles-bukowski",
          "original_title": "I Am Visited by an Editor and a Poet",
          "display_title_es": "Me visita un editor y un poeta",
          "publication_year": 1968,
          "language": "en",
          "identifiers": {},
          "notes": "Poema publicado por Poetry Foundation."
        },
        {
          "id": "post-office",
          "author_id": "charles-bukowski",
          "original_title": "Post Office",
          "display_title_es": "Cartero",
          "publication_year": 1971,
          "language": "en",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "bukowski-cerveza",
          "author_id": "charles-bukowski",
          "work_id": "i-am-visited-by-an-editor-and-a-poet",
          "drink_id": "cerveza",
          "relationship_type": "appears_in_work",
          "headline_es": "Tres cervezas en una voz poética",
          "explanation_es": "En el poema I Am Visited by an Editor and a Poet, la voz cuenta que bebe cerveza durante una visita. La asociación queda en el poema y su hablante: no convierte la bebida en emblema de Bukowski ni relaciona alcohol y creatividad como una regla.",
          "confidence": "medium",
          "evidence_ids": [
            "evidencia-bukowski-cerveza"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "cerveza",
            "name_es": "Cerveza",
            "aliases": [
              "Beer"
            ],
            "category": "Cerveza",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "cerveza lager",
                "amount": 330,
                "unit": "ml"
              }
            ],
            "steps": [
              "Enfría la cerveza.",
              "Sirve en un vaso limpio."
            ],
            "glassware": "Vaso de cerveza",
            "zero_proof_alternative_id": "cerveza-cero",
            "recipe_note": "Servicio contemporáneo."
          },
          "evidence": [
            {
              "id": "evidencia-bukowski-cerveza",
              "recommendation_id": "bukowski-cerveza",
              "source_id": "fuente-bukowski-poema",
              "claim": "La voz poética bebe cerveza durante una visita.",
              "support_excerpt": "so I drank two for the poet and one for myself",
              "locator": "versos 31–32 de la página",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-bukowski-poema",
                "source_type": "literary_work",
                "title": "I Am Visited by an Editor and a Poet",
                "author_or_publisher": "Charles Bukowski / Poetry Foundation",
                "url": "https://www.poetryfoundation.org/poems/49586/i-am-visited-by-an-editor-and-a-poet",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "jack-kerouac",
      "slug": "jack-kerouac",
      "canonical_name": "Jack Kerouac",
      "aliases": [
        "Kerouac",
        "Jean-Louis Kerouac"
      ],
      "country": "Estados Unidos",
      "birth_year": 1922,
      "death_year": 1969,
      "bio_es": "Novelista y poeta estadounidense asociado a la generación beat. La recomendación está anclada a una escena de On the Road donde dos personajes salen por cerveza. No afirma que la bebida defina a Kerouac ni convierte una escena de ficción en una biografía.",
      "featured_works": [
        "on-the-road",
        "big-sur"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "on-the-road",
          "author_id": "jack-kerouac",
          "original_title": "On the Road",
          "display_title_es": "En el camino",
          "publication_year": 1957,
          "language": "en",
          "identifiers": {},
          "notes": "Extracto editorial consultado."
        },
        {
          "id": "big-sur",
          "author_id": "jack-kerouac",
          "original_title": "Big Sur",
          "display_title_es": "Big Sur",
          "publication_year": 1962,
          "language": "en",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "kerouac-cerveza",
          "author_id": "jack-kerouac",
          "work_id": "on-the-road",
          "drink_id": "cerveza",
          "relationship_type": "appears_in_work",
          "headline_es": "Una conversación fuera de casa",
          "explanation_es": "En On the Road, Sal Paradise y Dean Moriarty salen a tomar cerveza para conversar. Es una aparición de la bebida en una escena de personajes y no un atajo para describir a Kerouac o sus costumbres personales.",
          "confidence": "medium",
          "evidence_ids": [
            "evidencia-kerouac-cerveza"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "cerveza",
            "name_es": "Cerveza",
            "aliases": [
              "Beer"
            ],
            "category": "Cerveza",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "cerveza lager",
                "amount": 330,
                "unit": "ml"
              }
            ],
            "steps": [
              "Enfría la cerveza.",
              "Sirve en un vaso limpio."
            ],
            "glassware": "Vaso de cerveza",
            "zero_proof_alternative_id": "cerveza-cero",
            "recipe_note": "Servicio contemporáneo."
          },
          "evidence": [
            {
              "id": "evidencia-kerouac-cerveza",
              "recommendation_id": "kerouac-cerveza",
              "source_id": "fuente-on-the-road",
              "claim": "Sal y Dean salen a tomar cerveza para conversar.",
              "locator": "parte 1, capítulo 1",
              "evidence_kind": "paraphrase",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-on-the-road",
                "source_type": "literary_work",
                "title": "On the Road",
                "author_or_publisher": "Jack Kerouac / Penguin Random House Canada",
                "url": "https://www.penguinrandomhouse.ca/books/540752/on-the-road-by-jack-kerouac/excerpt",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "f-scott-fitzgerald",
      "slug": "f-scott-fitzgerald",
      "canonical_name": "F. Scott Fitzgerald",
      "aliases": [
        "Fitzgerald",
        "Scott Fitzgerald",
        "Francis Scott Fitzgerald"
      ],
      "country": "Estados Unidos",
      "birth_year": 1896,
      "death_year": 1940,
      "bio_es": "Novelista estadounidense cuya obra retrata el brillo y la tensión social de los años veinte. Esta ficha se concentra en una escena de The Great Gatsby donde varios personajes reciben gin rickeys; no utiliza esa escena como prueba de una preferencia personal del autor.",
      "featured_works": [
        "the-great-gatsby",
        "tender-is-the-night"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "the-great-gatsby",
          "author_id": "f-scott-fitzgerald",
          "original_title": "The Great Gatsby",
          "display_title_es": "El gran Gatsby",
          "publication_year": 1925,
          "language": "en",
          "identifiers": {},
          "notes": "Texto primario consultado en PDF de Old Dominion University."
        },
        {
          "id": "tender-is-the-night",
          "author_id": "f-scott-fitzgerald",
          "original_title": "Tender Is the Night",
          "display_title_es": "Suave es la noche",
          "publication_year": 1934,
          "language": "en",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "fitzgerald-gin-rickey",
          "author_id": "f-scott-fitzgerald",
          "work_id": "the-great-gatsby",
          "drink_id": "gin-rickey",
          "relationship_type": "appears_in_work",
          "headline_es": "Cuatro vasos con hielo antes de la confrontación",
          "explanation_es": "En el capítulo 7 de The Great Gatsby, Tom Buchanan vuelve con cuatro gin rickeys para Gatsby, Nick, Daisy y Jordan. La bebida acompaña una escena de tensión en la casa Buchanan. Es una presencia narrativa precisa, no una prueba de que Fitzgerald la bebiera o la prefiriera.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-fitzgerald-gin-rickey"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "gin-rickey",
            "name_es": "Gin Rickey",
            "aliases": [
              "Rickey"
            ],
            "category": "Trago largo",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "gin",
                "amount": 45,
                "unit": "ml"
              },
              {
                "name": "jugo de lima",
                "amount": 20,
                "unit": "ml"
              },
              {
                "name": "agua con gas",
                "amount": 120,
                "unit": "ml"
              }
            ],
            "steps": [
              "Llena un vaso alto con hielo.",
              "Añade gin y jugo de lima.",
              "Completa con agua con gas."
            ],
            "glassware": "Vaso alto",
            "zero_proof_alternative_id": "rickey-cero",
            "recipe_note": "Receta contemporánea propia; la escena literaria no especifica preparación."
          },
          "evidence": [
            {
              "id": "evidencia-fitzgerald-gin-rickey",
              "recommendation_id": "fitzgerald-gin-rickey",
              "source_id": "fuente-the-great-gatsby",
              "claim": "Tom vuelve con cuatro gin rickeys para los personajes presentes.",
              "support_excerpt": "Tom came back, preceding four gin rickeys that clicked full of ice.",
              "locator": "capítulo 7",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-the-great-gatsby",
                "source_type": "literary_work",
                "title": "The Great Gatsby",
                "author_or_publisher": "F. Scott Fitzgerald / Old Dominion University",
                "url": "https://sites.wp.odu.edu/wp-content/uploads/sites/9252/2018/08/great-gatsby.pdf",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "william-faulkner",
      "slug": "william-faulkner",
      "canonical_name": "William Faulkner",
      "aliases": [
        "Faulkner",
        "William Cuthbert Faulkner"
      ],
      "country": "Estados Unidos",
      "birth_year": 1897,
      "death_year": 1962,
      "bio_es": "Novelista estadounidense de narrativa experimental, conocido por el territorio ficticio de Yoknapatawpha. La relación publicada procede de una escena de The Sound and the Fury donde un personaje propone un toddy. No se presenta como indicio de una bebida preferida por Faulkner.",
      "featured_works": [
        "the-sound-and-the-fury",
        "as-i-lay-dying"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "the-sound-and-the-fury",
          "author_id": "william-faulkner",
          "original_title": "The Sound and the Fury",
          "display_title_es": "El ruido y la furia",
          "publication_year": 1929,
          "language": "en",
          "identifiers": {},
          "notes": "Texto primario consultado en Project Gutenberg."
        },
        {
          "id": "as-i-lay-dying",
          "author_id": "william-faulkner",
          "original_title": "As I Lay Dying",
          "display_title_es": "Mientras agonizo",
          "publication_year": 1930,
          "language": "en",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "faulkner-toddy",
          "author_id": "william-faulkner",
          "work_id": "the-sound-and-the-fury",
          "drink_id": "hot-toddy",
          "relationship_type": "appears_in_work",
          "headline_es": "Una oferta de cuidado en una escena doméstica",
          "explanation_es": "En The Sound and the Fury, el tío Maury propone preparar un toddy a Caroline Compson cuando está inquieta. La ficha se limita a esa aparición textual y al personaje que la formula. No presenta el toddy como bebida de Faulkner ni convierte la escena en una receta histórica.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-faulkner-toddy"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "hot-toddy",
            "name_es": "Toddy caliente",
            "aliases": [
              "Hot toddy"
            ],
            "category": "Bebida caliente",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "whisky",
                "amount": 45,
                "unit": "ml"
              },
              {
                "name": "agua caliente",
                "amount": 120,
                "unit": "ml"
              },
              {
                "name": "miel",
                "amount": 10,
                "unit": "ml"
              },
              {
                "name": "jugo de limón",
                "amount": 10,
                "unit": "ml"
              }
            ],
            "steps": [
              "Calienta el vaso con agua y descártala.",
              "Añade miel, limón y whisky.",
              "Completa con agua caliente y mezcla."
            ],
            "glassware": "Taza resistente al calor",
            "zero_proof_alternative_id": "toddy-cero",
            "recipe_note": "Receta contemporánea propia; no se atribuye a la obra."
          },
          "evidence": [
            {
              "id": "evidencia-faulkner-toddy",
              "recommendation_id": "faulkner-toddy",
              "source_id": "fuente-the-sound-and-the-fury",
              "claim": "El tío Maury propone preparar un toddy.",
              "support_excerpt": "I'll make you a toddy.",
              "locator": "primera sección (Benjy)",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-the-sound-and-the-fury",
                "source_type": "literary_work",
                "title": "The Sound and the Fury",
                "author_or_publisher": "William Faulkner / Project Gutenberg",
                "url": "https://www.gutenberg.org/files/75170/75170-h/75170-h.htm",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dashiell-hammett",
      "slug": "dashiell-hammett",
      "canonical_name": "Dashiell Hammett",
      "aliases": [
        "Hammett",
        "Samuel Dashiell Hammett"
      ],
      "country": "Estados Unidos",
      "birth_year": 1894,
      "death_year": 1961,
      "bio_es": "Escritor estadounidense de novela policial y creador de Sam Spade. La recomendación se apoya en una acción concreta de Spade en The Maltese Falcon: el personaje toma un Manhattan. No traslada esa escena a los hábitos de Hammett ni a una receta atribuida al autor.",
      "featured_works": [
        "the-maltese-falcon",
        "the-thin-man"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "the-maltese-falcon",
          "author_id": "dashiell-hammett",
          "original_title": "The Maltese Falcon",
          "display_title_es": "El halcón maltés",
          "publication_year": 1930,
          "language": "en",
          "identifiers": {},
          "notes": "Texto primario consultado en Project Gutenberg."
        },
        {
          "id": "the-thin-man",
          "author_id": "dashiell-hammett",
          "original_title": "The Thin Man",
          "display_title_es": "La delgada línea",
          "publication_year": 1934,
          "language": "en",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "hammett-manhattan",
          "author_id": "dashiell-hammett",
          "work_id": "the-maltese-falcon",
          "drink_id": "manhattan",
          "relationship_type": "appears_in_work",
          "headline_es": "El Manhattan de Sam Spade en el escritorio",
          "explanation_es": "En The Maltese Falcon, Sam Spade saca un Manhattan embotellado y un vaso de papel del cajón de su escritorio después de una reunión con Joel Cairo. La recomendación identifica esa acción del personaje, sin trasladar el trago a la vida o las preferencias de Dashiell Hammett.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-hammett-manhattan"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "manhattan",
            "name_es": "Manhattan",
            "aliases": [],
            "category": "Cóctel corto",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "whisky de centeno",
                "amount": 50,
                "unit": "ml"
              },
              {
                "name": "vermut rojo",
                "amount": 25,
                "unit": "ml"
              },
              {
                "name": "amargo aromático",
                "amount": 2,
                "unit": "golpes"
              }
            ],
            "steps": [
              "Enfría una copa.",
              "Mezcla los ingredientes con hielo.",
              "Cuela y sirve."
            ],
            "glassware": "Copa de cóctel",
            "zero_proof_alternative_id": "manhattan-cero",
            "recipe_note": "Propuesta contemporánea; la novela sólo nombra un Manhattan embotellado."
          },
          "evidence": [
            {
              "id": "evidencia-hammett-manhattan",
              "recommendation_id": "hammett-manhattan",
              "source_id": "fuente-the-maltese-falcon",
              "claim": "Sam Spade saca un Manhattan de un cajón del escritorio.",
              "support_excerpt": "took a bottle of Manhattan cocktail and a paper drinking-cup from a desk-drawer",
              "locator": "capítulo 6, The Undersized Shadow",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-the-maltese-falcon",
                "source_type": "literary_work",
                "title": "The Maltese Falcon",
                "author_or_publisher": "Dashiell Hammett / Project Gutenberg",
                "url": "https://www.gutenberg.org/files/77600/77600-h/77600-h.htm",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "raymond-chandler",
      "slug": "raymond-chandler",
      "canonical_name": "Raymond Chandler",
      "aliases": [
        "Chandler",
        "Ray Chandler"
      ],
      "country": "Estados Unidos",
      "birth_year": 1888,
      "death_year": 1959,
      "bio_es": "Novelista estadounidense asociado a la ficción policial de Los Ángeles y al detective Philip Marlowe. Esta ficha usa una bebida descrita por sus personajes en The Long Goodbye: no convierte ese diálogo de ficción en una afirmación sobre los hábitos ni las preferencias personales de Chandler.",
      "featured_works": [
        "the-long-goodbye",
        "the-big-sleep"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "the-long-goodbye",
          "author_id": "raymond-chandler",
          "original_title": "The Long Goodbye",
          "display_title_es": "El largo adiós",
          "publication_year": 1953,
          "language": "en",
          "identifiers": {},
          "notes": "Texto consultado en Project Gutenberg Canada."
        },
        {
          "id": "the-big-sleep",
          "author_id": "raymond-chandler",
          "original_title": "The Big Sleep",
          "display_title_es": "El sueño eterno",
          "publication_year": 1939,
          "language": "en",
          "identifiers": {},
          "notes": "Obra recomendada; no es la evidencia de esta ficha."
        }
      ],
      "recommendations": [
        {
          "id": "chandler-gimlet",
          "author_id": "raymond-chandler",
          "work_id": "the-long-goodbye",
          "drink_id": "gimlet",
          "relationship_type": "appears_in_work",
          "headline_es": "Un diálogo de Marlowe y Lennox en Victor's",
          "explanation_es": "En The Long Goodbye, Philip Marlowe y Terry Lennox beben gimlets en el bar Victor's. Lennox describe su propia proporción de ginebra y cordial de lima. La recomendación procede de ese encuentro narrativo: no afirma que Chandler bebiera gimlets ni que fueran su trago favorito.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-chandler-gimlet"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "gimlet",
            "name_es": "Gimlet",
            "aliases": [
              "Gin gimlet"
            ],
            "category": "Cóctel corto",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "gin",
                "amount": 45,
                "unit": "ml"
              },
              {
                "name": "cordial de lima",
                "amount": 45,
                "unit": "ml"
              }
            ],
            "steps": [
              "Enfría una copa pequeña.",
              "Mezcla el gin y el cordial de lima con hielo.",
              "Cuela y sirve de inmediato."
            ],
            "glassware": "Copa fría",
            "zero_proof_alternative_id": "cordial-de-lima-cero",
            "recipe_note": "Propuesta de servicio basada en la proporción nombrada por un personaje; no se presenta como receta histórica definitiva."
          },
          "evidence": [
            {
              "id": "evidencia-chandler-gimlet",
              "recommendation_id": "chandler-gimlet",
              "source_id": "fuente-the-long-goodbye",
              "claim": "Marlowe y Lennox beben gimlets en Victor's, y Lennox define una proporción de gin y Rose's Lime Juice.",
              "support_excerpt": "We sat in a corner of the bar at Victor's and drank gimlets.",
              "locator": "capítulo 3",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-the-long-goodbye",
                "source_type": "literary_work",
                "title": "The Long Goodbye",
                "author_or_publisher": "Raymond Chandler / Project Gutenberg Canada",
                "url": "https://gutenberg.ca/ebooks/chandlerr-longgoodbye/chandlerr-longgoodbye-00-h.html",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "ernest-hemingway",
      "slug": "ernest-hemingway",
      "canonical_name": "Ernest Hemingway",
      "aliases": [
        "Hemingway",
        "Ernesto Hemingway"
      ],
      "country": "Estados Unidos",
      "birth_year": 1899,
      "death_year": 1961,
      "bio_es": "Escritor estadounidense cuya prosa depurada marcó buena parte de la narrativa del siglo XX. En esta ficha, la bebida no se atribuye a sus hábitos: se vincula con una escena concreta de su novela The Sun Also Rises y se identifica al narrador que bebe.",
      "featured_works": [
        "the-sun-also-rises",
        "a-moveable-feast"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "the-sun-also-rises",
          "author_id": "ernest-hemingway",
          "original_title": "The Sun Also Rises",
          "display_title_es": "Fiesta",
          "publication_year": 1926,
          "language": "en",
          "identifiers": {},
          "notes": "Fuente primaria consultada en Wikisource."
        },
        {
          "id": "a-moveable-feast",
          "author_id": "ernest-hemingway",
          "original_title": "A Moveable Feast",
          "display_title_es": "París era una fiesta",
          "publication_year": 1964,
          "language": "en",
          "identifiers": {
            "isbn13": "9780684833637"
          },
          "notes": "Edición Classic Edition de Scribner."
        }
      ],
      "recommendations": [
        {
          "id": "hemingway-absenta",
          "author_id": "ernest-hemingway",
          "work_id": "the-sun-also-rises",
          "drink_id": "absenta-con-agua",
          "relationship_type": "appears_in_work",
          "headline_es": "Una escena amarga en la última noche de la fiesta",
          "explanation_es": "En The Sun Also Rises, el narrador Jake Barnes bebe absenta sin azúcar mientras observa la última noche de la fiesta de Pamplona. La asociación se limita a esa escena y a ese personaje: no afirma que Hemingway la prefiriera ni la convirtiera en una costumbre propia.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-hemingway-absenta"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "absenta-con-agua",
            "name_es": "Absenta con agua",
            "aliases": [
              "Absinthe"
            ],
            "category": "Aperitivo",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "absenta",
                "amount": 30,
                "unit": "ml"
              },
              {
                "name": "agua fría",
                "amount": 90,
                "unit": "ml"
              }
            ],
            "steps": [
              "Sirve la absenta en un vaso pequeño.",
              "Añade el agua fría lentamente.",
              "Prueba despacio y ajusta con más agua si lo prefieres."
            ],
            "glassware": "Vaso pequeño",
            "zero_proof_alternative_id": "infusion-de-anis",
            "recipe_note": "Propuesta contemporánea de servicio; no se presenta como receta histórica exacta."
          },
          "evidence": [
            {
              "id": "evidencia-hemingway-absenta",
              "recommendation_id": "hemingway-absenta",
              "source_id": "fuente-the-sun-also-rises",
              "claim": "Jake Barnes bebe absenta sin azúcar durante la última noche de la fiesta.",
              "support_excerpt": "The absinthe made everything seem better. I drank it without sugar.",
              "locator": "página digital 222",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-the-sun-also-rises",
                "source_type": "literary_work",
                "title": "The Sun Also Rises",
                "author_or_publisher": "Ernest Hemingway / Wikisource",
                "url": "https://en.wikisource.org/wiki/Page%3AThe_sun_also_rises_-_Hemingway%2C_Ernest%2C_1899-1961.pdf/232",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "edgar-allan-poe",
      "slug": "edgar-allan-poe",
      "canonical_name": "Edgar Allan Poe",
      "aliases": [
        "Poe",
        "Edgar Poe"
      ],
      "country": "Estados Unidos",
      "birth_year": 1809,
      "death_year": 1849,
      "bio_es": "Poeta, narrador y crítico estadounidense, figura decisiva del cuento moderno. La ficha deja fuera leyendas sobre su vida y se centra en el amontillado que mueve la trama de un relato: una aparición textual, no una bebida atribuida a Poe.",
      "featured_works": [
        "the-cask-of-amontillado",
        "the-fall-of-the-house-of-usher"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "the-cask-of-amontillado",
          "author_id": "edgar-allan-poe",
          "original_title": "The Cask of Amontillado",
          "display_title_es": "El barril de amontillado",
          "publication_year": 1846,
          "language": "en",
          "identifiers": {},
          "notes": "Texto primario consultado en Project Gutenberg."
        },
        {
          "id": "the-fall-of-the-house-of-usher",
          "author_id": "edgar-allan-poe",
          "original_title": "The Fall of the House of Usher",
          "display_title_es": "La caída de la casa Usher",
          "publication_year": 1839,
          "language": "en",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "poe-amontillado",
          "author_id": "edgar-allan-poe",
          "work_id": "the-cask-of-amontillado",
          "drink_id": "amontillado",
          "relationship_type": "appears_in_work",
          "headline_es": "El vino que hace avanzar el relato",
          "explanation_es": "En The Cask of Amontillado, Montresor atrae a Fortunato a las catacumbas con una supuesta pipa de amontillado. La bebida está en el centro de la trama y de su engaño. La ficha se limita al relato: no respalda ninguna leyenda sobre qué bebía Poe.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-poe-amontillado"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "amontillado",
            "name_es": "Amontillado",
            "aliases": [
              "Jerez amontillado"
            ],
            "category": "Vino fortificado",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "amontillado",
                "amount": 90,
                "unit": "ml"
              }
            ],
            "steps": [
              "Enfría una copa pequeña.",
              "Sirve el amontillado sin hielo.",
              "Acompáñalo de agua y elige la alternativa si lo prefieres."
            ],
            "glassware": "Copa de jerez",
            "zero_proof_alternative_id": "te-ambar",
            "recipe_note": "Servicio contemporáneo; el relato no aporta una receta."
          },
          "evidence": [
            {
              "id": "evidencia-poe-amontillado",
              "recommendation_id": "poe-amontillado",
              "source_id": "fuente-poe-amontillado",
              "claim": "Montresor usa una pipa de amontillado para llevar a Fortunato a las catacumbas.",
              "support_excerpt": "I have received a pipe of what passes for Amontillado, and I have my doubts.",
              "locator": "párrafos 7–18",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-poe-amontillado",
                "source_type": "literary_work",
                "title": "The Cask of Amontillado",
                "author_or_publisher": "Edgar Allan Poe / Project Gutenberg",
                "url": "https://www.gutenberg.org/cache/epub/1063/pg1063-images.html",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "eugene-oneill",
      "slug": "eugene-oneill",
      "canonical_name": "Eugene O'Neill",
      "aliases": [
        "O'Neill",
        "Eugene ONeill"
      ],
      "country": "Estados Unidos",
      "birth_year": 1888,
      "death_year": 1953,
      "bio_es": "Dramaturgo estadounidense y premio Nobel. La recomendación procede de la utilería y los diálogos de The Iceman Cometh; la obra aborda daño, abstinencia y autoengaño, por lo que la ficha no presenta el alcohol como evasión ni como atributo admirable.",
      "featured_works": [
        "the-iceman-cometh",
        "long-days-journey-into-night"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "the-iceman-cometh",
          "author_id": "eugene-oneill",
          "original_title": "The Iceman Cometh",
          "display_title_es": "El vendedor de hielo",
          "publication_year": 1946,
          "language": "en",
          "identifiers": {},
          "notes": "Texto primario consultado."
        },
        {
          "id": "long-days-journey-into-night",
          "author_id": "eugene-oneill",
          "original_title": "Long Day's Journey into Night",
          "display_title_es": "Largo viaje hacia la noche",
          "publication_year": 1956,
          "language": "en",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "oneill-whiskey",
          "author_id": "eugene-oneill",
          "work_id": "the-iceman-cometh",
          "drink_id": "scotch",
          "relationship_type": "appears_in_work",
          "headline_es": "Una botella que Hickey deja intacta",
          "explanation_es": "En The Iceman Cometh, Rocky lleva a Hickey una botella de whiskey, vaso y chaser. Hickey explica que ha dejado de beber, mientras el entorno insiste en la antigua rutina. La recomendación describe esa tensión dramática y no trata el alcohol como una salida ni como un adorno bohemio.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-oneill-whiskey"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "scotch",
            "name_es": "Whisky escocés",
            "aliases": [
              "Scotch whiskey"
            ],
            "category": "Destilado",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "whisky escocés",
                "amount": 45,
                "unit": "ml"
              }
            ],
            "steps": [
              "Sirve el whisky en un vaso corto.",
              "Añade hielo si lo prefieres.",
              "Tómalo despacio o elige la alternativa sin alcohol."
            ],
            "glassware": "Vaso corto",
            "zero_proof_alternative_id": "te-ahumado",
            "recipe_note": "Servicio contemporáneo; no receta histórica."
          },
          "evidence": [
            {
              "id": "evidencia-oneill-whiskey",
              "recommendation_id": "oneill-whiskey",
              "source_id": "fuente-oneill-iceman",
              "claim": "Rocky lleva a Hickey una botella de whiskey, un vaso y un chaser; Hickey declara que ha dejado de beber.",
              "support_excerpt": "puts a bottle of whiskey, a glass and a chaser on it",
              "locator": "acto I, líneas 685–693 de la edición digital",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-oneill-iceman",
                "source_type": "literary_work",
                "title": "The Iceman Cometh",
                "author_or_publisher": "Eugene O'Neill / Project Gutenberg Australia",
                "url": "https://www.gutenberg.net.au/ebooks04/0400021h.html",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "guillermo-cabrera-infante",
      "slug": "guillermo-cabrera-infante",
      "canonical_name": "Guillermo Cabrera Infante",
      "aliases": [
        "Cabrera Infante",
        "Guillermo Cabrera"
      ],
      "country": "Cuba",
      "birth_year": 1929,
      "death_year": 2005,
      "bio_es": "Narrador y crítico cubano, autor de una prosa marcada por La Habana, el cine y el juego verbal. La ficha usa una anécdota periodística verificable sobre agua durante su discurso del Premio Cervantes; no infiere una bebida alcohólica ni un hábito del autor.",
      "featured_works": [
        "tres-tristes-tigres",
        "la-habana-para-un-infante-difunto"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "tres-tristes-tigres",
          "author_id": "guillermo-cabrera-infante",
          "original_title": "Tres tristes tigres",
          "display_title_es": "Tres tristes tigres",
          "publication_year": 1967,
          "language": "es",
          "identifiers": {},
          "notes": "Obra recomendada."
        },
        {
          "id": "la-habana-para-un-infante-difunto",
          "author_id": "guillermo-cabrera-infante",
          "original_title": "La Habana para un infante difunto",
          "display_title_es": "La Habana para un infante difunto",
          "publication_year": 1979,
          "language": "es",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "cabrera-infante-agua",
          "author_id": "guillermo-cabrera-infante",
          "drink_id": "agua-mineral",
          "relationship_type": "author_documented",
          "headline_es": "Agua durante el discurso del Cervantes",
          "explanation_es": "Según una crónica de El País sobre la entrega del Premio Cervantes de 1998, Miriam Gómez llevó agua para que Guillermo Cabrera Infante pudiera beber continuamente durante el acto. La ficha no deduce una preferencia general ni convierte la escena en una anécdota alcohólica.",
          "confidence": "medium",
          "evidence_ids": [
            "evidencia-cabrera-infante-agua"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "agua-mineral",
            "name_es": "Agua mineral",
            "aliases": [
              "Agua con gas"
            ],
            "category": "Sin alcohol",
            "alcoholic": false,
            "ingredients": [
              {
                "name": "agua mineral",
                "amount": 250,
                "unit": "ml"
              }
            ],
            "steps": [
              "Enfría el agua mineral.",
              "Sirve en un vaso alto.",
              "Bebe a tu ritmo."
            ],
            "glassware": "Vaso alto",
            "zero_proof_alternative_id": "agua-mineral",
            "recipe_note": "Servicio sencillo; la anécdota documenta agua, no una preparación especial."
          },
          "evidence": [
            {
              "id": "evidencia-cabrera-infante-agua",
              "recommendation_id": "cabrera-infante-agua",
              "source_id": "fuente-cabrera-infante-agua",
              "claim": "Miriam Gómez llevó agua para que Cabrera Infante pudiera beber continuamente durante el acto del Premio Cervantes.",
              "support_excerpt": "Cabrera Infante necesitaba beber agua de manera continua.",
              "locator": "párrafos iniciales de la crónica",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-cabrera-infante-agua",
                "source_type": "newspaper_article",
                "title": "¡Enhorabuena!, que lo disfrute",
                "author_or_publisher": "El País",
                "publication_date": "1998-04-24",
                "url": "https://elpais.com/diario/1998/04/24/cultura/893368801_850215.html",
                "accessed_at": "2026-07-21",
                "language": "es",
                "reliability_tier": "reputable_secondary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "hunter-s-thompson",
      "slug": "hunter-s-thompson",
      "canonical_name": "Hunter S. Thompson",
      "aliases": [
        "Thompson",
        "Hunter Thompson"
      ],
      "country": "Estados Unidos",
      "birth_year": 1937,
      "death_year": 2005,
      "bio_es": "Periodista y narrador estadounidense vinculado al gonzo. La recomendación identifica una mención narrativa de Fear and Loathing in Las Vegas y no la presenta como guía de consumo ni como declaración biográfica sobre Thompson.",
      "featured_works": [
        "fear-and-loathing-in-las-vegas",
        "the-rum-diary"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "fear-and-loathing-in-las-vegas",
          "author_id": "hunter-s-thompson",
          "original_title": "Fear and Loathing in Las Vegas",
          "display_title_es": "Miedo y asco en Las Vegas",
          "publication_year": 1971,
          "language": "en",
          "identifiers": {},
          "notes": "Escena verificada en fuente secundaria que identifica el pasaje."
        },
        {
          "id": "the-rum-diary",
          "author_id": "hunter-s-thompson",
          "original_title": "The Rum Diary",
          "display_title_es": "El diario del ron",
          "publication_year": 1998,
          "language": "en",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "thompson-singapore-sling",
          "author_id": "hunter-s-thompson",
          "work_id": "fear-and-loathing-in-las-vegas",
          "drink_id": "singapore-sling",
          "relationship_type": "appears_in_work",
          "headline_es": "Una mención en el Polo Lounge",
          "explanation_es": "Una fuente de historia de cócteles identifica la escena de Fear and Loathing in Las Vegas en que el grupo pasa horas en el Polo Lounge con Singapore Slings, mezcal aparte y cerveza. Se publica como referencia narrativa secundaria, no como consejo de consumo ni como hábito documentado de Thompson.",
          "confidence": "medium",
          "evidence_ids": [
            "evidencia-thompson-singapore-sling"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "singapore-sling",
            "name_es": "Singapore Sling",
            "aliases": [
              "Singapore sling"
            ],
            "category": "Cóctel largo",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "gin",
                "amount": 45,
                "unit": "ml"
              },
              {
                "name": "jugo de piña",
                "amount": 90,
                "unit": "ml"
              },
              {
                "name": "jugo de limón",
                "amount": 15,
                "unit": "ml"
              },
              {
                "name": "granadina",
                "amount": 10,
                "unit": "ml"
              }
            ],
            "steps": [
              "Llena un vaso alto con hielo.",
              "Añade los ingredientes y mezcla suavemente.",
              "Completa con agua con gas si quieres una versión más larga."
            ],
            "glassware": "Vaso alto",
            "zero_proof_alternative_id": "sling-tropical-cero",
            "recipe_note": "Versión contemporánea propia; la fuente verifica una mención literaria, no una receta canónica."
          },
          "evidence": [
            {
              "id": "evidencia-thompson-singapore-sling",
              "recommendation_id": "thompson-singapore-sling",
              "source_id": "fuente-thompson-singapore-sling",
              "claim": "La fuente identifica una mención de Singapore Slings en Fear and Loathing in Las Vegas.",
              "support_excerpt": "drinking Singapore Slings with mescal on the side and beer chasers",
              "locator": "párrafo sobre Fear and Loathing in Las Vegas",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-thompson-singapore-sling",
                "source_type": "magazine_article",
                "title": "Unraveling the Legend of the Singapore Sling",
                "author_or_publisher": "MEL Magazine",
                "url": "https://melmagazine.com/en-us/story/singapore-sling-history",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "reputable_secondary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "john-cheever",
      "slug": "john-cheever",
      "canonical_name": "John Cheever",
      "aliases": [
        "Cheever",
        "John William Cheever"
      ],
      "country": "Estados Unidos",
      "birth_year": 1912,
      "death_year": 1982,
      "bio_es": "Cuentista y novelista estadounidense. La ficha toma un gin tonic de The Swimmer, donde el trayecto del personaje cambia de tono de forma inquietante. Se trata de una escena de ficción, no de una invitación a imitarla ni de una preferencia personal de Cheever.",
      "featured_works": [
        "the-swimmer",
        "the-sorrows-of-gin"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "the-swimmer",
          "author_id": "john-cheever",
          "original_title": "The Swimmer",
          "display_title_es": "El nadador",
          "publication_year": 1964,
          "language": "en",
          "identifiers": {},
          "notes": "Texto primario consultado en Library of America."
        },
        {
          "id": "the-sorrows-of-gin",
          "author_id": "john-cheever",
          "original_title": "The Sorrows of Gin",
          "display_title_es": "Las penas de la ginebra",
          "publication_year": 1953,
          "language": "en",
          "identifiers": {},
          "notes": "Obra recomendada; no es la evidencia de esta ficha."
        }
      ],
      "recommendations": [
        {
          "id": "cheever-gin-tonic",
          "author_id": "john-cheever",
          "work_id": "the-swimmer",
          "drink_id": "gin-tonic",
          "relationship_type": "appears_in_work",
          "headline_es": "Un gin tonic al borde de la piscina",
          "explanation_es": "En The Swimmer, un barman da a Neddy Merrill un gin tonic mientras continúa su recorrido entre piscinas. La bebida pertenece a una escena que se vuelve progresivamente incómoda; no se presenta como una preferencia de Cheever ni como una forma de evadir ese trasfondo.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-cheever-gin-tonic"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "gin-tonic",
            "name_es": "Gin tonic",
            "aliases": [
              "Gin and tonic",
              "Ginebra con tónica"
            ],
            "category": "Trago largo",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "gin",
                "amount": 45,
                "unit": "ml"
              },
              {
                "name": "agua tónica",
                "amount": 150,
                "unit": "ml"
              }
            ],
            "steps": [
              "Llena un vaso alto con hielo.",
              "Añade el gin.",
              "Completa con tónica y mezcla una vez."
            ],
            "glassware": "Vaso alto",
            "zero_proof_alternative_id": "tonica-citricos-cero",
            "recipe_note": "Servicio contemporáneo; no se atribuye a los autores ni a los personajes."
          },
          "evidence": [
            {
              "id": "evidencia-cheever-gin-tonic",
              "recommendation_id": "cheever-gin-tonic",
              "source_id": "fuente-cheever-swimmer",
              "claim": "Un barman entrega un gin tonic a Neddy Merrill.",
              "support_excerpt": "a smiling bartender ... gave him a gin and tonic",
              "locator": "página 3 del PDF",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-cheever-swimmer",
                "source_type": "literary_work",
                "title": "The Swimmer",
                "author_or_publisher": "John Cheever / Library of America",
                "url": "https://www.loa.org/images/pdf/Cheever_Swimmer.pdf",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "juan-carlos-onetti",
      "slug": "juan-carlos-onetti",
      "canonical_name": "Juan Carlos Onetti",
      "aliases": [
        "Onetti",
        "Juan Onetti"
      ],
      "country": "Uruguay",
      "birth_year": 1909,
      "death_year": 1994,
      "bio_es": "Narrador uruguayo y creador de Santa María. Un cuestionario publicado atribuye al propio Onetti un sueño de dicha que nombra whisky y novela policial; se conserva como respuesta textual, sin convertirla en una pauta ni en una idealización del consumo.",
      "featured_works": [
        "el-astillero",
        "juntacadaveres"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "el-astillero",
          "author_id": "juan-carlos-onetti",
          "original_title": "El astillero",
          "display_title_es": "El astillero",
          "publication_year": 1961,
          "language": "es",
          "identifiers": {},
          "notes": "Obra recomendada."
        },
        {
          "id": "juntacadaveres",
          "author_id": "juan-carlos-onetti",
          "original_title": "Juntacadáveres",
          "display_title_es": "Juntacadáveres",
          "publication_year": 1964,
          "language": "es",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "onetti-whisky",
          "author_id": "juan-carlos-onetti",
          "drink_id": "scotch",
          "relationship_type": "author_documented",
          "headline_es": "Whisky y una novela policial aún por leer",
          "explanation_es": "En un cuestionario Proust reproducido por El País, Onetti responde que su sueño de dicha era whisky y una buena novela policial que todavía no hubiera leído. La frase se conserva como una respuesta del autor, sin elevarla a receta, frecuencia ni invitación a beber.",
          "confidence": "medium",
          "evidence_ids": [
            "evidencia-onetti-whisky"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "scotch",
            "name_es": "Whisky escocés",
            "aliases": [
              "Scotch whiskey"
            ],
            "category": "Destilado",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "whisky escocés",
                "amount": 45,
                "unit": "ml"
              }
            ],
            "steps": [
              "Sirve el whisky en un vaso corto.",
              "Añade hielo si lo prefieres.",
              "Tómalo despacio o elige la alternativa sin alcohol."
            ],
            "glassware": "Vaso corto",
            "zero_proof_alternative_id": "te-ahumado",
            "recipe_note": "Servicio contemporáneo; no receta histórica."
          },
          "evidence": [
            {
              "id": "evidencia-onetti-whisky",
              "recommendation_id": "onetti-whisky",
              "source_id": "fuente-onetti-cuestionario",
              "claim": "El cuestionario Proust de Onetti responde que su sueño de dicha era whisky y una novela policial.",
              "support_excerpt": "Whisky y una buena novela policial que todavía no he leído.",
              "locator": "párrafo sobre el cuestionario Proust",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-onetti-cuestionario",
                "source_type": "newspaper_article",
                "title": "Cien años de un genio perezoso",
                "author_or_publisher": "El País",
                "publication_date": "2009-06-21",
                "url": "https://elpais.com/diario/2009/06/21/cultura/1245535201_850215.html",
                "accessed_at": "2026-07-21",
                "language": "es",
                "reliability_tier": "reputable_secondary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "julio-cortazar",
      "slug": "julio-cortazar",
      "canonical_name": "Julio Cortázar",
      "aliases": [
        "Cortázar",
        "Cortazar",
        "Julio Florencio Cortázar"
      ],
      "country": "Argentina",
      "birth_year": 1914,
      "death_year": 1984,
      "bio_es": "Narrador argentino cuya obra explora el juego, la música y las formas abiertas. Esta ficha prefiere café y mate presentes en Rayuela: una pausa compartida por personajes, sin convertir una escena literaria en información biográfica sobre Cortázar.",
      "featured_works": [
        "rayuela",
        "bestuario"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "rayuela",
          "author_id": "julio-cortazar",
          "original_title": "Rayuela",
          "display_title_es": "Rayuela",
          "publication_year": 1963,
          "language": "es",
          "identifiers": {},
          "notes": "Capítulo 3 consultado en fuente pública."
        },
        {
          "id": "bestuario",
          "author_id": "julio-cortazar",
          "original_title": "Bestiario",
          "display_title_es": "Bestiario",
          "publication_year": 1951,
          "language": "es",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "cortazar-cafe-mate",
          "author_id": "julio-cortazar",
          "work_id": "rayuela",
          "drink_id": "cafe-con-mate",
          "relationship_type": "appears_in_work",
          "headline_es": "Café y mate en la madrugada de Oliveira",
          "explanation_es": "En el capítulo 3 de Rayuela, Oliveira y la Maga pasan la noche leyendo y escuchando discos; se levantan alternativamente para calentar café o cebar mate. La propuesta sirve ambas bebidas por separado y se limita a esa escena de personajes, no a una costumbre de Cortázar.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-cortazar-cafe-mate"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "cafe-con-mate",
            "name_es": "Café con mate",
            "aliases": [
              "Café y mate"
            ],
            "category": "Sin alcohol",
            "alcoholic": false,
            "ingredients": [
              {
                "name": "café filtrado",
                "amount": 120,
                "unit": "ml"
              },
              {
                "name": "mate cocido",
                "amount": 80,
                "unit": "ml"
              }
            ],
            "steps": [
              "Prepara el café y el mate por separado.",
              "Sírvelos juntos, sin mezclarlos.",
              "Alterna los sorbos según prefieras."
            ],
            "glassware": "Taza y vaso pequeño",
            "zero_proof_alternative_id": "cafe-con-mate",
            "recipe_note": "Propuesta editorial basada en dos bebidas presentes en la escena, no una receta de Cortázar."
          },
          "evidence": [
            {
              "id": "evidencia-cortazar-cafe-mate",
              "recommendation_id": "cortazar-cafe-mate",
              "source_id": "fuente-cortazar-rayuela",
              "claim": "Oliveira y la Maga se levantan para calentar café o cebar mate.",
              "support_excerpt": "levantándose alternativamente para calentar café o cebar mate",
              "locator": "Rayuela, capítulo 3, párrafo inicial",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-cortazar-rayuela",
                "source_type": "literary_work",
                "title": "Rayuela, capítulo 3",
                "author_or_publisher": "Cortázar",
                "url": "https://cortazar.com.ar/rayuela-capitulo-3/",
                "accessed_at": "2026-07-21",
                "language": "es",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "miguel-de-cervantes",
      "slug": "miguel-de-cervantes",
      "canonical_name": "Miguel de Cervantes",
      "aliases": [
        "Cervantes",
        "Miguel Cervantes"
      ],
      "country": "España",
      "birth_year": 1547,
      "death_year": 1616,
      "bio_es": "Escritor español, autor de Don Quijote de la Mancha. La ficha se apoya en una escena donde Sancho Panza prueba e identifica un vino; la recomendación pertenece a ese pasaje y no afirma una preferencia del autor.",
      "featured_works": [
        "don-quijote-segunda-parte",
        "novelas-ejemplares"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "don-quijote-segunda-parte",
          "author_id": "miguel-de-cervantes",
          "original_title": "Don Quijote de la Mancha, segunda parte",
          "display_title_es": "Don Quijote de la Mancha, segunda parte",
          "publication_year": 1615,
          "language": "es",
          "identifiers": {},
          "notes": "Capítulo XIII consultado en el Centro Virtual Cervantes."
        },
        {
          "id": "novelas-ejemplares",
          "author_id": "miguel-de-cervantes",
          "original_title": "Novelas ejemplares",
          "display_title_es": "Novelas ejemplares",
          "publication_year": 1613,
          "language": "es",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "cervantes-vino",
          "author_id": "miguel-de-cervantes",
          "work_id": "don-quijote-segunda-parte",
          "drink_id": "vino-tinto",
          "relationship_type": "appears_in_work",
          "headline_es": "Sancho reconoce un vino de Ciudad Real",
          "explanation_es": "En el capítulo XIII de la segunda parte de Don Quijote, Sancho bebe de una bota e identifica el vino como de Ciudad Real antes de explicar su habilidad para reconocer vinos. La recomendación corresponde al pasaje y a Sancho, no a una preferencia atribuida a Cervantes.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-cervantes-vino"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "vino-tinto",
            "name_es": "Vino tinto",
            "aliases": [
              "Vino"
            ],
            "category": "Vino",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "vino tinto",
                "amount": 120,
                "unit": "ml"
              }
            ],
            "steps": [
              "Sirve el vino en una copa.",
              "Déjalo reposar un momento.",
              "Elige mosto si prefieres una alternativa sin alcohol."
            ],
            "glassware": "Copa de vino",
            "zero_proof_alternative_id": "mosto-tinto",
            "recipe_note": "Servicio contemporáneo; no reconstruye una bebida histórica."
          },
          "evidence": [
            {
              "id": "evidencia-cervantes-vino",
              "recommendation_id": "cervantes-vino",
              "source_id": "fuente-cervantes-quijote",
              "claim": "Sancho bebe de una bota e identifica el vino como de Ciudad Real.",
              "support_excerpt": "¿este vino es de Ciudad Real?",
              "locator": "Don Quijote, segunda parte, capítulo XIII",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-cervantes-quijote",
                "source_type": "literary_work",
                "title": "Don Quijote de la Mancha, segunda parte, capítulo XIII",
                "author_or_publisher": "Centro Virtual Cervantes",
                "url": "https://cvc.cervantes.es/literatura/clasicos/quijote/edicion/parte2/cap13/cap13_02.htm",
                "accessed_at": "2026-07-21",
                "language": "es",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "pablo-neruda",
      "slug": "pablo-neruda",
      "canonical_name": "Pablo Neruda",
      "aliases": [
        "Neruda",
        "Ricardo Eliécer Neftalí Reyes Basoalto"
      ],
      "country": "Chile",
      "birth_year": 1904,
      "death_year": 1973,
      "bio_es": "Poeta chileno y premio Nobel. La ficha se basa en el vino como materia poética de Oda al vino y no en listas de bebidas favoritas. La receta contemporánea no pretende recrear un servicio histórico ni explicar la vida del autor.",
      "featured_works": [
        "odas-elementales",
        "confieso-que-he-vivido"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "odas-elementales",
          "author_id": "pablo-neruda",
          "original_title": "Odas elementales",
          "display_title_es": "Odas elementales",
          "publication_year": 1954,
          "language": "es",
          "identifiers": {},
          "notes": "Incluye Oda al vino."
        },
        {
          "id": "confieso-que-he-vivido",
          "author_id": "pablo-neruda",
          "original_title": "Confieso que he vivido",
          "display_title_es": "Confieso que he vivido",
          "publication_year": 1974,
          "language": "es",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "neruda-vino",
          "author_id": "pablo-neruda",
          "work_id": "odas-elementales",
          "drink_id": "vino-tinto",
          "relationship_type": "appears_in_work",
          "headline_es": "El vino como materia de una oda",
          "explanation_es": "En Oda al vino, el vino aparece como materia poética y conversación compartida. La ficha usa ese vínculo textual y evita repetir la atribución popular de una bebida favorita. La copa y el mosto son servicios contemporáneos, no reconstrucciones de una práctica del poeta.",
          "confidence": "medium",
          "evidence_ids": [
            "evidencia-neruda-vino"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "vino-tinto",
            "name_es": "Vino tinto",
            "aliases": [
              "Vino"
            ],
            "category": "Vino",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "vino tinto",
                "amount": 120,
                "unit": "ml"
              }
            ],
            "steps": [
              "Sirve el vino en una copa.",
              "Déjalo reposar un momento.",
              "Elige mosto si prefieres una alternativa sin alcohol."
            ],
            "glassware": "Copa de vino",
            "zero_proof_alternative_id": "mosto-tinto",
            "recipe_note": "Servicio contemporáneo; no reconstruye una bebida histórica."
          },
          "evidence": [
            {
              "id": "evidencia-neruda-vino",
              "recommendation_id": "neruda-vino",
              "source_id": "fuente-neruda-oda-vino",
              "claim": "Oda al vino toma el vino como materia poética y conversación compartida.",
              "locator": "Odas elementales, Oda al vino",
              "evidence_kind": "bibliographic_reference",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-neruda-oda-vino",
                "source_type": "literary_work",
                "title": "Oda al vino",
                "author_or_publisher": "Pablo Neruda / Universidad de Chile",
                "url": "https://neruda.uchile.cl/obra/obraodaselementales10.html",
                "accessed_at": "2026-07-21",
                "language": "es",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "ramon-del-valle-inclan",
      "slug": "ramon-del-valle-inclan",
      "canonical_name": "Ramón del Valle-Inclán",
      "aliases": [
        "Valle-Inclán",
        "Valle Inclan",
        "Ramón María del Valle-Inclán"
      ],
      "country": "España",
      "birth_year": 1866,
      "death_year": 1936,
      "bio_es": "Dramaturgo y narrador español asociado al esperpento. La recomendación sigue una acotación de Luces de bohemia: Max Estrella y Don Latino comparten morapio. La escena pertenece a sus personajes y no asegura costumbres de Valle-Inclán.",
      "featured_works": [
        "luces-de-bohemia",
        "sonatas"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "luces-de-bohemia",
          "author_id": "ramon-del-valle-inclan",
          "original_title": "Luces de bohemia",
          "display_title_es": "Luces de bohemia",
          "publication_year": 1920,
          "language": "es",
          "identifiers": {},
          "notes": "Escena III consultada en Biblioteca Virtual Miguel de Cervantes."
        },
        {
          "id": "sonatas",
          "author_id": "ramon-del-valle-inclan",
          "original_title": "Sonatas",
          "display_title_es": "Sonatas",
          "publication_year": 1902,
          "language": "es",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "valle-inclan-morapio",
          "author_id": "ramon-del-valle-inclan",
          "work_id": "luces-de-bohemia",
          "drink_id": "vino-tinto",
          "relationship_type": "appears_in_work",
          "headline_es": "Morapio en la taberna de Pica Lagartos",
          "explanation_es": "En la escena III de Luces de bohemia, la acotación presenta a Máximo Estrella y Don Latino bebiendo sendos quinces de morapio. La receta propone vino contemporáneo y no afirma que Valle-Inclán lo bebiera ni pretende fijar qué producto histórico exacto era el morapio.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-valle-inclan-morapio"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "vino-tinto",
            "name_es": "Vino tinto",
            "aliases": [
              "Vino"
            ],
            "category": "Vino",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "vino tinto",
                "amount": 120,
                "unit": "ml"
              }
            ],
            "steps": [
              "Sirve el vino en una copa.",
              "Déjalo reposar un momento.",
              "Elige mosto si prefieres una alternativa sin alcohol."
            ],
            "glassware": "Copa de vino",
            "zero_proof_alternative_id": "mosto-tinto",
            "recipe_note": "Servicio contemporáneo; no reconstruye una bebida histórica."
          },
          "evidence": [
            {
              "id": "evidencia-valle-inclan-morapio",
              "recommendation_id": "valle-inclan-morapio",
              "source_id": "fuente-valle-inclan-luces",
              "claim": "Máximo Estrella y Don Latino se regalan con sendos quinces de morapio.",
              "support_excerpt": "se regalan con sendos quinces de morapio",
              "locator": "Luces de bohemia, escena III",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-valle-inclan-luces",
                "source_type": "literary_work",
                "title": "Luces de bohemia",
                "author_or_publisher": "Ramón del Valle-Inclán / Biblioteca Virtual Miguel de Cervantes",
                "url": "https://www.cervantesvirtual.com/obra-visor/luces-de-bohemia-esperpento-875782/html/f061ab80-96cc-4bec-9e5d-fcb779e7bed5_2.html",
                "accessed_at": "2026-07-21",
                "language": "es",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "raymond-carver",
      "slug": "raymond-carver",
      "canonical_name": "Raymond Carver",
      "aliases": [
        "Carver",
        "Ray Carver"
      ],
      "country": "Estados Unidos",
      "birth_year": 1938,
      "death_year": 1988,
      "bio_es": "Cuentista y poeta estadounidense de prosa contenida. La ficha usa la conversación alrededor de gin y tónica en What We Talk About When We Talk About Love, sin borrar sus tensiones ni hacer del alcohol una explicación de la escritura o de la vida de Carver.",
      "featured_works": [
        "what-we-talk-about-when-we-talk-about-love",
        "cathedral"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "what-we-talk-about-when-we-talk-about-love",
          "author_id": "raymond-carver",
          "original_title": "What We Talk About When We Talk About Love",
          "display_title_es": "De qué hablamos cuando hablamos de amor",
          "publication_year": 1981,
          "language": "en",
          "identifiers": {},
          "notes": "Texto primario consultado en PDF público."
        },
        {
          "id": "cathedral",
          "author_id": "raymond-carver",
          "original_title": "Cathedral",
          "display_title_es": "Catedral",
          "publication_year": 1983,
          "language": "en",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "carver-gin-tonic",
          "author_id": "raymond-carver",
          "work_id": "what-we-talk-about-when-we-talk-about-love",
          "drink_id": "gin-tonic",
          "relationship_type": "appears_in_work",
          "headline_es": "Gin y tónica alrededor de la mesa",
          "explanation_es": "Al inicio de What We Talk About When We Talk About Love, el gin y el agua tónica circulan por la mesa mientras cuatro personajes hablan de amor. La relación pertenece a la situación narrativa y no se usa para explicar la obra de Carver ni para idealizar un consumo que el cuento vuelve tenso.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-carver-gin-tonic"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "gin-tonic",
            "name_es": "Gin tonic",
            "aliases": [
              "Gin and tonic",
              "Ginebra con tónica"
            ],
            "category": "Trago largo",
            "alcoholic": true,
            "ingredients": [
              {
                "name": "gin",
                "amount": 45,
                "unit": "ml"
              },
              {
                "name": "agua tónica",
                "amount": 150,
                "unit": "ml"
              }
            ],
            "steps": [
              "Llena un vaso alto con hielo.",
              "Añade el gin.",
              "Completa con tónica y mezcla una vez."
            ],
            "glassware": "Vaso alto",
            "zero_proof_alternative_id": "tonica-citricos-cero",
            "recipe_note": "Servicio contemporáneo; no se atribuye a los autores ni a los personajes."
          },
          "evidence": [
            {
              "id": "evidencia-carver-gin-tonic",
              "recommendation_id": "carver-gin-tonic",
              "source_id": "fuente-carver-love",
              "claim": "El gin y el agua tónica circulan por la mesa de cuatro personajes.",
              "support_excerpt": "The gin and the tonic water kept going around",
              "locator": "página 1 del PDF",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-carver-love",
                "source_type": "literary_work",
                "title": "What We Talk About When We Talk About Love",
                "author_or_publisher": "Raymond Carver / The New School at Atlanta",
                "url": "https://tnsatlanta.org/wp-content/uploads/What-We-Talk-About-When-We-Talk-About-Love-Carver.pdf",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "primary"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "stephen-king",
      "slug": "stephen-king",
      "canonical_name": "Stephen King",
      "aliases": [
        "King",
        "Stephen Edwin King"
      ],
      "country": "Estados Unidos",
      "birth_year": 1947,
      "bio_es": "Narrador estadounidense de terror y fantasía. King ha hablado públicamente de dejar alcohol y drogas; por eso esta ficha elige una alternativa sin alcohol y rotula el vínculo como abstinencia o recuperación, sin tratar esa experiencia como una anécdota pintoresca.",
      "featured_works": [
        "on-writing",
        "the-shining"
      ],
      "status": "published",
      "reviewed_at": "2026-07-21",
      "works": [
        {
          "id": "on-writing",
          "author_id": "stephen-king",
          "original_title": "On Writing: A Memoir of the Craft",
          "display_title_es": "Mientras escribo",
          "publication_year": 2000,
          "language": "en",
          "identifiers": {},
          "notes": "Memoria recomendada; la evidencia se verifica en entrevista."
        },
        {
          "id": "the-shining",
          "author_id": "stephen-king",
          "original_title": "The Shining",
          "display_title_es": "El resplandor",
          "publication_year": 1977,
          "language": "en",
          "identifiers": {},
          "notes": "Obra recomendada."
        }
      ],
      "recommendations": [
        {
          "id": "king-recuperacion",
          "author_id": "stephen-king",
          "work_id": "on-writing",
          "drink_id": "tonica-citricos-cero",
          "relationship_type": "abstinence_or_recovery",
          "headline_es": "Una alternativa sin alcohol, por recuperación",
          "explanation_es": "En una entrevista de 2000, Stephen King cuenta que dejó las drogas y el alcohol y que la escritura volvió a sostenerse sin esa búsqueda de efecto. Por eso la ficha propone una tónica sin alcohol: no atribuye una bebida favorita ni transforma la recuperación en una estética de consumo.",
          "confidence": "high",
          "evidence_ids": [
            "evidencia-king-recuperacion"
          ],
          "editorial_status": "published",
          "reviewed_by": "orquestador editorial",
          "reviewed_at": "2026-07-21",
          "drink": {
            "id": "tonica-citricos-cero",
            "name_es": "Tónica de cítricos sin alcohol",
            "aliases": [
              "Tónica cítrica cero"
            ],
            "category": "Sin alcohol",
            "alcoholic": false,
            "ingredients": [
              {
                "name": "agua tónica",
                "amount": 150,
                "unit": "ml"
              },
              {
                "name": "jugo de limón",
                "amount": 15,
                "unit": "ml"
              },
              {
                "name": "cáscara de naranja",
                "amount": 1,
                "unit": "unidad"
              }
            ],
            "steps": [
              "Llena un vaso con hielo.",
              "Añade el jugo de limón.",
              "Completa con agua tónica y perfuma con naranja."
            ],
            "glassware": "Vaso alto",
            "garnish": "Cáscara de naranja",
            "zero_proof_alternative_id": "tonica-citricos-cero",
            "recipe_note": "Alternativa relacionada por frescura y ritual, no una réplica exacta."
          },
          "evidence": [
            {
              "id": "evidencia-king-recuperacion",
              "recommendation_id": "king-recuperacion",
              "source_id": "fuente-king-guardian",
              "claim": "King dice que dejó las drogas y el alcohol y que la escritura volvió a bastar.",
              "support_excerpt": "When I gave up dope and alcohol ... the writing was enough.",
              "locator": "entrevista, respuestas sobre alcohol y recuperación",
              "evidence_kind": "direct_quote",
              "supports_claim": true,
              "checked_at": "2026-07-21",
              "source": {
                "id": "fuente-king-guardian",
                "source_type": "interview",
                "title": "Part two of the full Stephen King interview",
                "author_or_publisher": "The Guardian",
                "publication_date": "2000-09-14",
                "url": "https://www.theguardian.com/books/2000/sep/14/stephenking.fiction1",
                "accessed_at": "2026-07-21",
                "language": "en",
                "reliability_tier": "reputable_secondary"
              }
            }
          ]
        }
      ]
    }
  ],
  "drinks": [
    {
      "id": "scotch",
      "name_es": "Whisky escocés",
      "aliases": [
        "Scotch whiskey"
      ],
      "category": "Destilado",
      "alcoholic": true,
      "ingredients": [
        {
          "name": "whisky escocés",
          "amount": 45,
          "unit": "ml"
        }
      ],
      "steps": [
        "Sirve el whisky en un vaso corto.",
        "Añade hielo si lo prefieres.",
        "Tómalo despacio o elige la alternativa sin alcohol."
      ],
      "glassware": "Vaso corto",
      "zero_proof_alternative_id": "te-ahumado",
      "recipe_note": "Servicio contemporáneo; no receta histórica."
    },
    {
      "id": "te-ahumado",
      "name_es": "Té ahumado",
      "aliases": [],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "té ahumado",
          "amount": 180,
          "unit": "ml"
        }
      ],
      "steps": [
        "Prepara el té.",
        "Sirve caliente o frío."
      ],
      "glassware": "Taza",
      "zero_proof_alternative_id": "te-ahumado",
      "recipe_note": "Alternativa por perfil tostado."
    },
    {
      "id": "cerveza",
      "name_es": "Cerveza",
      "aliases": [
        "Beer"
      ],
      "category": "Cerveza",
      "alcoholic": true,
      "ingredients": [
        {
          "name": "cerveza lager",
          "amount": 330,
          "unit": "ml"
        }
      ],
      "steps": [
        "Enfría la cerveza.",
        "Sirve en un vaso limpio."
      ],
      "glassware": "Vaso de cerveza",
      "zero_proof_alternative_id": "cerveza-cero",
      "recipe_note": "Servicio contemporáneo."
    },
    {
      "id": "cerveza-cero",
      "name_es": "Cerveza sin alcohol",
      "aliases": [],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "cerveza sin alcohol",
          "amount": 330,
          "unit": "ml"
        }
      ],
      "steps": [
        "Enfría la cerveza.",
        "Sirve en un vaso limpio."
      ],
      "glassware": "Vaso de cerveza",
      "zero_proof_alternative_id": "cerveza-cero",
      "recipe_note": "Alternativa por ritual."
    },
    {
      "id": "gin-rickey",
      "name_es": "Gin Rickey",
      "aliases": [
        "Rickey"
      ],
      "category": "Trago largo",
      "alcoholic": true,
      "ingredients": [
        {
          "name": "gin",
          "amount": 45,
          "unit": "ml"
        },
        {
          "name": "jugo de lima",
          "amount": 20,
          "unit": "ml"
        },
        {
          "name": "agua con gas",
          "amount": 120,
          "unit": "ml"
        }
      ],
      "steps": [
        "Llena un vaso alto con hielo.",
        "Añade gin y jugo de lima.",
        "Completa con agua con gas."
      ],
      "glassware": "Vaso alto",
      "zero_proof_alternative_id": "rickey-cero",
      "recipe_note": "Receta contemporánea propia; la escena literaria no especifica preparación."
    },
    {
      "id": "rickey-cero",
      "name_es": "Rickey sin alcohol",
      "aliases": [
        "Lima con soda"
      ],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "jugo de lima",
          "amount": 20,
          "unit": "ml"
        },
        {
          "name": "agua con gas",
          "amount": 140,
          "unit": "ml"
        }
      ],
      "steps": [
        "Llena un vaso alto con hielo.",
        "Añade el jugo de lima.",
        "Completa con agua con gas."
      ],
      "glassware": "Vaso alto",
      "zero_proof_alternative_id": "rickey-cero",
      "recipe_note": "Alternativa por frescura y formato."
    },
    {
      "id": "hot-toddy",
      "name_es": "Toddy caliente",
      "aliases": [
        "Hot toddy"
      ],
      "category": "Bebida caliente",
      "alcoholic": true,
      "ingredients": [
        {
          "name": "whisky",
          "amount": 45,
          "unit": "ml"
        },
        {
          "name": "agua caliente",
          "amount": 120,
          "unit": "ml"
        },
        {
          "name": "miel",
          "amount": 10,
          "unit": "ml"
        },
        {
          "name": "jugo de limón",
          "amount": 10,
          "unit": "ml"
        }
      ],
      "steps": [
        "Calienta el vaso con agua y descártala.",
        "Añade miel, limón y whisky.",
        "Completa con agua caliente y mezcla."
      ],
      "glassware": "Taza resistente al calor",
      "zero_proof_alternative_id": "toddy-cero",
      "recipe_note": "Receta contemporánea propia; no se atribuye a la obra."
    },
    {
      "id": "toddy-cero",
      "name_es": "Toddy caliente sin alcohol",
      "aliases": [
        "Infusión con miel"
      ],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "infusión negra",
          "amount": 150,
          "unit": "ml"
        },
        {
          "name": "miel",
          "amount": 10,
          "unit": "ml"
        },
        {
          "name": "jugo de limón",
          "amount": 10,
          "unit": "ml"
        }
      ],
      "steps": [
        "Prepara una infusión negra.",
        "Añade miel y limón.",
        "Sirve caliente."
      ],
      "glassware": "Taza",
      "zero_proof_alternative_id": "toddy-cero",
      "recipe_note": "Alternativa por temperatura y ritual."
    },
    {
      "id": "manhattan",
      "name_es": "Manhattan",
      "aliases": [],
      "category": "Cóctel corto",
      "alcoholic": true,
      "ingredients": [
        {
          "name": "whisky de centeno",
          "amount": 50,
          "unit": "ml"
        },
        {
          "name": "vermut rojo",
          "amount": 25,
          "unit": "ml"
        },
        {
          "name": "amargo aromático",
          "amount": 2,
          "unit": "golpes"
        }
      ],
      "steps": [
        "Enfría una copa.",
        "Mezcla los ingredientes con hielo.",
        "Cuela y sirve."
      ],
      "glassware": "Copa de cóctel",
      "zero_proof_alternative_id": "manhattan-cero",
      "recipe_note": "Propuesta contemporánea; la novela sólo nombra un Manhattan embotellado."
    },
    {
      "id": "manhattan-cero",
      "name_es": "Manhattan sin alcohol",
      "aliases": [],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "té negro frío",
          "amount": 80,
          "unit": "ml"
        },
        {
          "name": "vermut sin alcohol",
          "amount": 40,
          "unit": "ml"
        },
        {
          "name": "amargo sin alcohol",
          "amount": 2,
          "unit": "golpes"
        }
      ],
      "steps": [
        "Mezcla los ingredientes con hielo.",
        "Cuela en una copa fría.",
        "Sirve de inmediato."
      ],
      "glassware": "Copa de cóctel",
      "zero_proof_alternative_id": "manhattan-cero",
      "recipe_note": "Alternativa por perfil amargo y ritual."
    },
    {
      "id": "gimlet",
      "name_es": "Gimlet",
      "aliases": [
        "Gin gimlet"
      ],
      "category": "Cóctel corto",
      "alcoholic": true,
      "ingredients": [
        {
          "name": "gin",
          "amount": 45,
          "unit": "ml"
        },
        {
          "name": "cordial de lima",
          "amount": 45,
          "unit": "ml"
        }
      ],
      "steps": [
        "Enfría una copa pequeña.",
        "Mezcla el gin y el cordial de lima con hielo.",
        "Cuela y sirve de inmediato."
      ],
      "glassware": "Copa fría",
      "zero_proof_alternative_id": "cordial-de-lima-cero",
      "recipe_note": "Propuesta de servicio basada en la proporción nombrada por un personaje; no se presenta como receta histórica definitiva."
    },
    {
      "id": "cordial-de-lima-cero",
      "name_es": "Cordial de lima sin alcohol",
      "aliases": [
        "Lima cero"
      ],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "cordial de lima",
          "amount": 45,
          "unit": "ml"
        },
        {
          "name": "agua con gas",
          "amount": 90,
          "unit": "ml"
        }
      ],
      "steps": [
        "Llena un vaso pequeño con hielo.",
        "Añade el cordial de lima.",
        "Completa con agua con gas."
      ],
      "glassware": "Vaso corto",
      "zero_proof_alternative_id": "cordial-de-lima-cero",
      "recipe_note": "Alternativa de acidez y ritual; no pretende replicar un gimlet."
    },
    {
      "id": "absenta-con-agua",
      "name_es": "Absenta con agua",
      "aliases": [
        "Absinthe"
      ],
      "category": "Aperitivo",
      "alcoholic": true,
      "ingredients": [
        {
          "name": "absenta",
          "amount": 30,
          "unit": "ml"
        },
        {
          "name": "agua fría",
          "amount": 90,
          "unit": "ml"
        }
      ],
      "steps": [
        "Sirve la absenta en un vaso pequeño.",
        "Añade el agua fría lentamente.",
        "Prueba despacio y ajusta con más agua si lo prefieres."
      ],
      "glassware": "Vaso pequeño",
      "zero_proof_alternative_id": "infusion-de-anis",
      "recipe_note": "Propuesta contemporánea de servicio; no se presenta como receta histórica exacta."
    },
    {
      "id": "infusion-de-anis",
      "name_es": "Infusión de anís y limón",
      "aliases": [
        "Infusión anisada"
      ],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "infusión de anís",
          "amount": 180,
          "unit": "ml"
        },
        {
          "name": "jugo de limón",
          "amount": 10,
          "unit": "ml"
        }
      ],
      "steps": [
        "Prepara la infusión de anís.",
        "Añade el jugo de limón.",
        "Sirve tibia o con hielo."
      ],
      "glassware": "Taza o vaso corto",
      "zero_proof_alternative_id": "infusion-de-anis",
      "recipe_note": "Alternativa relacionada por el perfil anisado; no reproduce el alcohol ni su efecto."
    },
    {
      "id": "tonica-citricos",
      "name_es": "Tónica de cítricos",
      "aliases": [
        "Tónica cítrica"
      ],
      "category": "Trago largo",
      "alcoholic": true,
      "ingredients": [
        {
          "name": "gin",
          "amount": 45,
          "unit": "ml"
        },
        {
          "name": "agua tónica",
          "amount": 120,
          "unit": "ml"
        },
        {
          "name": "jugo de limón",
          "amount": 10,
          "unit": "ml"
        }
      ],
      "steps": [
        "Llena un vaso con hielo.",
        "Añade el gin y el jugo de limón.",
        "Completa suavemente con agua tónica."
      ],
      "glassware": "Vaso alto",
      "garnish": "Rodaja de limón",
      "zero_proof_alternative_id": "tonica-citricos-cero",
      "recipe_note": "Receta de prueba redactada para este proyecto."
    },
    {
      "id": "tonica-citricos-cero",
      "name_es": "Tónica de cítricos sin alcohol",
      "aliases": [
        "Tónica cítrica cero"
      ],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "agua tónica",
          "amount": 150,
          "unit": "ml"
        },
        {
          "name": "jugo de limón",
          "amount": 15,
          "unit": "ml"
        },
        {
          "name": "cáscara de naranja",
          "amount": 1,
          "unit": "unidad"
        }
      ],
      "steps": [
        "Llena un vaso con hielo.",
        "Añade el jugo de limón.",
        "Completa con agua tónica y perfuma con naranja."
      ],
      "glassware": "Vaso alto",
      "garnish": "Cáscara de naranja",
      "zero_proof_alternative_id": "tonica-citricos-cero",
      "recipe_note": "Alternativa relacionada por frescura y ritual, no una réplica exacta."
    },
    {
      "id": "amontillado",
      "name_es": "Amontillado",
      "aliases": [
        "Jerez amontillado"
      ],
      "category": "Vino fortificado",
      "alcoholic": true,
      "ingredients": [
        {
          "name": "amontillado",
          "amount": 90,
          "unit": "ml"
        }
      ],
      "steps": [
        "Enfría una copa pequeña.",
        "Sirve el amontillado sin hielo.",
        "Acompáñalo de agua y elige la alternativa si lo prefieres."
      ],
      "glassware": "Copa de jerez",
      "zero_proof_alternative_id": "te-ambar",
      "recipe_note": "Servicio contemporáneo; el relato no aporta una receta."
    },
    {
      "id": "te-ambar",
      "name_es": "Té ámbar frío",
      "aliases": [
        "Té frío de uva"
      ],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "té negro frío",
          "amount": 140,
          "unit": "ml"
        },
        {
          "name": "jugo de uva blanca",
          "amount": 40,
          "unit": "ml"
        }
      ],
      "steps": [
        "Enfría el té y el jugo.",
        "Mezcla en una copa pequeña.",
        "Sirve sin hielo o con un cubo grande."
      ],
      "glassware": "Copa pequeña",
      "zero_proof_alternative_id": "te-ambar",
      "recipe_note": "Alternativa por color y ritual; no pretende reproducir el vino."
    },
    {
      "id": "agua-mineral",
      "name_es": "Agua mineral",
      "aliases": [
        "Agua con gas"
      ],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "agua mineral",
          "amount": 250,
          "unit": "ml"
        }
      ],
      "steps": [
        "Enfría el agua mineral.",
        "Sirve en un vaso alto.",
        "Bebe a tu ritmo."
      ],
      "glassware": "Vaso alto",
      "zero_proof_alternative_id": "agua-mineral",
      "recipe_note": "Servicio sencillo; la anécdota documenta agua, no una preparación especial."
    },
    {
      "id": "singapore-sling",
      "name_es": "Singapore Sling",
      "aliases": [
        "Singapore sling"
      ],
      "category": "Cóctel largo",
      "alcoholic": true,
      "ingredients": [
        {
          "name": "gin",
          "amount": 45,
          "unit": "ml"
        },
        {
          "name": "jugo de piña",
          "amount": 90,
          "unit": "ml"
        },
        {
          "name": "jugo de limón",
          "amount": 15,
          "unit": "ml"
        },
        {
          "name": "granadina",
          "amount": 10,
          "unit": "ml"
        }
      ],
      "steps": [
        "Llena un vaso alto con hielo.",
        "Añade los ingredientes y mezcla suavemente.",
        "Completa con agua con gas si quieres una versión más larga."
      ],
      "glassware": "Vaso alto",
      "zero_proof_alternative_id": "sling-tropical-cero",
      "recipe_note": "Versión contemporánea propia; la fuente verifica una mención literaria, no una receta canónica."
    },
    {
      "id": "sling-tropical-cero",
      "name_es": "Sling tropical sin alcohol",
      "aliases": [
        "Sling cero"
      ],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "jugo de piña",
          "amount": 100,
          "unit": "ml"
        },
        {
          "name": "jugo de limón",
          "amount": 15,
          "unit": "ml"
        },
        {
          "name": "granadina",
          "amount": 10,
          "unit": "ml"
        },
        {
          "name": "agua con gas",
          "amount": 80,
          "unit": "ml"
        }
      ],
      "steps": [
        "Llena un vaso alto con hielo.",
        "Añade jugos y granadina.",
        "Completa con agua con gas."
      ],
      "glassware": "Vaso alto",
      "zero_proof_alternative_id": "sling-tropical-cero",
      "recipe_note": "Alternativa por fruta y formato; no pretende ser una réplica."
    },
    {
      "id": "gin-tonic",
      "name_es": "Gin tonic",
      "aliases": [
        "Gin and tonic",
        "Ginebra con tónica"
      ],
      "category": "Trago largo",
      "alcoholic": true,
      "ingredients": [
        {
          "name": "gin",
          "amount": 45,
          "unit": "ml"
        },
        {
          "name": "agua tónica",
          "amount": 150,
          "unit": "ml"
        }
      ],
      "steps": [
        "Llena un vaso alto con hielo.",
        "Añade el gin.",
        "Completa con tónica y mezcla una vez."
      ],
      "glassware": "Vaso alto",
      "zero_proof_alternative_id": "tonica-citricos-cero",
      "recipe_note": "Servicio contemporáneo; no se atribuye a los autores ni a los personajes."
    },
    {
      "id": "cafe-con-mate",
      "name_es": "Café con mate",
      "aliases": [
        "Café y mate"
      ],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "café filtrado",
          "amount": 120,
          "unit": "ml"
        },
        {
          "name": "mate cocido",
          "amount": 80,
          "unit": "ml"
        }
      ],
      "steps": [
        "Prepara el café y el mate por separado.",
        "Sírvelos juntos, sin mezclarlos.",
        "Alterna los sorbos según prefieras."
      ],
      "glassware": "Taza y vaso pequeño",
      "zero_proof_alternative_id": "cafe-con-mate",
      "recipe_note": "Propuesta editorial basada en dos bebidas presentes en la escena, no una receta de Cortázar."
    },
    {
      "id": "vino-tinto",
      "name_es": "Vino tinto",
      "aliases": [
        "Vino"
      ],
      "category": "Vino",
      "alcoholic": true,
      "ingredients": [
        {
          "name": "vino tinto",
          "amount": 120,
          "unit": "ml"
        }
      ],
      "steps": [
        "Sirve el vino en una copa.",
        "Déjalo reposar un momento.",
        "Elige mosto si prefieres una alternativa sin alcohol."
      ],
      "glassware": "Copa de vino",
      "zero_proof_alternative_id": "mosto-tinto",
      "recipe_note": "Servicio contemporáneo; no reconstruye una bebida histórica."
    },
    {
      "id": "mosto-tinto",
      "name_es": "Mosto tinto",
      "aliases": [
        "Jugo de uva tinta"
      ],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "jugo de uva tinta",
          "amount": 150,
          "unit": "ml"
        },
        {
          "name": "agua con gas",
          "amount": 50,
          "unit": "ml"
        }
      ],
      "steps": [
        "Enfría el jugo de uva.",
        "Sirve con hielo si lo deseas.",
        "Completa con un poco de agua con gas."
      ],
      "glassware": "Copa de vino",
      "zero_proof_alternative_id": "mosto-tinto",
      "recipe_note": "Alternativa por fruta y ritual; no replica el alcohol."
    },
    {
      "id": "infusion-especiada",
      "name_es": "Infusión especiada",
      "aliases": [
        "Té especiado"
      ],
      "category": "Sin alcohol",
      "alcoholic": false,
      "ingredients": [
        {
          "name": "té negro",
          "amount": 200,
          "unit": "ml"
        },
        {
          "name": "canela",
          "amount": 1,
          "unit": "pizca"
        },
        {
          "name": "cáscara de naranja",
          "amount": 1,
          "unit": "unidad"
        }
      ],
      "steps": [
        "Infusiona el té durante tres minutos.",
        "Añade canela y naranja.",
        "Sirve caliente."
      ],
      "glassware": "Taza",
      "zero_proof_alternative_id": "infusion-especiada",
      "recipe_note": "Fixture sintético conservado sólo para el borrador excluido."
    }
  ],
  "sources": [
    {
      "id": "fuente-big-blonde",
      "source_type": "literary_work",
      "title": "Big Blonde",
      "author_or_publisher": "Dorothy Parker / Project Gutenberg Canada",
      "url": "https://gutenberg.ca/ebooks/parkerd-bigblonde/parkerd-bigblonde-00-h.html",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-bukowski-poema",
      "source_type": "literary_work",
      "title": "I Am Visited by an Editor and a Poet",
      "author_or_publisher": "Charles Bukowski / Poetry Foundation",
      "url": "https://www.poetryfoundation.org/poems/49586/i-am-visited-by-an-editor-and-a-poet",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-on-the-road",
      "source_type": "literary_work",
      "title": "On the Road",
      "author_or_publisher": "Jack Kerouac / Penguin Random House Canada",
      "url": "https://www.penguinrandomhouse.ca/books/540752/on-the-road-by-jack-kerouac/excerpt",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-the-great-gatsby",
      "source_type": "literary_work",
      "title": "The Great Gatsby",
      "author_or_publisher": "F. Scott Fitzgerald / Old Dominion University",
      "url": "https://sites.wp.odu.edu/wp-content/uploads/sites/9252/2018/08/great-gatsby.pdf",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-the-sound-and-the-fury",
      "source_type": "literary_work",
      "title": "The Sound and the Fury",
      "author_or_publisher": "William Faulkner / Project Gutenberg",
      "url": "https://www.gutenberg.org/files/75170/75170-h/75170-h.htm",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-the-maltese-falcon",
      "source_type": "literary_work",
      "title": "The Maltese Falcon",
      "author_or_publisher": "Dashiell Hammett / Project Gutenberg",
      "url": "https://www.gutenberg.org/files/77600/77600-h/77600-h.htm",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-the-long-goodbye",
      "source_type": "literary_work",
      "title": "The Long Goodbye",
      "author_or_publisher": "Raymond Chandler / Project Gutenberg Canada",
      "url": "https://gutenberg.ca/ebooks/chandlerr-longgoodbye/chandlerr-longgoodbye-00-h.html",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-the-sun-also-rises",
      "source_type": "literary_work",
      "title": "The Sun Also Rises",
      "author_or_publisher": "Ernest Hemingway / Wikisource",
      "url": "https://en.wikisource.org/wiki/Page%3AThe_sun_also_rises_-_Hemingway%2C_Ernest%2C_1899-1961.pdf/232",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-poe-amontillado",
      "source_type": "literary_work",
      "title": "The Cask of Amontillado",
      "author_or_publisher": "Edgar Allan Poe / Project Gutenberg",
      "url": "https://www.gutenberg.org/cache/epub/1063/pg1063-images.html",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-oneill-iceman",
      "source_type": "literary_work",
      "title": "The Iceman Cometh",
      "author_or_publisher": "Eugene O'Neill / Project Gutenberg Australia",
      "url": "https://www.gutenberg.net.au/ebooks04/0400021h.html",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-cabrera-infante-agua",
      "source_type": "newspaper_article",
      "title": "¡Enhorabuena!, que lo disfrute",
      "author_or_publisher": "El País",
      "publication_date": "1998-04-24",
      "url": "https://elpais.com/diario/1998/04/24/cultura/893368801_850215.html",
      "accessed_at": "2026-07-21",
      "language": "es",
      "reliability_tier": "reputable_secondary"
    },
    {
      "id": "fuente-thompson-singapore-sling",
      "source_type": "magazine_article",
      "title": "Unraveling the Legend of the Singapore Sling",
      "author_or_publisher": "MEL Magazine",
      "url": "https://melmagazine.com/en-us/story/singapore-sling-history",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "reputable_secondary"
    },
    {
      "id": "fuente-cheever-swimmer",
      "source_type": "literary_work",
      "title": "The Swimmer",
      "author_or_publisher": "John Cheever / Library of America",
      "url": "https://www.loa.org/images/pdf/Cheever_Swimmer.pdf",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-onetti-cuestionario",
      "source_type": "newspaper_article",
      "title": "Cien años de un genio perezoso",
      "author_or_publisher": "El País",
      "publication_date": "2009-06-21",
      "url": "https://elpais.com/diario/2009/06/21/cultura/1245535201_850215.html",
      "accessed_at": "2026-07-21",
      "language": "es",
      "reliability_tier": "reputable_secondary"
    },
    {
      "id": "fuente-cortazar-rayuela",
      "source_type": "literary_work",
      "title": "Rayuela, capítulo 3",
      "author_or_publisher": "Cortázar",
      "url": "https://cortazar.com.ar/rayuela-capitulo-3/",
      "accessed_at": "2026-07-21",
      "language": "es",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-cervantes-quijote",
      "source_type": "literary_work",
      "title": "Don Quijote de la Mancha, segunda parte, capítulo XIII",
      "author_or_publisher": "Centro Virtual Cervantes",
      "url": "https://cvc.cervantes.es/literatura/clasicos/quijote/edicion/parte2/cap13/cap13_02.htm",
      "accessed_at": "2026-07-21",
      "language": "es",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-neruda-oda-vino",
      "source_type": "literary_work",
      "title": "Oda al vino",
      "author_or_publisher": "Pablo Neruda / Universidad de Chile",
      "url": "https://neruda.uchile.cl/obra/obraodaselementales10.html",
      "accessed_at": "2026-07-21",
      "language": "es",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-valle-inclan-luces",
      "source_type": "literary_work",
      "title": "Luces de bohemia",
      "author_or_publisher": "Ramón del Valle-Inclán / Biblioteca Virtual Miguel de Cervantes",
      "url": "https://www.cervantesvirtual.com/obra-visor/luces-de-bohemia-esperpento-875782/html/f061ab80-96cc-4bec-9e5d-fcb779e7bed5_2.html",
      "accessed_at": "2026-07-21",
      "language": "es",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-carver-love",
      "source_type": "literary_work",
      "title": "What We Talk About When We Talk About Love",
      "author_or_publisher": "Raymond Carver / The New School at Atlanta",
      "url": "https://tnsatlanta.org/wp-content/uploads/What-We-Talk-About-When-We-Talk-About-Love-Carver.pdf",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "primary"
    },
    {
      "id": "fuente-king-guardian",
      "source_type": "interview",
      "title": "Part two of the full Stephen King interview",
      "author_or_publisher": "The Guardian",
      "publication_date": "2000-09-14",
      "url": "https://www.theguardian.com/books/2000/sep/14/stephenking.fiction1",
      "accessed_at": "2026-07-21",
      "language": "en",
      "reliability_tier": "reputable_secondary"
    }
  ]
}
