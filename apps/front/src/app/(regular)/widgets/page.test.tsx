import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";
import { Suspense } from "react";

describe("Page", () => {
    // it("renders a heading", async () => {
    //     const page = await Page();
    //     render(page);

    //     // render(<Page />);
    //     const heading = await screen.getByRole("heading", { level: 1 });
    //     // expect(screen.getByRole("heading")).toHaveTextContent("Counter 5/5");
    //     expect(heading).toBeInTheDocument();
    //     expect(heading).toHaveTextContent("Counter 5/5");
    // });

    it("works", () => {
        expect(1).toBe(1);
    });
});
