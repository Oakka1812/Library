import { useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useFireStore from "../hooks/useFireStore";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

const BookDetails = () => {
  let { id } = useParams();

  let { isDark } = useTheme();
  let { getDocument } = useFireStore();
  let { error, data: book, loading } = getDocument("books", id);

  return (
    <>
      {error && <div>{error}</div>}
      {loading && <p>Loading.....</p>}
      {book && (
        <>
          <div className="grid grid-cols-2">
            <div>
              <img src={book.cover} alt="book pic" className="w-[80%]" />
            </div>
            <div className="space-y-3">
              <h1
                className={`text-3xl font-bold ${isDark ? "text-white" : ""}`}
              >
                {book.title}
              </h1>
              <div className="space-x-2">
                {book?.categories?.map((cat) => (
                  <span
                    className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm"
                    key={cat}
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <p>{book.description}</p>
            </div>
          </div>
          <div className="my-10">
            <h1 className="text-primary text-xl text-center font-bold my-3">
              MY NOTES
            </h1>
            <NoteForm />
            <NoteList />
          </div>
        </>
      )}
    </>
  );
};

export default BookDetails;
