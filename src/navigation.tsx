import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

export function navigateTo(path: string) {
  if (window.location.pathname !== path) window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function handleRouteLink(event: MouseEvent<HTMLAnchorElement>, path: string) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  navigateTo(path);
}

export function AppLink({
  to,
  className,
  children,
  onNavigate,
  ...props
}: {
  to: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">) {
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        handleRouteLink(event, to);
        if (event.defaultPrevented) onNavigate?.();
      }}
      {...props}
    >
      {children}
    </a>
  );
}
