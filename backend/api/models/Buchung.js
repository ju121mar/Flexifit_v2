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

    status: {
      type: 'string',
      isIn: ['Bestätigung ausstehend', 'Bestätigt', 'Abgelehnt'],
      defaultsTo: 'Bestätigung ausstehend'
    },
  },
  // Indexdefinition für schnellere Abfragen
  indexes: [
    { attributes: { member: 1, course: 1 }, unique: true }
  ]
};
