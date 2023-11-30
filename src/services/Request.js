const URL_API = 'http://localhost:8080';

// const URL_API = 'https://api.onmodoapp.com';

export const login = async ({ legajo, password }) => {
  try {
    const response = await fetch(`${URL_API}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        legajo,
        password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const createPassword = async (token, password) => {
  try {
    const response = await fetch(`${URL_API}/api/forgotpassword/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const createNewUSer = async (values) => {
  try {
    const formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }

    const response = await fetch(`${URL_API}/api/register`, {
      method: 'POST',
      body: formData, // Use 'body' instead of 'data' for FormData
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const editUser = async (values) => {
  const id = localStorage.getItem('idUser');
  try {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    const response = await fetch(`${URL_API}/api/user/${id}`,{
      method: 'PUT',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const setPassword = async (password) => {
  try {
    const response = await fetch(`${URL_API}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const restablecerPassword = async (email) => {
  try {
    const response = await fetch(`${URL_API}/api/restablecer-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const getUserInfo = async (id) => {
  try {
    const resp = await fetch(`${URL_API}/api/business/${id}`);
    const data = await resp.json();
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('No se pudo obtener los datos del usuario.');
  }
};

export const getProvincias = async () => {
  try {
    const resp = await fetch('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre');
    const data = await resp.json();

    return data.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } catch (error) {
    console.error('Error:', error);
    throw new Error('No se pudo obtener los datos del usuario.');
  }
};

export const getLocalidades = async (idProv) => {
  try {
    const resp = await fetch(
      `https://apis.datos.gob.ar/georef/api/municipios?provincia=${idProv}&campos=id,nombre&max=500`
    );
    const data = await resp.json();

    return data.municipios.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } catch (error) {
    console.error('Error:', error);
    throw new Error('No se pudo obtener los datos del usuario.');
  }
};

export const getSolicitudesDeEdicion = async () => {
  const businessName = localStorage.getItem('business');
  try {
    const resp = await fetch(`${URL_API}/api/pendingedition/${businessName}`);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('No se pudo obtener los datos del usuario.');
  }
};

export const getLegajosPorRol = async (nivel) => {
  const businessName = localStorage.getItem('business');
  try {
    const res = await fetch(`${URL_API}/api/rol${nivel}/${businessName}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error: ', error);
    throw new Error('No se pudo obtener los legajos.');
  }
};

export const deleteLegajo = async (legajo) => {
  const businessName = localStorage.getItem('business');
  try {
    const res = await fetch(`${URL_API}/api/users/${legajo}/${businessName}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
}

//** REMINDERS */
export const createReminder = async ({
  tarea,
  descripcion,
  link,
  linkTitle,
  frecuencia,
  fechaInicio,
  fechas,
  status,
}) => {
  try {
    const response = await fetch(`${URL_API}/api/recordatorio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tarea,
        descripcion,
        link,
        linkTitle,
        frecuencia,
        fechaInicio,
        fechas,
        status,
        idUser: localStorage.getItem('idUser'),
        businessName: localStorage.getItem('business'),
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const getReminders = async (businessName) => {
  try {
    const resp = await fetch(`${URL_API}/api/recordatorio/${businessName}`);
    const data = await resp.json();
    return data.recordatorios;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('No se pudieron obtener recordatorios.');
  }
};

export const deleteReminder = async (recordatorioId) => {
  try {
    const response = await fetch(`${URL_API}/api/recordatorio/${recordatorioId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      // sin body ?
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const editReminder = async ({ values, recordatorioId }) => {
  try {
    const response = await fetch(`${URL_API}/api/recordatorio/${recordatorioId}`, {
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

//** FIN REMINDERS */
