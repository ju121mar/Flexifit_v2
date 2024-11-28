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
        "id": "001",
        "name": "Balance Pilates",
        "Trainer": "Caro Klirr",
        "Uhrzeit": "17:00 Uhr",
        "description": "Ein Kurs, der die Tiefenmuskulatur stärkt, die Körperhaltung verbessert und für mehr Flexibilität und Balance sorgt."
      }
    ]
    return res.json(kurs);
  }
}
