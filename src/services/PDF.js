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
        fillColor: '#EAFFDC',
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
              { text: 'Firma Gerente:', style: 'label', colSpan: 3 },
              '',
              '',
            ],
            [
              { text: nombreGerente || '', style: 'value' },
              { text: firmaGerente || '', style: 'value', colSpan: 3 },
              '',
              '',
            ],
          ],
        },
        layout: {
          hLineWidth: () => 1, // Ancho de línea horizontal
          vLineWidth: () => 1, // Ancho de línea vertical
          hLineColor: () => 'black', // Color de línea horizontal
          vLineColor: () => 'black', // Color de línea vertical
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
        fillColor: '#EAFFDC',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: [5, 5, 5, 5],
      },
    };

    const { comedor, inputs, verified, date } = formulario;

    const content = [
      { text: 'Formulario ONMODO', style: 'header', alignment: 'center' },
      { text: 'Control Alergenos', style: 'subheader', alignment: 'center' },

      {
        table: {
          widths: ['33%', '33%', '34%'],
          body: [
            [
              { text: 'Comedor:', style: 'label' },
              { text: 'Verificado:', style: 'label' },
              { text: 'Fecha:', style: 'label' },
            ],
            [
              { text: comedor || '', style: 'value' },
              { text: verified || '', style: 'value' },
              { text: date || '', style: 'value' },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1, 
          hLineColor: () => 'black', 
          vLineColor: () => 'black', 
          paddingTop: (i) => (i === 0 ? 10 : 10),
          paddingBottom: (i) => (i === 1 ? 0 : 5), 
        },
      },

      { text: '', style: 'value', margin: [0, 30, 0, 0] },

      {
        table: {
          widths: ['20%', '20%', '20%', '20%', '20%'],
          body: [
            [
              { text: 'Fecha:', style: 'label' },
              { text: 'Nombre:', style: 'label' },
              { text: 'Diagnóstico:', style: 'label' },
              { text: 'Listado:', style: 'label' },
              { text: 'Responsable:', style: 'label' }, 
            ],
            ...inputs.map((input) => [
              { text: input.fecha || '', style: 'value' },
              { text: input.nombre || '', style: 'value' },
              { text: input.diagnostico || '', style: 'value' },
              { text: input.listado || '', style: 'value' },
              { text: input.responsable || '', style: 'value' }, 
            ]),
          ],
        },
        layout: {
          hLineWidth: () => 1, 
          vLineWidth: () => 1, 
          hLineColor: () => 'black',
          vLineColor: () => 'black', 
          paddingTop: (i) => (i === 0 ? 10 : 10),
        },
      },
    ];

    const documentDefinition = {
      content,
      styles,
    };

    pdfMake.createPdf(documentDefinition).download(`${form}_formulario.pdf`);
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
        margin: [0, 10, 0, 20], 
      },
      subheader1: {
        fontSize: 14,
        bold: true,
        margin: [0, 40, 0, 20], 
      },
      label: {
        fontSize: 12,
        bold: true,
        margin: [0, 5, 0, 0],
        color: 'rgb(37, 35, 35)',
      },
      value: {
        fontSize: 12,
        margin: [0, 0, 0, 10],
        border: [0.5, 0.5, 0.5, 0.5], 
        fillColor: '#EAFFDC',
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
          hLineWidth: () => 1, 
          vLineWidth: () => 1, 
          hLineColor: () => 'black', 
          vLineColor: () => 'black', 
          paddingTop: (i) => (i === 0 ? 10 : 10),
          paddingBottom: (i) => (i === 1 ? 0 : 5), 
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
        fillColor: '#EAFFDC',
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
          widths: ['25%', '25%', '25%', '25%'],
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
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => 'black', 
          vLineColor: () => 'black',
          paddingTop: (i) => (i === 0 ? 10 : 10),
          paddingBottom: (i) => (i === 1 ? 0 : 5), 
        },
      },
    ];

    const checkboxesTable = {
      table: {
        widths: ['50%', '50%'], 
        body: [],
      },
      layout: {
        hLineWidth: () => 1, 
        vLineWidth: () => 1, 
        hLineColor: () => 'black', 
        vLineColor: () => 'black', 
        paddingTop: (i) => (i === 0 ? 2 : 2),
        paddingBottom: (i) => (i === 1 ? 2 : 2), 
      },
    };
    pdfContent.push({ text: '', style: 'label' });
    checkboxes.forEach((checkbox) => {
      checkboxesTable.table.body.push([
        { text: checkbox.label, style: 'label' },
        { text: checkbox.check ? 'Sí' : 'No', style: 'value' },
      ]);
    });

    pdfContent.push(checkboxesTable);

    const checkboxesAccidenteTable = {
      table: {
        widths: ['50%', '50%'],
        body: [],
      },
      layout: {
        hLineWidth: () => 1, 
        vLineWidth: () => 1,
        hLineColor: () => 'black',
        vLineColor: () => 'black', 
        paddingTop: (i) => (i === 0 ? 2 : 2),
        paddingBottom: (i) => (i === 1 ? 2 : 2), 
      },
    };

    checkboxesAccidente.forEach((checkbox) => {
      checkboxesAccidenteTable.table.body.push([
        { text: checkbox.label, style: 'label' },
        { text: checkbox.check ? 'Sí' : 'No', style: 'value' },
      ]);
    });


    pdfContent.push(checkboxesAccidenteTable);

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
        margin: [0, 10, 0, 40],
      },
      label: {
        fontSize: 12,
        bold: true,
        margin: [0, 5, 0, 0],
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
        margin: [0, 0, 0, 10],
        border: [0.5, 0.5, 0.5, 0.5],

        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: [5, 5, 5, 5],
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

    const content = [
      { text: 'Formulario ONMODO', style: 'header', alignment: 'center' },
      { text: 'Registro de Capacitación', style: 'subheader', alignment: 'center' },
      {
        table: {
          widths: ['25%', '25%', '25%', '25%'],
          body: [],
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1, 
          hLineColor: () => 'black', 
          vLineColor: () => 'black', 
          paddingTop: (i) => (i === 0 ? 10 : 10),
          paddingBottom: (i) => (i === 1 ? 0 : 5), 
        },
        margin: [0, 10, 0, 10],
      },
    ];

    content[2].table.body.push(
      [
        { text: 'Fecha:', style: 'label' },
        { text: fecha, style: 'value' },
        { text: 'Duración:', style: 'label' },
        { text: tiempoDuracion, style: 'value' },
      ]
    );

    checkboxes.forEach((checkbox) => {
      content[2].table.body.push(
        [
          { text: `${checkbox.label}:`, style: 'label' },
          { text: checkbox.check ? 'Sí' : 'No', style: 'value', colSpan: 3 },
          { text: '', style: 'label' },
          { text: '', style: 'value' },
        ]
      );
    });

    content[2].table.body.push(
      [
        { text: 'Temas:', style: 'label' },
        { text: temas, style: 'value', colSpan: 3 },
      ]
    );

    materialEntregado.forEach((item) => {
      content[2].table.body.push(
        [
          { text: `${item.label}:`, style: 'label' },
          { text: item.check ? 'Sí' : 'No', style: 'value', colSpan: 3 },
          { text: '', style: 'label' },
          { text: '', style: 'value' },
        ]
      );
    });

    asistentes.forEach((asistente, index) => {
      content[2].table.body.push(
        [
          { text: `Asistente ${index + 1}`, style: 'label1', colSpan: 4 },
          { text: `Nombre:`, style: 'label', colSpan: 3 },
          { text: asistente.nombre, style: 'value' },
          { text: '', style: 'value' },
        ]
      );
      content[2].table.body.push(
        [
          { text: `DNI:`, style: 'label' },
          { text: asistente.dni, style: 'value' },
          { text: `Área:`, style: 'label' },
          { text: asistente.area, style: 'value' },
        ]
      );

      content[2].table.body.push(
        [
          { text: 'Firma:', style: 'label' },
          { text: asistente.firma, style: 'value' },
          { text: `Resultado:`, style: 'label' },
          { text: asistente.resultado, style: 'value' },
        ],
        [
          { text: `Método:`, style: 'label' },
          { text: asistente.metodo, style: 'value', colSpan: 3 },
          {},
          {},
        ],
      );

    });

    content[2].table.body.push(
      [
        { text: 'Observaciones:', style: 'label' },
        { text: observaciones, style: 'value', colSpan: 3 },
      ]
    );

    content[2].table.body.push(
      [
        { text: 'Instructor:', style: 'label' },
        { text: instructor, style: 'value' },
        { text: 'Cargo:', style: 'label' },
        { text: cargo, style: 'value' },
      ]
    );

    content[2].table.body.push(
      [
        { text: 'Firma:', style: 'label' },
        { text: firma, style: 'value' },
        { text: 'Fecha del Registro:', style: 'label' },
        { text: date, style: 'value' },
      ]
    );

    const documentDefinition = {
      content,
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
        margin: [0, 0, 0, 20],
        border: [0, 0, 0, 0],
        fillColor: '#EAFFDC',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: [5, 5, 5, 5],
      },
    };

    pdfContent.push({ text: 'Formulario ONMODO', style: 'header', alignment: 'center' });
    pdfContent.push({ text: 'Registro de Decomiso', style: 'subheader', alignment: 'center' });

    const { inputs } = formulario;

    const tableContent = {
      table: {
        widths: ['25%', '25%', '25%', '25%'],
        body: [],
      },
      layout: {
        hLineWidth: () => 1,
        vLineWidth: () => 1, 
        hLineColor: () => 'black',
        vLineColor: () => 'black', 
        paddingTop: (i) => (i === 0 ? 10 : 10),
        paddingBottom: (i) => (i === 1 ? 0 : 5), 
      },
      margin: [0, 10, 0, 10],
    };

    inputs.forEach((input, index) => {
      tableContent.table.body.push(
        //cantidad causa fecha productoDecomisado turno
        [
          { text: `Decomiso #${index + 1}`, style: 'label', alignment: 'center' },
          { text: `Fecha: ${input.fecha}`, style: 'value' },
          { text: `Turno: ${input.turno}`, style: 'value' },
          { text: `Causa: ${input.causa}`, style: 'value' },
        ],
        [
          { text: `Cantidad: ${input.cantidad}`, style: 'value', colSpan: 1 },
          { text: `Producto Decomisado: ${input.productoDecomisado}`, style: 'value', colSpan: 3  },
          { text: '' },
          { text: '' },
        ],


      );
    });

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
        margin: [0, 0, 0, 10], 
        border: [0.5, 0.5, 0.5, 0.5], 
        fillColor: '#EAFFDC',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: [5, 5, 5, 5],
      },
    };

    const pdfContent = [];

    pdfContent.push({ text: 'Formulario ONMODO', style: 'header', alignment: 'center' });
    pdfContent.push({ text: 'Registro de Simulacro', style: 'subheader', alignment: 'center' });

    const { razonSocial, ubicacion, localidad, fecha, personas } = formulario;

    const tableContent = {
      table: {
        widths: ['25%', '25%', '25%', '25%'],
        body: [],
      },
      layout: {
        hLineWidth: () => 1,
        vLineWidth: () => 1, 
        hLineColor: () => 'black', 
        vLineColor: () => 'black', 
        paddingTop: (i) => (i === 0 ? 10 : 10),
        paddingBottom: (i) => (i === 1 ? 0 : 5), 
      },
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

    pdfContent.push([
      { text: 'Personas Participantes:', style: 'label', colSpan: 4, margin: [0, 25, 0, 10] },
      {},
      {},
      {},
    ]);

    const personasTable = {
      table: {
        widths: ['25%', '25%', '25%', '25%'],
        body: [],
      },
      layout: {
        hLineWidth: () => 1, 
        vLineWidth: () => 1, 
        hLineColor: () => 'black', 
        vLineColor: () => 'black', 
        paddingTop: () => 5,
        paddingBottom: () => 5,
      },
      margin: [0, 10, 0, 10],
    };

    personasTable.table.body.push(
      [
        { text: 'Nombre Completo', style: 'label' },
        { text: 'DNI', style: 'label' },
        { text: 'Firma', style: 'label' },

      ]
    );

    personas.forEach((persona) => {
      personasTable.table.body.push(
        [
          { text: persona["Apellido y Nombre"], style: 'value' },
          { text: persona["Nro DNI"], style: 'value' },
          { text: persona["Firma"], style: 'value' },
        ]
      );
    });

    pdfContent.push(personasTable);

    const documentDefinition = {
      content: pdfContent,
      styles,
    };

    pdfMake.createPdf(documentDefinition).download(`${form}_formulario.pdf`);
  }
  else if (form === "reporterechazo") {
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
      {
        table: {
          widths: ['50%', '50%'],
          body: [
            [
              {
                text: 'Formulario Reporte de Rechazo',
                style: 'header',
                alignment: 'center',
                colSpan: 2,
              },
              {},
            ],
            [
              { text: 'Día:', style: 'label' },
              { text: 'Proveedor:', style: 'label' },
            ],
            [dia, proveedor],
            [
              { text: 'Producto:', style: 'label' },
              { text: 'Número de Lote:', style: 'label' },
            ],
            [producto, nroLote],
            [{ text: 'Condiciones de Entrega:', style: 'subheader', colSpan: 2 }, {}],
          ],
        },
        layout: {
          hLineWidth: () => 1,
          vLineWidth: () => 1,
          hLineColor: () => 'black',
          vLineColor: () => 'black',
          paddingTop: (i) => (i === 0 ? 1 : 1),
          paddingBottom: (i) => (i === 1 ? 1 : 1),
        },
      },
    ];

    condicionesEntrega.forEach((condicion, index) => {
      pdfContent[0].table.body.push(
        [
          { text: `Condición #${index + 1}`, style: 'subheader', colSpan: 2 },
          {},
        ],
        ['Adelantado:', { text: condicion.adelantado ? 'Sí' : 'No', style: 'value' }],
        ['Descripción Adelantado:', { text: condicion.adelantadoDescription, style: 'value' }],
        ['Atrasado:', { text: condicion.atrasado ? 'Sí' : 'No', style: 'value' }],
        ['Descripción Atrasado:', { text: condicion.atrasadoDescription, style: 'value' }]
      );
    });

    function createSectionTable(sectionData, sectionName) {
      pdfContent[0].table.body.push([
        { text: sectionName, style: 'subheader', colSpan: 2 },
        {},
      ]);

      sectionData.forEach((item) => {
        Object.keys(item).forEach((key) => {
          // Formatea el nombre de la clave para mostrarlo como título
          let formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');

          // Reemplaza "Description" con "Descripcion" en el nombre de la clave
          formattedKey = formattedKey.replace('Description', 'Descripcion');
          formattedKey = formattedKey.replace('Check', 'Control');

          let formattedValue = item[key];

          // Reemplaza "true" o "false" con "Si" o "No"
          if (typeof item[key] === 'boolean') {
            formattedValue = item[key] ? 'Si' : 'No';

            // Reemplaza "Check" con "Control" en el valor

          }

          pdfContent[0].table.body.push([
            { text: formattedKey + ':', style: 'label' },
            { text: formattedValue, style: 'value' },
          ]);
        });
      });
    }
    // Sección Calidad
    createSectionTable(calidad, 'Calidad');

    // Sección Diferencias
    createSectionTable(diferencias, 'Diferencias');

    // Sección Transporte
    createSectionTable(transporte, 'Transporte');

    // Sección Medidas Tomadas
    createSectionTable(medidasTomadas, 'Medidas Tomadas');

    // Nombre del Administrador y Proveedor
    pdfContent[0].table.body.push([
      { text: 'Nombre Administrador:', style: 'label' },
      { text: nombreAdministrador, style: 'value' },
    ]);
    pdfContent[0].table.body.push([
      { text: 'Nombre Proveedor:', style: 'label' },
      { text: nombreProveedor, style: 'value' },
    ]);


    const documentDefinition = {
      content: pdfContent,
      styles,
    };

    pdfMake.createPdf(documentDefinition).download(`${form}_formulario.pdf`);
  }
  else if (form === "verificacionbalanza") {
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
        color: 'black',
      },
      value: {
        fontSize: 12,
        margin: [0, 0, 0, 10],
        border: [0.5, 0.5, 0.5, 0.5], 
        fillColor: '#EAFFDC',
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
    });

    const inputTable = {
      table: {
        widths: ['50%', '50%'],
        body: [
          ...inputTableBody,
        ],
      },
      layout: {
        hLineWidth: () => 1, 
        vLineWidth: () => 1, 
        hLineColor: () => 'black', 
        vLineColor: () => 'black',
        paddingTop: (i) => (i === 0 ? 2 : 2),
        paddingBottom: (i) => (i === 1 ? 2 : 2), 
      },
    };

    const infoTable = {
      table: {
        widths: ['25%', '25%', '25%', '25%'],
        body: [
          [
            { text: 'Fecha:', style: 'label' },
            { text: fecha, style: 'value' },
            { text: 'Balanza/ Báscula:', style: 'label' },
            { text: balanza, style: 'value' },
          ],
        ],
      },
      layout: {
        hLineWidth: () => 1, 
        vLineWidth: () => 1, 
        hLineColor: () => 'black', 
        vLineColor: () => 'black',
        paddingTop: (i) => (i === 0 ? 2 : 2),
        paddingBottom: (i) => (i === 1 ? 0 : 2), 
      },
    };

    const content = [
      { text: 'Formulario Verificación de Balanza', style: 'header', alignment: 'center' },
      { text: 'Verificación de Balanza', style: 'subheader', alignment: 'center' },
      infoTable, // Agrega la tabla de información
      { text: '', style: 'subheader', alignment: 'center' },

      inputTable,
    ];

    const documentDefinition = {
      content,
      styles,
    };

    pdfMake.createPdf(documentDefinition).download(`verificacionbalanza_formulario.pdf`);
  }
  else if (form === "verificaciontermometros") {
    const content = [];
    content.push("Verificación de Termómetros");
  
    const {
      fecha,
      responsable,
      inputsTrimestral,
      inputsSemestral,
      verified,
      fechaHora,
    } = formulario;
  
    content.push(`Fecha: ${fecha}`);
    content.push(`Responsable: ${responsable}`);
    content.push(`Verificado: ${verified}`);
    content.push(`Fecha y Hora: ${fechaHora}`);
  
    // ... el resto de tu código ...
  
    const documentDefinition = {
      content,
      // Aquí puedes agregar estilos si los necesitas
    };
  
    pdfMake.createPdf(documentDefinition).download(`verificaciontermometros_formulario.pdf`);
  }
  else {
    return null
  }
}
