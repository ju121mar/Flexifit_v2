module.exports = {

    attributes: {

      firstName: {type: 'string', required: true},
      lastName: {type: 'string', required: true},
      email: {type: 'string', required: true, unique: true, isEmail: true},
      password: { type: 'string', required:true},
      street: {type: 'string', required: true},
      houseNumber: {type: 'string', required: true},
      postalCode: {type: 'string', required: true},
      city: {type: 'string', required: true},
      isSuperAdmin: {type: 'boolean', required: true}

    }
  }
