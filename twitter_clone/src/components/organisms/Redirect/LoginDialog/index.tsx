import CButton from "@/components/atoms/CButton";
import CInput from "@/components/atoms/CInput";
import CDialogTriggerLess from "@/components/molecules/CDialogTriggerLess";
import Container from "@/components/molecules/Container";
import { type FormItemProps } from "@/components/molecules/FormItem";
import FormItemGroup from "@/components/molecules/FormItemGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type ThisFormValues = {
  id: string;
  password: string;
};

const RedirectLoginDialog: FC = () => {
  const navigate = useNavigate();

  const THIS_FORM_ID_ID = "login_id";
  const THIS_FORM_PASSWORD_ID = "login_password";

  const thisFormSchema = z.object({
    id: z.string().min(1, { message: "IDを入力してください" }),
    password: z.string().min(1, { message: "パスワードを入力してください" })
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(thisFormSchema)
  });

  const thisFormItems: FormItemProps[] = [
    {
      id: THIS_FORM_ID_ID,
      labelText: "ユーザーID またはe-mailアドレス",
      formItem: <CInput id={THIS_FORM_ID_ID} {...register("id")} />,
      validationMessage: errors.id?.message
    },
    {
      id: THIS_FORM_PASSWORD_ID,
      labelText: "パスワード",
      formItem: <CInput id={THIS_FORM_PASSWORD_ID} {...register("password")} />,
      validationMessage: errors.password?.message
    }
  ];

  const onSubmit: SubmitHandler<ThisFormValues> = (data) => {
    navigate("/");
  };

  const onClickDialogClose = () => {
    navigate("/redirect");
  };

  return (
    <CDialogTriggerLess dialogTitle="ログインフォーム" description="登録済みID,パスワードを入力してください">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container className="flex flex-col gap-8">
          <FormItemGroup thisFormItems={thisFormItems} />
          <Container className="flex flex-col gap-4">
            <CButton>ログイン</CButton>
            <CButton type="button" onClick={onClickDialogClose} variant={"outline"}>
              閉じる
            </CButton>
          </Container>
        </Container>
      </form>
    </CDialogTriggerLess>
  );
};
export default RedirectLoginDialog;
