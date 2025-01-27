module.exports = {

  attributes: {

    name: {type: 'string', columnType: 'varchar(80)', required: true},
    uhrzeit: {type: 'string', columnType: 'varChar(10)', required: true},
    wochentag: {
      type: 'string',
      columnType: 'varchar(80)',
      required: true,
      isIn: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
    },
    dauer: {type: 'string', columnType: 'varchar(80)', required: true},
    aktTeilnehmer: {type: 'number', defaultsTo: 0},
    teilnehmer: {type: 'number', defaultsTo: 0},
    description: {type: 'string', columnType: 'varchar(300)', required: true},
    equipment:{type: 'string', columnType: 'varchar(300)', required: false, defaultsTo: "Keine Ausrüstung erforderlich"},
    image:{type: 'string', required: false},
    trainer: {model: 'trainer', required: true}
  },

}
