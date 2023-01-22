import React, { useEffect } from "react";
import AdminHeader from './AdminHeader';
import AdminActionsBtns from './AdminActionsBtns'
import AdminCategoryModal from './AdminCategoryModal'
import AdminProductModal from "./AdminProductModal";
import AdminBody from './AdminBody';

//redux 

import { useDispatch } from "react-redux";
import { getCategories } from "../redux/actions/categoryActions";
import { getProducts } from "../redux/actions/productActions";



// life Cycle methods
const AdminDashboard = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])
    
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])


// render section 
    return (
    <section>
        <AdminHeader/>
        <AdminActionsBtns />
        <AdminCategoryModal />
        <AdminProductModal/>
        <AdminBody />
    </section>
    )
};

export default AdminDashboard;