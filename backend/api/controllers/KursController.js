
module.exports = {

  create: async function (req, res) {
    if (!req.session || !req.session.trainerId || req.session.mitgliedId){
      return res.sendStatus(401);
    }
    sails.log.debug("Create course....");
    let params = req.allParams();
    await Kurs.create(params);
    res.ok();
  },

  find: async function (req, res) {
    try {
      const kurse = await Kurs.find().populate("trainer");
      sails.log.info(kurse);
      return res.json(kurse);
    } catch (err) {
      return res.serverError(err);
    }
  },

  findOne: async function (req, res) {
    const kursId = req.params.id;
    try {
      const kurs = await Kurs.findOne({ id: kursId }).populate("trainer");
      return res.json(kurs);
    } catch (err){
      return res.serverError(err);
    }
  },

  update: async function (req, res) {
    if (!req.session || !req.session.trainerId || req.session.mitgliedId){
      return res.sendStatus(401);
    }
    const kursId = req.params.id;
    const kurs = req.body;
    try {
      const UpdatedKurs = await Kurs.updateOne({ id: kursId }).set(kurs);
      return res.json(UpdatedKurs);
    } catch (err) {
      return res.serverError(err);
    }

  },

  delete: async function (req, res) {
    if (!req.session || !req.session.trainerId || req.session.mitgliedId){
      return res.sendStatus(401);
    }
    const kursId = req.params.id;
    try {
      const deletedKurs = await Kurs.destroyOne({ id: kursId });
      return res.json(deletedKurs);
    } catch (err) {
      return res.serverError(err);
    }
  },

};
