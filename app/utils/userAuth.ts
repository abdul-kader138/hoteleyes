import { useEffect, useState } from "react";
import { Helper } from "./helper";

interface User {
  id: number;
  photo_id: number;
  email: string;
  first_name: string;
  last_name: string;
  about_me: string;
}
const { BASE_API } = new Helper();

// ✅ Function to fetch user data (without hooks)
export async function fetchAuthUser() {
  try {
    const response = await fetch(`${BASE_API}/auth/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }
    const userData = await response.json();
    return userData?.user || null;
  } catch (error) {
    return null;
  }
}

// ✅ React Hook for use inside components
export function useAuth(): {
  user: User | null;
  logout: () => void;
  loading: boolean;
} {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const helper = new Helper();
  useEffect(() => {
    async function fetchUserData() {
      const userData = await fetchAuthUser();
      setUser(userData);
      setLoading(false);
    }
    fetchUserData();
  }, []);

  async function logout() {
    try {
      await helper.api.post(`${BASE_API}/auth/logout`);
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return { user, logout, loading };
}
