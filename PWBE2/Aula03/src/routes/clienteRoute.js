const express = require("express");
const router = express.Router();

const {clienteController} = require('../controllers/clienteController');

router.get("/clientes", clienteController.selecionarTodosClientes);
router.get("/clientes/:id", clienteController.selecionarUmCliente);
router.post("/clientes", clienteController.insereClientes);
router.put("/clientes/:id", clienteController.atualizaClientes);
router.delete("/clientes/:id", clienteController.deletaClientes);

module.exports = router;