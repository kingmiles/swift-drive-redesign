import { useState, type FormEvent } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, Check, ChevronDown, CircleHelp, MoveUpRight, ShieldCheck } from "lucide-react";
import { AppLink } from "./navigation";
import { businessConfig, candidateVehicles, conceptImages, type VehicleCategory } from "./config/business";
import { VehicleImage } from "./components/SiteFrame";

export type EnquiryForm = {
  vehicleId: string;
  enquiryType: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const homeVehicleReferences = [
  { name: "Toyota Land Cruiser Prado", category: "SUV", image: conceptImages.hero, alt: "Black Toyota Land Cruiser Prado Black Onyx reference photograph; not a verified Swift Drive vehicle", vehicleId: "toyota-prado" },
  { name: "Toyota Hilux (Black)", category: "Pickup", image: conceptImages.blackHilux, alt: "Black 2024 Toyota Hilux pickup reference photograph; not a verified Swift Drive vehicle", vehicleId: "toyota-hilux" },
  { name: "Toyota Hilux (White)", category: "Pickup", image: conceptImages.whiteHilux, alt: "White 2024 Toyota Hilux pickup reference photograph; not a verified Swift Drive vehicle", vehicleId: "toyota-hilux" },
  { name: "Mercedes-Benz Sprinter", category: "Bus", image: conceptImages.sprinter, alt: "Mercedes-Benz Sprinter passenger van reference photograph; not a verified Swift Drive vehicle" },
  { name: "Luxury coach", category: "Luxury Bus", image: conceptImages.coach, alt: "Luxury passenger coach reference photograph; not a verified Swift Drive vehicle" },
];

export function HomePage({ onChooseVehicle }: { onChooseVehicle: (id: string) => void }) {
  const [referenceFilter, setReferenceFilter] = useState("All");
  const filters = ["All", "SUV", "Pickup", "Bus", "Luxury Bus"];
  const visibleReferences = homeVehicleReferences.filter(
    (vehicle) => referenceFilter === "All" || vehicle.category === referenceFilter,
  );

  return (
    <>
      <section className="campaign-hero">
        <VehicleImage
          src={conceptImages.hero}
          alt="Black Toyota Land Cruiser Prado reference photograph; not a verified Swift Drive vehicle"
          className="campaign-photo"
          preload
        />
        <div className="campaign-shade" />
        <div className="hero-copy">
          <span className="hero-kicker"><i /> EXECUTIVE MOBILITY · INDEPENDENT CONCEPT</span>
          <h1>Luxury Transport<br />for Every Destination</h1>
          <p>Explore illustrative vehicle references. Fleet details and availability need owner confirmation.</p>
          <div className="hero-actions">
            <AppLink to="/book" className="button button-glass">Book Your Ride <ArrowRight size={15} /></AppLink>
          </div>
        </div>
        <a className="hero-scroll" href="#home-fleet"><span>DISCOVER THE VEHICLES</span><ArrowDownRight size={16} /></a>
      </section>

      <section className="home-fleet" id="home-fleet">
        <div className="section-shell">
          <div className="fleet-heading">
            <div className="fleet-heading-title">
              <span className="section-kicker">OUR FLEET</span>
              <h2>Premium Vehicles for<br />Every Journey</h2>
            </div>
            <AppLink to="/fleet" className="text-link fleet-all-link">View all vehicles <ArrowRight size={15} /></AppLink>
            <div className="home-fleet-filters" role="group" aria-label="Filter vehicle references">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`fleet-filter${referenceFilter === filter ? " is-active" : ""}`}
                  aria-pressed={referenceFilter === filter}
                  onClick={() => setReferenceFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="reference-vehicles">
            {visibleReferences.map((vehicle) => (
              <figure className="reference-vehicle" key={vehicle.name}>
                <div className="image-frame reference-vehicle-image">
                  <img src={vehicle.image} alt={vehicle.alt} loading="lazy" />
                </div>
                <figcaption>
                  <strong>{vehicle.name}</strong>
                  {"vehicleId" in vehicle && vehicle.vehicleId && (
                    <button type="button" className="reference-enquire" aria-label={`Enquire about ${vehicle.name}`} onClick={() => onChooseVehicle(vehicle.vehicleId)}>
                      <ArrowRight size={15} />
                    </button>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="fleet-section-footer">
            <p className="reference-note">Illustrative photographs only. Pictured models do not confirm fleet inventory, specifications or availability.</p>
            <AppLink to="/fleet" className="text-link">Explore vehicle references <ArrowRight size={15} /></AppLink>
          </div>
        </div>
      </section>

      <section className="service-preview">
        <VehicleImage
          src={conceptImages.hero}
          alt="Monochrome illustrative photograph of a Toyota Land Cruiser Prado"
          className="service-preview-photo"
        />
        <div className="service-preview-inner section-shell">
          <div className="service-preview-copy">
            <span className="section-kicker light-kicker">OUR SERVICES</span>
            <h2>More Than Just a Ride</h2>
            <p>Service details are awaiting owner confirmation. Share your requirements and ask the business what it can arrange.</p>
            <AppLink to="/services" className="button button-glass">Explore Services <ArrowRight size={15} /></AppLink>
          </div>
          <div className="service-preview-action">
            <span>START WITH YOUR JOURNEY</span>
            <p>Availability and arrangements require direct confirmation.</p>
            <AppLink to="/book" className="service-book-link">Prepare an enquiry <MoveUpRight size={15} /></AppLink>
          </div>
        </div>
        <span className="service-photo-label">ILLUSTRATIVE PHOTOGRAPHY · NOT CONFIRMED INVENTORY</span>
      </section>
    </>
  );
}

export function FleetPage({
  category,
  setCategory,
  onChooseVehicle,
}: {
  category: "All" | VehicleCategory;
  setCategory: (category: "All" | VehicleCategory) => void;
  onChooseVehicle: (id: string) => void;
}) {
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);
  const filteredVehicles = candidateVehicles.filter((vehicle) => category === "All" || vehicle.category === category);

  return (
    <section className="inner-page fleet-page">
      <div className="page-masthead fleet-masthead">
        <div className="section-shell masthead-content">
          <span className="section-kicker">THE COLLECTION <i /></span>
          <h1>Find your<br /><em>kind of drive.</em></h1>
          <p>Models mentioned in the project brief. This concept does not represent confirmed inventory or availability.</p>
          <div className="masthead-bottom"><span>01 — 04 / MODELS REFERENCED</span><span>ILLUSTRATIVE PHOTOGRAPHY</span></div>
        </div>
        <VehicleImage
          src={candidateVehicles[0]?.image}
          alt="Illustrative SUV photography; the specific model is not verified"
          className="masthead-image"
        />
      </div>
      <div className="section-shell fleet-browser">
        <div className="fleet-filter-bar">
          <div><span className="section-kicker">BROWSE THE LINEUP <i /></span><span className="filter-caption">Category</span></div>
          <label className="filter-select" htmlFor="vehicle-category">
            <select id="vehicle-category" value={category} onChange={(event) => setCategory(event.target.value as "All" | VehicleCategory)}>
              <option value="All">All categories</option><option value="SUV">SUV</option><option value="Pickup">Pickup</option>
            </select><ChevronDown size={16} aria-hidden="true" />
          </label>
          <span className="fleet-count">{filteredVehicles.length.toString().padStart(2, "0")} VEHICLES</span>
        </div>
        {filteredVehicles.length ? (
          <div className="fleet-list">
            {filteredVehicles.map((vehicle, index) => (
              <article className="fleet-row" key={vehicle.id}>
                <div className="fleet-row-number">0{index + 1}</div>
                <VehicleImage src={vehicle.image} alt={vehicle.imageAlt} className="fleet-row-image" />
                <div className="fleet-row-main"><span>{vehicle.category} <i /> UNVERIFIED MODEL</span><h2>{vehicle.name}</h2><p>Illustrative image · specifications and availability not confirmed.</p></div>
                <div className="fleet-row-actions">
                  <button className="text-link" type="button" aria-expanded={expandedVehicle === vehicle.id} onClick={() => setExpandedVehicle((current) => current === vehicle.id ? null : vehicle.id)}>
                    {expandedVehicle === vehicle.id ? "Close details" : "View vehicle"} <ArrowDownRight size={16} />
                  </button>
                  <button className="fleet-enquire" type="button" onClick={() => onChooseVehicle(vehicle.id)}>Enquire <ArrowRight size={15} /></button>
                </div>
                {expandedVehicle === vehicle.id && (
                  <div className="fleet-detail">This model was mentioned in the project brief. Vehicle identity, exact imagery, specifications, condition and availability need business-owner confirmation.</div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state"><CircleHelp size={24} /><h2>No models in this category</h2><p>Try another category to explore the available references.</p><button className="button button-dark" type="button" onClick={() => setCategory("All")}>Reset filters</button></div>
        )}
        <p className="fleet-caveat">Every model and image is an unverified reference, not a claim of vehicle ownership or confirmed availability.</p>
      </div>
    </section>
  );
}

export function BookingPage({
  form,
  updateForm,
  submitEnquiry,
  formMessage,
  formError,
}: {
  form: EnquiryForm;
  updateForm: <K extends keyof EnquiryForm>(key: K, value: EnquiryForm[K]) => void;
  submitEnquiry: (event: FormEvent<HTMLFormElement>) => void;
  formMessage: string;
  formError: boolean;
}) {
  const pickupMinimum = new Date().toLocaleDateString("en-CA");
  return (
    <section className="inner-page booking-page">
      <div className="booking-intro">
        <div className="section-shell booking-intro-grid">
          <div><span className="section-kicker light-kicker">MAKE IT PERSONAL <i /></span><h1>Tell us where<br /><em>you’re headed.</em></h1></div>
          <p>A few trip details help shape a useful enquiry. This form does not confirm a reservation or process a payment.</p>
          <span className="booking-page-index">03 <i /> 05</span>
        </div>
      </div>
      <div className="section-shell booking-layout">
        <aside className="booking-aside">
          <span>01 — YOUR JOURNEY</span>
          <h2>Details first.<br /><em>Then the drive.</em></h2>
          <p>Share your preferred vehicle and plans. Availability and all arrangements require direct confirmation from the business.</p>
          <div className="booking-note"><ShieldCheck size={19} /><span>Your information is used to prepare a message only. This site does not submit or store it.</span></div>
          <div className="booking-steps"><span><Check size={13} /> No payment details</span><span><Check size={13} /> No reservation confirmation</span></div>
          <AppLink to="/fleet" className="text-link"><ArrowLeft size={15} /> Back to the fleet</AppLink>
        </aside>
        <form className="booking-form" onSubmit={submitEnquiry} noValidate>
          <div className="form-section-title"><span>01</span><h2>Journey details</h2><i /></div>
          <div className="form-grid">
            <label className="field field-wide">Enquiry type <b className="required">*</b>
              <select value={form.enquiryType} onChange={(event) => updateForm("enquiryType", event.target.value)}><option>Vehicle rental enquiry</option><option>General enquiry</option></select>
            </label>
            <label className="field field-wide">Preferred vehicle <span className="optional">OPTIONAL · UNVERIFIED MODELS</span>
              <select value={form.vehicleId} onChange={(event) => updateForm("vehicleId", event.target.value)}><option value="">No specific vehicle</option>{candidateVehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>)}</select>
            </label>
            <label className="field">Pickup location <b className="required">*</b><input value={form.pickupLocation} onChange={(event) => updateForm("pickupLocation", event.target.value)} placeholder="City or pickup point" required /></label>
            <label className="field">Destination <b className="required">*</b><input value={form.destination} onChange={(event) => updateForm("destination", event.target.value)} placeholder="Where are you going?" required /></label>
            <label className="field">Travel date <b className="required">*</b><input type="date" min={pickupMinimum} value={form.pickupDate} onChange={(event) => updateForm("pickupDate", event.target.value)} required /></label>
            <label className="field">Pickup time <b className="required">*</b><input type="time" value={form.pickupTime} onChange={(event) => updateForm("pickupTime", event.target.value)} required /></label>
            <label className="field">Return date <span className="optional">OPTIONAL</span><input type="date" min={form.pickupDate || pickupMinimum} value={form.returnDate} onChange={(event) => updateForm("returnDate", event.target.value)} /></label>
            <label className="field">Return time <span className="optional">OPTIONAL</span><input type="time" value={form.returnTime} onChange={(event) => updateForm("returnTime", event.target.value)} /></label>
          </div>
          <div className="form-section-title form-section-next"><span>02</span><h2>Your details</h2><i /></div>
          <div className="form-grid">
            <label className="field field-wide">Your name <b className="required">*</b><input value={form.name} onChange={(event) => updateForm("name", event.target.value)} autoComplete="name" placeholder="How should we address you?" required /></label>
            <label className="field">Phone number <span className="optional">PHONE OR EMAIL REQUIRED</span><input type="tel" value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} autoComplete="tel" placeholder="Contact number" /></label>
            <label className="field">Email address <span className="optional">PHONE OR EMAIL REQUIRED</span><input type="email" value={form.email} onChange={(event) => updateForm("email", event.target.value)} autoComplete="email" placeholder="you@example.com" /></label>
            <label className="field field-wide">Journey requirements <span className="optional">OPTIONAL</span><textarea value={form.notes} onChange={(event) => updateForm("notes", event.target.value)} rows={3} placeholder="Anything else the business should know?" /></label>
          </div>
          <div className="submit-row"><button className="button button-red" type="submit">Prepare WhatsApp enquiry <ArrowRight size={16} /></button><span><ShieldCheck size={14} /> Enquiry only · no booking or payment</span></div>
          {formMessage && <p className={`form-message ${formError ? "is-error" : "is-success"}`} role={formError ? "alert" : "status"}>{formMessage}</p>}
          <p className="form-number-note">WhatsApp number: {businessConfig.whatsappNumber ? "configured; owner verification required" : "awaiting business-owner verification"}</p>
        </form>
      </div>
    </section>
  );
}

export function ServicesPage() {
  return (
    <section className="inner-page services-page">
      <div className="services-masthead">
        <VehicleImage src={conceptImages.road} alt="Monochrome view of the dashboard and cabin in a Mercedes-Benz EQS" className="services-masthead-photo" />
        <div className="services-masthead-shade" />
        <div className="section-shell services-masthead-copy"><span className="section-kicker light-kicker">THE EXPERIENCE <i /></span><h1>The journey<br /><em>is yours.</em></h1><p>Service information is being held for confirmation—not assumption.</p><span className="services-visual-note">ILLUSTRATIVE PHOTOGRAPHY</span></div>
      </div>
      <section className="section-shell service-editorial">
        <div><span className="section-kicker">SERVICE, WITH INTENTION <i /></span><h2>Start with<br /><em>what you need.</em></h2></div>
        <div className="service-editorial-copy"><p>No specific services could be verified from the project materials available for this concept. Rather than imply unsupported offerings, we invite you to share your plans and ask the business what it can provide.</p><AppLink to="/book" className="button button-dark">Ask about a journey <ArrowRight size={15} /></AppLink></div>
      </section>
      <div className="service-statement"><div className="section-shell statement-inner"><span>AT PRESENT</span><p>Service options<br /><em>await owner confirmation.</em></p><AppLink to="/contact" className="text-link">Get in touch <ArrowRight size={15} /></AppLink></div></div>
    </section>
  );
}

export function ContactPage() {
  return (
    <section className="inner-page contact-page">
      <div className="section-shell contact-page-grid">
        <div className="contact-page-title"><span className="section-kicker">A DIRECT LINE, SOON <i /></span><h1>Let’s start<br /><em>with a hello.</em></h1><p>Contact details and business locations need owner confirmation before they can be listed.</p><AppLink to="/book" className="button button-red">Prepare an enquiry <ArrowRight size={16} /></AppLink></div>
        <div className="contact-art">
          <VehicleImage src={conceptImages.suv} alt="Illustrative image of an executive SUV" className="contact-photo" />
          <div className="contact-art-caption"><span>SWIFT DRIVE</span><span>INDEPENDENT CONCEPT REDESIGN</span></div>
        </div>
        <div className="contact-facts">
          <article><span>01 / WHATSAPP</span><h2>Awaiting owner confirmation</h2><p>A verified business number is required before WhatsApp can be enabled.</p><AppLink to="/book" className="text-link">Open the enquiry form <ArrowRight size={14} /></AppLink></article>
          <article><span>02 / LOCATIONS</span><h2>Not confirmed</h2><p>Abuja and Benin were mentioned in the project brief; service coverage has not been verified.</p></article>
          <article><span>03 / BUSINESS DETAILS</span><h2>Easy to add centrally</h2><p>Owner-approved contact details belong in <code>src/config/business.ts</code>.</p></article>
        </div>
      </div>
      <div className="contact-bottom"><div className="section-shell"><AppLink to="/" className="text-link"><ArrowLeft size={14} /> Return home</AppLink><span>INDEPENDENT CONCEPT REDESIGN — NOT THE OFFICIAL WEBSITE</span><AppLink to="/services" className="text-link">Services <ArrowRight size={14} /></AppLink></div></div>
    </section>
  );
}
