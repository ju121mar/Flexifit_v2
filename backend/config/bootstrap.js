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
      firstName: "Emma",
      lastName: "Stein",
      email: "emma.stein@example.com",
      phoneNumber: "+4915123456789",
      isSuperAdmin: true,
      password:await sails.helpers.passwords.hashPassword('abc123')
    }
    // {
    //   "firstName": "Anna",
    //   "lastName": "Schmidt",
    //   "email": "anna.schmidt@example.com",
    //   "phoneNumber": "+4915155555555",
    // },
    // {
    //   "firstName": "Lukas",
    //   "lastName": "Fischer",
    //   "email": "lukas.fischer@example.com",
    //   "phoneNumber": "+4915722222222",
    // },
    // {
    //   "firstName": "Sophia",
    //   "lastName": "Weber",
    //   "email": "sophia.weber@example.com",
    //   "phoneNumber": "+4915233333333",
    // },
    // {
    //   "firstName": "Tom",
    //   "lastName": "Kaiser",
    //   "email": "tom.kaiser@example.com",
    //   "phoneNumber": "+4915344444444",
    // }
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
      },
    {
      name: "Functional Fitness",
      trainer: 1,
      uhrzeit: "09:00 Uhr",
      wochentag: "Montag",
      dauer: "50 Minuten",
      teilnehmer: "12",
      description: "Ein intensives Ganzkörpertraining für alle Fitnesslevel."
    },
    {
      name: "Calisthenics Basics",
      trainer: 2,
      uhrzeit: "18:30 Uhr",
      wochentag: "Montag",
      dauer: "60 Minuten",
      teilnehmer: "10",
      description: "Grundlagen des Trainings mit dem eigenen Körpergewicht."
    },

    {
      name: "Indoor Cycling",
      trainer: 3,
      uhrzeit: "07:00 Uhr",
      wochentag: "Dienstag",
      dauer: "45 Minuten",
      teilnehmer: "15",
      description: "Ein energiegeladener Kurs auf dem Fahrrad."
    },
    {
      name: "Athletik Training",
      trainer: 4,
      uhrzeit: "19:00 Uhr",
      wochentag: "Dienstag",
      dauer: "55 Minuten",
      teilnehmer: "10",
      description: "Ein athletischer Mix aus Kraft und Kondition."
    },

    {
      name: "Kraft & Mobility",
      trainer: 5,
      uhrzeit: "08:30 Uhr",
      wochentag: "Mittwoch",
      dauer: "60 Minuten",
      teilnehmer: "12",
      description: "Verbessere deine Kraft und Beweglichkeit in einem Kurs."
    },
    {
      name: "TRX Suspension Training",
      trainer: 1,
      uhrzeit: "17:30 Uhr",
      wochentag: "Mittwoch",
      dauer: "45 Minuten",
      teilnehmer: "8",
      description: "Training mit dem TRX-System für den ganzen Körper."
    },

    {
      name: "Power Yoga",
      trainer: 2,
      uhrzeit: "06:30 Uhr",
      wochentag: "Donnerstag",
      dauer: "60 Minuten",
      teilnehmer: "10",
      description: "Eine kraftvolle Yoga-Session für Geübte."
    },
    {
      name: "Kettlebell Workout",
      trainer: 3,
      uhrzeit: "20:00 Uhr",
      wochentag: "Donnerstag",
      dauer: "50 Minuten",
      teilnehmer: "8",
      description: "Effizientes Krafttraining mit Kettlebells."
    },

    {
      name: "Step Aerobic",
      trainer: 4,
      uhrzeit: "07:00 Uhr",
      wochentag: "Freitag",
      dauer: "50 Minuten",
      teilnehmer: "15",
      description: "Ein dynamisches Cardio-Workout mit Step-Elementen."
    },
    {
      name: "Deep Stretch",
      trainer: 5,
      uhrzeit: "18:00 Uhr",
      wochentag: "Freitag",
      dauer: "40 Minuten",
      teilnehmer: "10",
      description: "Ein ruhiger Kurs mit Fokus auf tiefes Dehnen und Entspannen."
    },

    {
      name: "Cardio Kickboxing",
      trainer: 1,
      uhrzeit: "09:30 Uhr",
      wochentag: "Samstag",
      dauer: "60 Minuten",
      teilnehmer: "12",
      description: "Ein schweißtreibendes Training mit Kickbox-Elementen."
    },
    {
      name: "Core Blast",
      trainer: 2,
      uhrzeit: "11:00 Uhr",
      wochentag: "Samstag",
      dauer: "45 Minuten",
      teilnehmer: "10",
      description: "Intensives Training für eine starke Körpermitte."
    },

    {
      name: "Relaxation Yoga",
      trainer: 3,
      uhrzeit: "10:00 Uhr",
      wochentag: "Sonntag",
      dauer: "60 Minuten",
      teilnehmer: "8",
      description: "Ein sanfter Yoga-Kurs für maximale Entspannung."
    },
    {
      name: "Family Fitness",
      trainer: 4,
      uhrzeit: "15:00 Uhr",
      wochentag: "Sonntag",
      dauer: "50 Minuten",
      teilnehmer: "20",
      description: "Ein spaßiger Fitnesskurs für die ganze Familie."
    }
    ]
  );

};
