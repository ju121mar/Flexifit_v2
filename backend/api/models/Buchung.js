module.exports = {
  attributes: {
    mitglied: {
      model: 'mitglied',
      required: true
    },
    kurs: {
      model: 'kurs',
      required: true
    },

    // // Zusätzliche Attribute für die Zuordnung
    // enrollmentDate: {
    //   type: 'ref',
    //   columnType: 'datetime',
    //   required: true
    // },

    // status: {
    //   type: 'string',
    //   isIn: ['aktiv', 'inaktiv', 'abgeschlossen'],
    //   defaultsTo: 'aktiv'
    // },
  },
  // Indexdefinition für schnellere Abfragen
  indexes: [
    { attributes: { member: 1, course: 1 }, unique: true }
  ]
};
