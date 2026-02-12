import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoImage from './assets/PT_BBP_LOGODASHBOARD.png'
import { Container, Row, Col, Card } from 'react-bootstrap';
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
import { Doughnut } from 'react-chartjs-2'; 
import ChartDataLabels from 'chartjs-plugin-datalabels'; 
import { useNavigate } from 'react-router-dom';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    ChartDataLabels
);

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

.table.table-no-striped tbody tr:nth-of-type(odd) {
    background-color: #fff !important; 
}


.table-big-row td, .table-big-row th {
    padding: 10px 8px !important; 
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


const shipmentData = [
    { month: 'January-2025', target: 1500.0, delivery: 1342.99, percentActual: 89.53, percentTable: 90 },
    { month: 'February-2025', target: 1500.0, delivery: 1400.17, percentActual: 93.34, percentTable: 93 },
    { month: 'March-2025', target: 1500.0, delivery: 1043.74, percentActual: 69.58, percentTable: 70 },
    { month: 'April-2025', target: 1500.0, delivery: 1203.88, percentActual: 80.25, percentTable: 80 },
    { month: 'May-2025', target: 1500.0, delivery: 1628.16, percentActual: 108.54, percentTable: 109 },
    { month: 'June-2025', target: 1500.0, delivery: 1224.95, percentActual: 81.66, percentTable: 82 },
    { month: 'July-2025', target: 1500.0, delivery: 1379.47, percentActual: 91.96, percentTable: 92 },
    { month: 'Agustus-2025', target: 1500.0, delivery: '-', percentActual: 0.0, percentTable: 0 },
    { month: 'September-2025', target: 1500.0, delivery: '-', percentActual: 0.0, percentTable: 0 },
    { month: 'Oktober-2025', target: 1500.0, delivery: '-', percentActual: 0.0, percentTable: 0 },
    { month: 'November-2025', target: 1500.0, delivery: '-', percentActual: 0.0, percentTable: 0 },
    { month: 'Desember-2025', target: 1500.0, delivery: '-', percentActual: 0.0, percentTable: 0 },
];

const productData = [
    { name: 'Doorcore', percent: 34, color: '#007bff' },
    { name: 'Plywood', percent: 41, color: '#ffc107' },
    { name: 'LVL', percent: 6, color: '#6c757d' },
    { name: 'Finger Joint', percent: 2, color: '#28a745' },
    { name: 'Barecore Layer', percent: 6, color: '#dc3545' },
    { name: 'BlockBoard', percent: 11, color: '#17a2b8' },
];



const BarChartRepresentation = ({ data }) => {
    const chartData = data.slice(0, 7).reverse();
    const maxAxis = 1800;

    const formatNumber = (num) => {
        if (typeof num === 'string' && num === '-') return '-';
        return parseFloat(num).toFixed(2);
    };

    const formatPercent = (percent) => {
        return percent.toFixed(1) + '%';
    };

    const barContainerStyle = {
        padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: '#ffffff', 
        border: '1px solid #dee2e6',
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.05)',
        minHeight: '370px',
    };

    const sectionTitleStyle = {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#333',
        padding: '5px 0',
        borderBottom: '1px solid #ddd',
        marginBottom: '10px',
    };

    const xAxisLabels = [
        '0.00', '200.00', '400.00', '600.00', '800.00', '1000.00', '1200.00', '1400.00', '1600.00', '1800.00'
    ];


    return (
        <div style={barContainerStyle}>
            <div style={sectionTitleStyle}>DELIVERY PERFORMANCE 2025</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '10px 0 0 0' }}>
                {chartData.map((item, index) => {
                    const actualDelivery = parseFloat(item.delivery);
                    const percentageOfMax = isNaN(actualDelivery) ? 0 : (actualDelivery / maxAxis) * 100;
                    const isTargetMet = item.percentActual >= 100;
                    const barColor = isTargetMet ? '#28a745' : '#dc3545'; 

                    return (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', height: '25px' }}>

                            <div style={{ width: '100px', textAlign: 'right', marginRight: '10px', color: '#333', fontWeight: 'bold' }}>
                                {item.month}
                            </div>

                            <div style={{ flexGrow: 1, height: '25px', position: 'relative', backgroundColor: '#e9ecef', borderRadius: '2px' }}>
                                <div
                                    style={{
                                        width: `${percentageOfMax}%`,
                                        height: '100%',
                                        backgroundColor: barColor,
                                        borderRadius: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '0 5px',
                                        minWidth: percentageOfMax > 5 ? '80px' : '0'
                                    }}
                                >
                                   
                                    <span style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '0.8rem',
                                        textShadow: '1px 1px 2px #000',
                                    }}>
                                        {item.delivery !== '-' ? formatNumber(item.delivery) : ''}
                                    </span>

                                   
                                    <span style={{
                                        color: 'white',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        textShadow: '1px 1px 2px #000',
                                    }}>
                                        {item.delivery !== '-' ? formatPercent(item.percentActual) : ''}
                                    </span>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>

          
            <div style={{ height: '1px', backgroundColor: '#ddd', marginTop: '20px', position: 'relative' }}>
                {xAxisLabels.slice(1, -1).map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        height: '5px',
                        width: '1px',
                        backgroundColor: '#bbb',
                        bottom: '-5px',
                        left: `${((i + 1) / 9) * 100}%`
                    }}></div>
                ))}
            </div>

          
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.7rem',
                color: '#666',
                marginTop: '5px',
                paddingLeft: '110px',
                paddingRight: '0px'
            }}>
                {xAxisLabels.map((label, i) => (
                    <span key={i} style={{ minWidth: '30px', textAlign: 'center' }}>{label}</span>
                ))}
            </div>
        </div>
    );
};



const PieChartRepresentation = ({ data }) => {
    
  
    const chartData = {
        labels: data.map(item => item.name),
        datasets: [
            {
                data: data.map(item => item.percent),
                backgroundColor: data.map(item => item.color),
                hoverOffset: 4,
                borderWidth: 1, 
                borderColor: '#ffffff', 
            },
        ],
    };


    const chartOptions = {
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
                display: false,
            },
            datalabels: {
                 color: '#fff', 
                 font: { 
                    weight: 'bold', 
                    size: 11 
                 },
                 formatter: (value) => value > 0 ? value + '%' : '',
                 align: 'center',
                 textShadow: { 
                    color: 'rgba(0, 0, 0, 0.7)', 
                    blur: 3 
                 },
            }
        },
        cutout: '0%', 
    };


    const sectionTitleStyle = {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#333',
        padding: '5px 0',
        borderBottom: '1px solid #ddd',
        marginBottom: '10px',
    };

    
    const legendItemStyle = (color) => ({
        display: 'flex',
        alignItems: 'center',
        marginRight: '15px',
        marginBottom: '5px',
        minWidth: '100px',
        fontSize: '0.8rem',
    });

    const legendColorBoxStyle = (color) => ({
        width: '10px',
        height: '10px',
        backgroundColor: color,
        marginRight: '5px',
        display: 'inline-block',
        borderRadius: '2px',
        border: '1px solid #ccc'
    });


   return (
        <Card className="shadow-sm h-100" style={{ minHeight: '370px' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={sectionTitleStyle}>DELIVERY BY PRODUCT – 2025</div>

               
                <div style={{ position: 'relative', width: '220px', height: '220px', margin: '5px auto 30px auto' }}>
                    
                   
                    <Doughnut data={chartData} options={chartOptions} plugins={[ChartDataLabels]} /> 
                    
                </div>
                
             
                <div style={{
                    fontSize: '0.8rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '10px 15px',
                    padding: '0 10px',
                    color: '#333'
                }}>
                    {data.map((item, index) => (
                         <div key={index} style={legendItemStyle(item.color)}>
                            <div style={legendColorBoxStyle(item.color)}></div>
                            <span style={{ fontWeight: '500' }}>{item.name}</span>
                        </div>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );
};



const DashboardHeader = ({ formattedTime }) => {
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

    return (
        <div style={{ padding: '0px', backgroundColor: '#f5f5f5' }}> 
            <div style={headerStyle}>
                <span>Plan Vs Actual Shipment</span>
                <span style={{ fontSize: '16px' }}> {formattedTime}</span> 
            </div>
        </div>
    );
};



const ShipmentDashboardBS = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });



   
    const tableHeaderStyle = {
        backgroundColor: '#333', 
        fontWeight: 'bold',
        fontSize: '14px', 
        color: '#fff', 
        textAlign: 'center',
        padding: '10px 8px', 
        border: '1px solid #333' 
    }
    
 
    const tableDataStyle = {
        textAlign: 'center', 
        padding: '10px 8px', 
        border: '1px solid #dee2e6', 
        backgroundColor: '#fff', 
        fontSize: '14px', 
    }

  
    const cardTitleStyle = {
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#333',
        padding: '10px 15px',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#fff' 
    }


    return (
         <>
            <style>{customStyles}</style>

            <div className="d-flex dashboard-bg min-vh-100 text-dark">

              
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

                
                <div className="flex-grow-1">

                
                    <DashboardHeader formattedTime={formattedTime} />

                 
                    <Container fluid style={{ padding: '15px' }}>
                        
                     
                        <Row className="d-flex h-100"> 
                            
                            
                            <Col lg={8} md={12} className="mb-4 d-flex"> 
                                
                            
                                <Card className="shadow-sm w-100 d-flex flex-column" style={{ minHeight: '80vh' }}>
                                    
                                   
                                    <div style={cardTitleStyle}>
                                        Detail Plan vs Actual Shipment
                                    </div>
                                    
                                  
                                    <Card.Body className="p-0 d-flex flex-column flex-grow-1">
                                        
                                      

                                        <div className="table-responsive flex-grow-1" style={{ overflowY: 'auto' }}> 

                                            <table className="table table-no-striped table-big-row" style={{ marginBottom: '0' }}> 

                                               
                                                <thead>
                                                    <tr>
                                                        <th rowSpan="2" style={{...tableHeaderStyle, width: '25%', borderRight: '1px solid #fff'}}> 
                                                            Month Report
                                                        </th>
                                                        <th colSpan="2" style={{...tableHeaderStyle, borderRight: '1px solid #fff'}}>
                                                            Stuffing
                                                        </th>
                                                        <th rowSpan="2" style={{...tableHeaderStyle, width: '15%'}}>
                                                            Percent Capian (%)
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th style={{...tableHeaderStyle, width: '15%', borderRight: '1px solid #fff'}}>
                                                            Target (M3)
                                                        </th>
                                                        <th style={{...tableHeaderStyle, width: '15%', borderRight: '1px solid #fff'}}>
                                                            Delivery (M3)
                                                        </th>
                                                    </tr>
                                                </thead>

                                             
                                                <tbody>
                                                    {shipmentData.map((item, index) => {
                                                    
                                                        const percentColor = item.percentTable >= 85 && item.percentTable > 0 ? '#28a745' : '#dc3545';
                                                        const deliveryText = item.delivery === '-' ? '-' : parseFloat(item.delivery).toLocaleString('en-US', { minimumFractionDigits: 2 });
                                                        
                                                      
                                                        const rowBg = index % 2 === 0 ? '#f8f9fa' : 'white'; 
                                                        
                                                        return (
                                                            <tr key={index} style={{ backgroundColor: rowBg }}>
                                                         
                                                                <td style={{ ...tableDataStyle, textAlign: 'left', paddingLeft: '15px' }}>{item.month}</td>
                                                                
                                                           
                                                                <td style={{ ...tableDataStyle, textAlign: 'right' }}>{item.target.toLocaleString('en-US', { minimumFractionDigits: 1 })}</td>
                                                                
                                                              
                                                                <td style={{ ...tableDataStyle, textAlign: 'right' }}>{deliveryText}</td>
                                                                
                                                             
                                                                <td style={{
                                                                    ...tableDataStyle,
                                                                    fontWeight: 'bold',
                                                                    color: percentColor,
                                                                    textAlign: 'center'
                                                                }}
                                                                >
                                                                    {item.percentTable}%
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>

                         
                            <Col lg={4} md={12} className="d-flex h-100">
                                <Row className="w-100">
                                
                                    <Col xs={12} className="mb-3">
                                        <BarChartRepresentation data={shipmentData} />
                                    </Col>

                                   
                                    <Col xs={12}>
                                        <PieChartRepresentation data={productData} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default ShipmentDashboardBS;