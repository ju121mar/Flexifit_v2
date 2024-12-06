module.exports = {

    attributes: {
  
      name: { type: 'string', columnType: 'varchar(80)', required: true },
      trainer: { type: 'string', columnType: 'varchar(80)', required: true},
      uhrzeit: {type: 'string', columnType: 'varChar(10)', required: true},
      wochentag: { type: 'string', columnType: 'varchar(80)', required: true},
      dauer: { type: 'string', columnType: 'varchar(80)', required: true},
      teilnehmer: { type: 'string', columnType: 'varchar(80)', required: true},
      description: {type: 'string', columnType: 'varchar(300)', required: true},
    },
}