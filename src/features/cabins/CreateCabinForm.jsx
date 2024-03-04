/* eslint react/prop-types:0 */

import { useForm } from "react-hook-form";
import styled from "styled-components";
import propTypes from "prop-types";

import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useCreateUpdateCabin } from "./useCreateUpdateCabin";
import toast from "react-hot-toast";
import Label from "../../ui/Label";

function CreateCabinForm({ EditedCabinInfo = {}, isInModal, closeModalFn }) {
  const {
    id: editedID,
    image: editedImageURL,
    ...editedCabinDefaults
  } = EditedCabinInfo;
  const isEditSession = Boolean(editedID);
  const { isCreatingUpdatingCabin, createUpdateCabin } = useCreateUpdateCabin();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: isEditSession && editedCabinDefaults });

  function handleFormSubmit(formData) {
    formData = isEditSession
      ? { ...formData, image: editedImageURL }
      : { ...formData, image: formData.image[0] };
    createUpdateCabin(
      { formData, editedID },
      {
        onSuccess: () => {
          toast.success(
            isEditSession
              ? `cabin successfully edited`
              : `cabin successfully added`
          );
          closeModalFn?.();
        },
      }
    );
  }

  function handleFormError() {}

  return (
    <Form
      onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
      type={isInModal ? "modal" : "regular"}
    >
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          defaultValue=""
          type="text"
          id="name"
          {...register("name", { required: "name input can't be empty" })}
        />
        {errors?.name && <Error>{errors?.name.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          defaultValue=""
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "max capacity input can't be empty",
            min: {
              value: 1,
              message: "max capacity can't be less than 1 people",
            },
            max: {
              value: 8,
              message: "max capacity can't be more than 8 people",
            },
          })}
        />
        {errors?.maxCapacity && <Error>{errors?.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          defaultValue=""
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "regular price input can't be empty",
            min: { value: 0, message: "regular price can't be less than 0" },
          })}
        />
        {errors?.regularPrice && <Error>{errors?.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            validate: (dis) =>
              dis < Number(getValues("regularPrice")) ||
              "Discount should be less than regular price",
          })}
        />
        {errors?.discount && <Error>{errors?.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          defaultValue=""
          type="number"
          id="description"
          {...register("description", {
            required: "Discription input can't be empty",
          })}
        />
        {errors?.description && <Error>{errors?.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: !isEditSession && "cabins should have an image",
          })}
        />
        {errors?.image && <Error>{errors?.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => closeModalFn?.()}
          variation="secondary"
          type="reset"
          disabled={isCreatingUpdatingCabin}
        >
          Cancel
        </Button>
        <Button disabled={isCreatingUpdatingCabin}>
          {isEditSession ? "EDIT CABIN" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1.5fr 2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-300);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

CreateCabinForm.propTypes = { EditedCabinInfo: propTypes.object };

export default CreateCabinForm;
