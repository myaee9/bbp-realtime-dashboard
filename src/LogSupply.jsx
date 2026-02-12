import React, { useState } from 'react';
import LogoImage from './assets/PT_BBP_LOGODASHBOARD.png'
import { Container, Row, Col, Table } from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

const customStyles = `
* { margin: 0 !important; padding: 0 !important; box-sizing: border-box; }

.dashboard-bg { 
    background-color: #f8f9fa; 
    display: flex; 
    min-height: 100vh; 
}

.sidebar {
    background-color: #ffffff;
    border-right: 1px solid #f1f1f1;
    width: 250px;
    min-width: 250px;
    min-height: 100vh;
    transition: all 0.3s ease;
}

.sidebar-closed {
    width: 0 !important;
    min-width: 0 !important;
    overflow: hidden !important;
}

.sidebar-toggle-btn {
    cursor: pointer;
    font-size: 24px;
    z-index: 999;
}

.hover-bg-secondary:hover { background-color: #e9ecef !important; }

.main-content-wrapper {
    background-color: #3e8494;
    flex-grow: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
}

.header-section { padding: 20px 30px 10px 30px !important; }

.chart-box {
    background-color: #333;
    padding: 15px !important;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.1);
}

.table-container {
    background-color: white;
    border-radius: 4px;
    overflow: hidden;
}

.table-scroll-box {
    max-height: 160px; 
    overflow-y: auto;
}

.table-scroll-box::-webkit-scrollbar { width: 6px; }
.table-scroll-box::-webkit-scrollbar-thumb { background: #bbb; border-radius: 10px; }

.table thead th {
    background-color: #ffffff !important;
    color: #000 !important;
    border-bottom: 2px solid #000 !important;
    text-align: center;
    font-size: 13px;
    position: sticky;
    top: 0;
    z-index: 10;
}

.table td {
    text-align: center;
    vertical-align: middle;
    font-size: 12px;
    padding: 8px !important;
    color: #212529 !important;
}


@media (max-width: 991px) {
    .chart-box {
        min-height: 350px !important; 
    }
    .header-section {
        padding: 15px !important;
    }
}
`;

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
        <div className="sidebar p-3 text-dark d-flex flex-column justify-content-between flex-shrink-0">
            <div>
                <div className="mb-4">
                    <img src={LogoImage} alt="PT BBP Logo" className="img-fluid" style={{ maxWidth: '100%', borderRadius: '4px', padding: '5px' }} />
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
                <button onClick={handleLogout} className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2 shadow-sm" style={{ borderRadius: '8px', fontWeight: 'bold' }}>
                    <span style={{ fontSize: '18px' }}>⏻</span> Logout
                </button>
            </div>
        </div>
    );
};

const LogSupply = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const allDaerahData = [
        { name: "TALUM", qty: 13.0442 }, { name: "WONOTUNGGAL", qty: 10.8731 }, { name: "WONOSOBO", qty: 24.5805 }, { name: "TULIS", qty: 227.6108 },
        { name: "TERSONO", qty: 266.2706 }, { name: "TALUN", qty: 53.1829 }, { name: "SEMARANG", qty: 28.8252 }, { name: "SAPURAN", qty: 211.1704 },
        { name: "PEKALONGAN", qty: 9.7837 }, { name: "PATI", qty: 13.0301 }, { name: "PATEAN", qty: 104.3018 }, { name: "PANINGGARAN", qty: 8.3488 },
        { name: "PAKIS", qty: 13.4535 }, { name: "LIMPUNG", qty: 11.4911 }, { name: "KULON PROGO", qty: 83.5449 }, { name: "KANDEMAN", qty: 22.5256 },
        { name: "KAJEN", qty: 5.1361 }, { name: "JAMBU", qty: 68.0424 }, { name: "GUNUNGWUNGKAL", qty: 10.9148 }, { name: "GRINGSING", qty: 81.9191 },
        { name: "GIRIMULYO (A)", qty: 10.4447 }, { name: "GIRIMULYO (B)", qty: 22.1888 }, { name: "DORO", qty: 49.6252 }, { name: "CIAMIS", qty: 22.1266 },
        { name: "BATANG", qty: 10.5759 }, { name: "BANYUPUTIH", qty: 175.5144 }, { name: "BANJARANYAR", qty: 34.4647 }, { name: "BANDAR", qty: 130.4668 },
    ];
    const tableData = [...allDaerahData].sort((a, b) => b.qty - a.qty);
    const dataKota = [
        { rank: 1, kota: "BATANG", qty: 7243.7183 }, { rank: 2, kota: "WONOSOBO", qty: 1890.3055 },
        { rank: 3, kota: "KENDAL", qty: 978.4571 }, { rank: 4, kota: "DIY", qty: 814.5544 }, { rank: 5, kota: "SEMARANG", qty: 325.0829 },
    ];

    return (
        <div className="dashboard-bg">
            <style>{customStyles}</style>
            <div className="position-absolute top-0 start-0 p-3 sidebar-toggle-btn text-success" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ lineHeight: "1", marginTop: "5px", marginLeft: "5px" }}>⋮</div>
            <div className={sidebarOpen ? "" : "sidebar-closed"}><Sidebar /></div>
            
            <div className="main-content-wrapper p-3">
                <Container fluid className="p-0">
                    <Row className="m-0">
                        <Col lg={5} xs={12} className="d-flex flex-column pe-lg-4 mb-4 mb-lg-0 order-1">
                            <div className="header-section mb-3">
                                <h1 style={{ color: '#ccff00', fontWeight: 'bold', fontSize: '3.2rem', margin: 0, lineHeight: 0.9 }}>TOP 5</h1>
                                <h1 style={{ color: '#ccff00', fontWeight: 'bold', fontSize: '3.2rem', margin: 0, lineHeight: 0.9 }}>ASAL LOG</h1>
                            </div>
                            <div className="chart-box flex-grow-1" style={{ minHeight: '400px' }}>
                                <Bar data={{ labels: allDaerahData.map(d => d.name), datasets: [{ data: allDaerahData.map(d => d.qty), backgroundColor: 'rgba(54, 162, 235, 0.7)', barThickness: 7 }] }} 
                                     options={{ indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#ccc', font: { size: 9 } } }, y: { ticks: { color: '#eee', font: { size: 7 } } } } }} />
                            </div>
                        </Col>

               
                        <Col lg={7} xs={12} className="d-flex flex-column gap-3 order-2">
                            <div className="table-container shadow-sm">
                                <div className="p-2 fw-bold border-bottom" style={{ fontSize: '14px', color: '#212529 !important' }}>ASAL LOG DAERAH BULAN INI</div>
                                <div className="table-scroll-box">
                                    <Table bordered size="sm" className="m-0">
                                        <thead><tr><th width="20%">RANK</th><th>DAERAH</th><th>QTY</th></tr></thead>
                                        <tbody>{tableData.slice(0, 5).map((item, i) => (<tr key={i}><td>{i + 1}</td><td>{item.name}</td><td>{item.qty.toFixed(4)} m3</td></tr>))}</tbody>
                                    </Table>
                                </div>
                            </div>

                            <div className="table-container shadow-sm">
                                <div className="p-2 fw-bold border-bottom" style={{ fontSize: '14px', color: '#212529 !important' }}>ASAL LOG KOTA TH.2025</div>
                                <div className="table-scroll-box">
                                    <Table bordered size="sm" className="m-0">
                                        <thead><tr><th width="20%">RANK</th><th>KOTA</th><th>QTY</th></tr></thead>
                                        <tbody>{dataKota.map((item) => (<tr key={item.rank}><td>{item.rank}</td><td>{item.kota}</td><td>{item.qty.toLocaleString('en-US', { minimumFractionDigits: 3 })} m3</td></tr>))}</tbody>
                                    </Table>
                                </div>
                            </div>
                            
                            <div className="chart-box" style={{ height: '35%', minHeight: '300px' }}>
                                <Pie data={{ labels: ['BATANG', 'WONOSOBO', 'KENDAL', 'DIY', 'SEMARANG', 'LAINNYA'], datasets: [{ data: [7243, 1890, 978, 814, 325, 450], backgroundColor: ['#2e59d9', '#d94f2e', '#f6c23e', '#1cc88a', '#36b9cc', '#858796'] }] }} 
                                     options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: 'white', font: { size: 10 } } } } }} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default LogSupply;