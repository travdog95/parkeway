export const initDefaults = async () => {
  //Get and set footer
  const footerResponse = await fetch(`/html/footer.html`);
  const footer = await footerResponse.text();
  document.querySelector("footer").innerHTML = footer;
  document.querySelector("[data-copyright-year]").innerHTML = new Date().getFullYear();

  //Get and set header
  const headerResponse = await fetch(`/html/header.html`);
  const header = await headerResponse.text();
  document.querySelector("header").innerHTML = header;
}