import styled from "styled-components";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

function UpdateSettingsForm() {
  const {
    isLoadingSettings,
    data: {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
    } = {
      breakfastPrice: 0,
      maxBookingLength: 0,
      maxGuestsPerBooking: 0,
      minBookingLength: 0,
    },
  } = useSettings();

  const [minBookingLengthState, setMinBookingLength] = useState();
  const [maxBookingLengthState, setMaxBookingLength] = useState();
  const [maxGuestsPerBookingState, setMaxGuestsPerBooking] = useState();
  const [breakfastPriceState, setBreakfastPrice] = useState();
  const { isUpdatingSetting, updateSetting } = useUpdateSetting();

  const resetFields = useCallback(
    function resetFields() {
      setMinBookingLength(minBookingLength);
      setMaxBookingLength(maxBookingLength);
      setMaxGuestsPerBooking(maxGuestsPerBooking);
      setBreakfastPrice(breakfastPrice);
    },
    [breakfastPrice, maxBookingLength, maxGuestsPerBooking, minBookingLength]
  );

  useEffect(
    function () {
      resetFields();
    },
    [resetFields]
  );

  function handleBlur(e) {
    if (e.target.value < 1) {
      resetFields();
      toast.error(`input value can't be less than 1`);
      return;
    }
    updateSetting({ [e.target.id]: Number(e.target.value) });
  }

  return (
    <Container>
      {isLoadingSettings ? (
        <Spinner />
      ) : (
        <Form style={{ flexBasis: "100%" }}>
          <FormRow label="minBookingLength">
            <Label htmlFor="minBookingLength">min nights</Label>
            <Input
              onBlur={handleBlur}
              type="number"
              id="minBookingLength"
              style={{ width: "30rem" }}
              disabled={isUpdatingSetting}
              value={minBookingLengthState}
              onChange={(e) => setMinBookingLength(e.target.value)}
            />
          </FormRow>
          <FormRow label="Maximum nights/booking">
            <Label htmlFor="maxBookingLength">max nights</Label>
            <Input
              onBlur={handleBlur}
              type="number"
              id="maxBookingLength"
              style={{ width: "30rem" }}
              disabled={isUpdatingSetting}
              value={maxBookingLengthState}
              onChange={(e) => setMaxBookingLength(e.target.value)}
            />
          </FormRow>
          <FormRow label="Maximum guests/booking">
            <Label htmlFor="maxGuestsPerBooking">max guests</Label>
            <Input
              onBlur={handleBlur}
              type="number"
              id="maxGuestsPerBooking"
              style={{ width: "30rem" }}
              disabled={isUpdatingSetting}
              value={maxGuestsPerBookingState}
              onChange={(e) => setMaxGuestsPerBooking(e.target.value)}
            />
          </FormRow>
          <FormRow label="Breakfast price">
            <Label htmlFor="breakfastPrice">breakfast price</Label>
            <Input
              onBlur={handleBlur}
              type="number"
              id="breakfastPrice"
              style={{ width: "30rem" }}
              disabled={isUpdatingSetting}
              value={breakfastPriceState}
              onChange={(e) => setBreakfastPrice(e.target.value)}
            />
          </FormRow>
        </Form>
      )}
    </Container>
  );
}

const FormRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0 1.5rem 0;
  border-bottom: 1px solid var(--color-grey-300);
  &:last-child {
    border: none;
  }
`;

const Container = styled.div`
  width: 70rem;
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default UpdateSettingsForm;
