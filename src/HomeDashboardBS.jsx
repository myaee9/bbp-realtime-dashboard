import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const PptSlide = ({ title, content, bgColor = 'bg-white', textColor = 'text-dark', footerText }) => (
    <div className={`shadow-lg mb-4 p-4 rounded d-flex flex-column`} style={{ minHeight: '350px', backgroundColor: bgColor }}>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3 border-secondary">
            <h2 className={`h3 fw-bolder ${textColor}`}>{title}</h2>
            <div className="small text-secondary">REALTIME REPORT PT.BBP</div>
        </div>
        <div className={`flex-grow-1 overflow-auto ${textColor}`}>
            {content}
        </div>
        <div className="small text-muted pt-2 border-top border-light">
            {footerText}
        </div>
    </div>
);

const HomeDashboardBS = () => {
    return (
        <div className="bg-light min-vh-100 p-4">
            <h1 className="display-6 fw-bold text-dark mb-4">Beranda Utama (Laporan Ringkasan)</h1>
            <p className="text-secondary mb-5">Ringkasan Laporan Operasional PT. Bahana Bhumiphala Persada dalam format slide presentasi.</p>

            <div className="row">
                <div className="col-lg-6">
                    <PptSlide 
                        title="PT. BAHANA BHUMIPHALA PERSADA" 
                        bgColor="#198754" 
                        textColor="text-white"
                        footerText="Prepared by Bahana"
                        content={
                            <div className="text-center pt-3">
                                <p className="h5 fw-light">REALTIME REPORT</p>
                                <p className="h2 fw-bold mt-2">BBP OPERATIONS 2025</p>
                                <div className="mt-4">
                                    <div style={{ height: '100px', backgroundColor: 'rgba(255,255,255,0.1)' }} className="d-flex justify-content-center align-items-center text-white-50">
                                        

[Image of X]
 (Gaya Grafik Naik)
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </div>
                
                <div className="col-lg-6">
                    <PptSlide 
                        title="PENGIRIMAN PT.BBP - 2025" 
                        bgColor="#f8f9fa"
                        footerText="BBP.WEBSITTE.COM | Prepared by Bahana"
                        content={
                            <div className="row g-3 h-100">
                                <div className="col-md-6 bg-info bg-opacity-10 p-3 rounded">
                                    <h3 className="h6 fw-semibold mb-2">KPI Utama</h3>
                                    <ul className="list-unstyled small">
                                        <li><i className="bi bi-box-seam me-1 text-info"></i> Target Bulanan: 1,500 Unit</li>
                                        <li><i className="bi bi-calendar-check me-1 text-info"></i> Pencapaian YTD (s.d. Jul): 9,220.39 Unit</li>
                                        <li><i className="bi bi-bar-chart-line me-1 text-info"></i> Rata-rata Capaian: 89.4%</li>
                                    </ul>
                                </div>
                                <div className="col-md-6 bg-light p-3 rounded d-flex align-items-center justify-content-center">
                                    [Placeholder Grafik Garis Tren]
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
            
            <p className="text-center text-muted mt-5">... Lanjutkan laporan dengan slide-slide sesuai dengan detail dari presentasi PPT Anda.</p>
        </div>
    );
};

export default HomeDashboardBS;