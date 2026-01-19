import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Halaman Login
import Login from './login'; 

// Import Dashboard Components
import ShipmentDashboardBS from './ShipmentDashboardBS';
import HomeDashboardBS from './HomeDashboardBS';
import DeliveryPlanCalendar from './DeliveryPlanCalendar';
import RejectByMachineDashboard from './RejectByMachineDashboard';
import RejectRateQCFG from './RejectRateQCFG';
import RejectRateQCFI from './RejectRateQCFI';
import RejectHotpress from './RejectHotpress';
import HotpressCurrentMonth from './HotpressCurrentMonth';
import RejectBlowDetector from './RejectBlowDetector';
import RejectSanding from './RejectSanding';
import SandingCurrentMonth from './SandingCurrentMonth';
import RejectGradingFG from './RejectGradingFG';
import RejectGradingFI from './RejectGradingFI';
import LogArrival from './LogArrival';
import LogSupply from './LogSupply';

/**
 * App Component
 * Mengatur rute utama aplikasi. 
 * Halaman pertama yang diakses adalah Login.
 */
const App = () => {
    return (
        <Router>
            {/* Navigasi disembunyikan sesuai permintaan kode awal */}
            <nav style={{ display: "none" }}></nav>
            
            <Routes>
                {/* HALAMAN UTAMA: Login */}
                <Route path="/" element={<Login />} />

                {/* DASHBOARD ROUTES */}
                <Route path="/shipment" element={<ShipmentDashboardBS />} />
                <Route path="/home" element={<HomeDashboardBS />} />
                <Route path="/rencana-pengiriman" element={<DeliveryPlanCalendar />} />

                {/* Summary Reject Rate */}
                <Route path="/reject-by-machine" element={<RejectByMachineDashboard />} />
                <Route path="/reject-qc-fg" element={<RejectRateQCFG title="Reject Rate QC Grading FG" />} />
                <Route path="/reject-qc-fi" element={<RejectRateQCFI title="Reject Rate FI" />} />

                {/* Detail Overview Reject Rate */}
                <Route path="/reject-hotpress" element={<RejectHotpress />} />
                <Route path="/hotpress-current-month" element={<HotpressCurrentMonth />} />
                <Route path="/reject-blow-detector" element={<RejectBlowDetector />} />
                <Route path="/reject-sanding" element={<RejectSanding />} />
                <Route path="/sanding-current-month" element={<SandingCurrentMonth />} />
                <Route path="/reject-grading-fg" element={<RejectGradingFG />} />
                <Route path="/reject-grading-fi" element={<RejectGradingFI />} />

                {/* KEDATANGAN BAHAN BAKU */}
                <Route path="/log-arrival" element={<LogArrival />} />
                <Route path="/log-supply" element={<LogSupply />} />

                {/* REDIRECT: Jika user mengetik URL sembarang, arahkan ke Login */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;