import {render, screen} from "@testing-library/react"
import ProfilePage from "./profile-page"
import { shallow } from 'enzyme';

describe('[[ProfilePage]]', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<ProfilePage debug />);
  
    expect(component).toMatchSnapshot();
  });
});
const setup = (props={}, state=null) =>{
  return shallow(<ProfilePage{...props} />)
}
const setupstate = (props={}, state=null) =>{
  const wrapper = shallow(<App {...props} />)
  if(state) wrapper.setState(sate)
  return shallow(<ProfilePage{...props} />)
}
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}
test('intial product', () => {
 render (<ProfilePage/>);

  screen.debug();
});
test('div wallet',() => {
  const wrapper = setup();
  const divwallet = findByTestAttr(wrapper, 'wallet');
  expect(divwallet.length).toBe(1);
})
test('btn-button',() => {
  const wrapper = setup();
  const btn = findByTestAttr(wrapper, 'btn-button');
  expect(btn.length).toBe(1);
})
test('shw img-prof',() => {
  const wrapper = setup();
  const imgprof = findByTestAttr(wrapper, 'img-prof');
  expect(imgprof.length).toBe(1);
})
test('shw Snackbar',() => {
  const wrapper = setup();
  const Snackbarshow = findByTestAttr(wrapper, 'Snackbar');
  expect(Snackbarshow.length).toBe(1);
})
test('shw alert',() => {
  const wrapper = setup();
  const alertshow = findByTestAttr(wrapper, 'alert');
  expect(alertshow.length).toBe(1);
})
test('shw contents',() => {
  const wrapper = setup();
  const contentsshow = findByTestAttr(wrapper, 'contents');
  expect(contentsshow.length).toBe(1);
})
test('shw craettab',() => {
  const wrapper = setup();
  const craettabshow = findByTestAttr(wrapper, 'craettab');
  expect(craettabshow.length).toBe(1);
})
test('shw collectiontab',() => {
  const wrapper = setup();
  const contentsshow = findByTestAttr(wrapper, 'contents');
  expect(contentsshow.length).toBe(1);
})
test('shw favoritetab',() => {
  const wrapper = setup();
  const favoritetabshow = findByTestAttr(wrapper, 'favoritetab');
  expect(favoritetabshow.length).toBe(1);
})
test('shw requesttab',() => {
  const wrapper = setup();
  const requesttabshow = findByTestAttr(wrapper, 'requesttab');
  expect(requesttabshow.length).toBe(1);
})
test('shw tabs-contents',() => {
  const wrapper = setup();
  const tabscontentsshow = findByTestAttr(wrapper, 'tabs-contents');
  expect(tabscontentsshow.length).toBe(1);
})
test('shw collectionpanel',() => {
  const wrapper = setup();
  const collectionpanelshow = findByTestAttr(wrapper, 'collectionpanel');
  expect(collectionpanelshow.length).toBe(1);
})
test('shw creatpanel',() => {
  const wrapper = setup();
  const creatpanelshow = findByTestAttr(wrapper, 'creatpanel');
  expect(creatpanelshow.length).toBe(1);
})
test('shw favoritpanel',() => {
  const wrapper = setup();
  const favoritpanelshow = findByTestAttr(wrapper, 'favoritpanel');
  expect(favoritpanelshow.length).toBe(1);
})
test('shw requestpanel',() => {
  const wrapper = setup();
  const requestpanelshow = findByTestAttr(wrapper, 'requestpanel');
  expect(requestpanelshow.length).toBe(1);
})
test('shw myrequesttab',() => {
  const wrapper = setup();
  const myrequesttabshow = findByTestAttr(wrapper, 'myrequesttab');
  expect(myrequesttabshow.length).toBe(1);
})
test('shw otherrequesttab',() => {
  const wrapper = setup();
  const otherrequesttabshow = findByTestAttr(wrapper, 'otherrequesttab');
  expect(otherrequesttabshow.length).toBe(1);
})
test('shw myrequestpanel',() => {
  const wrapper = setup();
  const myrequestpanelshow = findByTestAttr(wrapper, 'myrequestpanel');
  expect(myrequestpanelshow.length).toBe(1);
})
test('shw otherrequestpanel',() => {
  const wrapper = setup();
  const otherrequestpanelshow = findByTestAttr(wrapper, 'otherrequestpanel');
  expect(otherrequestpanelshow.length).toBe(1);
})