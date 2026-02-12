import React, { useState } from 'react';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoImage from './assets/PT_BBP_LOGODASHBOARD.png';
import { Bar } from 'react-chartjs-2';
import GradingFICurrentMonth from './GradingFICiurrentMonth';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement
);


const sidebarStyles = `
.sidebar {
  background-color: #ffffff;
  border-right: 1px solid #f1f1f1;
  transition: width 0.3s ease, padding 0.3s ease;
}
.hover-bg-secondary:hover { background-color: #e9ecef; }
.sidebar-closed { width: 0 !important; padding: 0 !important; overflow: hidden !important; }
.sidebar-toggle-btn { cursor: pointer; font-size: 24px; z-index: 999; }
`;

const customStyles = `
* { margin: 0!important; padding: 0 !important; box-sizing: border-box; }
html, body, #root { background-color: #f8f9fa; }

.header-bg { 
    background-color: #ffffff; 
    padding: 8px 0; 
    border-bottom: none !important; 
}

.company-name { font-size: 0.7rem; margin-bottom: 3px; font-weight: normal; color: #1B211A; }
.title-style { font-weight: bold; font-size: 1.8rem; margin-bottom: 0; color: #1B211A; }
.subtitle-style { font-weight: bold; font-size: 2.2rem; color: #5a1a3d; line-height: 1; }

.date-box { background-color: #1e293b; color: white; padding: 6px 14px; text-align: center; font-weight: bold; font-size: 0.9rem; border-radius: 5px; }
.reject-button { background-color:  #9370DB; color: white; font-weight: bold; font-size: 0.9rem; border-radius: 15px; padding: 4px 15px; border: none; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
.back-button { background-color: #9370DB; color: white; font-weight: bold; font-size: 0.9rem; border-radius: 15px; padding: 4px 15px; border: none; }

.content-area { background-color: white; padding: 1.5rem !important; }
.content-title { font-weight: bold; color: #36454F; font-size: 1.5rem; margin-bottom: 10px; }

.table-header { background-color: #535353 !important; color: white !important; font-weight: normal !important; font-size: 0.9rem; text-align: center; vertical-align: middle; }
.table-row-odd { background-color: #ffffff !important; }
.table-row-even { background-color: #f2f2f2 !important; }
.custom-td { color: black; font-size: 0.85rem; padding: 0.6rem !important; border: none !important; }
.table-total-row { background-color: #7f7f7f !important; color: white !important; font-weight: bold; font-size: 0.9rem; }

.chart-card { background-color: #262626; color: white; padding: 15px; height: 500px; border-radius: 5px; border: none; }
`;


const rejectData = [
    { bulan: 'January-2025', workcenter: 'GRADING_FI', dicek: 21441, oke: 19831, reject: 1585, persen: 7.39 },
    { bulan: 'February-2025', workcenter: 'GRADING_FI', dicek: 24426, oke: 22293, reject: 2130, persen: 8.72 },
    { bulan: 'March-2025', workcenter: 'GRADING_FI', dicek: 31730, oke: 30224, reject: 1506, persen: 4.75 },
    { bulan: 'April-2025', workcenter: 'GRADING_FI', dicek: 20622, oke: 19282, reject: 1082, persen: 5.25 },
    { bulan: 'May-2025', workcenter: 'GRADING_FI', dicek: 31745, oke: 30233, reject: 1512, persen: 4.76 },
    { bulan: 'June-2025', workcenter: 'GRADING_FI', dicek: 35555, oke: 34075, reject: 1489, persen: 4.19 },
    { bulan: 'July-2025', workcenter: 'GRADING_FI', dicek: 33790, oke: 31930, reject: 1857, persen: 5.50 },
    { bulan: 'August-2025', workcenter: 'GRADING_FI', dicek: 496, oke: 461, reject: 35, persen: 7.06 },
    { bulan: 'September-2025', workcenter: 'GRADING_FI', dicek: 0, oke: 0, reject: 0, persen: 0.00 },
    { bulan: 'Oktober-2025', workcenter: 'GRADING_FI', dicek: 0, oke: 0, reject: 0, persen: 0.00 },
    { bulan: 'November-2025', workcenter: 'GRADING_FI', dicek: 0, oke: 0, reject: 0, persen: 0.00 },
    { bulan: 'Desember-2025', workcenter: 'GRADING_FI', dicek: 0, oke: 0, reject: 0, persen: 0.00 },
];

const totalData = { dicek: 199805, oke: 188329, reject: 11196, persen: 5.60 };

const chartData = {
    labels: rejectData.slice(0, 7).map(d => d.bulan),
    datasets: [
        {
            type: 'bar',
            label: 'Reject',
            data: rejectData.slice(0, 7).map(d => d.reject),
            backgroundColor: '#ffff00',
            yAxisID: 'y1',
            barPercentage: 0.6,
            order: 2, 
        },
        {
            type: 'line',
            label: '% Reject',
            data: rejectData.slice(0, 7).map(d => d.persen / 100),
            borderColor: '#a0aec0',
            pointBackgroundColor: 'white',
            yAxisID: 'y2',
            tension: 0,
            borderWidth: 2,
            pointRadius: 4,
            order: 1, 
        },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        title: { display: true, text: 'Reject Rate Grading FI', color: 'white', font: { size: 20, weight: 'bold' } }
    },
    scales: {
        x: { ticks: { color: 'white', font: { size: 10 } }, grid: { display: false } },
        y1: { type: 'linear', position: 'left', ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' }, min: 0, max: 2500 },
        y2: { type: 'linear', position: 'right', ticks: { color: 'white', callback: (v) => (v * 100).toFixed(2) + '%' }, grid: { display: false }, min: 0, max: 0.10 }
    }
};

const PercentageLabelsFI = ({ chartData, chartOptions }) => {
    const dataRates = chartData.datasets[1].data;
    const dataCounts = chartData.datasets[0].data;
    const labelsCount = chartData.labels.length;
    const PADDING_LEFT = 12; 
    const PADDING_RIGHT = 10;
    const plotWidth = 100 - PADDING_LEFT - PADDING_RIGHT;
    const barSpace = plotWidth / labelsCount;

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <Bar data={chartData} options={chartOptions} />
            {dataRates.map((rate, index) => {
                const leftPos = PADDING_LEFT + (index * barSpace) + (barSpace / 2);
                const lineYPos = 40 + (1 - (rate / 0.10)) * 340; 
                return (
                    <div 
                        key={`rate-${index}`} 
                        style={{ 
                            position: 'absolute', 
                            top: `${lineYPos - 25}px`, 
                            left: `${leftPos}%`, 
                            transform: 'translateX(-50%)', 
                            color: '#ff4d4d', 
                            fontSize: '12px', 
                            fontWeight: 'bold', 
                            pointerEvents: 'none',
                            zIndex: 10 
                        }}
                    >
                        {(rate * 100).toFixed(2)}%
                    </div>
                );
            })}
            {dataCounts.map((count, index) => {
                const leftPos = PADDING_LEFT + (index * barSpace) + (barSpace / 2);
                const barYPos = 40 + (1 - (count / 2500)) * 340;
                return (
                    <div 
                        key={`count-${index}`} 
                        style={{ 
                            position: 'absolute', 
                            top: `${barYPos + 10}px`, 
                            left: `${leftPos}%`, 
                            transform: 'translateX(-50%)', 
                            color: '#9c0000', 
                            fontSize: '11px', 
                            fontWeight: 'bold', 
                            pointerEvents: 'none',
                            zIndex: 5
                        }}
                    >
                        {count.toLocaleString()}
                    </div>
                );
            })}
        </div>
    );
};


const Sidebar = () => {
    const navigate = useNavigate();
   
    const getLinkClass = (path) => {
        const isActive = window.location.pathname === path;
        let classes = "d-block p-2 text-decoration-none rounded mb-1 small text-dark";
        if (isActive) classes += " bg-success fw-bold text-white";
        else classes += " hover-bg-secondary";
        return classes;
    };

    const handleLogout = () => {
        if (window.confirm("Apakah anda yakin ingin keluar?")) {
            localStorage.removeItem('isLoggedIn');
            navigate('/');
        }
    };

    return (
        <div className="sidebar p-3 text-dark h-100 d-flex flex-column justify-content-between flex-shrink-0" style={{ width: '250px', minWidth: '250px' }}>
       
            <div>
                <div className="mb-4">
               
                    <img src={LogoImage} alt="PT BBP Logo"
                        className="img-fluid"
                        style={{ maxWidth: '100%', borderRadius: '4px', padding: '5px' }} />
                </div>

                <div className="small">
                    <p className="fw-bold text-dark mb-2 mt-2"> Pengiriman</p>
                    <a href="/shipment" className={getLinkClass('/shipment')}>Plan Vs Actual Shipment</a>
                    <a href="/rencana-pengiriman" className={getLinkClass('/rencana-pengiriman')}>Rencana Pengiriman</a>

                    <p className="fw-bold text-dark mb-2 mt-4">Overview Reject Rate</p>
                    <a href="/reject-by-machine" className={getLinkClass('/reject-by-machine')}>Reject by Machine</a>
                    <a href="/reject-qc-fg" className={getLinkClass('/reject-qc-fg')}>Reject Rate QC Grading FG</a>
                    <a href="/reject-qc-fi" className={getLinkClass('/reject-qc-fi')}>Reject Rate FI</a>

                    <p className="fw-bold text-muted mb-1 mt-3 ps-2" style={{ fontSize: '11px' }}>Detail Overview</p>

                    <a href="/reject-hotpress" className={getLinkClass('/reject-hotpress')} style={{ paddingLeft: '1.5rem' }}>Reject Hotpress</a>
                    <a href="/reject-blow-detector" className={getLinkClass('/reject-blow-detector')} style={{ paddingLeft: '1.5rem' }}>Reject Blow Detector</a>
                    <a href="/reject-sanding" className={getLinkClass('/reject-sanding')} style={{ paddingLeft: '1.5rem' }}>Reject Sanding</a>
                    <a href="/reject-grading-fg" className={getLinkClass('/reject-grading-fg')} style={{ paddingLeft: '1.5rem' }}>Reject Grading FG</a>
                    <a href="/reject-grading-fi" className={getLinkClass('/reject-grading-fi')} style={{ paddingLeft: '1.5rem' }}>Reject Grading FI</a>

                    <p className="fw-bold text-dark mb-2 mt-4">Kedatangan Bahan Baku</p>
                    <a href="/log-arrival" className={getLinkClass('/log-arrival')}>Performance Kedatangan Log Purchasing</a>
                    <a href="/log-supply" className={getLinkClass('/log-supply')}>Asal Log</a>
                </div>
            </div>

          
            <div className="pt-4 border-top">
                <button
                    onClick={handleLogout}
                    className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                    style={{ borderRadius: '8px', fontWeight: 'bold' }}
                >
                    <span style={{ fontSize: '18px' }}></span> Logout
                </button>
            </div>
        </div>
    );
};


const RejectGradingFI = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isDetailView, setIsDetailView] = useState(false);

    return (
        <div className="d-flex dashboard-bg min-vh-100">
            <style>{sidebarStyles}</style>
            <style>{customStyles}</style>
            <div className="position-absolute top-0 start-0 p-3 sidebar-toggle-btn text-success" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ fontSize: "24px", cursor: "pointer", lineHeight: "1", marginTop: "5px", marginLeft: "5px", zIndex: 1000 }}>⋮</div>
            <div className={sidebarOpen ? "" : "sidebar-closed"}><Sidebar /></div>
            <div className="flex-grow-1 position-relative">
                <Container fluid className="p-0">
                    <Row className="header-bg align-items-center m-0 border-0">
                        <Col xs={7} className="ps-5 py-3">
                            <p className="company-name" style={{ paddingLeft: '35px' }}>PT.BAHANA BHUMIPHALA PERSADA</p>
                            <div className="title-style" style={{ paddingLeft: '35px' }}>
                                Overview <span className="subtitle-style">GRADING FI</span> 2025
                            </div>
                        </Col>
                        <Col xs={5} className="d-flex justify-content-end align-items-center pe-5">
                            <div className="date-box me-3">Friday, 01 August 2025</div>
                            
                            {!isDetailView ? (
                                <Button className="reject-button" onClick={() => setIsDetailView(true)}>
                                    Current Month
                                </Button>
                            ) : (
                                <Button className="back-button" onClick={() => setIsDetailView(false)}>
                                    Back to Overview
                                </Button>
                            )}
                        </Col>
                    </Row>

              
                    {!isDetailView ? (
                        <Row className="content-area m-0">
                            <Col md={6}>
                                <h4 className="content-title">REJECT PER BULAN</h4>
                                <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                                    <Table borderless className="mt-2">
                                        <thead>
                                            <tr>
                                                <th className="table-header">Tahun</th>
                                                <th className="table-header">Bulan</th>
                                                <th className="table-header">Workcenter</th>
                                                <th className="table-header">Produk Di Cek</th>
                                                <th className="table-header">Produk Oke</th>
                                                <th className="table-header">Reject</th>
                                                <th className="table-header">% Reject</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rejectData.map((d, index) => (
                                                <tr key={index} className={index % 2 === 0 ? "table-row-odd" : "table-row-even"}>
                                                    <td className="custom-td text-center">2025</td>
                                                    <td className="custom-td text-start ps-3">{d.bulan}</td>
                                                    <td className="custom-td text-center">{d.workcenter}</td>
                                                    <td className="custom-td text-center">{d.dicek.toLocaleString()}</td>
                                                    <td className="custom-td text-center">{d.oke.toLocaleString()}</td>
                                                    <td className="custom-td text-center">{d.reject.toLocaleString()}</td>
                                                    <td className="custom-td text-center">{d.persen.toFixed(2)}%</td>
                                                </tr>
                                            ))}
                                            <tr className="table-total-row">
                                                <td colSpan="3" className="custom-td text-center">TOTAL</td>
                                                <td className="custom-td text-center">{totalData.dicek.toLocaleString()}</td>
                                                <td className="custom-td text-center">{totalData.oke.toLocaleString()}</td>
                                                <td className="custom-td text-center">{totalData.reject.toLocaleString()}</td>
                                                <td className="custom-td text-center">{totalData.persen.toFixed(2)}%</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                            <Col md={6}>
                                <h4 className="content-title">CHART REJECT</h4>
                                <Card className="chart-card mt-2">
                                    <PercentageLabelsFI chartData={chartData} chartOptions={chartOptions} />
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                        
                        <div className="content-area m-0 p-0">
                            <GradingFICurrentMonth />
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default RejectGradingFI;