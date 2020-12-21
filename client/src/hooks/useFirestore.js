import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // connection is always open and listening for changes in the database. It is REAL TIME.
    const unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    // clean up. When component unmounts, it closes the connection to the collection
    return () => unsub();
  }, [collection]);

  return { docs };
};

export default useFirestore;
