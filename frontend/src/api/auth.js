import client from "./client";

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/sign-up", userInfo);
    return data;
  } catch (error) {
    const { res } = error;
    if (res?.data) return res.data;

    return error.message || error;
  }
};
