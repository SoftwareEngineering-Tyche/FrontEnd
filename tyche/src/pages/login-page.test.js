import {render, screen} from "@testing-library/react"

import LoginPage from "./login-page";




test('intial login', () => {
 render (<LoginPage/>);

  screen.debug()
});