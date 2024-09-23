// export async function onLogin(event) {}
import { login } from "../../api/auth/login";

export async function onLogin(event) {
  event.preventDefault(); 

  const form = event.target;
  const email = form.email.value.trim();
  const password = form.password.value;

  try {
    const result = await login({ email, password });
    console.log("Login successful!", result);
  } catch (error) {
    console.error("Login failed:", error);
  }
}
