const { cuentaRepository, clienteRepository } = require("../repositories");
const {CuentaAhorro} = require("../models")

const crearCuenta = async (reqBody) => {
  const cliente = new CuentaAhorro()
  const existeCliente = await clienteRepository.obtenerClienteEncodeKeyAsync(
    cliente.encodedKey
  );
  if (!existeCliente) {
    console.log(`No existe el cliente con el encodedKey ${cliente.encodedKey}`);
    return null;
  }

  const cuentaCreada = await cuentaRepository.crearCuenta(cliente);
  if (!cuentaCreada.acknowledged || cuentaCreada.code) {
    console.log(`Ocurrio un error en la creacion de la cuenta`);
    return null;
  }

  cuentaCreada.seCreoLaCuenta = cuentaCreada.acknowledged;
  cuentaCreada.idCuenta = cuentaCreada.insertedId;

  return cuentaCreada;
};

const obtenerCuentas = async () => {
  let cuentas = await cuentaRepository.obtenerCuentas();
  if (!cuentas) return null;
  return cuentas;
};

const modificarCuenta = async (cuenta) => {
  const cuentaAModificar = await cuentaRepository.obtenerCuentaConNumeroDeCuenta(
    cuenta.otros.numeroDeCuenta
  );
  if (!cuentaAModificar) {
    console.log(
      `No existe el numero de cuenta: ${cuenta.otros.numeroDeCuenta}`
    );
    return null;
  }

  const modificandoCuenta = await cuentaRepository.modificarCuenta(cuenta);
  if (!modificandoCuenta || modificandoCuenta.matchedCount === 0) {
    console.log(`No se encontro la cuenta: ${cuenta.otros.numeroDeCuenta}`);
    return null;
  }

  modificandoCuenta.seModificoLaCuenta = modificandoCuenta.acknowledged;
  return modificandoCuenta;
};

const eliminarCuenta = async (cuenta) => {
  const eliminarCuenta = await cuentaRepository.eliminarCuenta(
    cuenta.otros.numeroDeCuenta
  );
  if (!eliminarCuenta || eliminarCuenta.matchedCount === 0) {
    console.log(`No se encontro la cuenta: ${cuenta.otros.numeroDeCuenta}`);
    return null;
  }

  return eliminarCuenta;
};

module.exports = {
  crearCuenta,
  obtenerCuentas,
  modificarCuenta,
  eliminarCuenta,
};
