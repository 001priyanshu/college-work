import React, { useState,useContext ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import SignIn from '../../components/Authentication/Signin'

const Home = () => {
  const {loginCustomer} = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const { loginUser } = useContext(AuthContext)

  const [values, setValues] = useState({
      email: '',
      password: '',
      isAdmin : false,
  })

  const [error, setError] = useState('');

  useEffect(() => {

      if (error) {
          setError('');
      }

  }, [values.password])

  const handleLogin = async () => {
      try {
          setLoading(true)
          const res = await loginUser(values);
          if (res.message === 'success') {
              setTimeout(() => {
                  setLoading(false)
                  navigate('/recipes');
              }, 1000)

          }
          else {
              setError(res.msg)
          }
      }
      catch (err) {
          console.log(err);
      }
  }


  return (
    <SignIn handleLogin={handleLogin} error={error} values={values} setValues={setValues} url={'/register'} />
  )
}

export default Home
