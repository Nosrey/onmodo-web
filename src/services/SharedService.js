export const generarFechas = (fechaInicial, temporalidad) => {
    const fechas = [];
    const [year, month, day] = fechaInicial.split('-').map(Number);
    const fecha = new Date(year, month - 1, day); // Meses en JavaScript se cuentan desde 0 (enero) a 11 (diciembre).
  
    // Agregar la fecha inicial al array
    // la tenemos en formato MM/DD/YYYY y la queremos en formato DD/MM/YYYY
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 ya que los meses van de 0 a 11
    const año = fecha.getFullYear().toString();
    
    const fechaFormateada = `${dia}/${mes}/${año}`;
    fechas.push({ fecha: fechaFormateada, ejecutado: false })

    // Determinar el incremento de tiempo en base a la temporalidad
    let incremento = 1;
    switch (temporalidad) {
      case "Mensual":
        incremento = 1;
        break;
      case "Bimestral":
        incremento = 2;
        break;
      case "Trimestral":
        incremento = 3;
        break;
      case "Semestral":
        incremento = 6;
        break;
      case "Anual":
        incremento = 12;
        break;
      case "Cada 2 años":
        incremento = 24;
        break;
      default:
        throw new Error("Temporalidad no válida");
    }
  
    // Generar fechas para un período de 10 años
    for (let i = 0; i < 10 * 12; i += incremento) {
      fecha.setMonth(fecha.getMonth() + incremento);
      // la tenemos en formato MM/DD/YYYY y la queremos en formato DD/MM/YYYY
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 ya que los meses van de 0 a 11
      const año = fecha.getFullYear().toString();

      const fechaFormateada = `${dia}/${mes}/${año}`;
      fechas.push({ fecha: fechaFormateada, ejecutado: false })
    }
  
    return fechas;
  }

  export const parseFecha = (fechaString) => {
    const parts = fechaString.split('/');
    if (parts.length === 3) {
      const dia = parseInt(parts[0], 10);
      const mes = parseInt(parts[1], 10);
      const año = parseInt(parts[2], 10);
      if (!isNaN(dia) && !isNaN(mes) && !isNaN(año)) {
        return new Date(año, mes - 1, dia); // Resta 1 al mes, ya que los meses en JavaScript van de 0 a 11.
      }
    }
    return null;
  };
  

 export  const FrecuenciaToDias = {
    Mensual: 7, 
    Bimestral: 7, 
    Trimestral: 30, 
    Semestral: 30, 
    Anual: 60, 
    'Cada 2 años': 60,
  };