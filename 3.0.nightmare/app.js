'use strict'

var Nightmare  = require('nightmare')
  , vo         = require('vo')
  , fs         = require('fs')
  , request    = require('request')
  , account    = require('./account.js')
  , username   = account.username
  , password   = account.password;

vo(run)(function(err, result) {
  if (err) throw err;
});

function *run() {
  let x = Date.now();

  console.log('Iniciando Electorn');
  let nightmare = Nightmare({ show: true });

  console.log("Esperando tela de login");
  yield nightmare
    .goto('https://runrun.it/pt-BR')
    .wait('.login a')
    .click('.login a')
    .wait('[name="user_session[email]"]');

  console.log(`Preenchendo dados de ${username}`);
  yield nightmare
    .evaluate(function(username, password){
      document.querySelector('[name="user_session[email]"]').value = username;
      document.querySelector('[name="user_session[password]"]').value = password;
    }, username, password)
    .wait(600)
    .click('.button-login')
    .wait(600);



  console.log('Iniciando a primeira tarefa')
  yield nightmare
    .wait('.enterprise-logo-img')
    .wait('.task-title.word-breaker')
    .click('.task-title.word-breaker .task-action')
    .wait('.task-play')
    .click('.task-play')
    .wait(500)

  console.log("done in " + (Date.now()-x) + "ms");
  yield nightmare.end();
}