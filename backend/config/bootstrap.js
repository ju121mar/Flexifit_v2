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

const ExerciseBottom = require("../api/models/ExerciseBottom");



module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  if (await Kurs.count() > 0) {
    return;
  }
  await Mitglied.createEach([
    {
      firstName: 'Anna',
      lastName: 'Heinz',
      email: 'anna.heinz@example.com',
      password: await sails.helpers.passwords.hashPassword('123456'),
      street: 'Hauptstraße',
      houseNumber: '12',
      postalCode: '10115',
      city: 'Berlin',
      isSuperAdmin: true
    },
    {
      firstName: 'Max',
      lastName: 'Müller',
      email: 'max.mueller@example.com',
      password: await sails.helpers.passwords.hashPassword('123456'),
      street: 'Bahnhofstraße',
      houseNumber: '8a',
      postalCode: '80331',
      city: 'München',
      isSuperAdmin: false
    },
    {
      firstName: 'Sophia',
      lastName: 'Klein',
      email: 'sophia.klein@example.com',
      password: await sails.helpers.passwords.hashPassword('123456'),
      street: 'Lindenweg',
      houseNumber: '22',
      postalCode: '20095',
      city: 'Hamburg',
      isSuperAdmin: false
    },
    {
      firstName: 'Lukas',
      lastName: 'Fischer',
      email: 'lukas.fischer@example.com',
      password: await sails.helpers.passwords.hashPassword('123456'),
      street: 'Ringstraße',
      houseNumber: '45',
      postalCode: '50667',
      city: 'Köln',
      isSuperAdmin: false
    },
    {
      firstName: 'Emily',
      lastName: 'Weber',
      email: 'emily.weber@example.com',
      password: await sails.helpers.passwords.hashPassword('123456'),
      street: 'Blumenstraße',
      houseNumber: '3b',
      postalCode: '90403',
      city: 'Nürnberg',
      isSuperAdmin: false
    }
  ]);

  await Trainer.createEach([
    {
      firstName: 'Emma',
      lastName: 'Stein',
      email: 'emma.stein@example.com',
      phoneNumber: '+4915123456789',
      isSuperAdmin: true,
      password:await sails.helpers.passwords.hashPassword('abc123')
    },
    {
      firstName: 'Anna',
      lastName: 'Schmidt',
      email: 'anna.schmidt@example.com',
      phoneNumber: '+4915155555555',
      isSuperAdmin: true,
      password:await sails.helpers.passwords.hashPassword('abc123')
    },
    {
      firstName: 'Lukas',
      lastName: 'Fischer',
      email: 'lukas.fischer@example.com',
      phoneNumber: '+4915722222222',
      isSuperAdmin: true,
      password:await sails.helpers.passwords.hashPassword('abc123')
    },
    {
      firstName: 'Sophia',
      lastName: 'Weber',
      email: 'sophia.weber@example.com',
      phoneNumber: '+4915233333333',
      isSuperAdmin: true,
      password:await sails.helpers.passwords.hashPassword('abc123')
    },
    {
      firstName: 'Tom',
      lastName: 'Kaiser',
      email: 'tom.kaiser@example.com',
      phoneNumber: '+4915344444444',
      isSuperAdmin: true,
      password:await sails.helpers.passwords.hashPassword('abc123')
    }
  ]);
  await Kurs.createEach([
    {
      name: 'Yoga Flow',
      trainer: 1,
      uhrzeit: '08:00 Uhr',
      wochentag: 'Montag',
      dauer: '60 Minuten',
      teilnehmer: '10',
      description: 'Ein entspannender Yoga-Kurs, der Körper und Geist verbindet.',
      equipment: 'Yogamatte (vor Ort verfügbar), optional Yoga-Blöcke',
    },
    {
      name: 'Balance Pilates',
      trainer: 2,
      uhrzeit: '17:00 Uhr',
      wochentag: 'Dienstag',
      dauer: '45 Minuten',
      teilnehmer: '12',
      description: 'Pilates-Übungen für eine starke Körpermitte und bessere Balance.',
      equipment: 'Pilates-Matte (vor Ort), kleine Pilates-Bälle',
    },
    {
      name: 'Spin Class',
      trainer: 3,
      uhrzeit: '18:30 Uhr',
      wochentag: 'Mittwoch',
      dauer: '50 Minuten',
      teilnehmer: '15',
      description: 'Ein energiegeladener Indoor-Cycling-Kurs mit motivierender Musik.',
      equipment: 'Indoor Cycling Bike (vor Ort verfügbar)',
    },
    {
      name: 'HIIT Workout',
      trainer: 4,
      uhrzeit: '19:00 Uhr',
      wochentag: 'Donnerstag',
      dauer: '40 Minuten',
      teilnehmer: '20',
      description: 'Ein intensives Intervalltraining, das Fett verbrennt und Muskeln stärkt.',
      equipment: 'Kurzhanteln, Kettlebells, Trainingsmatte (alles vor Ort verfügbar)',
    },
    {
      name: 'Zumba Dance',
      trainer: 2,
      uhrzeit: '18:00 Uhr',
      wochentag: 'Freitag',
      dauer: '60 Minuten',
      teilnehmer: '25',
      description: 'Eine dynamische Tanzstunde mit lateinamerikanischen Rhythmen.',
      equipment: 'Keine Ausrüstung erforderlich',
    },
    {
      name: 'Functional Training',
      trainer: 3,
      uhrzeit: '16:00 Uhr',
      wochentag: 'Samstag',
      dauer: '50 Minuten',
      teilnehmer: '18',
      description: 'Ganzkörpertraining für Beweglichkeit, Kraft und Stabilität.',
      equipment: 'Kettlebells, Langhanteln, TRX-Bänder (vor Ort verfügbar)',
    },
    {
      name: 'Meditation Session',
      trainer: 1,
      uhrzeit: '07:00 Uhr',
      wochentag: 'Sonntag',
      dauer: '30 Minuten',
      teilnehmer: '8',
      description: 'Eine ruhige Meditationsstunde, um die Woche entspannt zu starten.',
      equipment: 'Yogamatte oder Sitzkissen (vor Ort verfügbar)',
    },
    {
      name: 'Functional Fitness',
      trainer: 1,
      uhrzeit: '09:00 Uhr',
      wochentag: 'Montag',
      dauer: '50 Minuten',
      teilnehmer: '12',
      description: 'Ein intensives Ganzkörpertraining für alle Fitnesslevel.',
      equipment: 'Gewichtsscheiben, Widerstandsbänder, Medizinbälle (vor Ort verfügbar)',
    },
    {
      name: 'Calisthenics Basics',
      trainer: 2,
      uhrzeit: '18:30 Uhr',
      wochentag: 'Montag',
      dauer: '60 Minuten',
      teilnehmer: '10',
      description: 'Grundlagen des Trainings mit dem eigenen Körpergewicht.',
      equipment: 'Keine Ausrüstung erforderlich',
    },
    {
      name: 'Indoor Cycling',
      trainer: 3,
      uhrzeit: '07:00 Uhr',
      wochentag: 'Dienstag',
      dauer: '45 Minuten',
      teilnehmer: '15',
      description: 'Ein energiegeladener Kurs auf dem Fahrrad.',
      equipment: 'Indoor Cycling Bike (vor Ort verfügbar)',
    },
    {
      name: 'Athletik Training',
      trainer: 4,
      uhrzeit: '19:00 Uhr',
      wochentag: 'Dienstag',
      dauer: '55 Minuten',
      teilnehmer: '10',
      description: 'Ein athletischer Mix aus Kraft und Kondition.',
      equipment: 'Kurzhanteln, Kettlebells, Plyo-Boxen (vor Ort verfügbar)',
    },
    {
      name: 'Kraft & Mobility',
      trainer: 5,
      uhrzeit: '08:30 Uhr',
      wochentag: 'Mittwoch',
      dauer: '60 Minuten',
      teilnehmer: '12',
      description: 'Verbessere deine Kraft und Beweglichkeit in einem Kurs.',
      equipment: 'Trainingsmatte, Widerstandsbänder (vor Ort verfügbar)',
    },
    {
      name: 'TRX Suspension Training',
      trainer: 1,
      uhrzeit: '17:30 Uhr',
      wochentag: 'Mittwoch',
      dauer: '45 Minuten',
      teilnehmer: '8',
      description: 'Training mit dem TRX-System für den ganzen Körper.',
      equipment: 'TRX-Bänder (vor Ort verfügbar)',
    },
    {
      name: 'Power Yoga',
      trainer: 2,
      uhrzeit: '06:30 Uhr',
      wochentag: 'Donnerstag',
      dauer: '60 Minuten',
      teilnehmer: '10',
      description: 'Eine kraftvolle Yoga-Session für Geübte.',
      equipment: 'Yogamatte (vor Ort verfügbar)',
    },
    {
      name: 'Kettlebell Workout',
      trainer: 3,
      uhrzeit: '20:00 Uhr',
      wochentag: 'Donnerstag',
      dauer: '50 Minuten',
      teilnehmer: '8',
      description: 'Effizientes Krafttraining mit Kettlebells.',
      equipment: 'Kettlebells (vor Ort verfügbar)',
    },
    {
      name: 'Step Aerobic',
      trainer: 4,
      uhrzeit: '07:00 Uhr',
      wochentag: 'Freitag',
      dauer: '50 Minuten',
      teilnehmer: '15',
      description: 'Ein dynamisches Cardio-Workout mit Step-Elementen.',
      equipment: 'Step-Brett (vor Ort verfügbar)',
    },
    {
      name: 'Deep Stretch',
      trainer: 5,
      uhrzeit: '18:00 Uhr',
      wochentag: 'Freitag',
      dauer: '40 Minuten',
      teilnehmer: '10',
      description: 'Ein ruhiger Kurs mit Fokus auf tiefes Dehnen und Entspannen.',
      equipment: 'Yogamatte (vor Ort verfügbar)',
    },
    {
      name: 'Cardio Kickboxing',
      trainer: 1,
      uhrzeit: '09:30 Uhr',
      wochentag: 'Samstag',
      dauer: '60 Minuten',
      teilnehmer: '12',
      description: 'Ein schweißtreibendes Training mit Kickbox-Elementen.',
      equipment: 'Boxhandschuhe (optional), Trainingsmatte (vor Ort verfügbar)',
    },
    {
      name: 'Core Blast',
      trainer: 2,
      uhrzeit: '11:00 Uhr',
      wochentag: 'Samstag',
      dauer: '45 Minuten',
      teilnehmer: '10',
      description: 'Intensives Training für eine starke Körpermitte.',
      equipment: 'Trainingsmatte (vor Ort verfügbar), Medizinball',
    },
    {
      name: 'Relaxation Yoga',
      trainer: 3,
      uhrzeit: '10:00 Uhr',
      wochentag: 'Sonntag',
      dauer: '60 Minuten',
      teilnehmer: '8',
      description: 'Ein sanfter Yoga-Kurs für maximale Entspannung.',
      equipment: 'Yogamatte, Decke (vor Ort verfügbar)',
    },
    {
      name: 'Family Fitness',
      trainer: 4,
      uhrzeit: '15:00 Uhr',
      wochentag: 'Sonntag',
      dauer: '50 Minuten',
      teilnehmer: '20',
      description: 'Ein spaßiger Fitnesskurs für die ganze Familie.',
      equipment: 'Keine Ausrüstung erforderlich',
    }

  ]
  );

  await Exercise.createEach([
    {
      exercisename: 'Kniebeugen',
      equipmentname: 'Langhantel',
      set: '3',
      rep: '12',
      setup: 'Langhantel auf Schulterhöhe platzieren, Füße schulterbreit aufstellen.',
      execution: 'Langsam in die Knie gehen, Rücken gerade halten.',
      weekday: 'Montag'
    },
    {
      exercisename: 'Bankdrücken',
      equipmentname: 'Langhantel',
      set: '4',
      rep: '10',
      setup: 'Langhantel in Brusthöhe auflegen, Schulterblätter zusammenziehen.',
      equipment: 'Langhantel, Flachbank',
      execution: 'Langhantel kontrolliert nach oben drücken.',
      weekday:'Dienstag'
    }
  ]);

  await ExerciseBottom.createEach([
    [
      {
        exercisename: 'Kniebeugen',
        equipmentname: 'Langhantel',
        set: '3',
        rep: '12',
        setup: 'Langhantel auf Schulterhöhe platzieren, Füße schulterbreit aufstellen.',
        execution: 'Langsam in die Knie gehen, Rücken gerade halten.',
        weekday: 'Montag'
      },
      {
        exercisename: 'Beinpresse',
        equipmentname: 'Beinpresse',
        set: '4',
        rep: '10',
        setup: 'Füße schulterbreit auf der Plattform platzieren.',
        execution: 'Die Plattform kontrolliert wegdrücken und langsam zurücklassen.',
        weekday: 'Montag'
      },
      {
        exercisename: 'Bulgarische Kniebeuge',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '10',
        setup: 'Einen Fuß auf eine Bank hinter dir legen, anderen Fuß nach vorne stellen.',
        execution: 'Langsam in die Knie gehen, Oberkörper aufrecht halten.',
        weekday: 'Dienstag'
      },
      {
        exercisename: 'Ausfallschritte',
        equipmentname: 'Kurzhanteln',
        set: '4',
        rep: '12',
        setup: 'Kurzhanteln in beiden Händen halten, aufrecht stehen.',
        execution: 'Einen großen Schritt nach vorne machen und das hintere Knie fast den Boden berühren lassen.',
        weekday: 'Dienstag'
      },
      {
        exercisename: 'Glute Bridge',
        equipmentname: 'Langhantel',
        set: '3',
        rep: '15',
        setup: 'Langhantel auf der Hüfte platzieren, Rücken auf den Boden legen.',
        execution: 'Hüfte nach oben drücken, Po anspannen.',
        weekday: 'Mittwoch'
      },
      {
        exercisename: 'Hip Thrust',
        equipmentname: 'Langhantel',
        set: '4',
        rep: '10',
        setup: 'Schultern auf eine Bank legen, Langhantel auf der Hüfte platzieren.',
        execution: 'Hüfte nach oben drücken, Po anspannen.',
        weekday: 'Mittwoch'
      },
      {
        exercisename: 'Sumo-Kreuzheben',
        equipmentname: 'Langhantel',
        set: '4',
        rep: '8',
        setup: 'Füße weit auseinander, Langhantel vor dir auf dem Boden.',
        execution: 'Langhantel kontrolliert anheben, Rücken gerade halten.',
        weekday: 'Donnerstag'
      },
      {
        exercisename: 'Step-Ups',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '12',
        setup: 'Eine stabile Box oder Bank verwenden, Kurzhanteln in beiden Händen halten.',
        execution: 'Mit einem Bein auf die Box steigen, kontrolliert zurück.',
        weekday: 'Donnerstag'
      },
      {
        exercisename: 'Beinbeuger',
        equipmentname: 'Beinbeuger-Maschine',
        set: '4',
        rep: '10',
        setup: 'Füße unter die Polster der Maschine legen, Position einstellen.',
        execution: 'Füße langsam nach oben beugen, kontrolliert zurück.',
        weekday: 'Freitag'
      },
      {
        exercisename: 'Beinstrecker',
        equipmentname: 'Beinstrecker-Maschine',
        set: '3',
        rep: '12',
        setup: 'Beine unter die Polster legen, Rücken anlehnen.',
        execution: 'Beine kontrolliert strecken und zurückführen.',
        weekday: 'Freitag'
      },
      {
        exercisename: 'Sumo-Kniebeugen mit Kettlebell',
        equipmentname: 'Kettlebell',
        set: '4',
        rep: '12',
        setup: 'Füße weit auseinander, Kettlebell mit beiden Händen halten.',
        execution: 'Langsam in die Knie gehen, Rücken gerade halten.',
        weekday: 'Samstag'
      },
      {
        exercisename: 'Goblet Squat',
        equipmentname: 'Kurzhantel',
        set: '3',
        rep: '12',
        setup: 'Kurzhantel vor der Brust halten, Füße schulterbreit aufstellen.',
        execution: 'Langsam in die Knie gehen und wieder hochdrücken.',
        weekday: 'Samstag'
      },
      {
        exercisename: 'Wadenheben',
        equipmentname: 'Langhantel',
        set: '3',
        rep: '15',
        setup: 'Langhantel auf Schulterhöhe platzieren, aufrecht stehen.',
        execution: 'Auf die Zehenspitzen gehen, kontrolliert absenken.',
        weekday: 'Sonntag'
      },
      {
        exercisename: 'Seitliche Ausfallschritte',
        equipmentname: 'Kurzhanteln',
        set: '4',
        rep: '10',
        setup: 'Kurzhanteln in beiden Händen halten, breit stehen.',
        execution: 'Einen Schritt zur Seite machen und das Knie beugen.',
        weekday: 'Sonntag'
      }
    ]    
  ]);
}
