"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Info } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { demoNotice, interestOptions } from "@/content/contact";
import { site } from "@/content/site";

const fieldClasses =
  "mt-2 block w-full rounded-button border border-silver bg-white px-4 py-3 text-base text-onyx placeholder:text-steel focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-navy">
        {label}
      </label>
      {children}
    </div>
  );
}

/** Visual-only demo form: never sends data, shows an inline notice on submit. */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const id = useId();
  const fid = (name: string) => `${id}-${name}`;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={onSubmit} className="rounded-feature bg-white p-6 shadow-nav sm:p-8" aria-describedby={fid("notice")}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre y apellido" htmlFor={fid("name")}>
          <input id={fid("name")} name="name" type="text" autoComplete="name" required className={fieldClasses} />
        </Field>
        <Field label="Empresa o clínica" htmlFor={fid("company")}>
          <input id={fid("company")} name="company" type="text" autoComplete="organization" className={fieldClasses} />
        </Field>
        <Field label="Email" htmlFor={fid("email")}>
          <input id={fid("email")} name="email" type="email" autoComplete="email" required className={fieldClasses} />
        </Field>
        <Field label="Teléfono" htmlFor={fid("phone")}>
          <input id={fid("phone")} name="phone" type="tel" autoComplete="tel" className={fieldClasses} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Interés" htmlFor={fid("interest")}>
            <select id={fid("interest")} name="interest" defaultValue="vetnet" className={fieldClasses}>
              {interestOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Mensaje" htmlFor={fid("message")}>
            <textarea id={fid("message")} name="message" rows={4} className={`${fieldClasses} resize-y`} />
          </Field>
        </div>
      </div>

      <button type="submit" className={buttonClasses("primary", "md", "mt-6 w-full sm:w-auto")}>
        Enviar consulta
      </button>

      <div id={fid("notice")} role="status" aria-live="polite">
        {submitted && (
          <p className="mt-5 flex items-start gap-3 rounded-card bg-sky-pale p-4 text-sm leading-relaxed text-navy">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-sky" aria-hidden="true" />
            <span>
              {demoNotice.before}{" "}
              <a href={`mailto:${site.email}`} className="text-link break-all">
                {site.email}
              </a>
              {demoNotice.after}
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
