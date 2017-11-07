const express = require('express');
const router = express.Router();
const Model = require('../models/');
const User = Model.User

//require helper
const cekLogin = require('../helper/ceklogin')

router.get('/', cekLogin, function (req, res) {
  User.findAll()
  .then(users=>{
    res.render('user_all', {users: users})
  })
})

router.get('/add', cekLogin, function (req, res) {
  res.render('user_add')
})

router.post('/add', cekLogin, function (req, res) {
  let dataInsert = {
    username: req.body.username,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    status: req.body.status
  }
  
  User.create(dataInsert)
  .then(()=>{
    res.redirect('/users')
  }).catch(err=>{
    console.log(err);
  })
  
})

router.get('/edit/:id', cekLogin, function (req, res){
  User.findOne({where: {id: req.params.id}})
  .then(user=>{
    res.render('user_edit', {user:user})
  })
})

router.post('/edit/:id', cekLogin, function (req, res){
  // console.log(req.body);
  let dataInsert = {
    username: req.body.username,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    status: req.body.status
  }
  
  User.update(dataInsert, {where: {id: req.params.id}})
  .then(()=>{
    res.redirect('/users')
  }).catch(err=>{
    console.log(err);
  })
  
})

router.get('/delete/:id', cekLogin, function (req, res){
  User.destroy({where: {id: req.params.id}})
  .then(()=>{
    res.redirect('/users')
  })
})

module.exports = router;
