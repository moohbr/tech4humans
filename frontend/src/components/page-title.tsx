import { useEffect } from "react";

interface PageTitleProps {
  title: string;
  suffix?: string;
  hideAppName?: boolean;
}

export default function PageTitle({
  title,
  suffix = "Tech4Humans",
  hideAppName = false,
}: PageTitleProps) {
  useEffect(() => {
    const formattedTitle = hideAppName
      ? title
      : suffix
        ? `${title} · ${suffix}`
        : title;
    document.title = formattedTitle;
  }, [title, suffix, hideAppName]);

  return null;
}
