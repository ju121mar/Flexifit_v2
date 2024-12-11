/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  if (await Kurs.count() > 0) {
    return;
  }
  //

  await Trainer.createEach([
    {
      "firstName": "Emma",
      "lastName": "Stein",
      "email": "emma.stein@example.com",
      "phoneNumber": "+4915123456789",
    },
    {
      "firstName": "Anna",
      "lastName": "Schmidt",
      "email": "anna.schmidt@example.com",
      "phoneNumber": "+4915155555555",
    },
    {
      "firstName": "Lukas",
      "lastName": "Fischer",
      "email": "lukas.fischer@example.com",
      "phoneNumber": "+4915722222222",
    },
    {
      "firstName": "Sophia",
      "lastName": "Weber",
      "email": "sophia.weber@example.com",
      "phoneNumber": "+4915233333333",
    },
    {
      "firstName": "Tom",
      "lastName": "Kaiser",
      "email": "tom.kaiser@example.com",
      "phoneNumber": "+4915344444444",
    }
  ])
  await Kurs.createEach([
      {
        name: "Yoga Flow",
        trainer: 1,
        uhrzeit: "08:00 Uhr",
        wochentag: "Montag",
        dauer: "60 Minuten",
        teilnehmer: "10",
        description: "Ein entspannender Yoga-Kurs, der Körper und Geist verbindet."
      },
      {
        name: "Balance Pilates",
        trainer: 2,
        uhrzeit: "17:00 Uhr",
        wochentag: "Dienstag",
        dauer: "45 Minuten",
        teilnehmer: "12",
        description: "Pilates-Übungen für eine starke Körpermitte und bessere Balance."
      },
      {
        name: "Spin Class",
        trainer: 3,
        uhrzeit: "18:30 Uhr",
        wochentag: "Mittwoch",
        dauer: "50 Minuten",
        teilnehmer: "15",
        description: "Ein energiegeladener Indoor-Cycling-Kurs mit motivierender Musik."
      },
      {
        name: "HIIT Workout",
        trainer: 4,
        uhrzeit: "19:00 Uhr",
        wochentag: "Donnerstag",
        dauer: "40 Minuten",
        teilnehmer: "20",
        description: "Ein intensives Intervalltraining, das Fett verbrennt und Muskeln stärkt."
      },
      {
        name: "Zumba Dance",
        trainer: 2,
        uhrzeit: "18:00 Uhr",
        wochentag: "Freitag",
        dauer: "60 Minuten",
        teilnehmer: "25",
        description: "Eine dynamische Tanzstunde mit lateinamerikanischen Rhythmen."
      },
      {
        name: "Functional Training",
        trainer: 3,
        uhrzeit: "16:00 Uhr",
        wochentag: "Samstag",
        dauer: "50 Minuten",
        teilnehmer: "18",
        description: "Ganzkörpertraining für Beweglichkeit, Kraft und Stabilität."
      },
      {
        name: "Meditation Session",
        trainer: 1,
        uhrzeit: "07:00 Uhr",
        wochentag: "Sonntag",
        dauer: "30 Minuten",
        teilnehmer: "8",
        description: "Eine ruhige Meditationsstunde, um die Woche entspannt zu starten."
      }
    ]
  );

};
