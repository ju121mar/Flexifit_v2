module.exports = {

  attributes: {

    firstName: {type: 'string', required: true},
    lastName: {type: 'string', required: true},
    email: {type: 'string', required: true, unique: true, isEmail: true},
    phoneNumber: {type: 'string'},
    // Ein Trainer kann mehrere Kurse haben
    courses: {collection: 'kurs', via: 'trainer'}
  }
}
