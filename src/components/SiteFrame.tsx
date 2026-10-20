import { ArrowDownRight, ArrowRight, Menu, MoveUpRight, X } from "lucide-react";
import { AppLink } from "../navigation";
import { candidateVehicles } from "../config/business";

const links = [
  { label: "Home", to: "/" },
  { label: "Our Fleet", to: "/fleet" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

export function VehicleImage({
  src,
  alt,
  className = "",
  preload = false,
}: {
  src?: string;
  alt?: string;
  className?: string;
  preload?: boolean;
}) {
  if (!src) return null;
  return (
    <div className={`image-frame ${className}`}>
      <img
        src={src}
        alt={alt ?? ""}
        loading={preload ? "eager" : "lazy"}
        onError={(event) => event.currentTarget.parentElement?.classList.add("image-fallback")}
      />
      <span className="image-fallback-copy" aria-hidden="true">Owner-approved vehicle photography to be added</span>
    </div>
  );
}

export function SiteHeader({
  path,
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  path: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <AppLink to="/" className="brand" aria-label="Swift Drive home">
          <span className="brand-symbol">S<span>.</span></span>
          <span className="brand-copy"><strong>SWIFT DRIVE</strong><small>EXECUTIVE MOBILITY</small></span>
        </AppLink>
        <nav id="mobile-menu" className={`main-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <AppLink
              key={link.to}
              to={link.to}
              className={`nav-link ${path === link.to ? "is-active" : ""}`}
              aria-current={path === link.to ? "page" : undefined}
              onNavigate={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </AppLink>
          ))}
          <AppLink to="/book" className="button button-red nav-book" onNavigate={() => setMobileMenuOpen(false)}>
            Book a Ride <MoveUpRight size={14} />
          </AppLink>
        </nav>
        <AppLink to="/book" className="button button-red header-book">Book a Ride <ArrowRight size={15} /></AppLink>
        <button
          className="menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}

export function VehicleTile({
  vehicleId,
  compact = false,
  onChooseVehicle,
}: {
  vehicleId: string;
  compact?: boolean;
  onChooseVehicle: (id: string) => void;
}) {
  const vehicle = candidateVehicles.find((item) => item.id === vehicleId);
  if (!vehicle) return null;
  return (
    <article className={`vehicle-tile ${compact ? "is-compact" : ""}`}>
      <VehicleImage src={vehicle.image} alt={vehicle.imageAlt} className="vehicle-photo" />
      <div className="vehicle-tile-meta"><span>{vehicle.category}</span><span>UNVERIFIED LISTING</span></div>
      <h3>{vehicle.name}</h3>
      <p>Model mentioned in the project brief; listing and availability require owner confirmation.</p>
      <div className="tile-actions">
        <AppLink to="/fleet" className="text-link">View vehicle <ArrowDownRight size={15} /></AppLink>
        <button type="button" className="icon-button" onClick={() => onChooseVehicle(vehicle.id)} aria-label={`Enquire about ${vehicle.name}`}>
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <AppLink to="/" className="brand footer-brand" aria-label="Swift Drive home">
          <span className="brand-symbol">S<span>.</span></span>
          <span className="brand-copy"><strong>SWIFT DRIVE</strong><small>EXECUTIVE MOBILITY</small></span>
        </AppLink>
        <p>A considered mobility concept.<br />Business information awaits verification.</p>
        <nav aria-label="Footer navigation">
          {links.slice(1).map((link) => <AppLink key={link.to} to={link.to}>{link.label}</AppLink>)}
          <AppLink to="/book">Book a Ride</AppLink>
        </nav>
        <AppLink to="/book" className="footer-enquire">Start an enquiry <ArrowRight size={15} /></AppLink>
      </div>
      <div className="footer-legal">
        <span>© {new Date().getFullYear()} Swift Drive concept</span>
        <span>Independent concept redesign — not the official website.</span>
        <span>Vehicle, service and contact details require owner confirmation.</span>
      </div>
    </footer>
  );
}
