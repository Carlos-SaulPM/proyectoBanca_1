const { MongoClient } = require("mongodb");
const uri = process.env.DB_URL;
const client = new MongoClient(uri);
const collection = "Cuentas";

const conectarDB = async () => {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
      console.log("✅ Conectado a MongoDB");
    }
    return client.db("Banco");
  } catch (error) {
    console.log(`Ocurrio un error: ${error}`);
    throw error;
  }
};

const crearCuenta = async (cuenta) => {
  try {
    //console.log("Repositorio cuentas: ", cuenta)
    const db = await conectarDB();
    let totalDocumentos = await db.collection(collection).countDocuments();
    let id = totalDocumentos + 1;
    cuenta.id = id;
    const cuentaCreada = await db.collection(collection).insertOne(cuenta);
    console.log("Repositorio cuentaCreada: ", cuentaCreada);
    return cuentaCreada;
  } catch (error) {
    console.log(`Error en la reacion de la cuenta: ${error}`);
    throw error;
  }
};

const obtenerCuentaConNumeroDeCuenta = async (numeroDeCuenta) => {
  try {
    const db = await conectarDB();
    const cuenta = await db.collection(collection).findOne({
      "cuenta.otros.numeroDeCuenta": numeroDeCuenta,
      estaActivo: true,
    });
    return cuenta;
  } catch (error) {
    console.log(`Ocurrio un error para encontrar la cuenta: ${numeroDeCuenta}`);
    throw error;
  }
};

const modificarCuenta = async (cuentaCambios) => {
  try {
    const db = await conectarDB();
    const cuentaActual = await obtenerCuentaConNumeroDeCuenta(
      cuentaCambios.otros.numeroDeCuenta
    );

    const propiedadesPermitidas = [
      "nombre",
      "total",
      "tasa",
      "otros.interes",
      "estaActivo",
    ];
    const datosAActualizar = {};
    for (const propiedad of propiedadesPermitidas) {
      if (cuentaActual[propiedad] !== cuentaCambios[propiedad]) {
        datosAActualizar[propiedad] = cuentaCambios[propiedad];
      }
    }

    const resultado = await db
      .collection(collection)
      .updateOne(
        { encodedKey: cuentaActual.encodedKey },
        { $set: datosAActualizar }
      );

    return resultado;
  } catch (error) {
    console.error(`Ocurrió un error en la modificación de la cuenta: ${error}`);
    throw error;
  }
};

const obtenerCuentas = async () => {
  try {
    const db = await conectarDB();
    const todasLasCuentas = await db
      .collection(collection)
      .find({ estaActivo: true })
      .toArray();
    return todasLasCuentas;
  } catch (error) {
    console.log(`Ocurrió un error al obtener las cuentas: ${error}`);
  }
};

const obtenerCuentasPorCliente = async (clienteId) => {
  try {
    const db = await conectarDB();
    const todasLasCuentas = await db
      .collection(collection)
      .find({clienteEncodedKey: clienteId, estaActivo: true })
      .toArray();
    return todasLasCuentas;
  } catch (error) {
    console.log(`Ocurrió un error al obtener las cuentas: ${error}`);
  }
};

const eliminarCuenta = async (numeroDeCuenta) => {
  try {
    const db = await conectarDB();
    const cuenta = await obtenerCuentaConNumeroDeCuenta(numeroDeCuenta);
    cuenta.estaActivo = false;
    const eliminacionCorrecta = await modificarCuenta(cuenta);
    return eliminacionCorrecta;
  } catch (error) {
    console.log(`Ocurrio un error en la eliminación de la cuenta: ${error}`);
  }
};

module.exports = {
  crearCuenta,
  obtenerCuentaConNumeroDeCuenta,
  modificarCuenta,
  obtenerCuentas,
  eliminarCuenta,
  obtenerCuentasPorCliente
};
