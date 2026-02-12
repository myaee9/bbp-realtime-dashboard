import React from 'react';

const LogArrivalTable = () => {
    const headerStyle = {
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '11px',
        verticalAlign: 'middle',
        border: '1px solid #444'
    };

  const getRankStyle = (rank) => {
    const base = {
        width: '60px',
        margin: '2px auto', 
        fontWeight: 'bold',
        padding: '2px 0',
        border: '1px solid #999',
        textAlign: 'center',
        fontSize: '12px',
        lineHeight: '1.2' 
    };

        let bgColor = '';
        if (rank === 1) bgColor = '#00b050';
        else if (rank === 2) bgColor = '#92d050';
        else if (rank === 3) bgColor = '#ccff33';
        else if (rank === 4) bgColor = '#ffc000';
        else if (rank === 5) bgColor = '#ed7d31';
        else if (rank === 6) bgColor = '#ff0000';
        else bgColor = '#d1d5db';

        const progressWidth = (rank / 6) * 100;
        const barColor = '#add8e6';

        return {
            ...base,
            color: '#000',
            background: `linear-gradient(90deg, ${barColor} ${progressWidth}%, ${bgColor} ${progressWidth}%)`,
        };
    };

    const data = [
        { id: 2, name: "IMAM SOBIRIN", l5_pcs: "3,480", l5_vol: "171.7031", l5_dia: "Ø 22.4", l9_pcs: "332", l9_vol: "65.2078", l9_dia: "Ø 30.7", t_pcs: "3,812", t_vol: "236.9109", rank: 4, jabon: "-", albasia: "236.9109" },
        { id: 3, name: "DWI UTOMO", l5_pcs: "5,220", l5_vol: "292.1682", l5_dia: "Ø 23.7", l9_pcs: "1,202", l9_vol: "303.4937", l9_dia: "Ø 34.4", t_pcs: "6,422", t_vol: "595.6619", rank: 1, jabon: "0.9918", albasia: "594.6701" },
        { id: 5, name: "BUTUK SLAMET", l5_pcs: "4,620", l5_vol: "213.6719", l5_dia: "Ø 22.6", l9_pcs: "456", l9_vol: "88.7279", l9_dia: "Ø 30.5", t_pcs: "5,076", t_vol: "302.3998", rank: 2, jabon: "-", albasia: "302.3998" },
        { id: 6, name: "DWI SISWANTO", l5_pcs: "2,908", l5_vol: "197.6893", l5_dia: "Ø 25.4", l9_pcs: "291", l9_vol: "83.3043", l9_dia: "Ø 36.5", t_pcs: "3,199", t_vol: "280.9936", rank: 3, jabon: "1.4714", albasia: "279.5222" },
        { id: 7, name: "YERRY DWI HARTONO", l5_pcs: "1,912", l5_vol: "88.3697", l5_dia: "Ø 21.3", l9_pcs: "344", l9_vol: "70.4091", l9_dia: "Ø 31.2", t_pcs: "2,256", t_vol: "158.7788", rank: 5, jabon: "-", albasia: "158.7788" },
        { id: 13, name: "Kiriman", l5_pcs: "299", l5_vol: "15.4210", l5_dia: "Ø 23.2", l9_pcs: "641", l9_vol: "133.2907", l9_dia: "Ø 31.8", t_pcs: "940", t_vol: "148.7117", rank: 6, jabon: "-", albasia: "148.7117" },
    ];

    return (
        <div className="table-responsive mt-3" style={{ overflowX: 'auto' }}>
<table className="table table-bordered border-dark table-sm text-center align-middle w-100" 
       style={{ fontSize: '12px', minWidth: '1200px', tableLayout: 'fixed' }}>

               <thead>
    <tr style={headerStyle}>
        <th rowSpan="3">No Grader</th>
        <th rowSpan="3">Nama Grader</th>
        <th colSpan="13">KEDATANGAN August-2025</th> 
    </tr>
    <tr style={headerStyle}>
        <th colSpan="3">LOG 5 F</th>
        <th colSpan="3">LOG 9 F</th>
        <th colSpan="2">Total</th>
        <th rowSpan="2" style={{ width: '80px' }}>Rank</th>
        <th colSpan="3">Jenis Kayu</th>
        <th rowSpan="2">Note</th> 
    </tr>
    <tr style={headerStyle}>
        <th>Pcs</th><th>Vol</th><th>Avrg Diameter</th>
        <th>Pcs</th><th>Vol</th><th>Avrg Diameter</th>
        <th>Pcs</th><th>Vol</th>
        <th>Jabon</th><th>Albasia</th><th>Mahoni</th>
    </tr>
</thead>


              <tbody>
    {data.map((item, index) => (
        <tr key={index}> 
            <td>{item.id}</td>
            <td className="text-start ps-2 fw-bold">{item.name}</td>
            <td>{item.l5_pcs}</td>
            <td>{item.l5_vol}</td>
            <td className="fw-bold" style={{ color: '#0070c0' }}>{item.l5_dia}</td>
            <td>{item.l9_pcs}</td>
            <td>{item.l9_vol}</td>
            <td className="fw-bold" style={{ color: '#0070c0' }}>{item.l9_dia}</td>
            
 
            <td className="fw-bold">{item.t_pcs}</td>
            <td className="fw-bold">{item.t_vol}</td>
            
    
            <td>
                <div style={getRankStyle(item.rank)}>{item.rank}</div>
            </td>
            
       
            <td style={{ color: '#0070c0' }}>{item.jabon}</td>
            <td style={{ color: '#0070c0' }}>{item.albasia}</td>
            <td>-</td>
            
     
            <td></td>
        </tr>
    ))}
</tbody>
               <tfoot className="table-secondary fw-bold border-top border-dark">
    <tr>
      
        <td colSpan="2">TOTAL</td>
        
   
        <td>18,439</td>
        <td>979.023</td>
        <td></td>
        

        <td>3,266</td>
        <td>744.434</td>
        <td></td>
        

        <td>21,705</td> 
        <td>1,723.457</td>
        

        <td></td> {/* Rank */}
        <td>2.463</td> {/* Jabon */}
        <td>1,720.99</td> {/* Albasia */}
        <td>-</td> {/* Mahoni */}
        <td></td> {/* Note */}
    </tr>
</tfoot>
            </table>
        </div>
    );
};

export default LogArrivalTable;