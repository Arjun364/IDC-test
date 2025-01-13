import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedCurrentUser = JSON.parse(sessionStorage.getItem("user"));
    setUsers(storedUsers);
    setCurrentUser(storedCurrentUser);
  }, []);

  const updateUserInStorage = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const updateCurrentUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
    updateUserInStorage(updatedUser);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        currentUser,
        setCurrentUser: updateCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
