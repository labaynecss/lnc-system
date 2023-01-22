import React,{ Fragment , useState } from "react";
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading2 } from '../helpers/loading2';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { clearMessages } from "../redux/actions/messageActions";
import { createProduct } from "../redux/actions/productActions";

const AdminProductModal = () => {

    /****************************
    * REDUX GLOBAL STATE PROPERTIES
    *****************************/
    const { loading } = useSelector(state => state.loading);
    const { successMsg, errorMsg } = useSelector(state => state.messages);
    const { categories } = useSelector(state => state.categories);

    const dispatch = useDispatch();
    /****************************
     * COMPONENT STATE PROPERTIES*
    ***************************/
    const [clientSideError, setClientSideError ] = useState('');
    const [productData, setProductData ] = useState ({

            productImage: null,
            productName: '',
            productDesc: '',
            productPrice: '',
            productCategory: '',
            productQty: ''
    });

    const { 
            productImage, 
            productName, 
            productDesc, 
            productPrice, 
            productCategory, 
            productQty 
        } = productData;


        /****************************
         *     EVENT HANDLERS      *
         ***************************/
        const handleMessages = (evt) => {
            dispatch(clearMessages());
            setClientSideError('');
        };
        
        const handleProductImage = evt => {
            console.log(evt.target.files[0]);
            setProductData({
                ...productData,
                [evt.target.name]: evt.target.files[0],
            });
        };

        const handleProductChange = (evt) => {

            setProductData({
                ...productData,
                [evt.target.name] : evt.target.value,
            })
        };
    
        const handleProductSubmit = (evt) => {
            evt.preventDefault();
            
            if(productImage === null) 
                {
                setClientSideError('Please select an image.');
            }else if(
                isEmpty(productName) || 
                isEmpty(productDesc) || 
                isEmpty(productPrice)
            ) 
                {
                setClientSideError('All fields are require!');
            }else if (isEmpty(productCategory)) 
                {
                setClientSideError('Please select a category');
            }else if (
                isEmpty(productQty)) 
                {
                setClientSideError('Please select a quantity');
            }else{
                let formData = new FormData();
                formData.append('productImage',productImage);
                formData.append('productName',productName); 
                formData.append('productDesc',productDesc);
                formData.append('productPrice',productPrice);
                formData.append('productCategory',productCategory);
                formData.append('productQty',productQty);
            
                dispatch(createProduct(formData));
            setProductData({
                productImage: null,
                productName: '',
                productDesc: '',
                productPrice: '',
                productCategory: '',
                productQty: ''

            });  
            }
        };

    /****************************
	 *       / RENDERER /       **
	 ***************************/
return (
    <div id="addItemModal" className="modal">   
        <div className="modal-dialog modal-dialog-centered modal-lg" onClick={handleMessages}>
            <div className="modal-content">
            <form onSubmit={handleProductSubmit}>
                <div className="modal-header bg-warning">
                    <h5 className="modal-title">
                        <small className="text-white">Add Item</small>
                    </h5>
                    <button className="close" data-dismiss= 'modal'>    
                        <span>
                            <i className="fas fa-times"></i>
                        </span>
                    </button>
                </div>
                <div className="modal-body my-3">
                    {clientSideError && showErrorMsg(clientSideError)}
                    {errorMsg && showErrorMsg(errorMsg)}
                    {successMsg && showSuccessMsg(successMsg)}
                    {loading && showLoading2}

                    {
                        loading ? (
                        <div className="text-center"> {showLoading2()} </div>
                        ) : (
                        <Fragment>
                            <div className="custom-file mb-2">
                                <input 
                                    type='file' 
                                    className="custom-file-input"
                                    name="productImage"
                                    onChange={handleProductImage}
                                />
                                    <label className="custom-file-label text-secondary">
                                        <small>
                                            Choose File
                                    </small>
                                    </label>
                                <div className="form-group">
                                    <label className="text-secondary ">
                                        <small >Name
                                        </small>
                                    </label>
                                    <input 
                                        type='text' 
                                        className="form-control" 
                                        name="productName"
                                        onChange={handleProductChange}
                                        value={productName}
                                        />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="text-secondary">
                                        <small>Description
                                        </small>
                                </label>
                                <textarea 
                                    className="form-control" 
                                    rows='3'
                                    name="productDesc"
                                    onChange={handleProductChange}
                                    value={productDesc}
                                    />
                            </div>
                
                            <div className="form-group">
                                <label className="text-secondary">
                                    <small>Price
                                    </small>
                                </label>
                                <input 
                                    type='text' 
                                    className="form-control" 
                                    name="productPrice"
                                    onChange={handleProductChange}
                                    value={productPrice}
                                    />
                            </div>

                            <div className="form-row ">
                                <div className="form-group col-md-6 my-1">
                                    <label className="text-secondary">
                                        <small>
                                            Category
                                        </small>
                                    </label>
                                    <select className='custom-select mr-sm-2'
                                            name="productCategory"
                                            onChange={handleProductChange}
                                            >
                                        <option value="">Choose one...</option>
                                        {categories && categories.map(c =>(
                                            <option key={c._id} value={c._id}>
                                                {c.category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="text-secondary">
                                        <small>
                                            Quantity
                                        </small>
                                    </label>
                                    <input 
                                        type='number' 
                                        className="form-control" 
                                        min='0'
                                        max='5000'
                                        name="productQty"
                                        onChange={handleProductChange}
                                        value={productQty}
                                        />
                                        
                                </div>
                            </div>
                        </Fragment>
                        )
                    }
                        
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" data-dismiss= "modal" >
                        <small>Close</small>
                    </button>
                    <button type="submit" className="btn btn-warning text-white">
                        <small>Submit</small>
                    </button>
                </div>
                </form>
            </div>

        </div>
    </div>
);

};

export default AdminProductModal;