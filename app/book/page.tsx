"use client";
import PageMenuPlaceholder from '@/components/PageMenuPlaceholder';


import { useMemo, useState } from "react";
// import PageMenuPlaceholder from "@/components/PageMenuPlaceholder";

type BookingForm = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  addons: string[];
  preferredDate: string;
  preferredTime: string;
  locationType: string;
  notes: string;
};

const SERVICES = [
  "Luxury Wig Install",
  "Wig Revamp & Styling",
  "Wig Wash & Treatment",
  "Hair Styling",
  "Makeup",
  "Manicure",
  "Pedicure",
  "CarePlus Beauty Club Consultation",
];

const ADDONS = [
  "Wash & Treatment",
  "Wig Styling",
  "Makeup Touch-up",
  "Manicure",
  "Pedicure",
  "Photo-ready Finish",
];

const TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function BookPage() {
  const [form, setForm] = useState<BookingForm>({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    addons: [],
    preferredDate: "",
    preferredTime: "",
    locationType: "In-salon appointment",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const today = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  const updateField = (field: keyof BookingForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleAddon = (addon: string) => {
    setForm((prev) => {
      const alreadySelected = prev.addons.includes(addon);

      return {
        ...prev,
        addons: alreadySelected
          ? prev.addons.filter((item) => item !== addon)
          : [...prev.addons, addon],
      };
    });
  };

  const createWhatsAppMessage = () => {
    return `
Hello Kaykay Hair, I would like to book an appointment.

Name: ${form.fullName}
Phone: ${form.phone}
Email: ${form.email || "Not provided"}

Service: ${form.service}
Add-ons: ${form.addons.length ? form.addons.join(", ") : "None"}

Preferred Date: ${form.preferredDate}
Preferred Time: ${form.preferredTime}
Appointment Type: ${form.locationType}

Notes:
${form.notes || "No extra notes"}
    `.trim();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = createWhatsAppMessage();

    /**
     * Replace this with Kaykay Hair's WhatsApp number.
     * Format: country code + number, no plus sign.
     * Example South Africa: 27821234567
     */
    const whatsappNumber = process.env.NEXT_PUBLIC_KAYKAY_WHATSAPP_NUMBER;

    if (whatsappNumber) {
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappUrl, "_blank");
    }

    setSubmitted(true);
  };

  return (
    <PageMenuPlaceholder title="Book Now" width="90%">      
      
    </PageMenuPlaceholder>
  );
}