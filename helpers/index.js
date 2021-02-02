export async function tryCatch(operation) {
  try {
    const response = await operation;
    if (!response) throw new Error("operation failed");
    return response;
  } catch (e) {
    console.log(e)
  }
}
