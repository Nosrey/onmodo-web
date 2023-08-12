import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './index.css';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import Menu from './components/Menu/Menu';
import Header from './components/Header/Header';
import AlergenosComida from './components/forms/PC/AlergenosComida';
import ConstanciaEntrega from './components/forms/PC/ConstanciaEntrega';
import EntregaBidonesAceiteUsado from './components/forms/PC/EntregaBidonesAceiteUsado';
import FlashReporteIncidente from './components/forms/PC/FlashReporteIncidente';
import InformeInternoAccidente from './components/forms/PC/InformeInternoAccidente';
import RegistroCapacitacion from './components/forms/PC/RegistroCapacitación';
import RegistroDeDecomiso from './components/forms/PC/RegistroDeDecomiso';
import RegistroSimulacro from './components/forms/PC/RegistroSimulacro';
import SaludManipuladores from './components/forms/PC/SaludManipuladores';
import ControlDeCloro from './components/forms/Phone/ControlDeCloro';
import ControlVidrios from './components/forms/Phone/ControlVidrios';
import DespachoProduccion from './components/forms/Phone/DespachoProduccion';
import RecuperacionProducto from './components/forms/Phone/RecuperacionProducto';
import Placeholder from './components/Placeholder/Placeholder';
import PlanillaDeArmadoFraccionamiento from './components/forms/PC/PlanillaDeArmadoFraccionamiento';
import ControlEquiposDeFrio from './components/forms/Phone/ControlEquiposDeFrio';
import ServiciosEnLinea from './components/forms/Phone/ServiciosEnLinea';
import DistribucionExpedicion from './components/forms/Phone/DistribucionExpedicion';
import VerificacionBalanza from './components/forms/VerificacionBalanza';
import Recepcion from './components/forms/Phone/Recepcion';
import Descongelamiento from './components/forms/Phone/Descongelamiento';
import ReporteDeRechazoDevolucionMaterias from './components/forms/PC/ReporteDeRechazoDevolucionMaterias';
import ControlProcesos from './components/forms/Phone/ControlProcesos';
import CargaRecepcion from './components/forms/Phone/CargaRecepcion';
import VerificacionTermometros from './components/forms/VerificacionTermometros';
import Sanitizacion from './components/forms/Phone/Sanitizacion';
import UsoCambioAceite from './components/forms/Phone/UsoCambioAceite';
import EPP from './components/forms/Phone/EPP';
import RecoverPassword from './components/recoverPassword/RecoverPassword';
import Inicio from './components/inicio/Inicio';
import Cuenta from './components/cuenta/Cuenta';
import Footer from './components/footer/Footer';
import FormulariosContainer from './components/formularios/FormulariosContainer';
import FormulariosCargados from './components/formulariosCargados/FormulariosCargados';
import FormCargado from './components/formulariosCargados/formCargado/FormCargado';
import CrearContraseña from './components/CrearContraseña/CrearContraseña';
import Cuentas from './views/Cuentas/Cuentas';


function App() {
  const location = useLocation();
  const currentLocation = location?.pathname;
  const isLoggedIn = !!localStorage.getItem('rol')
  return (
    <div className='App'>
      <>
        <div
          className='mainContent'
          style={{ position: 'relative', height: 'fit-content', minHeight: '100vh' }}
        >
          {currentLocation !== '/inicio-de-sesion' &&
          currentLocation !== '/crear-contraseña' &&
          currentLocation !== '/registro' &&
          currentLocation !== '/restablecer-contrasena' ? (
            <Header />
          ) : null}
          <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? '/inicio' : '/inicio-de-sesion'} />} />


            <Route path='/registro' element={<Register />} />
            <Route path='/forgotpassword' element={<RecoverPassword />} />
            <Route path='/inicio-de-sesion' element={<Login />} />

            <Route path='/restablecer-contrasena/:token' element={<CrearContraseña />} />

            <Route path='/inicio' element={<Inicio />} />

            <Route path='/cuenta' element={<Cuenta />} />
            <Route path='/cuentas' element={<Cuentas />} />
            <Route path='/formularios' element={<FormulariosContainer />} />

            <Route path='/formularios-cargados' element={<FormulariosCargados />} />

            <Route path='/formularios-cargados/:form' element={<FormCargado />} />


            {/* Forms */}
            <Route path='/dietas-especiales' element={<AlergenosComida />} />
            <Route path='/ropa-de-trabajo' element={<ConstanciaEntrega />} />
            <Route path='/bidones-de-aceite' element={<EntregaBidonesAceiteUsado />} />
            <Route path='/reporte-incidente' element={<FlashReporteIncidente />} />
            <Route path='/informe-accidente' element={<InformeInternoAccidente />} />
            <Route path='/registro-de-capacitacion' element={<RegistroCapacitacion />} />
            <Route path='/registro-decomisos-mp' element={<RegistroDeDecomiso />} />
            <Route path='/registro-simulacro' element={<RegistroSimulacro />} />
            {/* <Route path="/salud-manipuladores" element={ <SaludManipuladores/> } /> */}
            <Route path='/control-cloro' element={<ControlDeCloro />} />
            <Route path='/control-vidrios' element={<ControlVidrios />} />
            <Route path='/despacho-produccion' element={<DespachoProduccion />} />
            <Route path='/recuperacion-de-producto' element={<RecuperacionProducto />} />
            <Route path='/armado-fraccionamiento' element={<PlanillaDeArmadoFraccionamiento />} />
            <Route path='/equipos-frio' element={<ControlEquiposDeFrio />} />
            <Route path='/servicios-en-linea' element={<ServiciosEnLinea />} />
            <Route path='/distribucion-expedicion' element={<DistribucionExpedicion />} />
            <Route path='/verificacion-balanza' element={<VerificacionBalanza />} />
            <Route path='/verificacion-termometro' element={<VerificacionTermometros />} />
            <Route path='/recepcion' element={<Recepcion />} />
            <Route path='/descongelamiento' element={<Descongelamiento />} />
            <Route path='/rechazo-mp' element={<ReporteDeRechazoDevolucionMaterias />} />
            <Route path='/control-procesos' element={<ControlProcesos />} />
            <Route path='/carga-recepcion' element={<CargaRecepcion />} />
            <Route path='/sanitizacion' element={<Sanitizacion />} />
            <Route path='/cambio-aceite' element={<UsoCambioAceite />} />
            <Route path='/uso-epp' element={<EPP />} />

            {/* <Route path='/admin' element={<Admin/>}>
              </Route> */}
          </Routes>
          {currentLocation !== '/inicio-de-sesion' &&
          currentLocation !== '/crear-contraseña' &&
          currentLocation !== '/registro' &&
          currentLocation !== '/restablecer-contrasena' ? (
            <Footer />
          ) : null}
          
        </div>
        {/* </div> */}
      </>
    </div>
  );
}

export default App;
