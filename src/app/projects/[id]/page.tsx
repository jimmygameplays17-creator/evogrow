import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/ProjectDetailView";
import { getProjectById } from "@/lib/data";

interface ProjectDetailPageProps {
  params: { id: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectById(params.id);
  if (!project) return notFound();
  return <ProjectDetailView project={project} />;
}
