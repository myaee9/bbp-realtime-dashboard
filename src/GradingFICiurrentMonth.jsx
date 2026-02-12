import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GradingFICurrentMonth = () => {
  const data = [
    { produk: "Barecore Layer", cek: 0, delaminasi: 0, ngerol: 0, tidak_dempul: 0, serat_kasar: 0, blister: 0, total: 0, pct: "0.00%" },
    { produk: "BlockBoard", cek: 135, delaminasi: 10, ngerol: 1, tidak_dempul: 0, serat_kasar: 0, blister: 1, total: 12, pct: "8.89%" },
    { produk: "Doorcore", cek: 301, delaminasi: 0, ngerol: 3, tidak_dempul: 0, serat_kasar: 13, blister: 3, total: 19, pct: "6.31%" },
    { produk: "LVL", cek: 0, delaminasi: 0, ngerol: 0, tidak_dempul: 0, serat_kasar: 0, blister: 0, total: 0, pct: "0.00%" },
    { produk: "Plywood", cek: 60, delaminasi: 2, ngerol: 0, tidak_dempul: 0, serat_kasar: 0, blister: 2, total: 4, pct: "6.67%" },
    { produk: "Finger Joint", cek: 0, delaminasi: 0, ngerol: 0, tidak_dempul: 0, serat_kasar: 0, blister: 0, total: 0, pct: "0.00%" },
  ];

  return (
    <div style={{ 
      width: "100%", 
      height: "calc(100vh - 150px)", 
      display: "flex", 
      flexDirection: "column", 
      background: "white",
      marginTop: "-30px" 
    }}>
      
      <div style={{ 
        background: "white", 
        padding: "10px 35px", 
        fontSize: "22px", 
        fontWeight: "bold", 
        borderBottom: "1px solid #ddd", 
        textAlign: "left" 
      }}>
        JENIS REJECT BULAN INI
      </div>

      <div style={{ flexGrow: 1, overflow: "hidden", background: "white" }}>
        <table style={{ 
          width: "100%", 
          height: "100%", 
          borderCollapse: "collapse", 
          tableLayout: "fixed" 
        }}>
          <thead>
            <tr style={{ background: "#535353", color: "white" }}>
              {["Tahun", "Bulan", "Produk", "Workcenter", "Produk Di Cek", "DELAMINASI", "NGEROL", "TIDAK_DEMPUL", "SERAT_KASAR", "BLISTER", "Total Reject", "% Reject by Produk"].map((h, i) => (
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
                <td style={tdStyle}>GRADING_FI</td>
                <td style={tdStyle}>{item.cek}</td>
                <td style={tdStyle}>{item.delaminasi}</td>
                <td style={tdStyle}>{item.ngerol}</td>
                <td style={tdStyle}>{item.tidak_dempul}</td>
                <td style={tdStyle}>{item.serat_kasar}</td>
                <td style={tdStyle}>{item.blister}</td>
                <td style={{ ...tdStyle, background: "#BDBDBD", fontWeight: "bold" }}>{item.total}</td>
                <td style={tdStyle}>{item.pct}</td>
              </tr>
            ))}
            <tr style={{ background: "#757575", color: "white", fontWeight: "bold" }}>
              <td colSpan="4" style={tdStyle}>TOTAL</td>
              <td style={tdStyle}>496</td>
              <td style={tdStyle}>12</td>
              <td style={tdStyle}>4</td>
              <td style={tdStyle}>0</td>
              <td style={tdStyle}>13</td>
              <td style={tdStyle}>6</td>
              <td style={tdStyle}>35</td>
              <td style={tdStyle}>7.06%</td>
            </tr>
          </tbody>
          <tfoot>
            <tr style={{ background: "#D9D9D9", fontWeight: "bold" }}>
              <td colSpan="5" style={tdStyle}>% Reject by Jenis Reject</td>
              <td style={tdStyle}>2.4%</td>
              <td style={tdStyle}>0.8%</td>
              <td style={tdStyle}>0.0%</td>
              <td style={tdStyle}>2.6%</td>
              <td style={tdStyle}>1.2%</td>
              <td style={tdStyle}>7.1%</td>
              <td style={tdStyle}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

const thStyle = { border: "1px solid #dee2e6", padding: "5px", textAlign: "center", fontSize: "11px" };
const tdStyle = { border: "1px solid #dee2e6", padding: "5px", textAlign: "center", fontSize: "12px" };

export default GradingFICurrentMonth;