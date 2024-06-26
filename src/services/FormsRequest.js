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

    for (const key in values) {
      if (Array.isArray(values[key])) {
        formData.append(key, JSON.stringify(values[key]));
      }  else {
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
export const editRegistroCapacitacion = async (values, formId) => {
  try {
    const formData = new FormData();
    
    for (const key in values) {
      if (Array.isArray(values[key])) {
        formData.append(key, JSON.stringify(values[key]));
      }  else {
        formData.append(key, values[key]);
      }
    }

    const response = await fetch(`${URL_API}/api/registrocapacitacionedit/${formId}`, {
      method: 'PUT',
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
    const formData = new FormData();

    for (const key in values) {
      if (Array.isArray(values[key])) {
        formData.append(key, JSON.stringify(values[key]));
      }  else {
        formData.append(key, values[key]);
      }
    }

    // Agregar otras propiedades como businessName, rol, nombre, etc., al FormData
    formData.append('businessName', localStorage.getItem('business'));
    formData.append('rol', localStorage.getItem('rol'));
    formData.append('nombre', localStorage.getItem('userName'));
    const response = await fetch(`${URL_API}/api/entregaropa`, {
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
export const editEntregaRopa = async (values, formId) => {
  try {
    const formData = new FormData();

    for (const key in values) {
      if (Array.isArray(values[key])) {
        formData.append(key, JSON.stringify(values[key]));
      }  else {
        formData.append(key, values[key]);
      }
    }

    // Agregar otras propiedades como businessName, rol, nombre, etc., al FormData
    formData.append('businessName', localStorage.getItem('business'));
    formData.append('rol', localStorage.getItem('rol'));
    formData.append('nombre', localStorage.getItem('userName'));

    const response = await fetch(`${URL_API}/api/entregaropaedit/${formId}`, {
      method: 'PUT',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};
export const controlAlergenos = async (values) => {
  try {
    const response = await fetch(`${URL_API}/api/dietasespeciales`, {
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
export const editControlAlergenos = async (values, formId) => {
  try {
    const response = await fetch(`${URL_API}/api/dietasespecialesedit/${formId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        businessName: localStorage.getItem('business'),
        rol: localStorage.getItem('rol'),
        nombre: localStorage.getItem('userName'),
      }),
    });

    const data = await response.json();
    console.log('data: ', data)
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};
export const entregaBidones = async (values) => {
  try {
    const response = await fetch(`${URL_API}/api/entregabidones`, {
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
export const editEntregaBidones = async (values, formId) => {
  try {
    const response = await fetch(`${URL_API}/api/entregabidonesedit/${formId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
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
export const editFlashIncidente = async (values, formId) => {
  try {
    const response = await fetch(`${URL_API}/api/flashincidenteedit/${formId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
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
    console.log('values: ', values)
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

export const informeIntAccidenteEdit = async (values, id) => {
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


    const response = await fetch(`${URL_API}/api/informeintaccidenteedit/${id}`, {
      method: 'PUT',
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

export const editRegistroDecomiso = async (values, formId) => {
  try {
    const response = await fetch(`${URL_API}/api/registrodecomisoedit/${formId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
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

  // reviso las propiedades de formData
  for (var pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }

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

export const editRegistroSimulacro = async (values, formId) => {
  const formData = new FormData();
  // Agregar las propiedades de "values" al FormData
  for (const key in values) {
    if (Array.isArray(values[key])) {
      formData.append(key, JSON.stringify(values[key]));
    } else {
      formData.append(key, values[key]);
    }
  }
  
  try {
    const response = await fetch(`${URL_API}/api/registrosimulacroedit/${formId}`, {
      method: 'PUT',
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
export const editReporteRechazo = async (values , formId) => {
  try {
    const response = await fetch(`${URL_API}/api/reporterechazoedit/${formId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values
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
export const editVerificacionBalanza = async (values, formId) => {
  try {
    const response = await fetch(`${URL_API}/api/verificacionbalanzaedit/${formId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
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
export const editVerificacionTermometros = async (values, formId) => {
  try {
    const response = await fetch(`${URL_API}/api/verificaciontermometrosedit/${formId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values
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
  form = form === 'controlalergenos' ? 'dietasespeciales' : form
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
