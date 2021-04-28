export const getProjectIdFromPath = (path) => {
  const pathSegments = path.split("/");

  let projectIdIndex = 0;

  pathSegments.forEach((segment, index) => {
    if (segment === "projects") {
      projectIdIndex = index + 1;
    }
  });

  return pathSegments[projectIdIndex];
}

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email.toLowerCase());
}

export const validatePhone = (phone) => {
  const phoneNumber = phone.replace(/\D/g,'');

  return (phoneNumber.length === 10);
}