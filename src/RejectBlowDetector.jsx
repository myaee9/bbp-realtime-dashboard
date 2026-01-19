import React, { useState } from 'react';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoImage from './assets/PT_BBP_LOGODASHBOARD.png' 
import BlowDetectCurrentMonth from './BlowDetectCurrentMonth'; 
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


/* GAYA KHUSUS DASHBOARD UNTUK MATCHING VISUAL */

/* Header Area (TELAH Dikecilkan LAGI) */
.header-bg {
    background-color: #006666; /* Hijau Tosca Tua */
    color: white;
    padding: 2px 0;
}

.company-name {
    font-size: 0.7rem; 
    margin-bottom: 3px; 
    font-weight: normal; 
}

.title-style {
    font-weight: bold;
    font-size: 1.8rem; 
    margin-bottom: 0;
}

.subtitle-style {
    font-weight: bold;
    font-size: 2.2rem; 
    color: #FFFF00; /* Kuning Terang */
    line-height: 1;
}

.date-box {
    background-color: #003366; /* Biru Tua */
    color: white;
    padding: 6px 10px; 
    text-align: center;
    font-weight: bold;
    font-size: 0.9rem; 
    border-radius: 5px;
    white-space: nowrap; 
}

/* Tombol Reject (TELAH Dikecilkan LAGI) */
.reject-button {
    background-color: #9370DB; /* Ungu */
    color: white;
    font-weight: bold;
    font-size: 0.9rem; 
    border-radius: 15px; 
    padding: 2px 10px; 
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Ganti warna jika dalam mode detail agar lebih serasi dengan gambar */
    transition: background-color 0.3s; 
}

.reject-button-detail {
    background-color: #0A3C6B; /* Biru Tua/Gelap, lebih match dengan header tabel detail */
}

.reject-button-icon {
    display: none;
}


/* Content Area */
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

/* Table Styles */
.table-header {
    background-color: #003366; /* Biru Tua */
    color: white;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap; 
}

.table-row {
    background-color: #DCDCDC; /* Grey/Abu-abu muda */
    color: black;
    font-size: 0.8rem;
    text-align: center;
}

.table-total-row {
    background-color: #808080; /* Abu-abu */
    color: white;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
}

/* Chart Styles */
.chart-card {
    background-color: #36454F; /* Dark Slate Gray untuk background chart */
    color: white;
    padding: 15px;
    height: 500px; 
    border-radius: 5px; 
    border: none;
}

/* Penyesuaian kolom untuk membuat tabel terlihat lebih padat */
.table-compact-col th, .table-compact-col td {
    padding: 0.5rem !important;
}

/* --- START STYLE DETAIL BULAN INI (Hanya Menjaga Gaya Umum untuk komponen terpisah) --- */

.detail-table-container {
    padding: 1.5rem;
    background-color: #f8f9fa; /* Background halaman detail */
}

.detail-section-title {
    font-size: 20px;
    font-weight: bold;
    color: #36454F; /* Biru/Abu gelap, menyesuaikan judul konten */
    margin-top: 0.5rem; 
    margin-bottom: 1rem;
}

.reject-detail-table {
    font-size: 12px;
    table-layout: fixed;
    margin-bottom: 0 !important; 
}

.reject-detail-table th, .reject-detail-table td {
    padding: 8px 6px !important; 
    border-color: #dee2e6;
    height: 40px; 
}

.detail-table-header {
    background-color: #0A3C6B !important;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    vertical-align: middle;
    font-size: 0.85rem; 
}

.detail-total-reject-column {
    background-color: #cccccc !important; 
    font-weight: bold;
}

.detail-table-total-row {
    background-color: #006666; 
    color: white;
    font-weight: bold;
    font-size: 0.85rem;
}

.detail-table-footer {
    background-color: #000000;
    color: white;
    font-weight: bold;
    font-size: 0.85rem;
}

.detail-percent-label {
    font-weight: bold;
    color: white;
    text-align: left !important;
    padding-left: 10px !important;
}
/* --- END STYLE DETAIL BULAN INI --- */
`;


// Mendaftarkan komponen Chart.js yang diperlukan
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

// --- Data untuk Tabel dan Chart (DIPERTAHANKAN) ---
const rejectData = [
    { bulan: 'January-2025', workcenter: 'BLOW_DETECTOR', dicek: 19286, oke: 15822, reject: 3464, persen: 17.96 },
    { bulan: 'February-2025', workcenter: 'BLOW_DETECTOR', dicek: 18673, oke: 15367, reject: 3306, persen: 17.70 },
    { bulan: 'March-2025', workcenter: 'BLOW_DETECTOR', dicek: 21731, oke: 19518, reject: 2213, persen: 10.18 },
    { bulan: 'April-2025', workcenter: 'BLOW_DETECTOR', dicek: 16182, oke: 14182, reject: 2000, persen: 12.36 },
    { bulan: 'May-2025', workcenter: 'BLOW_DETECTOR', dicek: 28187, oke: 25243, reject: 2944, persen: 10.44 },
    { bulan: 'June-2025', workcenter: 'BLOW_DETECTOR', dicek: 26760, oke: 24019, reject: 2741, persen: 10.24 },
    { bulan: 'July-2025', workcenter: 'BLOW_DETECTOR', dicek: 27656, oke: 24225, reject: 3431, persen: 12.41 },
    { bulan: 'August-2025', workcenter: 'BLOW_DETECTOR', dicek: 443, oke: 354, reject: 89, persen: 20.09 },
    { bulan: 'September-2025', workcenter: 'BLOW_DETECTOR', dicek: 0, oke: 0, reject: 0, persen: 0.00 },
    { bulan: 'October-2025', workcenter: 'BLOW_DETECTOR', dicek: 0, oke: 0, reject: 0, persen: 0.00 },
    { bulan: 'November-2025', workcenter: 'BLOW_DETECTOR', dicek: 0, oke: 0, reject: 0, persen: 0.00 },
    { bulan: 'December-2025', workcenter: 'BLOW_DETECTOR', dicek: 0, oke: 0, reject: 0, persen: 0.00 },
];

const totalData = {
    dicek: 158918,
    oke: 138730,
    reject: 20188,
    persen: 12.70
};

const chartDataSliceIndex = 7; 

const labels = rejectData.map(d => d.bulan.split('-')[0] + '-2025'); 
const rejectCounts = rejectData.map(d => d.reject);
const rejectRates = rejectData.map(d => d.persen / 100);


const chartData = {
    labels: labels.slice(0, chartDataSliceIndex), 
    datasets: [
        {
            type: 'bar',
            label: 'Reject',
            data: rejectCounts.slice(0, chartDataSliceIndex),
            backgroundColor: '#003366', 
            yAxisID: 'y1',
            // OPTIMASI: Menggunakan percentage agar responsif dan tidak menempel
            barPercentage: 0.6, 
            categoryPercentage: 0.8,
            borderRadius: 0, 
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
    layout: {
        padding: {
            left: 10, right: 10, top: 25, bottom: 5
        }
    },
    plugins: {
        legend: { display: false }, 
        title: {
            display: true,
            text: 'Reject Rate Blow Detector',
            color: 'white',
            font: { size: 20, weight: 'bold' },
            padding: { top: 0, bottom: 0 } 
        },
        tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) label += ': ';
                    if (context.parsed.y !== null) {
                        if (context.dataset.type === 'line') {
                            label += (context.parsed.y * 100).toFixed(2) + '%';
                        } else {
                            label += context.parsed.y.toLocaleString(); 
                        }
                    }
                    return label;
                }
            }
        },
    },
    scales: {
        x: { 
            ticks: { color: 'white', font: { size: 14 } }, 
            grid: { color: 'rgba(255, 255, 255, 0.1)', drawBorder: false } 
        },
        y1: {
            type: 'linear', position: 'left', 
            title: { display: false },
            ticks: { 
                color: 'white', 
                callback: function(value) { return value.toLocaleString(); },
                font: { size: 14 } 
            },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            min: 0, max: 4000,
        },
        y2: {
            type: 'linear', position: 'right', 
            title: { display: false },
            ticks: { 
                callback: function(value) { return (value * 100).toFixed(0) + '%'; }, 
                color: 'white',
                font: { size: 14 } 
            },
            grid: { drawOnChartArea: false }, 
            min: 0, max: 0.20,
        },
    },
};

const PercentageLabels = ({ chartData, chartOptions }) => {
    const dataPoints = chartData.datasets[1].data; 
    const rejectCounts = chartData.datasets[0].data; 
    const chartHeight = 500 - 30; 
    const y1Max = 4000; 
    const labelsCount = chartData.labels.length;
    const PADDING_LEFT_PERCENT = 13; 
    const PADDING_RIGHT_PERCENT = 10;
    const PADDING_TOP = 40;     
    const PADDING_BOTTOM = 60;  
    const plotAreaWidth = 100 - PADDING_LEFT_PERCENT - PADDING_RIGHT_PERCENT; 
    const plotAreaHeight = chartHeight - PADDING_TOP - PADDING_BOTTOM; 
    const plotAreaTop = PADDING_TOP; 
    const barWidthPercentage = plotAreaWidth / labelsCount; 


    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <div style={{ height: `${chartHeight}px` }}>
                 <Bar data={chartData} options={chartOptions} />
            </div>
           
            {/* Label Persen (Kuning) */}
            {dataPoints.map((rate, index) => {
                const count = rejectCounts[index];
                const lineRateNormalized = (rate / chartOptions.scales.y2.max);
                const lineYPos = plotAreaTop + (1 - lineRateNormalized) * plotAreaHeight - 18; 
                const leftPos = PADDING_LEFT_PERCENT + (index * barWidthPercentage) + (barWidthPercentage / 2); 
                
                if (count === 0) return null; 

                return (
                    <div
                        key={`rate-${index}`}
                        style={{
                            position: 'absolute',
                            top: `${lineYPos}px`,
                            left: `${leftPos}%`,
                            transform: 'translateX(-50%)',
                            color: '#FFFF00', 
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            pointerEvents: 'none', 
                            whiteSpace: 'nowrap',
                            zIndex: 10,
                        }}
                    >
                        {(rate * 100).toFixed(2)}%
                    </div>
                );
            })}
            
            {/* Label Count (Putih, di tengah bar) */}
            {rejectCounts.map((count, index) => {
                const barHeightNormalized = count / y1Max;
                const barYPos = plotAreaTop + (1 - barHeightNormalized) * plotAreaHeight;
                const leftPos = PADDING_LEFT_PERCENT + (index * barWidthPercentage) + (barWidthPercentage / 2); 

                if (count === 0) return null; 
                
                const barCenter = barYPos + ((plotAreaHeight * barHeightNormalized) / 2); 

                return (
                    <div
                        key={`count-${index}`}
                        style={{
                            position: 'absolute',
                            top: `${barCenter - 10}px`, 
                            left: `${leftPos}%`,
                            transform: 'translateX(-50%)',
                            color: 'white', 
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            pointerEvents: 'none', 
                            zIndex: 5,
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
            {/* Bagian Atas: Navigasi (Identik dengan DeliveryPlan) */}
            <div>
                <div className="mb-4">
                    {/* Menggunakan LogoImage saja seperti di DeliveryPlan agar tidak mendominasi */}
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

            {/* Bagian Bawah: Tombol Logout */}
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


const RejectBlowDetector = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDetail, setShowDetail] = useState(false); 
  

    return (

       <>
            <div className="d-flex dashboard-bg min-vh-100">
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


        <Container fluid style={{ padding: '0' }}>
            {/* --- Header Utama (Hanya Dirender SEKALI) --- */}
            <Row className="header-bg align-items-center">
                <Col xs={7} className="ps-4 py-3"> 
                    <p className="company-name">PT.BAHANA BHUMIPHALA PERSADA</p>
                    <div className="title-style">
                        Overview <span className="subtitle-style">REJECT BLOW DETECTOR 2025</span>
                    </div>
                </Col>
                <Col xs={5} className="d-flex justify-content-end align-items-center pe-4 py-3">
                    {/* Kotak Tanggal */}
                    <div className="date-box me-3">
                        Friday, 01 August 2025
                    </div>
                    {/* Tombol Toggle View (Teks dan Gaya Dinamis) */}
                    <Button 
                        variant="primary" 
                        className={`reject-button d-flex align-items-center ${showDetail ? 'reject-button-detail' : ''}`}
                        onClick={() => setShowDetail(!showDetail)} 
                    >
                        <span className="reject-button-icon"></span>
                        {showDetail ? 'Back to Overview' : 'Current Month'}
                    </Button>
                </Col>
            </Row>

            {/* --- Konten Utama - Menggunakan Conditional Rendering --- */}
        {showDetail ? (
    <div style={{ background: "#2A7A8C", minHeight: "100vh", height: "100%" }}>
        <BlowDetectCurrentMonth />
    </div>
) : (
    <Row className="content-area">
                    {/* Kolom Kiri: Reject Per Bulan (Tabel) */}
                    <Col md={6}>
                        <h4 className="content-title">REJECT PER BULAN</h4>
                        <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            <Table striped bordered className="mt-2 table-compact-col">
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
                                    {rejectData.map((d, index) => {
                                        const [month, year] = d.bulan.split('-');
                                        return (
                                            <tr key={index} className="table-row">
                                                <td>{year}</td>
                                                <td>{month}</td>
                                                <td>{d.workcenter}</td>
                                                <td style={{textAlign: 'right'}}>{d.dicek.toLocaleString()}</td>
                                                <td style={{textAlign: 'right'}}>{d.oke.toLocaleString()}</td>
                                                <td style={{textAlign: 'right'}}>{d.reject.toLocaleString()}</td>
                                                <td style={{textAlign: 'right', fontWeight: d.persen > 15 ? 'bold' : 'normal' }}>{d.persen.toFixed(2)}%</td>
                                            </tr>
                                        );
                                    })}
                                    {/* Total Row */}
                                    <tr className="table-total-row">
                                        <td colSpan="3">TOTAL</td>
                                        <td style={{textAlign: 'right'}}>{totalData.dicek.toLocaleString()}</td>
                                        <td style={{textAlign: 'right'}}>{totalData.oke.toLocaleString()}</td>
                                        <td style={{textAlign: 'right'}}>{totalData.reject.toLocaleString()}</td>
                                        <td style={{textAlign: 'right'}}>{totalData.persen.toFixed(2)}%</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>

                    {/* Kolom Kanan: Chart Reject */}
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
        </>
    );
};

export default RejectBlowDetector;