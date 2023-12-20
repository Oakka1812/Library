import { useEffect, useState } from "react";

function useFetch(url, method = "GET") {
  let [data, setData] = useState(null);
  let [postData, setPostData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;
    let options = {
      signal,
      method,
    };
    setLoading(true); //Its show loading before fetching

    let fetchData = () => {
      fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
        setLoading(false); //its hide loading after fetching
      })
      .catch((e) => {
        setError(e.message);
      });
    }

    if (method === "POST" && postData) { //if method is POST and postData has data, run below code
      options = {
        ...options,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
      };
      fetchData();
    }

    if(method === "GET"){
      fetchData();
    }
   

    //clean function
    return () => {
      //to prevent memory leak if we was destroyed while data fetching
      abortController.abort();
    };
  }, [url, postData, method]);
  return { setPostData, data, loading, error }; //every time we use useFetch fun.. data,loading state will go on..
}

export default useFetch;
