const { cuentaBusiness } = require("../business");
const { CuentaAhorro } = require("../models");
// Crear - Mostrar un formulario
const crearCuenta = async (req, res) => {
  //obtenemos el encodedKey para psarlo al formulario
  let encodedKey = req.query.clienteId;
  res.render("ahorros/crearAhorro", {encodedKey});
};

const guardarCuenta = async (req,res) => {
  let ahorro = new CuentaAhorro(req.body.nombre, req.body.clienteEncodedKey);
  // console.log("controller view cuenta: ", ahorro);
  await cuentaBusiness.crearCuenta(ahorro)
  
  res.redirect("/clientes/detalles/"+ req.body.clienteEncodedKey)
}


module.exports = {
  crearCuenta,
  guardarCuenta
};
