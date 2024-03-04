import { HiOutlineLogout } from "react-icons/hi";

import { useLogOut } from "./useLogOut";
import Modal from "../../ui/Modal";
import Confirm from "../../ui/Confirm";
import ButtonIcon from "../../ui/ButtonIcon";

function LogOutBtn() {
  const { mutate: logOut, isPending } = useLogOut();

  function handleLogOut() {
    logOut();
  }

  return (
    <Modal>
      <Modal.Open opens="exit">
        <ButtonIcon>
          <HiOutlineLogout />
        </ButtonIcon>
      </Modal.Open>
      <Modal.Window name="exit">
        <Confirm
          message="Are you sure you want to sign out"
          title="Sign out"
          onConfirm={handleLogOut}
          disabled={isPending}
        />
      </Modal.Window>
    </Modal>
  );
}

export default LogOutBtn;
