const downloadFile = (url: string, filename: string, format: string) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}-modelsLab.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(console.error);
};
export default downloadFile;
