module.exports = {
  find: async function (req, res) {
    const kurs = [
      {
        id: "001",
        name: "Yoga Flow",
        trainer: "Emma Schill",
        uhrzeit: "8:00 Uhr",
        description: "Ein Kurs, der Körper und Geist durch fließende Bewegungen stärkt.",
        image: "../assets/pictures/Yoga.jpg"
      },
      {
        id: "002",
        name: "Power HIIT",
        trainer: "Luca Lange",
        uhrzeit: "9:00 Uhr",
        description: "Ein intensiver Kurs für den gesamten Körper.",
        image: "../assets/pictures/Yoga.jpg"
      },
      {
        id: "003",
        name: "Spin Class",
        trainer: "Lara Stein",
        uhrzeit: "17:00 Uhr",
        description: "Ein Kurs für mehr Flexibilität und Balance.",
      },
      {
        id: "004",
        name: "Balance Pilates",
        trainer: "Caro Klirr",
        uhrzeit: "17:00 Uhr",
        description: "Energiegeladenes Training mit Fokus auf Ausdauer.",
      },
    ];

    return res.json(kurs);
  },

  findOne: async function (req, res) {
    const kursId = req.params.id;
    const kurs = [
      {
        id: "001",
        name: "Yoga Flow",
        trainer: "Emma Schill",
        uhrzeit: "8:00 Uhr",
        description: "Ein Kurs, der Körper und Geist durch fließende Bewegungen stärkt.",
        image: "../Yoga.jpg"
      },
      {
        id: "002",
        name: "Balance Pilates",
        trainer: "Caro Klirr",
        uhrzeit: "17:00 Uhr",
        description: "Energiegeladenes Training mit Fokus auf Ausdauer.",
        image: "../Pilates.jpg",


      },
    ].find(k => k.id === String(kursId));
  
    if (kurs) {
      return res.json(kurs);
    } else {
      return res.status(404).json({ error: 'Kurs nicht gefunden' });
    }
  }
  
};
