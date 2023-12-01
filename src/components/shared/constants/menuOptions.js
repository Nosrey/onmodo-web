export const MENU_OPTIONS= [
    {
        title: 'Estadísticas',
        link: '/estadisticas',
        showToRol:[3,4]
      },
    {
      title: 'Formularios',
      link: '/formularios',
      showToRol:[1, 2, 3]
    },
    {
      title: 'Formularios cargados',
      link: '/formularios-cargados',
      showToRol:[1, 2, 3]
    },
    {
      title: 'Documentación',
      link: localStorage.getItem('linkDocumentacion'),
      showToRol:[1, 2, 3]
    },
    {
      title: 'Mi cuenta',
      link: '/cuenta',
      showToRol:[1, 4]
    },
    {
      title: 'Recordatorios',
      link: '/recordatorios',
      showToRol:[2,1]
    },
    {
      title: 'Solicitudes de Edición',
      link: '/solicitudes-edicion',
      showToRol:[2,3,4]
    },
    {
      title: 'Legajos',
      link: '/legajos',
      showToRol:[2,3,4]
    },
    {
      title: 'Cuentas',
      link: '/cuentas',
      showToRol:[2,3]
    },
    
    {
      title: 'Crear Cuenta',
      link: '/crear-cuenta',
      showToRol:[4]
    },
  ]