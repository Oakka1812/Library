import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";

const useFireStore = () => {
  let getCollection = (colName, _q, search) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let qRef = useRef(_q).current; //preventing infinite rendering
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [data, setData] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [error, setError] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [loading, setLoading] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setLoading(true);
      let ref = collection(db, colName);
      let queries = [];
      if (qRef) {
        queries.push(where(...qRef));
      }
      queries.push(orderBy("date", "desc"));
      let q = query(ref, ...queries);
      onSnapshot(q, (docs) => {
        if (docs.empty) {
          setError("No books found");
          setLoading(false);
          setData([]);
        } else {
          let collectionDatas = [];
          docs.forEach((doc) => {
            let document = { id: doc.id, ...doc.data() };
            collectionDatas.push(document);
          });

          if (search) {
            let searchedDatas = collectionDatas.filter((doc) => {
              return doc[search].includes(search);
            });
            setData(searchedDatas);
          } else {
            setData(collectionDatas);
          }
          setLoading(false);
          setError("");
        }
      });
    }, [colName, qRef, search]);
    return { error, data, loading };
  };

  let getDocument = (colName, id) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [data, setData] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [error, setError] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let [loading, setLoading] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setLoading(true);
      let ref = doc(db, colName, id); //doc -> only one document
      onSnapshot(ref, (doc) => {
        if (doc.exists()) {
          let document = {
            id: doc.id,
            ...doc.data(),
          };
          setData(document);
          setLoading(false);
          setError("");
        } else {
          setError("No Book found");
          setLoading(false);
        }
      });
    }, [colName, id]);
    return { error, data, loading };
  };

  let addCollection = async (colName, data) => {
    data.date = serverTimestamp();
    let ref = collection(db, colName);
    return addDoc(ref, data);
  };

  let deleteDocument = async (colName, id) => {
    let ref = doc(db, colName, id);
    return deleteDoc(ref); //delete in firebase db
  };

  let updateDocument = async (colName, id, data, updateDate = "true") => {
    if (updateDate === true) {
      data.date = serverTimestamp();
    }
    let ref = doc(db, colName, id);
    return updateDoc(ref, data);
  };

  return {
    getCollection,
    getDocument,
    addCollection,
    deleteDocument,
    updateDocument,
  };
};

export default useFireStore;
