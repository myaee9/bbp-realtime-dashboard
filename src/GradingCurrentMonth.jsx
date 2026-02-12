import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GradingCurrentMonth = () => {
  const data = [
    { produk: "Barecore Layer", cek: 58, delaminasi: 1, ngerol: 0, blister: 0, coreless: 2, lainnya: 0, total: 3, pct: "5.17%" },
    { produk: "BlockBoard", cek: 17, delaminasi: 0, ngerol: 0, blister: 0, coreless: 0, lainnya: 0, total: 0, pct: "0.00%" },
    { produk: "Doorcore", cek: 130, delaminasi: 1, ngerol: 0, blister: 0, coreless: 0, lainnya: 4, total: 5, pct: "3.85%" },
    { produk: "LVL", cek: 0, delaminasi: 0, ngerol: 0, blister: 0, coreless: 0, lainnya: 0, total: 0, pct: "0.00%" },
    { produk: "Plywood", cek: 63, delaminasi: 1, ngerol: 0, blister: 1, coreless: 0, lainnya: 10, total: 12, pct: "19.05%" },
    { produk: "Finger Joint", cek: 0, delaminasi: 0, ngerol: 0, blister: 0, coreless: 0, lainnya: 0, total: 0, pct: "0.00%" },
  ];

  return (
    <div style={{ width: "100%", height: "calc(100vh - 100px)", display: "flex", flexDirection: "column", background: "#f8f9fa" }}>
      
      <div style={{ background: "white", padding: "15px", fontSize: "22px", fontWeight: "bold", borderBottom: "1px solid #ddd" }}>
        JENIS REJECT BULAN INI
      </div>

      <div style={{ flexGrow: 1, overflow: "auto", background: "white" }}>
        <table style={{ width: "100%", height: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <thead>
            <tr style={{ background: "#535353", color: "white" }}>
              {["Tahun", "Bulan", "Produk", "Workcenter", "Produk Di Cek", "DELAMINASI", "NGEROL", "BLISTER", "CORELESS", "LAINNYA", "Total Reject", "% Reject by Produk"].map((h, i) => (
                <th key={i} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} style={{ background: idx % 2 === 1 ? "#f2f2f2" : "#ffffff" }}>
                <td style={tdStyle}>2025</td>
                <td style={tdStyle}>August-2025</td>
                <td style={{ ...tdStyle, textAlign: "left", paddingLeft: "15px" }}>{item.produk}</td>
                <td style={tdStyle}>GRADING_FG</td>
                <td style={tdStyle}>{item.cek}</td>
                <td style={tdStyle}>{item.delaminasi}</td>
                <td style={tdStyle}>{item.ngerol}</td>
                <td style={tdStyle}>{item.blister}</td>
                <td style={tdStyle}>{item.coreless}</td>
                <td style={tdStyle}>{item.lainnya}</td>
                <td style={{ ...tdStyle, background: "#BDBDBD", fontWeight: "bold" }}>{item.total}</td>
                <td style={tdStyle}>{item.pct}</td>
              </tr>
            ))}
            <tr style={{ background: "#757575", color: "white", fontWeight: "bold" }}>
              <td colSpan="4" style={tdStyle}>TOTAL</td>
              <td style={tdStyle}>268</td>
              <td style={tdStyle}>3</td>
              <td style={tdStyle}>0</td>
              <td style={tdStyle}>1</td>
              <td style={tdStyle}>2</td>
              <td style={tdStyle}>14</td>
              <td style={tdStyle}>20</td>
              <td style={tdStyle}>7.46%</td>
            </tr>
          </tbody>
          <tfoot>
            <tr style={{ background: "#D9D9D9", fontWeight: "bold" }}>
              <td colSpan="5" style={tdStyle}>% Reject by Jenis Reject</td>
              <td style={tdStyle}>1.1%</td>
              <td style={tdStyle}>0.0%</td>
              <td style={tdStyle}>0.4%</td>
              <td style={tdStyle}>0.7%</td>
              <td style={tdStyle}>5.2%</td>
              <td style={tdStyle}>7.5%</td>
              <td style={tdStyle}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

const thStyle = { border: "1px solid #dee2e6", padding: "10px", textAlign: "center", fontSize: "13px" };
const tdStyle = { border: "1px solid #dee2e6", padding: "10px", textAlign: "center", fontSize: "13px" };

export default GradingCurrentMonth;