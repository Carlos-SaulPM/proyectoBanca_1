const express = require("express");
const router = express.Router();

const { clienteController } = require("../controllers");

router.post("/clientes", clienteController.agregarCliente);
router.get("/clientes", clienteController.obtenerClientes);
router.get("/clientes/:id", clienteController.obtenerClienteId);
router.put("/clientes/:id", clienteController.modificarCliente);
router.delete("/clientes/:id", clienteController.eliminarCliente);

module.exports = router;
