module.exports = {

    find: async function (req, res) {
        try {
          const exercises = await Exercise.find();
          return res.json(exercises);
        } catch (error) {
          return res.status(500).json({ error: 'Fehler beim Abrufen der Übungen.' });
        }
      },
      
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