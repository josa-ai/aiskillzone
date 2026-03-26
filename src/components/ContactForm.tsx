"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SERVICE_OPTIONS = [
  "Website Design & Redesign",
  "Voice AI & Chatbot Setup",
  "AI Automation & Workflows",
  "AI Training & Workshops",
  "E-Commerce Consulting",
  "Brand Strategy & Marketing",
  "Digital Product Creation",
  "Custom App Development",
  "Business Tools",
  "Not sure — I need guidance",
] as const;

type FormData = {
  name: string;
  email: string;
  phone: string;
  service_interest: string;
  message: string;
};

interface ContactFormProps {
  defaultService?: string;
}

export function ContactForm({ defaultService }: ContactFormProps) {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service_interest: defaultService ?? "",
      message: "",
    },
  });

  const serviceInterest = watch("service_interest");

  useEffect(() => {
    if (defaultService) {
      setValue("service_interest", defaultService);
    }
  }, [defaultService, setValue]);

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setErrorMessage("");

    const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;
    if (!webhookUrl) {
      setStatus("error");
      setErrorMessage("Form configuration error. Please try again later.");
      return;
    }

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      customField: {
        service_interest: data.service_interest,
        message: data.message,
        utm_source: searchParams.get("utm_source") ?? "",
        utm_medium: searchParams.get("utm_medium") ?? "",
        utm_campaign: searchParams.get("utm_campaign") ?? "",
        source_url: typeof window !== "undefined" ? window.location.href : "",
      },
    };

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Full Name */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-name" className="text-brand-deep-navy">
          Full Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="contact-name"
          placeholder="Your full name"
          className="bg-brand-frosted-blue text-brand-deep-navy focus-visible:ring-brand-tech-blue/50 focus-visible:border-brand-tech-blue"
          aria-invalid={!!errors.name}
          {...register("name", { required: "Full name is required" })}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-email" className="text-brand-deep-navy">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          className="bg-brand-frosted-blue text-brand-deep-navy focus-visible:ring-brand-tech-blue/50 focus-visible:border-brand-tech-blue"
          aria-invalid={!!errors.email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email",
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-phone" className="text-brand-deep-navy">
          Phone <span className="text-red-500">*</span>
        </Label>
        <Input
          id="contact-phone"
          type="tel"
          placeholder="(555) 123-4567"
          className="bg-brand-frosted-blue text-brand-deep-navy focus-visible:ring-brand-tech-blue/50 focus-visible:border-brand-tech-blue"
          aria-invalid={!!errors.phone}
          {...register("phone", { required: "Phone number is required" })}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Service Interest */}
      <div className="space-y-1.5">
        <Label className="text-brand-deep-navy">
          Service Interest <span className="text-red-500">*</span>
        </Label>
        <Select
          value={serviceInterest}
          onValueChange={(val) => { if (val) setValue("service_interest", val, { shouldValidate: true }); }}
        >
          <SelectTrigger
            className="w-full bg-brand-frosted-blue text-brand-deep-navy focus-visible:ring-brand-tech-blue/50 focus-visible:border-brand-tech-blue"
            aria-invalid={!!errors.service_interest}
          >
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((service) => (
              <SelectItem key={service} value={service}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input
          type="hidden"
          {...register("service_interest", { required: "Please select a service" })}
        />
        {errors.service_interest && (
          <p className="text-sm text-red-500">{errors.service_interest.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-message" className="text-brand-deep-navy">
          Message <span className="text-brand-deep-navy/50">(optional)</span>
        </Label>
        <Textarea
          id="contact-message"
          placeholder="Tell us about your project..."
          rows={4}
          className="bg-brand-frosted-blue text-brand-deep-navy focus-visible:ring-brand-tech-blue/50 focus-visible:border-brand-tech-blue"
          {...register("message")}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="w-full bg-primary hover:bg-brand-mauve-purple text-white font-semibold"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      {/* Success Message */}
      {status === "success" && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-800 text-sm">
          Thank you! Your message has been sent. We&apos;ll be in touch soon.
        </div>
      )}

      {/* Error Message */}
      {status === "error" && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-800 text-sm">
          {errorMessage}
        </div>
      )}
    </form>
  );
}
