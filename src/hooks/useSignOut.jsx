
import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const useSignOut = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      let response = await signOut(
        auth
      );
      setError('');
      setLoading(false);
      return response.user;
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  return { error, loading, logout };
};

export default useSignOut;
