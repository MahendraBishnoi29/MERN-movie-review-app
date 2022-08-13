import client from "./client";

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/sign-up", userInfo);
    return data;
  } catch (error) {
    const { res } = error;
    console.log(error.message);
    if (res?.data) return res.data;

    return error.message || error;
  }
};

// Verify User
export const verifyUserEmail = async (userInfo) => {
  try {
    const { data } = await client.post("/user/verify-email", userInfo);
    return data;
  } catch (error) {
    console.log(error.message);
    const { res } = error;
    if (res?.data) return res.data;

    return error.message || error;
  }
};
