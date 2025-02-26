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
  req.body.id = Number(req.params.id)
  let cliente = clienteBusiness.buscarClienteAsync(req.body)
  if (!cliente) {
    res.render("partials/error404");
    return
  }
  let respuesta = await clienteBusiness.modificarClienteAsync(cliente)
  if (!respuesta) {
    res.render("/partials/eror404")
    return
  }

  res.redirect("/")
}


module.exports = {
  obtenerClientes,
  modificarCliente
}