sports.json
[
  {
    "id": 1,
    "name": "Football",
    "slug": "football"
  },
  {
    "id": 2,
    "name": "Basketball",
    "slug": "basketball"
  }
]

leagues.json
[
  {
    "id": 10,
    "name": "Premier League",
    "country": "England",
    "sport_id": 1
  },
  {
    "id": 11,
    "name": "La Liga",
    "country": "Spain",
    "sport_id": 1
  },
  {
    "id": 20,
    "name": "NBA",
    "country": "USA",
    "sport_id": 2
  }
]

teams.json
[
  {
    "id": 100,
    "name": "Manchester United",
    "league_id": 10,
    "sport_id": 1
  },
  {
    "id": 101,
    "name": "Real Madrid",
    "league_id": 11,
    "sport_id": 1
  },
  {
    "id": 200,
    "name": "Los Angeles Lakers",
    "league_id": 20,
    "sport_id": 2
  }
]

players.json
[
  {
    "id": 1,
    "name": "Cristiano Ronaldo",
    "team_id": 100,
    "position": "Forward",
    "number": 7,
    "stats": {
      "goals": 25,
      "assists": 10
    }
  },
  {
    "id": 2,
    "name": "LeBron James",
    "team_id": 200,
    "position": "Forward",
    "number": 23,
    "stats": {
      "points": 28,
      "rebounds": 8,
      "assists": 7
    }
  }
]

matches.json
[
  {
    "id": 500,
    "league_id": 10,
    "home_team_id": 100,
    "away_team_id": 101,
    "date": "2026-04-20T20:00:00Z",
    "status": "scheduled"
  },
  {
    "id": 501,
    "league_id": 20,
    "home_team_id": 200,
    "away_team_id": 200,
    "date": "2026-04-18T02:00:00Z",
    "status": "finished",
    "score": {
      "home": 102,
      "away": 98
    }
  }
]




