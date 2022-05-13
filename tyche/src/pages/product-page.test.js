import {render, screen} from "@testing-library/react"
import CreateNft from "./create-nft";
import ProductPage from "./product-page";



test('intial product', () => {
 render (<ProductPage/>);

   expect(screen.getByRole('button', { name : /خرید آنی/i})). toBeEnabled();
});