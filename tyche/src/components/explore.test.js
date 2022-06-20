import { render, screen } from "@testing-library/react"
import Explore from "./explore";
import { shallow, mount } from 'enzyme';
import { Simulate } from "react-dom/test-utils";

const setup = (props={}, state=null) =>{
    return shallow(<Explore{...props} />)
}
const setupstate = (props={}, state=null) =>{
    const wrapper = shallow(<App {...props} />)
    if(state) wrapper.setState(sate)
    return shallow(<Explore{...props} />)
}
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}

test('intial explore', () => {
    const wrapper = shallow(<Explore />);
    expect(wrapper).toMatchSnapshot();
});
test('filter button', () => {
    render(<Explore />);
    expect(screen.getByRole('button', { name: /پیدا کن/i })).toBeEnabled();
  });
test('explore Title', () => {
    render(<Explore />);
    const ExploreTitle = screen.getByText(/مجموعه ات را پیدا کن/i);
    expect(ExploreTitle).toBeInTheDocument();
  });
  test('main body show',() => {
    const wrapper = setup();
    const mainbody = findByTestAttr(wrapper, 'main-body');
    expect(mainbody.length).toBe(1);
  })
  test('filter button show',() => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'filter-button');
    expect(button.length).toBe(1);
  })
  test('min input show',() => {
    const wrapper = setup();
    const minInput = findByTestAttr(wrapper, 'min-input');
    expect(minInput.length).toBe(1);
  })
  test('max input show',() => {
    const wrapper = setup();
    const maxInput = findByTestAttr(wrapper, 'max-input');
    expect(maxInput.length).toBe(1);
  })
  test('explore tabs show',() => {
    const wrapper = setup();
    const exploretabs = findByTestAttr(wrapper, 'explore-tabs');
    expect(exploretabs.length).toBe(1);
  })