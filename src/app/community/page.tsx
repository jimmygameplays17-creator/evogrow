import { ProjectExplorer } from "@/components/ProjectExplorer";

export default function CommunityPage() {
  return (
    <ProjectExplorer
      title="Proyectos impulsados por la comunidad"
      subtitle="Comunidad"
      typeFilter="community"
      infoText="Comunidad: campañas libres creadas por personas. Apoya lo que tú quieras. No son proyectos oficiales."
    />
  );
}
