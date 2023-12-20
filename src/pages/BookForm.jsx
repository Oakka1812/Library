import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import useFireStore from "../hooks/useFireStore";
import { AuthContext } from "../contexts/AuthContext";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage"

const Create = () => {
  let { id } = useParams();

  let { isDark } = useTheme();

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [newCategory, setNewCategory] = useState("");
  let [categories, setCategories] = useState([]);
  let [isEdit, setIsEdit] = useState(false);
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState("");

  let { addCollection, updateDocument } = useFireStore();

  let navigate = useNavigate();
  let {user} = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      setIsEdit(true);

      let ref = doc(db, "books", id); //doc -> only one document
      getDoc(ref).then((doc) => {
        if (doc.exists()) {
          let { title, description, categories } = doc.data();
          setTitle(title);
          setDescription(description);
          setCategories(categories);
        }
      });
    } else {
      setIsEdit(false);
      setTitle("");
      setDescription("");
      setCategories([]);
    }
  }, [id]);

  let addCategory = () => {
    if (newCategory && categories.includes(newCategory)) {
      setNewCategory("");
      return;
    }
    setCategories((prev) => [newCategory, ...prev]);
    setNewCategory("");
  };
  // let {setPostData, data: book} = useFetch('http://localhost:3000/books', 'POST')

  let photoHandler = (e) => {
    setFile(e.target.files[0]);
  }

  let handlePreviewImage = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result)
    }
  }

  useEffect(() => {
    if(file){
      handlePreviewImage(file);
    }
  },[file])

  let uploadToFirebase = async (file) => {
    let uniqueFileName = Date.now().toString() + '_' + file.name;
    let path = "/covers/" + user.uid + "/" + uniqueFileName;
    let storageRef = ref(storage,path);
    await uploadBytes(storageRef,file);
    return await getDownloadURL(storageRef);
  }
  
  let submitForm = async (e) => {
    e.preventDefault();
   let url = await uploadToFirebase(file);
    let data = {
      title,
      description,
      categories,
      uid: user.uid,
      cover : url
    };
    if (isEdit) {
      //update book
      await updateDocument("books", id, data);
    } else {
      // create book
      await addCollection("books", data);
    }
    navigate("/");
  };

  

 
  return (
    <div className="h-screen">
      <form className="w-full max-w-lg mx-auto mt-10" onSubmit={submitForm}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password ${isDark ? "text-white" : ""}`}
            >
              BOOK TITLE
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="Book Title"
            />
          </div>
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password ${isDark ? "text-white" : ""}`}
            >
              BOOK DESCRIPTION
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="Book Description"
            />
          </div>
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password ${isDark ? "text-white" : ""}`}
            >
              BOOK CATEGORY
            </label>
            <div className="flex items-center space-x-2">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="Book Category"
              />
              <button
                type="button"
                onClick={addCategory}
                className="mb-3 bg-primary p-1 rounded-lg text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="space-x-2 my-4">
              {categories.map((cat) => (
                <span
                  className="bg-primary text-white px-2 py-1 rounded-full text-sm"
                  key={cat}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div className="w-full px-3 my-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password ${isDark ? "text-white" : ""}`}
            >
              BOOK COVER
            </label>
            <input type="file" name="" id="" onChange={photoHandler}/>
            { !!preview && <img src={preview} alt="" className="my-3" width={300} height={300}/> }
          </div>
          <div className="w-full px-3">
            <button className="w-full bg-primary text-white py-2 rounded-lg flex gap-1 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="hidden md:block">
                {isEdit ? "Update Book" : "Create Book"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
