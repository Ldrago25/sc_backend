var express = require('express');
const user = require('../controllers/user');
const multer = require("multer");

const app = express.Router();
const upload = multer({ dest: "uploads/" });
app.post('/users/auth', user.auth);
app.post('/users/verifyIdentification', user.validateIdentification);
app.put('/users/updatePassword/:identification', user.update);
app.post('/users/loadFile', upload.single('file'), user.loadFile);
module.exports = app;