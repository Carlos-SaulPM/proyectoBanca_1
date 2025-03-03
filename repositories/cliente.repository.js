const { MongoClient } = require("mongodb");

const uri = process.env.DB_URL;
const client = new MongoClient(uri);

const collection = "Clientes";

async function conectarDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
    console.log("✅ Conectado a MongoDB");
  }
  return client.db("Banco");
}

async function obtenerClientesAsync(pagina, limite) {
  try {
    const db = await conectarDB();
    const lista = await db
      .collection(collection)
      .find({estaActivo: true})
      .skip((pagina - 1) * limite)
      .limit(limite)
      .toArray();
    const totalDocumentos = await db.collection(collection).countDocuments();

    return { pagina, limite, totalDocumentos, totalPaginas: Math.ceil(totalDocumentos/limite), lista};
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

const eliminarClienteIdAsync = async (clienteId) => {
  try {
    const db = await conectarDB();
    const clienteActual = await obtenerClienteIdAsync(clienteId);
    console.log(clienteId);
    if (clienteActual === null) return null;

    clienteActual.estaActivo = false;
    await modificarClienteAsync(clienteActual);
  } catch (error) {
    console.log(`Ocurrio un error en la eliminación del producto: ${error}`);
    throw error;
  }
};

const modificarClienteAsync = async (clienteConModificaciones) => {
  try {
    const db = await conectarDB();
    const clienteActual = await obtenerClienteIdAsync(
      clienteConModificaciones.id
    );
    if (clienteActual === null) {
      console.log(
        `No se encontró el cliente con ID ${clienteConModificaciones.id}`
      );
      return null;
    }

    const datosAActualizar = {};
    Object.keys(clienteConModificaciones).forEach((key) => {
      if (clienteConModificaciones[key] !== clienteActual[key]) {
        datosAActualizar[key] = clienteConModificaciones[key];
      }
    });
    //console.log("Repositorio: ", datosAActualizar);
    const resultado = await db
      .collection(collection)
      .updateOne(
        { id: Number(clienteConModificaciones.id) },
        { $set: datosAActualizar }
      );

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
  eliminarClienteIdAsync,
  modificarClienteAsync,
  obtenerClienteEncodeKeyAsync,
};
