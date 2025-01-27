module.exports.cron = {
  dailyCourseCheck: {
    schedule: '0 23 * * * *',
    timezone: 'Europe/Berlin',
    onTick: async function() {
      try {
        const kurse = await Kurs.find();

        const tage = ['Sonntag','Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
        const heute = tage[new Date().getDay()];

        const relevanteKurse = kurse.filter(kurse => {
          return kurse.wochentag === heute;
        });

        const kursIds = relevanteKurse
          .map(kurse => kurse.id)
          .filter(id => id !== undefined);

        await Buchung.destroy({
          where: {
            kurs: { in: kursIds }
          }
        });

      } catch (error) {
        console.error('Fehler beim Kurs-Check:', error);
      }
    }
  }
};
