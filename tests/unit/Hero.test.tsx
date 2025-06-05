import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/layout/Hero";

test("Hero", () => {
  render(<Hero />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "The Ultimate Note-Taking Companion",
    })
  ).toBeDefined();
});
