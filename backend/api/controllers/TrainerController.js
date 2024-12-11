module.exports = {

  find: async function (req, res) {
    try {
      const trainer = await Trainer.find();
      return res.json(trainer);
    } catch (err) {
      return res.serverError(err);
    }
  },

  findOne: async function (req, res){
    const trainerId = rew.params.id;
    try{
      const trainer = await Trainer.findOne({id: trainerId});
      return res.json(trainer);
    }catch (err){
      return res.serverError(err);
    }
  }
};
