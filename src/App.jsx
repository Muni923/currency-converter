import React, { useEffect } from 'react'
import { useState } from 'react';

function App() {
  const [curr,setCurr]=useState([]);
  const[fromcurr,setfromCurr]=useState()
const[tocurr,settoCurr]=useState()
const[amt,setamt]=useState()

const[val,setval]=useState([])


const Currency=async()=>{
  const res=await fetch ("https://api.frankfurter.dev/v1/currencies");
  const data=await res.json();
  setCurr(Object.keys(data));


  const keys = Object.keys(data);
setCurr(keys);
setfromCurr(keys[0]);
settoCurr(keys[1]);


}

useEffect(()=>{
  Currency();},[]);

  const fromfx=(e)=>{
// console.log(e.target.value)
setfromCurr(e.target.value)
  }


  const Tofx=(e)=>{
// console.log(e.target.value)
settoCurr(e.target.value)
  }

  const handleamt=(e)=>{
// console.log(e.target.value)
setamt(e.target.value)
  }

  const convert=async()=>{
   const res = await fetch(
  `https://api.frankfurter.dev/v1/latest?amount=${amt}&base=${fromcurr}&symbols=${tocurr}`
);


     const data = await res.json();
  // console.log(data)
setval(data.rates[tocurr])
  }


  return (
    <div style={{backgroundColor:'#c9b2b2ff' ,height:350,width:500}}>
      <div style={{fontFamily:'monospace',fontSize:29,background:'grey',textAlign:'center',padding:10,width:300,marginLeft:90}}>Currency Converter</div>

      <div>

      <br/><br/><br/><br/>
      
<label style={{fontFamily:'cursive',fontSize:15,color:'#fcfafc',marginLeft:90}} >From </label>

<select onChange={fromfx}style={{fontFamily:'monospace',fontSize:15,color:'#deed00ff'}} >

  {curr.map((values, index) => (
    <option key={index}>{values}</option>
  ))}




</select>  


<label style={{fontFamily:'cursive',fontSize:15,color:'#fcfafc',marginLeft:70}}>To </label>

<select onChange={Tofx}
style={{fontFamily:'monospace',fontSize:15,color:'#deed00ff'}} >
   {curr.map((values, index) => (
    <option key={index}>{values}</option>
  ))}
</select></div>
<br/><br/><br/>




<div style={{fontFamily:'monospace',marginLeft:120,fontSize:15}}>{fromcurr}:{val} {tocurr}</div>


<br/><br/>
<label style={{fontFamily:'monospace',marginLeft:120,fontSize:15}} >Amount :</label>
<input onChange={handleamt}type='text'></input>


<button onClick={convert}>Convert</button>
    </div>
  )
}

export default App
