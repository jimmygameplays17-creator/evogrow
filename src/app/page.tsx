import { ProjectExplorer } from "@/components/ProjectExplorer";

export default function HomePage() {
  return (
    <ProjectExplorer
      title="Crowdfunding local con transparencia total"
      subtitle="Explora proyectos cercanos"
      showTrending
    />
  );
}
