import React from 'react';

const EditModal = ({
  setShowEditModal = () => {},
  editItem = {},
  setEditItem = () => {},
  handleEditBook = ()=>{}
}) => {
  return (
    <div className="modal-wrapperr">
      <div className="modal-innerr">
        <h5>Kitap İsmini Düzenle</h5>
        <input 
        onChange={(e)=>setEditItem({...editItem,title:e.target.value})}
        className="form-control" type="text" value={editItem.title} />
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-warning"
            onClick={() => setShowEditModal(false)}
          >
            Vazgeç
          </button>
          <button onClick={()=>handleEditBook()}className="btn btn-success">Kaydet</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
