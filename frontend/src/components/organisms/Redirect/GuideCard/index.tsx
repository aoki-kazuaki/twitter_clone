import CButton from "@/components/atoms/CButton";
import CCard from "@/components/molecules/CCard";
import type { FC } from "react";
import { Link } from "react-router-dom";

type Props = {};

const RedirectGuideCard: FC<Props> = () => {
  return (
    <>
      <CCard cardTitle="Welcome!!">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p>登録済みの方</p>
            <CButton>
              <Link className="h-full w-full" to="login">
                ログイン
              </Link>
            </CButton>
          </div>
          <div className="flex flex-col gap-2">
            <p>登録済みでない方</p>
            <CButton>
              <Link className="h-full w-full" to="register">
                新規登録
              </Link>
            </CButton>
          </div>
        </div>
      </CCard>
    </>
  );
};
export default RedirectGuideCard;
