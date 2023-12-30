import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const logout = () => {
    // Perform any additional logout actions, e.g., send a request to your server to invalidate the session
    // For example, if you have an endpoint to log the user out on your server:
    // axios.post('/logout').then(() => {
    //   setUser(null);
    // });

    // Set the user to null in the context to log them out
    axios.get('/logout').then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
