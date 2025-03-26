const uploadAndGetUrl = async (
  apiKey: string,
  base64String: Base64URLString
) => {
  const requestBody = JSON.stringify({
    key: apiKey,
    base64_string: base64String,
  });

  try {
    const response = await fetch(
      "https://modelslab.com/api/playground_base64_to_url",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

export default uploadAndGetUrl;
