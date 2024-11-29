module.exports = {
  find: async function (req, res){
    let kurs = [
      {
        "id": "001",
        "name": "Yoga Flow",
        "Trainer": "Emma Schill",
        "Uhrzeit": "8:00 Uhr",
        "description": "Ein Kurs, der Körper und Geist durch fließende Bewegungen und gezielte Atemübungen stärkt und entspannt."
      },
      {
        "id": "002",
        "name": "Power HIIT",
        "Trainer": "Luca Lange",
        "Uhrzeit": "9:00 Uhr",
        "description": "Ein intensiver Kurs, der durch kurze, kraftvolle Intervalle und gezielte Erholungsphasen den gesamten Körper stärkt."
      },
      {
        "id": "003",
        "name": "Spin Class",
        "Trainer": "Lara Stein",
        "Uhrzeit": "17:00 Uhr",
        "description": "Ein Kurs, der die Tiefenmuskulatur stärkt, die Körperhaltung verbessert und für mehr Flexibilität und Balance sorgt."
      },
      {
        "id": "004",
        "name": "Balance Pilates",
        "Trainer": "Caro Klirr",
        "Uhrzeit": "17:00 Uhr",
        "description": " Ein energiegeladener Kurs, der durch intensives Radfahren zu motivierender Musik Ausdauer steigert und die Beinmuskulatur stärkt."
      }
    ]
    return res.json(kurs);
  }
}
