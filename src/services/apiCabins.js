import supabase, { SUPABASE_URL } from "./supabase";
/////
async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error(`error during fetching cabins from server 😷`);
  }
  return cabins;
}
/////
async function deleteCabin(cabinID) {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinID);

  if (error) {
    console.error(error);
    throw new Error(`cabin can not be deleted 😷`);
  }
}
/////
async function createUpdateCabin(formData, editedID = "") {
  const cabinBucketPublicPath = "/storage/v1/object/public/cabin-images/";
  const imageName = `${String(Math.random()).replace(".", "")}-${String(
    formData.image?.name
  )?.replaceAll("/", "")}`;
  const imagePath = formData.image.name
    ? `${SUPABASE_URL}${cabinBucketPublicPath}${imageName}`
    : formData.image;

  // selecting cabin row
  let query = supabase.from("cabins");

  // inserting new row
  if (!editedID) {
    query = query.insert([{ ...formData, image: imagePath }]);
  }

  // updating existing row
  if (editedID) {
    query = query.update(formData).eq("id", editedID);
  }

  //implementing & fetching resaults of our operation
  const { data, error } = await query.select();
  if (error) {
    console.error(error);
    throw new Error(`cabin can not be added 😷(${error.message})`);
  }

  // uploading image to cabin bucket
  if (!editedID) {
    const { error: imageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, formData.image);
    if (imageError) {
      console.log(imageError);
      deleteCabin(data.id);
      throw new Error(
        `cabin can not be added because there was a peroblem during uploading cabin's image 😷(${imageError.message})`
      );
    }
  }
  return data;
}

export { getCabins, deleteCabin, createUpdateCabin };
