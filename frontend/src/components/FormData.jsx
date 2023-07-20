import React, { useEffect, useState } from 'react'
import { Country, State, City }  from 'country-state-city';
import { useNavigate } from 'react-router-dom';


function FormData() {
  
  const getcountry=Country.getAllCountries();

  const [data,setdata]=useState({first:"",last:"",email:"",country:"",state:"",city:"",gender:"",dob:""})

  let[ getstate,setGetState]=useState([]);
  let [getcity,setGetCity]=useState([]);
  const Navigate =useNavigate();
  useEffect(()=>{
    let getst=State.getStatesOfCountry(data.country);
    setGetState(getst);
    let getct=City.getCitiesOfState(data.state);
    setGetCity(getct);
  },[data])
  const handelChange=(e)=>{
    const {name,value}=e.target;
setdata(prev=>({
  ...prev,
  [name]:value
}))
}
const handelSubmit=async ()=>{
  try{
 const resp = await fetch("http://localhost:5000/form",{
  method:'POST',
  body:JSON.stringify(data),
  headers:{
    'Content-Type':'application/json'
  }
 })
 const result = await resp.json();
 if(!result.success){
  alert(result.error);
 }else{
  setdata({first:"",last:"",email:"",country:"",state:"",city:"",gender:"",dob:""});
  Navigate('/page');
 }
 console.warn(result);
}catch(err){
  console.warn(err);
}
  }
  return (
    <>
      <div className='d-flex justify-content-center' >
        <div className='w-75 w-sm-75 w-md-50 mt-5'>
          <div className='row'>
            <div className='col-12 col-sm-12 col-md-6'>
              <div class="form-floating mb-3">
                <input type="text" className="form-control" id="firstname" name="first" value={data.first} onChange={(e)=>handelChange(e)}  />
                <label for="firstname">first Name</label>
              </div>
            </div>
            <div className='col-12 col-sm-12 col-md-6'>
              <div class="form-floating mb-3">
                <input type="text" className="form-control" id="lastname" name="last" value={data.last} onChange={(e)=>handelChange(e)} />
                <label for="lastname">last Name</label>
              </div>
            </div>
            <div className='col-12'>
              <div class="form-floating mb-3">
                <input type="email" className="form-control" id="Emailname" name="email" value={data.email} placeholder="name@example.com" onChange={(e)=>handelChange(e)} />
                <label for="Emailname">email</label>
              </div>
            </div>
            <div className='col-4'>
              <select class="form-select" aria-label="Default select example" name='country' value={data.country} onChange={(e)=>handelChange(e)}>
                {
                  getcountry.map((cntry)=>{
                  return  <option value={cntry.isoCode} >{cntry.name}</option>
                  })
                }

              </select>
            </div>
            <div className='col-4'>
              <select class="form-select" aria-label="Default select example" name='state' value={data.state} onChange={(e)=>handelChange(e)}>
              {
                getstate.map((cntry)=>{
                  return  <option value={cntry.isoCode} key={cntry.isoCode}>{cntry.name}</option>
                  })
                }
              </select>
            </div>
            <div className='col-4'>
              <select class="form-select" aria-label="Default select example" name='city' value={data.city} onChange={(e)=>handelChange(e)}>
                {
                  getcity.map((city)=>(
                    <option value={city.name} key={city.name}>{city.name}</option>
                  ))
                }

              </select>
            </div>
            <div className='col-12 col-sm-12 col-md-6 mt-3'>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="male" onChange={(e)=>handelChange(e)} />
                <label className="form-check-label" for="inlineRadio1">male</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="female" onChange={(e)=>handelChange(e)}/>
                <label className="form-check-label" for="inlineRadio2">female</label>
              </div>
            </div>
            <div className='col-12 col-sm-12 col-md-6 mt-3'>
              <div className="form-group">
              <div class="form-floating mb-3">
                <input type="text" className="form-control" id="dob" name="dob" value={data.dob} onChange={(e)=>handelChange(e)}/>
                <label for="dob">DOB (yyyy-mm-dd)</label>
              </div>
              </div>
            </div>
            <button className='btn btn-success' onClick={handelSubmit} >Submit</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default FormData;