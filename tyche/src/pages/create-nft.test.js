import {render, screen} from "@testing-library/react"
import CreateNft from "./create-nft";



test('intial nft', () => {
    render (<CreateNft/>);
   
      expect(screen.getByRole('button', { name : /بساز/i})). toBeEnabled();
      expect(screen.getByRole('button', { name : /انصراف/i})). toBeEnabled();
   });