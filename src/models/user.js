module.exports = {
    getByEmail: (con, email, callback) => {
        con.query(`select * from users where email='${email}'`, callback);
    },
    validate_identification: (con, identification, callback) => {
        con.query(`select * from users where identification='${identification}'`, callback);
    },
    update: (con, query, callback) => {
        con.query(query, callback);
    }

}