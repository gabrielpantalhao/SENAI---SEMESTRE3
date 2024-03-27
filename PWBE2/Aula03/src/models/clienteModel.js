const { connect } = require('../config/db');

const clienteModel = {
    selecionarTodosClientes: async () => {
        try {
            const conn = await connect();
            const [rows] = await conn.query('SELECT * FROM clientes;');
            return rows;
        } catch (error) {
            throw error;
        }
    },

    selecionarUmCliente: async (id) => {
        try {
            const conn = await connect();
            const sql = 'SELECT * FROM clientes WHERE id=?;';
            const values = id;
            const [rows] = await conn.query(sql, values);
            return rows;
        } catch (error) {
            throw error;
        }
    },

    insereClientes: async (cliente) => {
        try {
            const conn = await connect();
            const sql = 'INSERT INTO clientes (nome, idade) VALUES (?,?);';
            const values = [cliente.nome, cliente.idade];
            return await conn.query(sql, values);
        } catch (error) {
            throw error;
        }
    },

    atualizaClientes: async (id, cliente) => {
        try {
            const conn = await connect();
            const sql = 'UPDATE clientes SET nome=?, idade=? WHERE id=?';
            const values = [cliente.nome, cliente.idade, id];
            return await conn.query(sql, values);
        } catch (error) {
            throw error;
        }
    },

    deletaClientes: async (id) => {
        try {
            const conn = await connect();
            const sql = 'DELETE FROM clientes WHERE id=?;';
            return await conn.query(sql, [id]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = clienteModel



