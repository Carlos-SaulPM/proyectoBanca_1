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

const crearCuenta = async (cliente) => {
  
}
