import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import Lang from "../lang/lang";
import { useAuth } from "../utils/userAuth";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  photo_id: number;
  address: string;
  hotel_name: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  country: any;
  role_id: any;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user, logout, loading } = useAuth();
  const [currentUser, setUser] = useState<User | null>(user);

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user: currentUser, setUser, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Hook to Use Context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(Lang.context_error);
  }
  return context;
}
