module.exports = {

    attributes: {
  
      exercisename: {type: 'string', columnType: 'varchar(80)', required: true},
      equipmentname: {type: 'string', columnType: 'varChar(10)', required: true},
      set: {type: 'string', columnType: 'varchar(80)', required: true},
      rep: {type: 'string', columnType: 'varchar(80)', required: true},
      setup: {type: 'string', columnType: 'varchar(300)', required: true},
      execution:{type: 'string', columnType: 'varchar(300)', required: true},
      weekday:{type: 'string',columnType: 'varchar(80)', required: true}
    },
  };
  