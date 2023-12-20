import { useEffect, useState } from "react";
import useFireStore from "../hooks/useFireStore";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NoteForm = ({ type = "create", setEditNote, editNote }) => {
  let { id } = useParams();
  let [body, setBody] = useState("");

  let { addCollection, updateDocument } = useFireStore();

  useEffect(() => {
    if(type === "update"){
      // eslint-disable-next-line react/prop-types
      setBody(editNote.body)
    }

  },[type,editNote])

  let submit = async (e) => {
    e.preventDefault();
    if(type === "create"){
      let data = {
        body,
        bookUid: id,
      };
      await addCollection("notes", data);
      setBody("");
    }else{
      // eslint-disable-next-line react/prop-types
      editNote.body = body;
      // eslint-disable-next-line react/prop-types
      await updateDocument('notes',editNote.id,editNote,false)
      setEditNote(null);
    }
   
  };
  return (
    <>
      <form onSubmit={submit}>
        <textarea
          className="bg-gray-100 w-full p-3 shadow border outline-none"
          rows="4"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <div className="flex space-x-3">
          <button
            type="submit"
            className=" bg-primary text-white my-2 py-1 px-3 rounded-lg flex gap-1 items-center"
          >
            <span>{type === "create" ? "Add" : "Update"} Note</span>
          </button>
          {type === "update" && (
            <button
              type="button"
              onClick={() => setEditNote(null)}
              className=" border border-primary text-black my-2 py-1 px-3 rounded-lg flex gap-1 items-center"
            >
              <span>Cancel</span>
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default NoteForm;
