import React, { useState } from 'react';

function DailyLog({ tracker }) {
  const [dailyLog, setDailyLog] = useState({ 
    water: '', 
    mealType: 'Breakfast', 
    energy: 'Moderate', 
    sleep: '', 
    exercise: '', 
    mealCount: '',
    feedback: ''
  });
  
  const [progressSubmitted, setProgressSubmitted] = useState(false);

  // --- Success Page (Submit කළාට පස්සේ පෙනෙන කොටස) ---
  if (progressSubmitted) {
    return (
      <div className="center-content">
        <div style={{fontSize:'60px', marginBottom:'10px'}}>✅</div>
        <h1 style={{color:'#32CD32', fontSize:'28px', marginBottom:'20px'}}>Day Completed!</h1>
        
        <div className="card-list" style={{width:'100%', paddingBottom:'20px'}}>
          
          {/* 1. Main Stats (Calories & Meals) */}
          <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
             <div className="detail-card" style={{flex:1, flexDirection:'column', alignItems:'center', background:'#f0fdf4', border:'1px solid #bbf7d0', margin:0}}>
                <span style={{fontSize:'24px', fontWeight:'bold', color:'#166534'}}>{tracker.consumed}</span>
                <span style={{fontSize:'12px', color:'#15803d'}}>Calories</span>
             </div>
             <div className="detail-card" style={{flex:1, flexDirection:'column', alignItems:'center', background:'#f3e8ff', border:'1px solid #d8b4fe', margin:0}}>
                <span style={{fontSize:'24px', fontWeight:'bold', color:'#6b21a8'}}>{dailyLog.mealCount || 0}</span>
                <span style={{fontSize:'12px', color:'#7e22ce'}}>Meals</span>
             </div>
          </div>

          {/* 2. Detailed List */}
          <div className="detail-card">
            <div><h4>Meal Type</h4><p>Main Category</p></div>
            <span className="cal-badge" style={{background:'#eff6ff', color:'#1d4ed8'}}>{dailyLog.mealType}</span>
          </div>

          <div className="detail-card">
            <div><h4>Water Intake</h4><p>Hydration</p></div>
            <span className="cal-badge" style={{background:'#ecfeff', color:'#0e7490'}}>{dailyLog.water || 0} Glasses</span>
          </div>

          <div className="detail-card">
            <div><h4>Sleep</h4><p>Rest Duration</p></div>
            <span className="cal-badge" style={{background:'#fff1f2', color:'#be123c'}}>{dailyLog.sleep || 0} Hrs</span>
          </div>

          <div className="detail-card">
            <div><h4>Exercise</h4><p>Activity</p></div>
            <span className="cal-badge" style={{background:'#fff7ed', color:'#c2410c'}}>{dailyLog.exercise || 0} Mins</span>
          </div>

          <div className="detail-card">
            <div><h4>Energy Level</h4><p>Feeling</p></div>
            <span className="cal-badge" style={{
                background: dailyLog.energy === 'High' ? '#dcfce7' : dailyLog.energy === 'Low' ? '#fee2e2' : '#fef9c3',
                color: dailyLog.energy === 'High' ? '#166534' : dailyLog.energy === 'Low' ? '#991b1b' : '#854d0e'
            }}>{dailyLog.energy}</span>
          </div>

          {/* 3. Feedback Section */}
          <div style={{background:'#f9fafb', padding:'15px', borderRadius:'15px', border:'1px solid #e5e7eb', marginTop:'5px'}}>
            <h4 style={{margin:'0 0 5px 0', color:'#4b5563', fontSize:'13px', textTransform:'uppercase'}}>Your Note</h4>
            <p style={{margin:0, color:'#1f2937', fontStyle:'italic', fontSize:'14px'}}>
              "{dailyLog.feedback || 'No notes added.'}"
            </p>
          </div>

          <button className="btn-secondary" onClick={()=>setProgressSubmitted(false)} style={{marginTop:'20px'}}>Track Another Day</button>
        </div>
      </div>
    );
  }

  // --- Form View (Input Form) ---
  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Daily Log</h1>
        <p>Track your consistency</p>
      </div>
      
      <div className="card-list">
        {/* Tracker Preview */}
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
            <div className="detail-card" style={{flex:1, flexDirection:'column', alignItems:'flex-start', gap:'5px', background:'#ecfeff', border:'1px solid #a5f3fc', margin:0}}>
               <span style={{fontSize:'12px', color:'#0e7490', fontWeight:'600'}}>Logged Items</span>
               <h4 style={{fontSize:'22px', color:'#0891b2', margin:0}}>{tracker.meals.length}</h4>
            </div>
        </div>

        <label style={{fontWeight:'bold', marginLeft:'5px'}}>Total Meal Count</label>
        <input 
            className="input-field" 
            type="number" 
            value={dailyLog.mealCount} 
            onChange={e=>setDailyLog({...dailyLog, mealCount:e.target.value})} 
            placeholder="How many meals today?" 
        />

        <label style={{fontWeight:'bold', marginLeft:'5px'}}>Meal Category</label>
        <select className="input-field" value={dailyLog.mealType} onChange={(e) => setDailyLog({...dailyLog, mealType: e.target.value})} style={{appearance: 'none'}}>
          <option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snacks</option>
        </select>

        <label style={{fontWeight:'bold', marginLeft:'5px'}}>Energy Level</label>
        <div style={{display:'flex', gap:'10px', marginBottom:'15px'}}>
          {['Low', 'Moderate', 'High'].map((level) => (
            <button key={level} onClick={() => setDailyLog({...dailyLog, energy: level})} style={{flex: 1, padding: '12px', borderRadius: '15px', border: dailyLog.energy === level ? 'none' : '1px solid #ddd', background: dailyLog.energy === level ? '#32CD32' : 'white', color: dailyLog.energy === level ? 'white' : '#555', fontWeight: '600'}}>{level}</button>
          ))}
        </div>

        <div style={{display:'flex', gap:'15px'}}>
          <div style={{flex:1}}><label style={{fontWeight:'bold', marginLeft:'5px', fontSize:'13px'}}>Sleep (Hrs)</label><input className="input-field" type="number" value={dailyLog.sleep} onChange={e=>setDailyLog({...dailyLog, sleep:e.target.value})} placeholder="7" /></div>
          <div style={{flex:1}}><label style={{fontWeight:'bold', marginLeft:'5px', fontSize:'13px'}}>Exercise (Mins)</label><input className="input-field" type="number" value={dailyLog.exercise} onChange={e=>setDailyLog({...dailyLog, exercise:e.target.value})} placeholder="30" /></div>
        </div>

        <label style={{fontWeight:'bold', marginLeft:'5px'}}>Water (Glasses)</label>
        <input className="input-field" type="number" value={dailyLog.water} onChange={e=>setDailyLog({...dailyLog, water:e.target.value})} placeholder="Ex: 8" />

        <label style={{fontWeight:'bold', marginLeft:'5px'}}>Daily Feedback / Notes</label>
        <textarea 
          className="input-field" 
          value={dailyLog.feedback} 
          onChange={(e)=>setDailyLog({...dailyLog, feedback:e.target.value})} 
          placeholder="How did you feel today?" 
          style={{height:'80px', fontFamily:'inherit', resize:'none'}}
        />
        
        <button className="btn-primary" onClick={()=>setProgressSubmitted(true)}>Submit Log</button>
      </div>
    </div>
  );
}

export default DailyLog;