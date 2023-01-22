import React, {useState , Fragment} from "react";
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading2 } from '../helpers/loading2';
import isEmpty from 'validator/lib/isEmpty';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { clearMessages  } from '../redux/actions/messageActions';
import { createCategory } from '../redux/actions/categoryActions';

const AdminCategoryModal = () => {
        /****************************
         * REDUX GLOBAL STATE PROPERTIES
        *****************************/
    const { successMsg, errorMsg } = useSelector(state => state.messages)
    const { loading } = useSelector(state => state.loading)
    
    const dispatch = useDispatch();
        /****************************
         * COMPONENT STATE PROPERTIES*
        *****************************/
    const [category, setCategory] = useState ('');
    const [ clientSideErrorMsg, setClientSideErrorMsg ] = useState('');


        /****************************
         *     EVENT HANDLERS      *
         ***************************/

    const handleMessages = (evt) => {
        dispatch(clearMessages());
    };

    const handleCategoryChange = (evt) => {
        dispatch(clearMessages());
        setCategory(evt.target.value);

    };

    const handleCategorySubmit = (evt) => {
        evt.preventDefault();

        if (isEmpty(category)) {
            setClientSideErrorMsg('Please Enter a Category!')
        }else {
            const data = {category};
        dispatch(createCategory(data));
        setCategory('');
        }
    };

    /****************************
	 *       / RENDERER /       **
	 ***************************/

return (
    <div id="addCategoryModal" className="modal" onClick={handleMessages}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
            <form onSubmit={handleCategorySubmit}>
                <div className="modal-header bg-info text-white">
                    <h5 className="modal-title">
                        <small>Add Category</small>
                    </h5>   
                    <button className="close" data-dismiss= 'modal'>
                        <span className="btn">
                            <i className="fas fa-times"></i>
                        </span>
                    </button>
                </div>
                <div className="modal-body my-3">
                    {clientSideErrorMsg && showErrorMsg(clientSideErrorMsg)}
                    {errorMsg && showErrorMsg(errorMsg)}
                    {successMsg && showSuccessMsg(successMsg)}

                    {
                        loading ? (
                        <div className="text-center"> 
                        {showLoading2()} 
                        </div>
                        ) : (
                        <Fragment>
                        <label className="text-secondary font-weight-bold">Category</label> 
                        <input type='text'
                        className="form-control"
                        name='category'
                        value={category}
                        onChange={handleCategoryChange}/>
                        </Fragment>
                        )
                    }
                        
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" 
                        data-dismiss= "modal" >
                        <small>Close</small>
                    </button>
                    <button type="submit" className="btn btn-info">
                        <small>Submit</small>
                    </button>
                </div>
                </form>
            </div>

        </div>
    </div>
)
};     

export default AdminCategoryModal;
