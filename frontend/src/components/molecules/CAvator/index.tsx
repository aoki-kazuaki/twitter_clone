import { Avatar, AvatarFallback, AvatarImage } from "@/components/zShadcnBase/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, FC } from "react";

/**画像の読み込みに失敗したケースで表示されるアバターURL */
export const C_AVATAR_WHEN_FALLBACK_URL = "https://avatars.githubusercontent.com/u/0?v=4";

const avatarVariants = cva("", {
  variants: {
    size: {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16"
    }
  },
  defaultVariants: {
    size: "sm"
  }
});

type Props = ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof avatarVariants> & {
    src: string;
    fallbackAlt?: string;
    alt?: string;
  };

const CAvatar: FC<Props> = ({ size, src, alt = "", fallbackAlt = "無効または未指定のアイコン画像", ...other }) => {
  return (
    <Avatar className={avatarVariants({ size })} {...other}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>
        <img src={C_AVATAR_WHEN_FALLBACK_URL} alt={fallbackAlt} />
      </AvatarFallback>
    </Avatar>
  );
};
export default CAvatar;
