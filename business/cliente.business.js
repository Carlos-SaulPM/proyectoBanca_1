const { satService } = require("../services");
const { clienteRepository } = require("../repositories");

const agregarClienteAsync = async (cliente) => {
  let rfcDto = await satService.generarRfc(
    cliente.nombre,
    cliente.primerApellido,
    cliente.segundoApellido,
    cliente.fechaDeNacimiento
  );
  cliente.encodedKey = rfcDto.rfc;
  cliente.fechaDeRegistro = new Date();

  let id = await clienteRepository.agregarClienteAsync(cliente);

  return {
    id,
    encodedKey: cliente.encodedKey, //rfcDto.rfc
    fechaDeRegistro: new Date(),
  };
};

const buscarClienteAsync = async (cliente) => {
  let rfcDto = await satService.generarRfc(
    cliente.nombre,
    cliente.primerApellido,
    cliente.segundoApellido,
    cliente.fechaDeNacimiento
  );
  let cliente2 = await clienteRepository.obtenerClienteEncodeKeyAsync(
    rfcDto.rfc
  );
  return cliente2;
};

const buscarClienteIdAsync = async (idCliente) => {
  const cliente = await clienteRepository.obtenerClienteIdAsync(idCliente);
  return cliente;
};

const modificarClienteAsync = async (clienteConModificaciones) => {
  const modificacionExitosa = await clienteRepository.modificarClienteAsync(
    clienteConModificaciones
  );

  return modificacionExitosa;
};

const eliminarClienteIdAsync = async (idCliente) => {
  const eliminacionExitosa = await clienteRepository.eliminarClienteIdAsync(
    idCliente
  );
  return eliminacionExitosa;
};

const obtenerClientes = async () => {
  const clientes = await clienteRepository.obtenerClientesAsync();
  return clientes;
};

module.exports = {
  agregarClienteAsync,
  buscarClienteAsync,
  buscarClienteIdAsync,
  modificarClienteAsync,
  eliminarClienteIdAsync,
  obtenerClientes,
};
