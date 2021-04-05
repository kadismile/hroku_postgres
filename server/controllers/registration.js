const Registration = require('../models').Registration;

module.exports = {
  async create(req, res) {
    try {
      const reg = await Registration.create(req.body)
      return res.status(201).send(reg)
    } catch (e) {
      res.status(400).send(e)
    }
  },

  async list(req, res) {
    try {
      const reg = await Registration.findAll(req.body)
      return res.status(201).send(reg)
    } catch (e) {
      res.status(400).send(e)
    }
  },
};

