import { shallow } from 'enzyme';
import Like from './like';


describe('renders <like />', () => {
  it('should pass shallow snapshot test', () => {
    const wrapper = shallow(<Like />);
    expect(wrapper).toMatchSnapshot();
  });
});