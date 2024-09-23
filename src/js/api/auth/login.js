import { API_AUTH_LOGIN } from "../constants";
import { headers } from "../headers";

export async function login({ email, password }) {
  const body = {
    email,
    password,
  };

  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        ...headers(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json(); 
      const accessToken = data.data.accessToken;
      alert("Login successful!");
      localStorage.setItem("accessToken", accessToken); 
      window.location.href = '/';
    } else {
      const errorData = await response.json();
      alert(`Login failed: ${errorData.message || "Unknown error"}`);
    }
  } catch (error) {
    alert("An error occurred during login.");
    console.error(error);
  }
}



