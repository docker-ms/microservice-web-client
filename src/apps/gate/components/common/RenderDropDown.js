import React from 'react';
import PropTypes from 'prop-types';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class RenderDropDown extends React.Component {

  render() {
    const menusObj = this.props.menusObj;
    const menuItems = Object.keys(menusObj).map(k => <MenuItem key={k.toString()} value={menusObj[k]} label={menusObj[k]} primaryText={k} />);

    return (
      <DropDownMenu value={this.props.value} onChange={this.props.onSelect}>
        {menuItems}
      </DropDownMenu>
    );
  }

}

RenderDropDown.propTypes = {
  menusObj: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default RenderDropDown;


