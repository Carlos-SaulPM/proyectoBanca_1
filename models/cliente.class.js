class Cliente {
  constructor(
    encodedKey,
    nombre,
    primerApellido,
    segundoApellido,
    fechaDeNacimiento
  ) {
    this.encodedKey = encodedKey;
    this.nombre = nombre;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.fechaDeNacimiento = fechaDeNacimiento;
    this.fechaDeRegistro = new Date();
  }
}

module.exports = Cliente;