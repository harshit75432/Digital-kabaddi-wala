import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios'

const signUpDiv = {
  width: '450px',
  border: '1px solid #BFBFBF',
  backgroundColor: 'white',
  boxShadow: '3px 3px 5px #aaaaaa'
};

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: true,
    confirmPassword: true
  });

  const [errorMessage, setErrorMessage] = useState('');  
  const [isLoading, setIsLoading] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrorMessage(''); 
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
    } else {
      try{
        setErrorMessage("");  
        setIsLoading(true)
        const response = await axios.post('/api/authentication/signup',formData)
        if(response.status == 200){
          console.log(response)
          setIsLoading(false)
          if(!response.data.userStatus){
            toast.success(response.data.message, { position: 'top-right' });
            setFormData({
              name : '',
              email : '',
              password : '',
              confirmPassword : ''
            })  

          }else{
            toast.warn(response.data.message, { position: 'top-right' });
          }
        }
      }catch(error){
        setIsLoading(false)
        console.log(error)
      }finally{
        setIsLoading(false)
      }

      
    }
  };

  return (
    <div style={{ backgroundColor: '#3977c0' }}>
      <div className='container'>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '100vh' }}>
          <div className='d-flex flex-column p-5' style={signUpDiv}>
            <h4 className='text-center'>Sign Up</h4>
            <form onSubmit={handleSubmit}>
              <div className='d-flex flex-column mt-3'>
                <label>Full Name*</label>
                <input
                  className='form-control mt-2'
                  name="name"
                  placeholder='Enter full name'
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='d-flex flex-column mt-3'>
                <label>Email*</label>
                <input
                  className='form-control mt-2'
                  name="email"
                  placeholder='Enter email'
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='d-flex flex-column mt-3'>
                <label>Password*</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className='form-control mt-2'
                    name="password"
                    type={passwordVisibility.password ? 'password' : 'text'}
                    placeholder='Enter Password'
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <i
                    onClick={() => togglePasswordVisibility('password')}
                    className={passwordVisibility.password ? "bi bi-eye-slash-fill" : 'bi bi-eye-fill'}
                    style={{ position: 'absolute', top: '14px', right: '8px' }}
                  ></i>
                </div>
              </div>
              <div className='d-flex flex-column mt-3'>
                <label>Confirm Password*</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className='form-control mt-2'
                    name="confirmPassword"
                    type={passwordVisibility.confirmPassword ? 'password' : 'text'}
                    placeholder='Enter confirm password'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <i
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    className={passwordVisibility.confirmPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}
                    style={{ position: 'absolute', top: '14px', right: '8px' }}
                  ></i>
                </div>
              </div>

              {errorMessage && (
                <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
              )}

              <button type='submit' className='btn btn-dark mt-4'>Sign Up</button>
              <p className='mt-3'>Already have an account? <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link></p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
