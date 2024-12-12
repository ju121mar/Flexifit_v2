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
    const trainerId = req.params.id;
    try{
      const trainer = await Trainer.findOne({where:{id: trainerId}});
      return res.json(trainer);
    }catch (err){
      return res.serverError(err);
    }
  }
};
