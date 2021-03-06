const express = require('express');
const router = express.Router();
const Model = require('../models/');

//require helper
const cekLogin = require('../helper/ceklogin')

router.get('/', cekLogin, (req, res) => {
  Model.Customer.findAll().then(dataCustomer => {
      let dataC = {
        title: 'Customer',
        rows: dataCustomer
      }
      res.render('customers', dataC)
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/add', cekLogin, (req, res) => {
  res.render('customers-add', {
    title: 'Customers Add'
  })
})

router.post('/add', cekLogin, (req, res) => {
  Model.Customer.create(req.body).then(dataCustomer => {
      res.redirect('/customers');
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/edit/:id', cekLogin, (req, res) => {
  Model.Customer.findById(req.params.id).then(dataCustomer => {
      let dataC = {
        title: 'Customers Edit',
        rows: dataCustomer
      }
      res.render('customers-edit', dataC)
    })
    .catch(err => {
      res.send(err)
    })
})

router.post('/edit/:id', cekLogin, (req, res) => {
  Model.Customer.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dataCustomer => {
      res.redirect('/customers')
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/delete/:id', cekLogin, (req, res) => {
  Model.Customer.destroy({
      where: {
        id: req.params.id
      }
    }).then(dataCustomer => {
      res.redirect('/customers')
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router;
