/**
 * Converts a file to a Base64 URL string.
 * @param {File} file - The file to convert.
 * @returns {Promise<string>} - A promise resolving to the Base64 URL.
 */
export default function convertToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Success callback
    reader.onload = () => resolve(reader.result);

    // Error callback
    reader.onerror = (error) => reject(error);

    // Read the file as a data URL (Base64 encoded)
    reader.readAsDataURL(file);
  });
}
