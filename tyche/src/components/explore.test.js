import { render, screen } from "@testing-library/react"
import Explore from "./explore";
import { shallow, mount } from 'enzyme';

test('intial explore', () => {
    const wrapper = shallow(<Explore />);
    expect(wrapper).toMatchSnapshot();
});