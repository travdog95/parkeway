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