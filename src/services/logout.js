import { deleteSession } from "./requests";

export default async function logout(config) {
  try {
    const result = await deleteSession(config);
    return result;
  } catch (error) {
    console.error(error);
  }
}
