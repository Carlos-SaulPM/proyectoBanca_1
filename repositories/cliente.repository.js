const { MongoClient } = require("mongodb");

const uri = process.env.DB_URL;
const client = new MongoClient(uri);

const collection = "Clientes";

async function conectarDB() {
  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB");
    return client.db("Banco");
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    process.exit(1);
  }
}

async function obtenerClientesAsync() {
  try {
    const db = await conectarDB();
    const lista = await db
      .collection(collection)
      .find({ estaActivo: true })
      .toArray();
    return lista;
  } catch (error) {
    console.error("❌ Error al obtener los clientes:", error);
    throw error;
  }
}

async function obtenerClienteIdAsync(idCliente) {
  try {
    const db = await conectarDB();
    const cliente = await db
      .collection(collection)
      .findOne({ id: Number(idCliente), estaActivo: true });
    return cliente;
  } catch (error) {
    console.error(
      `❌ Error al obtener el cliente con id :${idCliente}, ${error}`
    );
    throw error;
  }
}

async function obtenerClienteEncodeKeyAsync(clienteEncodeKey) {
  try {
    const db = await conectarDB();
    const cliente = await db
      .collection(collection)
      .findOne({ encodedKey: clienteEncodeKey, estaActivo: true });
    // console.log("Obtener ID: "+producto);
    return cliente;
  } catch (error) {
    console.error(
      `❌ Error al obtener el cliente con id :${clienteEncodeKey}, ${error}`
    );
    throw error;
  }
}

const agregarClienteAsync = async (cliente) => {
  try {
    const db = await conectarDB();
    let totalDocumentos = await db.collection(collection).countDocuments();
    let id = totalDocumentos + 1;
    await db.collection(collection).insertOne({
      id,
      nombre: cliente.nombre,
      primerApellido: cliente.primerApellido,
      segundoApellido: cliente.segundoApellido,
      fechaDeNacimiento: cliente.fechaDeNacimiento,
      estaActivo: true,
      fechaDeRegistro: cliente.fechaDeRegistro,
      encodedKey: cliente.encodedKey,
    });
    return id;
  } catch (error) {
    console.log(`Ocurrió un error en la creación del cliente: ${error}`);
    throw error;
  }
};

const eliminarClienteAsync = async (clienteId) => {
  try {
    const db = await conectarDB();
    const clienteActual = await obtenerClienteIdAsync(clienteId);
    clienteActual.estaActivo = false;
    await modificarClienteAsync(clienteActual);
  } catch (error) {
    console.log(`Ocurrio un error en la eliminación del producto: ${error}`);
    throw error;
  }
};

const modificarClienteAsync = async (cliente) => {
  try {
    const db = await conectarDB();
    const clienteActual = await obtenerProductoID(cliente.id);

    console.log("Repositorio", cliente);
    if (clienteActual === null) {
      console.log(`No se encontró el cliente con ID ${cliente.id}`);
      return;
    }

    const datosAActualizar = {};
    Object.keys(cliente).forEach((key) => {
      if (cliente[key] !== clienteActual[key]) {
        datosAActualizar[key] = cliente[key];
      }
    });
    console.log("Repositorio: ", datosAActualizar);
    const resultado = await db
      .collection(collection)
      .updateOne({ id: Number(cliente.id) }, { $set: datosAActualizar });
    console.log(resultado);
    return resultado;
  } catch (error) {
    console.log(`Ocurrio un error en la eliminación del cliente: ${error}`);
    throw error;
  }
};

module.exports = {
  obtenerClientesAsync,
  obtenerClienteIdAsync,
  agregarClienteAsync,
  eliminarClienteAsync,
  modificarClienteAsync,
  obtenerClienteEncodeKeyAsync,
};
