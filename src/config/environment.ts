export const environments = {
  apiUrl: import.meta.env.VITE_API_URL || `${window.location.origin}/api`,
  dev: import.meta.env.VITE_DEV === "true",
};

export const getConfig = () => {
  return environments;
};
