module.exports = {
  login: async function (req, res) {
    let params = req.body;
    let trainer = await Trainer.findOne({
      email: params.email,
    });
    // If there was no matching user, respond thru the "badCombo" exit.
    if (!trainer) {
      throw 'badCombo';
    }
    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords
      .checkPassword(params.password, trainer.password)
      .intercept('incorrect', 'badCombo');
    // Modify the active session instance.
    req.session.trainerId = trainer.id;
    req.session.trainer = trainer;
    return res.json(trainer);
  },
  logout: async function (req, res) {
    req.session.destroy(function(err) {
      if (err) {
        return res.serverError(err);
      }
      res.clearCookie('sails.sid');
      return res.ok();
    });
  },
  loginmitglied: async function (req, res) {
    let params = req.body;
    let mitglied = await Mitglied.findOne({
      email: params.email,
    });
    // If there was no matching user, respond thru the "badCombo" exit.
    if (!mitglied) {
      throw 'badCombo';
    }
    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords
      .checkPassword(params.password, mitglied.password)
      .intercept('incorrect', 'badCombo');
    // Modify the active session instance.
    req.session.mitgliedId = mitglied.id;
    req.session.mitglied = mitglied;
    return res.json(mitglied);
  },
  loginrezeptionist: async function (req, res){
    let params = req.body;
    let rezeptionist = await Rezeptionist.findOne({
      email: params.email,
    });
    // If there was no matching user, respond thru the "badCombo" exit.
    if (!rezeptionist) {
      throw 'badCombo';
    }
    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords
      .checkPassword(params.password, rezeptionist.password)
      .intercept('incorrect', 'badCombo');
    // Modify the active session instance.
    req.session.rezeptionistId = rezeptionist.id;
    req.session.rezeptionist = rezeptionist;
    return res.json(rezeptionist);
  },
  register: async function (req, res) {
    let params = req.body;
    let newEmail = params.email.toLowerCase();

    let mitglied = await Mitglied.create(
        {  firstName: params.firstName, lastName: params.lastName, dob: params.dob, email: newEmail, password: await sails.helpers.passwords.hashPassword(params.password), street: params.street, houseNumber: params.houseNumber, postalCode: params.postalCode, city: params.city,  isSuperAdmin:false,
         
         }).intercept('E_UNIQUE', 'emailAlreadyInUse')
         .intercept({firstName: 'UsageError'}, 'invalid')
         .fetch();;

    // Store the user's new id in their session.
    req.session.mitgliedId = mitglied.id;
    req.session.mitglied = mitglied;
    return res.json(mitglied);
  },

  

  // ,
  // register: async function (req, res) {
  //   let params = req.body;
  //   let newEmailAddress = params.emailAddress.toLowerCase();
  //   let user = await User.create(
  //     { emailAddress: newEmailAddress, fullName: params.fullName,
  //       isSuperAdmin:false,
  //       password: await sails.helpers.passwords.hashPassword(params.password),
  //     }).intercept('E_UNIQUE', 'emailAlreadyInUse')
  //     .intercept({name: 'UsageError'}, 'invalid')
  //     .fetch();
  //   // Store the user's new id in their session.
  //   req.session.userId = user.id;
  //   req.session.user = user;
  //   return res.json(user);
  // }
};
