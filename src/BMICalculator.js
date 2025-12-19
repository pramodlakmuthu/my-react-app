import React, { useState } from 'react';

function BMICalculator({ bmi, setBmi }) {
  // Local state for extra goal inputs
  const [goalSettings, setGoalSettings] = useState({ targetWeight: '', weeklyLoss: '0.5' });
  const [deadline, setDeadline] = useState(null);

  const calculateBMI = () => {
    if (bmi.height && bmi.weight && !isNaN(bmi.height) && !isNaN(bmi.weight)) {
      const height = parseFloat(bmi.height);
      const weight = parseFloat(bmi.weight);
      
      if (height <= 0 || weight <= 0) {
        alert("Please enter valid height and weight values!");
        return;
      }
      
      // 1. Calculate BMI
      const h_meters = height / 100;
      const bmiVal = (weight / (h_meters * h_meters)).toFixed(1);
      
      let status = 'Normal Weight';
      if (bmiVal < 18.5) status = 'Underweight';
      else if (bmiVal >= 25 && bmiVal < 29.9) status = 'Overweight';
      else if (bmiVal >= 30) status = 'Obesity';

      const minW = (18.5 * h_meters * h_meters).toFixed(1);
      const maxW = (24.9 * h_meters * h_meters).toFixed(1);

      // 2. Calculate Deadline Logic
      let estimatedDate = '';
      if (goalSettings.targetWeight && !isNaN(goalSettings.targetWeight)) {
        const targetWeight = parseFloat(goalSettings.targetWeight);
        const diff = Math.abs(weight - targetWeight); // Difference in Kg
        const weeks = diff / parseFloat(goalSettings.weeklyLoss); // Weeks needed
        const days = weeks * 7;
        
        const date = new Date();
        date.setDate(date.getDate() + days); // Add days to today
        estimatedDate = date.toDateString(); // Format date (e.g., "Mon Dec 25 2025")
        setDeadline(estimatedDate);
      }

      // Update Main State
      setBmi({ ...bmi, value: bmiVal, status: status, minWeight: minW, maxWeight: maxW });
    } else {
        alert("Please enter valid Height and Weight!");
    }
  };

  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Smart Calculator</h1>
        <p>Track Your BMI & set your health goals</p>
      </div>

      {!bmi.value ? (
        <div className="card-list">
          {/* Section 1: Basic Measurements */}
          <h3 style={{fontSize:'16px', color:'#32CD32', margin:'10px 0'}}>Current Measurments</h3>
          <div style={{display:'flex', gap:'10px'}}>
             <div style={{flex:1}}>
                <label style={{fontWeight:'bold', fontSize:'13px', marginLeft:'5px'}}>Height (cm)</label>
                <input className="input-field" placeholder="170" type="number" onChange={e=>setBmi({...bmi, height:e.target.value})} />
             </div>
             <div style={{flex:1}}>
                <label style={{fontWeight:'bold', fontSize:'13px', marginLeft:'5px'}}>Weight (kg)</label>
                <input className="input-field" placeholder="70" type="number" onChange={e=>setBmi({...bmi, weight:e.target.value})} />
             </div>
          </div>

          {/* Section 2: Goals */}
          <h3 style={{fontSize:'16px', color:'#32CD32', margin:'10px 0'}}>Your Goals</h3>
          <label style={{fontWeight:'bold', fontSize:'13px', marginLeft:'5px'}}>Target Weight (kg)</label>
          <input className="input-field" placeholder="Ex: 65" type="number" value={goalSettings.targetWeight} onChange={e=>setGoalSettings({...goalSettings, targetWeight:e.target.value})} />
          
          <label style={{fontWeight:'bold', fontSize:'13px', marginLeft:'5px'}}>Weekly Weight Goal</label>
          <select className="input-field" value={goalSettings.weeklyLoss} onChange={e=>setGoalSettings({...goalSettings, weeklyLoss:e.target.value})}>
            <option value="0.25">Slow & Steady (0.25 kg/week)</option>
            <option value="0.5">Recommended (0.5 kg/week)</option>
            <option value="1.0">Intense (1 kg/week)</option>
          </select>

          <button className="btn-primary" onClick={calculateBMI}>Calculate BMI</button>
        </div>
      ) : (
        <div className="page-container">
          {/* Result View */}
          <div className="bmi-display">
            <p style={{opacity:0.8, margin:0, fontSize:'14px'}}>Your BMI</p>
            <div className="bmi-val">{bmi.value}</div>
            <span className="bmi-status">{bmi.status}</span>
          </div>

          <div className="card-list" style={{paddingTop:'0'}}>
             {/* BMI Feedback */}
             <div className="detail-card" style={{flexDirection:'column', alignItems:'flex-start', background:'#f0fdf4', border:'1px solid #bbf7d0'}}>
                <h4 style={{color:'#166534'}}>Healthy Range</h4>
                <p style={{color:'#15803d'}}>You should weigh between <strong>{bmi.minWeight}kg - {bmi.maxWeight}kg</strong> for your height.</p>
             </div>

             {/* Goal Deadline Prediction */}
             {deadline && (
                 <div className="detail-card" style={{flexDirection:'column', alignItems:'flex-start', background:'#eff6ff', border:'1px solid #bfdbfe'}}>
                    <div style={{display:'flex', justifyContent:'space-between', width:'100%', alignItems:'center'}}>
                        <h4 style={{color:'#1e40af'}}>Goal Deadline 🎯</h4>
                        <span style={{fontSize:'24px'}}>🗓️</span>
                    </div>
                    <p style={{color:'#1d4ed8', marginTop:'5px'}}>
                        To reach <strong>{goalSettings.targetWeight}kg</strong> at this pace, you will achieve your goal by:
                    </p>
                    <h2 style={{margin:'10px 0 0', color:'#1e3a8a'}}>{deadline}</h2>
                 </div>
             )}

             <button className="btn-secondary" onClick={()=>setBmi({...bmi, value: null})}>Recalculate</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BMICalculator;