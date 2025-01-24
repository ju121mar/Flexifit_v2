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
      isSuperAdmin: true,
      dob: '1985-04-15'
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
      isSuperAdmin: false,
      dob: '1990-09-22' // Geburtsdatum
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
      isSuperAdmin: false,
      dob: '1993-02-10' // Geburtsdatum
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
      isSuperAdmin: false,
      dob: '1988-07-05' // Geburtsdatum
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
      isSuperAdmin: false,
      dob: '1995-11-30' // Geburtsdatum
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

  await Rezeptionist.createEach([
    {
      firstName: 'Maria',
      lastName: 'Schmidt',
      email: 'maria.schmidt@example.com',
      password: await sails.helpers.passwords.hashPassword('123abc'),
      phoneNumber: '+49123456789',
      isSuperAdmin: false
    },
    {
      firstName: 'Karl',
      lastName: 'Müller',
      email: 'karl.mueller@example.com',
      password: await sails.helpers.passwords.hashPassword('123abc'),
      phoneNumber: '+49987654321',
      isSuperAdmin: false
    },
    {
      firstName: 'Lisa',
      lastName: 'Weber',
      email: 'lisa.weber@example.com',
      password: await sails.helpers.passwords.hashPassword('123abc'),
      phoneNumber: '+49567890123',
      isSuperAdmin: false
    }
  ]);

  await Buchung.createEach([
    {
      mitglied: 1,
      kurs: 1
    }
    ]);

  await Kurs.createEach([
    {
      name: 'Yoga Flow',
      trainer: 1,
      uhrzeit: '08:00 Uhr',
      wochentag: 'Montag',
      dauer: '60 Minuten',
      teilnehmer: 10,
      description: 'Ein entspannender Yoga-Kurs, der Körper und Geist verbindet.',
      equipment: 'Yogamatte (vor Ort verfügbar), optional Yoga-Blöcke',
      image: '/src/assets/pictures/Yoga.jpg',
    },
    {
      name: 'Balance Pilates',
      trainer: 2,
      uhrzeit: '17:00 Uhr',
      wochentag: 'Dienstag',
      dauer: '45 Minuten',
      teilnehmer: 12,
      description: 'Pilates-Übungen für eine starke Körpermitte und bessere Balance.',
      equipment: 'Pilates-Matte (vor Ort), kleine Pilates-Bälle',
      image: '/src/assets/pictures/Laufband.png',
    },
    {
      name: 'Spin Class',
      trainer: 3,
      uhrzeit: '18:30 Uhr',
      wochentag: 'Mittwoch',
      dauer: '50 Minuten',
      teilnehmer: 15,
      description: 'Ein energiegeladener Indoor-Cycling-Kurs mit Musik.',
      equipment: 'Indoor Cycling Bike (vor Ort verfügbar)',
      image: '/src/assets/pictures/HIIT.jpg'
    },
    {
      name: 'HIIT Workout',
      trainer: 4,
      uhrzeit: '19:00 Uhr',
      wochentag: 'Donnerstag',
      dauer: '40 Minuten',
      teilnehmer: 20,
      description: 'Ein intensives Intervalltraining, das Fett verbrennt.',
      equipment: 'Kurzhanteln, Kettlebells, Trainingsmatte (alles vor Ort verfügbar)',
      image:'/src/assets/pictures/HIIT.jpg'
    },
    {
      name: 'Zumba Dance',
      trainer: 2,
      uhrzeit: '18:00 Uhr',
      wochentag: 'Freitag',
      dauer: '60 Minuten',
      teilnehmer: 25,
      description: 'Eine dynamische Tanzstunde mit Rhythmen.',
      equipment: 'Keine Ausrüstung erforderlich',
      image: '/src/assets/pictures/Pilates.jpg',
    },
    {
      name: 'Functional Training',
      trainer: 3,
      uhrzeit: '16:00 Uhr',
      wochentag: 'Samstag',
      dauer: '50 Minuten',
      teilnehmer: 18,
      description: 'Ganzkörpertraining für Beweglichkeit, Kraft und Stabilität.',
      equipment: 'Kettlebells, Langhanteln, TRX-Bänder (vor Ort verfügbar)',
      image: '/src/assets/pictures/HIIT.jpg',
    },
    {
      name: 'Meditation Session',
      trainer: 1,
      uhrzeit: '07:00 Uhr',
      wochentag: 'Sonntag',
      dauer: '30 Minuten',
      teilnehmer: 8,
      description: 'Eine ruhige Meditationsstunde für Entspannung.',
      equipment: 'Yogamatte oder Sitzkissen (vor Ort verfügbar)',
      image: '/src/assets/pictures/Yoga.jpg'
    },
    {
      name: 'Functional Fitness',
      trainer: 1,
      uhrzeit: '09:00 Uhr',
      wochentag: 'Montag',
      dauer: '50 Minuten',
      teilnehmer: 12,
      description: 'Ein intensives Ganzkörpertraining für alle Fitnesslevel.',
      equipment: 'Gewichtsscheiben, Widerstandsbänder, Medizinbälle (vor Ort verfügbar)',
      image: '/src/assets/pictures/Laufband.png',
    },
    {
      name: 'Calisthenics Basics',
      trainer: 2,
      uhrzeit: '18:30 Uhr',
      wochentag: 'Montag',
      dauer: '60 Minuten',
      teilnehmer: 10,
      description: 'Grundlagen des Trainings mit dem eigenen Körpergewicht.',
      equipment: 'Keine Ausrüstung erforderlich',
      image: '/src/assets/pictures/HIIT.jpg',
    },
    {
      name: 'Indoor Cycling',
      trainer: 3,
      uhrzeit: '07:00 Uhr',
      wochentag: 'Dienstag',
      dauer: '45 Minuten',
      teilnehmer: 15,
      description: 'Ein energiegeladener Kurs auf dem Fahrrad.',
      equipment: 'Indoor Cycling Bike (vor Ort verfügbar)',
      image: '/src/assets/pictures/Laufband.png',
    },
    {
      name: 'Athletik Training',
      trainer: 4,
      uhrzeit: '19:00 Uhr',
      wochentag: 'Dienstag',
      dauer: '55 Minuten',
      teilnehmer: 10,
      description: 'Ein athletischer Mix aus Kraft und Kondition.',
      equipment: 'Kurzhanteln, Kettlebells, Plyo-Boxen (vor Ort verfügbar)',
      image: '/src/assets/pictures/HIIT.jpg'
    },
    {
      name: 'Kraft & Mobility',
      trainer: 5,
      uhrzeit: '08:30 Uhr',
      wochentag: 'Mittwoch',
      dauer: '60 Minuten',
      teilnehmer: 12,
      description: 'Verbessere deine Kraft und Beweglichkeit in einem Kurs.',
      equipment: 'Trainingsmatte, Widerstandsbänder (vor Ort verfügbar)',
      image: '/src/assets/pictures/Pilates.jpg',
    },
    {
      name: 'TRX Suspension Training',
      trainer: 1,
      uhrzeit: '17:30 Uhr',
      wochentag: 'Mittwoch',
      dauer: '45 Minuten',
      teilnehmer: 8,
      description: 'Training mit dem TRX-System für den ganzen Körper.',
      equipment: 'TRX-Bänder (vor Ort verfügbar)',
      image: '/src/assets/pictures/Laufband.png',
    },
    {
      name: 'Power Yoga',
      trainer: 2,
      uhrzeit: '06:30 Uhr',
      wochentag: 'Donnerstag',
      dauer: '60 Minuten',
      teilnehmer: 10,
      description: 'Eine kraftvolle Yoga-Session für Geübte.',
      equipment: 'Yogamatte (vor Ort verfügbar)',
      image: '/src/assets/pictures/Yoga.jpg',
    },
    {
      name: 'Kettlebell Workout',
      trainer: 3,
      uhrzeit: '20:00 Uhr',
      wochentag: 'Donnerstag',
      dauer: '50 Minuten',
      teilnehmer: 8,
      description: 'Effizientes Krafttraining mit Kettlebells.',
      equipment: 'Kettlebells (vor Ort verfügbar)',
      image: '/src/assets/pictures/HIIT.jpg',
    },
    {
      name: 'Step Aerobic',
      trainer: 4,
      uhrzeit: '07:00 Uhr',
      wochentag: 'Freitag',
      dauer: '50 Minuten',
      teilnehmer: 15,
      description: 'Ein dynamisches Workout mit Step-Elementen.',
      equipment: 'Step-Brett (vor Ort verfügbar)',
      image: '/src/assets/pictures/Pilates.jpg',
    },
    {
      name: 'Deep Stretch',
      trainer: 5,
      uhrzeit: '18:00 Uhr',
      wochentag: 'Freitag',
      dauer: '40 Minuten',
      teilnehmer: 10,
      description: 'Ein ruhiger Kurs mit Fokus auf tiefes Dehnen.',
      equipment: 'Yogamatte (vor Ort verfügbar)',
      image: '/src/assets/pictures/Yoga.jpg',
    },
    {
      name: 'Cardio Kickboxing',
      trainer: 1,
      uhrzeit: '09:30 Uhr',
      wochentag: 'Samstag',
      dauer: '60 Minuten',
      teilnehmer: 12,
      description: 'Ein schweißtreibendes Training mit Kickbox-Elementen.',
      equipment: 'Boxhandschuhe (optional), Trainingsmatte (vor Ort verfügbar)',
      image: '/src/assets/pictures/Laufband.png'
    },
    {
      name: 'Core Blast',
      trainer: 2,
      uhrzeit: '11:00 Uhr',
      wochentag: 'Samstag',
      dauer: '45 Minuten',
      teilnehmer: 10,
      description: 'Intensives Training für eine starke Körpermitte.',
      equipment: 'Trainingsmatte (vor Ort verfügbar), Medizinball',
      image: '/src/assets/pictures/Pilates.jpg',
    },
    {
      name: 'Relaxation Yoga',
      trainer: 3,
      uhrzeit: '10:00 Uhr',
      wochentag: 'Sonntag',
      dauer: '60 Minuten',
      teilnehmer: 8,
      description: 'Ein sanfter Yoga-Kurs für maximale Entspannung.',
      equipment: 'Yogamatte, Decke (vor Ort verfügbar)',
      image: '/src/assets/pictures/Yoga.jpg'
    },
    {
      name: 'Family Fitness',
      trainer: 4,
      uhrzeit: '15:00 Uhr',
      wochentag: 'Sonntag',
      dauer: '50 Minuten',
      teilnehmer: 20,
      description: 'Ein spaßiger Fitnesskurs für die ganze Familie.',
      equipment: 'Keine Ausrüstung erforderlich',
      image: '/src/assets/pictures/Pilates.jpg',
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
        weekday: 'Tag 1',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Beinpresse',
        equipmentname: 'Beinpresse',
        set: '4',
        rep: '10',
        setup: 'Füße schulterbreit auf der Plattform platzieren.',
        execution: 'Die Plattform kontrolliert wegdrücken und langsam zurücklassen.',
        weekday: 'Tag 1',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Bulgarische Kniebeuge',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '10',
        setup: 'Einen Fuß auf eine Bank hinter dir legen, anderen Fuß nach vorne stellen.',
        execution: 'Langsam in die Knie gehen, Oberkörper aufrecht halten.',
        weekday: 'Tag 2',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Ausfallschritte',
        equipmentname: 'Kurzhanteln',
        set: '4',
        rep: '12',
        setup: 'Kurzhanteln in beiden Händen halten, aufrecht stehen.',
        execution: 'Einen großen Schritt nach vorne machen und das hintere Knie fast den Boden berühren lassen.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Glute Bridge',
        equipmentname: 'Langhantel',
        set: '3',
        rep: '15',
        setup: 'Langhantel auf der Hüfte platzieren, Rücken auf den Boden legen.',
        execution: 'Hüfte nach oben drücken, Po anspannen.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Hip Thrust',
        equipmentname: 'Langhantel',
        set: '4',
        rep: '10',
        setup: 'Schultern auf eine Bank legen, Langhantel auf der Hüfte platzieren.',
        execution: 'Hüfte nach oben drücken, Po anspannen.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Sumo-Kreuzheben',
        equipmentname: 'Langhantel',
        set: '4',
        rep: '8',
        setup: 'Füße weit auseinander, Langhantel vor dir auf dem Boden.',
        execution: 'Langhantel kontrolliert anheben, Rücken gerade halten.',
        weekday: 'Tag 4',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Step-Ups',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '12',
        setup: 'Eine stabile Box oder Bank verwenden, Kurzhanteln in beiden Händen halten.',
        execution: 'Mit einem Bein auf die Box steigen, kontrolliert zurück.',
        weekday: 'Tag 4',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Beinbeuger',
        equipmentname: 'Beinbeuger-Maschine',
        set: '4',
        rep: '10',
        setup: 'Füße unter die Polster der Maschine legen, Position einstellen.',
        execution: 'Füße langsam nach oben beugen, kontrolliert zurück.',
        weekday: 'Tag 5',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Beinstrecker',
        equipmentname: 'Beinstrecker-Maschine',
        set: '3',
        rep: '12',
        setup: 'Beine unter die Polster legen, Rücken anlehnen.',
        execution: 'Beine kontrolliert strecken und zurückführen.',
        weekday: 'Tag 5',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Sumo-Kniebeugen mit Kettlebell',
        equipmentname: 'Kettlebell',
        set: '4',
        rep: '12',
        setup: 'Füße weit auseinander, Kettlebell mit beiden Händen halten.',
        execution: 'Langsam in die Knie gehen, Rücken gerade halten.',
        weekday: 'Tag 2',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Goblet Squat',
        equipmentname: 'Kurzhantel',
        set: '3',
        rep: '12',
        setup: 'Kurzhantel vor der Brust halten, Füße schulterbreit aufstellen.',
        execution: 'Langsam in die Knie gehen und wieder hochdrücken.',
        weekday: 'Tag 7',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Wadenheben',
        equipmentname: 'Langhantel',
        set: '3',
        rep: '15',
        setup: 'Langhantel auf Schulterhöhe platzieren, aufrecht stehen.',
        execution: 'Auf die Zehenspitzen gehen, kontrolliert absenken.',
        weekday: 'Tag 7',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Seitliche Ausfallschritte',
        equipmentname: 'Kurzhanteln',
        set: '4',
        rep: '10',
        setup: 'Kurzhanteln in beiden Händen halten, breit stehen.',
        execution: 'Einen Schritt zur Seite machen und das Knie beugen.',
        weekday: 'Tag 7',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Nordic Hamstring Curl',
        equipmentname: 'Kniepolster oder Gym-Matte',
        set: '3',
        rep: '8',
        setup: 'Knien auf einer weichen Unterlage, Füße unter einer stabilen Halterung fixieren.',
        execution: 'Oberkörper langsam nach vorne senken, dabei die Oberschenkelmuskulatur kontrollieren, und dann zurückziehen.',
        weekday: 'Tag 5',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Kettlebell Swings',
        equipmentname: 'Kettlebell',
        set: '4',
        rep: '15',
        setup: 'Kettlebell mit beiden Händen greifen, Füße schulterbreit aufstellen.',
        execution: 'Die Kettlebell zwischen die Beine schwingen und explosiv nach vorne bringen, Hüfte einsetzen.',
        weekday: 'Tag 4',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Wall Sit',
        equipmentname: 'Kein Equipment',
        set: '3',
        rep: '60',
        setup: 'Mit dem Rücken an eine Wand lehnen, Beine im 90-Grad-Winkel.',
        execution: 'Position halten, ohne den Rücken von der Wand zu lösen.',
        weekday: 'Tag 2',
        goal: 'Muskelaufbau Unterkörper'
      },
      {
        exercisename: 'Einbeinige Deadlifts',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '10',
        setup: 'Kurzhanteln in beiden Händen halten, auf einem Bein stehen.',
        execution: 'Oberkörper nach vorne senken, das freie Bein nach hinten strecken, dann zurück zur Ausgangsposition.',
        weekday: 'Tag 1',
        goal: 'Muskelaufbau Unterkörper'
      },

      {
        exercisename: 'Bankdrücken mit Langhantel',
        equipmentname: 'Langhantel',
        set: '4',
        rep: '10',
        setup: 'Auf der Bank liegen, Füße fest auf dem Boden, Langhantel auf Brusthöhe halten.',
        execution: 'Langhantel kontrolliert zur Brust absenken, dann explosiv nach oben drücken.',
        weekday: 'Tag 1',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Kurzhantel-Fliegende',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '12',
        setup: 'Auf der Bank liegen, Kurzhanteln in neutralem Griff über der Brust halten.',
        execution: 'Arme kontrolliert zur Seite öffnen, dann zurück zur Ausgangsposition bringen.',
        weekday: 'Tag 1',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Trizepsdrücken am Kabelzug',
        equipmentname: 'Kabelzug',
        set: '4',
        rep: '12',
        setup: 'Gerader Griff am Kabelzug, Ellenbogen nah am Körper halten.',
        execution: 'Griff nach unten drücken, bis die Arme gestreckt sind, dann langsam zurückführen.',
        weekday: 'Tag 1',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Dips an Parallelbarren',
        equipmentname: 'Körpergewicht',
        set: '3',
        rep: '8',
        setup: 'An Parallelbarren hochdrücken, Beine angewinkelt oder gestreckt.',
        execution: 'Langsam absenken, bis die Oberarme parallel zum Boden sind, dann hochdrücken.',
        weekday: 'Tag 1',
        goal: 'Muskelaufbau Oberkörper'
      },

      {
        exercisename: 'Klimmzüge',
        equipmentname: 'Klimmzugstange',
        set: '4',
        rep: '8',
        setup: 'Im Obergriff an der Stange hängen, Schulterbreiter Griff.',
        execution: 'Kontrolliert hochziehen, bis das Kinn über der Stange ist, dann langsam ablassen.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Rudern mit Langhantel',
        equipmentname: 'Langhantel',
        set: '4',
        rep: '10',
        setup: 'Langhantel im Obergriff halten, Rücken gerade, Knie leicht gebeugt.',
        execution: 'Langhantel Richtung Bauch ziehen, Schulterblätter zusammenziehen, dann langsam ablassen.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Latzug zur Brust',
        equipmentname: 'Kabelzug',
        set: '4',
        rep: '12',
        setup: 'Breiter Griff am Kabelzug, gerade sitzen, Brust raus.',
        execution: 'Stange zur Brust ziehen, Schulterblätter zusammenführen, dann kontrolliert zurück.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Bizepscurls mit Kurzhanteln',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '12',
        setup: 'Kurzhanteln im Untergriff halten, Arme nah am Körper.',
        execution: 'Kurzhanteln beugen, ohne die Ellenbogen zu bewegen, dann langsam absenken.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Schulterdrücken mit Kurzhanteln',
        equipmentname: 'Kurzhanteln',
        set: '4',
        rep: '10',
        setup: 'Aufrechter Sitz, Kurzhanteln auf Schulterhöhe halten.',
        execution: 'Kurzhanteln über den Kopf drücken, dann langsam zurück zur Startposition.',
        weekday: 'Tag 5',
        goal: 'Muskelaufbau Oberkörper'
      },

      {
        exercisename: 'Hammer Curls',
        equipmentname: 'Kurzhanteln',
        set: '4',
        rep: '12',
        setup: 'Kurzhanteln im neutralen Griff (Handflächen zueinander) halten.',
        execution: 'Kurzhanteln beugen, ohne die Ellenbogen zu bewegen, dann langsam absenken.',
        weekday: 'Tag 5',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Trizepsdrücken über Kopf',
        equipmentname: 'Kurzhantel',
        set: '4',
        rep: '12',
        setup: 'Eine Kurzhantel mit beiden Händen über den Kopf halten, Ellenbogen nach oben.',
        execution: 'Kurzhantel hinter den Kopf absenken, dann wieder nach oben drücken.',
        weekday: 'Tag 5',
        goal: 'Muskelaufbau Oberkörper'
      },

      {
        exercisename: 'Klimmzüge',
        equipmentname: 'Klimmzugstange',
        set: '4',
        rep: '8',
        setup: 'Im Obergriff an der Stange hängen, Schulterbreiter Griff.',
        execution: 'Kontrolliert hochziehen, bis das Kinn über der Stange ist, dann langsam ablassen.',
        weekday: 'Tag 4',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Rudern mit Langhantel',
        equipmentname: 'Langhantel',
        set: '4',
        rep: '10',
        setup: 'Langhantel im Obergriff halten, Rücken gerade, Knie leicht gebeugt.',
        execution: 'Langhantel Richtung Bauch ziehen, Schulterblätter zusammenziehen, dann langsam ablassen.',
        weekday: 'Tag 4',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Latzug zur Brust',
        equipmentname: 'Kabelzug',
        set: '4',
        rep: '12',
        setup: 'Breiter Griff am Kabelzug, gerade sitzen, Brust raus.',
        execution: 'Stange zur Brust ziehen, Schulterblätter zusammenführen, dann kontrolliert zurück.',
        weekday: 'Tag 4',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Bizepscurls mit Kurzhanteln',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '12',
        setup: 'Kurzhanteln im Untergriff halten, Arme nah am Körper.',
        execution: 'Kurzhanteln beugen, ohne die Ellenbogen zu bewegen, dann langsam absenken.',
        weekday: 'Tag 4',
        goal: 'Muskelaufbau Oberkörper'
      },

      {
        exercisename: 'Schrägbankdrücken mit Kurzhanteln',
        equipmentname: 'Kurzhanteln',
        set: '4',
        rep: '10',
        setup: 'Schrägbank auf etwa 30° einstellen, Kurzhanteln auf Schulterhöhe halten.',
        execution: 'Kurzhanteln kontrolliert nach oben drücken, dann langsam absenken.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Überzüge mit Kurzhantel',
        equipmentname: 'Kurzhantel',
        set: '3',
        rep: '12',
        setup: 'Auf der Bank liegen, eine Kurzhantel mit beiden Händen über der Brust halten.',
        execution: 'Kurzhantel hinter den Kopf absenken, dann wieder zur Brust zurückführen.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Trizeps Kickbacks',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '15',
        setup: 'Oberkörper leicht nach vorne neigen, Kurzhanteln in den Händen, Ellenbogen nah am Körper.',
        execution: 'Unterarme nach hinten strecken, bis die Arme gestreckt sind, dann langsam zurück.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Konzentrationscurls',
        equipmentname: 'Kurzhantel',
        set: '3',
        rep: '12',
        setup: 'Auf der Bank sitzen, Kurzhantel in einer Hand, Ellenbogen auf dem Oberschenkel abstützen.',
        execution: 'Hantel kontrolliert anheben, dann langsam absenken.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Schrägbankdrücken mit Kurzhanteln',
        equipmentname: 'Kurzhanteln',
        set: '4',
        rep: '10-12',
        setup: 'Schrägbank auf etwa 30° einstellen, Kurzhanteln auf Schulterhöhe halten.',
        execution: 'Kurzhanteln kontrolliert nach oben drücken, dann langsam absenken.',
        weekday: 'Tag 2',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Überzüge mit Kurzhantel',
        equipmentname: 'Kurzhantel',
        set: '3',
        rep: '12',
        setup: 'Auf der Bank liegen, eine Kurzhantel mit beiden Händen über der Brust halten.',
        execution: 'Kurzhantel hinter den Kopf absenken, dann wieder zur Brust zurückführen.',
        weekday: 'Tag 2',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Trizeps Kickbacks',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '15',
        setup: 'Oberkörper leicht nach vorne neigen, Kurzhanteln in den Händen, Ellenbogen nah am Körper.',
        execution: 'Unterarme nach hinten strecken, bis die Arme gestreckt sind, dann langsam zurück.',
        weekday: 'Tag 2',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Konzentrationscurls',
        equipmentname: 'Kurzhantel',
        set: '3',
        rep: '12-15',
        setup: 'Auf der Bank sitzen, Kurzhantel in einer Hand, Ellenbogen auf dem Oberschenkel abstützen.',
        execution: 'Hantel kontrolliert anheben, dann langsam absenken.',
        weekday: 'Tag 2',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Face Pulls am Kabelzug',
        equipmentname: 'Kabelzug mit Seilgriff',
        set: '4',
        rep: '12-15',
        setup: 'Seilgriff auf Schulterhöhe einstellen, neutraler Stand.',
        execution: 'Seil kontrolliert zum Gesicht ziehen, Ellenbogen nach außen, Schulterblätter zusammenführen.',
        weekday: 'Tag 7',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Aufrechtes Rudern mit Langhantel',
        equipmentname: 'Langhantel',
        set: '3',
        rep: '10-12',
        setup: 'Langhantel im Obergriff vor dem Körper halten, Hände schulterbreit.',
        execution: 'Langhantel nach oben ziehen, Ellenbogen zeigen nach außen, dann langsam absenken.',
        weekday: 'Tag 7',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Einarmiges Rudern mit Kurzhantel',
        equipmentname: 'Kurzhantel',
        set: '4',
        rep: '10-12',
        setup: 'Ein Knie und eine Hand auf der Bank abstützen, Kurzhantel in der anderen Hand.',
        execution: 'Kurzhantel kontrolliert zum Körper ziehen, Schulterblätter zusammenführen, dann langsam ablassen.',
        weekday: 'Tag 7',
        goal: 'Muskelaufbau Oberkörper'
      },
      {
        exercisename: 'Arnold Press',
        equipmentname: 'Kurzhanteln',
        set: '4',
        rep: '12',
        setup: 'Sitzen oder stehen, Kurzhanteln vor der Brust halten, Handflächen zeigen nach innen.',
        execution: 'Kurzhanteln nach oben drücken, während die Handflächen nach außen drehen, dann zurückführen.',
        weekday: 'Tag 7',
        goal: 'Muskelaufbau Oberkörper'
      },

      {
        exercisename: 'Burpees',
        equipmentname: 'Kein Equipment',
        set: '4',
        rep: '15',
        setup: 'Aufrecht stehen, Hände auf den Boden, in die Liegestützposition springen.',
        execution: 'Liegestütz, zurückspringen und einen Strecksprung machen.',
        weekday: 'Tag 1',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Kettlebell Swings',
        equipmentname: 'Kettlebell',
        set: '4',
        rep: '20',
        setup: 'Füße schulterbreit, Kettlebell mit beiden Händen halten.',
        execution: 'Kettlebell zwischen die Beine schwingen, dann explosiv nach vorne bringen.',
        weekday: 'Tag 1',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Seilspringen',
        equipmentname: 'Springseil',
        set: '4',
        rep: '60',
        setup: 'Springseil auf Körpergröße einstellen, mit beiden Händen die Griffe halten.',
        execution: 'Springen, während die Arme das Seil gleichmäßig rotieren lassen.',
        weekday: 'Tag 1',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Bankdrücken mit Kurzhanteln',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '12',
        setup: 'Auf der Flachbank liegen, Kurzhanteln auf Brusthöhe halten.',
        execution: 'Kurzhanteln kontrolliert nach oben drücken, dann langsam absenken.',
        weekday: 'Tag 1',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Kniebeugen mit Langhantel',
        equipmentname: 'Langhantel',
        set: '4',
        rep: '10',
        setup: 'Langhantel auf Schulterhöhe, Füße schulterbreit auseinander.',
        execution: 'In die Knie gehen, bis die Oberschenkel parallel zum Boden sind, dann aufrichten.',
        weekday: 'Tag 1',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Rudern mit Langhantel',
        equipmentname: 'Langhantel',
        set: '4',
        rep: '10',
        setup: 'Langhantel im Obergriff vor dem Körper halten, Oberkörper leicht nach vorne beugen.',
        execution: 'Langhantel kontrolliert zum Bauch ziehen, dann langsam ablassen.',
        weekday: 'Tag 1',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Mountain Climbers',
        equipmentname: 'Kein Equipment',
        set: '4',
        rep: '40',
        setup: 'Liegestützposition einnehmen, Hände schulterbreit auf dem Boden.',
        execution: 'Abwechselnd Knie dynamisch zur Brust ziehen, ohne die Hüfte zu heben.',
        weekday: 'Tag 2',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Rudern am Ergometer',
        equipmentname: 'Rudergerät',
        set: '4',
        rep: '500',
        setup: 'Auf dem Ergometer sitzen, Füße fest angeschnallt.',
        execution: 'Kontrolliert und gleichmäßig rudern, Hüftbewegung koordinieren.',
        weekday: 'Tag 2',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Battle Ropes',
        equipmentname: 'Battle Ropes',
        set: '4',
        rep: '30',
        setup: 'Beide Enden der Battle Ropes in den Händen halten, in die Knie gehen.',
        execution: 'Seile abwechselnd schnell auf und ab bewegen.',
        weekday: 'Tag 2',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Frontheben mit Kurzhanteln',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '12',
        setup: 'Kurzhanteln in beiden Händen, Arme vor dem Körper.',
        execution: 'Kurzhanteln auf Schulterhöhe anheben, dann kontrolliert absenken.',
        weekday: 'Tag 2',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Lunges mit Kurzhanteln',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '10',
        setup: 'Kurzhanteln in beiden Händen, aufrecht stehen.',
        execution: 'Einen großen Schritt nach vorne machen, Knie beugen, bis der hintere Oberschenkel fast den Boden berührt.',
        weekday: 'Tag 2',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Klimmzüge',
        equipmentname: 'Klimmzugstange',
        set: '4',
        rep: '12',
        setup: 'An der Klimmzugstange hängen, Hände schulterbreit im Obergriff.',
        execution: 'Kontrolliert hochziehen, Kinn über die Stange, dann langsam absenken.',
        weekday: 'Tag 2',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'High Knees',
        equipmentname: 'Kein Equipment',
        set: '4',
        rep: '40',
        setup: 'Aufrecht stehen, Hände auf Hüfthöhe vor dem Körper.',
        execution: 'Knie abwechselnd so hoch wie möglich anheben, Tempo beibehalten.',
        weekday: 'Tag 3',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Jumping Jacks',
        equipmentname: 'Kein Equipment',
        set: '4',
        rep: '50',
        setup: 'Aufrecht stehen, Arme an der Seite, Füße zusammen.',
        execution: 'Arme über den Kopf führen und Beine seitlich öffnen, dann zurück.',
        weekday: 'Tag 3',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Box Jumps',
        equipmentname: 'Box',
        set: '4',
        rep: '12',
        setup: 'Vor einer stabilen Box stehen, Füße schulterbreit.',
        execution: 'Explosiv auf die Box springen, kontrolliert wieder absteigen.',
        weekday: 'Tag 3',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Schulterdrücken mit Kurzhanteln',
        equipmentname: 'Kurzhanteln',
        set: '4',
        rep: '12',
        setup: 'Kurzhanteln auf Schulterhöhe halten, Handflächen nach vorne.',
        execution: 'Kurzhanteln nach oben drücken, bis die Arme gestreckt sind, dann langsam absenken.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Kettlebell Goblet Squats',
        equipmentname: 'Kettlebell',
        set: '4',
        rep: '12',
        setup: 'Kettlebell mit beiden Händen vor der Brust halten, Füße schulterbreit.',
        execution: 'Langsam in die Knie gehen, dann kontrolliert wieder aufrichten.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Rudern mit Langhantel',
        equipmentname: 'Langhantel',
        set: '4',
        rep: '10',
        setup: 'Langhantel im Obergriff vor dem Körper halten, Oberkörper leicht nach vorne beugen.',
        execution: 'Langhantel kontrolliert zum Bauch ziehen, dann langsam ablassen.',
        weekday: 'Tag 3',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Sprintintervalle',
        equipmentname: 'Laufband oder Freiluft',
        set: '6',
        rep: '30',
        setup: '30 Sekunden Sprint, gefolgt von 90 Sekunden lockerem Joggen.',
        execution: 'Schnell laufen, dabei gleichmäßige Atmung und Haltung beibehalten.',
        weekday: 'Tag 4',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Skater Sprünge',
        equipmentname: 'Kein Equipment',
        set: '4',
        rep: '20',
        setup: 'Seitlich stehen, Gewicht auf ein Bein verlagern.',
        execution: 'Seitlich abspringen, das andere Bein nach hinten schwingen, abwechselnd.',
        weekday: 'Tag 4',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Farmer’s Walk',
        equipmentname: 'Kurzhanteln oder Kettlebells',
        set: '4',
        rep: '20',
        setup: 'Kurzhanteln in beiden Händen, Arme an der Seite, Brust aufrecht.',
        execution: '20 Schritte gehen, dabei das Gewicht stabil halten.',
        weekday: 'Tag 4',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Kreuzheben mit Langhantel',
        equipmentname: 'Langhantel',
        set: '4',
        rep: '12',
        setup: 'Langhantel auf dem Boden, Füße schulterbreit, Rücken gerade.',
        execution: 'Langhantel langsam anheben, Hüfte nach vorne bringen, dann absenken.',
        weekday: 'Tag 4',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Bankdrücken mit Langhantel',
        equipmentname: 'Langhantel',
        set: '3',
        rep: '10',
        setup: 'Auf der Bank liegen, Langhantel auf Brusthöhe halten.',
        execution: 'Langhantel kontrolliert nach oben drücken, dann langsam absenken.',
        weekday: 'Tag 4',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Plank mit Gewicht',
        equipmentname: 'Scheibengewicht',
        set: '4',
        rep: '30',
        setup: 'Plankposition einnehmen, Gewicht auf dem unteren Rücken platzieren.',
        execution: 'Position halten, ohne die Hüfte abzusenken.',
        weekday: 'Tag 4',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Rope Skipping Double Unders',
        equipmentname: 'Springseil',
        set: '5',
        rep: '50',
        setup: 'Springseil in beiden Händen, normale Sprungtechnik.',
        execution: 'Das Seil bei jedem Sprung zweimal unter den Füßen durchziehen.',
        weekday: 'Tag 5',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Bergsteiger-Sprints (Mountain Climbers)',
        equipmentname: 'Kein Equipment',
        set: '4',
        rep: '60',
        setup: 'Liegestützposition einnehmen.',
        execution: 'Knie abwechselnd explosiv nach vorne ziehen, Geschwindigkeit erhöhen.',
        weekday: 'Tag 5',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Dumbbell Thrusters',
        equipmentname: 'Kurzhanteln',
        set: '3',
        rep: '15',
        setup: 'Kurzhanteln auf Schulterhöhe halten, Füße schulterbreit.',
        execution: 'In die Knie gehen und beim Hochkommen die Kurzhanteln explosiv über den Kopf drücken.',
        weekday: 'Tag 5',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Klimmzüge im Untergriff',
        equipmentname: 'Klimmzugstange',
        set: '4',
        rep: '10',
        setup: 'Klimmzugstange mit den Handflächen zum Körper greifen.',
        execution: 'Körper hochziehen, bis das Kinn über der Stange ist, dann absenken.',
        weekday: 'Tag 5',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Frontkniebeugen mit Langhantel',
        equipmentname: 'Langhantel',
        set: '4',
        rep: '10',
        setup: 'Langhantel auf den Schultern vor der Brust halten, Füße schulterbreit.',
        execution: 'In die Knie gehen, dann kontrolliert wieder hochkommen.',
        weekday: 'Tag 5',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Schrägbankdrücken mit Kurzhanteln',
        equipmentname: 'Kurzhanteln',
        set: '4',
        rep: '12',
        setup: 'Schräge Bank, Kurzhanteln auf Brusthöhe halten.',
        execution: 'Kurzhanteln nach oben drücken, dann kontrolliert absenken.',
        weekday: 'Tag 5',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Bear Crawls',
        equipmentname: 'Kein Equipment',
        set: '4',
        rep: '20',
        setup: 'Auf Hände und Füße gehen, Knie knapp über dem Boden.',
        execution: 'Vorwärts krabbeln, dabei Körper stabil halten.',
        weekday: 'Tag 7',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Box Jumps',
        equipmentname: 'Box',
        set: '3',
        rep: '15',
        setup: 'Vor einer stabilen Box stehen.',
        execution: 'Explosiv auf die Box springen, dann kontrolliert absteigen.',
        weekday: 'Tag 7',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Seilspringen mit Tempo-Wechsel',
        equipmentname: 'Springseil',
        set: '5',
        rep: '60',
        setup: 'Normale Springseilhaltung.',
        execution: '30 Sekunden schnelles Springen, 30 Sekunden moderates Tempo.',
        weekday: 'Tag 7',
        goal: 'Ausdauerverbesserung'
      },
      {
        exercisename: 'Deadlifts mit Kettlebell',
        equipmentname: 'Kettlebell',
        set: '4',
        rep: '12',
        setup: 'Kettlebell zwischen den Beinen aufstellen, Füße schulterbreit.',
        execution: 'Kettlebell langsam anheben, Hüfte nach vorne bringen, dann absenken.',
        weekday: 'Tag 7',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Dips an Parallelbarren',
        equipmentname: 'Parallelbarren',
        set: '3',
        rep: '10',
        setup: 'Mit beiden Händen an den Barren stützen.',
        execution: 'Körper langsam absenken, bis die Oberarme parallel zum Boden sind, dann hochdrücken.',
        weekday: 'Tag 7',
        goal: 'Muskelaufbau Ganzkörper'
      },
      {
        exercisename: 'Schulterheben mit Kurzhanteln',
        equipmentname: 'Kurzhanteln',
        set: '4',
        rep: '15',
        setup: 'Kurzhanteln an den Seiten halten, aufrecht stehen.',
        execution: 'Schultern langsam bis zu den Ohren anheben, dann kontrolliert absenken.',
        weekday: 'Tag 7',
        goal: 'Muskelaufbau Ganzkörper'
      }










    ]);
}
