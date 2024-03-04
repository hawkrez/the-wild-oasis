import { useMutation } from "@tanstack/react-query";
import { logOut } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogOut() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      toast.success("You successfully logged out");
      navigate("/login");
    },
    onError: (err) => {
      toast.error("There was an error during log out 😷");
      console.error(err.message);
    },
  });

  return { mutate, isPending };
}
