import { render } from "@testing-library/react"
import footer from "./footer";

test('renders the landing page', () => {
  render(<footer />);

  //   expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
  //   expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
  //   expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
  //   expect(screen.getByRole("img")).toBeInTheDocument();
});