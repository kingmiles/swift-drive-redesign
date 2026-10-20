import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { businessConfig, candidateVehicles, type VehicleCategory } from "./config/business";
import { SiteFooter, SiteHeader } from "./components/SiteFrame";
import { BookingPage, ContactPage, FleetPage, HomePage, ServicesPage, type EnquiryForm } from "./pages";
import { navigateTo } from "./navigation";

const initialForm: EnquiryForm = {
  vehicleId: "",
  enquiryType: "Vehicle rental enquiry",
  pickupLocation: "",
  destination: "",
  pickupDate: "",
  pickupTime: "",
  returnDate: "",
  returnTime: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

const titles: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Swift Drive — Arrive with presence",
    description: "Explore an independent Swift Drive concept for executive mobility. Vehicle and business details require owner confirmation.",
  },
  "/fleet": {
    title: "Our Fleet — Swift Drive concept",
    description: "Explore vehicle models mentioned in the project brief. Fleet listings and availability require owner confirmation.",
  },
  "/book": {
    title: "Book a Ride — Swift Drive concept",
    description: "Prepare a direct vehicle rental enquiry with your journey details. Sending an enquiry does not confirm a reservation.",
  },
  "/services": {
    title: "Services — Swift Drive concept",
    description: "Service information is pending business verification. Share your requirements in a direct enquiry.",
  },
  "/contact": {
    title: "Contact — Swift Drive concept",
    description: "Prepare a direct enquiry. Contact channels and service locations are awaiting owner verification.",
  },
};

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return titles[path] ? path : "/";
}

export default function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [category, setCategory] = useState<"All" | VehicleCategory>("All");
  const [form, setForm] = useState<EnquiryForm>(initialForm);
  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    const handlePopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const metadata = titles[path];
    document.title = metadata.title;
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.append(description);
    }
    description.content = metadata.description;
    window.scrollTo({ top: 0, behavior: "auto" });
    setMobileMenuOpen(false);
  }, [path]);

  function updateForm<K extends keyof EnquiryForm>(key: K, value: EnquiryForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setFormMessage("");
  }

  function chooseVehicle(vehicleId: string) {
    updateForm("vehicleId", vehicleId);
    navigateTo("/book");
  }

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(true);
    setFormMessage("");

    if (
      !form.enquiryType ||
      !form.pickupLocation.trim() ||
      !form.destination.trim() ||
      !form.pickupDate ||
      !form.pickupTime ||
      !form.name.trim()
    ) {
      setFormMessage("Please complete each required field before continuing.");
      return;
    }
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    if (form.pickupDate < today) {
      setFormMessage("Your travel date must be today or later.");
      return;
    }
    if (!form.phone.trim() && !form.email.trim()) {
      setFormMessage("Add a phone number or email address so the business can reply.");
      return;
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setFormMessage("Enter a valid email address or leave it blank.");
      return;
    }
    if (form.returnDate && form.returnDate < form.pickupDate) {
      setFormMessage("Your return date must be on or after your travel date.");
      return;
    }
    if (
      form.returnDate === form.pickupDate &&
      form.returnTime &&
      form.returnTime < form.pickupTime
    ) {
      setFormMessage("For a same-day trip, the return time must follow pickup time.");
      return;
    }
    const number = businessConfig.whatsappNumber.replace(/\D/g, "");
    if (!/^\d{8,15}$/.test(number)) {
      setFormMessage(
        "WhatsApp enquiries are not configured yet. Ask the business owner to add a valid, verified international number in src/config/business.ts.",
      );
      return;
    }

    const vehicle = candidateVehicles.find((item) => item.id === form.vehicleId)?.name ?? "No specific vehicle selected";
    const message = [
      "Hello Swift Drive, I would like to make an enquiry.",
      "",
      `Enquiry type: ${form.enquiryType}`,
      `Vehicle of interest: ${vehicle}`,
      `Pickup location: ${form.pickupLocation.trim()}`,
      `Destination: ${form.destination.trim()}`,
      `Travel date and time: ${form.pickupDate} at ${form.pickupTime}`,
      `Return: ${form.returnDate ? `${form.returnDate}${form.returnTime ? ` at ${form.returnTime}` : ""}` : "Not specified"}`,
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim() || "Not provided"}`,
      `Email: ${form.email.trim() || "Not provided"}`,
      `Journey requirements: ${form.notes.trim() || "None"}`,
      "",
      "I understand availability and reservation details require confirmation.",
    ].join("\n");
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setFormError(false);
    setFormMessage("Your WhatsApp enquiry is ready to send.");
  }

  return (
    <>
      <SiteHeader path={path} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main id="main-content">
        {path === "/" && <HomePage onChooseVehicle={chooseVehicle} />}
        {path === "/fleet" && <FleetPage category={category} setCategory={setCategory} onChooseVehicle={chooseVehicle} />}
        {path === "/book" && (
          <BookingPage
            form={form}
            updateForm={updateForm}
            submitEnquiry={submitEnquiry}
            formMessage={formMessage}
            formError={formError}
          />
        )}
        {path === "/services" && <ServicesPage />}
        {path === "/contact" && <ContactPage />}
      </main>
      <SiteFooter />
      <a className="back-top" href="#main-content" onClick={(event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }} aria-label="Back to top"><ArrowRight size={15} /></a>
    </>
  );
}
