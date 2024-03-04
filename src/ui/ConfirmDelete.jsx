/*eslint react/prop-types:0  */

import Confirm from "./Confirm";

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <Confirm
      title={`Delete ${resourceName}`}
      message={` Are you sure you want to delete this ${resourceName} permanently? This
          action cannot be undone.`}
      confirmBtnTitle="Delete"
      onConfirm={onConfirm}
      disabled={disabled}
      onCloseModal={onCloseModal}
    />
  );
}

export default ConfirmDelete;
