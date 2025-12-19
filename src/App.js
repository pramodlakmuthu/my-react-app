import React, { useState } from 'react';
import './App.css';

import LoginProfile from './LoginProfile';
import BMICalculator from './BMICalculator';
import MealPlans from './MealPlans';
import Tracker from './Tracker';
import DailyLog from './DailyLog';
import PersonalHealthRecord from './PersonalHealthRecord';

function App() {
  const [screen, setScreen] = useState('login'); 
  const [activeTab, setActiveTab] = useState('record'); // Login වුණාම මුලින්ම පෙන්වන්නේ Record Tab එක

  // Shared Data
  const [bmi, setBmi] = useState({ 
    height: '', weight: '', value: null, status: '', minWeight: '', maxWeight: '' 
  });
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [tracker, setTracker] = useState({ 
    consumed: 0, target: 2000, meals: [], protein: 0, carbs: 0, fiber: 0
  });

  const handleNav = (target) => {
    // 1. Login එකෙන් 'record' එකට යන්න කිව්වම මෙතනට එනවා
    if (['home', 'bmi', 'tracker', 'progress', 'record'].includes(target)) {
      setActiveTab(target);
      setScreen(target);
    } 
  };

  return (
    <div className="app-container">
      <div className="content-area">
        
        {/* --- Login Flow --- */}
        {screen === 'login' && (
           <LoginProfile handleNav={handleNav} />
        )}

        {/* --- App Pages (Order: Health -> BMI -> Home -> Tracker -> Log) --- */}

        {/* 1. Health Record (Login වුණාම එන තැන) */}
        {screen === 'record' && (
          // මෙතන Save කළාම BMI එකට යවමු (Flow එකේ ඊළඟ පියවර)
          <PersonalHealthRecord onComplete={() => handleNav('bmi')} />
        )}

        {/* 2. BMI Calculator */}
        {screen === 'bmi' && (
          <BMICalculator bmi={bmi} setBmi={setBmi} />
        )}

        {/* 3. Meal Plans (Home) */}
        {screen === 'home' && (
          <MealPlans selectedDiet={selectedDiet} setSelectedDiet={setSelectedDiet} />
        )}

        {/* 4. Tracker */}
        {screen === 'tracker' && (
          <Tracker tracker={tracker} setTracker={setTracker} />
        )}

        {/* 5. Daily Log */}
        {screen === 'progress' && (
          <DailyLog tracker={tracker} />
        )}

      </div>

      {/* --- Navigation Bar (Shows after Login) --- */}
      {screen !== 'login' && (
        <div className="bottom-nav">
          <div className={`nav-btn ${activeTab==='record'?'active':''}`} onClick={()=>handleNav('record')}>📋</div>
          <div className={`nav-btn ${activeTab==='bmi'?'active':''}`} onClick={()=>handleNav('bmi')}>⚖️</div>
          <div className={`nav-btn ${activeTab==='home'?'active':''}`} onClick={()=>handleNav('home')}>🏠</div>
          <div className={`nav-btn ${activeTab==='tracker'?'active':''}`} onClick={()=>handleNav('tracker')}>🥣</div>
          <div className={`nav-btn ${activeTab==='progress'?'active':''}`} onClick={()=>handleNav('progress')}>🏆</div>
        </div>
      )}
    </div>
  );
}

export default App;