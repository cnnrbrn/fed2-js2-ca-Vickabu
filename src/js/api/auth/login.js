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
      
      // Lagre accessToken og annen brukerinfo
      const accessToken = data.data.accessToken;
      const userInfo = {
        name: data.data.name,
        email: data.data.email,
        bio: data.data.bio,
        avatar: data.data.avatar,
        banner: data.data.banner
      };

      alert("Login successful!");
      localStorage.setItem("accessToken", accessToken); 
      localStorage.setItem("userInfo", JSON.stringify(userInfo)); 
      // Naviger til forsiden eller ønsket side
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


// const userInfo = JSON.parse(localStorage.getItem("userInfo"));

// if (userInfo) {
//   console.log("User Name:", userInfo.name);
//   console.log("User Email:", userInfo.email);
//   console.log("User Bio:", userInfo.bio);
//   console.log("User Avatar URL:", userInfo.avatar.url);
//   console.log("User Banner URL:", userInfo.banner.url);
// }