import Container from "@/components/molecules/Container";
import HomeAccordionProfileArea from "@/components/organisms/Home/AccordionProfileArea";
import HomeGreetingArea from "@/components/organisms/Home/GreetingArea";
import HomeHeroBanner from "@/components/organisms/Home/HeroBanner";
import HomeToNextDrawerForm from "@/components/organisms/Home/HomeToNextDrawer";
import type { FC } from "react";

type Props = {};

const HomeLayout: FC<Props> = () => {
  return (
    <Container className="flex flex-col gap-6 py-7">
      <HomeGreetingArea />
      <HomeHeroBanner />
      <HomeAccordionProfileArea />
      <HomeToNextDrawerForm />
    </Container>
  );
};
export default HomeLayout;
