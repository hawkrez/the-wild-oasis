import supabase from "./supabase";

async function getGuests() {
  let { data: guests, error } = await supabase.from("guests").select("*");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return guests;
}
export { getGuests };
