import type { SignUpFormValues } from "@/components/auth/sign-up-form";

const signUp = async ({ email, password, name }: SignUpFormValues) => {
  const response = await fetch("http://localhost:3000/api/users/sign-up", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const user = await response.json();

  return user;
};

export default signUp;