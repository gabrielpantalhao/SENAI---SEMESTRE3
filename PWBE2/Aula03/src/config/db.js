const mysql2 = require("mysql2/promise")

// Conexão com o Banco de dados _____________________________________________________________________________________
async function connect () {
    if (global.conection && global.conection.state != 'disconnected'){
        return global.conection;
    };
    const mysql2 = require("mysql2/promise");
    const con = await mysql2.createConnection({
        host: 'localhost',
        port: '3306',
        database: 'db_clientes',
        user: 'root',
        password: '1234'
    });
    console.log("Conectou no SQL!")
    global.connection = con;
    return con;
};

module.exports = {connect}
