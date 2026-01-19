import 'bootstrap/dist/css/bootstrap.min.css';
import LogoImage from './assets/PT_BBP_LOGODASHBOARD.png'
import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

const customStyles = `
* {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}

body {
  margin-top: 0 !important;
  border-top: 0 !important;
}

#root {
  margin-top: 0 !important;
  border-top: 0 !important;
}

body::before {
  display: none !important;
}

html, body, #root {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  outline: none !important;
  background-color: #f8f9fa;
}

html {
  box-shadow: none !important;
  border-top: 0 !important;
}

.dashboard-bg {
  background-color: #f8f9fa;
}

.sidebar {
  background-color: #ffffff;
  border-right: 1px solid #f1f1f1;
}

.content-box {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  color: #212529;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

.chart-container {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

.bar-progress-light {
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);



// --- Data Dummy ---
const dailyRejectData = {
    labels: ['19/07', '20/07', '21/07', '22/07', '23/07', '24/07', '25/07', '26/07', '27/07', '28/07', '29/07', '30/07', '31/07', '01/08'],
    datasets: [
        {
            label: '% Reject',
            data: [1.1, 3.2, 4.1, 3.9, 9.0, 9.7, 5.5, 5.0, 4.5, 6.3, 5.4, 6.7, 7.1, 0.0],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            pointBackgroundColor: '#007bff',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#007bff',
            borderWidth: 2,
            tension: 0.4,
            fill: false,
        },
        {
            label: 'Target',
            data: [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5],
            borderColor: 'red',
            borderDash: [5, 5],
            pointRadius: 0,
            pointHitRadius: 0,
            borderWidth: 1,
            tension: 0,
            fill: false,
        }
    ],
};

const dailyRejectOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function (context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += context.parsed.y.toFixed(1) + '%';
                    }
                    return label;
                }
            }
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 15.0,
            ticks: {
                callback: function (value) {
                    return value.toFixed(1) + '%';
                }
            }
        },
        x: {
            grid: {
                display: false,
            }
        }
    },
};

const categoryRejectData = {
    labels: ['PLYWOOD', 'LVL', 'BLOCKBOARD', 'DOORCORE', 'BARE CORE LAYER', 'FINGER JOINT'],
    datasets: [
        {
            data: [41, 0, 30, 29, 0, 0],
            backgroundColor: [
                '#36A2EB', // (PLYWOOD) 
                '#FF6384', // (LVL)
                '#FF9F40', // (BLOCKBOARD)
                '#4BC0C0', // (DOORCORE)
                '#9966FF', // (BARE CORE LAYER)
                '#FFCD56', // (FINGER JOINT) 
            ],
            hoverOffset: 4,
        },
    ],
};


const categoryRejectVisualData = {
    labels: ['PLYWOOD', 'DOORCORE', 'BLOCKBOARD', 'LVL', 'BARE CORE LAYER', 'FINGER JOINT'],
    datasets: [
        {
            data: [41, 30, 29, 0, 0, 0],
            backgroundColor: [
                '#4169E1',
                '#4BC0C0',
                '#FFA500',
                '#FF6384',
                '#9966FF',
                '#FFCD56',
            ],
            hoverOffset: 4,
            borderWidth: 1,
        },
    ],
};

const categoryRejectOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        tooltip: {
            callbacks: {
                label: function (context) {
                    const label = context.label || '';
                    const value = context.parsed || 0;
                    return `${label}: ${value}%`;
                }
            }
        },
        legend: {
            display: false, // Legend manual di bawah chart
        },
    },
    cutout: '0%',
};


const shiftRejectData = {
    labels: ['SHF-01', 'SHF-02', 'SHF-03'],
    datasets: [
        {
            label: '% Reject per Shift',
            data: [5.7, 0.0, 0.0],
            backgroundColor: '#28a745',
            borderColor: '#28a745',
            borderWidth: 1,
            barPercentage: 0.5,
        }
    ]
};

const shiftRejectOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += context.parsed.y.toFixed(1) + '%';
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 8.0,
            ticks: {
                callback: function (value) {
                    return value.toFixed(1) + '%';
                }
            },
            grid: {
                drawOnChartArea: true,
            }
        },
        x: {
            grid: {
                display: false,
            }
        }
    },
    indexAxis: 'x', // Bar vertikal
};

const topRejectData = {
    labels: ['SOCIETA LEGNAMI PAGANONI SPA', 'WOOD INTERNATIONAL AGENCY UNITED', 'JACOB JUERGENSEN WOOD GMBH'],
    datasets: [
        {
            label: '% Reject',
            data: [7.3, 8.0, 5.0], // Data dummy, menyesuaikan panjang bar dri gambar
            backgroundColor: '#28a745',
            borderColor: '#28a745',
            borderWidth: 1,
            barPercentage: 0.6,
        }
    ]
};

const topRejectOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.x !== null) {
                        label += context.parsed.x.toFixed(1) + '%';
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        x: {
            beginAtZero: true,
            max: 10.0,
            ticks: {
                callback: function (value) {
                    return value.toFixed(1) + '%';
                }
            }
        },
        y: {
            grid: {
                display: false,
            }
        }
    },
    indexAxis: 'y', // Bar horizontal
};

const detailTableData = [
    { tahun: 2025, bulan: 'August', tgl: 1, shift: 'SHF-01', mesin: 'GRADING_FI', dicek: 496, reject: 35, persen: '7.1%' },
    { tahun: 2025, bulan: 'August', tgl: 1, shift: 'SHF-02', mesin: 'GRADING_FI', dicek: 0, reject: 0, persen: '0.0%' },
    { tahun: 2025, bulan: 'August', tgl: 1, shift: 'SHF-03', mesin: 'GRADING_FI', dicek: 0, reject: 0, persen: '0.0%' },
];


const RejectRateQCFI = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const headerStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 15px',
        fontWeight: 'bold',
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const sectionTitleStyle = {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#333',
        padding: '5px 0',
        borderBottom: '1px solid #ddd',
        marginBottom: '10px',
    };

    const mainValueStyle = {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#007bff',
        lineHeight: 1,
    };

    const targetValueStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        lineHeight: 1,
    };

    const upIndicatorStyle = {
        backgroundColor: '#ffc107',
        color: '#333',
        padding: '2px 8px',
        borderRadius: '5px',
        fontWeight: 'bold',
        fontSize: '14px',
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: '10px',
    };

    const trendingTextStyle = {
        fontSize: '12px',
        color: '#333',
        fontWeight: '500',
        marginTop: '5px',
    }

    const categoryLegendStyle = {
        fontSize: '12px',
        fontWeight: '500',
        marginTop: '10px',
    };

    const legendItemStyle = (color) => ({
        display: 'flex',
        alignItems: 'center',
        marginRight: '15px',
        marginBottom: '5px',
        minWidth: '100px',
    });

    const legendColorBoxStyle = (color) => ({
        width: '10px',
        height: '10px',
        backgroundColor: color,
        marginRight: '5px',
        border: '1px solid #ccc',
    });

    const shiftBarTargetStyle = {
        position: 'absolute',
        left: '20px',
        top: '35%',
        height: '2px',
        width: '90%',
        backgroundColor: 'red',
        zIndex: 1,
    };

    const tableHeaderStyle = {
        backgroundColor: '#f8f9fa',
        fontWeight: 'bold',
        fontSize: '12px',
        color: '#333',
        textAlign: 'center',
        padding: '5px',
    }


    return (
        <>
            <style>{customStyles}</style>

            <div className="d-flex dashboard-bg min-vh-100 text-dark">

                {/* === TOGGLE === */}
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

                {/* === SIDEBAR CONTAINER === */}
                <div className={sidebarOpen ? "" : "sidebar-closed"}>
                    <Sidebar />
                </div>

                {/* === MAIN CONTENT === */}
                <div className="flex-grow-1">

                    <div style={{ padding: '0px', backgroundColor: '#f5f5f5' }}>
                        <div style={headerStyle}>
                            <span>Reject Rate QC Grading FI</span>
                            <span style={{ fontSize: '16px' }}>Report date : 01 August 2025</span>
                        </div>
                    </div>


                    <Container style={{ padding: '15px' }}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Card className="shadow-sm h-100">
                                    <Card.Body>
                                        <Row className="align-items-center mb-3">
                                            <Col>
                                                <div style={sectionTitleStyle}>Rata-Rata Reject 2 Minggu Ini:</div>
                                                <Row className="align-items-end">
                                                    <Col md="auto" style={mainValueStyle}>
                                                        5.7%
                                                    </Col>
                                                    <Col md="auto" style={{ borderLeft: '1px solid #ccc', paddingLeft: '15px' }}>
                                                        <div style={targetValueStyle}>Target</div>
                                                        <div style={targetValueStyle}>4.5%</div>
                                                    </Col>
                                                    <Col md="auto">
                                                        <div style={upIndicatorStyle}>
                                                            <span style={{ fontSize: '16px', marginRight: '3px' }}>▲</span>
                                                            <span>Naik</span>
                                                        </div>
                                                        <div style={{ ...trendingTextStyle, marginLeft: '10px', color: '#007bff' }}>1.17%</div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <div style={sectionTitleStyle}>% Reject Per Hari</div>
                                        <div style={{ height: '200px' }}>
                                            <Line data={dailyRejectData} options={dailyRejectOptions} />
                                        </div>
                                        <div style={trendingTextStyle}>
                                            Tren Reject Harian: 0.46%
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={6}>
                                <Card className="shadow-sm h-100">
                                    <Card.Body>
                                        <div style={sectionTitleStyle}>% Reject Per Kategori :</div>
                                        <Row>
                                            <Col md={5} style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Doughnut data={categoryRejectVisualData} options={categoryRejectOptions} />
                                            </Col>
                                            <Col md={7} className="d-flex flex-column justify-content-center">
                                                <Row style={categoryLegendStyle}>
                                                    <Col xs={6} style={legendItemStyle(categoryRejectVisualData.datasets[0].backgroundColor[0])}>
                                                        <div style={legendColorBoxStyle(categoryRejectVisualData.datasets[0].backgroundColor[0])}></div>
                                                        <span>PLYWOOD</span>
                                                    </Col>
                                                    <Col xs={6} style={legendItemStyle(categoryRejectVisualData.datasets[0].backgroundColor[3])}>
                                                        <div style={legendColorBoxStyle(categoryRejectVisualData.datasets[0].backgroundColor[3])}></div>
                                                        <span>LVL</span>
                                                    </Col>
                                                    <Col xs={6} style={legendItemStyle(categoryRejectVisualData.datasets[0].backgroundColor[2])}>
                                                        <div style={legendColorBoxStyle(categoryRejectVisualData.datasets[0].backgroundColor[2])}></div>
                                                        <span>BLOCKBOARD</span>
                                                    </Col>
                                                    <Col xs={6} style={legendItemStyle(categoryRejectVisualData.datasets[0].backgroundColor[1])}>
                                                        <div style={legendColorBoxStyle(categoryRejectVisualData.datasets[0].backgroundColor[1])}></div>
                                                        <span>DOORCORE</span>
                                                    </Col>
                                                    <Col xs={6} style={legendItemStyle(categoryRejectVisualData.datasets[0].backgroundColor[4])}>
                                                        <div style={legendColorBoxStyle(categoryRejectVisualData.datasets[0].backgroundColor[4])}></div>
                                                        <span>BARE CORE LAYER</span>
                                                    </Col>
                                                    <Col xs={6} style={legendItemStyle(categoryRejectVisualData.datasets[0].backgroundColor[5])}>
                                                        <div style={legendColorBoxStyle(categoryRejectVisualData.datasets[0].backgroundColor[5])}></div>
                                                        <span>FINGER JOINT</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={6}>
                                <Card className="shadow-sm h-100">
                                    <Card.Body>
                                        <div style={sectionTitleStyle}>% Reject Per Shift</div>
                                        <div style={{ height: '200px', position: 'relative' }}>
                                            <div style={{ ...shiftBarTargetStyle, top: '45%' }}></div>
                                            <Bar data={shiftRejectData} options={shiftRejectOptions} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={6}>
                                <Card className="shadow-sm h-100">
                                    <Card.Body>
                                        <div style={sectionTitleStyle}>Top 3 Reject by Buyer</div>
                                        <div style={{ height: '200px' }}>
                                            <Bar data={topRejectData} options={topRejectOptions} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>


                        <Row className="mt-3">
                            <Col md={12}>
                                <Card className="shadow-sm">
                                    <Card.Body>
                                        <div style={sectionTitleStyle}>% Reject Per Shift Detail</div>
                                        <table className="table table-sm" style={{ fontSize: '12px' }}>
                                            <thead>
                                                <tr>
                                                    <th style={tableHeaderStyle}>Tahun</th>
                                                    <th style={tableHeaderStyle}>Bulan</th>
                                                    <th style={tableHeaderStyle}>Tgl</th>
                                                    <th style={tableHeaderStyle}>Shift</th>
                                                    <th style={tableHeaderStyle}>Mesin</th>
                                                    <th style={tableHeaderStyle}>Produk Di Cek</th>
                                                    <th style={tableHeaderStyle}>Pcs Reject</th>
                                                    <th style={tableHeaderStyle}>% Reject</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {detailTableData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td style={{ textAlign: 'center' }}>{item.tahun}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.bulan}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.tgl}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.shift}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.mesin}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.dicek}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.reject}</td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{item.persen}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default RejectRateQCFI;
