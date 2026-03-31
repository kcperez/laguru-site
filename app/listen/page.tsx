import type { Metadata } from "next";
import ListenPage from "@/components/ListenPage";

export const metadata: Metadata = {
  title: "La Guru — Listen",
  description: "Find La Guru on all streaming platforms.",
};

export default function Listen() {
  return <ListenPage />;
}
