import React from "react";

const AdminActionsBtns = () => (
    <div className="bg-light my-2">
        <div className="container">
            <div className="row pb-3">
                <div className="col-md-4 my-1">
                    <button className="btn btn-outline-info btn-block" 
                            data-toggle="modal" 
                            data-target='#addCategoryModal'>
                        <i className="fas fa-plus"> Add Category</i>
                    </button>
                </div>

                <div className="col-md-4 my-1">
                    <button className="btn btn-outline-warning btn-block" 
                            data-toggle='modal' 
                            data-target='#addItemModal'>
                        <i className="fas fa-plus">  Add Item</i>
                    </button>
                </div>

                <div className="col-md-4  my-1">
                    <button className="btn btn-outline-success btn-block">
                        <i className="fas fa-thumbtack">  View Orders</i>
                    </button>
                </div>  
            </div>
        </div>
    </div>
)

export default AdminActionsBtns;