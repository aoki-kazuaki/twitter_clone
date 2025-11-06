import CButton from "@/components/atoms/CButton";
import CInput from "@/components/atoms/CInput";
import CDialogTriggerLess from "@/components/molecules/CDialogTriggerLess";
import Container from "@/components/molecules/Container";
import type { FormItemProps } from "@/components/molecules/FormItem";
import FormItemGroup from "@/components/molecules/FormItemGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type ThisFormValues = {
  id: string;
  password: string;
  handleName: string;
  greetingMessage: string;
};

const RedirectRegisterDialog: FC = () => {
  const navigate = useNavigate();

  const THIS_FORM_ID_ID = "newLoginId";
  const THIS_FORM_PASSWORD_ID = "newLoginPassword";
  const THIS_FORM_HANDLE_NAME_ID = "newHandleName";
  const THIS_FORM_GREETING_MESSAGE_ID = "newGreetingMEssage";

  const thisFormSchema = z.object({
    id: z.string().min(1, { message: "IDを入力してください" }),
    password: z.string().min(1, { message: "パスワードを入力してください" }),
    handleName: z.string().min(1, { message: "ユーザー名を入力してください" }),
    greetingMessage: z.string()
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
      labelText: "新規ユーザーID",
      formItem: <CInput id={THIS_FORM_ID_ID} {...register("id")} />,
      validationMessage: errors.id?.message,
      isRequired: true
    },
    {
      id: THIS_FORM_PASSWORD_ID,
      labelText: "新規パスワード",
      formItem: <CInput id={THIS_FORM_PASSWORD_ID} {...register("password")} />,
      validationMessage: errors.password?.message,
      isRequired: true
    },
    {
      id: THIS_FORM_HANDLE_NAME_ID,
      labelText: "新規ユーザー名",
      formItem: <CInput id={THIS_FORM_HANDLE_NAME_ID} {...register("handleName")} />,
      validationMessage: errors.handleName?.message,
      isRequired: true
    },
    {
      id: THIS_FORM_GREETING_MESSAGE_ID,
      labelText: "自己紹介文",
      formItem: <CInput id={THIS_FORM_GREETING_MESSAGE_ID} {...register("greetingMessage")} />,
      validationMessage: errors.greetingMessage?.message
    }
  ];

  const onSubmit: SubmitHandler<ThisFormValues> = (data) => {
    navigate("/");
  };

  const onClickDialogClose = () => {
    navigate("/redirect");
  };

  return (
    <CDialogTriggerLess dialogTitle="新規登録">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container className="flex flex-col gap-8">
          <FormItemGroup thisFormItems={thisFormItems} />
          <Container className="flex flex-col gap-4">
            <CButton>登録する</CButton>
            <CButton type="button" onClick={onClickDialogClose} variant={"outline"}>
              閉じる
            </CButton>
          </Container>
        </Container>
      </form>
    </CDialogTriggerLess>
  );
};

export default RedirectRegisterDialog;
