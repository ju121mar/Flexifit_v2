module.exports = {
    findOne: async function(req, res) {
    const exerciseId = req.params.id;
      try {
        const exercise = await Exercise.findOne({ id: exerciseId });
        return res.json(exercise);
      } catch (err) {
        return res.serverError(err);
      }
    },
  };