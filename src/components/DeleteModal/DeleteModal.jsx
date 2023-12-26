import React from "react";

const DeleteModal =({setShowDeleteModal,handleDelete,bookTitle})=>{
    return(
        <div className="modal-wrapperr">
            <div className="modal-innerr">
                <h5>{bookTitle} Kitabını Silmek istiyor musunuz ?</h5>
                <button onClick={()=>setShowDeleteModal(false)} className="btn btn-warning">Vazgeç</button>
                <button onClick={()=>handleDelete()} className="btn btn-danger">Onayla</button>
            </div>
        </div>
    )
}

export default DeleteModal