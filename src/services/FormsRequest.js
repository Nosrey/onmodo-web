const URL_API = 'http://localhost:8080';

// const URL_API = 'https://api.onmodoapp.com';

export const ejemplo = async ({ dato1, dato2 }) => {
  try {
    const response = await fetch(`${URL_API}/api/endpoint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dato1,
        dato2,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const registroCapacitacion = async (values) => {
  try {
    const formData = new FormData();
    // Agregar las propiedades de "values" al FormData
    for (const key in values) {
      if (Array.isArray(values[key])) {
        formData.append(key, JSON.stringify(values[key]));
      } else if (key === 'firma') {
        formData.append('firma', values[key]); // Puedes ajustar el índice según sea necesario
      } else {
        formData.append(key, values[key]);
      }
    }

    // Agregar otras propiedades como businessName, rol, nombre, etc., al FormData
    formData.append('businessName', localStorage.getItem('business'));
    formData.append('rol', localStorage.getItem('rol'));
    formData.append('nombre', localStorage.getItem('userName'));

    const response = await fetch(`${URL_API}/api/registrocapacitacion`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const entregaRopa = async (values) => {
  try {
    console.log('values:', values)
    const response = await fetch(`${URL_API}/api/entregaropa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        businessName: localStorage.getItem('business'),
        rol: localStorage.getItem('rol'),
        nombre: localStorage.getItem('userName'),
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

// export const controlAlergenos = async (values) => {
//   try {
//     const response = await fetch(`${URL_API}/api/controlalergenos`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         ...values,
//         businessName: localStorage.getItem("business"),
//         rol: localStorage.getItem("rol"),
//         nombre: localStorage.getItem("userName"),
//       }),
//     });
//     const data = await response.json();
//     return data;

//   } catch (error) {
//     console.error('Error', error);
//     throw error;
//   }
// };
export const controlAlergenos = async (values) => {
  try {
    const formData = new FormData();
    let info = {
      ...values,
      businessName: localStorage.getItem('business'),
      rol: localStorage.getItem('rol'),
      nombre: localStorage.getItem('userName'),
    };
    // Recorre el array de inputs y agrega los archivos a formData
    values.inputs.forEach((input, index) => {
      const inputFormData = new FormData();
      inputFormData.append('fecha', input.fecha);
      inputFormData.append('nombre', input.nombre);
      inputFormData.append('diagnostico', input.diagnostico);
      inputFormData.append('requiereRenovacion', input.requiereRenovacion);
      inputFormData.append('fechaRenovacion', input.fechaRenovacion);
      inputFormData.append('listado', input.listado);
      inputFormData.append('presentaCertificado', input.presentaCertificado);
      inputFormData.append('certificado', input.certificado);

      info.inputs[index] = inputFormData;
    });

    // Agrega los campos de texto al formData
    formData.append('comedor', info.comedor);
    formData.append('idUser', info.idUser);
    formData.append('inputs', info.inputs);
    formData.append('businessName', info.businessName);
    formData.append('nombre', info.nombre);
    formData.append('rol', info.rol);
    const response = await fetch(`${URL_API}/api/dietasespeciales`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const entregaBidones = async (values) => {
  try {
    const response = await fetch(`${URL_API}/api/entregabidones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        businessName: localStorage.getItem('business'),
        rol: localStorage.getItem('rol'),
        nombre: localStorage.getItem('userName'),
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const flashIncidente = async (values) => {
  try {
    const response = await fetch(`${URL_API}/api/flashincidente`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        businessName: localStorage.getItem('business'),
        rol: localStorage.getItem('rol'),
        nombre: localStorage.getItem('userName'),
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const informeIntAccidente = async (values) => {
  try {
    const formData = new FormData();
    for (const key in values) {
      if (Array.isArray(values[key])) {
        formData.append(key, JSON.stringify(values[key]));
      } else {
        formData.append(key, values[key]);
      }
    }

    formData.append('businessName', localStorage.getItem('business'));
    formData.append('rol', localStorage.getItem('rol'));
    formData.append('nombre', localStorage.getItem('userName'));


    const response = await fetch(`${URL_API}/api/informeintaccidente`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const registroDecomiso = async (values) => {
  try {
    const response = await fetch(`${URL_API}/api/registrodecomiso`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        businessName: localStorage.getItem('business'),
        rol: localStorage.getItem('rol'),
        nombre: localStorage.getItem('userName'),
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const registroSimulacro = async (values) => {
  const formData = new FormData();
  // Agregar las propiedades de "values" al FormData
  for (const key in values) {
    if (Array.isArray(values[key])) {
      formData.append(key, JSON.stringify(values[key]));
    } else if (key === 'firmaDoc') {
      formData.append('firmaDoc', values[key]); // Puedes ajustar el índice según sea necesario
    } else {
      formData.append(key, values[key]);
    }
  }

  // Agregar otras propiedades como businessName, rol, nombre, etc., al FormData
  formData.append('businessName', localStorage.getItem('business'));
  formData.append('rol', localStorage.getItem('rol'));
  formData.append('nombre', localStorage.getItem('userName'));

  try {
    const response = await fetch(`${URL_API}/api/registrosimulacro`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const reporteRechazo = async (values) => {
  try {
    const response = await fetch(`${URL_API}/api/reporterechazo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        businessName: localStorage.getItem('business'),
        rol: localStorage.getItem('rol'),
        nombre: localStorage.getItem('userName'),
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const verificacionBalanza = async (values) => {
  try {
    const response = await fetch(`${URL_API}/api/verificacionbalanza`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        businessName: localStorage.getItem('business'),
        rol: localStorage.getItem('rol'),
        nombre: localStorage.getItem('userName'),
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const verificacionTermometros = async (values) => {
  try {
    const response = await fetch(`${URL_API}/api/verificaciontermometros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        businessName: localStorage.getItem('business'),
        rol: localStorage.getItem('rol'),
        nombre: localStorage.getItem('userName'),
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const cargaForm = async (values) => {
  try {
    const response = await fetch(`${URL_API}/api/carga`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        businessName: localStorage.getItem('business'),
        rol: localStorage.getItem('rol'),
        nombre: localStorage.getItem('userName'),
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

/// PARA BORRAR

export const deleteForm = async (idForm, form) => {
  try {
    const response = await fetch(`${URL_API}/api/${form}/${idForm}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

// PARA EDITAR
export const sendEditApplication = async ({ values, formId, form }) => {
  try {
    const response = await fetch(`${URL_API}/api/${form}/${formId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};
