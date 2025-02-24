const express = require("express");
const router = express.Router();

const {clienteController} = require("../controllers");

router.post("/clientes", clienteController.agregarCliente);
router.get("/clientes/:id", clienteController.obtenerClienteId);

module.exports = router
