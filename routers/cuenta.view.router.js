const express = require('express');
const router = express.Router();

const { cuentaViewController } = require('../controllers');

//Id del cliente como hidden. req.body.idCliente
router.get("/cuentas/crear", cuentaViewController.crearCuenta);
router.post("/cuentas/guardar", cuentaViewController.guardarCuenta);

// router.get("/cuentas/:id", cuentaController.obtenerCuentas);
// router.put("/cuentas/modificar/:id", cuentaController.modificarCuenta);
// router.get("/cuentas/:id", cuentaController.eliminarCuenta);

module.exports = router;