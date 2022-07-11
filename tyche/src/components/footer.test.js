import { render } from "@testing-library/react"
import footer from "./footer";

test('renders the landing page', () => {
  render(<footer />);

  const { asFragment } = render(<footer text='Hello!' />);
  expect(asFragment()).toMatchSnapshot();
});
