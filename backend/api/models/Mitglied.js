module.exports = {

    attributes: {

      firstName: {type: 'string', required: true},
      lastName: {type: 'string', required: true},
      email: {type: 'string', required: true, unique: true, isEmail: true},
      password: { type: 'string', required:true},
      street: {type: 'string', required: true},
      houseNumber: {type: 'int', required: true},
      postalCode: {type: 'int', required: true},
      city: {type: 'string', required: true},
      isSuperAdmin: {type: 'boolean', required: true}

    }
  }