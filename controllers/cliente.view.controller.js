const { clienteBusiness } = require("../business");

const obtenerClientes = async (req, res) => {
  let clientes = await clienteBusiness.obtenerClientes();
  if (!clientes) {
    res.render("partials/error404");
    return;
  }
  res.render("home/index", { clientes });
};

const eliminarCliente = async (req, res) => {
  const respuesta = clienteBusiness.eliminarClienteIdAsync(req.params.id);
  if (!respuesta) {
    res.render("partials/error404");
  }
}


module.exports = {
  obtenerClientes,
  eliminarCliente,
};
