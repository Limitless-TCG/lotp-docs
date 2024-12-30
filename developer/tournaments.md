# Tournaments

All endpoints are relative to `https://play.limitlesstcg.com/api`.

## GET /tournaments
Returns an array of tournaments, with some basic information for categorizing.
Can be filtered by game or format.
By default the 50 most recent entries are returned, that number can be changed with the *limit* query parameter. To access additional results, you can use the *page* parameter.

#### Query Parameters
All query parameters are optional.

| Name | Type | Description |
| --- | --- | --- |
| game | String | Game ID, e.g. PTCG, VGC. See */games* endpoint for reference. |
| format | String | Format ID. See */games* endpoint for reference. |
| limit | Number | Number of tournaments to be returned. |
| page | Number | Used for pagination. |

#### Response Format

| Field | Type | Description |
| --- | --- | --- |
| id | String | Unique ID of the tournament, to be used with all other tournament endpoints. |
| game | String | Abbreviation/ID of the game the tournament is played in. See */games* endpoint for reference. |
| format | String | Abbreviation/ID of the format the tournament is played in. See */games* endpoint for reference. |
| name | String | Tournament name set by the organizer. |
| date | DateTime | Scheduled tournament start set by the organizer. |
| players | Number | Number of players that participated in the tournament. |

#### Example Response
```json
[
    {
        "id": "63fcb6d32fb42a11441fb777",
        "game": "VGC",
        "format": "23S2",
        "name": "Torneio Semanal VGC Brasil #07",
        "date": "2023-03-02T23:00:00.000Z",
        "players": 28
    },
    {
        "id": "63e931d12fb42a11441f513e",
        "game": "PTCG",
        "format": "STANDARD",
        "name": "Trust Your Feet PTCGLive #15 (SWSH to CRZ)",
        "date": "2023-03-02T22:00:00.000Z",
        "players": 47
    }
    ...
]
```

#### Example Use Cases
- Getting the IDs of relevant tournaments for use with the other endpoints.

## GET /tournaments/{id}/details
Returns more details about the requested tournament, including organizer, tournament structure and possible custom rules.
All the information from the /tournaments endpoint is included as well.

#### Response Format
In addition to the fields listed above:

| Field | Type | Description |
| --- | --- | --- |
| organizer | Object | Contains information about the organizer of the tournament. |
| → id | Number | ID used to uniquely identify the organizer. |
| → name | String | Organizer name. Note that the name can change between tournaments, while the ID will always remain the same. |
| → logo | String | If available, the url of the organizer's uploaded profile picture. | 
| platform | String | Abbreviation/ID of the platform the tournament is played on. See */games* endpoint for reference. |
| decklists | Boolean | Indicates whether the tournament used decklist / teamlist submission. |
| isPublic | Boolean | Indicates whether the tournament is listed publicly (otherwise accessible through direct link only). |
| isOnline | Boolean | Set to true if the tournament is played online, false if it's an in-person event. |
| phases | Object[] | The tournament structure as an array of objects, one per phase. |
| → phase | Number | Phase number |
| → type | String | Phase type, see organizer documentation for more details. |
| → rounds | Number | Number of rounds in the phase. Note that live bracket phases are seen as 1 round internally. |
| → mode | String | Number of games per match, BO1, BO3 or BO5. |
| bannedCards | Object[] | Contains an array of custom bans, if used by the tournament (game specific). |
| specialRules | String[] | Contains an array of rule identifiers, if used by the tournament (game specific). |


#### Example Response
```json
{
    "id": "636bf4efa527ff22cbbd82ae",
    "game": "PTCG",
    "format": "STANDARD",
    "name": "Limitless Showdown - November",
    "date": "2022-11-19T15:00:00.000Z",
    "players": 343,
    "organizer": {
        "id": 1,
        "name": "Limitless TCG",
        "logo": "https://limitlesstcg.s3.us-east-2.amazonaws.com/lotp/uploads/profile-pictures/uc9k2yryv437kpmn"
    },
    "decklists": true,
    "isPublic": true,
    "isOnline": true,
    "phases": [
        {
            "phase": 1,
            "type": "SWISS",
            "rounds": 11,
            "mode": "BO1"
        },
        {
            "phase": 2,
            "type": "SINGLE_BRACKET",
            "rounds": 1,
            "mode": "BO3"
        }
    ]
}
```

#### Example Use Cases
- Fetching a tournament's info after receiving a webhook notification.

## GET /tournaments/{id}/standings
Returns an array of all the players in the tournament, including final placing, score, and if available, their decklist.

#### Response Format
| Field | Type | Description |
| --- | --- | --- |
| player | String | Username/ID used to uniquely identify the player. Does not change between tournaments. |
| name | String | Display name chosen by the player, can change between tournaments. |
| country | String | ISO alpha-2 code of the player's country, as selected by them. |
| placing | Number | The player's final placing in the tournament. |
| record | Object | Contains the number of *wins*, *losses* and *ties* the player finished with. |
| decklist | (game specific) | Contains the decklist / teamlist of the player, format differs by game. |
| deck | Object | If the game has support for it, this field contains the player's auto assigned deck type. |
| drop | Number | If the player dropped from the tournament, this field contains the round during which they did so. |

#### Example Response
```json
[
    {
        "player": "espel",
        "name": "Tsubasa Shimizu",
        "country": "JP",
        "placing": 1,
        "record": {
            "wins": 13,
            "losses": 2,
            "ties": 0
        },
        "decklist": { ... },
        "deck": {
            "id": "lost-zone-box",
            "name": "Lost Zone Box",
            "icons": [
                "comfey",
                "sableye"
            ]
        },
        "drop": null
    },
    ...
]
```

#### Example Use Cases
- Aggregating player and deck results across several tournaments.
- Analyzing trends in decklists.

## GET /tournaments/{id}/pairings
Returns an array of all the matches that have been played in the tournament.

#### Response Format
| Field | Type | Description |
| --- | --- | --- |
| round | Number | Round during which the match happened. |
| phase | Number | Phase during which the match happened. |
| table | Number | Table number of the match (for all phase types except live brackets). |
| match | String | Match label, used in live brackets to identify where in the bracket it happened. |
| player1 | String | Username/ID of player A |
| player2 | String | Username/ID of player B. If empty, the match entry is either a bye or an automatic loss for tardiness. |
| winner | String/Number | Username/ID of the winning player, *0* if it ended in a tie, *-1* if it ended in a double loss. |

#### Example Response
```json
[
    {
        "round": 1,
        "phase": 1,
        "table": 1,
        "winner": "shoji300",
        "player1": "hedilily",
        "player2": "shoji300"
    },
    ...
    {
        "phase": 2,
        "round": 12,
        "match": "T2-1",
        "winner": "espel",
        "player1": "harun",
        "player2": "espel"
    }
]
```

#### Example Use Cases
- Creating a player ELO ranking based on tournament matches.
- Combining match data with decklists data to create deep-going matchup analysis.