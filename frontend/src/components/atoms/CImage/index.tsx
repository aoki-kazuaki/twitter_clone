import noImage from "@/assets/img/noImage.png";
import clsx from "clsx";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";

type Props = {
  whenOnErrorShowImageUrl?: string;
  className?: string;
} & ComponentPropsWithoutRef<"img">;

/**
 * フォールバック画像が読み込み失敗時に共通して表示される画像コンポーネント
 * 読み込み失敗時に表示される画像は任意入力として変更可能
 */
const CImage: FC<Props> = ({ whenOnErrorShowImageUrl = noImage, className = "", src = "", ...other }) => {
  const [imgSrc, setImgSrc] = useState<string>(src);

  return <img className={clsx("rounded-xl", className)} {...other} src={imgSrc} onError={() => setImgSrc(whenOnErrorShowImageUrl)} />;
};

export default CImage;
