export const ValidImgUrl = (url) => {
  return typeof url === "string" && url.trim() !== ""
    ? url.trim()
    : "https://i.ibb.co.com/ycV68FLM/sylhethotel.png";
};
