import React from "react";
import LogoImage from './assets/PT_BBP_LOGODASHBOARD.png';

const Sidebar = () => {
    const getLinkClass = (path) => {
        const isActive = window.location.pathname === path;
        let classes = "d-block p-2 text-decoration-none rounded mb-1 small text-dark";
        if (isActive) classes += " bg-success fw-bold text-white";
        else classes += " hover-bg-secondary";
        return classes;
    };

    return (
        <div className="sidebar p-3 text-dark h-100 flex-shrink-0" style={{ width: '250px', backgroundColor: '#ffffff' }}>
            {/* Bagian Logo: ps-4 memberikan ruang untuk icon ⋮ melayang */}
            <div className="mb-4 mt-0 ps-4">
                <img
                    src={LogoImage}
                    alt="PT BBP Logo"
                    className="img-fluid"
                    style={{ width: '100%', borderRadius: '4px' }}
                />
            </div>

            {/* Menu Navigasi */}
            <div className="small text-start">
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
    );
};

export default Sidebar;