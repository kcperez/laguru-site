import type { Metadata } from "next";
import DocumentaryGate from "@/components/DocumentaryGate";

export const metadata: Metadata = {
  title: "La Guru — The Documentary",
  description:
    "An exclusive look behind the music, the journey, and the woman behind La Guru.",
};

export default function DocumentaryPage() {
  return <DocumentaryGate />;
}
