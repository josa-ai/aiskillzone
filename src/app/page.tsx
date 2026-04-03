import type { Metadata } from "next";
import { HomepageContent } from "@/components/HomepageContent";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Boutique AI consulting — custom websites, voice AI, smart automation, and training for modern businesses.",
};

export default function Home() {
  return <HomepageContent />;
}
