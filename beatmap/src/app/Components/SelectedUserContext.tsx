import React, { createContext, useContext, ReactNode, useState } from "react";

// Define a type for the context
interface UserContextProps {
  selectedUser: MongoDBUserData | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<MongoDBUserData | null>>;
}

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Define a type for the provider props
interface UserProviderProps {
  children: ReactNode;
}

// Create the provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<MongoDBUserData | null>(
    null
  );

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to consume the context
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
