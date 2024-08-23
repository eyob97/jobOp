export interface AuthData {
  token: string | null;
  userId: string | null;
  user: any | null;
}

export function getAuthDataFromLocalStorage(): AuthData {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const user = localStorage.getItem("user");

    return {
      token,
      userId,
      user: user ? JSON.parse(user) : null,
    };
  } catch (error) {
    console.error("Error retrieving auth data from localStorage:", error);
    return {
      token: null,
      userId: null,
      user: null,
    };
  }
}
