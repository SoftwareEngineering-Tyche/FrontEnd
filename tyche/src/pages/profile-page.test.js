import {render, screen} from "@testing-library/react"
import ProfilePage from "./profile-page"


test('intial product', () => {
 render (<ProfilePage/>);

  screen.debug();
});