import React, { useState } from 'react'
import { registerUser } from '../utils/ApiFunctions'

const Registration = () => {
    const[registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })
    const[errorMessage, setErrorMessage] = useState("")
    const[successMessage, setSuccessMessage] = useState("")

    const handleInputChange = (e)=>{
        setRegistration({...registration, [e.target.name]: e.target.value })
    }

    const handleRegistration = async()=>{
        e.preventDefault()
        try{
            const result = await registerUser(registration)
            setSuccessMessage(result)
            setErrorMessage("")
            setRegistration({firstName:"",lastName:"",email:"",password:"",})
        }
        catch(error){
            setSuccessMessage("")
            setErrorMessage(`Registration Error : ${error.message}`)
        }
        setTimeout(()=>{
            setErrorMessage("")
            setSuccessMessage("")
        }, 5000)
    }


  return (
    <section className='container col-6 mt-5 mb-5'>
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        {successMessage && <p className="alert alert-success">{successMessage}</p>}

        <h2>Register</h2>
        <form>
            
        </form>
    </section>
  )
}

export default Registration