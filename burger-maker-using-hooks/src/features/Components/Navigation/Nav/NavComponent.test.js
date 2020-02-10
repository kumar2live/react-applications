import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import NavComponent from './NavComponent';
import NavItemComponent from './NavItem/NavItemComponent';

configure({adapter: new Adapter()})

describe('<NavComponent>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavComponent />);
  });

  it('should render 2 links if not authenticated ', () => {
    expect(wrapper.find(NavItemComponent)).toHaveLength(2);
  });

  it('should render 3 links if authenticated', () => {
    // wrapper = shallow(<NavComponent authenticated/>);
    wrapper.setProps({authenticated: true})
    expect(wrapper.find(NavItemComponent)).toHaveLength(3);
  });

  it('should render logout links if authenticated', () => {
    wrapper.setProps({authenticated: true})
    expect(
      wrapper.contains(<NavItemComponent link="/logout">Logout</NavItemComponent>)
      ).toBeTruthy();
  });
});