import React from 'react'
import Header from '../Header/Header'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import styles from './Home.module.css'
import ConstanciaEntrega from '../forms/PC/ConstanciaEntrega';
import AlergenosComida from '../forms/PC/AlergenosComida';
import EntregaBidonesAceiteUsado from '../forms/PC/EntregaBidonesAceiteUsado';
import FlashReporteIncidente from '../forms/PC/FlashReporteIncidente';
import SaludManipuladores from '../forms/PC/SaludManipuladores';
import RegistroCapacitacion from '../forms/PC/RegistroCapacitación';
import RegistroSimulacro from '../forms/PC/RegistroSimulacro';
import ControlVidrios from '../forms/Phone/ControlVidrios';
import DespachoProduccion from '../forms/Phone/DespachoProduccion';
import ControlDeCloro from '../forms/Phone/ControlDeCloro';
import RegistroDeDecomiso from '../forms/PC/RegistroDeDecomiso';


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


function Home() {

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            <Header />
            <div className={styles.main}>
                <div className={styles.container}>
                    <Accordion className={styles.accordion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Constancia de Entrega de Ropa de Trabajo y de E.P.P</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordion}>
                            <ConstanciaEntrega/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.accordion} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                            <Typography>Control de Alérgenos en las Comidas</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordion}>
                            <AlergenosComida/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.accordion} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                            <Typography>Entrega de Bidones de Aceite Usado</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordion}>
                            <EntregaBidonesAceiteUsado/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.accordion} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                            <Typography>Flash Reporte de Incidente</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordion}>
                            <FlashReporteIncidente/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.accordion} expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                            <Typography>Formulario de Salud para Manipuladores</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordion}>
                            <SaludManipuladores/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.accordion} expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
                            <Typography>Registro de Capacitación</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordion}>
                            <RegistroCapacitacion/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.accordion} expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
                            <Typography>Registro de Simulacro</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordion}>
                            <RegistroSimulacro/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.accordion} expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
                            <Typography>Control de Vidrios</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordion}>
                            <ControlVidrios/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.accordion} expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
                            <Typography>Control de cloro activo residual</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordion}>
                            <ControlDeCloro/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.accordion} expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                        <AccordionSummary aria-controls="panel10d-content" id="panel10d-header">
                            <Typography>Registros de decomisos de materias primas</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordion}>
                            <RegistroDeDecomiso/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={styles.accordion} expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
                        <AccordionSummary aria-controls="panel11d-content" id="panel11d-header">
                            <Typography>Planilla de Despacho a Producción</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordion}>
                            <DespachoProduccion/>
                        </AccordionDetails>
                    </Accordion>

                </div>
            </div>
        </div>
    )
}

export default Home