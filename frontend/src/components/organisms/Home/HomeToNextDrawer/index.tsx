import CButton from "@/components/atoms/CButton";
import CInput from "@/components/atoms/CInput";
import CDrawer from "@/components/molecules/CDrawer";
import Container from "@/components/molecules/Container";
import FormItem from "@/components/molecules/FormItem";
import { DrawerClose, DrawerFooter } from "@/components/zShadcnBase/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type ThisFormValues = {
  password: string;
};

const HomeToNextDrawerForm: FC = () => {
  const navigate = useNavigate();

  const THIS_FORM_PASSWORD_ID = "home_password";

  const thisFormSchema = z.object({
    password: z.string().min(1, { message: "パスワードは必須です" })
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ThisFormValues>({
    resolver: zodResolver(thisFormSchema)
  });

  const onSubmit: SubmitHandler<ThisFormValues> = (data) => {
    navigate("/redirect");
  };

  return (
    <>
      <CDrawer
        drawerTitle="TwitterCloneに遷移します"
        description="招待制のポートフォリオアプリケーションのため、アクセスにはパスワードが必要です。"
        openDrawerNode={<CButton>Go TwitterClone</CButton>}
        focusTargetId={THIS_FORM_PASSWORD_ID}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Container>
            <FormItem
              id={THIS_FORM_PASSWORD_ID}
              labelText="Password"
              formItem={
                <CInput id={THIS_FORM_PASSWORD_ID} type="password" placeholder="パスワードを入力してください" autoComplete="off" {...register("password")} />
              }
              validationMessage={errors.password?.message}
            />
          </Container>
          <DrawerFooter>
            <CButton>Submit</CButton>
            <DrawerClose asChild>
              <CButton variant="outline">Cancel</CButton>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </CDrawer>
    </>
  );
};
export default HomeToNextDrawerForm;
