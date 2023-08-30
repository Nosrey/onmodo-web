import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generatePDF = (formulario, form) => {
  console.log(formulario)
  let pdfContent = [];

  if (form == "flashincidente") {
    const { alcance, linea, fecha, hora, comedor, responsable, incidentePotencial, tipo, descripcion, fotografia, acciones, nombreAsesor, firmaAsesor, nombreSupervisor, firmaSupervisor, nombreGerente, firmaGerente } = formulario;
    pdfContent.push(`Alcance: ${alcance}`, `Línea: ${linea}`, `Fecha: ${fecha}`, `Hora: ${hora}`, `Comedor: ${comedor}`, `Responsable: ${responsable}`, `Incidente Potencial: ${incidentePotencial}`, `Tipo: ${tipo}`, `Descripción: ${descripcion}`, `Acciones: ${acciones}`, `Nombre Asesor: ${nombreAsesor}`, `Firma Asesor: ${firmaAsesor}`, `Nombre Supervisor: ${nombreSupervisor}`, `Firma Supervisor: ${firmaSupervisor}`, `Nombre Gerente: ${nombreGerente}`, `Firma Gerente: ${firmaGerente}`);
  }
  else if (form == "controlalergenos") {
    const { comedor, inputs, verified, date } = formulario;
    pdfContent.push(`Comedor: ${comedor}`);
    inputs.forEach(input => {
      pdfContent.push(`Fecha: ${input.fecha}`, `Nombre: ${input.nombre}`, `Diagnóstico: ${input.diagnostico}`, `Listado: ${input.listado}`, `Responsable: ${input.responsable}`);
    });
    pdfContent.push(`Verificado: ${verified}`, `Fecha: ${date}`);
  }
  else if (form === "entregabidones") {
    pdfContent.push("Entrega de Bidones");

    const { inputs } = formulario;

    inputs.forEach((input, index) => {
      pdfContent.push(`Bidon ${index + 1}:`);
      pdfContent.push(`Fecha: ${input.fecha}`);
      pdfContent.push(`Cant. de litros entregados: ${input.cantidaddelitrosentregados}`);
      pdfContent.push(`Responsable de entrega: ${input.responsabledeentrega}`);
      pdfContent.push(`Responsable de retiro: ${input.responsablederetiro}`);
      pdfContent.push(`Certificado de transporte: ${input.certificadodetransporte}`);
      pdfContent.push(`Certificado de disposición final: ${input.certificadodedisposiciónfinal}`);
    });
  }
  else if (form === "informeintaccidente") {
    pdfContent.push("Informe de Incidente o Accidente");

    const { comedor, fecha, tipo, checkboxes, cuil, fechaIngreso, puesto, hora, lugar, descripcion, checkboxesAccidente, razon, lugarLesion, medidas, firmaEmpleado, encargado, date } = formulario;


    pdfContent.push(`Comedor: ${comedor}`);
    pdfContent.push(`Fecha: ${fecha}`);
    pdfContent.push(`Tipo: ${tipo}`);
    pdfContent.push(`CUIT/CUIL: ${cuil}`);
    pdfContent.push(`Fecha de Ingreso: ${fechaIngreso}`);
    pdfContent.push(`Puesto: ${puesto}`);
    pdfContent.push(`Hora: ${hora}`);
    pdfContent.push(`Lugar: ${lugar}`);
    pdfContent.push(`Descripción: ${descripcion}`);
    pdfContent.push(`Razón: ${razon}`);
    pdfContent.push(`Lugar de la Lesión: ${lugarLesion}`);
    pdfContent.push(`Medidas: ${medidas}`);
    pdfContent.push(`Firma del Empleado: ${firmaEmpleado}`);
    pdfContent.push(`Encargado: ${encargado}`);
    pdfContent.push(`Fecha del Informe: ${date}`);

    checkboxes.forEach((checkbox) => {
      pdfContent.push(`${checkbox.label}: ${checkbox.check ? 'Sí' : 'No'}`);
    });

    checkboxesAccidente.forEach((checkbox) => {
      pdfContent.push(`${checkbox.label}: ${checkbox.check ? 'Sí' : 'No'}`);
      if (checkbox.cualMaquina) {
        pdfContent.push(`Máquina: ${checkbox.cualMaquina}`);
      }
      if (checkbox.cualAccion) {
        pdfContent.push(`Acción: ${checkbox.cualAccion}`);
      }
    });
  }
  else if (form === "registrocapacitacion") {
    pdfContent.push("Registro de Capacitación");


    const { fecha, tiempoDuracion, checkboxes, temas, materialEntregado, asistentes, observaciones, instructor, cargo, firma, date } = formulario;


    pdfContent.push(`Fecha: ${fecha}`);
    pdfContent.push(`Duración: ${tiempoDuracion}`);
    pdfContent.push("Capacitaciones:");
    checkboxes.forEach((checkbox) => {
      pdfContent.push(`${checkbox.label}: ${checkbox.check ? 'Sí' : 'No'}`);
    });
    pdfContent.push(`Temas: ${temas}`);
    pdfContent.push("Material Entregado:");
    materialEntregado.forEach((item) => {
      pdfContent.push(`${item.label}: ${item.check ? 'Sí' : 'No'}`);
    });


    pdfContent.push("Asistentes:");
    asistentes.forEach((asistente) => {
      pdfContent.push(`Nombre: ${asistente.nombre}`);
      pdfContent.push(`DNI: ${asistente.dni}`);
      pdfContent.push(`Área: ${asistente.area}`);
      pdfContent.push(`Firma: ${asistente.firma}`);
      pdfContent.push(`Resultado: ${asistente.resultado}`);
      pdfContent.push(`Método: ${asistente.metodo}`);
      pdfContent.push("-----");
    });

    pdfContent.push(`Observaciones: ${observaciones}`);
    pdfContent.push(`Instructor: ${instructor}`);
    pdfContent.push(`Cargo: ${cargo}`);
    pdfContent.push(`Firma: ${firma}`);
    pdfContent.push(`Fecha del Registro: ${date}`);

  }
  else if (form === "registrodecomiso") {
    pdfContent.push("Registro de Decomiso");

    const { inputs } = formulario;

    pdfContent.push("Decomiso Records:");
    inputs.forEach((input, index) => {
      pdfContent.push(`Decomiso #${index + 1}`);
      pdfContent.push(`Fecha: ${input.fecha}`);
      pdfContent.push(`Turno: ${input.turno}`);
      pdfContent.push(`Producto Decomisado: ${input.productoDecomisado}`);
      pdfContent.push(`Cantidad: ${input.cantidad}`);
      pdfContent.push(`Fuera de Fecha: ${input.fueraFecha}`);
      pdfContent.push(`Fuera de Aptitud: ${input.fueraAptitud}`);
      pdfContent.push(`Otras Causas: ${input.otrasCausas}`);
      pdfContent.push(`Destino Final: ${input.destinoFinal}`);
      pdfContent.push(`Responsable: ${input.responsable}`);
      pdfContent.push("-----");
    });

  }
  else if (form === "registrosimulacro") {
    pdfContent.push("Registro de Simulacro");

    const { razonSocial, ubicacion, localidad, fecha, personas } = formulario;

    pdfContent.push(`Razon Social: ${razonSocial}`);
    pdfContent.push(`Ubicación: ${ubicacion}`);
    pdfContent.push(`Localidad: ${localidad}`);
    pdfContent.push(`Fecha: ${fecha}`);

    pdfContent.push("Personas Participantes:");
    personas.forEach((persona, index) => {
      pdfContent.push(`Persona #${index + 1}`);
      pdfContent.push(`Nombre Completo: ${persona["Apellido y Nombre"]}`);
      pdfContent.push(`DNI: ${persona["Nro DNI"]}`);
      pdfContent.push(`Firma: ${persona["Firma"]}`);
      pdfContent.push("-----");
    });

  }
  else if (form === "reporterechazo") {
    pdfContent.push("Reporte de Rechazo");

    const {

      dia,
      proveedor,
      producto,
      nroLote,
      condicionesEntrega,
      calidad,
      diferencias,
      transporte,
      medidasTomadas,
      nombreAdministrador,
      nombreProveedor,

    } = formulario;

    // Add general information to pdfContent

    pdfContent.push(`Día: ${dia}`);
    pdfContent.push(`Proveedor: ${proveedor}`);
    pdfContent.push(`Producto: ${producto}`);
    pdfContent.push(`Número de Lote: ${nroLote}`);

    // Process and add information about condicionesEntrega
    pdfContent.push("Condiciones de Entrega:");
    condicionesEntrega.forEach((condicion, index) => {
      pdfContent.push(`Condición #${index + 1}`);
      pdfContent.push(`Adelantado: ${condicion.adelantadoCheck}`);
      pdfContent.push(`Descripción Adelantado: ${condicion.adelantadoDescription}`);
      pdfContent.push(`Atrasado: ${condicion.atrasadoCheck}`);
      pdfContent.push(`Descripción Atrasado: ${condicion.atrasadoDescription}`);
      pdfContent.push("-----");
    });

    // Process and add information about calidad
    pdfContent.push("Calidad:");
    calidad.forEach((calidadItem, index) => {
      pdfContent.push(`Calidad Item #${index + 1}`);
      Object.keys(calidadItem).forEach(key => {
        pdfContent.push(`${key}: ${calidadItem[key]}`);
      });
      pdfContent.push("-----");
    });

    // Process and add information about diferencias
    pdfContent.push("Diferencias:");
    diferencias.forEach((diferencia, index) => {
      pdfContent.push(`Diferencia #${index + 1}`);
      Object.keys(diferencia).forEach(key => {
        pdfContent.push(`${key}: ${diferencia[key]}`);
      });
      pdfContent.push("-----");
    });

    // Process and add information about transporte
    pdfContent.push("Transporte:");
    transporte.forEach((transporteItem, index) => {
      pdfContent.push(`Transporte Item #${index + 1}`);
      Object.keys(transporteItem).forEach(key => {
        pdfContent.push(`${key}: ${transporteItem[key]}`);
      });
      pdfContent.push("-----");
    });

    // Process and add information about medidasTomadas
    pdfContent.push("Medidas Tomadas:");
    medidasTomadas.forEach((medida, index) => {
      pdfContent.push(`Medida #${index + 1}`);
      Object.keys(medida).forEach(key => {
        pdfContent.push(`${key}: ${medida[key]}`);
      });
      pdfContent.push("-----");
    });

    pdfContent.push(`Nombre Administrador: ${nombreAdministrador}`);
    pdfContent.push(`Nombre Proveedor: ${nombreProveedor}`);

  }
  else if (form === "verificacionbalanza") {
    pdfContent.push("Verificación de Balanza");

    const {
      fecha,
      responsable,
      balanza,
      inputs,
      verified,
      fechaHora,
    } = formulario;

    pdfContent.push(`Fecha: ${fecha}`);
    pdfContent.push(`Responsable: ${responsable}`);
    pdfContent.push(`Balanza: ${balanza}`);
    pdfContent.push(`Verificado: ${verified}`);
    pdfContent.push(`Fecha y Hora: ${fechaHora}`);

    pdfContent.push("Inputs:");
    inputs.forEach((input, index) => {
      pdfContent.push(`Input #${index + 1}`);
      Object.keys(input).forEach(key => {
        pdfContent.push(`${key}: ${input[key]}`);
      });
      pdfContent.push("-----");
    });

  }
  else if (form === "verificaciontermometros") {
    pdfContent.push("Verificación de Termómetros");

    const {
      fecha,
      responsable,
      inputsTrimestral,
      inputsSemestral,
      verified,
      fechaHora,
    } = formulario;

    pdfContent.push(`Fecha: ${fecha}`);
    pdfContent.push(`Responsable: ${responsable}`);
    pdfContent.push(`Verificado: ${verified}`);
    pdfContent.push(`Fecha y Hora: ${fechaHora}`);


    if (inputsTrimestral.length > 0) {
      pdfContent.push("Inputs Trimestrales:");
      inputsTrimestral.forEach((input, index) => {
        pdfContent.push(`Input Trimestral #${index + 1}`);
        Object.keys(input).forEach(key => {
          pdfContent.push(`${key}: ${input[key]}`);
        });
        pdfContent.push("-----");
      });
    }

    if (inputsSemestral.length > 0) {
      pdfContent.push("Inputs Semestrales:");
      inputsSemestral.forEach((input, index) => {
        pdfContent.push(`Input Semestral #${index + 1}`);
        Object.keys(input).forEach(key => {
          pdfContent.push(`${key}: ${input[key]}`);
        });
        pdfContent.push("-----");
      });
    }

  }
  else {
    return null
  }
  if (pdfContent.length > 0) {
    const documentDefinition = {
      content: [
        { text: 'Formulario Generado', style: 'header' },
        { text: form, style: 'subheader' },
        pdfContent.join('\n'),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download(`${form}_formulario.pdf`);
  }
};
