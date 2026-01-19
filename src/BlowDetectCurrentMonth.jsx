import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BlowDetectCurrentMonth = () => {
  const data = [
    ["Barecore Layer", 0, 0, 0, 0, 0, 0, "0.00%"],
    ["BlockBoard", 33, 0, 24, 0, 0, 0, "72.73%"],
    ["Doorcore", 121, 2, 6, 0, 0, 0, "6.61%"],
    ["LVL", 0, 0, 0, 0, 0, 0, "0.00%"],
    ["Plywood", 289, 53, 1, 2, 0, 1, "19.72%"],
    ["Finger Joint", 0, 0, 0, 0, 0, 0, "0.00%"],
  ];

  return (
    /* Mengikuti struktur Grading: Container utama dengan height calc */
    <div style={{ width: "100%", height: "calc(100vh - 100px)", display: "flex", flexDirection: "column", background: "#2A7A8C" }}>
      
      {/* Header tetap hijau sesuai identitas Blow Detect */}
      <div style={{ background: "transparent", padding: "15px", fontSize: "22px", fontWeight: "bold", color: "white" }}>
        JENIS REJECT BULAN INI
      </div>

      {/* Area Tabel: Menerapkan flex-grow dan overflow dari Grading agar proporsional */}
      <div style={{ flexGrow: 1, overflow: "auto", background: "white" }}>
        <table style={{ 
          width: "100%", 
          height: "100%", 
          borderCollapse: "collapse", 
          tableLayout: "fixed" /* PENTING: Mengikuti Grading agar kolom tidak gepeng */
        }}>
          <thead>
            <tr style={{ background: "#3B3B3B", color: "white" }}>
              {[
                "Tahun", "Bulan", "Produk", "Workcenter", "Produk Di Cek",
                "BLISTER", "DELAMINASI", "CORELESS", "VENEER MINUS", "LAINNYA",
                "Total Reject", "% Reject by Produk",
              ].map((h, i) => (
                <th key={i} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} style={{ background: idx % 2 === 1 ? "#f2f2f2" : "#ffffff" }}>
                <td style={tdStyle}>2025</td>
                <td style={tdStyle}>August-2025</td>
                <td style={{ ...tdStyle, textAlign: "left", paddingLeft: "15px" }}>{item[0]}</td>
                <td style={tdStyle}>BLOW_DETECTOR</td>
                <td style={tdStyle}>{item[1]}</td>
                <td style={tdStyle}>{item[2]}</td>
                <td style={tdStyle}>{item[3]}</td>
                <td style={tdStyle}>{item[4]}</td>
                <td style={tdStyle}>{item[5]}</td>
                <td style={tdStyle}>{item[6]}</td>
                <td style={{ ...tdStyle, background: "#BDBDBD", fontWeight: "bold" }}>
                  {item[2] + item[3] + item[4] + item[5] + item[6]}
                </td>
                <td style={tdStyle}>{item[7]}</td>
              </tr>
            ))}
            {/* Baris TOTAL: Lebar kolom kini akan sama persis dengan Grading karena table-layout: fixed */}
            <tr style={{ background: "#757575", color: "white", fontWeight: "bold" }}>
              <td colSpan="4" style={tdStyle}>TOTAL</td>
              <td style={tdStyle}>443</td>
              <td style={tdStyle}>55</td>
              <td style={tdStyle}>31</td>
              <td style={tdStyle}>2</td>
              <td style={tdStyle}>0</td>
              <td style={tdStyle}>1</td>
              <td style={tdStyle}>89</td>
              <td style={tdStyle}>20.09%</td>
            </tr>
          </tbody>
          <tfoot>
            <tr style={{ background: "#D9D9D9", fontWeight: "bold", color: "black" }}>
              <td colSpan="5" style={tdStyle}>% Reject by Jenis Reject</td>
              <td style={tdStyle}>12.4%</td>
              <td style={tdStyle}>7.0%</td>
              <td style={tdStyle}>0.5%</td>
              <td style={tdStyle}>0.0%</td>
              <td style={tdStyle}>0.2%</td>
              <td style={tdStyle}>20.1%</td>
              <td style={tdStyle}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

/* Menggunakan style sel (padding 10px) yang sama persis dengan Grading */
const thStyle = { border: "1px solid #dee2e6", padding: "10px", textAlign: "center", fontSize: "13px" };
const tdStyle = { border: "1px solid #dee2e6", padding: "10px", textAlign: "center", fontSize: "13px" };

export default BlowDetectCurrentMonth;