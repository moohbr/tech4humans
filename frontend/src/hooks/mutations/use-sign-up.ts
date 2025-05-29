import signUp from "@/fetchers/users/sign-up";
import { useMutation } from "@tanstack/react-query";

function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}

export default useSignUp;
