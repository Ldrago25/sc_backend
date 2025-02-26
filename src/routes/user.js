var express = require('express');
const user = require('../controllers/user');

const app = express.Router();

app.post('/users/auth', user.auth);
app.post('/users/verifyIdentification', user.validateIdentification);
app.put('/users/updatePassword/:identification', user.update);

module.exports = app;