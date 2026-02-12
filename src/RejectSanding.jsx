import React, { useState } from 'react';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoImage from './assets/PT_BBP_LOGODASHBOARD.png';
import SandingCurrentMonth from './SandingCurrentMonth';
import { Bar } from 'react-chartjs-2';
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

.hover-bg-secondary:hover {
  background-color: #e9ecef;
}

.sidebar-closed {
  width: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}

.sidebar-toggle-btn {
  cursor: pointer;
  font-size: 24px;
  z-index: 999;
}
`;


const customStyles = `
* {
  margin: 0!important;
  padding: 0 !important;
  box-sizing: border-box;
}

html, body, #root {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  outline: none !important;
  background-color: #f8f9fa; 
}

.dashboard-bg {
  background-color: #f8f9fa;
}

.header-bg {
    background-color: #ffffff; 
    color: white;
    padding: 8px 0;
}

.company-name {
    font-size: 0.7rem; 
    margin-bottom: 3px; 
    font-weight: normal; 
    color: #1B211A;
}

.title-style {
    font-weight: bold;
    font-size: 1.8rem; 
    margin-bottom: 0;
    color: #1B211A;
}

.subtitle-style {
    font-weight: bold;
    font-size: 2.2rem; 
    color: #e2ca3b; 
    line-height: 1;
}

.date-box {
    background-color: #003366; 
    color: white;
    padding: 6px 10px; 
    text-align: center;
    font-weight: bold;
    font-size: 0.9rem; 
    border-radius: 5px;
    white-space: nowrap; 
}

.reject-button {
    background-color: #9370DB; 
    color: white;
    font-weight: bold;
    font-size: 0.9rem; 
    border-radius: 15px; 
    padding: 2px 10px; 
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.content-area {
    background-color: white;
    padding: 1.5rem !important;
}

.content-title { 
    font-weight: bold; 
    color: #36454F; 
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.table-header {
    background-color: #535353 !important; 
    color: white !important;
    font-weight: normal !important;
    font-size: 0.9rem;
    text-align: center;
    vertical-align: middle;
}

.table-row-odd { background-color: #ffffff !important; }
.table-row-even { background-color: #f2f2f2 !important; }

.custom-td {
    color: black;
    font-size: 0.85rem;
    padding: 0.6rem !important;
    border: none !important;
}

.table-total-row {
    background-color: #7f7f7f !important; 
    color: white !important;
    font-weight: bold;
    font-size: 0.9rem;
}

.chart-card {
    background-color: #36454F; 
    color: white;
    padding: 15px;
    height: 500px; 
    border-radius: 5px; 
    border: none;
}
`;


const rejectData = [
    { bulan: 'January-2025', workcenter: 'SANDING', dicek: 20674, oke: 18417, reject: 2238, persen: 10.83 },
    { bulan: 'February-2025', workcenter: 'SANDING', dicek: 22029, oke: 20700, reject: 1343, persen: 6.10 },
    { bulan: 'March-2025', workcenter: 'SANDING', dicek: 25765, oke: 21640, reject: 3448, persen: 13.38 },
    { bulan: 'April-2025', workcenter: 'SANDING', dicek: 19290, oke: 15150, reject: 2932, persen: 15.20 },
    { bulan: 'May-2025', workcenter: 'SANDING', dicek: 27001, oke: 20919, reject: 4095, persen: 15.17 },
    { bulan: 'June-2025', workcenter: 'SANDING', dicek: 22196, oke: 17131, reject: 3408, persen: 15.35 },
    { bulan: 'July-2025', workcenter: 'SANDING', dicek: 30729, oke: 24677, reject: 3589, persen: 11.68 },
    { bulan: 'August-2025', workcenter: 'SANDING', dicek: 461, oke: 360, reject: 53, persen: 11.50 },
    { bulan: 'September-2025', workcenter: 'SANDING', dicek: 0, oke: 0, reject: 0, persen: 0.00 },
    { bulan: 'Oktober-2025', workcenter: 'SANDING', dicek: 0, oke: 0, reject: 0, persen: 0.00 },
    { bulan: 'November-2025', workcenter: 'SANDING', dicek: 0, oke: 0, reject: 0, persen: 0.00 },
    { bulan: 'Desember-2025', workcenter: 'SANDING', dicek: 0, oke: 0, reject: 0, persen: 0.00 },
];

const totalData = { dicek: 168145, oke: 138994, reject: 21106, persen: 12.55 };


const chartDataSliceIndex = 7; 
const labels = rejectData.map(d => d.bulan.replace('-', ' ')); 
const rejectCounts = rejectData.map(d => d.reject);
const rejectRates = rejectData.map(d => d.persen / 100);

const chartData = {
    labels: labels.slice(0, chartDataSliceIndex), 
    datasets: [
        {
            type: 'bar',
            label: 'Reject',
            data: rejectCounts.slice(0, chartDataSliceIndex),
            backgroundColor: '#ff6600', 
            yAxisID: 'y1',
            barPercentage: 0.6,
            categoryPercentage: 0.8,
        },
        {
            type: 'line',
            label: '% Reject',
            data: rejectRates.slice(0, chartDataSliceIndex),
            borderColor: '#A9A9A9', 
            backgroundColor: 'transparent',
            pointBackgroundColor: 'white', 
            pointBorderColor: '#A9A9A9',
            pointRadius: 5,
            yAxisID: 'y2',
            tension: 0.2, 
            borderWidth: 2,
        },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
        legend: { display: false }, 
        title: {
            display: true,
            text: 'Reject Rate Sanding',
            color: 'white',
            font: { size: 20, weight: 'bold' }
        },
        tooltip: { mode: 'index', intersect: false },
    },
    scales: {
        x: { 
            ticks: { color: 'white', maxRotation: 45, minRotation: 0 }, 
            grid: { display: false } 
        },
        y1: {
            type: 'linear', position: 'left',
            ticks: { color: 'white' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: 0, max: 5000,
        },
        y2: {
            type: 'linear', position: 'right',
            ticks: { 
                callback: function(value) { return (value * 100).toFixed(0) + '%'; }, 
                color: 'white' 
            },
            grid: { drawOnChartArea: false }, 
            min: 0, max: 0.20,
        },
    },
};


const PercentageLabels = ({ chartData, chartOptions }) => {
    const dataPoints = chartData.datasets[1].data; 
    const counts = chartData.datasets[0].data; 
    const labelsCount = chartData.labels.length;
    const PADDING_LEFT = 12; 
    const PADDING_RIGHT = 10;
    const plotWidth = 100 - PADDING_LEFT - PADDING_RIGHT;
    const barSpace = plotWidth / labelsCount;

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <div style={{ height: `470px` }}>
                 <Bar data={chartData} options={chartOptions} />
            </div>
            {dataPoints.map((rate, index) => {
                const leftPos = PADDING_LEFT + (index * barSpace) + (barSpace / 2);
                const lineYPos = 40 + (1 - (rate / 0.20)) * 340; 
                return (
                    <div key={index} style={{
                        position: 'absolute', top: `${lineYPos - 20}px`, left: `${leftPos}%`,
                        transform: 'translateX(-50%)', color: '#e2ca3b', fontSize: '12px', fontWeight: 'bold'
                    }}>
                        {(rate * 100).toFixed(2)}%
                    </div>
                );
            })}
            {counts.map((count, index) => {
                const leftPos = PADDING_LEFT + (index * barSpace) + (barSpace / 2);
                const barYPos = 40 + (1 - (count / 5000)) * 340;
                return (
                    <div key={index} style={{
                        position: 'absolute', top: `${barYPos + 10}px`, left: `${leftPos}%`,
                        transform: 'translateX(-50%)', color: 'white', fontSize: '11px', fontWeight: 'bold'
                    }}>
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

const RejectSanding = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [viewCurrentMonth, setViewCurrentMonth] = useState(false);

    return (
        <div className="d-flex dashboard-bg min-vh-100">
            <style>{sidebarStyles}</style>
            <style>{customStyles}</style>

          
            <div
                className="position-absolute top-0 start-0 p-3 sidebar-toggle-btn text-success"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                    fontSize: "24px",
                    cursor: "pointer",
                    lineHeight: "1",
                    marginTop: "5px",
                    marginLeft: "5px"
                }}
            >
                ⋮
            </div>

            <div className={sidebarOpen ? "" : "sidebar-closed"}>
                <Sidebar />
            </div>

            <div className="flex-grow-1 position-relative">
                <Container fluid style={{ padding: '0' }}>
                    <Row className="header-bg align-items-center">
                        <Col xs={7} className="ps-4 py-3">
                            <p className="company-name" style={{ paddingLeft: '35px' }}>PT.BAHANA BHUMIPHALA PERSADA</p>
                            <div className="title-style" style={{ paddingLeft: '35px' }}>
                                Overview <span className="subtitle-style">
                                    {viewCurrentMonth ? "REJECT SANDING 2025 " : "REJECT SANDING 2025"}
                                </span>
                            </div>
                        </Col>
                        <Col xs={5} className="d-flex justify-content-end align-items-center pe-4 py-3">
                            <div className="date-box me-3">Friday, 01 August 2025</div>
                            
        
                            <Button 
                                variant="primary" 
                                className="reject-button"
                                onClick={() => setViewCurrentMonth(!viewCurrentMonth)}
                            >
                                {viewCurrentMonth ? "Back to Overview" : "Current Month"}
                            </Button>
                        </Col>
                    </Row>

                  
                    {viewCurrentMonth ? (
                        <div className="content-area">
                            <SandingCurrentMonth />
                        </div>
                    ) : (
                        <Row className="content-area">
                            <Col md={6}>
                                <h4 className="content-title">REJECT PER BULAN</h4>
                                <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                                    <Table className="mt-2" borderless>
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
                                                    <td className="custom-td" style={{paddingLeft: '15px!important'}}>{d.bulan}</td>
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
                                    <PercentageLabels chartData={chartData} chartOptions={chartOptions} />
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default RejectSanding;