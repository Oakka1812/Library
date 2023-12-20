import { useParams } from "react-router-dom";
import useFireStore from "../hooks/useFireStore";
import moment from "moment/moment";
import trashIcon from "../assets/trash.svg";
import pencilIcon from "../assets/pencil.svg";
import { useState } from "react";
import NoteForm from "./NoteForm";

const NoteList = () => {
  let { id } = useParams();
  let { getCollection, deleteDocument } = useFireStore();
  let { data: notes } = getCollection("notes", ["bookUid", "==", id]);
  let [editNote, setEditNote] = useState(null);

  let deleteNote = async (id) => {
    await deleteDocument("notes", id);
  }
  return (
    !!notes.length &&
    notes.map((note) => (
      <div className="w-full border-2 shadow-lg p-3 my-3" key={note.id}>
        <div className="flex justify-between space-x-2 mb-3">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf5hOTNTGcqhOcKbSt8g3ppgK5rhBS7dyj8A&usqp=CAU"
              alt=""
              className="w-12 rounded-full "
            />
            <div>
              <h3>Oakka Soe</h3>
              <h4 className="text-gray-400 text-sm">
                {moment(note?.date?.seconds * 1000).fromNow()}
              </h4>
            </div>
          </div>
          <div className="cursor-pointer" >
            <img src={trashIcon} alt="" onClick={() => deleteNote(note.id)}/>
            <img src={pencilIcon} alt="" onClick={() => setEditNote(note)}/>
          </div>
        </div>
        <p className="font-semibold">{editNote?.id !== note.id && note.body}</p>
       {editNote?.id === note.id && <NoteForm type="update" setEditNote={setEditNote} editNote={editNote}/>}
      </div>
    ))
  );
};

export default NoteList;
