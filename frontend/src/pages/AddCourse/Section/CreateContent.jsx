
import React from 'react'
import { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import apiconector from '../../../apiService/apiconector';




function CreateContent() {
 const [sectiondata,setsection] = useState ("");
 const course = useSelector((state)=>state.course)
 

  function handlechange(e){
      const {name, value}=e.target;
      setsection (prev =>({...prev ,[name]:value}))
  }
  async function createsection(){
     const response = await apiConnector("POST", CREATE_SECTION_API, sectiondata, {
      Authorization: `Bearer ${token}`,
    })
  }

  return (
    <div>
        <label>CreateSubsection</label>
         <input type="text"
         name='section name'
         placeholder='create section'
         onChange={handlechange(e)}
         />
         <button onClick={createsection()}>create</button>
    </div>
  )
}

export default CreateContent
