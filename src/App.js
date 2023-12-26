import { useState } from 'react';
import Header from './components/Header/Header';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import BookCard from './components/BookCard/BookCard';
import DeleteModal from './components/DeleteModal/DeleteModal';
import EditModal from './components/EditModal/EditModal';

function App() {
  const [bookName, setBookName] = useState('');
  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState('');
  const [editItem, setEditItem] = useState({});

  const handleChange = (e) => {
    setBookName(e.target.value);
    //console.log('Statedeki kitap', bookName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log('Form Fonksiyonu')
    if (!bookName) {
      toast.warn('Lütfen bir kitap ismi giriniz.', { autoClose: 2000 });
      return;
    }

    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    //console.log('yeni kitap objesi', newBook)
    setBooks([...books, newBook]);
    //console.log('kitaplar dizisi', books)
    toast.success('Kitap başarıyla eklendi.', { autoClose: 2000 });
    setBookName('');
  };

  const handleModal = (deleteBookId, deleteBookTitle) => {
    setDeleteId(deleteBookId);
    setDeleteTitle(deleteBookTitle);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    const filteredBooks = books.filter((book) => book.id !== deleteId);
    //console.log(filteredBooks);
    setShowDeleteModal(false);
    setBooks(filteredBooks);
    toast.error('Kitap başarıyla silindi.', { autoClose: 2000 });
  };

  const handleEditModal = (editBook) => {
    //console.log('Düzenleme modalı')
    setEditItem(editBook);
    setShowEditModal(true);
    //console.log(editBook)
  };

  const handleEditBook = () => {
    //console.log('edit fonk')
    const editIndex = books.findIndex((book) => book.id === editItem.id);

    const cloneBooks = [...books];
    cloneBooks.splice(editIndex, 1, editItem);
    setBooks(cloneBooks);
    setShowEditModal(false);
    toast.info('Kitap başarıyla güncellendi.', { autoClose: 2000 });
  };

  const handleRead = (readBook) => {
    //console.log('read fonk')
    const updatedBook = { ...readBook, isRead: !readBook.isRead };
    const index = books.findIndex((book) => book.id === readBook.id);

    const cloneBooks = [...books];
    cloneBooks[index] = updatedBook;
    setBooks(cloneBooks);
  };
  return (
    <div>
      <Header />
      <div className="container">
        <form className="d-flex gap-3 mt-4" onSubmit={handleSubmit}>
          <input
            value={bookName}
            onChange={handleChange}
            className="form-control shadow"
            type="text"
            placeholder="Bir kitap ismi giriniz..."
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>
        {books.length === 0 ? (
          <h4 className="mt-3">Henüz bir kitap eklenmedi.</h4>
        ) : (
          books.map((book) => (
            <BookCard
              handleEditModal={handleEditModal}
              handleModal={handleModal}
              bookInfo={book}
              key={book.id}
              handleRead={handleRead}
            />
          ))
        )}
      </div>
      {showDeleteModal && (
        <DeleteModal
          bookTitle={deleteTitle}
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {showEditModal && (
        <EditModal
          handleEditBook={handleEditBook}
          editItem={editItem}
          setEditItem={setEditItem}
          setShowEditModal={setShowEditModal}
        />
      )}
    </div>
  );
}

export default App;
