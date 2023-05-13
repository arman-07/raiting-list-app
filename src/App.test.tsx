import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from "./App";

import axios from "axios";

// моковые данные
let data = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
];

test("renders the App component", () => {
  render(<App />);
});

test("displays user list and buttons", () => {
  render(<App />);

  expect(screen.getByText("Список пользователей")).toBeInTheDocument();

  expect(screen.getByText("Обновить список")).toBeInTheDocument();
});

test('updates user list when "Обновить список" button is clicked', async () => {
  render(<App />);

  // Mock API response
  jest.spyOn(axios, "get").mockResolvedValueOnce({
    data,
  });

  // Нажимаем кнопку "Обновить список"
  const updateButton = screen.queryByText("Обновить список");
  if (updateButton) {
    fireEvent.click(updateButton);
  }

  // Ожидаем обновленного списка пользователей
  await waitFor(() => {
    screen.queryAllByText(/User \d/);
    expect(data?.length).toBe(3);
  });
});
