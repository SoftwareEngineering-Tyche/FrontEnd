import { mount } from 'enzyme';
import Search from './search-page';

describe('renders <Search />', () => {
  it('should pass mount snapshot test', () => {
    const wrapper = mount(<Search />);
    expect(wrapper).toMatchSnapshot();
  });
});