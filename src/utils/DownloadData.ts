const { token }: any = JSON.parse(localStorage.getItem("careUserData") || "{}");

export const handleDownloadData = (url: string, type: string, fileName: string) => {
  fetch(`https://gateway.dev.carelibrary.developersorcalo.com/${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(async (response: any) => {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName ?? "data"}.${type ?? "xls"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error: any) => console.log(error));
};
