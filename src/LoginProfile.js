import React, { useState } from 'react';

function LoginProfile({ handleNav }) {
  const [authPage, setAuthPage] = useState('login'); 

  // --- 1. LOGIN PAGE VIEW ---
  if (authPage === 'login') {
    return (
      <div className="center-content">
        <div style={{marginBottom:'20px'}}>
           <div style={{background:'#32CD32', width:'80px', height:'80px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto'}}>
              <span style={{fontSize:'40px', color:'white'}}>🍏</span>
           </div>
           <h2 style={{color:'#32CD32', marginTop:'10px'}}>NutriPlan</h2>
           <p style={{fontSize:'12px', color:'#555'}}>Login to continue</p>
        </div>

        <h1 style={{fontSize:'28px', marginBottom:'20px'}}>Sign In</h1>
        
        <div className="card-list" style={{width:'100%', padding:0}}>
           <div style={{textAlign:'left', width:'100%'}}>
              <label style={{fontSize:'12px', fontWeight:'bold', marginLeft:'5px'}}>Email</label>
              <input className="input-field" placeholder="tharushi@gmail.com" />
              <label style={{fontSize:'12px', fontWeight:'bold', marginLeft:'5px'}}>Password</label>
              <input className="input-field" type="password" placeholder="........" />
           </div>

           <div style={{display:'flex', alignItems:'center', width:'100%', margin:'15px 0'}}>
              <hr style={{flex:1, border:'none', borderTop:'1px solid #ccc'}} />
              <span style={{padding:'0 10px', color:'#555', fontSize:'12px'}}>OR</span>
              <hr style={{flex:1, border:'none', borderTop:'1px solid #ccc'}} />
           </div>

           {/* Google Button */}
           <button className="btn-secondary" onClick={() => setAuthPage('google')} style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', background:'#e5e7eb', border:'none', color:'#333'}}>
              <span style={{fontSize:'18px'}}>G</span> Continue with Google
           </button>

           {/* Login Button -> Goes to Health Record */}
           <button className="btn-primary" onClick={() => handleNav('record')}>Login</button>
           
           <p style={{marginTop:'15px', fontSize:'13px', color:'#555'}}>
             You haven't an account? 
             <span style={{color:'#32CD32', fontWeight:'bold', cursor:'pointer', marginLeft:'5px'}} onClick={() => setAuthPage('signup')}>
                Sign Up
             </span>
           </p>
        </div>
        <div style={{position:'absolute', bottom:0, left:0, right:0, height:'50px', background:'#32CD32'}}></div>
      </div>
    );
  }

  // --- 2. SIGN UP PAGE VIEW ---
  if (authPage === 'signup') {
    return (
      <div className="center-content">
        <h1 style={{fontSize:'26px', marginBottom:'15px'}}>Sign Up</h1>
        <div className="card-list" style={{width:'100%', padding:0}}>
           <div style={{textAlign:'left', width:'100%'}}>
              <label style={{fontSize:'12px', fontWeight:'bold', marginLeft:'5px'}}>Full Name</label>
              <input className="input-field" placeholder="Name" />
              
              <label style={{fontSize:'12px', fontWeight:'bold', marginLeft:'5px'}}>Email</label>
              <input className="input-field" placeholder="Email" />
              
              <label style={{fontSize:'12px', fontWeight:'bold', marginLeft:'5px'}}>Password</label>
              <input className="input-field" type="password" placeholder="Password" />

              {/* Added: Confirm Password */}
              <label style={{fontSize:'12px', fontWeight:'bold', marginLeft:'5px'}}>Confirm Password</label>
              <input className="input-field" type="password" placeholder="Re-enter Password" />
           </div>

           {/* Sign Up Button -> Goes back to Login */}
           <button className="btn-primary" onClick={() => setAuthPage('login')}>Sign Up</button>
           
           {/* Added 'Cancel' button since we removed the bottom text link */}
           <button className="btn-secondary" onClick={() => setAuthPage('login')} style={{marginTop:'10px', border:'none', color:'#888'}}>Cancel</button>

           {/* REMOVED: The text that was here ("Already have an account?...") */}
        </div>
      </div>
    );
  }

  // --- 3. GOOGLE SIGN IN PAGE VIEW ---
  if (authPage === 'google') {
    return (
      <div className="center-content">
        <h1 style={{fontSize:'28px', marginBottom:'5px'}}>Google Sign In</h1>
        <p style={{marginBottom:'20px', color:'#555'}}>Enter your details</p>
        
        <div className="card-list" style={{width:'100%', padding:0}}>
           <div style={{textAlign:'left', width:'100%'}}>
              <label style={{fontSize:'12px', fontWeight:'bold', marginLeft:'5px'}}>Email</label>
              <input className="input-field" placeholder="tharushi@gmail.com" readOnly />

              {/* Added: Google Password Input */}
              <label style={{fontSize:'12px', fontWeight:'bold', marginLeft:'5px'}}>Password</label>
              <input className="input-field" type="password" placeholder="Enter your Google password" />
           </div>

           {/* Next Button -> Goes to Health Record */}
           <button className="btn-primary" onClick={() => handleNav('record')}>Next</button>
           
           <button className="btn-secondary" onClick={() => setAuthPage('login')} style={{border:'none', marginTop:0, color:'#888'}}>Cancel</button>
        </div>
      </div>
    );
  }
  
  return null;
}

export default LoginProfile;