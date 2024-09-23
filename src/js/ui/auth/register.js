import { register } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!name || !email || !password) {
    console.error("All required fields must be filled out");
    return; 
  }

  try {
    const result = await register({ name, email, password });
    console.log("Registration successful!", result);

  } catch (error) {
    console.error("Registration failed:", error);

  }
}

