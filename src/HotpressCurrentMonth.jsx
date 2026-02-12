import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom'; 
import LogoImage from './assets/PT_BBP_LOGODASHBOARD.png';

const styles = `
  .reject-dashboard {
    height: 100vh; 
    background: linear-gradient(180deg, #0f5b36 0%, #0b4a2e 100%);
    padding: 28px;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    display: flex;
    flex-direction: column;
  }
  
  .dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    margin-bottom: 18px;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .title-block {
    display: flex;
    align-items: baseline;
    gap: 12px;
    flex-wrap: wrap;
  }
  .title-block h1 {
    margin: 0;
    font-size: clamp(28px, 5vw, 46px);
    font-weight: 700;
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
    font-size: clamp(28px, 5vw, 46px);
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

  .panel-container {
    background: rgba(0,0,0,0.3);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    flex-grow: 1; 
    overflow: hidden;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
  }

  .table-responsive-custom {
    flex-grow: 1;
    overflow: auto;
    width: 100%;
  }

  .reject-table {
    width: 100%;
    height: 100%; 
    border-collapse: collapse;
    color: #e8f3ea;
    font-size: 13px;
    min-width: 1000px;
    table-layout: fixed;
  }

  .reject-table th {
    background: rgba(0,0,0,0.5) !important;
    color: #cfe9d8;
    padding: 12px 8px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.1);
    position: sticky;
    top: 0;
    z-index: 2;
  }

  .reject-table td {
    padding: 12px 8px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.05);
  }

  .total-row {
    background: rgba(0,0,0,0.6) !important;
    font-weight: 700;
    color: #fff;
  }

  .footer-row {
    background: rgba(255,255,255,0.1) !important;
    font-weight: 700;
  }
`;

const customStyles = `
* { margin: 0 !important; padding: 0 !important; box-sizing: border-box; }
html, body, #root { background-color: #f8f9fa; overflow-x: hidden; }
.dashboard-bg { background-color: #f8f9fa; display: flex; max-width: 100vw; }
.sidebar { background-color: #ffffff; border-right: 1px solid #f1f1f1; transition: width 0.3s ease; overflow-y: auto; }
.hover-bg-secondary:hover { background-color: #e9ecef; }
.sidebar-closed { width: 0 !important; padding: 0 !important; overflow: hidden !important; }
.sidebar-toggle-btn { cursor: pointer; font-size: 24px; z-index: 999; }
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

const HotpressCurrentMonth = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate(); 

    const monthlyData = [
        { product: 'Barecore Layer', workcenter: 'HOTPRESS', checked: 37, buster: 0, delaminasi: 0, veneer_minus: 0, presmark: 0, lainnya: 0, total: 0, percent: '0.00%' },
        { product: 'BlockBoard', workcenter: 'HOTPRESS', checked: 152, buster: 3, delaminasi: 1, veneer_minus: 0, presmark: 0, lainnya: 1, total: 5, percent: '3.29%' },
        { product: 'Doorcore', workcenter: 'HOTPRESS', checked: 91, buster: 0, delaminasi: 0, veneer_minus: 0, presmark: 0, lainnya: 0, total: 0, percent: '0.00%' },
        { product: 'LVL', workcenter: 'HOTPRESS', checked: 0, buster: 0, delaminasi: 0, veneer_minus: 0, presmark: 0, lainnya: 0, total: 0, percent: '0.00%' },
        { product: 'Plywood', workcenter: 'HOTPRESS', checked: 235, buster: 3, delaminasi: 0, veneer_minus: 0, presmark: 2, lainnya: 2, total: 7, percent: '2.98%' },
        { product: 'Finger Joint', workcenter: 'HOTPRESS', checked: 0, buster: 0, delaminasi: 0, veneer_minus: 0, presmark: 0, lainnya: 0, total: 0, percent: '0.00%' },
    ];
    
    const totalRow = { checked: 515, buster: 6, delaminasi: 1, veneer_minus: 0, presmark: 2, lainnya: 3, total: 12, percent: '2.33%' };
    const percentRejectByJenis = { buster: '1.2%', delaminasi: '0.2%', veneer_minus: '0.0%', presmark: '0.4%', lainnya: '0.6%', total: '2.3%' };

    return (
        <div className="d-flex dashboard-bg min-vh-100">
            <style>{customStyles}</style>
            <div className="position-absolute top-0 start-0 p-3 sidebar-toggle-btn text-success" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ zIndex: 1000 }}>⋮</div>
            
            <div className={sidebarOpen ? "" : "sidebar-closed"}><Sidebar /></div>

            <div className="flex-grow-1 d-flex flex-column min-vh-100" style={{ minWidth: 0 }}>
                <div style={{ padding: "15px" }}></div>
                <div className="reject-dashboard">
                    <style>{styles}</style>
                    <div className="dashboard-header">
                        <div>
                            <div className="company-name">PT.BAHANA BHUMIPHALA PERSADA</div>
                            <div className="title-block">
                                <h1>Overview</h1>
                                <h1 className="hotpress">REJECT <span style={{ marginLeft: 8 }}>HOTPRESS</span> 2025</h1>
                            </div>
                        </div>
                        <div onClick={() => navigate('/reject-hotpress')} style={{ backgroundColor: '#ff1c1c', color: '#fff', padding: '10px 18px', borderRadius: '2px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row-reverse' }}>← Back to Overview</div>
                        <div className="date-badge">Friday, 01 August 2025</div>
                    </div>

                    <div className="panel-container">
                        <div style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            JENIS REJECT BULAN INI
                        </div>
                        <div className="table-responsive-custom">
                            <table className="reject-table">
                                <thead>
                                    <tr>
                                        {["Tahun", "Bulan", "Produk", "Workcenter", "Produk Di Cek", "BUSTER", "DELAMINASI", "VENEER_MINUS", "PRESMARK", "LAINNYA", "Total Reject", "% Reject by Produk"].map((h, i) => (
                                            <th key={i}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthlyData.map((data, index) => (
                                        <tr key={index} style={{ background: index % 2 === 1 ? "rgba(255,255,255,0.03)" : "transparent" }}>
                                            <td>2025</td>
                                            <td>August-2025</td>
                                            <td style={{ textAlign: 'left', paddingLeft: '15px' }}>{data.product}</td>
                                            <td>{data.workcenter}</td>
                                            <td>{data.checked}</td>
                                            <td>{data.buster}</td>
                                            <td>{data.delaminasi}</td>
                                            <td>{data.veneer_minus}</td>
                                            <td>{data.presmark}</td>
                                            <td>{data.lainnya}</td>
                                            <td style={{ background: "rgba(0,0,0,0.3)", fontWeight: "bold" }}>{data.total}</td>
                                            <td>{data.percent}</td>
                                        </tr>
                                    ))}
                                    <tr className="total-row">
                                        <td colSpan="4">TOTAL</td>
                                        <td>{totalRow.checked}</td>
                                        <td>{totalRow.buster}</td>
                                        <td>{totalRow.delaminasi}</td>
                                        <td>{totalRow.veneer_minus}</td>
                                        <td>{totalRow.presmark}</td>
                                        <td>{totalRow.lainnya}</td>
                                        <td>{totalRow.total}</td>
                                        <td>{totalRow.percent}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr className="footer-row">
                                        <td colSpan="5" style={{ textAlign: 'left', paddingLeft: '15px' }}>% Reject by Jenis Reject</td>
                                        <td>{percentRejectByJenis.buster}</td>
                                        <td>{percentRejectByJenis.delaminasi}</td>
                                        <td>{percentRejectByJenis.veneer_minus}</td>
                                        <td>{percentRejectByJenis.presmark}</td>
                                        <td>{percentRejectByJenis.lainnya}</td>
                                        <td colSpan="2">{percentRejectByJenis.total}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotpressCurrentMonth;