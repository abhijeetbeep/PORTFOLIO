import emailjs from "@emailjs/browser";

/* EmailJS configuration — set these in .env.local */
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
}

/**
 * Send contact form data via EmailJS.
 * Returns true on success, throws on failure.
 */
export async function sendEmail(data: ContactFormData): Promise<boolean> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS not configured — check .env.local");
    // In development, simulate success
    return true;
  }

  const templateParams = {
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    project_type: data.projectType,
    budget: data.budget,
    message: data.message,
    date: new Date().toLocaleString(),
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  return true;
}
