import { BreadcrumbLink, BreadcrumbPage } from "../ui/breadcrumb";

const BreadcrumbLinkItem = ({
  href,
  title,
  onClick,
}: {
  href?: string;
  title: string;
  onClick: (e: React.MouseEvent) => void;
}) => {
  return href ? (
    <BreadcrumbLink href={href} onClick={onClick}>
      {title}
    </BreadcrumbLink>
  ) : (
    <BreadcrumbPage>{title}</BreadcrumbPage>
  );
};

export default BreadcrumbLinkItem;
