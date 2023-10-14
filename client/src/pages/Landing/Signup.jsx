import React, { useState,useContext } from 'react'
import SignUp from '../../components/Authentication/Signup';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const SignupCustomer = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false
    })

    const { SignUpUser } = useContext(AuthContext);

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const response = await SignUpUser(values);

            if (response.message === 'success') {
                setTimeout(() => {
                    setLoading(false)
                    navigate('/')
                }, 1000)

            } else {
                setError(response.msg);
            }
        } catch (err) {
            console.log('Error:', err);
        }
    };
    return (
        <SignUp values={values} setValues={setValues} error={error} handleSubmit={handleSubmit} />
    )
}

export default SignupCustomer