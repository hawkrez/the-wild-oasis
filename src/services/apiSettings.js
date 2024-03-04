import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*");

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data[0];
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  console.log("newSetting: ", newSetting);

  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .select();

  console.log("data", data);
  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
