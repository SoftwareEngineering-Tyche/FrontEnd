import {render, screen} from "@testing-library/react"
import HomePage from "./home-page";



test('intial product', () => {
 render (<HomePage/>);

  screen.debug();
});