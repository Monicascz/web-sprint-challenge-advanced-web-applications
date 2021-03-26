import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";

import mockGetBubbles from './../../src/mocks/handlers'
jest.mock('./../../src/mocks/handlers');

let testColors = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff",
    },
    id: 1,
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc",
    },
    id: 2,
  }
]

test("Renders BubblePage without errors", () => {
  // Finish this test
  render(<BubblePage/>)

});

test("Fetches data and renders the bubbles on mounting", async() => {
  // Finish this test
  mockGetBubbles.mockResolvedValueOnce(testColors)
  render(<BubblePage/>)
  

  await waitFor(()=>{
    const colors = screen.queryAllByTestId("color")
    expect(colors).toHaveLength(11)
})



});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading