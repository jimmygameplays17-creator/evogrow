import { ProjectExplorer } from "@/components/ProjectExplorer";

export default function CompletedPage() {
  return (
    <ProjectExplorer
      title="Proyectos finalizados"
      subtitle="Finalizados"
      completionFilter="completed"
      infoText="Obras y campañas que ya concluyeron su recaudación o ejecución."
    />
  );
}
