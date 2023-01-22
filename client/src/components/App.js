import React from 'react';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import'./App.css';
import Header from './Header';
import Home from './Home';
import Shop from './Shop';
import Cart from './Cart';
import Product from './Product';
import Register from './Register';
import Login from './Login';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import AdminEditProduct from './AdminEditProduct';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import NotFound from './NotFound';


const App = () => {


  return(
  <BrowserRouter>
      <Header />
      <main>
        <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/shop' element={<Shop />} />
                  <Route exact path='/cart' element={<Cart />} />
                  <Route
                          exact
                          path='/product/:productId'
                          element={<Product />}
					        />

                  <Route exact path='/register' element={<Register />} />
                  <Route exact path='/login' element={<Login />} />

                  {/* protected user routes */}
					        <Route element={<UserRoute />}>

                  <Route
                        exact
                        path='/user/dashboard'
                        element={<UserDashboard />}
                      />
                  </Route>
                  {/* protected admin routes */}
					        <Route element={<AdminRoute />}>

                  <Route
                        exact
                        path='/admin/dashboard'
                        element={<AdminDashboard/>}
                      />
                  <Route
                        exact
                        path='/admin/edit/product/:productId'
                        element={<AdminEditProduct/>}
		                  />
                  </Route>
                  <Route element={<NotFound />} />

        </Routes>
      </main>
  </BrowserRouter>
  
  );
};

export default App;
