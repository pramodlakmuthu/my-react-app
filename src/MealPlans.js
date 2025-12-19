import React, { useState } from 'react';

function MealPlans() {
  
  const [activePlan, setActivePlan] = useState(null);

  const plans = {
    balanced: {
      title: 'Vegan',
      desc: 'Mix of carbs, protein & fats.',
      color: '#32CD32',
      meals: {
        breakfast: 'Oatmeal with banana & seeds',
        lunch: 'Rice with chicken curry & dhal',
        dinner: 'Vegetable stir-fry with egg',
        snack: 'Yogurt with honey'
      }
    },
    keto: {
      title: 'Keto Diet',
      desc: 'High fat, low carb.',
      color: '#f59e0b',
      meals: {
        breakfast: 'Scrambled eggs with avocado',
        lunch: 'Grilled chicken salad with olive oil',
        dinner: 'Baked fish with asparagus',
        snack: 'Handful of almonds'
      }
    },
    vegan: {
      title: 'Vegan Diet',
      desc: 'Plant-based foods only.',
      color: '#10b981',
      meals: {
        breakfast: 'Smoothie bowl with berries',
        lunch: 'Chickpea curry with red rice',
        dinner: 'Lentil soup with bread',
        snack: 'Fruit salad'
      }
    },
    gluten_free: {
      title: 'Gluten Free',
      desc: 'No wheat, rye, or barley.',
      color: '#8b5cf6',
      meals: {
        breakfast: 'Rice hoppers (Aappa) with egg',
        lunch: 'Grilled fish with potato wedges',
        dinner: 'Chicken soup with rice noodles',
        snack: 'Fresh Fruits or Corn'
      }
    }
  };

  
  const togglePlan = (key) => {
    if (activePlan === key) {
      setActivePlan(null); 
    } else {
      setActivePlan(key); 
    }
  };

  return (
    <div className="page-container">
      
      
      <div className="header-section">
        <h1>Meal Plans</h1>
        <p>Tap on a plan to view the menu</p>
      </div>

      
      <div className="card-list">
        
        {Object.keys(plans).map((key) => {
          const plan = plans[key];
          const isOpen = activePlan === key;

          return (
            <div 
              key={key}
              onClick={() => togglePlan(key)}
              
              style={{
                backgroundColor: 'white',
                borderRadius: '22px', // Standard Radius
                marginBottom: '15px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)', // Standard Shadow
                border: isOpen ? `2px solid ${plan.color}` : '1px solid #f0f0f0',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              {/* Card Header (Always Visible) */}
              <div style={{
                padding: '20px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: isOpen ? `${plan.color}15` : 'transparent'
              }}>
                <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                   {/* Dot Icon */}
                   <div style={{
                     width:'12px', height:'12px', borderRadius:'50%', 
                     background: plan.color,
                     flexShrink: 0
                   }}></div>
                   
                   <div>
                      <h4 style={{margin:'0 0 4px 0', fontSize:'16px', color:'#222', fontWeight:'600'}}>{plan.title}</h4>
                      <p style={{margin:0, fontSize:'13px', color:'#888'}}>{plan.desc}</p>
                   </div>
                </div>

                {/* Arrow Icon */}
                <div style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                    transition:'0.3s', 
                    color:'#ccc',
                    fontSize: '14px'
                }}>
                  ▼
                </div>
              </div>

              {/* Card Body (Visible only when Open) */}
              {isOpen && (
                <div style={{padding: '0 20px 20px 20px', borderTop:'1px solid #eee'}}>
                   <div style={{marginTop:'15px'}}>
                      
                      {/* Breakfast */}
                      <div style={{marginBottom:'12px'}}>
                        <strong style={{color: plan.color, fontSize:'13px', display:'block', marginBottom:'2px'}}>🥞 Breakfast</strong>
                        <div style={{fontSize:'14px', color:'#555'}}>{plan.meals.breakfast}</div>
                      </div>
                      
                      {/* Lunch */}
                      <div style={{marginBottom:'12px'}}>
                        <strong style={{color: plan.color, fontSize:'13px', display:'block', marginBottom:'2px'}}>🍛 Lunch</strong>
                        <div style={{fontSize:'14px', color:'#555'}}>{plan.meals.lunch}</div>
                      </div>
                      
                      {/* Dinner */}
                      <div style={{marginBottom:'12px'}}>
                        <strong style={{color: plan.color, fontSize:'13px', display:'block', marginBottom:'2px'}}>🥗 Dinner</strong>
                        <div style={{fontSize:'14px', color:'#555'}}>{plan.meals.dinner}</div>
                      </div>
                      
                      {/* Snack */}
                      <div>
                        <strong style={{color: plan.color, fontSize:'13px', display:'block', marginBottom:'2px'}}>🍎 Snack</strong>
                        <div style={{fontSize:'14px', color:'#555'}}>{plan.meals.snack}</div>
                      </div>

                   </div>
                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default MealPlans;