const me = async () => {
  // const response = await fetch("http://localhost:3000/api/users/me", {
  //   credentials: "include",
  // });

  // if (!response.ok) {
  //   const error = await response.text();
  //   throw new Error(error);
  // }

  // const data = await response.json();

  // return data;
  return {
    user: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
  };
};

export default me;