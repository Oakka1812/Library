
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const useSignIn = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      let response = await signInWithEmailAndPassword(
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

  return { error, loading, signIn };
};

export default useSignIn;
