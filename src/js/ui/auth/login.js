
import { login } from "../../api/auth/login";


export async function onLogin(event) {
  event.preventDefault();

  const { email, password } = Object.fromEntries(new FormData(event.target));

  try {
    const result = await login({ email: email.trim(), password });
    console.log("Login successful!", result);
    window.location.href = '/'; 
  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
}



