import jsPDF from 'jspdf';
import 'jspdf-autotable';
import styles from '../components/forms/VerificacionBalanza.module.css';

export const generatePDF = (formulario, form) => {
    console.log(formulario)
    const table = document.querySelector(`.${styles.table}`);
    if (!table) {
      console.error('Table element not found.');
      return;
    }
    if (form == "flashincidente") {

      const pdf = new jsPDF();

      const tableData = [];
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const rowData = [
          formulario.alcance,
          formulario.linea,
          formulario.fecha,
          formulario.hora,
          formulario.comedor,
          formulario.responsable,
          formulario.incidentePotencial,
          formulario.tipo,
          formulario.descripcion,
          formulario.fotografia,
          formulario.acciones,
          formulario.nombreAsesor,
          formulario.firmaAsesor,
          formulario.nombreSupervisor,
          formulario.firmaSupervisor,
          formulario.nombreGerente,
          formulario.firmaGerente,];

        row.querySelectorAll('td').forEach(cell => {
          rowData.push(cell.textContent);
        });
        tableData.push(rowData);
      });

      const header = ['alcance', 'linea', 'fecha', 'hora', 'comedor', 'responsable', 'incidentePotencial',
        'tipo', 'descripcion', 'fotografia', 'acciones', 'nombreAsesor', 'firmaAsesor', 'nombreSupervisor',
        'firmaSupervisor', 'nombreGerente', 'firmaGerente'];

      pdf.autoTable({
        head: [header],
        body: tableData,
      });

      pdf.save('formulario.pdf');
    }
    if (form == "controlalergenos") {
      const pdf = new jsPDF();

      const tableData = [];
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const rowData = [
          formulario.comedor,
          formulario.inputs,
          formulario.verified,
          formulario.date,
        ];

        row.querySelectorAll('td').forEach(cell => {
          rowData.push(cell.textContent);
        });
        tableData.push(rowData);
      });

      const header = ['Comedor', 'Inputs', 'Verified', 'Date'];

      pdf.autoTable({
        head: [header],
        body: tableData,
      });

      pdf.save('formulario.pdf');

    }
    else if (form == "entregabidones") {
      const pdf = new jsPDF();

      const tableData = [];
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const rowData = [formulario.inputs];

        row.querySelectorAll('td').forEach(cell => {
          rowData.push(cell.textContent);
        });
        tableData.push(rowData);
      });

      const header = ['Inputs'];

      pdf.autoTable({
        head: [header],
        body: tableData,
      });

      pdf.save('formulario.pdf');
    }
    else if (form == "informeintaccidente") {
      const pdf = new jsPDF();

      const tableData = [];
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const rowData = [
          formulario.comedor,
          formulario.fecha,
          formulario.tipo,
          formulario.checkboxes,
          formulario.nombreApellido,
          formulario.cuil,
          formulario.fechaIngreso,
          formulario.puesto,
          formulario.hora,
          formulario.lugar,
          formulario.descripcion,
          formulario.checkboxesAccidente,
          formulario.lugarLesion,
          formulario.medidas,
          formulario.razon,
          formulario.firmaEmpleado,
          formulario.firmaAdm,
          formulario.encargado,
          formulario.date,
        ];

        row.querySelectorAll('td').forEach(cell => {
          rowData.push(cell.textContent);
        });
        tableData.push(rowData);
      });

      const header = ['comedor', 'fecha', 'tipo', 'checkboxes', 'nombreApellido', 'cuil', 'fechaIngreso',
        'puesto', 'hora', 'lugar', 'descripcion', 'checkboxesAccidente', 'medidas', 'razon',
        'firmaEmpleado', 'firmaAdm', 'encargado', 'date'];

      pdf.autoTable({
        head: [header],
        body: tableData,
      });

      pdf.save('formulario.pdf');
    }
    else if (form == "registrocapacitacion") {
      const pdf = new jsPDF();

      const tableData = [];
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const rowData = [formulario.fecha,
        formulario.tiempoDuracion,
        formulario.checkboxes,
        formulario.temas,
        formulario.materialEntregado,
        formulario.materialExpuesto,
        formulario.asistentes,
        formulario.observaciones,
        formulario.instructor,
        formulario.cargo,
        formulario.firma,
        formulario.date,
        formulario.metodo];

        row.querySelectorAll('td').forEach(cell => {
          rowData.push(cell.textContent);
        });
        tableData.push(rowData);
      });

      const header = ['fecha', 'tiempoDuracion', 'checkboxes', 'temas', 'materialEntregado', 'materialExpuesto', 'asistentes',
        'observaciones', 'instructor', 'cargo', 'firma', 'date', 'metodo'];

      pdf.autoTable({
        head: [header],
        body: tableData,
      });

      pdf.save('formulario.pdf');
    }
    else if (form == "registrodecomiso") {
      const pdf = new jsPDF();

      const tableData = [];
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const rowData = [formulario.inputs];

        row.querySelectorAll('td').forEach(cell => {
          rowData.push(cell.textContent);
        });
        tableData.push(rowData);
      });

      const header = ['Formulario'];

      pdf.autoTable({
        head: [header],
        body: tableData,
      });

      pdf.save('formulario.pdf');
    }
    else if (form == "registrosimulacro") {
      const pdf = new jsPDF();

      const tableData = [];
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const rowData = [    
          formulario.razonSocial,
          formulario.ubicacion,
          formulario.localidad,
          formulario.fecha,
          formulario.personas,
          formulario.firmaInstructor,
          ];

        row.querySelectorAll('td').forEach(cell => {
          rowData.push(cell.textContent);
        });
        tableData.push(rowData);
      });

      const header = ['razonSocial', 'ubicacion', 'localidad', 'fecha', 'personas', 'firmaInstructor'];

      pdf.autoTable({
        head: [header],
        body: tableData,
      });

      pdf.save('formulario.pdf');
    }
    else if (form == "reporterechazo") {
      const pdf = new jsPDF();

      const tableData = [];
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const rowData = [];

        row.querySelectorAll('td').forEach(cell => {
          rowData.push(cell.textContent);
        });
        tableData.push(rowData);
      });

      const header = ['Formulario'];

      pdf.autoTable({
        head: [header],
        body: tableData,
      });

      pdf.save('formulario.pdf');
    }
    else if (form == "verificacionbalanza") {
      const pdf = new jsPDF();

      const tableData = [];
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const rowData = [];

        row.querySelectorAll('td').forEach(cell => {
          rowData.push(cell.textContent);
        });
        tableData.push(rowData);
      });

      const header = ['Formulario'];

      pdf.autoTable({
        head: [header],
        body: tableData,
      });

      pdf.save('formulario.pdf');
    }
    else if (form == "verificaciontermometros") {
      const pdf = new jsPDF();

      const tableData = [];
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const rowData = [];

        row.querySelectorAll('td').forEach(cell => {
          rowData.push(cell.textContent);
        });
        tableData.push(rowData);
      });

      const header = ['Formulario'];

      pdf.autoTable({
        head: [header],
        body: tableData,
      });

      pdf.save('formulario.pdf');
    }
    else {
      return null
    }


  };