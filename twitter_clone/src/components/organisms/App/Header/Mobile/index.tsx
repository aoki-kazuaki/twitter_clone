import CAvatar from "@/components/molecules/CAvator";
import Container from "@/components/molecules/Container";
import type { FC } from "react";

type Props = {};

const AppHeaderMobile: FC<Props> = () => {
  return (
    <div className="">
      <header className="bg-background fixed flex h-12 w-screen items-center border-b-2">
        <Container className="relative flex">
          <div>
            <CAvatar src="htt" size="sm" />
          </div>
          <div className="absolute top-6/12 right-6/12 translate-x-6/12 -translate-y-6/12">
            <p className="text-2xl font-bold">Twitter Clone</p>
          </div>
        </Container>
      </header>
      <div className="h-12" />
    </div>
  );
};

export default AppHeaderMobile;
