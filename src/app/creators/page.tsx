import { ProjectExplorer } from "@/components/ProjectExplorer";

export default function CreatorsPage() {
  return (
    <ProjectExplorer
      title="Creadores"
      subtitle="Creadores"
      typeFilter="creator"
      creatorVerifiedOnly
      infoText="Proyectos Creator Verified impulsados por streamers e influencers para causas comunitarias globales."
    />
  );
}
