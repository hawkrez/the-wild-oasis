import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import { useUpdateBooking } from "../bookings/useUpdateBooking";

function CheckinBooking() {
  const { data: booking = {}, isPending: isLoding } = useBooking(
    useParams("bookmarkid").bookmarkid
  );
  const {
    id: bookingId,
    guests: { fullName: guestName } = {},
    isPaid,
    totalPrice,
    extrasPrice,
    cabinPrice,
    enterPrice,
    // numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const { data: { breakfastPrice: perBreakFast } = {} } = useSettings();
  const breakFastPrice = numNights * perBreakFast;
  const [paid, setPaid] = useState();
  const [Breakfast, setBreakfast] = useState();
  useEffect(
    function () {
      setPaid(isPaid);
      setBreakfast(hasBreakfast);
    },
    [isPaid, hasBreakfast]
  );

  const { mutate: updateBooking, isPending: isUpdating } = useUpdateBooking();

  const moveBack = useMoveBack();

  function handleCheckin() {
    const updateObj = {
      isPaid: true,
      totalPrice: Breakfast
        ? totalPrice - extrasPrice + breakFastPrice
        : totalPrice - extrasPrice,
      extrasPrice: Breakfast ? breakFastPrice : 0,
      hasBreakfast: Breakfast,
      status: "checked-in",
    };
    updateBooking({ bookingId, updateObj });
  }

  if (isUpdating || isLoding) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={Breakfast}
          onChange={() => {
            setBreakfast((Breakfast) => !Breakfast);
            setPaid(false);
          }}
          id={bookingId}
        >
          {guestName} want to have breakfast({formatCurrency(breakFastPrice)})
        </Checkbox>
        <Checkbox
          checked={paid}
          onChange={() => setPaid((paid) => !paid)}
          id={bookingId}
        >
          I confirm that {guestName} has paid all the booking prices(
          {Breakfast
            ? `${formatCurrency(
                totalPrice - extrasPrice + breakFastPrice
              )} : ${formatCurrency(cabinPrice)} + ${formatCurrency(
                breakFastPrice
              )}${enterPrice ? ` + ${formatCurrency(enterPrice)}` : ""} `
            : formatCurrency(totalPrice - extrasPrice)}
          )
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!paid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
