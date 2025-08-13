import { LayoutHeader, SectionSpacing } from "@/components/layout/elements";
import { Main } from "@/components/layout/main";
import { DevTools } from "@/components/screen/home/dev-tools";
import { Features } from "@/components/screen/home/features";
import { ThemeColors } from "@/components/screen/home/theme-colors";

export default function Home() {
  return (
    <Main>
      <LayoutHeader
        badge='Home'
        title='Payload Starter Kit'
        description='An opinionated starter built with PayloadCMS, PayloadAuth, and Shadcn UI.'
      />
      <SectionSpacing>
        <Features />
        <DevTools />
        <ThemeColors />
      </SectionSpacing>
    </Main>
  );
}
