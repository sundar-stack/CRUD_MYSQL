import axios from '../axios';
import React, { useState } from 'react';
import './form.css'

const Form = () => {

    const [formData , setFormData] = useState({
        userName:"",
        age:"",
        position:"",
        country:"",
        wage:""
    })

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(formData);
        const res = await axios.post('/create',{
        userName:formData.userName,
        age:formData.age,
        position:formData.position,
        country:formData.country,
        wage:formData.wage
        })
        // console.log(res);

        const fetchRes = await axios.get('/getAllEmployees')
        console.log("fetchRes",fetchRes);
    }

    return (
        <form className="form">
            <input type="text" name="userName" value={formData.userName} placeholder="Enter Name" className="form__input"  onChange={handleChange}/>
            <input type="number" name="age" value={formData.age} placeholder="Age" className="form__input"  onChange={handleChange}/>
            <input type="text" name="position" value={formData.position} placeholder="Position" className="form__input"  onChange={handleChange}/>
            <input type="text" name="country" value={formData.country} placeholder="Country" className="form__input"  onChange={handleChange}/>
            <input type="number" name="wage" value={formData.wage} placeholder="Wage (Year)" className="form__input"  onChange={handleChange}/>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default Form
