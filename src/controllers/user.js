const user = require("../models/user");
const bcrypt = require('bcrypt');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');
module.exports = {
    validateIdentification: (req, res) => {
        user.validate_identification(req.con, req.body.identification, (err, result) => {
            if (err) {
                return res.status(500).send({ response: 'Ha ocurrido un error: ' + err });
            }
            if (result.length == 0) {
                return res.status(500).send({ response: 'Usuario no encontrado' });
            }
            res.status(200).send({ response: result[0].identification });
        });
    },
    update: async(req, res) => {
        const { identification } = req.params;
        var keys = Object.keys(req.body);
        var values = Object.values(req.body);
        var query = `update users set `;
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] == 'password') {
                var new_pass = await bcrypt.hash(values[i], 10);
                values[i] = new_pass;
            }
            query += `${keys[i]}='${values[i]}',`;
        }
        query = query.substring(0, query.length - 1);

        query += ` where identification='${identification}'`;
        user.update(req.con, query, (err, result) => {
            if (err) {
                return res.status(500).send({ response: 'Ha ocurrido un error: ' + err });
            }
            res.status(200).send({ response: 'Datos actualizados con exito' });
        });
    },
    auth: async(req, res) => {
        const { email, password } = req.body;
        user.getByEmail(req.con, email, async(err, result) => {
            if (err) {
                return res.status(500).send({ response: 'Ha ocurrido un error en la autenticación: ' + err });
            }
            if (result.length == 0) {
                return res.status(500).send({ response: 'No se encontro un usuario con este correo: ' + email });
            }
            if (result[0].password == '-1') {
                return res.status(500).send({ response: 'Registrarse primero' });
            }
            var valuePassword = await bcrypt.compare(password, result[0].password);
            if (!valuePassword) {
                return res.status(500).send({ response: 'Contraseña incorrecta' });
            }
            delete result[0].password;
            return res.status(200).send({
                response: {
                    token: createAccessToken(result[0]),
                    refreshToken: createRefreshToken(result[0]),
                    user: result[0],
                },
            });
        });
    }
}