module.exports = {

  attributes: {

    firstName: {type: 'string', required: true},
    lastName: {type: 'string', required: true},
    email: {type: 'string', required: true, unique: true, isEmail: true},
    password: { type: 'string', required:true},
    phoneNumber: {type: 'string'},
    isSuperAdmin: {type: 'boolean', required: true},
    // Ein Trainer kann mehrere Kurse haben
  }
};
