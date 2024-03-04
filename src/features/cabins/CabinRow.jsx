import styled from "styled-components";
import propTypes from "prop-types";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { BiDuplicate } from "react-icons/bi";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateUpdateCabin } from "./useCreateUpdateCabin";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

function CabinRow({ cabinInfo }) {
  const { id, name, discount, image, regularPrice, maxCapacity, description } =
    cabinInfo;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createUpdateCabin } = useCreateUpdateCabin();

  function handleDuplicate() {
    const formData = {
      name: `${name} (cloned)`,
      discount,
      image,
      regularPrice,
      maxCapacity,
      description,
    };
    createUpdateCabin({ formData, undefined });
  }

  return (
    <Table.Row>
      <Cabin>{name}</Cabin>
      <Img src={image} />
      <Capacity>up to {maxCapacity} people</Capacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>
        {discount ? formatCurrency(discount) : <Table.Empty>-</Table.Empty>}
      </Discount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />

          <Menus.List id={id}>
            <Menus.Button icon={<BiDuplicate />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>

            <Modal.Open opens="edit">
              <Menus.Button icon={<FaRegEdit />}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<FaRegTrashCan />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit">
            <CreateCabinForm EditedCabinInfo={cabinInfo} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`cabin ${id}`}
              disabled={isDeleting}
              onConfirm={() => deleteCabin(id)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Capacity = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

CabinRow.propTypes = {
  cabinInfo: propTypes.object,
};

export default CabinRow;
