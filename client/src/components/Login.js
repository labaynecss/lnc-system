import React, { useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { showErrorMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { setAuthentication, isAuthenticated } from '../helpers/auth';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { login } from '../api/auth';



const Login = () => {
        let navigate = useNavigate();
        let location = useLocation();
	        //console.log('location: ', location);

        useEffect(() => {
            if (isAuthenticated() && isAuthenticated().role === 1) {
                navigate('/admin/dashboard');
            } else if (isAuthenticated() && isAuthenticated().role === 0) {
                navigate('/user/dashboard');
            }
        }, [navigate]);


    const [formData, setFormData] = useState({
		email: 'labayne@gmail.com',
		password: 'hesoyam',
		errorMsg: false,
		loading: false,
	});
    const { 
        email,
        password,
        errorMsg,
        loading 
        } = formData;
        /****************************
         *     EVENT HANDLERS
         ***************************/
        const handleChange = evt => {
            //console.log(evt);
            setFormData({
                ...formData,
                [evt.target.name]: evt.target.value,
                errorMsg: '',
            });
        };
        const handleSubmit = evt => {
            evt.preventDefault();
    
            // client-side validation
            if (isEmpty(email) || isEmpty(password)) {
                setFormData({
                    ...formData,
                    errorMsg: 'All fields are required.',
                });
            } else if (!isEmail(email)) {
                setFormData({
                    ...formData,
                    errorMsg: 'Invalid email',
                });
            } else {
                const { email, password } = formData;
                const data = { email, password };
    
                setFormData({ ...formData, loading: true });
    
                login(data)
                    .then(response => {
                        setAuthentication(response.data.token, response.data.user);
                        const redirect = location.search.split('=')[1];
    
                        if (isAuthenticated() && isAuthenticated().role === 1) {
                            console.log('Redirecting to the admin dashboard');
                            navigate('/admin/dashboard');
                        } else if (
                            isAuthenticated() &&
                            isAuthenticated().role === 0 &&
                            !redirect
                        ) {
                            console.log('Redirecting to the user dashboard');
                            navigate('/user/dashboard');
                        }
                    })
                    .catch(err => {
                        console.log('Error in the signin API function : ', err);
                        setFormData({
                            ...formData,
                            loading: false,
                            errorMsg: err.response.data.errorMessage,
                        });
                    });
            }
        };



        /****************************
        ****** / VIEWS /       *******
        ***************************/
            const showLoginForm = () => (
                <form className='login-form' onSubmit={handleSubmit} noValidate>
                {/* email */}
                <div className='form-group input-group'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>
                            <i className='fa fa-envelope'></i>
                        </span>
                    </div>
                    <input
                        name='email'
                        value={email}
                        className='form-control'
                        placeholder='Email address'
                        type='email'
                        onChange={handleChange}
                    />
                </div>
                {/* password */}
                <div className='form-group input-group'>
                    <div className='input-group-prepend'>
                        <span className='input-group-text'>
                            <i className='fa fa-lock'></i>
                        </span>
                    </div>
                    <input
                        name='password'
                        value={password}
                        className='form-control'
                        placeholder='Create password'
                        type='password'
                        onChange={handleChange}
                    />
                </div>
                {/* signup button */}
                <div className='form-group'>
                    <button type='submit' className='btn btn-primary btn-block'>
                        Log in
                    </button>
                </div>
                {/* already have account */}
                <p className='text-center text-white'>
                Not a member?   <Link to='/register'className="btn btn-outline-light btn-sm font-italic ml-1">Register Here!</Link>
                </p>
            </form>
            )
    /****************************
	 * RENDERER
	 ***************************/
	return (
		<div className='login-container'>
			<div className='row px-3 vh-100'>
				<div className='col-md-5 mx-auto align-self-center'>
					{errorMsg && showErrorMsg(errorMsg)}
					{loading && (
						<div className='text-center pb-4'>{showLoading()}</div>
					)}  
					{showLoginForm()}
					{/* <p style={{ color: 'white' }}>{JSON.stringify(formData)}</p> */}
				</div>
			</div>
		</div>
	);
 };

export default Login;