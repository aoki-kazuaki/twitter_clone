import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CAvatar from ".";

describe("components/molecules/CAvatarテスト", () => {
  const INVALID_SRC_URL = "invalid-url";
  const FALLBACK_ALT = "fallback-avatar";

  test("無効なURL指定でフォールバック画像が表示される", () => {
    render(<CAvatar src={INVALID_SRC_URL} fallbackAlt={FALLBACK_ALT} />);
    const image = screen.getByRole("img");
    fireEvent.error(image);
    expect(screen.getByAltText(FALLBACK_ALT)).toBeInTheDocument();
  });
});
