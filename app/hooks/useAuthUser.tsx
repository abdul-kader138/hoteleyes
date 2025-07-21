import { fetchAuthUser } from "../utils/userAuth";

export const authLoader = async () => {
  try {
    const user = await fetchAuthUser();
    if (!user) {
      window.location.href = "/login";
    }
  } catch (error) {
    window.location.href = "/login";
  }
};
