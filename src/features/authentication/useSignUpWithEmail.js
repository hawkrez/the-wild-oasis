import { useMutation } from "@tanstack/react-query";
import { signUpWithEmail } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUpWithEmail() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpWithEmail({ fullName, email, password }),
    onSuccess: () =>
      toast.success(
        "You successfully signed up, now go to your email to activate your account"
      ),
  });

  return { mutate, isPending };
}
