const { MongoClient } = require("mongodb");
const uri = process.env.DB_URL;
const client = new MongoClient(uri);
const collection = "Cuentas";

const conectarDB = async () => {
  try {
    await client.connect();
    console.log("DB conectada");
    return client.db("Banco");
  } catch (error) {
    console.log(`Ocurrio un error: ${error}`);
    process.exit(1);
  }
};

const crearCuenta = async (cuenta) => {
  try {
    const db = await conectarDB();
    let totalDocumentos = await db.collection(collection).countDocuments();
    let id = totalDocumentos + 1;
    await db.collection(collection).insertOne({
      id,
      encodedkey: cuenta.encodedkey,
      clienteEncodedKey: cuenta.clienteEncodedkey,
      nombre: cuenta.nombre,
      total: cuenta.total,
      interes: cuenta.interes,
      fechaDeRegistro: cuenta.fechaDeRegistro,
      estaActivo: true,
      otros: cuenta.otros,
    });
  } catch (error) {
    console.log(`Error en la reacion de la cuenta: ${error}`);
    throw error;
  }
};

const obtenerCuentaConNumeroDeCuenta = async (numeroDeCuenta) => {
  try {
    const db = await conectarDB();
    const cuenta = await db
      .collection(collection)
      .findOne({
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

    const propiedadesPermitidas = ["nombre", "total", "tasa", "otros.interes"];
    const datosAActualizar= {}
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

const obtenerTodasLasCuentas = async () => {
  try {
    const db = await conectarDB();
    const todasLasCuentas = await db.collection(collection).find({ estaActivo: true }).toArray();
    return todasLasCuentas;
  } catch (error) {
    console.log(`Ocurrió un error al obtener las cuentas: ${error}`)
  }
}

const eliminarCuenta = async (numeroDeCuenta) => {
  
}

module.exports = {
  crearCuenta,
  obtenerCuentaConNumeroDeCuenta,
  modificarCuenta,
  obtenerTodasLasCuentas
};
