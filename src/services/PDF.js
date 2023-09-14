import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generatePDF = (formulario, form) => {
  console.log(formulario)
  let pdfContent = [];

  if (form == "flashincidente") {
    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 20],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 40],
      },
      label: {
        fontSize: 12,
        bold: true,
        margin: [0, 5, 0, 0],
        color: 'rgb(37, 35, 35)',
      },
      value: {
        fontSize: 12,
        margin: [0, 0, 0, 20],
        border: [0, 0, 0, 0],
        fillColor: '#F8F8F8',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: [5, 5, 5, 5],
      },

    };
    const { alcance, linea, fecha, hora, comedor, responsable, incidentePotencial, tipo, descripcion, fotografia, acciones, nombreAsesor, firmaAsesor, nombreSupervisor, firmaSupervisor, nombreGerente, firmaGerente } = formulario;

    const content = [
      { text: 'Formulario ONMODO', style: 'header', alignment: 'center' },
      { text: 'Flash Incidente', style: 'subheader', alignment: 'center' },
      {
        table: {
          widths: ['25%', '25%', '25%', '25%'], // Divide la tabla en 4 columnas
          body: [
            [
              { text: 'Alcance:', style: 'label' },
              { text: 'Línea de Negocios:', style: 'label' },
              { text: 'Fecha:', style: 'label' },
              { text: 'Hora:', style: 'label' },
            ],
            [
              { text: alcance || '', style: 'value' },
              { text: linea || '', style: 'value' },
              { text: fecha || '', style: 'value' },
              { text: hora || '', style: 'value' },
            ],
            [
              { text: 'Comedor:', style: 'label' },
              { text: 'Responsable:', style: 'label' },
              { text: 'Incidente Potencial:', style: 'label' },
              { text: 'Tipo:', style: 'label' },
            ],
            [
              { text: comedor || '', style: 'value' },
              { text: responsable || '', style: 'value' },
              { text: incidentePotencial || '', style: 'value' },
              { text: tipo || '', style: 'value' },
            ],
            [
              { text: 'Descripción:', style: 'label' },
              { colSpan: 3, text: descripcion || '', style: 'descriptionValue' },
              '',
            ],
            [
              { text: 'Acciones:', style: 'label' },
              { colSpan: 3, text: acciones || '', style: 'descriptionValue' },
              '',
            ],
            [
              { text: 'Nombre Asesor:', style: 'label' },
              { text: 'Firma Asesor:', style: 'label' },
              { text: 'Nombre Supervisor:', style: 'label' },
              { text: 'Firma Supervisor:', style: 'label' },
            ],
            [
              { text: nombreAsesor || '', style: 'value' },
              { text: firmaAsesor || '', style: 'value' },
              { text: nombreSupervisor || '', style: 'value' },
              { text: firmaSupervisor || '', style: 'value' },
            ],
            [
              { text: 'Nombre Gerente:', style: 'label' },
              { text: 'Firma Gerente:', style: 'label' },
              '',
              '',
            ],
            [
              { text: nombreGerente || '', style: 'value' },
              { text: firmaGerente || '', style: 'value' },
              '',
              '',
            ],
          ],
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          hLineColor: () => 'gray',
          vLineColor: () => 'gray',
          paddingTop: (i) => (i === 0 ? 10 : 10),
        },
      },
    ]

    const descriptionValueStyle = {
      fontSize: 12,
      marginBottom: 30,
    };
    styles.descriptionValue = descriptionValueStyle;

    const documentDefinition = {
      content,
      styles,
    };

    pdfMake.createPdf(documentDefinition).download(`${form}_formulario.pdf`);


  }
  else if (form === "controlalergenos") {
    const { comedor, inputs, verified, date } = formulario;
    const doc = new jsPDF();

    // Encabezado
    doc.setFontSize(18);
    doc.setFont('bold');
    doc.text('Formulario ONMODO', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('Control Alergenos', 105, 30, { align: 'center' });

    // Datos
    doc.setFontSize(12);
    doc.setFont('normal');
    doc.text(`Comedor: ${comedor}`, 10, 50);
    doc.text(`Verificado: ${verified}`, 10, 60);
    doc.text(`Fecha: ${date}`, 10, 70);

    // Tabla
    let y = 90;
    doc.setFont('bold');
    doc.text('Fecha', 10, y);
    doc.text('Nombre', 40, y);
    doc.text('Diagnóstico', 70, y);
    doc.text('Listado', 100, y);
    doc.text('Responsable', 130, y);
    y += 10;

    doc.setFont('normal');
    inputs.forEach((input) => {
      doc.text(input.fecha || '', 10, y);
      doc.text(input.nombre || '', 40, y);
      doc.text(input.diagnostico || '', 70, y);
      doc.text(input.listado || '', 100, y);
      doc.text(input.responsable || '', 130, y);
      y += 10;
    });

    // Guardar el PDF
    doc.save(`${form}_formulario.pdf`);
  }
  else if (form === "entregabidones") {
    const pdfContent = [];

    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 20],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 20], // Ajusta el margen inferior
      },
      subheader1: {
        fontSize: 14,
        bold: true,
        margin: [0, 40, 0, 20], // Ajusta el margen inferior
      },
      label: {
        fontSize: 12,
        bold: true,
        margin: [0, 5, 0, 0],
        color: 'rgb(37, 35, 35)',
      },
      value: {
        fontSize: 12,
        margin: [0, 0, 0, 10], // Ajusta el margen inferior
        border: [0.5, 0.5, 0.5, 0.5], // Bordes delgados en todas las partes de la celda
        fillColor: '#FfFfFf',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: [5, 5, 5, 5],
      },
    };

    pdfContent.push({ text: 'Formulario ONMODO', style: 'header', alignment: 'center' });
    pdfContent.push({ text: 'Entrega de Bidones', style: 'subheader', alignment: 'center' });

    const { inputs } = formulario;


    const columnWidths = ['50%', '50%'];

    inputs.forEach((input, index) => {
      pdfContent.push({ text: `Bidón ${index + 1}:`, style: 'subheader' });
      pdfContent.push({
        table: {
          widths: columnWidths,
          body: [
            [{ text: 'Fecha:', style: 'label' }, { text: input.fecha, style: 'value' }],
            [{ text: 'Cant. de litros entregados:', style: 'label' }, { text: input.cantidaddelitrosentregados, style: 'value' }],
            [{ text: 'Responsable de entrega:', style: 'label' }, { text: input.responsabledeentrega, style: 'value' }],
            [{ text: 'Responsable de retiro:', style: 'label' }, { text: input.responsablederetiro, style: 'value' }],
            [{ text: 'Certificado de transporte:', style: 'label' }, { text: input.certificadodetransporte, style: 'value' }],
            [{ text: 'Certificado de disposición final:', style: 'label' }, { text: input.certificadodedisposiciónfinal, style: 'value' }],
          ],
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          paddingTop: () => 5, // Ajusta el margen superior de las celdas
        },
      });
    });

    const documentDefinition = {
      content: pdfContent,
      styles,
    };

    pdfMake.createPdf(documentDefinition).download(`${form}_formulario.pdf`);
  }
  else if (form === "informeintaccidente") {
    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 20],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 20],
      },
      label: {
        fontSize: 12,
        bold: true,
        margin: [0, 0, 10, 10],
        color: 'rgb(37, 35, 35)',
      },
      value: {
        fontSize: 12,
        margin: [0, 0, 0, 10],
        border: [0.5, 0.5, 0.5, 0.5],
        fillColor: '#FfFfFf',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: [5, 5, 5, 5],
      },
    };

    const {
      comedor,
      fecha,
      tipo,
      cuil,
      fechaIngreso,
      puesto,
      hora,
      lugar,
      descripcion,
      razon,
      lugarLesion,
      medidas,
      firmaEmpleado,
      encargado,
      date,
      checkboxes,
      checkboxesAccidente
    } = formulario;

    const pdfContent = [
      { text: 'Formulario ONMODO', style: 'header', alignment: 'center' },
      { text: 'Informe de Incidente o Accidente', style: 'subheader', alignment: 'center' },
      {
        table: {
          widths: ['25%', '25%', '25%', '25%'], // Divide la tabla en 4 columnas
          body: [
            [
              { text: 'Comedor:', style: 'label' },
              { text: 'Fecha:', style: 'label' },
              { text: 'Tipo:', style: 'label' },
              { text: 'CUIT/CUIL:', style: 'label' },
            ],
            [
              { text: comedor || '', style: 'value' },
              { text: fecha || '', style: 'value' },
              { text: tipo || '', style: 'value' },
              { text: cuil || '', style: 'value' },
            ],
            [
              { text: 'Fecha de Ingreso:', style: 'label' },
              { text: 'Puesto:', style: 'label' },
              { text: 'Hora:', style: 'label' },
              { text: 'Lugar:', style: 'label' },
            ],
            [
              { text: fechaIngreso || '', style: 'value' },
              { text: puesto || '', style: 'value' },
              { text: hora || '', style: 'value' },
              { text: lugar || '', style: 'value' },
            ],
            [
              { text: 'Descripción:', style: 'label' },
              { text: 'Razón:', style: 'label' },
              { text: 'Lugar de la Lesión:', style: 'label' },
              { text: 'Medidas:', style: 'label' },
            ],
            [
              { text: descripcion || '', style: 'value' },
              { text: razon || '', style: 'value' },
              { text: lugarLesion || '', style: 'value' },
              { text: medidas || '', style: 'value' },
            ],
            [
              { text: 'Firma del Empleado:', style: 'label' },
              { text: 'Encargado:', style: 'label' },
              { text: 'Fecha del Informe:', style: 'label' },
              '',
            ],
            [
              { text: firmaEmpleado || '', style: 'value' },
              { text: encargado || '', style: 'value' },
              { text: date || '', style: 'value' },
              '',
            ],
          ],
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          hLineColor: () => 'gray',
          vLineColor: () => 'gray',
          paddingTop: (i) => (i === 0 ? 10 : 10),
        },
      },

    ];


    const checkboxesTable = {
      table: {
        widths: ['25%', '25%', '25%', '25%'], // Divide la tabla de checkboxes en 4 columnas
        body: [],
      },
      layout: {
        hLineWidth: () => 0,
        vLineWidth: () => 0,
        hLineColor: () => 'gray',
        vLineColor: () => 'gray',
      },
    };


    checkboxes.forEach((checkbox) => {
      checkboxesTable.table.body.push(
        [
          { text: checkbox.label, style: 'label' },
          { text: checkbox.check ? 'Sí' : 'No', style: 'value' },
          { text: '', style: 'label' },
          { text: '', style: 'value' },
        ],


      );
    });


    pdfContent.push(checkboxesTable);

    pdfContent.push({ text: 'Checkbox Accidente:', style: 'label' });


    checkboxesAccidente.forEach((checkbox) => {
      pdfContent[2].table.body.push([
        { text: checkbox.label, style: 'label' },
        { text: checkbox.check ? 'Sí' : 'No', style: 'value' },
        { text: checkbox.cualMaquina ? 'Máquina:' : '', style: 'label' },
        { text: checkbox.cualMaquina || '', style: 'value' },
      ]);
      pdfContent[2].table.body.push([
        { text: '', style: 'label' },
        { text: '', style: 'value' },
        { text: checkbox.cualAccion ? 'Acción:' : '', style: 'label' },
        { text: checkbox.cualAccion || '', style: 'value' },
      ]);
    });

    const documentDefinition = {
      content: pdfContent,
      styles,
    };

    pdfMake.createPdf(documentDefinition).download(`${form}_formulario.pdf`);
  }
  else if (form === "registrocapacitacion") {
    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 20],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 20],
      },
      label: {
        fontSize: 12,
        bold: true,
        margin: [0, 0, 10, 10],
        color: 'rgb(37, 35, 35)',
      },
      label1: {
        fontSize: 12,
        bold: true,
        margin: [0, 0, 40, 10],
        paddingTop: 30,
        color: 'rgb(37, 35, 35)',
      },
      value: {
        fontSize: 12,
        margin: [0, 0, 10, 10],
        color: 'black',
      },
    };

    const {
      fecha,
      tiempoDuracion,
      checkboxes,
      temas,
      materialEntregado,
      asistentes,
      observaciones,
      instructor,
      cargo,
      firma,
      date,
    } = formulario;

    const pdfContent = [
      { text: 'Formulario ONMODO', style: 'header', alignment: 'center' },
      { text: 'Registro de Capacitación', style: 'subheader', alignment: 'center' },
    ];


    const tableContent = {
      table: {
        widths: ['25%', '25%', '25%', '25%'],
        body: [],
      },
      layout: 'noBorders',
      margin: [0, 10, 0, 10],
    };


    tableContent.table.body.push([
      { text: 'Fecha:', style: 'label' },
      { text: fecha, style: 'value' },
      { text: 'Duración:', style: 'label' },
      { text: tiempoDuracion, style: 'value' },
    ]);


    checkboxes.forEach((checkbox) => {
      tableContent.table.body.push([
        { text: `${checkbox.label}:`, style: 'label' },
        { text: checkbox.check ? 'Sí' : 'No', style: 'value' },
        { text: '', style: 'label' },
        { text: '', style: 'value' },
      ]);
    });

    tableContent.table.body.push([
      { text: 'Temas:', style: 'label' },
      { text: temas, style: 'value', colSpan: 3 },
    ]);


    materialEntregado.forEach((item) => {
      tableContent.table.body.push([
        { text: `${item.label}:`, style: 'label' },
        { text: item.check ? 'Sí' : 'No', style: 'value' },
        { text: '', style: 'label' },
        { text: '', style: 'value' },
      ]);
    });


    asistentes.forEach((asistente, index) => {
      tableContent.table.body.push([
        { text: `Asistente ${index + 1}:`, style: 'label1' },
        { text: '', style: 'value' },
        { text: `Nombre:`, style: 'label' },
        { text: asistente.nombre, style: 'value' },
      ]);
      tableContent.table.body.push([
        { text: '', style: 'label' },
        { text: '', style: 'value' },
        { text: `DNI:`, style: 'label' },
        { text: asistente.dni, style: 'value' },
      ]);
      tableContent.table.body.push([
        { text: '', style: 'label' },
        { text: '', style: 'value' },
        { text: `Área:`, style: 'label' },
        { text: asistente.area, style: 'value' },
      ]);
      tableContent.table.body.push([
        { text: 'Firma:', style: 'label' },
        { text: asistente.firma, style: 'value' },
        { text: `Resultado:`, style: 'label' },
        { text: asistente.resultado, style: 'value' },
      ]);
      tableContent.table.body.push([
        { text: '', style: 'label' },
        { text: '', style: 'value' },
        { text: `Método:`, style: 'label' },
        { text: asistente.metodo, style: 'value' },
      ]);
    });

    tableContent.table.body.push([
      { text: 'Observaciones:', style: 'label' },
      { text: observaciones, style: 'value', colSpan: 3 },
    ]);

    tableContent.table.body.push([
      { text: 'Instructor:', style: 'label' },
      { text: instructor, style: 'value' },
      { text: 'Cargo:', style: 'label' },
      { text: cargo, style: 'value' },
    ]);

    tableContent.table.body.push([
      { text: 'Firma:', style: 'label' },
      { text: firma, style: 'value' },
      { text: 'Fecha del Registro:', style: 'label' },
      { text: date, style: 'value' },
    ]);


    pdfContent.push(tableContent);

    const documentDefinition = {
      content: pdfContent,
      styles,
    };

    pdfMake.createPdf(documentDefinition).download(`${form}_formulario.pdf`);
  }
  else if (form === "registrodecomiso") {
    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 20],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 40],
      },
      label: {
        fontSize: 12,
        bold: true,
        margin: [0, 0, 10, 30],
        color: 'rgb(37, 35, 35)',
      },
      value: {
        fontSize: 12,
        margin: [0, 0, 10, 10],
        color: 'black',
      },
    };

    pdfContent.push({ text: 'Formulario ONMODO', style: 'header', alignment: 'center' });
    pdfContent.push({ text: 'Registro de Decomiso', style: 'subheader', alignment: 'center' });

    const { inputs } = formulario;

    // Crear una tabla de 25% de ancho para cada columna
    const tableContent = {
      table: {
        widths: ['25%', '25%', '25%', '25%'],
        body: [],
      },
      layout: 'noBorders',
      margin: [0, 10, 0, 10],
    };

    // Agregar filas a la tabla para cada registro de decomiso
    inputs.forEach((input, index) => {
      tableContent.table.body.push(
        [
          { text: `Decomiso #${index + 1}`, style: 'label' },
          { text: `Fecha: ${input.fecha}`, style: 'value' },
          { text: `Turno: ${input.turno}`, style: 'value' },
          { text: `Producto Decomisado: ${input.productoDecomisado}`, style: 'value' },
        ],
        [
          { text: '', style: 'value' },
          { text: `Cantidad: ${input.cantidad}`, style: 'value' },
          { text: `Fuera de Fecha: ${input.fueraFecha}`, style: 'value' },
          { text: `Fuera de Aptitud: ${input.fueraAptitud}`, style: 'value' },
        ],
        [
          { text: '', style: 'value' },
          { text: `Otras Causas: ${input.otrasCausas}`, style: 'value' },
          { text: `Destino Final: ${input.destinoFinal}`, style: 'value' },
          { text: `Responsable: ${input.responsable}`, style: 'value' },
        ],
        [
          { text: '', colSpan: 4 }, // Celda vacía para separar los registros
        ]
      );
    });

    // Agregar la tabla al contenido del PDF
    pdfContent.push(tableContent);

    const documentDefinition = {
      content: pdfContent,
      styles,
    };

    pdfMake.createPdf(documentDefinition).download(`${form}_formulario.pdf`);
  }
  else if (form === "registrosimulacro") {
    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 20],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 20],
      },
      label: {
        fontSize: 12,
        bold: true,
        margin: [0, 0, 10, 10],
        color: 'rgb(37, 35, 35)',
      },
      value: {
        fontSize: 12,
        margin: [0, 0, 10, 10],
        color: 'black',
      },
    };

    pdfContent.push({ text: 'Formulario ONMODO', style: 'header', alignment: 'center' });
    pdfContent.push({ text: 'Registro de Simulacro', style: 'subheader', alignment: 'center' });

    const { razonSocial, ubicacion, localidad, fecha, personas } = formulario;

    const tableContent = {
      table: {
        widths: ['25%', '25%', '25%', '25%'],
        body: [],
      },
      layout: 'noBorders',
      margin: [0, 10, 0, 10],
    };

    tableContent.table.body.push(
      [
        { text: 'Razon Social:', style: 'label' },
        { text: razonSocial, style: 'value' },
        { text: 'Ubicación:', style: 'label' },
        { text: ubicacion, style: 'value' },
      ],
      [
        { text: 'Localidad:', style: 'label' },
        { text: localidad, style: 'value' },
        { text: 'Fecha:', style: 'label' },
        { text: fecha, style: 'value' },
      ]
    );

    pdfContent.push(tableContent);

    pdfContent.push({ text: "Personas Participantes:", style: 'subheader' });
    personas.forEach((persona, index) => {
      pdfContent.push(`Persona #${index + 1}`);
      pdfContent.push(`Nombre Completo: ${persona["Apellido y Nombre"]}`);
      pdfContent.push(`DNI: ${persona["Nro DNI"]}`);
      pdfContent.push(`Firma: ${persona["Firma"]}`);
      pdfContent.push("-----");
    });

    const documentDefinition = {
      content: pdfContent,
      styles,
    };

    pdfMake.createPdf(documentDefinition).download(`${form}_formulario.pdf`);
  }
  if (form === "reporterechazo") {
    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 20],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 20],
      },
      label: {
        fontSize: 12,
        bold: true,
        margin: [0, 5, 0, 0],
        color: 'rgb(37, 35, 35)',
      },
      value: {
        fontSize: 12,
        margin: [0, 0, 0, 5],
        border: [0, 0, 0, 0],
        fillColor: '#FFFFFF',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: [5, 5, 5, 5],
      },
    };
  
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
  
    const pdfContent = [
      { text: 'Formulario Reporte de Rechazo', style: 'header', alignment: 'center' },
      {
        table: {
          widths: ['50%', '50%'], // Cambiamos el ancho de la tabla a 50% - 50%
          body: [
            [{ text: 'Día:', style: 'label' }, { text: 'Proveedor:', style: 'label' }],
            [dia, proveedor],
            [{ text: 'Producto:', style: 'label' }, { text: 'Número de Lote:', style: 'label' }],
            [producto, nroLote],
          ],
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          hLineColor: () => 'gray',
          vLineColor: () => 'gray',
          paddingTop: () => 5,
          paddingBottom: () => 5,
        },
      },
      { text: 'Condiciones de Entrega:', style: 'subheader', margin: [0, 10, 0, 0] },
    ];
  
    condicionesEntrega.forEach((condicion, index) => {
      pdfContent.push(
        {
          table: {
            widths: ['50%', '50%'], // Cambiamos el ancho de la tabla a 50% - 50%
            body: [
              [{ text: `Condición #${index + 1}`, style: 'subheader', colSpan: 2 }, ''],
              ['Adelantado:', { text: condicion.adelantadoCheck, style: 'value' }],
              ['Descripción Adelantado:', { text: condicion.adelantadoDescription, style: 'value' }],
              ['Atrasado:', { text: condicion.atrasadoCheck, style: 'value' }],
              ['Descripción Atrasado:', { text: condicion.atrasadoDescription, style: 'value' }],
            ],
          },
          layout: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
            hLineColor: () => 'gray',
            vLineColor: () => 'gray',
            paddingTop: () => 5,
            paddingBottom: () => 5,
          },
        }
      );
    });
  
    // Sección Calidad
    pdfContent.push({ text: 'Calidad:', style: 'subheader', margin: [0, 10, 0, 0] });
  
    calidad.forEach((calidadItem, index) => {
      pdfContent.push(
        { text: ``, style: 'subheader', margin: [0, 10, 0, 0] }
      );
      const calidadItemContent = [];
      Object.keys(calidadItem).forEach(key => {
        calidadItemContent.push([{ text: `${key}:`, style: 'value' }, { text: calidadItem[key], style: 'value' }]);
      });
      pdfContent.push({
        table: {
          widths: ['50%', '50%'], // Cambiamos el ancho de la tabla a 50% - 50%
          body: calidadItemContent,
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          hLineColor: () => 'gray',
          vLineColor: () => 'gray',
          paddingTop: () => 5,
          paddingBottom: () => 5,
        },
      });
    });
  
    // Sección Diferencias
    pdfContent.push({ text: 'Diferencias:', style: 'subheader', margin: [0, 10, 0, 0] });
  
    diferencias.forEach((diferencia, index) => {
      pdfContent.push(
        { text: ``, style: 'subheader', margin: [0, 10, 0, 0] }
      );
      const diferenciaItemContent = [];
      Object.keys(diferencia).forEach(key => {
        diferenciaItemContent.push([{ text: `${key}:`, style: 'value' }, { text: diferencia[key], style: 'value' }]);
      });
      pdfContent.push({
        table: {
          widths: ['50%', '50%'], // Cambiamos el ancho de la tabla a 50% - 50%
          body: diferenciaItemContent,
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          hLineColor: () => 'gray',
          vLineColor: () => 'gray',
          paddingTop: () => 5,
          paddingBottom: () => 5,
        },
      });
    });
  
    // Sección Transporte
    pdfContent.push({ text: 'Transporte:', style: 'subheader', margin: [0, 10, 0, 0] });
  
    transporte.forEach((transporteItem, index) => {
      pdfContent.push(
        { text: ``, style: 'subheader', margin: [0, 10, 0, 0] }
      );
      const transporteItemContent = [];
      Object.keys(transporteItem).forEach(key => {
        transporteItemContent.push([{ text: `${key}:`, style: 'value' }, { text: transporteItem[key], style: 'value' }]);
      });
      pdfContent.push({
        table: {
          widths: ['50%', '50%'], // Cambiamos el ancho de la tabla a 50% - 50%
          body: transporteItemContent,
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          hLineColor: () => 'gray',
          vLineColor: () => 'gray',
          paddingTop: () => 5,
          paddingBottom: () => 5,
        },
      });
    });
  
    // Sección Medidas Tomadas
    pdfContent.push({ text: 'Medidas Tomadas:', style: 'subheader', margin: [0, 10, 0, 0] });
  
    medidasTomadas.forEach((medida, index) => {
      pdfContent.push(
        { text: ``, style: 'subheader', margin: [0, 10, 0, 0] }
      );
      const medidaItemContent = [];
      Object.keys(medida).forEach(key => {
        medidaItemContent.push([{ text: `${key}:`, style: 'value' }, { text: medida[key], style: 'value' }]);
      });
      pdfContent.push({
        table: {
          widths: ['50%', '50%'], // Cambiamos el ancho de la tabla a 50% - 50%
          body: medidaItemContent,
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          hLineColor: () => 'gray',
          vLineColor: () => 'gray',
          paddingTop: () => 5,
          paddingBottom: () => 5,
        },
      });
    });
  
    // Nombre del Administrador y Proveedor
    pdfContent.push([{ text: 'Nombre Administrador:', style: 'label' }, nombreAdministrador, '', '']);
    pdfContent.push([{ text: 'Nombre Proveedor:', style: 'label' }, nombreProveedor, '', '']);
  
    const documentDefinition = {
      content: pdfContent,
      styles,
    };
  
    pdfMake.createPdf(documentDefinition).download(`${form}_formulario.pdf`);
  }
  if (form === "verificacionbalanza") {
    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 20],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 10],
      },
      label: {
        fontSize: 12,
        bold: true,
        margin: [0, 5, 0, 0],
        color: 'rgb(37, 35, 35)',
      },
      value: {
        fontSize: 12,
        margin: [0, 0, 0, 5],
        border: [0, 0, 0, 0],
        fillColor: '#FFFFFF',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: [5, 5, 5, 5],
      },
      table: {
        margin: [0, 10, 0, 10],
      },
    };
  
    const {
      fecha,
      responsable,
      balanza,
      inputs,
      verified,
      fechaHora,
    } = formulario;
  
    const inputTableBody = [];
  
    inputs.forEach((input, index) => {
      inputTableBody.push(
        [
          { text: `Balanza #${index + 1}`, style: 'subheader', alignment: 'left', colSpan: 2 },
          '',
        ]
      );
  
      // Iterar sobre las claves de los datos de la balanza y formatearlas
      Object.keys(input).forEach((key) => {
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'); // Formato de título
        inputTableBody.push(
          [
            { text: `${formattedKey}:`, style: 'label' },
            { text: input[key], style: 'value' },
          ]
        );
      });
  
      inputTableBody.push(['', '']);
    });
  
    const inputTable = {
      table: {
        widths: ['50%', '50%'],
        body: [
          [
            { text: 'Balanzas:', style: 'label', colSpan: 2, alignment: 'center' },
            '',
          ],
          ...inputTableBody,
        ],
      },
      layout: {
        hLineWidth: () => 0,
        vLineWidth: () => 0,
        hLineColor: () => 'gray',
        vLineColor: () => 'gray',
        paddingTop: () => 5,
      },
    };
  
    const content = [
      { text: 'Formulario Verificación de Balanza', style: 'header', alignment: 'center' },
      { text: 'Verificación de Balanza', style: 'subheader', alignment: 'center' },
      { text: 'Fecha:', style: 'label' },
      { text: fecha, style: 'value' },
      { text: 'Responsable:', style: 'label' },
      { text: responsable, style: 'value' },
      { text: 'Balanza:', style: 'label' },
      { text: balanza, style: 'value' },
      { text: 'Verificado:', style: 'label' },
      { text: verified, style: 'value' },
      { text: 'Fecha y Hora:', style: 'label' },
      { text: fechaHora, style: 'value' },
      inputTable,
    ];
  
    const documentDefinition = {
      content,
      styles,
    };
  
    pdfMake.createPdf(documentDefinition).download(`verificacionbalanza_formulario.pdf`);
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


};
