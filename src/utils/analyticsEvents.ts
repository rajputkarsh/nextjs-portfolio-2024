export const pageView = (page: string) => {
  window.dataLayer.push({
    event: page,
  });
};
