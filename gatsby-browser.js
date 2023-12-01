import "./src/styles/global.css";
export const registerServiceWorker = () => {
  return true;
};

export const onInitialClientRender = () => {
  window.addEventListener('popstate', () =>
    window.location.reload()
  );
};