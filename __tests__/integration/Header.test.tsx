/// <reference types="vitest" />
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "../../components/global/Header";

describe("Navbar Component", () => {
  it("should render the navbar with logo and navigation items", () => {
    render(<Navbar />);
    const logoElement = screen.getByTestId("logo");
    expect(logoElement).toBeInTheDocument();
    const loginLink = screen.getByTestId("login-link");
    expect(loginLink).toBeInTheDocument();
    const getStartedLinks = screen.getAllByTestId("get-started-link");
    expect(getStartedLinks.length).toBeGreaterThan(0);
  });

  it("should open the Features dropdown on hover", async () => {
    render(<Navbar />);
    const featuresButtons = screen.getAllByText("Features");
    const featuresButton = featuresButtons[0];

    fireEvent.mouseEnter(featuresButton);
    await waitFor(() => {
      expect(screen.getByText("WYSIWYG Editor")).toBeInTheDocument();
    });
  });

  it("should open the Features dropdown when clicked", async () => {
    render(<Navbar />);
    expect(screen.queryByText("WYSIWYG Editor")).not.toBeInTheDocument();
    const featuresButtons = screen.getAllByText("Features");
    const featuresButton = featuresButtons[0];

    fireEvent.click(featuresButton);
    await waitFor(() => {
      expect(screen.getByText("WYSIWYG Editor")).toBeInTheDocument();
    });
  });

  it("should close dropdown when clicking outside", async () => {
    render(<Navbar />);
    const featuresButtons = screen.getAllByText("Features");
    const featuresButton = featuresButtons[0];

    fireEvent.click(featuresButton);
    await waitFor(() => {
      expect(screen.getByText("WYSIWYG Editor")).toBeInTheDocument();
    });
    const event = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
    await waitFor(() => {
      expect(screen.queryByText("WYSIWYG Editor")).not.toBeInTheDocument();
    });
  });

  it("should open mobile menu when hamburger icon is clicked", async () => {
    render(<Navbar />);
    const menuButton = screen.getByTestId("mobile-menu-button");
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);
    await waitFor(() => {
      const mobileMenu = screen.getByTestId("mobile-menu");
      expect(mobileMenu).toBeInTheDocument();
    });
  });

  it("should close mobile menu when a link is clicked", async () => {
    render(<Navbar />);
    const menuButton = screen.getByTestId("mobile-menu-button");

    fireEvent.click(menuButton);
    await waitFor(() => {
      const mobileMenu = screen.getByTestId("mobile-menu");
      expect(mobileMenu).toBeInTheDocument();
    });

    const featuresButtons = screen.getAllByText("Features");
    const mobileFeaturesButton = featuresButtons[featuresButtons.length - 1];

    fireEvent.click(mobileFeaturesButton);
    await waitFor(() => {
      const wysiwygLink = screen.getByText("WYSIWYG Editor");
      expect(wysiwygLink).toBeInTheDocument();
    });

    const wysiwygLink = screen.getByText("WYSIWYG Editor");
    fireEvent.click(wysiwygLink);
    await waitFor(() => {
      expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    });
  });

  it("should disable scroll when mobile menu is open", () => {
    render(<Navbar />);
    const menuButton = screen.getByTestId("mobile-menu-button");
    fireEvent.click(menuButton);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should have correct ARIA attributes for accessibility", () => {
    render(<Navbar />);
    const featuresButtons = screen.getAllByText("Features");
    const featuresButton = featuresButtons[0];

    expect(featuresButton).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(featuresButton);
    expect(featuresButton).toHaveAttribute("aria-expanded", "true");
  });

  it("should render Resources dropdown", async () => {
    render(<Navbar />);
    const resourcesButtons = screen.getAllByText("Resources");
    const resourcesButton = resourcesButtons[0];

    expect(resourcesButton).toBeInTheDocument();
    fireEvent.click(resourcesButton);
    await waitFor(() => {
      expect(screen.getByText("Blog")).toBeInTheDocument();
      expect(screen.getByText("Documentation")).toBeInTheDocument();
    });
  });

  it("should render mobile menu with correct structure", async () => {
    render(<Navbar />);
    const menuButton = screen.getByTestId("mobile-menu-button");

    fireEvent.click(menuButton);
    await waitFor(() => {
      const featuresButtons = screen.getAllByText("Features");
      const resourcesButtons = screen.getAllByText("Resources");
      expect(featuresButtons[featuresButtons.length - 1]).toBeInTheDocument();
      expect(resourcesButtons[resourcesButtons.length - 1]).toBeInTheDocument();
    });
  });
});
