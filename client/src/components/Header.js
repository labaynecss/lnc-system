import React,  { Fragment }from "react";
import { Link , useNavigate} from "react-router-dom";
import { isAuthenticated , logout} from '../helpers/auth';
import { useSelector } from "react-redux";


const  Header = () => {
    let navigate = useNavigate();
    const { cart } = useSelector(state => state.cart)
        
         //Event Handlers
    const handleLogout = evt => {
		logout(() => {
			navigate('/login');
		});
	};

        //VIEWS
        const showNavigation = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" >
        <Link to='/' className="navbar-brand text-danger">
        <i className="fas fa-cog fa-pulse text-primary"></i> LNC</Link>
        <button 
                className="navbar-toggler" 
                type="button" data-toggle="collapse" 
                data-target="#navbarSupportedContent"   
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
    
        <div className="collapse navbar-collapse" 
        id="navbarSupportedContent">    
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {!isAuthenticated() && (
                    <Fragment>
                    <li className="nav-item ">
                        <Link to='/' className="nav-link">
                        <i className='fas fa-home text-primary'>
                        <small className="text-muted"  >  Home</small></i>
                                </Link>
                        </li>
                        <li className='nav-item'>
								<Link to='/shop' className='nav-link'>
									<i className='fas fa-shopping-bag text-success'>
                                    <small className="text-muted">  Shop</small>
                                        </i> 
								</Link>
							</li>
                        <li className='nav-item mr-2'
                        style={{ position: 'relative' }}
                        >
								<Link to='/cart' className='nav-link'>
									<i className='fas fa-shopping-cart text-danger'></i> {' '}
                                    <small className="text-muted"> Cart {' '}
                                    <span
                                    className='badge badge-danger'
                                    style={{
                                        position: 'absolute',
                                        top: '0px',
                                    }}
                                    >
                                        {cart.length}
                                    </span>
                                    </small>
                                        
								</Link>
							</li>
                        <li className="nav-item ">
                        <Link to='/register' className="nav-link">
                        <i className='fas fa-edit text-primary'>
                        <small className="text-muted">  Register</small></i>{' '}
                            </Link>
                        </li>
                        <li className="nav-item">
                        <Link to='login' className="nav-link ">
                        <i className='far fa-user-circle text-primary'>{' '}
                        <small className="text-muted">  Login</small>
                            </i>{' '}
                            
                        </Link>
                        </li>
                        </Fragment>
                        )}

            {isAuthenticated() && isAuthenticated().role === 0 && (
                    <Fragment>
                    <li className="nav-item ">
                        <Link to='/user/dashboard' className="nav-link">
                        <i className='far fa-user-circle text-primary'>
                        <small className="text-muted">Dashboard</small>
                        </i>
                                </Link>
                        </li>
                        </Fragment>
                        )}  
                
                {isAuthenticated() && isAuthenticated().role === 1 && (
                    <Fragment>
                    <li className="nav-item my-auto">
                        <Link to='/admin/dashboard' className="nav-link">
                        <i className='fas fa-chart-bar text-primary'>
                        <small className="text-muted"> Dashboard</small>
                        </i>
                                </Link>
                        </li>
                        </Fragment>
                        )}  
                
                {isAuthenticated() && (
						<Fragment>
							<li className='nav-item my-auto'>
								<button
									className='btn btn-link text-secondary text-decoration-none pl-0 '
									onClick={handleLogout}
								>
									<i className='fas fa-sign-out-alt text-primary'>
                                    <small className="text-muted"> Logout</small></i>{' '}
								</button>
							</li>
						</Fragment>
					)}
            </ul>

        </div>
    </nav>

);

	// render
	return <header id='header'>{showNavigation()}</header>;
};


export default Header;