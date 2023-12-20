import React, { useEffect, useState } from 'react';
import styles from './Estadisticas.module.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';  
import { Oval } from 'react-loader-spinner';
import { getStats, getLegajosPorRol, getSolicitudesDeEdicion, getStatsForms } from '../../services/Request';
import { FORMS_TITLES } from '../../utils/constants/data';

const Estadisticas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(null);
  const [distributionPerLevel, setDistributionPerLevel] = useState([]);
  const [provinceInfo, setProvinceInfo] = useState([]);
  const [formsData, setFormsData] = useState({});
  const [editRequests, setEditRequests] = useState({});

  const formTitles = {
    controlCloro: 'Control de Cloro Activo Residual',
    controlEquipoFrio: 'Control de Equipos de Frio',
    controlVidrios: 'Control de Vidrios',
    chequeoEpp: 'Chequeo de uso de EPP',
    planillaArmado: 'Planilla de Armado y Fraccionamiento',
    registroCapacitacion: 'Registro de Capacitación',
    registroDecomiso: 'Planilla de Decomiso de Materias Primas',
    carga: 'Planilla de Carga / Recepción de Materias Primas',
    controlProcesos: 'Control de Procesos',
    descongelamiento: 'Planilla de Descongelamiento',
    despachoProduccion: 'Despacho a Producción',
    distribucion: 'Distribución / Expedición',
    recepcion: 'Planilla de Recepción',
    sanitizacion: 'Planilla de Sanitización',
    servicioEnLinea: 'Servicios en línea',
    recuperacionProducto: 'Recuperación de Productos',
    usoCambioAceite: 'Uso y Cambio de Aceite en Freidora',
    entregaBidones: 'Entrega de Bidones de Aceite Usado',
    reporteRechazo: 'Rechazo / Devolución de Materias Primas',
    verificacionBalanza: 'Verificación Balanzas',
    verificacionTermometros: 'Verificación Termómetros',
    entregaropa: 'Entrega de Ropa de Trabajo y EPP',
    dietasespeciales: 'Control de Comensales con dietas especiales',
    flashIncidente: 'Flash Reporte de Incidentes',
    informeIntAccidente: 'Informe interno de Accidente',
    registrosimulacro: 'Registro de Simulacro',
  };
  const formTitlesArray = Object.entries(formTitles).map(([key, value]) => ({ formType: key, title: value }));
  const [selectedForm, setSelectedForm] = useState(formTitlesArray[0].formType);
  const meses = {
    0: 'Todo el año',
    1: 'Enero', 
    2: 'Febrero', 
    3: 'Marzo', 
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9:'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre'
  };
  const months = Object.entries(meses).map(([key, value]) => ({month: key, title: value}));

  const [selectedMonth, setSelectedMonth] = useState(parseInt(months[0].month));
  const [formDates, setFormDates] = useState([]);
  const [selectedFormDate, setSelectedFormDate] = useState(0);
  const [currentYear, setCurrentYear] = useState('');
  const [numberOfForms, setNumberOfForms] = useState(0);
  const [allFormStats, setAllFormStats] = useState([]);
  const [barData, setBarData] = useState([]);
  
  useEffect(() => {
    setIsLoading(true);
    setCurrentYear(new Date().getFullYear());
    getStats().then(res => {
    setTotalUsers(res.response.totalUsers);
    setProvinceInfo(res.response.provinciaCounts.sort((a, b) => b.usersCount - a.usersCount));
    setFormsData({total: res.response.totalFormularios, top3: res.response.top3Forms});
    });
    getStatsForms().then(res => {
      setAllFormStats(res.formsPerYear);
      formatFormStats(res.formsPerYear);
      handleNumberOfForms(res.formsPerYear);
      fillMonthCounts(res.formsPerYear);
    });
    getLegajosPorRol('1-2-3').then(res => {
      numberPerRol(res);
    });
    getSolicitudesDeEdicion().then(res => {
      formatRequestsData(reduceRequests(res));
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const numberPerRol = (arr) => {
    const totalRol1 = arr.filter(objeto => objeto.rol === 1).length;
    const totalRol2 = arr.filter(objeto => objeto.rol === 2).length;
    const totalRol3 = arr.filter(objeto => objeto.rol === 3).length;
    const filteredDistributionLevels = [
      totalRol1 > 0 && { id: 0, value: totalRol1, label: 'Nivel 1' },
      totalRol2 > 0 && { id: 1, value: totalRol2, label: 'Nivel 2' },
      totalRol3 > 0 && { id: 2, value: totalRol3, label: 'Nivel 3' },  
    ].filter(Boolean);
    setDistributionPerLevel(filteredDistributionLevels);
  };

  const reduceRequests = (arr) => {
    return Object.values(arr).reduce((result, prop) => result.concat(prop), []);
  };

  const formatRequestsData = (arr) => {
    const approvedForms = arr.filter((form) => form.status === 'approved');
    const editedForms = arr.filter((form) => form.status === 'approved' && !form.editEnabled);
    const pendingForms = arr.filter((form) => form.status === 'pending');
    const rejectedForms = arr.filter((form) => form.status === 'denied');

    const requestsData = {
      cardsData: [
        {title: 'Cantidad Total', qty: arr.length},
        {title: 'Cantidad Aprobados', qty: approvedForms.length},
        {title: 'Cantidad Editados', qty: editedForms.length},
      ],
      pieData: [
        approvedForms.length > 0 && {id: 0, value: approvedForms.length, label: 'Aprobados'},
        pendingForms.length > 0 && {id: 1, value: pendingForms.length, label: 'Pendientes'},
        rejectedForms.length > 0 && {id: 2, value: rejectedForms.length, label: 'Rechazados'}
      ].filter(Boolean)
    };
    setEditRequests(requestsData);
  };

  const handleSortChange = (event) => {
    setIsLoading(true);
    const value = event.target.value;
    if(value === 'Cantidad de Personas'){
      const sorted = [...provinceInfo].sort((a, b) => b.usersCount - a.usersCount);
      setProvinceInfo(sorted);
    }else if(value === 'Cantidad de Formularios'){
      const sorted = [...provinceInfo].sort((a, b) => b.formulariosCount - a.formulariosCount);
      setProvinceInfo(sorted);
    }
    setIsLoading(false);
  };

  const formatFormStats = (data) => {
    const uniqueYearsSet = new Set();
    data.forEach((item) => {
      if (item.totalFormsPerYear && item.totalFormsPerYear.yearReference) {
        uniqueYearsSet.add(item.totalFormsPerYear.yearReference);
      }
    });
    setFormDates(Array.from(uniqueYearsSet).sort((a, b) => b - a));
  }
  
  const findForm = (data) => {
    return data.find((form) => form.formType.toLowerCase() === selectedForm.toLowerCase());
  }

  const handleNumberOfForms = (data) => {
    const formSelectedInfo = findForm(data);
    setNumberOfForms(formSelectedInfo?.totalFormsPerYear.count);
  };

  useEffect(() => {
    handleFormSelectChanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedForm, selectedMonth])

  const handleFormSelectChanges = () => {
    const formSelected = findForm(allFormStats);
    if(formSelected) {
      if(selectedMonth === 0) {
        fillMonthCounts(formSelected);
        setNumberOfForms(formSelected.totalFormsPerYear?.count);
      }else {
        const monthInfo = formSelected.formsPerMonth.find((el) => el.month === selectedMonth)
        setNumberOfForms(monthInfo ? monthInfo.count : 0)
      }
    }else {
      setNumberOfForms(0)
    }
  }

  const fillMonthCounts = (formSelected) => {
    let form = Array.isArray(formSelected) 
      ? findForm(formSelected) 
      : formSelected;
    const monthCounts = Array.from({length: 12}, () => 0);
    form.formsPerMonth?.forEach((item) => {
      const index = item.month - 1;
      monthCounts[index] = item.count;
    })
    return setBarData(monthCounts);
  }

  const SimpleInfoCard = ({title, info}) => {
    return (
      <div className={styles.simpleInfoCard}>
        <p className={styles.titleCard}>{title}</p>
        <p className={styles.infoCard}>{info}</p>
      </div>
    )
  };

  const ComplexInfoCard = ({provincia, personas, formularios}) => {
    return (
      <div className={styles.complexInfoCard}>
        <p className={styles.titleCard}>{provincia === 'Ciudad Autónoma de Buenos Aires' ? 'CABA' : provincia}</p>
        <div className={styles.cardMainContainer}>
          <div className={styles.complexDescriptionContainer}>
            <p className={styles.numberCard}>{personas}</p>
            <span className={styles.descriptionCard}>Personas</span>
          </div>
          <div className={styles.complexDescriptionContainer}>
            <p className={styles.numberCard}>{formularios}</p>
            <span className={styles.descriptionCard}>Formularios</span>
          </div>
        </div>
      </div>
    )
  };

  return (
    <>
    {isLoading ? (
      <Oval
        height={30}
        width={30}
        color='#4fa94d'
        wrapperStyle={{
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingTop: '60px',
          paddingBottom: '60px',
          justifyContent: 'center'
        }}
        wrapperClass=''
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor='#4fa94d'
        strokeWidth={5}
        strokeWidthSecondary={2}
      />
    ) : 
    <>
      {
        formsData &&
        <div className='form'>
        <h2 className={styles.screenTitle}> Panel de Estadísticas </h2>
        <div className='titleContainer'>
          <h3 className='title'>Personal</h3>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.panelContainer}>
            <div className={styles.panelInfo}>
              <SimpleInfoCard title={'Cantidad Total'} info={totalUsers} />
            </div>
            <div className={styles.panelPie}>
              <h3 className={styles.graphTitle}>Distribución por niveles</h3>
                {distributionPerLevel.length > 0 && <PieChart
                  series={[
                    {
                      data: distributionPerLevel,
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                  ]}
                  height={230}
                />}
            </div>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className='titleContainer'>
            <h3 className='title'>Distribución geográfica</h3>
          </div>
          <div className={styles.orderContainer}>
              <span className={styles.spanOrder}>Ordenar por:</span>
              <select name='' id={styles.select} onChange={handleSortChange}>
                <option className={styles.spanOption} value='Cantidad de Personas'>Cantidad de Personas</option>
                <option className={styles.spanOption} value='Cantidad de Formularios'>Cantidad de Formularios</option>
              </select>
          </div>
          <div className={styles.cardGrid}>
            {provinceInfo.map((obj, i) => (
              <ComplexInfoCard key={i} provincia={obj.provincia} personas={obj.usersCount} formularios={obj.formulariosCount} />
            ))}
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className='titleContainer'>
            <h3 className='title'>Formularios</h3>
          </div>
          <div className={`${styles.formsContainer} ${styles.fromsContainerMobile}`}>
            <SimpleInfoCard title={'Cantidad Total'} info={formsData.total} />
            <div className={styles.mostUsed}>
              <h3 className={styles.graphTitle}>Más utilizados</h3>
              <div className={styles.mostUsedInfo}>
                <div className={styles.mostUsedContainer}>
                  <span className={styles.mostUsedNumber}>1</span>
                  <p>{FORMS_TITLES[formsData.top3[0]]}</p>
                </div>
                <div className={styles.mostUsedContainer}>
                  <span className={styles.mostUsedNumber}>2</span>
                  <p>{FORMS_TITLES[formsData.top3[1]]}</p>
                </div>
                <div className={styles.mostUsedContainer}>
                  <span className={styles.mostUsedNumber}>3</span>
                  <p>{FORMS_TITLES[formsData.top3[2]]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className='titleContainer'>
            <h3 className='title'>Uso de Formularios en el tiempo</h3>
          </div>
          <div className={styles.orderContainer} style={{justifyContent: 'space-between'}}>
            <div className={styles.orderContainerChild} style={{width: '40%'}}>
              <span className={styles.spanOrder}>Ordenar por:</span>
              <select name='' id={styles.select} onChange={(e) => setSelectedForm(e.target.value)} className={`${styles.customizedSelects} ${styles.firstCustomizedSelect}`}>
                {formTitlesArray.map((form, i) => (
                  <option key={i} className={styles.spanOption} value={form.formType}>{form.title}</option>
                ))}
              </select>
            </div>
            <div className={styles.orderContainerChild} style={{width: '60%'}}>
              <div>
                <span style={{margin: '0 10px'}}>:</span>
                <select name='' id={styles.select} onChange={(e) => setSelectedMonth(parseInt(e.target.value))} className={styles.customizedSelects}>
                  {months.map((mes, i) => (
                    <option key={i} className={styles.spanOption} value={mes.month}>{mes.title}</option>
                  ))}
                </select>
              </div>
              <select name='' id={styles.select} onChange={setSelectedFormDate} className={styles.customizedSelects}>
                <option className={styles.spanOption} value={currentYear}>{currentYear}</option>
                {formDates.map((year, i) => (
                  currentYear !== year && <option key={i} className={styles.spanOption} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={`${styles.formsContainer} ${styles.fromsContainerBarMobile}`}>
            <SimpleInfoCard title={'Cantidad Total'} info={numberOfForms ? numberOfForms : 0} />
            {selectedMonth === 0 &&
              <div style={{flex: '1'}}>
                <BarChart
                    xAxis={[
                      {
                        id: 'barCategories',
                        data: months.filter((month) => month.title !== 'Todo el año').map((month) => month.title),
                        scaleType: 'band',
                      },
                    ]}
                    series={[
                      {
                        data: barData,
                      },
                    ]}
                    height={300}
                  />
              </div>
            }
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className='titleContainer'>
            <h3 className='title'>Solicitudes de Edición</h3>
          </div>
          <div className={styles.editionContainer}>
            <div className={styles.editionRequestsContainer}>
              {editRequests.cardsData.map((obj, i) => (
                <SimpleInfoCard key={i} title={obj.title} info={obj.qty} />
              ))}
            </div>
            <div className={styles.editionRequestsPie}>
              <h3 className={styles.graphTitle}>Estado de solicitud</h3>
              {editRequests.pieData.length > 0 && <PieChart
                series={[
                  {
                    data: editRequests.pieData,
                  },
                ]}
                height={230}
              />}
            </div>
          </div>
        </div>
    </div> 
      }
      </>
    }
    </>
  )
}

export default Estadisticas