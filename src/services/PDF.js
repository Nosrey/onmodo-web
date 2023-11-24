import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function cambiarFecha(value) {
  // en la fecha reemplazo los - por unos /
  if (!value) return ''
  let fecha = value.replace(/-/g, '/');
  return fecha;
}

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

    formulario = {
      ...formulario,
      asistentes: JSON.parse(formulario?.asistentes),
      checkboxes: JSON.parse(formulario?.checkboxes),
      materialEntregado: JSON.parse(formulario?.materialEntregado),
      materialExpuesto: JSON.parse(formulario?.materialExpuesto),      
    }

    console.log('formulario', formulario)
    const {
      fecha,
      tiempoDuracion,
      checkboxes,
      temas,
      materialEntregado,
      materialExpuesto,
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
        { text: cambiarFecha(fecha), style: 'value' },
        { text: 'Duración:', style: 'label' },
        { text: tiempoDuracion, style: 'value' },
      ]
    );
    
    if (checkboxes.length > 1) {
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
    }

    content[2].table.body.push(
      [
        { text: 'Temas:', style: 'label' },
        { text: temas, style: 'value', colSpan: 3 },
      ]
    );

    if (materialEntregado.length  > 1) {
      materialEntregado.forEach((item) => {
        content[2].table.body.push(
        [
          { text: (item.label === "Otros1" ? (item.label.slice(0, item.label.length - 1) + ":") : item.label + ":"), style: 'label' },
          { text: item.check ? 'Sí' : 'No', style: 'value' },
          { text: (item?.desc ? `¿Que otro?:` : ''), style: 'label' },
          { text: (item?.desc ? item?.desc : ''), style: 'value' }
        ]
        );
      });
    }

    if (materialExpuesto.length  > 1) {
      materialExpuesto.forEach((item) => {
        content[2].table.body.push(
          [
            { text: (item.label === "Otros2" ? (item.label.slice(0, item.label.length - 1) + ":") : item.label + ":"), style: 'label' },
          { text: item.check ? 'Sí' : 'No', style: 'value' },
          { text: (item?.desc ? `¿Que otro?:` : ''), style: 'label' },
          { text: (item?.desc ? item?.desc : ''), style: 'value' }
        ]
        );
      });
    }
      
    asistentes.forEach((asistente, index) => {
      content[2].table.body.push(
        [
          { text: `Asistente ${index + 1}`, style: 'label' },
          { text: '', style: 'value' },
          { text: ``, style: 'value' },
          { text: "", style: 'label' }
        ]
      );
      content[2].table.body.push(
        [
          { text: `Nombre:`, style: 'value' },
          { text: asistente.nombre, style: 'label' },
          { text: ``, style: 'label' },
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
          { text: `Producto Decomisado: ${input.productoDecomisado}`, style: 'value', colSpan: 3 },
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

    let newPersonas = []

    for (let i = 0; i < personas.length; i++) {
      newPersonas.push(JSON.parse(personas[i]))
    }

    newPersonas = newPersonas[0]

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
        { text: cambiarFecha(fecha), style: 'value' },
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
        

      ]
    );

    newPersonas.forEach((persona) => {
      personasTable.table.body.push(
        [
          { text: persona["nombreCompleto"], style: 'value' },
          { text: persona["dni"], style: 'value' },
          
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
    pdfContent.push({ text: 'Reporte de Rechazo/Devolución de Materias Primas', style: 'subheader', alignment: 'center' });



    let {
      dia,
      proveedor,
      producto,
      nroLote,
      condicionesEntrega,
      calidad,
      diferencias,
      transporte,
      medidasTomadas,
    } = formulario;

    console.log('dia: ', dia)


    dia = (dia ? dia : '')
    proveedor = (proveedor ? proveedor : '')
    producto = (producto ? producto : '')
    nroLote = (nroLote ? nroLote : '')
    condicionesEntrega = (condicionesEntrega ? condicionesEntrega : [])
    calidad = (calidad ? calidad : [])
    diferencias = (diferencias ? diferencias : [])
    transporte = (transporte ? transporte : [])
    medidasTomadas = (medidasTomadas ? medidasTomadas : [])


    pdfContent.push({
      table: {
        widths: ['50%', '50%'],
        body: [   
          [{ text: 'Dia:', style: 'subheader' }, { text: dia, style: 'subheader' }],
          [{ text: 'Proveedor:', style: 'subheader' }, { text: proveedor, style: 'subheader' }],
          [{ text: 'Producto:', style: 'subheader' }, { text: producto, style: 'subheader' }],
          [{ text: 'Nro Lote:', style: 'subheader' }, { text: nroLote, style: 'subheader' }],
        ],
      }
    })

    pdfContent.push({ text: 'Condiciones de entrega', style: 'subheader', alignment: 'center' });

    const columnWidths = ['50%', '50%'];

    pdfContent.push({
      table: {
        widths: columnWidths,
        body: [

          [{ text: 'Atrasado:', style: 'label' }, { text: ( (condicionesEntrega?.[0]?.checked ? 'Si - ' : 'No: ') + ((condicionesEntrega?.[0]?.description) ? condicionesEntrega?.[0]?.description : '')), style: 'value' }],
          [{ text: 'Adelantado:', style: 'label' }, { text: ( (condicionesEntrega?.[1]?.checked ? 'Si - ' : 'No: ') + ((condicionesEntrega?.[1]?.description) ? condicionesEntrega?.[1]?.description : '')), style: 'value' }],

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

    pdfContent.push({ text: 'Calidad', style: 'subheader', alignment: 'center' });

    pdfContent.push({
      table: {
        widths: columnWidths,
        body: [

          [
            { text: 'Temperatura:', style: 'label' }, 
            { text: ((calidad?.[0]?.checked ? 'Si - ' : 'No: ') + ((calidad?.[0]?.description) ? calidad?.[0]?.description : '')), style: 'value' }
          ],
          [
            { text: 'Vida útil:', style: 'label' }, 
            { text: ((calidad?.[1]?.checked ? 'Si - ' : 'No: ') + ((calidad?.[1]?.description) ? calidad?.[1]?.description : '')), style: 'value' }
          ],
          [
            { text: 'Embalaje:', style: 'label' }, 
            { text: ((calidad?.[2]?.checked ? 'Si - ' : 'No: ') + ((calidad?.[2]?.description) ? calidad?.[2]?.description : '')), style: 'value' }
          ],
          [
            { text: 'Rótulo:', style: 'label' }, 
            { text: ((calidad?.[3]?.checked ? 'Si - ' : 'No: ') + ((calidad?.[3]?.description) ? calidad?.[3]?.description : '')), style: 'value' }
          ],
          [
            { text: 'Calibre:', style: 'label' }, 
            { text: ((calidad?.[4]?.checked ? 'Si - ' : 'No: ') + ((calidad?.[4]?.description) ? calidad?.[4]?.description : '')), style: 'value' }
          ],
          [
            { text: 'Color:', style: 'label' }, 
            { text: ((calidad?.[5]?.checked ? 'Si - ' : 'No: ') + ((calidad?.[5]?.description) ? calidad?.[5]?.description : '')), style: 'value' }
          ],
          [
            { text: 'Signos de maduración:', style: 'label' }, 
            { text: ((calidad?.[6]?.checked ? 'Si - ' : 'No: ') + ((calidad?.[6]?.description) ? calidad?.[6]?.description : '')), style: 'value' }
          ]
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
    pdfContent.push({ text: ` `, style: 'subheader' });
    pdfContent.push({
      table: {
        widths: columnWidths,
        body: [

          [{ text: 'Consistencia/Textura:', style: 'label' }, { text: ((calidad?.[7]?.checked ? 'Si - ' : 'No: ') + ((calidad?.[7]?.description) ? calidad?.[7]?.description : '')), style: 'value' }],
          [{ text: 'Olor:', style: 'label' }, { text: ((calidad?.[8]?.checked ? 'Si - ' : 'No: ') + (calidad?.[8]?.description ? calidad?.[8]?.description : '')), style: 'value' }],

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

    pdfContent.push({ text: 'Diferencias', style: 'subheader', alignment: 'center' });
    
    pdfContent.push({
      table: {
        widths: columnWidths,
        body: [

          [{ text: 'Precio:', style: 'label' }, { text: ((diferencias?.[0]?.checked ? 'Si - ' : 'No: ') + (diferencias?.[0]?.description ? diferencias?.[0]?.description : '')), style: 'value' }],
          [{ text: 'Cantidad:', style: 'label' }, { text: ((diferencias?.[1]?.checked ? 'Si - ' : 'No: ') + (diferencias?.[1]?.description ? diferencias?.[1]?.description : '')), style: 'value' }],

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

    pdfContent.push({ text: 'Transporte', style: 'subheader', alignment: 'center' });

    pdfContent.push({
      table: {
        widths: columnWidths,
        body: [

          [{ text: 'Temperatura de la caja:', style: 'label' }, { text: ((transporte?.[0]?.checked ? 'Si - ' : 'No: ') + (transporte?.[0]?.description ? transporte?.[0]?.description : '')), style: 'value' }],
          [{ text: 'Uniforme del proveedor:', style: 'label' }, { text: ((transporte?.[1]?.checked ? 'Si - ' : 'No: ') + (transporte?.[1]?.description ? transporte?.[1]?.description : '')), style: 'value' }],
          [{ text: 'Predisposición /Conducta:', style: 'label' }, { text: ((transporte?.[2]?.checked ? 'Si - ' : 'No: ') + (transporte?.[2]?.description ? transporte?.[2]?.description : '')), style: 'value' }],
          [{ text: 'Vehículo:', style: 'label' }, { text: ((transporte?.[3]?.checked ? 'Si - ' : 'No: ') + (transporte?.[3]?.description ? transporte?.[3]?.description : '')), style: 'value' }],
          [{ text: 'Otras Faltas:', style: 'label' }, { text: ((transporte?.[4]?.checked ? 'Si - ' : 'No: ') + (transporte?.[4]?.description ? transporte?.[4]?.description : '')), style: 'value' }],         

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

    pdfContent.push({ text: 'MEDIDAS TOMADAS', style: 'subheader', alignment: 'center' });

    pdfContent.push({
      table: {
        widths: columnWidths,
        body: [

          [{ text: 'Rechazo (en el momento de la recepción):', style: 'label' }, { text: ((medidasTomadas?.[0]?.checked ? 'Si - ' : 'No: ') + (medidasTomadas?.[0]?.description ? medidasTomadas?.[0]?.description : '')), style: 'value' }],      
          [{ text: 'Devolución (lotes ya ingresados):', style: 'label' }, { text: ((medidasTomadas?.[1]?.checked ? 'Si - ' : 'No: ') + (medidasTomadas?.[1]?.description ? medidasTomadas?.[1]?.description : '')), style: 'value' }],      
          [{ text: 'Aceptado condicional (ante cambios de calidad de mercadería, sin peligros de inocuidad):', style: 'label' }, { text: ((medidasTomadas?.[2]?.checked ? 'Si - ' : 'No: ') + ( medidasTomadas?.[2]?.description ? medidasTomadas?.[2]?.description : '')), style: 'value' }],      

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

    pdfContent.push({ text: ` `, style: 'subheader' });
    pdfContent.push({ text: ` `, style: 'subheader' });

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
        color: 'red'
      },
      table: {
        margin: [0, 5, 0, 5],
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
    pdfContent.push({ text: 'Verificación de Instrumentos de Medición: Termometros', style: 'subheader', alignment: 'center' });

    const {
      fecha,
      responsable,
      inputsTrimestral,
      inputsSemestral,
    } = formulario;

    pdfContent.push({
      table: {
        widths: ['50%', '50%'],
        body: [   
          [{ text: 'fecha:', style: 'subheader' }, { text: cambiarFecha(fecha), style: 'subheader' }],
          [{ text: 'responsable:', style: 'subheader' }, { text: responsable, style: 'subheader' }],
        ],
      }
    })

    const columnWidths = ['50%', '50%'];

    inputsTrimestral.forEach((input, index) => {
      pdfContent.push({ text: `Trimestre ${index + 1}:`, style: 'subheader' });
      pdfContent.push({
        table: {
          widths: columnWidths,
          body: [

            [{ text: 'código:', style: 'label' }, { text: input?.["código"], style: 'value' }],

            [{ text: 'Tipo (PIN/IR):', style: 'label' }, { text: input?.["Tipo (PIN/IR)"], style: 'value' }],

            [{ text: 'Responsable del uso:', style: 'label' }, { text: input?.["responsabledeluso"], style: 'value' }],

            [{ text: 'área:', style: 'label' }, { text: input?.["área"], style: 'value' }],

            [{ text: 'punto 0:', style: 'label' }, { text: input?.["punto0"], style: 'value' }],

            [{ text: 'desvío 0:', style: 'label' }, { text: input?.["desvío0"], style: 'value' }],

            [{ text: 'punto 100:', style: 'label' }, { text: input?.["punto100"], style: 'value' }],

            [{ text: 'desvío 100:', style: 'label' }, { text: input?.["desvío100"], style: 'value' }],

            [{ text: 'Acciones de corrección:', style: 'label' }, { text: input?.["accionesdecorrección"], style: 'value' }],

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

    // lo  mismo de arriba  pero con inputsSemestral
    inputsSemestral.forEach((input, index) => {
      pdfContent.push({ text: `Semestre ${index + 1}:`, style: 'subheader' });
      pdfContent.push({
        table: {
          widths: columnWidths,
          body: [
            
            [{ text: 'código:', style: 'label' }, { text: input?.["código"], style: 'value' }],

            [{ text: 'área:', style: 'label' }, { text: input?.["área"], style: 'value' }],
            
            [{ text: 'Temp. termóm referencia:', style: 'label' }, { text: input?.["temp.termómreferencia"], style: 'value' }],        

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

      pdfContent.push({ text: ` `, style: 'subheader' });
      pdfContent.push({ text: ` `, style: 'subheader' });

      pdfContent.push({
        table: {
          widths: columnWidths,
          body: [
            
            [{ text: 'Temp. termóm evaluado:', style: 'label' }, { text: input?.["temp.termómevaluado"], style: 'value' }],

            [{ text: 'desvío:', style: 'label' }, { text: input?.["desvío"], style: 'value' }],

            [{ text: 'Acciones de corrección:', style: 'label' }, { text: input?.["accionesdecorrección"], style: 'value' }],

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
  else if (form === "entregaropa") {
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
    pdfContent.push({ text: 'Entrega de ropa de trabajo y EPP', style: 'subheader', alignment: 'center' });

    const {
      contrato,
      dni,
      direccion,
      localidad,
      cp,
      provincia,
      descripcion,
      checkboxes,
      inputs,
      infoAdicional,
      createdAt,
      nombreUsuario
    } = formulario;

    pdfContent.push({
      table: {
        widths: ['50%', '50%'],
        body: [   
          [{ text: 'Apellido y nombre:', style: 'subheader' }, { text: nombreUsuario, style: 'subheader' }],
          [{ text: 'Contrato:', style: 'subheader' }, { text: contrato, style: 'subheader' }],
          [{ text: 'DNI:', style: 'subheader' }, { text: dni, style: 'subheader' }],
          [{ text: 'Dirección:', style: 'subheader' }, { text: direccion, style: 'subheader' }],
          [{ text: 'Localidad:', style: 'subheader' }, { text: localidad, style: 'subheader' }],
          [{ text: 'Código Postal:', style: 'subheader' }, { text: cp, style: 'subheader' }],
          [{ text: 'Provincia:', style: 'subheader' }, { text: provincia, style: 'subheader' }],
          [{ text: 'Descripción:', style: 'subheader' }, { text: descripcion, style: 'subheader' }],          
          [{ text: 'Información adicional:', style: 'subheader' }, { text: infoAdicional, style: 'subheader' }],
        ],
      }
    })

    const columnWidths = ['50%', '50%'];



    inputs.forEach((input, index) => {
      pdfContent.push({ text: `Producto ${index + 1}:`, style: 'subheader' });
      pdfContent.push({
        table: {
          widths: columnWidths,
          body: [
            [{ text: 'Fecha:', style: 'label' }, { text: cambiarFecha(input?.fecha), style: 'value' }],

            [{ text: 'Producto:', style: 'label' }, { text: input?.Producto, style: 'value' }],

            [{ text: 'Tipo / modelo:', style: 'label' }, { text: input?.["Tipo / modelo"], style: 'value' }],

            [{ text: 'Posee certificacion:', style: 'label' }, { text: input?.["Posee certificacion"], style: 'value' }],
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
      pdfContent.push({ text: ` `, style: 'subheader' });
      pdfContent.push({ text: ` `, style: 'subheader' });
      pdfContent.push({
        table: {
          widths: columnWidths,
          body: [
            [{ text: 'Marca:', style: 'label' }, { text: input?.Marca, style: 'value' }],
 
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


     for (let i = 0; i < checkboxes.length; i++) {
      pdfContent.push({ text: "Ropa de trabajo", style: 'subheader' });
      pdfContent.push({ text: checkboxes[i]?.check0 ? 'Sí' : 'No', style: 'value' });

      pdfContent.push({ text: "Guantes", style: 'subheader' });
      pdfContent.push({ text: checkboxes[i]?.check1 ? 'Sí' : 'No', style: 'value' });

      pdfContent.push({ text: "Calzado de seguridad", style: 'subheader' });
      pdfContent.push({ text: checkboxes[i]?.check2 ? 'Sí' : 'No', style: 'value' });

      pdfContent.push({ text: "Antiparras", style: 'subheader' });
      pdfContent.push({ text: checkboxes[i]?.check3 ? 'Sí' : 'No', style: 'value' });

      pdfContent.push({ text: "Barbijo", style: 'subheader' });
      pdfContent.push({ text: checkboxes[i]?.check4 ? 'Sí' : 'No', style: 'value' });

      pdfContent.push({ text: "Cofia", style: 'subheader' });
      pdfContent.push({ text: checkboxes[i]?.check5 ? 'Sí' : 'No', style: 'value' });
      
      pdfContent.push({ text: "Otros", style: 'subheader' });
      pdfContent.push({ text: checkboxes[i]?.check6 ? 'Sí' : 'No', style: 'value' });

      checkboxes[i]?.check6 ? pdfContent.push({ text: "¿Que otros?:", style: 'value' }) : null;
      pdfContent.push({ text: checkboxes[i]?.textInputCheck6, style: 'value' });

     }



    const documentDefinition = {
      content: pdfContent,
      styles,
    };

    pdfMake.createPdf(documentDefinition).download(`${form}_formulario.pdf`);

  }
  else {
    return null
  }
}
