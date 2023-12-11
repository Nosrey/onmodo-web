import React, { useEffect, useState } from 'react';
import styles from './Estadisticas.module.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { Oval } from 'react-loader-spinner';
import { getStats, getLegajosPorRol, getSolicitudesDeEdicion } from '../../services/Request';
import { FORMS_TITLES } from '../../utils/constants/data';

const Estadisticas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(null);
  const [distributionPerLevel, setDistributionPerLevel] = useState([]);
  const [provinceInfo, setProvinceInfo] = useState([]);
  const [formsData, setFormsData] = useState({});
  const [editRequests, setEditRequests] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getStats().then(res => {
    setTotalUsers(res.response.totalUsers);
    setProvinceInfo(res.response.provinciaCounts.sort((a, b) => b.usersCount - a.usersCount));
    setFormsData({total: res.response.totalFormularios, top3: res.response.top3Forms});
    });
    getLegajosPorRol('1-2-3').then(res => {
      numberPerRol(res);
    });
    getSolicitudesDeEdicion().then(res => {
      formatRequestsData(reduceRequests(res));
      setIsLoading(false);
    });
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