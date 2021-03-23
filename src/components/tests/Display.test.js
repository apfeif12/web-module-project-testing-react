import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import Display from "../Display";
import userEvent from "@testing-library/user-event";

const testShow = {
    name: "survivor",
    summary: "people surviving",
    seasons: [{ id: 0, name: "season 1", episodes: [] }],
};

test("Test that the Display component renders without any passed in props", () => {
    render(<Display displayFun={[]} />);
});

test("Test that when the fetch button is pressed, the show component will display", async () => {
    render(<Display displayFun={[]} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const displayComp = await screen.findByTestId("show-container");
    expect(displayComp).toBeInTheDocument();
});

test("Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data", async () => {
    render(<Display displayFun={testShow} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const displayComp = await screen.findAllByTestId("show-container");
    expect(displayComp).toHaveLength(testShow.seasons.length);
});

test("Test that when the fetch button is pressed, this function is called", async () => {
    const mockHandleClick = jest.fn();
    render(<Display handleClick={mockHandleClick} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    waitFor(() => {
        expect(mockHandleClick).toHaveBeenCalled();
    });
});
