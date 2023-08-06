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

