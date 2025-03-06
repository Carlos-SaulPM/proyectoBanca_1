const { clienteBusiness, cuentaBusiness } = require("../business");

const obtenerClientes = async (req, res) => {
let pagina = Number(req.query.pagina) || 1;
  let limite = Number(req.query.limite) || 10;

  if (pagina <= 0 && limite <= 0) {
    console.log("Ingresa una pagina o limite valido");
    res.status(404).json({error: "Pagina o limite invalido"})
    return;
  }


  let clientes = await clienteBusiness.obtenerClientesAsync(pagina, limite);
  if (!clientes) {
    res.render("partials/error404");
    return;
  }
  
  res.render("home/index", { clientes: clientes.lista, pagina: clientes.pagina, totalpaginas: clientes.totalPaginas });


};

const eliminarCliente = async (req, res) => {
  const respuesta = clienteBusiness.eliminarClienteIdAsync(req.params.id);
  if (!respuesta) {
    res.render("partials/error404");
  }
}

const detalleCliente = async (req, res) => {
  const cliente = await clienteBusiness.buscarClienteIdAsync(req.params.id)
  const ahorros = await cuentaBusiness.obtenerCuentasPorCliente(cliente.encodedKey) 
  // console.log(ahorros)
  res.render("clientes/detalles", {cliente, ahorros});
}


module.exports = {
  obtenerClientes,
  eliminarCliente,
  detalleCliente,
};
