# Backend för laboration 3 - Dokumentation om API

## https://mongodb-lab3.onrender.com/api

## Installation av databas
MongoDB används för databasen och denna kan klonas och köras genom att köra npm install för att få paketen som krävs.
Tabellen använt för denna laboration är följande:
| Tabellnamn  |  Fält | 
|---|---|
|  workexperience | **_id**(serial), **company**(string), **jobtitle**(string), **joblocation**(string), **workingfromwhere**(string), **workinghours**(string), **description**(string)  |


## Användning av API

APIt kan användas med hjälp av fetch och stödjer för nuvarande nedan:

| Metod   | Ändpunkt  | Beskrivning  |
|---|---|---|
| GET | /api//workexperience/  |  Hämtar samtliga poster |
|  GET | /api//workexperience/:id  | Hämtar post utefter ID som parameter  |
|  POST | /api//workexperience/  | Skapar ny post. Kräver att samtliga fält är ifyllda (se kod)  |
|  PUT |  /api//workexperience/:id | Uppdaterar existerande post med ID som parameter. Samma krav som POST, objekt måste skickas med.  |
|  DELETE    | /api//workexperience/:id    | Raderar kurs utefter ID som parameter. |


GET returnerar denna struktur i JSON:

```
 {
    "_id": "69e7aaed86f2ff70302b2712",
    "company": "Institutet för roliga gångstilar",
    "jobtitle": "Quality Assurance",
    "joblocation": "Gågatan",
    "workinghours": "100%",
    "workfromwhere": "Platsarbete",
    "description": "Såg till att roliga gångstilar faktiskt var roliga och inte tvingade.\nGår själv roligt.",
    "__v": 0
  },
```
