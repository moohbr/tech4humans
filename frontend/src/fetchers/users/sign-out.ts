const signOut = async () => {
  const response = await fetch("http://localhost:3000/api/users/sign-out", {
    method: "POST",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
};

export default signOut;