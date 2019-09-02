import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Step1 extends Component {
  handleOwnerSelection = ownerType => {
    const { onOwnerSelection } = this.props
    onOwnerSelection && onOwnerSelection(ownerType)
  }
  render () {
    const { vehicleApplicationInfo } = this.props
    return (
      <div id="step-1" className="step-1">
        <h2>OWNER TYPE</h2>
        <div className="switch-selection">
          <div
            className={`switch-pill${
              vehicleApplicationInfo.ownerType === 'INDIVIDUAL'
                ? ' selected'
                : ''
            }`}
            style={{
              borderRadius: '5px 0 0 5px',
            }}
            onClick={() => {
              this.handleOwnerSelection('INDIVIDUAL')
            }}
          >
            Individual
          </div>
          <div
            className={`switch-pill${
              vehicleApplicationInfo.ownerType === 'ORGANIZATION'
                ? ' selected'
                : ''
            }`}
            style={{
              borderRadius: '0 5px 5px 0',
            }}
            onClick={() => {
              this.handleOwnerSelection('ORGANIZATION')
            }}
          >
            Organization
          </div>
        </div>
        <p className="help-text">Please select an Owner Type to continue...</p>
      </div>
    )
  }
}

export default Step1

Step1.propTypes = {
  onOwnerSelection: PropTypes.func,
  vehicleApplicationInfo: PropTypes.object,
}
