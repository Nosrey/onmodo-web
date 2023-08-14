const URL_API = 'https://api.onmodoapp.com';

export const ejemplo = async ({ dato1, dato2}) => {
    try {
      const response = await fetch(`${URL_API}/api/endpoint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dato1,
          dato2
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
      const response = await fetch(`${URL_API}/api/registrocapacitacion`, {
        method: 'POST',
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
  
  export const entregaRopa = async (values) => {
    try {
      const response = await fetch(`${URL_API}/api/entregaropa`, {
        method: 'POST',
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

  export const controlAlergenos = async (values) => {
    try {
      const response = await fetch(`${URL_API}/api/controlalergenos`, {
        method: 'POST',
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

  export const entregaBidones = async (values) => {
    try {
      const response = await fetch(`${URL_API}/api/entregabidones`, {
        method: 'POST',
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

  export const flashIncidente = async (values) => {
    try {
      const response = await fetch(`${URL_API}/api/flashincidente`, {
        method: 'POST',
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

  export const informeIntAccidente = async (values) => {
    try {
      const response = await fetch(`${URL_API}/api/informeintaccidente`, {
        method: 'POST',
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

  export const registroDecomiso = async (values) => {
    try {
      const response = await fetch(`${URL_API}/api/registrodecomiso`, {
        method: 'POST',
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

  export const registroSimulacro = async (values) => {
    try {
      const response = await fetch(`${URL_API}/api/registrosimulacro`, {
        method: 'POST',
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

  export const reporteRechazo = async (values) => {
    try {
      const response = await fetch(`${URL_API}/api/reporterechazo`, {
        method: 'POST',
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

  export const verificacionBalanza = async (values) => {
    try {
      const response = await fetch(`${URL_API}/api/verificacionbalanza`, {
        method: 'POST',
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

  export const verificacionTermometros = async (values) => {
    try {
      const response = await fetch(`${URL_API}/api/verificaciontermometros`, {
        method: 'POST',
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