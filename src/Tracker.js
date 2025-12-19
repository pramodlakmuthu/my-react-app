import React, { useState } from 'react';

function Tracker({ tracker, setTracker }) {
  
  const [input, setInput] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fiber: ''
  });

 
  const addMeal = () => {
    if (input.name && input.calories) {
      //  (Convert Inputs to Numbers)
      const cals = parseInt(input.calories);
      const prot = parseInt(input.protein) || 0; 
      const carb = parseInt(input.carbs) || 0;
      const fib = parseInt(input.fiber) || 0;

      const newMeal = { 
        id: Date.now(), 
        name: input.name, 
        calories: cals,
        protein: prot,
        carbs: carb,
        fiber: fib
      };

     
      setTracker({
        ...tracker,
        consumed: tracker.consumed + cals,
        protein: tracker.protein + prot,
        carbs: tracker.carbs + carb,
        fiber: tracker.fiber + fib,
        meals: [newMeal, ...tracker.meals] 
      });

    
      setInput({ name: '', calories: '', protein: '', carbs: '', fiber: '' });
    }
  };

  // Styles for Nutrient Boxes
  const statBoxStyle = {
    flex: 1,
    background: '#f9fafb',
    padding: '10px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #eee'
  };

  const statLabelStyle = {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: '5px'
  };

  const statValueStyle = {
    fontSize: '18px', 
    fontWeight: 'bold',
    color: '#333'
  };

  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Daily Tracker</h1>
        <p>Monitor your daily intake</p>
      </div>

      <div className="card-list">
        
        {/* --- 1. Dashboard (Totals Display) --- */}
        <div className="card" style={{background:'white', padding:'20px', borderRadius:'15px', boxShadow:'0 4px 10px rgba(0,0,0,0.05)'}}>
           
           {/* Main Calories Section */}
           <div style={{textAlign:'center', marginBottom:'20px'}}>
              <div style={{fontSize:'14px', color:'#888', marginBottom:'5px'}}>Calories Consumed</div>
              <div style={{fontSize:'42px', fontWeight:'bold', color:'#32CD32'}}>
                {tracker.consumed} 
                <span style={{fontSize:'16px', color:'#ccc', fontWeight:'normal'}}> / {tracker.target}</span>
              </div>
              
              {/* Progress Bar */}
              <div style={{width:'100%', height:'10px', background:'#eee', borderRadius:'5px', marginTop:'10px', overflow:'hidden'}}>
                 <div style={{
                   width: `${Math.min((tracker.consumed / tracker.target) * 100, 100)}%`,
                   height:'100%', 
                   background:'#32CD32',
                   transition: 'width 0.5s ease'
                 }}></div>
              </div>
           </div>

           
           <div style={{display:'flex', gap:'10px', borderTop:'1px solid #eee', paddingTop:'20px'}}>
              
              {/* Protein Box */}
              <div style={statBoxStyle}>
                 <div style={statLabelStyle}>🍖 Protein</div>
                 <div style={{...statValueStyle, color:'#ff6b6b'}}>{tracker.protein}g</div>
              </div>

              {/* Carbs Box */}
              <div style={statBoxStyle}>
                 <div style={statLabelStyle}>🍞 Carbs</div>
                 <div style={{...statValueStyle, color:'#feca57'}}>{tracker.carbs}g</div>
              </div>

              {/* Fiber Box */}
              <div style={statBoxStyle}>
                 <div style={statLabelStyle}>🥦 Fiber</div>
                 <div style={{...statValueStyle, color:'#1dd1a1'}}>{tracker.fiber}g</div>
              </div>

           </div>
        </div>

        {/* --- 2. Add New Meal Form --- */}
        <div style={{marginTop:'25px'}}>
           <h3 style={{margin:'0 0 10px 5px', fontSize:'16px'}}>Add Meal</h3>
           <div style={{background:'white', padding:'15px', borderRadius:'12px', boxShadow:'0 2px 5px rgba(0,0,0,0.05)'}}>
              
              {/* Food Name */}
              <input 
                className="input-field" 
                placeholder="Food Name (e.g. Rice & Curry)" 
                value={input.name}
                onChange={(e) => setInput({...input, name: e.target.value})}
                style={{marginBottom:'10px'}}
              />

              {/* Calories Input */}
              <input 
                  className="input-field" 
                  type="number" 
                  placeholder="Calories (kcal)" 
                  value={input.calories}
                  onChange={(e) => setInput({...input, calories: e.target.value})}
                  style={{marginBottom:'10px'}}
              />

              {/* Nutrients Inputs (Small Row) */}
              <div style={{display:'flex', gap:'10px', marginBottom:'15px'}}>
                 <input 
                   className="input-field" type="number" placeholder="Prot (g)" 
                   value={input.protein} onChange={(e) => setInput({...input, protein: e.target.value})}
                   style={{margin:0, fontSize:'13px'}}
                 />
                 <input 
                   className="input-field" type="number" placeholder="Carb (g)" 
                   value={input.carbs} onChange={(e) => setInput({...input, carbs: e.target.value})}
                   style={{margin:0, fontSize:'13px'}}
                 />
                 <input 
                   className="input-field" type="number" placeholder="Fiber (g)" 
                   value={input.fiber} onChange={(e) => setInput({...input, fiber: e.target.value})}
                   style={{margin:0, fontSize:'13px'}}
                 />
              </div>

              <button className="btn-primary" onClick={addMeal} style={{marginTop:0}}>+ Add Log</button>
           </div>
        </div>

        {/* --- 3. Meals Log List --- */}
        <div style={{marginTop:'25px', paddingBottom:'80px'}}>
           <h3 style={{margin:'0 0 10px 5px', fontSize:'16px'}}>Today's Log</h3>
           
           {tracker.meals.length === 0 ? (
             <p style={{textAlign:'center', color:'#aaa', fontSize:'13px', marginTop:'20px'}}>No meals added today.</p>
           ) : (
             tracker.meals.map((meal) => (
               <div key={meal.id} style={{
                 background:'white', padding:'12px', borderRadius:'10px', 
                 marginBottom:'10px', display:'flex', justifyContent:'space-between', alignItems:'center',
                 boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
               }}>
                  <div>
                     <div style={{fontWeight:'bold', color:'#333'}}>{meal.name}</div>
                     <div style={{fontSize:'11px', color:'#888', marginTop:'3px'}}>
                        <span style={{color:'#ff6b6b'}}>P: {meal.protein}g</span> • 
                        <span style={{color:'#feca57'}}> C: {meal.carbs}g</span> • 
                        <span style={{color:'#1dd1a1'}}> F: {meal.fiber}g</span>
                     </div>
                  </div>
                  <div style={{fontWeight:'bold', color:'#32CD32'}}>{meal.calories} kcal</div>
               </div>
             ))
           )}
        </div>

      </div>
    </div>
  );
}

export default Tracker;