import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (email, password) => {
    try {
      setLoading(true);
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setError('');
      setLoading(false);
      return response.user;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return { error, loading, signUp };
};

export default useSignUp;
