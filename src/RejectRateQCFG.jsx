import React, { useEffect, useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Container, Row, Col } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoImage from './assets/PT_BBP_LOGODASHBOARD.png';
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
  BarElement
);


const REJECT_RATE_DATA = {
  lineChartData: {
    labels: ['19/07', '07/20', '07/21', '07/22', '07/23', '07/24', '07/25', '07/26', '07/27', '07/28', '07/29', '07/30', '07/31', '01/08'],
    values: [14.4, 11.2, 14.5, 7.8, 14.0, 10.0, 12.8, 13.3, 12.0, 12.1, 16.3, 10.7, 20.8, 9.5],
    trend: -0.53,
    avg: 12.7
  },
  pieChartData: {
    labels: ['PLYWOOD', 'LVL', 'DOORCORE', 'BLOCKBOARD', 'BARECORE LAYER', 'FINGERJOINT'],
    data: [68, 14, 18, 0, 0, 0],
    colors: ['#0d6efd', '#fd7e14', '#dc3545', '#28a745', '#6f42c1', '#17a2b8']
  },
  barChartBuyerData: {
    buyers: ['CORINTHIAN INDUSTRIES INDONESIA, PT', 'WOOD INTERNATIONAL AGENCY LIMITED', 'SOCIETA LESNAMI PAGANONI SPA'],
    rejectRates: [12.0, 9.0, 18.0]
  },
  detailTableData: [
    { tahun: 2025, bulan: 'August', tgl: '01', shift: 'SHF-01', mesin: 'GRADING_FG', produkDicek: 268, pcsReject: 20, pctReject: 7.5 },
    { tahun: 2025, bulan: 'August', tgl: '01', shift: 'SHF-02', mesin: 'GRADING_FG', produkDicek: 0, pcsReject: 0, pctReject: 0.0 },
    { tahun: 2025, bulan: 'August', tgl: '01', shift: 'SHF-03', mesin: 'GRADING_FG', produkDicek: 0, pcsReject: 0, pctReject: 0.0 }
  ]
};

const TARGET_REJECT = 9.0;
const REPORT_DATE = '01 August 2025';


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
  height: 100%; 
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
  transition: width 0.3s ease, padding 0.3s ease; 
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

.hover-bg-secondary:hover {
  background-color: #e9ecef;
}


.report-canvas{
  background:#fff;
  padding:24px;
  border:none !important;
  box-shadow:0 4px 12px rgba(0,0,0,0.05);
  max-width:100%; 
  margin:0; 
  min-height: calc(100vh - 32px); 
}

.section-title {
  font-weight: 800;
  font-size: 16px;
  color: #343a40;
  margin-bottom: 12px;
}

.chart-card {
  background:#fff;
  border-radius:6px;
  padding:15px;
  border:1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.shift-chart-wrap { height: 180px; }

.table-wrap {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e9ecef;
  border-radius: 6px;
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 13px;
}

.detail-table th,
.detail-table td {
  padding: 8px 10px;
  border: 1px solid #dee2e6;
  vertical-align: middle;
  text-align: center;
}

.detail-table th {
  background:#343a40;
  color:#fff;
  position: sticky;
  top: 0;
  z-index: 2;
  font-weight: 600;
}

.detail-table td { background: #f8f9fa; }
.detail-table tr:nth-child(even) td { background: #fff; }

.trend-box {
    border: 1px solid #343a40;
    padding: 10px 18px;
    border-radius: 4px;
    background: #fff;
    min-width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.trend-box-title {
    font-size: 18px;
    font-weight: 900;
    color: #343a40;
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

const RejectPerHariChart = ({ values, labels, target }) => {
  const targetLineData = labels.map(() => target);

  const data = {
    labels,
    datasets: [
      { label: 'Target', data: targetLineData, borderColor: '#dc3545', borderWidth: 2, pointRadius: 0, tension: 0, fill: false, order: 2 },
      { label: '% Reject', data: values, borderColor: '#0d6efd', pointBackgroundColor: values.map(v => v > target ? '#dc3545' : '#0d6efd'), pointRadius: 5, tension: 0.3, fill: false, order: 1 }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { min: 0, max: 25, ticks: { callback: v => v + '%', stepSize: 5 } },
      x: { grid: { display: false } }
    }
  };

  return <div style={{ height: 230 }}><Line data={data} options={options} /></div>;
};

const RejectPerKategoriChart = ({ chartData }) => {
  const data = { labels: chartData.labels, datasets: [{ data: chartData.data, backgroundColor: chartData.colors }] };
  const options = { plugins: { legend: { display: false } }, maintainAspectRatio: false };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ width: 260, height: 260 }}><Pie data={data} options={options} /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {chartData.labels.map((l, i) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 14, background: chartData.colors[i], borderRadius: 3 }} />
            <div style={{ fontWeight: 500 }}>{l} <strong>{chartData.data[i]}%</strong></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RejectPerShiftChart = ({ data, target }) => {
  const labels = data.map(r => r.shift);
  const values = data.map(r => r.pctReject);

  const chartData = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Target',
        data: labels.map(() => target),
        borderColor: '#dc3545',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0
      },
      {
        type: 'bar',
        label: '% Reject',
        data: values,
        backgroundColor: values.map(v => v > target ? '#dc3545' : '#0d6efd'),
        borderRadius: 6,
        barPercentage: 0.6,
        categoryPercentage: 0.6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        min: 0,
        max: 25,
        ticks: { callback: v => v + '%' }
      }
    }
  };

  return (
    <div className="shift-chart-wrap" style={{ height: 200 }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};


const Top3RejectByBuyerChart = ({ buyerData }) => {
  const data = {
    labels: buyerData.buyers,
    datasets: [{
      label: '% Reject',
      data: buyerData.rejectRates,
      backgroundColor: '#3d1bd3ff',
      borderRadius: 6,
      barPercentage: 0.7,
      categoryPercentage: 0.5
    }]

  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { callback: v => v + '%' } }
    }
  };

  return (
    <div style={{ height: 250 }}>
      <Bar data={data} options={options} />
    </div>
  );
};


// --- MAIN COMPONENT ---
const RejectRateQCFG = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const avg = REJECT_RATE_DATA.lineChartData.avg;
  const diff = avg - TARGET_REJECT;
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });



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

        {/* === SIDEBAR === */}
        <div className={sidebarOpen ? "" : "sidebar-closed"}>
          <Sidebar />
        </div>

        {/* === MAIN CONTENT === */}
        <div className="flex-grow-1 p-4">

          {/* HEADER DASHBOARD */}
          <div className="d-flex justify-content-between align-items-start pb-3 mb-4">
            <h1 className="h4 fw-bold text-success">REJECT RATE QC GRADING FG</h1>
            <p className="fs-3 font-monospace text-warning">{formattedTime}</p>
          </div>

          <Container fluid className="report-canvas p-4 m-0">

            <div style={{ fontSize: 16, fontWeight: 700, color: '#0d6efd', marginTop: -20, marginBottom: 20 }}>Report date : {REPORT_DATE}</div>

            <Row className="g-4 mb-4">


              <Col lg={7} md={12}>
                <div className="chart-card h-100">
                  <div className="section-title">% Reject Per Hari :</div>
                  <RejectPerHariChart
                    values={REJECT_RATE_DATA.lineChartData.values}
                    labels={REJECT_RATE_DATA.lineChartData.labels}
                    target={TARGET_REJECT}
                  />
                </div>
              </Col>


              <Col lg={5} md={12}>
                <div className="section-title">% Reject Per Kategori :</div>
                <div className="chart-card">
                  <RejectPerKategoriChart chartData={REJECT_RATE_DATA.pieChartData} />
                </div>
              </Col>
            </Row>



            <Row className="g-4 mb-4">

              <Col md={6}>
                <div className="section-title">% Reject Per Shift :</div>
                <div className="chart-card">
                  <RejectPerShiftChart data={REJECT_RATE_DATA.detailTableData} target={TARGET_REJECT} />
                </div>
              </Col>


              <Col md={6}>
                <div className="section-title">Top 3 Reject by Buyer :</div>
                <div className="chart-card">
                  <Top3RejectByBuyerChart buyerData={REJECT_RATE_DATA.barChartBuyerData} />
                </div>
              </Col>
            </Row>


            <Row className="g-4">
              <Col md={12}>
                <div className="section-title">% Reject Per Shift Detail :</div>
                <div className="table-wrap">
                  <table className="detail-table">
                    <thead>
                      <tr>
                        <th>Tahun</th>
                        <th>Bulan</th>
                        <th>Tgl</th>
                        <th>Shift</th>
                        <th>Mesin</th>
                        <th>Produk Di Cek</th>
                        <th>Pcs Reject</th>
                        <th>% Reject</th>
                      </tr>
                    </thead>
                    <tbody>
                      {REJECT_RATE_DATA.detailTableData.map((r, i) => (
                        <tr key={i}>
                          <td>{r.tahun}</td>
                          <td>{r.bulan}</td>
                          <td>{r.tgl}</td>
                          <td>{r.shift}</td>
                          <td>{r.mesin}</td>
                          <td>{r.produkDicek}</td>
                          <td>{r.pcsReject}</td>
                          <td style={{ fontWeight: 700, color: r.pctReject > TARGET_REJECT ? '#dc3545' : '#28a745' }}>
                            {r.pctReject.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};
export default RejectRateQCFG;