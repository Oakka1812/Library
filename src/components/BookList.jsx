import { Link, useLocation, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import trash from "../assets/trash.svg";
import pencil from "../assets/pencil.svg";
import useFireStore from "../hooks/useFireStore";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const BookList = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let params = new URLSearchParams(location.search);
  let search = params.get("search");

  // let { data: books, loading, error } = useFetch(`http://localhost:3000/books${search ? `?q=${search}` : ''}`);

  let { isDark } = useTheme();

  let { getCollection, deleteDocument } = useFireStore();

  let { user } = useContext(AuthContext);
  let {
    error,
    data: books,
    loading,
  } = getCollection("books", ["uid", "==", user.uid], search);

  let deleteBook = async (e, id) => {
    e.preventDefault();
    await deleteDocument("books", id);
    // setBooks((prev) => prev.filter((b) => b.id !== id)); //frontend delete
  };
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      {loading && <p>loading...</p>}
      {!!books && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-5">
          {books.map((book) => (
            <Link to={`/bookdetails/${book.id}`} key={book.id}>
              <div
                className={`border p-4 min-h-[400px] ${
                  isDark ? "bg-dcard text-white border-primary" : ""
                }`}
                key={book.id}
              >
                <img src={book.cover} alt="" />
                <div className="text-center my-2 space-y-2">
                  <h1>{book.title}</h1>
                  <p>{book.description}</p>
                  <div className="flex flex-wrap justify-between items-center">
                    <div>
                      {book.categories.map((c) => (
                        <span
                          className="mx-1 my-1 px-2 text-sm bg-blue-500 rounded-xl text-white"
                          key={c}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2 items-center">
                      <img
                        src={pencil}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/edit/${book.id}`);
                        }}
                        alt=""
                      />

                      <img
                        src={trash}
                        alt=""
                        onClick={(e) => deleteBook(e, book.id)}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!books?.length && (
        <p className="text-center text-3xl text-gray-500">
          No search results found
        </p>
      )}
    </>
  );
};

export default BookList;
