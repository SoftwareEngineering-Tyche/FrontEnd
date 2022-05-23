import {render, screen} from "@testing-library/react"
import Explore from "./explore";



test('intial exp;ore', () => {
 render (<Explore/>);

    screen.getAllByPlaceholderText();
});