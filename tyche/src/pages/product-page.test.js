import { render, screen } from "@testing-library/react"
import CreateNft from "./create-nft";
import ProductPage from "./product-page";
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

test('intial product', () => {
  const wrapper = shallow(<ProductPage />);
  expect(wrapper).toMatchSnapshot();
});

test('buy button', () => {
  render(<ProductPage />);
  expect(screen.getByRole('button', { name: /خرید آنی/i })).toBeEnabled();
});

test('offer button', () => {
  render(<ProductPage />);
  expect(screen.getByRole('button', { name: /پیشنهاد قیمت/i })).toBeEnabled();
});

test('product name', () => {
  render(<ProductPage />);
  const linkElement = screen.getByText(/نام اثر/i);
  expect(linkElement).toBeInTheDocument();
});

test('product like counter', () => {
  render(<ProductPage />);
  const linkElement = screen.getByText(/نفر این اثر را پسندیده‌اند/i);
  expect(linkElement).toBeInTheDocument();
});
