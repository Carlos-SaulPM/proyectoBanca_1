class Ahorro {
  nombre;
  total;
  interes;
  fechaDeRegistro;
  clienteEncodedKey;
  id;
  encodedKey;
  otros;

  constructor(encodedKey, nombre, clienteEncodedKey, otros) {
    this.encodedKey = encodedKey;
    this.clienteEncodedKey = clienteEncodedKey;
    this.nombre = nombre;
    this.total = 0;
    this.interes = 0;
    this.fechaDeRegistro = new Date();
    this.otros = otros;
  }
}

module.exports = Ahorro;
