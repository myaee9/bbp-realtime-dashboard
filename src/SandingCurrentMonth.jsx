import React from 'react';
import { Table } from 'react-bootstrap';

const SandingCurrentMonth = () => {
    const data = [
        { thn: 2025, bln: 'August-2025', prd: 'Barecore Layer', wc: 'BLOW_DETECTOR', cek: 0, bli: 0, del: 0, cor: 0, ven: 0, lai: 0, tot: 0, pct: '0.00%' },
        { thn: 2025, bln: 'August-2025', prd: 'BlockBoard', wc: 'BLOW_DETECTOR', cek: 33, bli: 0, del: 24, cor: 0, ven: 0, lai: 0, tot: 24, pct: '72.73%' },
        { thn: 2025, bln: 'August-2025', prd: 'Doorcore', wc: 'BLOW_DETECTOR', cek: 121, bli: 2, del: 6, cor: 0, ven: 0, lai: 0, tot: 8, pct: '6.61%' },
        { thn: 2025, bln: 'August-2025', prd: 'LVL', wc: 'BLOW_DETECTOR', cek: 0, bli: 0, del: 0, cor: 0, ven: 0, lai: 0, tot: 0, pct: '0.00%' },
        { thn: 2025, bln: 'August-2025', prd: 'Plywood', wc: 'BLOW_DETECTOR', cek: 289, bli: 53, del: 1, cor: 2, ven: 0, lai: 1, tot: 57, pct: '19.72%' },
        { thn: 2025, bln: 'August-2025', prd: 'Finger Joint', wc: 'BLOW_DETECTOR', cek: 0, bli: 0, del: 0, cor: 0, ven: 0, lai: 0, tot: 0, pct: '0.00%' },
    ];

    const styles = `
        .dashboard-wrapper {
            width: 100%; 
            height: calc(100vh - 100px); 
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background-color: #f8f9fa;
        }

        .header-box {
            background: white;
            padding: 15px;
            border-bottom: 1px solid #ddd;
            flex-shrink: 0;
        }

        .section-title {
            font-weight: bold;
            font-size: 22px; 
            color: #333;
            margin: 0;
        }

        .table-scroll-area {
            flex-grow: 1; 
            overflow: auto;
            background: white;
        }

        .table-enterprise {
            border-collapse: collapse !important;
            font-size: 13px;
            width: 100%;
            height: 100%; 
            table-layout: fixed; 
            margin-bottom: 0 !important;
        }

        .table-enterprise thead th {
            background-color: #3B3B3B !important;
            color: #ffffff !important;
            border: 1px solid #dee2e6 !important;
            padding: 10px; 
            text-align: center;
        }

        .table-enterprise tbody td {
            text-align: center;
            border: 1px solid #dee2e6 !important;
            padding: 10px; 
        }

        .col-gray {
            background-color: #f1f1f1 !important;
            font-weight: bold;
        }

        .row-dark {
            background-color: #565656 !important;
            color: white !important;
            font-weight: bold;
        }

        .row-black {
            background-color: #000000 !important;
            color: white !important;
            font-weight: bold;
        }
    `;

    return (
        <div className="dashboard-wrapper">
            <style>{styles}</style>
            <div className="header-box">
                <h2 className="section-title">JENIS REJECT BULAN INI</h2>
            </div>

            <div className="table-scroll-area">
                <Table className="table-enterprise">
                    <thead>
                        <tr>
                            {["Tahun", "Bulan", "Produk", "Workcenter", "Produk Di Cek", "BLISTER", "DELAMINASI", "CORELESS", "VENEER_MINUS", "LAINNYA", "Total Reject", "% Reject by Produk"].map((h, i) => (
                                <th key={i}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx} style={{ background: idx % 2 === 1 ? "#f2f2f2" : "#ffffff" }}>
                                <td>{item.thn}</td>
                                <td>{item.bln}</td>
                                <td style={{ textAlign: 'left', paddingLeft: '15px' }}>{item.prd}</td>
                                <td>{item.wc}</td>
                                <td>{item.cek}</td>
                                <td>{item.bli}</td>
                                <td>{item.del}</td>
                                <td>{item.cor}</td>
                                <td>{item.ven}</td>
                                <td>{item.lai}</td>
                                <td className="col-gray">{item.tot}</td>
                                <td className="col-gray">{item.pct}</td>
                            </tr>
                        ))}
                        
                        <tr className="row-dark">
                            <td colSpan="4" style={{textAlign: 'center'}}>TOTAL</td>
                            <td>443</td>
                            <td>55</td>
                            <td>31</td>
                            <td>2</td>
                            <td>0</td>
                            <td>1</td>
                            <td>89</td>
                            <td>20.09%</td>
                        </tr>

                        <tr className="row-black">
                            <td colSpan="4" style={{ textAlign: 'left', paddingLeft: '15px' }}>% Reject by Jenis Reject</td>
                            <td></td>
                            <td>12.4%</td>
                            <td>7.0%</td>
                            <td>0.5%</td>
                            <td>0.0%</td>
                            <td>0.2%</td>
                            <td>20.1%</td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default SandingCurrentMonth;