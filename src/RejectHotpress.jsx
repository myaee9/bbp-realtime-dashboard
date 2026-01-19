import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart, BarController, BarElement, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from "chart.js";
import { Chart as ReactChart } from "react-chartjs-2";
import LogoImage from './assets/PT_BBP_LOGODASHBOARD.png';
import { useNavigate } from 'react-router-dom';


const styles = `
  .reject-dashboard {
    height: 100%;
    background: linear-gradient(180deg, #0f5b36 0%, #0b4a2e 100%);
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    margin: 0;
    padding: 0 !important;
    padding-top: 24px;
  }
    
.dashboard-header {
  margin-top: 10px;
  padding-right: 40px;
  padding-left: 10px;
}

.dashboard-header > div:last-child > div:first-child {
 padding: 14px 32px !important;
 font-size: 20px;
}

.dashboard-header > div:last-child {
 gap: 22px !important;
}

  .title-block {
    display: flex;
    align-items: baseline;
    gap: 12px;
  }

  .title-block h1 {
    margin: 0;
    font-size: 54px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -1px;
    color: #fff;
  }

  .title-block .hotpress {
    color: #ff1c1c;
    text-decoration: none;
    text-decoration-thickness: 3px;
    text-underline-offset: 6px;
    border-bottom: 6px solid rgba(255,28,28,0.12);
    padding-bottom: 2px;
    font-size: 54px;
    line-height: 1;
  }

  .company-name {
    font-size: 12px;
    color: #d7e6dd;
    letter-spacing: 1px;
    font-weight: 600;
    margin-bottom: 6px;
    opacity: 0.95;
  }

  .date-badge {
    background: #d9d9d9;
    color: #111;
    padding: 10px 18px;
    border-radius: 2px;
    font-weight: 700;
    box-shadow: 0 2px 0 rgba(0,0,0,0.2);
    min-width: 210px;
    text-align: center;
  }

  .panel {
    background: linear-gradient(180deg, rgba(0,0,0,0.38), rgba(0,0,0,0.22));
    border-radius: 4px;
    padding: 18px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
  }

  .container-main {
    display: grid;
    grid-template-columns: 1.55fr 1fr;
    gap: 26px;
    align-items: start;
  }

  .left-panel {
    padding: 12px;
  }

  .left-panel.panel {
  padding=top: 24px;
  padding-bottom: 34px;
  }

  .section-title {
    font-size: 22px;
    font-weight: 700;
    color: #e6f1e9;
    margin-bottom: 14px;
  }

  .reject-table {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border-collapse: collapse;
    color: #e8f3ea;
    font-size: 13px;
  }

  .reject-table thead th {
    background: rgba(0,0,0,0.35);
    color: #cfe9d8;
    font-weight: 700;
    padding: 10px 8px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 12px;
  }

  .reject-table td {
    padding: 10px 8px;
    border-bottom: 1px solid rgba(255,255,255,0.03);
    vertical-align: middle;
  }

  .reject-table tbody tr:nth-child(even) {
    background: rgba(255,255,255,0.02);
  }

  .total-row {
    background: rgba(0,0,0,0.5);
    font-weight: 700;
  }

  .table-small {
    font-size: 12px;
    color: #cfe9d8;
  }


  .right-panel {
    padding: 12px;
    display: flex;
    flex-direction: column;
  }

  .right-panel.panel {
   padding-top: 24px;
  }

  .chart-title {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 12px;
    color: #fafafa;
  }

  .chart-card {
    background: linear-gradient(180deg, #2b2b2b 0%, #222 100%);
    border-radius: 6px;
    padding: 18px;
    flex: 1 1 auto;
    height: 520px;
    position: relative;
    padding-top: 38px
  }


  @media (max-width: 1200px) {
    .container-main 
    { 
    grid-template-columns: 1fr; 
    gap: 20px;
    }
    .chart-card {
     height: 400px; 
     }
  }
  `;

const customStyles = `
* {
  margin: 0 !important;
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
`;

Chart.register(
    BarController,
    BarElement,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend
);


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


const RejectHotpress = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    
    const goToHotpressMonthly = () => {
        navigate('/hotpress-current-month');
    }


    const months = [
        "January-2025",
        "February-2025",
        "March-2025",
        "April-2025",
        "May-2025",
        "June-2025",
        "July-2025",
    ];

    const rejects = [333, 304, 272, 278, 242, 261, 425];
    const percent = [1.8, 1.33, 1.09, 1.49, 1.04, 1.3, 1.52];


    const data = {
        labels: months,
        datasets: [
            {
                type: "bar",
                label: "Reject Count",
                data: rejects,
                backgroundColor: "#07b33b",
                borderRadius: 6,
                barThickness: 34,
                order: 2,
                yAxisID: "y",
            },
            {
                type: "line",
                label: "% Reject",
                data: percent,
                borderColor: "#9fb6dc",
                borderWidth: 3,
                tension: 0.35,
                pointRadius: 5,
                pointBackgroundColor: "#9fb6dc",
                order: 1,
                yAxisID: "yPercent",
            },
        ],
    };

    const percentAndBarLabelPlugin = {
        id: "percentAndBarLabelPlugin",
        afterDatasetsDraw: (chart) => {
            const { ctx, scales } = chart;
            ctx.save();


            const lineDataset = chart.data.datasets.find((d) => d.type === "line");
            const lineIndex = chart.data.datasets.indexOf(lineDataset);
            if (lineDataset) {
                chart.getDatasetMeta(lineIndex).data.forEach((point, i) => {
                    const value = lineDataset.data[i];
                    const x = point.x;
                    const y = point.y - 12;

                    ctx.fillStyle = "#ffd400";
                    ctx.font = "600 14px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText(value.toFixed(2).replace(/\.?0+$/, "") + "%", x, y);
                });
            }


            const barDataset = chart.data.datasets.find((d) => d.type === "bar");
            const barIndex = chart.data.datasets.indexOf(barDataset);
            if (barDataset) {
                chart.getDatasetMeta(barIndex).data.forEach((bar, i) => {
                    const value = barDataset.data[i];
                    const x = bar.x;
                    const y = chart.chartArea.bottom - 18;
                    ctx.fillStyle = "#ffd400";
                    ctx.font = "700 20px Arial";
                    ctx.textAlign = "center";
                    ctx.fillText(value, x, y);
                });
            }

            ctx.restore();
        },
    };


    const options = {
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 30,
                right: 24,
                left: 24,
                bottom: 6,
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: "#222",
                titleColor: "#fff",
                bodyColor: "#fff",
            },
        },
        scales: {
            x: {
                grid: { display: false, drawBorder: false },
                ticks: {
                    color: "#bfc7c6",
                    maxRotation: 30,
                    minRotation: 30,
                    font: { size: 11 },
                },
            },
            y: {
                position: "left",
                beginAtZero: true,
                grid: {
                    color: "rgba(255,255,255,0.04)",
                    borderDash: [4, 6],
                },
                ticks: {
                    color: "#bfc7c6",
                    font: { size: 12 },
                },
            },
            yPercent: {
                position: "right",
                beginAtZero: true,
                max: 2.2,
                grid: { display: false },
                ticks: {
                    color: "#bfc7c6",
                    callback: (v) => (v ? v + "%" : "0%"),
                    font: { size: 12 },
                },
            },
        },
    };


    const chartRef = useRef();

    useEffect(() => {
        if (!Chart.registry.plugins.get("percentAndBarLabelPlugin")) {
            Chart.register(percentAndBarLabelPlugin);
        }
    }, []);


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

                {/* SIDEBAR */}
                <div className={sidebarOpen ? "" : "sidebar-closed"}>
                    <Sidebar />
                </div>

                {/* MAIN CONTENT */}
                <div className="flex-grow-1 d-flex flex-column min-vh-100">
                    <div style={{ padding: "0px" }}></div>
                    <div className="reject-dashboard flex-grow-1">
                        <style>{styles}</style>


                        <div className="dashboard-header">
                            <div>
                                <div className="company-name">PT.BAHANA BHUMIPHALA PERSADA</div>
                                <div className="title-block">
                                    <h1>Overview</h1>
                                    <h1 className="hotpress">
                                        REJECT <span style={{ marginLeft: 8 }}>HOTPRESS</span> 2025
                                    </h1>
                                </div>
                            </div>


                             
                             <div 
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '10px',
                                marginTop: "5px"
                            }}
                        >

                       <div
                        onClick={goToHotpressMonthly} 
                        style={{
                            backgroundColor: '#ff1c1c',
                            color: '#fff',
                            padding: '10px 22px',
                            borderRadius: '2px',
                            fontWeight: '700',
                            boxShadow: '0 2px 0 rgba(0,0,0,0.2)',
                            textAlign: 'center',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        Current Month →
                    </div>

                            <div className="date-badge">Friday, 01 August 2025</div>
                        </div>

                        <div className="container-main">
                            <div className="left-panel panel">
                                <div className="section-title">REJECT PER BULAN</div>

                                <div className="table-responsive">
                                    <table className="reject-table">
                                        <thead>
                                            <tr>
                                                <th>Tahun</th>
                                                <th>Bulan</th>
                                                <th>Workcenter</th>
                                                <th>Produk Di Cek</th>
                                                <th>Produk Oke</th>
                                                <th>Reject</th>
                                                <th>% Reject</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="table-small">2025</td>
                                                <td>January-2025</td>
                                                <td>HOTPRESS</td>
                                                <td className="text-end">18515</td>
                                                <td className="text-end">18182</td>
                                                <td className="text-end">333</td>
                                                <td className="text-end">1.80%</td>
                                            </tr>
                                            <tr>
                                                <td className="table-small">2025</td>
                                                <td>February-2025</td>
                                                <td>HOTPRESS</td>
                                                <td className="text-end">22913</td>
                                                <td className="text-end">22609</td>
                                                <td className="text-end">304</td>
                                                <td className="text-end">1.33%</td>
                                            </tr>
                                            <tr>
                                                <td className="table-small">2025</td>
                                                <td>March-2025</td>
                                                <td>HOTPRESS</td>
                                                <td className="text-end">24849</td>
                                                <td className="text-end">24577</td>
                                                <td className="text-end">272</td>
                                                <td className="text-end">1.09%</td>
                                            </tr>
                                            <tr>
                                                <td className="table-small">2025</td>
                                                <td>April-2025</td>
                                                <td>HOTPRESS</td>
                                                <td className="text-end">18633</td>
                                                <td className="text-end">18355</td>
                                                <td className="text-end">278</td>
                                                <td className="text-end">1.49%</td>
                                            </tr>
                                            <tr>
                                                <td className="table-small">2025</td>
                                                <td>May-2025</td>
                                                <td>HOTPRESS</td>
                                                <td className="text-end">23243</td>
                                                <td className="text-end">23001</td>
                                                <td className="text-end">242</td>
                                                <td className="text-end">1.04%</td>
                                            </tr>
                                            <tr>
                                                <td className="table-small">2025</td>
                                                <td>June-2025</td>
                                                <td>HOTPRESS</td>
                                                <td className="text-end">20010</td>
                                                <td className="text-end">19749</td>
                                                <td className="text-end">261</td>
                                                <td className="text-end">1.30%</td>
                                            </tr>
                                            <tr>
                                                <td className="table-small">2025</td>
                                                <td>July-2025</td>
                                                <td>HOTPRESS</td>
                                                <td className="text-end">27944</td>
                                                <td className="text-end">27519</td>
                                                <td className="text-end">425</td>
                                                <td className="text-end">1.52%</td>
                                            </tr>

                                            <tr>
                                                <td className="table-small">2025</td>
                                                <td>August-2025</td>
                                                <td>HOTPRESS</td>
                                                <td className="text-end">515</td>
                                                <td className="text-end">503</td>
                                                <td className="text-end">12</td>
                                                <td className="text-end">2.33%</td>
                                            </tr>

                                            <tr className="total-row">
                                                <td colSpan="3">TOTAL</td>
                                                <td className="text-end">156622</td>
                                                <td className="text-end">154495</td>
                                                <td className="text-end">2127</td>
                                                <td className="text-end">1.36%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* RIGHT: CHART */}
                            <div className="right-panel panel">
                                <div className="section-title">CHART REJECT</div>
                                <div className="chart-card">
                                    <div style={{ position: "absolute", left: 0, right: 0, top: 6 }}>
                                        <div className="chart-title">Reject Rate Hotpress</div>
                                    </div>

                                    <div style={{ position: "absolute", top: 56, bottom: 12, left: 12, right: 12 }}>
                                        <ReactChart ref={chartRef} type="bar" data={data} options={options} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default RejectHotpress;
