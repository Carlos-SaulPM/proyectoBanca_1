const { cuentaRepository, clienteRepository } = require("../repositories");

const crearCuenta = async (cliente) => {
  let existeCliente = await clienteRepository.obtenerClienteEncodeKeyAsync(
    cliente.encodedKey
  );
  if (!existeCliente) {
    console.log(`No existe el cliente con el encodedKey ${cliente.encodedKey}`);
    return null;
  }

  let cuentaCreada = await cuentaRepository.crearCuenta(cliente);
  if (!cuentaCreada.acknowledged || cuentaCreada.code) {
    console.log(`Ocurrio un error en la creacion de la cuenta`);
    return null;
  }

  return {
    seCreoLaCuenta: cuentaCreada.acknowledged,
    idCuenta: cuentaCreada.insertedId,
  };
};

const obtenerCuentas = async () => {
  let cuentas = await cuentaRepository.obtenerCuentas();
  if (!cuentas)return null;
  return cuentas;
};

const modificarCuenta = async (cuenta) => {
  let cuentaAModificar = await cuentaRepository.obtenerCuentaConNumeroDeCuenta(
    cuenta.otros.numeroDeCuenta
  );
  if (!cuentaAModificar) {
    console.log(
      `No existe el numero de cuenta: ${cuenta.otros.numeroDeCuenta}`
    );
    return null;
  }

  let modificandoCuenta = await cuentaRepository.modificarCuenta(cuenta);
  if (!modificandoCuenta || modificandoCuenta.matchedCount === 0) {
    console.log(`No se encontro la cuenta: ${cuenta.otros.numeroDeCuenta}`);
    return null;
  }

  return true;
};

const eliminarCuenta = async (cuenta) => {
  const eliminarCuenta = await cuentaRepository.eliminarCuenta(
    cuenta.otros.numeroDeCuenta
  );
  if (!eliminarCuenta || eliminarCuenta.matchedCount === 0) {
    console.log(`No se encontro la cuenta: ${cuenta.otros.numeroDeCuenta}`);
    return null;
  }

  return true;
};

module.exports = {
  crearCuenta,
  obtenerCuentas,
  modificarCuenta,
  eliminarCuenta,
};
