import me from "@/fetchers/users/me";
import { useQuery } from "@tanstack/react-query";

function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => me(),
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default useGetMe;
