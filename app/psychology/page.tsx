import type { Metadata } from "next";
import SectionHub from "@/components/SectionHub";
import { sections } from "@/lib/site";

export const metadata: Metadata = {
  title: sections.psychology.title,
  description: sections.psychology.intro,
  alternates: { canonical: sections.psychology.path },
};

export default function Page() {
  return <SectionHub section="psychology" />;
}
