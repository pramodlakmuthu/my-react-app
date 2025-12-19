import React, { useState } from 'react';

function PersonalHealthRecord({ onComplete }) {
  const [formData, setFormData] = useState({
    gender: 'Female',
    age: '',
    goal: 'Weight Loss',
    profession: 'Student / Sedentary (Little exercise)'
  });

  return (
    <div className="page-container">
      {/* Header */}
      <div className="header-simple" style={{paddingBottom:'20px'}}>
        <div style={{background:'#32CD32', width:'60px', height:'60px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px'}}>
           <span style={{fontSize:'30px', color:'white'}}>📋</span>
        </div>
        <h1 style={{fontSize:'24px', color:'#333'}}>Personal Details</h1>
        <p style={{fontSize:'13px', color:'#666'}}>Let's get to know you better!</p>
      </div>

      <div className="card-list">
         
         {/* 1. Gender Selection */}
         <div style={{textAlign:'left', width:'100%', marginBottom:'15px'}}>
            <label style={{fontSize:'12px', fontWeight:'bold', marginLeft:'5px'}}>Gender</label>
            <div style={{display:'flex', gap:'10px', marginTop:'5px'}}>
               {['Female', 'Male'].map((g) => (
                 <button 
                   key={g} 
                   onClick={() => setFormData({...formData, gender: g})}
                   style={{
                     flex:1, 
                     padding:'12px', 
                     borderRadius:'10px', 
                     fontWeight: '600',
                     border: formData.gender === g ? 'none' : '1px solid #ddd', 
                     background: formData.gender === g ? '#32CD32' : 'white', 
                     color: formData.gender === g ? 'white' : '#555'
                   }}
                 >
                   {g}
                 </button>
               ))}
            </div>
         </div>

         {/* 2. Age Input */}
         <div style={{textAlign:'left', width:'100%', marginBottom:'15px'}}>
            <label style={{fontSize:'12px', fontWeight:'bold', marginLeft:'5px'}}>Age</label>
            <input 
              className="input-field" 
              type="number" 
              placeholder="Ex: 24" 
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              style={{marginTop:'5px'}}
            />
         </div>

         {/* 3. Main Goal Selection */}
         <div style={{textAlign:'left', width:'100%', marginBottom:'15px'}}>
            <label style={{fontSize:'12px', fontWeight:'bold', marginLeft:'5px'}}>Main Goal</label>
            <select 
              className="input-field" 
              value={formData.goal} 
              onChange={(e) => setFormData({...formData, goal: e.target.value})} 
              style={{marginTop:'5px', padding:'12px'}}
            >
              <option>Weight Loss</option>
              <option>Weight Gain</option>
              <option>Maintain Weight</option>
              <option>Muscle Building</option>
            </select>
         </div>

         {/* 4. Profession / Activity Level */}
         <div style={{textAlign:'left', width:'100%', marginBottom:'25px'}}>
            <label style={{fontSize:'12px', fontWeight:'bold', marginLeft:'5px'}}>Profession / Activity Level</label>
            <p style={{fontSize:'10px', color:'#888', marginBottom:'5px'}}>Helps calculate your calorie needs</p>
            <select 
              className="input-field" 
              value={formData.profession} 
              onChange={(e) => setFormData({...formData, profession: e.target.value})} 
              style={{marginTop:'0px', padding:'12px'}}
            >
              <option>Student / Sedentary (Little exercise)</option>
              <option>Office Job / Light Active (1-3 days/week)</option>
              <option>Standing Job / Moderate (3-5 days/week)</option>
              <option>Athlete / Very Active (6-7 days/week)</option>
            </select>
         </div>

         {/* Submit Button */}
         <button className="btn-primary" onClick={onComplete}>
            Save & Continue
         </button>

      </div>
    </div>
  );
}

export default PersonalHealthRecord;