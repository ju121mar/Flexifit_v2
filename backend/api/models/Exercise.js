module.exports = {

    attributes: {
  
      exercisename: {type: 'string', columnType: 'varchar(80)', required: true},
      equipmentname: {type: 'string', columnType: 'varChar(80)', required: true},
      set: {type: 'string', columnType: 'varchar(80)', required: true},
      rep: {type: 'string', columnType: 'varchar(80)', required: true},
      setup: {type: 'string', columnType: 'varchar(300)', required: true},
      execution:{type: 'string', columnType: 'varchar(300)', required: true},
      weekday:{
        type: 'string',
        columnType: 'varchar(80)',
        required: true,
        isIn: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7']
      },
      goal:{type: 'string', columnType: 'varchar(200)', required: true,
        isIn: ['Muskelaufbau Ganzkörper', 'Muskelaufbau Unterkörper', 'Muskelaufbau Oberkörper', 'Ausdauerverbesserung'  ]
      }
    },
  };
  
  