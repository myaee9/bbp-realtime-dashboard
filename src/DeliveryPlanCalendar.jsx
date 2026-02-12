import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BPPLogo from './assets/PT_BBP_LOGO.png';
import { useNavigate } from 'react-router-dom';
import LogoImage from './assets/PT_BBP_LOGODASHBOARD.png';



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
    width: 250px;
    min-width: 250px;
}



.content-box {
    background-color: #ffffff;
    border: 1px solid #dee2e6;
    color: #212529;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

.sidebar-closed {
    width: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    min-width: 0 !important;
}

.sidebar-toggle-btn {
    cursor: pointer;
    font-size: 24px;
    z-index: 999;
}


.calendar-container { border: 1px solid #dee2e6; background-color: #fff; box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05); border-radius: 0.5rem; }
.calendar-day-header { background-color: #6c757d; color: white; font-weight: bold; text-align: center; border: 1px solid #dee2e6; }
.calendar-day-header:nth-child(5) { background-color: #ffc107; color: #212529; } 
.calendar-day-cell { min-height: 120px; border: 1px solid #dee2e6 !important; padding: 5px !important; position: relative; }
.calendar-day-cell.other-month { background-color: #f8f9fa; color: #adb5bd; }
.day-number { font-size: 0.9rem; font-weight: bold; position: absolute; top: 5px; right: 5px; }
.delivery-item { font-size: 0.7rem; line-height: 1.2; margin: 0 !important; color: #0d6efd; }
.estimate-tag { font-size: 0.8rem; font-weight: bold; background-color: #ffc107; color: #212529; padding: 2px 4px; border-radius: 3px; }
.footer-notes { background-color: #f8f9fa; border-top: 1px solid #dee2e6 !important; padding: 0.5rem !important; font-size: 0.8rem; }
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

const DELIVERY_PLAN_DATA = {
    '2025-08-15': [
        { product: 'NGI', ctr: 1, value: 7.6, color: 'blue' },
        { product: 'PGI', ctr: 1, value: 53.05, color: 'blue' },
        { product: 'DCK', ctr: 1, value: 1.1, color: 'blue' },
    ],
};
const MONTHLY_ESTIMATE = {
    '2025-08': 61.748,
};
const TARGET_YEAR = 2025;
const TARGET_MONTH_INDEX = 7;
const TARGET_MONTH_NAME = 'August';
const DAYS_OF_WEEK = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];


const getDaysInMonth = (year, monthIndex) => {
    const date = new Date(year, monthIndex, 1);
    const days = [];
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    let firstDayOfWeek = date.getDay();
    if (firstDayOfWeek === 0) firstDayOfWeek = 7;

    const daysFromPrevMonthNeeded = firstDayOfWeek - 1;
    const prevMonth = new Date(year, monthIndex, 0);
    const prevMonthDays = prevMonth.getDate();

    for (let i = daysFromPrevMonthNeeded - 1; i >= 0; i--) {
        const prevMonthDate = new Date(year, monthIndex, -(i));
        days.push({
            day: prevMonthDays - i,
            month: monthIndex - 1,
            isCurrentMonth: false,
            dateKey: `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, '0')}-${String(prevMonthDays - i).padStart(2, '0')}`
        });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            day: i,
            month: monthIndex,
            isCurrentMonth: true,
            dateKey: `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
        });
    }

    const totalCells = 42;
    const daysFromNextMonthNeeded = totalCells - days.length;

    for (let i = 1; i <= daysFromNextMonthNeeded; i++) {
        const nextMonthDate = new Date(year, monthIndex + 1, i);
        days.push({
            day: i,
            month: monthIndex + 1,
            isCurrentMonth: false,
            dateKey: `${nextMonthDate.getFullYear()}-${String(nextMonthDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
        });
    }

    return days;
};


const DeliveryPlanCalendar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const days = getDaysInMonth(TARGET_YEAR, TARGET_MONTH_INDEX);
    const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    const targetMonthKey = `${TARGET_YEAR}-${String(TARGET_MONTH_INDEX + 1).padStart(2, '0')}`;
    const monthlyEstimate = MONTHLY_ESTIMATE[targetMonthKey];


    const renderCalendarGrid = () => {
        const rows = [];
        for (let i = 0; i < days.length; i += 7) {
            const week = days.slice(i, i + 7);
            rows.push(
                <div className="row g-0" key={i}>
                    {week.map((dayData, index) => {
                        const currentDayKey = `${TARGET_YEAR}-${String(TARGET_MONTH_INDEX + 1).padStart(2, '0')}-${String(dayData.day).padStart(2, '0')}`;
                        const deliveryItems = DELIVERY_PLAN_DATA[currentDayKey];
                        const isDeliveryDate = dayData.dateKey === '2025-08-15' && dayData.isCurrentMonth;

                        let cellContent;
                        if (isDeliveryDate && deliveryItems) {
                            cellContent = (
                                <>
                                    {deliveryItems.map((item, dIndex) => (
                                        <p key={dIndex} className="delivery-item text-primary" style={{ color: item.color }}>{`${item.product} ${item.ctr} Ctr (${item.value.toFixed(2)})`}</p>
                                    ))}
                                    <p className="estimate-tag mt-1">Fst Dlv Aug : {monthlyEstimate}</p>
                                </>
                            );
                        }

                        const today = new Date();
                        const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                        const isToday = dayData.dateKey === todayKey;


                        return (
                            <div
                                className={`col calendar-day-cell ${dayData.isCurrentMonth ? '' : 'other-month'} ${isToday ? 'border border-primary border-3' : ''}`}
                                key={index}
                                style={{
                                    minWidth: '14.28%',
                                    padding: '5px',
                                    fontWeight: isDeliveryDate ? 'bold' : 'normal',
                                }}
                            >
                                <span className="day-number">{String(dayData.day).padStart(2, '0')}</span>
                                <div className="mt-4">
                                    {cellContent}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
        return rows;
    };


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
                        marginLeft: "5px",
                    }}
                >
                    ⋮
                </div>


                <div className={sidebarOpen ? "" : "sidebar-closed"}>
                    <Sidebar />
                </div>


                <div className="flex-grow-1 p-4 text-dark">


                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                            <img
                                src={BPPLogo}
                                alt="BPP Logo"
                                className="me-2"
                                style={{ width: '40px', height: '40px' }}
                            />
                            <h1 className="h3 fw-bold text-success m-0">RENCANA PENGIRIMAN</h1>
                        </div>
                        <div className="d-flex align-items-end flex-column">
                            <p className="fs-3 fw-bold m-0" style={{ color: '#ffc107' }}>{formattedTime}</p>
                            <p className="h4 fw-bold text-dark m-0">{TARGET_YEAR}</p>
                            <p className="h3 fw-bold text-primary m-0">{TARGET_MONTH_NAME}</p>
                        </div>
                    </div>


                    <div className="calendar-container">


                        <div className="row g-0 text-white">
                            {DAYS_OF_WEEK.map((day, index) => (
                                <div
                                    className="col calendar-day-header p-2"
                                    key={index}
                                    style={{ minWidth: '14.28%', backgroundColor: (index >= 4 && index <= 5) ? '#ffc107' : '#6c757d', color: (index >= 4 && index <= 5) ? '#212529' : 'white' }}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="calendar-grid">
                            {renderCalendarGrid()}
                        </div>


                        <div className="d-flex footer-notes">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeliveryPlanCalendar;