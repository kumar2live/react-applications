import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilderComponent } from './BurgerBuilder';
import BuildControlsComponent from '../Burger/BuildControls/BuildControlsComponent';

configure({adapter: new Adapter()})

describe('<BurgerBuilderComponent>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilderComponent onFetchIngrediants={() => {}}/>);
  });

  it('should render build controls when receiveing ingrediants', () => {
    wrapper.setProps({ings: {salad: 1, meat: 2}})

    expect(wrapper.find(BuildControlsComponent)).toHaveLength(1);
  });
});