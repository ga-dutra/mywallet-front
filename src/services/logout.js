import { deleteSession } from "./requests";

export default async function logout(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const result = await deleteSession(config);
    return result;
  } catch (error) {
    console.error(error);
  }
}
