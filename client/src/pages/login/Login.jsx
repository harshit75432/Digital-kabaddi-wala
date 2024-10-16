import {useState} from 'react'
import { Link,useNavigate } from "react-router-dom";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios'

const signUpDiv = {
  width: '450px',
  border: '1px solid #BFBFBF',
  backgroundColor: 'white',
  boxShadow: '3px 3px 5px #aaaaaa'
}
function Login() {
  const [passwordEyeIcon,setPasswordEyeIcon] = useState(true) 
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value 
    }));
  };

  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      setIsLoading(true)
     const response = await axios.post('/api/authentication/login',formData)
      if(response.status == 200){
        console.log(response)
         if(response.data.loginStatus){
          setIsLoading(false)
          navigate('/')
         }else{
          setIsLoading(false)
          toast.warn(response.data.message, { position: 'top-right' });
         }
      }
      
    }catch(error){
      setIsLoading(false)
      console.log(error)
    }finally{
      setIsLoading(false)
    }
   
  };

  return (
    <div style={{backgroundColor:'#3977c0'}}>
    <div className='container' >
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ height:'100vh'}}>
          <div className='d-flex flex-column p-5' style={signUpDiv}>
                <h4 className='text-center '>Login</h4>
                <form onSubmit={(e)=>handleSubmit(e)}>
                 
                  <div className='d-flex flex-column mt-3'>
                    <label htmlFor="">Email*</label>
                    <input className='form-control mt-2' name="email" onChange={handleInputChange} placeholder='Enter email' type="email" required/>
                  </div>
                  <div className='d-flex flex-column mt-3'>
                    <label htmlFor="">Password*</label>
                    <div style={{position:'relative'}}>
                      <input className='form-control mt-2'  name="password" onChange={handleInputChange} type={passwordEyeIcon ? 'password' : 'text'} placeholder='Enter Password' required/>
                      <i onClick={()=>setPasswordEyeIcon(!passwordEyeIcon)} className={passwordEyeIcon ? "bi bi-eye-slash-fill":'bi bi-eye-fill'} style={{position : 'absolute', top:'14px', right: '8px'}}></i>
                    </div>
                  </div>
      
                 <button type='submit' className='btn btn-dark mt-4'>Login</button>
                 <p className='mt-3'>Create a account <Link to="/signup" style={{textDecoration:'none'}}>Sign up</Link></p>
                </form>
          </div>
            
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Login
