const generarRfc = async (
  nombre,
  primerApellido,
  segundoApellido,
  fechaDeNacimiento
) => {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    tipoDePersona: 0,
    nombre: nombre,
    primerApellido: primerApellido,
    segundoApellido: segundoApellido,
    fechaDeNacimiento: fechaDeNacimiento,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const baseUrl = process.env.baseUrlSat;
  //console.log(baseUrl);
  const response = await fetch(baseUrl, requestOptions);
  if (!response.ok) {
    throw new Error(response.status, response.json());
  }

  const rfc = await response.json();
  console.log("Sat service", rfc);

  return rfc;
};

module.exports = { generarRfc };
