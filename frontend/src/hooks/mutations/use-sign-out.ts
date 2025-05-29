import signOut from "@/fetchers/users/sign-out";
import { useMutation } from "@tanstack/react-query";

function useSignOut() {
  return useMutation({
    mutationFn: signOut,
  });
}

export default useSignOut;
