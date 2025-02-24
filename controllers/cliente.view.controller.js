const { clienteBusiness } = require("../business");

const obtenerClientes = async (req, res) => {
  let clientes = clienteBusiness.obtenerClientes();
  //validaciones
  res.render("home/home");
};
