function calcularTotalTS(precio: number, impuesto: number): number {
    return precio + impuesto;
}

const totalTS = calcularTotalTS(100, 5);
console.log(totalTS);

const pacienteTS = {nombre: "juan", ObraSocial: "OSDE"};

console.log(pacienteTS.ObraSocial)