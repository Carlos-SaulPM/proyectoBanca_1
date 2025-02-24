const { clienteBusiness } = require("../business");

const agregarCliente = async (req, res) => {
  let clienteExistente = await clienteBusiness.buscarClienteAsync(req.body);

  if (clienteExistente) {
    res.status(200).json(clienteExistente);
    return;
  }

  let clienteAgregado = await clienteBusiness.agregarClienteAsync(req.body);
  res.status(201).json(clienteAgregado);
};

const obtenerClienteId = async (req, res) => {
  const cliente = await clienteBusiness.buscarClienteIdAsync(req.params.id);
  if (cliente === null) {
    res.status(404).json({ Error: "No se encontro el usuario con ese ID" });
    return;
  }
  res.status(200).json(cliente);
};

const modificarCliente = async (req, res) => {
  req.body.id = Number(req.params.id);
  let respuesta = await clienteBusiness.modificarClienteAsync(req.body);

  if (respuesta === null) {
    res.status(404).json({ Error: "No se encontro el cliente" });
    return;
  }

  res.status(202).json(req.body);
};

const eliminarCliente = async (req, res) => {
  console.log(`controller: ${req.params.id}`);
  let respuesta = await clienteBusiness.eliminarClienteIdAsync(req.params.id);
  respuesta === null
    ? res.status(404).json({ error: "No se encontro el usuario con ese id" })
    : res.status(200).json({ mensaje: "Producto Eliminado" });
};

const obtenerClientes = async (req, res) => {
  let clientes = await clienteBusiness.obtenerClientes();
  res.status(200).json(clientes);
};

module.exports = {
  agregarCliente,
  obtenerClienteId,
  modificarCliente,
  eliminarCliente,
  obtenerClientes,
};
