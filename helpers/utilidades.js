const tieneSoloNumeros = (cadena) => {
  const regex = /^[0-9]*$/;
  const onlyNumbers = regex.test(cadena);
  return onlyNumbers;
}

module.exports = {tieneSoloNumeros}