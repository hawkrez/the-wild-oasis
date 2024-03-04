import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "./BookingDataBox";
import EmptyPage from "../../ui/EmptyPage";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "../bookings/useDeleteBooking";
import { useNavigate } from "react-router-dom";
import { useUpdateBooking } from "./useUpdateBooking";
import { HiArrowUpOnSquareStack } from "react-icons/hi2";

function BookingDetail() {
  const { data: booking = {}, isPending: isLoading } = useBooking();
  const { status, id: bookingId } = booking;

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { mutate: deleteBooking, isPending: isDeleting } = useDeleteBooking();
  const { mutate: updateBooking, isPending: isUpdating } = useUpdateBooking();
  const isBusy = isDeleting || isUpdating || isLoading;

  if (isLoading) return <Spinner />;
  if (!booking.id) return <EmptyPage name="book mark" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquareStack />}
            onClick={() =>
              updateBooking({
                bookingId,
                updateObj: { status: "checked-out" },
              })
            }
            disabled={isBusy}
          >
            Check out
          </Button>
        )}
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`bookmark ${bookingId}`}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSuccess: () => navigate("/bookings"),
                })
              }
              disabled={isBusy}
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
