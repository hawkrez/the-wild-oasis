import supabase, { SUPABASE_URL } from "./supabase";

export async function signUpWithEmail({ fullName, email, password }) {
  console.log(fullName, email, password);
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });

  if (error) {
    throw new Error(error);
  }
  return data;
}

export async function signInWithPassword({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error);
  }
  return data;
}

export async function checkLogin() {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) return null;
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error);
  }
  return userData;
}

export async function logOut() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error);
  }
}

export async function updateUser({ password, fullName, avatar }) {
  let userData;
  if (password) userData = { password };
  if (fullName) userData = { data: { fullName } };

  const { error: error1, data: data1 } = await supabase.auth.updateUser(
    userData
  );

  if (error1) {
    console.error(error1.message);
    throw new Error(error1);
  }

  if (!avatar) return data1;
  let avatarName = String(avatar.name)
    .replaceAll("/", "")
    .concat("-")
    .concat(String(Math.random()).replaceAll(".", ""));

  console.log("gonna uploaded", "avatarName", avatarName);

  const { error: error2 } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (error2) {
    console.error(error2.message);
    throw new Error(error2);
  }

  console.log("uploaded");
  const avatarPath = `${SUPABASE_URL}/storage/v1/object/public/avatars/${avatarName}`;
  userData = { data: { avatar: avatarPath } };
  const { error: error3, data: data3 } = await supabase.auth.updateUser(
    userData
  );

  if (error3) {
    console.error(error3.message);
    throw new Error(error3);
  }

  return data3;
}
