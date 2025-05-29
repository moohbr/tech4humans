import type { SignInFormValues } from "@/components/auth/sign-in-form";

const signIn = async ({ email, password }: SignInFormValues) => {
const response = await fetch("http://localhost:3000/api/users/sign-in", {
  method: "POST",
  body: JSON.stringify({ email, password }),
});

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const user = await response.json();

  return user;
};

export default signIn;