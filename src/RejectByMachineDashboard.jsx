import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import LogoImage from './assets/PT_BBP_LOGODASHBOARD.png';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    Cell,
} from "recharts";



const customStyles = `
* {
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box;
}

body {
    margin-top: 0 !important;
    border-top: 0 !important;
    background-color: #0D4B34 !important;
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
    background-color: #0D4B34 !important;
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
    width: 250px; 
    min-width: 250px;
}


.main-content {
    flex-grow: 1;
    min-height: 100vh;
    transition: margin-left 0.3s;
}

.dashboard-bg-main {
    background-color: #0D4B34;
}


.sidebar-closed {
    width: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    min-width: 0 !important;
    transition: width 0.3s;
}


.sidebar-toggle-btn {
    cursor: pointer;
    font-size: 24px;
    z-index: 999;
}


.dashboard-header-right {
    background-color: #0D4B34;
    padding: 20px 40px 20px 40px; 
    border-bottom: 2px solid #D6FF0033;
    display: flex;
    justify-content: space-between; 
    align-items: center;
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
        <div className="sidebar p-3 text-dark h-100 d-flex flex-column justify-content-between flex-shrink-0">
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

const RejectByMachineDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);


    const currentYear = new Date().getFullYear();


    const data = [
        { name: "Hot Press Reject Rate", value: 1.4, color: "#4A90E2" },
        { name: "Blow Detector Reject Rate", value: 12.7, color: "#F5A623" },
        { name: "Sanding Reject Rate", value: 13.2, color: "#D0021B" },
        { name: "Finish Good Reject Rate", value: 15.0, color: "#F8E71C" },
        { name: "Final Inspection Reject Rate", value: 5.6, color: "#50E3C2" },
    ];

    const tableData = [
        { group: "Hot Press Reject Rate", target: "5%", cek: "156,622", reject: "2,127", bulan: "8", avrgCek: "19,578", avrgReject: "266", percent: "1.4%" },
        { group: "Blow Detector Reject Rate", target: "5%", cek: "158,918", reject: "20,188", bulan: "8", avrgCek: "19,865", avrgReject: "2,524", percent: "12.7%" },
        { group: "Sanding Reject Rate", target: "5%", cek: "160,100", reject: "21,106", bulan: "8", avrgCek: "20,013", avrgReject: "2,638", percent: "13.2%" },
        { group: "Finish Good Reject Rate", target: "9%", cek: "205,593", reject: "30,739", bulan: "8", avrgCek: "25,699", avrgReject: "3,842", percent: "15.0%" },
        { group: "Final Inspection Reject Rate", target: "4.5%", cek: "199,525", reject: "11,196", bulan: "8", avrgCek: "24,941", avrgReject: "1,400", percent: "5.6%" },
    ];


    const CustomLegend = ({ data }) => (
        <div style={{ marginBottom: '15px', padding: '10px', background: 'rgba(0,0,0,0.1)', border: '1px solid #333' }}>
            <h6 style={{ color: 'white', marginBottom: '10px', marginTop: '0' }}>REJECT BY MACHINE</h6>
            <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '12px' }}>
                {data.map((entry, index) => (
                    <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: '15px', marginBottom: '5px' }}>
                        <div style={{ width: '10px', height: '10px', backgroundColor: entry.color, marginRight: '5px' }}></div>
                        <span style={{ color: 'white' }}>{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );


    const getPercentCellStyle = (percent, target) => {
        const numericPercent = parseFloat(percent.replace('%', ''));
        const numericTarget = parseFloat(target.replace('%', ''));
        return numericPercent > numericTarget ? { color: "red", fontWeight: "bold" } : { color: "black", fontWeight: "bold" };
    };


    return (
        <>
            <style>{customStyles}</style>


            <div className="d-flex min-vh-100 text-light">


                <div
                    className="position-absolute top-0 start-0 p-3 sidebar-toggle-btn text-success"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    style={{
                        fontSize: "24px",
                        cursor: "pointer",
                        lineHeight: "1",
                        marginTop: "5px",
                        marginLeft: "5px",
                        zIndex: 1001,
                        transition: 'margin-left 0.3s'
                    }}
                >
                    ⋮
                </div>


                <div className={sidebarOpen ? "" : "sidebar-closed"}>
                    <Sidebar />
                </div>
                <div className="main-content dashboard-bg-main" style={{ color: "white" }}>

                    
                    <div className="dashboard-header-right">
                        <div className="text-right">
                            <h5 style={{ letterSpacing: "1px", marginBottom: "-5px", color: "white", fontSize: '18px' }}>
                                PT. BAHANA BHUMIPHALA PERSADA
                            </h5>
                            <h1 style={{ fontWeight: "300", fontSize: '48px', margin: '0' }}>
                                Overview <b style={{ color: "white" }}>REJECT BY</b>
                                <span style={{ color: "#D6FF00", fontWeight: "700" }}>
                                    MACHINE
                                </span>
                                {currentYear}
                            </h1>
                        </div>
                    </div>

                    <div style={{ padding: '20px 0' }}></div>


                    <div className="container-fluid p-4">
                      <div className="row" style={{ gap: "0px" }}>


        
                            <div className="col-md-7 mb-4" style={{ paddingRight: '10px' }}>
                                <div
                                    style={{
                                        background: "white",
                                        color: "black",
                                        borderRadius: "4px",
                                        border: '1px solid #ddd',
                                        overflow: 'hidden',
                                        height: "420px", 
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <table className="table table-bordered text-center" style={{ fontSize: "14px", margin: "0" }}>
                                        <thead style={{ background: "#EFEFEF" }}>
                                            <tr>
                                                <th style={{ verticalAlign: 'middle', width: '25%' }}>GROUP Reject</th> 
                                                <th style={{ verticalAlign: 'middle', width: '10%' }}>Target (%)</th> 
                                                <th colSpan="2" style={{ width: '25%' }}>{currentYear}</th> 
                                                <th style={{ verticalAlign: 'middle', width: '5%' }}>Bulan</th>
                                                <th colSpan="2" style={{ width: '25%' }}>Avrg / Bln</th> 
                                                <th style={{ verticalAlign: 'middle', width: '10%' }}>% Reject</th> 
                                            </tr>
                                            <tr>
                                                <th style={{ display: 'none' }}></th>
                                                <th style={{ display: 'none' }}></th>
                                                <th style={{ fontWeight: 'bold' }}>CEK</th>
                                                <th style={{ fontWeight: 'bold' }}>Reject</th>
                                                <th style={{ display: 'none' }}></th>
                                                <th style={{ fontWeight: 'bold' }}>CEK</th>
                                                <th style={{ fontWeight: 'bold' }}>Reject</th>
                                                <th style={{ display: 'none' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.map((row, index) => (
                                                <tr key={index} style={{ height: '50px' }}>
                                                    <td style={{ textAlign: 'left', paddingLeft: '10px' }}>{row.group}</td>
                                                    <td style={{ fontWeight: 'bold' }}>{row.target}</td>
                                                    <td style={{ fontWeight: 'bold' }}>{row.cek}</td>
                                                    <td style={{ fontWeight: 'bold' }}>{row.reject}</td>
                                                    <td style={{ fontWeight: 'bold' }}>{row.bulan}</td>
                                                    <td style={{ fontWeight: 'bold' }}>{row.avrgCek}</td>
                                                    <td style={{ fontWeight: 'bold' }}>{row.avrgReject}</td>
                                                    <td style={getPercentCellStyle(row.percent, row.target)}>{row.percent}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

            
                            <div className="col-md-5 mb-4" style={{ paddingLeft: '10px' }}>
                                <div
                                    style={{
                                        background: "#2F2F2F",
                                        padding: "10px 20px 20px 20px",
                                        borderRadius: "4px",
                                        color: "white",
                                        height: "420px", 
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <div style={{ padding: '0 0px 10px 0px', background: '#2F2F2F', borderBottom: '1px solid #333' }}>
                                        <h6 style={{ color: 'white', fontSize: '14px', marginBottom: '5px', marginTop: '5px' }}>REJECT BY MACHINE</h6>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '10px', lineHeight: '1.2' }}>
                                            {data.map((entry, index) => (
                                                <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: '5px', marginBottom: '0' }}>
                                                    <div style={{ width: '8px', height: '8px', backgroundColor: entry.color, marginRight: '3px' }}></div>
                                                    <span style={{ color: 'white' }}>{entry.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <ResponsiveContainer width="100%" height="100%">

                                <BarChart
                                    data={data}
                                    layout="vertical"
                                    margin={{ top: 10, right: 20, left: 0, bottom: 5 }} 
                                >

                                            <XAxis
                                                type="number"
                                                domain={[0.0, 16.0]}
                                                stroke="#aaa"
                                                tick={{ fill: 'white' }}
                                                axisLine={{ stroke: '#888' }}
                                            />
                                            <YAxis
                                                type="category"
                                                dataKey="name"
                                                stroke="#aaa"
                                                width={10}
                                                tick={false}
                                            />
                                            <Tooltip
                                                formatter={(value, name, props) => [`${value}%`, props.payload.name]}
                                                contentStyle={{ backgroundColor: '#333', border: 'none', color: 'white' }}
                                            />
                                            <Bar dataKey="value" barSize={35}>
                                                <LabelList
                                                    dataKey="value"
                                                    position="right"
                                                    formatter={(value) => `${value}%`}
                                                    fill="#D6FF00"
                                                    style={{ fontWeight: 'bold', fontSize: '14px' }}
                                                />
                                                {data.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default RejectByMachineDashboard;