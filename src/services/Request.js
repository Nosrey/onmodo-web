// const URL_API = 'http://localhost:8080';

const URL_API = 'https://api.onmodoapp.com';


export const login = async ({ legajo, password}) => {
    try {
      const response = await fetch(`${URL_API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          legajo,
          password
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };

  export const createPassword = async ( token, password) => {
    try {
      const response = await fetch(`${URL_API}/api/forgotpassword/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  };

  // values?.upload[0],
  export const createNewUSer  = async ({
    email,
    fullName,
    legajo,
    number,
    puesto,
    contratoComedor,
    rol,
    business,
    provincia,
    localidad,
    imgProfile,
  }) => {
    try {
      const formData = new FormData();
      formData.append('imgProfile', imgProfile);
      formData.append('email', email);
      formData.append('fullName', fullName);
      formData.append('legajo', legajo);
      formData.append('number', number);
      formData.append('puesto', puesto);
      formData.append('contratoComedor', contratoComedor);
      formData.append('rol', rol); // No need to parseInt here
      formData.append('business', business);
      formData.append('provincia', provincia);
      formData.append('localidad', localidad);
  
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
  

export const setPassword = async (password) => {
try {
    const response = await fetch(`${URL_API}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        password
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
    const resp = await fetch("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre");
    const data = await resp.json();
    return data.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } catch (error) {
    console.error('Error:', error);
    throw new Error('No se pudo obtener los datos del usuario.');
  }
};

export const getLocalidades = async (idProv) => {
  try {
    const resp = await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${idProv}&campos=id,nombre&max=500`);
    const data = await resp.json();

    return data.municipios.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } catch (error) {
    console.error('Error:', error);
    throw new Error('No se pudo obtener los datos del usuario.');
  }
};


/*
export const getUser = async (id = idUser) => {
  try {
    const resp = await fetch(`${URL_API}/api/users/${id}`);
    const data = await resp.json();
    localStorage.setItem(
      'precioData',
      JSON.stringify(data.response.precioData),
    );
    localStorage.setItem(
      'volumenData',
      JSON.stringify(data.response.volumenData),
    );
    localStorage.setItem('costoData', JSON.stringify(data.response.costoData));
    localStorage.setItem(
      'puestoQData',
      JSON.stringify(data.response.puestosQData),
    );
    localStorage.setItem(
      'puestoPData',
      JSON.stringify(data.response.puestosPData),
    );
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('No se pudo obtener los datos del usuario.');
  }
};

export const editBusinessInfo = async (
  businessName,
  businessModel,
  currency,
  imagePath,
) => {
  try {
    const formData = new FormData();
    formData.append('businessName', businessName);
    formData.append(
      'businessInfo',
      JSON.stringify([{ businessModel, currency }]),
    );
    formData.append('image', imagePath);

    const response = await fetch(`${URL_API}/api/users/${idUser}`, {
      method: 'PUT',
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    throw error;
  }
};


export const createVolumen = async ({ countryName, stats, idUser }) => {
  try {
    const response = await fetch(`${URL_API}/api/volumen`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        countryName,
        stats,
        idUser,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const deleteCountryPrecio = async (countryName) => {
  try {
    const response = await fetch(`${URL_API}/api/precio`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        countryName,
        idUser,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

export const deleteCountryCosto = async (countryName) => {
  try {
    const response = await fetch(`${URL_API}/api/costo`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        countryName,
        idUser,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};
export const createBienes = async (body) => {
  try {
    const response = await fetch(`/bienes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bienes: body,
        idUser,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};


const updatePuestosQData = (estructura, centroDeGastos) => {
  const oldPuestosQData = JSON.parse(localStorage.getItem('puestoQData'));
  let centrosC = oldPuestosQData[0].puestosq[0];
  const newData = { ...estructura };
  const keyArray = Object.keys(centroDeGastos);
  for (let i = 0; i < keyArray.length; i++) {
    if (centrosC[keyArray[i]]) {
      // si existe este CC
      if (newData[keyArray[i]].visible && centrosC[keyArray[i]].visible) {
        // tengo data de este cc me la traigo
        newData[keyArray[i]].puestos = centrosC[keyArray[i]].puestos;
      }
    }
  }
  let idUser = localStorage.getItem('userId');
  const info = { info: newData, idUser };
  createPuestosq(info);
};

const updatePuestosPData = (estructura, centroDeGastos) => {
  const oldPuestosPData = JSON.parse(localStorage.getItem('puestoPData'));
  let centrosC = oldPuestosPData[0].puestosp[0];
  const newData = { ...estructura };
  const keyArray = Object.keys(centroDeGastos);
  for (let i = 0; i < keyArray.length; i++) {
    if (centrosC[keyArray[i]]) {
      // si existe este CC
      if (newData[keyArray[i]].visible && centrosC[keyArray[i]].visible) {
        // tengo data de este cc me la traigo
        newData[keyArray[i]].puestos = centrosC[keyArray[i]].puestos;
      }
    }
  }
  let idUser = localStorage.getItem('userId');
  const info = { info: newData, idUser };
  createPuestosp(info);
};

*/
