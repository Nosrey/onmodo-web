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

  useEffect(() => {
    setIsLoading(true);
    getStats().then(res => {
    setTotalUsers(res.response.totalUsers);
    setProvinceInfo(res.response.provinciaCounts);
    setFormsData({total: res.response.totalFormularios, top3: res.response.top3Forms});
    });
    getLegajosPorRol('1-2-3').then(res => {
      numberPerRol(res);
    });
    getSolicitudesDeEdicion().then(res => {
      console.log('res? ', reduceRequests(res).length)
      setIsLoading(false);
    });
  },[]);

  const numberPerRol = (arr) => {
    const totalRol1 = arr.filter(objeto => objeto.rol === 1).length;
    const totalRol2 = arr.filter(objeto => objeto.rol === 2).length;
    const totalRol3 = arr.filter(objeto => objeto.rol === 3).length;
    setDistributionPerLevel([
      totalRol1 > 0 && { id: 0, value: totalRol1, label: 'Nivel 1' },
      totalRol2 > 0 && { id: 1, value: totalRol2, label: 'Nivel 2' },
      totalRol3 > 0 && { id: 2, value: totalRol3, label: 'Nivel 3' },  
    ]);
  };

  const reduceRequests = (arr) => {
    return Object.values(arr).reduce((result, prop) => result.concat(prop), []);
  }

  const editionRequestsMock = [
    {title: 'Cantidad Total', info: '81'},
    {title: 'Cantidad Aprobados', info: '19'},
    {title: 'Cantidad Editados', info: '14'}
  ];

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
        <p className={styles.titleCard}>{provincia}</p>
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
  }

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
    ) : (
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
                <h3>Distribución por niveles</h3>
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
                <select name='' id={styles.select}>
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
                <h3>Más utilizados</h3>
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
                {editionRequestsMock.map((obj, i) => (
                  <SimpleInfoCard key={i} title={obj.title} info={obj.info} />
                ))}
              </div>
              <div className={styles.editionRequestsPie}>
                <h3>Estado de solicitud</h3>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: 'series A' },
                        { id: 1, value: 15, label: 'series B' },
                        { id: 2, value: 20, label: 'series C' },
                      ],
                    },
                  ]}
                  height={230}
                />
              </div>
            </div>
          </div>
      </div> 
    )}
    </>
  )
}

export default Estadisticas