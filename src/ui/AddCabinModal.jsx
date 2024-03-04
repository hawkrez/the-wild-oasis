import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "./Button";
import Modal from "./Modal";

function AddCabinModal() {
  return (
    <Modal>
      <Modal.Open opens="create-cabin">
        <Button style={{ width: "100%", height: "4rem" }}>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="create-cabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabinModal;
