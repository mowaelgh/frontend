import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    preLoad();
  }, []);

  const preLoad = () => {
    setTimeout(() => {
      setIsLoaded(true);
      // Assume user is not authenticated initially
      setIsAuthed(false);
      setUser(null);
    }, 1000);
  };

  const signIn = (userData) => {
    setIsAuthed(true);
    setUser(userData);
  };

  const signOut = () => {
    setIsAuthed(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoaded, isAuthed, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth };
