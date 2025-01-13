module.exports = {

    create: async function (req, res) {
      sails.log.debug("Send message....");
      let params = req.allParams();
      await Message.create(params);
      res.ok();
    },
}