module.exports = {
  login: async function (req, res) {
    let params = req.body;
    let trainer = await Trainer.findOne({
        email: params.email,
    });
    // If there was no matching user, respond thru the "badCombo" exit.
    if (!trainer) {
      throw "badCombo";
    }
    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords
      .checkPassword(params.password, trainer.password)
      .intercept("incorrect", "badCombo");
    // Modify the active session instance.
    req.session.trainerId = trainer.id;
    req.session.trainer = trainer;
    return res.json(trainer);
  }
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
