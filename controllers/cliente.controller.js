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

module.exports = { agregarCliente, obtenerClienteId };
