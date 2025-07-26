import { Main } from "@/components/layout/main";
import { authViewPaths } from "@daveyplate/better-auth-ui/server";
import { AuthView } from "./view";

export function generateStaticParams() {
  return Object.values(authViewPaths).map((pathname) => ({ pathname }));
}

export default async function AuthPage({
  params,
}: {
  params: Promise<{ pathname: string }>;
}) {
  const { pathname } = await params;

  return (
    <Main className='container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6'>
      <AuthView pathname={pathname} />
    </Main>
  );
}
