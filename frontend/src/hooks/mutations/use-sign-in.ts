import signIn from "@/fetchers/users/sign-in";
import { useMutation } from "@tanstack/react-query";

function useSignIn() {
  return useMutation({
    mutationFn: signIn,
  });
}

export default useSignIn;
