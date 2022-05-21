import { render, screen } from "@testing-library/react"
import CollectionPage from "./collection-page.jsx";



test('intial exp;ore', () => {
    render(<CollectionPage />);

    screen.debug();
});