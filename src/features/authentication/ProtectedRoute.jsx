/*eslint react/prop-types:0 */
import { useNavigate } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import { useUser } from "./useUser";

export default function ProtectedRoute({ children }) {
  const { data, isPending } = useUser();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;
  if (!data) {
    navigate("/login");
  }

  return children;
}
