const { cuentaBusiness } = require("../business");

const crearCuenta = async (req, res) => {
  let seCreoLaCuenta = await cuentaBusiness.crearCuenta(req.body);
  if (!seCreoLaCuenta) {
    console.log(`Ocurrio un error en la creación de la cuenta`);
    res
      .status(404)
      .json({ error: "Ocurrió un error en la creación de la cuenta" });
    return;
  }
  res.status(201).json(seCreoLaCuenta);
};

const obtenerCuentas = async (req, res) => {
  //Obtengo todas, pero tengo que obtener solo las del usuario
  const todasLasCuentas = await cuentaBusiness.obtenerCuentas();

  if (!todasLasCuentas) {
    console.log(`No hay cuentas`);
    res.status(200).json({ mensaje: "No hay cuentas registradas" });
  }

  res.status(200).json(todasLasCuentas);
};

const modificarCuenta = async (req, res) => {
  req.body.id = req.params.id;
  const cuentaModificada = await cuentaBusiness.modificarCuenta(req.body);
  if (!cuentaModificada) {
    res
      .status(404)
      .json({ error: "Ocurrio un error en la modificacion de la cuenta" });
    return;
  }
  res.status(200).json(cuentaModificada);
};

const eliminarCuenta = async (req, res) => {
  const cuentaEliminada = await cuentaBusiness.eliminarCuenta(req.params);
  if (!cuentaEliminada) {
    res
      .status(404)
      .json({ error: "Ocurrio un error en la eliminacion de la cuenta" });
    return;
  }
  res.status(200).json(cuentaEliminada);
};

module.exports = {
  crearCuenta,
  obtenerCuentas,
  modificarCuenta,
  eliminarCuenta,
};
