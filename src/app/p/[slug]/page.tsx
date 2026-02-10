import { notFound } from "next/navigation";
import { ProjectDetailView } from "@/components/ProjectDetailView";
import { getProjectBySlug } from "@/lib/data";

interface ProjectSlugPageProps {
  params: { slug: string };
}

export default function ProjectSlugPage({ params }: ProjectSlugPageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();
  return <ProjectDetailView project={project} />;
}
