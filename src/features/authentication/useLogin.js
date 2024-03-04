import { useMutation } from "@tanstack/react-query";
import { signInWithPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignInWithPassword() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) =>
      signInWithPassword({ email, password }),
    onSuccess: () => {
      toast.success("You successfully signed in");
      navigate("/");
    },
    onError: () => toast.error("Your email or password is wrong"),
  });
  return { mutate, isPending };
}
