export const getBreadcrumbItems = (pathname: string) =>
  pathname
    .split("/")
    .filter(Boolean)
    .map((path, index, paths) => ({
      title: /^\d+$/.test(path)
        ? "Detalles"
        : path.charAt(0).toUpperCase() + path.slice(1),
      href: /^\d+$/.test(path)
        ? undefined
        : `/${paths.slice(0, index + 1).join("/")}`,
    }));
