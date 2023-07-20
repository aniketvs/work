import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom';
function Page() {
  const [listdata,setListData]=useState([]);
  useEffect(()=>{
   getData();
  },[])
  const getData=async()=>{
    const data=await fetch("http://localhost:5000/");
    let result=await data.json();
    setListData(result.data);
    console.warn(listdata);
  }
  function calage(dob) {
    
    const givenDate = new Date(dob);
    const today = new Date();
    const timeDiff = today - givenDate;
    const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
    const age = Math.floor(timeDiff / millisecondsPerYear);
    return age;
  }
  const columns = [{ name: 'First', selector: 'first' },
  { name: 'Last', selector: 'last' },
  { name: 'Email', selector: 'email' },
  { name: 'Countary', selector: 'countary' },
  { name: 'State', selector: 'state' },
  { name: 'City', selector: 'city' },
  { name: 'Gender', selector: 'gender' },
  { name: 'DOB',selector:'dob'},
  { name: 'Age',selector:'age',cell:(row)=>(<span>{calage(row.dob)}</span>)}
  ]
  return (
    <div>
     <Link to="/"><span style={{textDecoration:'none',color:'#000'}}>Home</span></Link>
      <DataTable
        title="form data"
        columns={columns}
        data={listdata}
      />
    
    </div>
  )
}

export default Page