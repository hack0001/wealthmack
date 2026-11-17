import type { Metadata } from "next";
import SectionHub from "@/components/SectionHub";
import { sections } from "@/lib/site";

export const metadata: Metadata = {
  title: sections.options.title,
  description: sections.options.intro,
  alternates: { canonical: sections.options.path },
};

export default function Page() {
  return <SectionHub section="options" />;
}
