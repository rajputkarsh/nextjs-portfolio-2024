export const pageView = (page: string) => {
  if (process.env.NODE_ENV === "development") return;
  window.dataLayer.push({
    event: page,
  });
};
