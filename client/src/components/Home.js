import React, { useEffect }from 'react';
import { showLoading2 } from '../helpers/loading2';
import Card from './Card'
import { getNewArrivals } from '../redux/actions/filterActions';
import { getProductsByCount } from '../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNewArrivals());
    }, [dispatch])
    
    useEffect(() => {
		dispatch(getProductsByCount());
	}, [dispatch]);

    const { newArrivals }= useSelector(state => state.filters)
    const { products } = useSelector(state => state.products);
    const { loading } = useSelector(state => state.loading);
    return (
    <section className='home-page'>
        <div className='banner-image '></div>
        {loading ? (
				<div className='text-center'>{showLoading2()}</div>
			) : (
				<>
					<div className='container'>
						<hr className='py-4' />
						<h3 className='py-4 text-center'>
                        NEW ARRIVALS</h3>
						<div className='row'>
							{newArrivals &&
								newArrivals.map(newArrival => (
									<Card
										key={newArrival._id}
										product={newArrival}
										homePage={true}
									/>
								))}
						</div>
                        <hr className='py-4' />
						<h3 className='py-4 text-center'>
                        FEATURED COLLECTION </h3>
						<div className='row'>
							{products &&
								products.map(product => (
									<Card
										key={product._id}
										product={product}
										homePage={true}
									/>
								))}
						</div>
						
					</div>
				</>
			)}
    </section>
    );
};


export default Home;