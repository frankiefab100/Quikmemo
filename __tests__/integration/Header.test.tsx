import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "../../components/global/Header";

describe("Navbar Component", () => {
  it("should render the navbar with logo and navigation items", () => {
    render(<Navbar />);

    const logoElement = screen.getByAltText("Quikmemo logo");
    expect(logoElement).toBeInTheDocument();

    const featuresButton = screen.getByTestId("features-dropdown-button");
    expect(featuresButton).toBeInTheDocument();
    const resourcesButton = screen.getByTestId("resources-dropdown-button");
    expect(resourcesButton).toBeInTheDocument();

    const solutionsLink = screen.getByTestId("solutions-link");
    expect(solutionsLink).toBeInTheDocument();
    const companyLink = screen.getByTestId("company-link");
    expect(companyLink).toBeInTheDocument();

    const loginLink = screen.getByTestId("login-link");
    expect(loginLink).toBeInTheDocument();
    const getStartedLink = screen.getByTestId("get-started-link");
    expect(getStartedLink).toBeInTheDocument();
  });

  it("should open the Features dropdown on hover", async () => {
    render(<Navbar />);

    const featuresContainer = screen.getByTestId("features-dropdown-container");
    expect(featuresContainer).toBeInTheDocument();
    fireEvent.mouseEnter(featuresContainer);

    await waitFor(() => {
      expect(
        screen.queryByTestId("features-dropdown-content")
      ).toBeInTheDocument();
    });
  });

  it("should open the Features dropdown when clicked", async () => {
    render(<Navbar />);

    // By default, dropdown should be closed
    expect(
      screen.queryByTestId("features-dropdown-content")
    ).not.toBeInTheDocument();

    const featuresButton = screen.getByTestId("features-dropdown-button");
    fireEvent.click(featuresButton);

    await waitFor(() => {
      expect(
        screen.queryByTestId("features-dropdown-content")
      ).toBeInTheDocument();
    });
  });

  it("should close dropdown when clicking outside", async () => {
    render(<Navbar />);

    const featuresButton = screen.getByTestId("features-dropdown-button");
    fireEvent.click(featuresButton);
    await waitFor(() => {
      expect(
        screen.queryByTestId("features-dropdown-content")
      ).toBeInTheDocument();
    });

    const event = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);

    await waitFor(() => {
      expect(
        screen.queryByTestId("features-dropdown-content")
      ).not.toBeInTheDocument();
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

    const mobileFeaturesButton = screen.getByTestId("mobile-features-button");
    fireEvent.click(mobileFeaturesButton);
    await waitFor(() => {
      const editorLink = screen.getByTestId("mobile-dropdown-wysiwyg-editor");
      expect(editorLink).toBeInTheDocument();
    });

    const editorLink = screen.getByTestId("mobile-dropdown-wysiwyg-editor");
    fireEvent.click(editorLink);
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

    const featuresButton = screen.getByTestId("features-dropdown-button");

    expect(featuresButton).toHaveAttribute("aria-expanded", "false");
    expect(featuresButton).toHaveAttribute("aria-haspopup", "true");

    fireEvent.click(featuresButton);
    expect(featuresButton).toHaveAttribute("aria-expanded", "true");
  });
});
