import { Contact } from "@/components/contact";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pb-32 space-y-32 pt-16 prose prose-invert px-8 lg:px-0 mx-auto">
      <Contact />
      <Projects />
    </div>
  );
}
