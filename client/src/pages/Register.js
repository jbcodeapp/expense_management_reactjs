import React ,{ useState, useEffect } from 'react'
import {Form , Input , message} from 'antd'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../styles/register.css";

import Spinner from '../components/Layout/Spinner'
const Register = () => {
const navigate = useNavigate()
const [loading, setLoading] = useState(false);
//from submit
    const submitHandler = async(values) => {
      try{
        setLoading(true)
        await axios.post('/users/register', values)
        message.success('Registration Successful')
        setLoading(false)
        navigate('/login')

      } catch(error) {
        setLoading(false)
        message.error('Something went wrong')

      }
    }
    //prevent for login user
    useEffect(() => {
      if(localStorage.getItem("user")){
        navigate("/")
      }
    }, [navigate]);  
  return (
    <>
    <div className="register-page">
      {loading && <Spinner />}
        <Form  className="register-form" layout='vertical' onFinish={submitHandler}>
            <h1>Register Form</h1>
           <Form.Item label="Name" name="name">
            <Input type="text" required/>
           </Form.Item>
           <Form.Item label="Email" name="email">
            <Input type='email' required/>
           </Form.Item>
           <Form.Item label="Password" name="password">
            <Input type='password' required/>
           </Form.Item>

            <div className='d-flex justify-content-between'>
                <Link to="/login">Already Register? login here!</Link>
                <button className="btn ">Register</button>
            </div>
        </Form>
    </div>
    </>
  )
}

export default Register