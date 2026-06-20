import { CourseNavigator } from "@/components/CourseNavigator";

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "AX/DX Vibe Coding Course";

type HomeProps = {
  searchParams?: Promise<{
    lesson?: string;
    section?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  return (
    <CourseNavigator
      appName={appName}
      initialLessonId={params?.lesson}
      initialSectionId={params?.section}
    />
  );
}
