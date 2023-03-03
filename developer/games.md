# Games

All endpoints are relative to `https://play.limitlesstcg.com/api`.

## GET /games
Returns an array of all the games that are supported on the site.

#### Response Format
| Field | Type | Description |
| --- | --- | --- |
| id | String | Abbreviation/ID that is used to identify the game throughout the site. |
| name | String | Display name that's used for the game. |
| formats | Map | *Abbreviation/ID <-> Name* pairs of all the formats that can be selected to play the game in. |
| platforms | Map | *Abbreviation/ID <-> Name* pairs of all the platforms that can be selected to play the game on. |
| metagame | Boolean | Indicates whether the game has automatic deck categorization and metagame stats. |

#### Example Response
```json
[
    {
        "id": "PTCG",
        "name": "Pokémon TCG",
        "formats": { ... },
        "platforms": {
            "PTCGL": "Pokémon TCG Live",
            "PTCGO": "Pokémon TCG Online",
            ...
        },
        "metagame": true
    },
    ...
]
```

#### Example Use Cases
- Getting the full names of all the game, format and platform IDs used in tournament endpoints.
- Listing all the supported options / filters.

## GET /games/{id}/decks
If the game supports automatic deck categorization, this endpoint returns the rules that are used. Note that existing rules may be updated or even deleted at any time.

#### Response Format
| Field | Type | Description |
| --- | --- | --- |
| identifier | String | uniquely identifies the deck |
| name | String | A display name that does not need to be unique. |
| cards | Object[] | An array of cards that need to be in the decklist for it to be categorized as this deck. |
| → count | Number | min. number of copies of the card in the decklist (1 if empty) |
| → name | String | (exact!) name of the card |
| → set | String | Set code of the card, if there are different ones with the same name. |
| → number | String | Set number of the card, if there are different ones with the same name & set. |
| priority | Number | Order in which the rules should be applied (defaults to 10, higher number is checked after). |
| variants | Object[] | Further rules by which the deck can be categorized more specifically if it matches the top-level rules. Sub-identifiers should be unique among all decks and variants so that they can also be used on the top level. |
| icons | String[] | If available (Pokémon TCG), icons used to represent the deck type. |
| generation | Number | Used to group decks together by timeframe (optional). |

#### Example Response
```json
[
    {
        "identifier": "jolteon-vmax",
        "name": "Jolteon",
        "icons": [
            "jolteon"
        ],
        "priority": 10,
        "cards": [
            {
                "name": "Jolteon VMAX",
                "count": "2"
            }
        ],
        "variants": [
            {
                "identifier": "jolteon-inteleon",
                "name": "Jolteon Inteleon",
                "icon": "inteleon",
                "cards": [
                    {
                        "name": "Drizzile",
                        "count": "2"
                    },
                    {
                        "name": "Inteleon"
                    }
                ]
            }
        ],
        "generation": 8
    },
    ...
]
```

#### Example Use Cases
- Updating deck categorization of past tournaments without re-downloading all tournament data.
- Customizing deck categorization rules without re-doing them from scratch.