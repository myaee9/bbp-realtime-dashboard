import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoImage from './assets/PT_BBP_LOGODASHBOARD.png';
import LogArrivalTable from './LogArrivalTable';
import { useNavigate } from 'react-router-dom';

// --- CSS STYLES (Disinkronkan dengan RejectGradingFG) ---
const customStyles = `
* { 
    margin: 0 !important; 
    padding: 0 !important; 
    box-sizing: border-box; 
}

html, body, #root { 
    background-color: #f8f9fa; 
}

.sidebar {
  background-color: #ffffff;
  border-right: 1px solid #f1f1f1;
  transition: width 0.3s ease, padding 0.3s ease;
  width: 250px;
  height: 100vh;
}

.sidebar-closed { 
    width: 0 !important; 
    padding: 0 !important; 
    overflow: hidden !important; 
}

.sidebar-toggle-btn { 
    cursor: pointer; 
    font-size: 24px; 
    z-index: 1050; 
}

.hover-bg-secondary:hover { 
    background-color: #e9ecef; 
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
const LogArrival = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedDate = currentTime.toLocaleDateString('en-GB', {
        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    });

    return (
        <div className="d-flex dashboard-bg min-vh-100">
            <style>{customStyles}</style>
            
            {/* Toggler - Menggunakan zIndex dan koordinat yang persis dengan RejectGradingFG */}
            <div 
                className="position-absolute top-0 start-0 p-3 sidebar-toggle-btn text-success" 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                style={{ lineHeight: "1", marginTop: "5px", marginLeft: "5px", zIndex: 1000 }}
            >
                ⋮
            </div>

            {/* Sidebar Wrapper */}
            <div className={sidebarOpen ? "" : "sidebar-closed"}>
                <Sidebar />
            </div>

            {/* Area Konten Utama */}
            <div className="flex-grow-1 position-relative">
                <Container fluid className="p-0">
                    {/* Header Area yang Sejajar Vertikal dengan Logo Sidebar */}
                    <div className="bg-white px-4 py-3 border-0 m-0" style={{ borderBottom: 'none' }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="ps-4"> {/* Padding tambahan agar teks tidak tertimpa ikon ⋮ saat sidebar tutup */}
                                <h1 style={{ color: '#1a5276', fontWeight: 'bold', fontSize: '1.8rem', margin: 0 }}>Performance Kedatangan Log</h1>
                                <h1 style={{ color: '#1a5276', fontWeight: 'bold', fontSize: '2rem', margin: 0 }}>PT. B B P</h1>
                            </div>
                            <div style={{ backgroundColor: '#1e293b', color: 'white', padding: '6px 14px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem', borderRadius: '5px' }}>
                                {formattedDate}
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #dee2e6', padding: '5px 20px', color: '#6c757d', letterSpacing: '2px', fontWeight: '500', backgroundColor: '#ffffff' }}>
                        PURCHASING
                    </div>

                    <div className="p-4 bg-white">
                        <LogArrivalTable />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default LogArrival;