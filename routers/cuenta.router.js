const express = require('express');
const router = express.Router();

const { cuentaController } = require('../controllers');
//Id del cliente como hidden. req.body.idCliente
router.post("/cuentas", cuentaController.crearCuenta); 
router.get("/cuentas/:id", cuentaController.obtenerCuentas);
router.put("/cuentas/modificar/:id", cuentaController.modificarCuenta);
router.get("/cuentas/:id", cuentaController.eliminarCuenta);

module.exports = router;