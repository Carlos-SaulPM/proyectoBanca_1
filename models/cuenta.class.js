class CuentaAhorro {
  nombre;
  total;
  interes;
  fechaDeRegistro;
  clienteEncodedKey;
  id;
  encodedKey;
  otros;

  constructor(nombre, clienteEncodedKey) {
    this.clienteEncodedKey = clienteEncodedKey;
    this.nombre = nombre;
    this.total = 0;
    this.interes = 0;
    this.fechaDeRegistro = new Date();
  }

  
}

module.exports = CuentaAhorro;
