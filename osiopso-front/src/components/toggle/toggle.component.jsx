import React, { Fragment } from "react";

import { Toggle } from "react-toggle-component";

import { Label, Sample } from "./toggle.styles";

class ToggleButton extends React.Component {
  constructor() {
    super();
    this.state = { checked: false, check: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
  }


  handleChange(checked) {
    this.setState({ checked: checked });
    this.setState({ check: !checked });
  }

  handleChange1(check) {
    this.setState({ checked: !check });
    this.setState({ check: check });
  }
  render() {    
    return (
      <Fragment>
        <Sample>
          <Label htmlFor="toggle-1">
            <Toggle
							name="toggle-1"
              checked={this.state.checked}
              onChange={e => this.handleChange(e.target.checked)}
            />
            <span>{this.state.checked ? "on" : "off"}</span>
          </Label>
        </Sample>

    
      </Fragment>
    );
  }
}


export default ToggleButton