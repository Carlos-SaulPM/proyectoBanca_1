const { MongoClient } = require("mongodb");

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
}

const crearCuentaAsync = async (cuenta) => {
  try {
    const db = await conectarDB();
    let totalDocumentos = await db.collection(collection).countDocuments();
    let id = totalDocumentos + 1;
    await db.collection(collection).insertOne(
      {
        id,
        encodedkey: cuenta.encodedkey,
        clienteEncodedKey: cuenta.clienteEncodedkey,
        nombre: cuenta.nombre,
        total: cuenta.total,
        interes: cuenta.interes,
        fechaDeRegistro: cuenta.fechaDeRegistro,
        estaActivo: true,
        otros: cuenta.otros
      }
    )
  } catch (error) {
    console.log(`Error en la reacion de la cuenta: ${error}`)
    throw error;
    
  }
}

const obtenerCuentaEncodedKeyAsync = async (encodedKey) => {
  try {
    const db = await conectarDB();
    const cuenta = await db.collection(collection).findOne({encodedKey: Number(encodedKey), estaActivo: true})
    return cuenta;
  } catch (error) {
    console.log(`Ocurrio un error para encontrar la cuenta: ${encodedKey}`);
    throw error;
  }
}

const modificarCuentaAsync = async (cuentaCambios) => {
  try {
    const db = await conectarDB();
    const cuentaActual = await obtenerCuentaEncodedKeyAsync(cuentaCambios.encodedKey);
    // Falta controlar la cuenta vacia

    const datosAActualizar = {};
    Object.entries(cuentaCambios).forEach(([key, value]) => {
      if (cuentaActual[key] !== value) {
        datosAActualizar[key] = value;
      }
    });

    if (Object.keys(datosAActualizar).length === 0) {
      console.log("No hay cambios para actualizar.");
      return null;
    }

    const resultado = await db
      .collection(collection)
      .updateOne(
        { encodedKey: cuentaCambios.encodedKey },
        { $set: datosAActualizar }
      );

    return resultado;
  } catch (error) {
    console.error(`Ocurrió un error en la modificación de la cuenta: ${error}`);
    throw error;
  }
};
