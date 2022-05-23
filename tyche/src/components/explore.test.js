<<<<<<< HEAD
import {render, screen} from "@testing-library/react"
=======
import { render, screen } from "@testing-library/react"
>>>>>>> 407bba112c170aa44d2c604e1de9fb7e37c222d5
import Explore from "./explore";



test('intial exp;ore', () => {
    render(<Explore />);

    screen.getAllByPlaceholderText();
});