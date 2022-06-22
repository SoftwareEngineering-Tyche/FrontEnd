import {render, screen} from "@testing-library/react"
import ProfilePage from "./profile-page"
import { shallow } from 'enzyme';

describe('[[ProfilePage]]', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<ProfilePage debug />);
  
    expect(component).toMatchSnapshot();
  });
});


test('intial product', () => {
 render (<ProfilePage/>);

  screen.debug();
});