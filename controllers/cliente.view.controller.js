const { clienteBusiness } = require("../business");

const obtenerClientes = async (req, res) => {
  let clientes = await clienteBusiness.obtenerClientes();
  if (!clientes) {
    res.render("partials/error404");
    return;
  }
  res.render("home/index", {clientes});
};


const modificarCliente = async (req, res) => {
  let cliente = clienteBusiness.buscarClienteAsync(req.body)
  if (!cliente) {
    res.render("partials/error404");
    return
  }
  let respuesta = await clienteBusiness.modificarClienteAsync(cliente)
  if (!respuesta) {
    res.render("partials/error404")
    return
  }

  res.redirect("/");
}

const modificarClienteView = async (req, res) => {
  let cliente = await clienteBusiness.buscarClienteIdAsync(req.params.id)
  if (!cliente) {
    res.render("partials/error404");
    return;
  }
  
  res.render("clientes/modificarCliente", { cliente });
};

const eliminarCliente = async (req,res) => {
  const respuesta = clienteBusiness.eliminarClienteIdAsync(req.params.id);
  if (!respuesta) {
    res.render("partials/error404");
  }

  res.redirect("/");
}

module.exports = {
  obtenerClientes,
  modificarCliente,
  modificarClienteView,
  eliminarCliente
}