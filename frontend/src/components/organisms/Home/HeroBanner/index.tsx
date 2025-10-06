import computerManImage from "@/assets/img/computer02_man.png";
import Container from "@/components/molecules/Container";
import type { FC } from "react";

type Props = {};

const HomeHeroBanner: FC<Props> = () => {
  return (
    <Container className="flex justify-center">
      <div className="w-5/12 max-w-3xs overflow-hidden rounded-full border-4">
        <img src={computerManImage} alt="トップページバナー画像" className="" />
      </div>
    </Container>
  );
};
export default HomeHeroBanner;
