const ExerciseBottom = require("../models/ExerciseBottom");

module.exports = {

    find: async function (req, res) {
        try {
          const exercisesBottom = await ExerciseBottom.find();
          return res.json(exercisesBottom);
        } catch (error) {
          return res.status(500).json({ error: 'Fehler beim Abrufen der Übungen.' });
        }
      },
      
    findOne: async function(req, res) {
    const exerciseBottomId = req.params.id;
      try {
        const exerciseBottom = await ExerciseBottom.findOne({ id: exerciseBottomId });
        return res.json(exerciseBottom);
      } catch (err) {
        return res.serverError(err);
      }
    },
  };