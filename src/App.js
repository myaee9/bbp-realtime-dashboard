import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import Login from './login'; 


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

const App = () => {
    return (
        <Router>
            <nav style={{ display: "none" }}></nav>
            
            <Routes>
                <Route path="/" element={<Login />} />

        
                <Route path="/shipment" element={<ShipmentDashboardBS />} />
                <Route path="/home" element={<HomeDashboardBS />} />
                <Route path="/rencana-pengiriman" element={<DeliveryPlanCalendar />} />

                <Route path="/reject-by-machine" element={<RejectByMachineDashboard />} />
                <Route path="/reject-qc-fg" element={<RejectRateQCFG title="Reject Rate QC Grading FG" />} />
                <Route path="/reject-qc-fi" element={<RejectRateQCFI title="Reject Rate FI" />} />

         
                <Route path="/reject-hotpress" element={<RejectHotpress />} />
                <Route path="/hotpress-current-month" element={<HotpressCurrentMonth />} />
                <Route path="/reject-blow-detector" element={<RejectBlowDetector />} />
                <Route path="/reject-sanding" element={<RejectSanding />} />
                <Route path="/sanding-current-month" element={<SandingCurrentMonth />} />
                <Route path="/reject-grading-fg" element={<RejectGradingFG />} />
                <Route path="/reject-grading-fi" element={<RejectGradingFI />} />

                <Route path="/log-arrival" element={<LogArrival />} />
                <Route path="/log-supply" element={<LogSupply />} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;