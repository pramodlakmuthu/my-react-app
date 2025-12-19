import React, { useState } from 'react';

function MealPlans({ selectedDiet, setSelectedDiet }) {
  // කුමන Plan එකද Open වෙලා තියෙන්නේ කියලා බලාගන්න
  const [activePlan, setActivePlan] = useState(null);

  const plans = {
    balanced: {
      title: 'Balanced Diet',
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

  // Click කළාම Open/Close වෙන Function එක
  const togglePlan = (key) => {
    if (activePlan === key) {
      setActivePlan(null); // දැනට Open නම් වහන්න
    } else {
      setActivePlan(key); // නැත්නම් Open කරන්න
    }
  };

  return (
    <div className="page-container">
      <div className="header-section">
        <h1>Meal Plans</h1>
        <p>Tap on a plan to view the menu</p>
      </div>

      <div className="card-list" style={{background:'transparent', boxShadow:'none'}}>
        
        {/* Plans List */}
        {Object.keys(plans).map((key) => {
          const plan = plans[key];
          const isOpen = activePlan === key;

          return (
            <div 
              key={key}
              onClick={() => togglePlan(key)}
              style={{
                background: 'white',
                marginBottom: '15px',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                border: isOpen ? `2px solid ${plan.color}` : '2px solid transparent'
              }}
            >
              {/* Card Header (Always Visible) */}
              <div style={{
                padding: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                background: isOpen ? `${plan.color}15` : 'white' // Open වුණාම පොඩි පාටක් එනවා
              }}>
                <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                   <div style={{
                     width:'12px', height:'12px', borderRadius:'50%', 
                     background: plan.color
                   }}></div>
                   <div>
                      <h3 style={{margin:0, fontSize:'16px', color:'#333'}}>{plan.title}</h3>
                      <p style={{margin:0, fontSize:'12px', color:'#888'}}>{plan.desc}</p>
                   </div>
                </div>
                {/* Arrow Icon */}
                <div style={{transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition:'0.3s', color:'#888'}}>
                  ▼
                </div>
              </div>

              {/* Card Body (Visible only when Open) */}
              {isOpen && (
                <div style={{padding: '0 15px 15px 15px', borderTop:'1px solid #eee'}}>
                   <div style={{marginTop:'15px'}}>
                      <div style={{marginBottom:'10px'}}>
                        <strong style={{color: plan.color, fontSize:'13px'}}>🥞 Breakfast</strong>
                        <div style={{fontSize:'14px', color:'#555'}}>{plan.meals.breakfast}</div>
                      </div>
                      <div style={{marginBottom:'10px'}}>
                        <strong style={{color: plan.color, fontSize:'13px'}}>🍛 Lunch</strong>
                        <div style={{fontSize:'14px', color:'#555'}}>{plan.meals.lunch}</div>
                      </div>
                      <div style={{marginBottom:'10px'}}>
                        <strong style={{color: plan.color, fontSize:'13px'}}>🥗 Dinner</strong>
                        <div style={{fontSize:'14px', color:'#555'}}>{plan.meals.dinner}</div>
                      </div>
                      <div>
                        <strong style={{color: plan.color, fontSize:'13px'}}>🍎 Snack</strong>
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