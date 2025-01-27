module.exports = {
  booking: async function(req, res){
    if (!req.session || !req.session.mitgliedId){
      return res.sendStatus(401);
    }
    const mitglied = req.session.mitglied;
    await Buchung.create({
      mitglied: mitglied.id,
      kurs: req.allParams().kurs
    });

    return res.ok();
  },

  getBookings: async function (req, res){
    if (!req.session || !req.session.mitgliedId){
      return res.sendStatus(401);
    }
    const mitglied = req.session.mitglied;
    const mitgliedBooking = await Buchung.find({mitglied: mitglied.id})
      .populate('kurs')
      .then(async (bookings) => {
        for (let booking of bookings) {
          booking.kurs = await Kurs.findOne({id: booking.kurs.id}).populate('trainer');
        }
        return bookings;
      });
    return res.json(mitgliedBooking);
  },
  getBookingsandMitglied: async function (req, res){
    if (!req.session || !req.session.rezeptionistId ) {
      return res.sendStatus(401);
    }
    const kursId = req.params.id;
    const kursBooking = await Buchung.find({kurs: kursId})
      .populate('kurs')
      .populate('mitglied');
    const aktTeilnehmer = await Buchung.count({
      kurs: kursId,
      status: 'Bestätigt'
    });
    return res.json({kurse: kursBooking,
    aktTeilnehmer: aktTeilnehmer});
  },

  updateBooking: async function (req, res){
    if (!req.session || !req.session.rezeptionistId ) {
      return res.sendStatus(401);
    }
    const status = req.body.buchungstatus;
    const buchungId = req.body.buchungId;
    await Buchung.updateOne({ id: buchungId}).set({status});
    return res.ok();

  },

};
