import { render } from "@testing-library/react"
import HomePageDescriptions from "./descriptions";
import { screen, configure } from '@testing-library/react'

test('intial exp;ore', () => {
    render(<HomePageDescriptions />);

    expect(screen.getByText("NFT چیست؟")).toBeEnabled();
    expect(screen.getByText("نحوه کارکرد NFT به چه شکل است؟")).toBeEnabled();
    expect(screen.getByText("چگونه NFTهای مورد نظرم را خریداری کنم؟")).toBeEnabled();
    expect(screen.getByText("چگونه خودم در این سامانه NFT بسازم؟")).toBeEnabled();
});