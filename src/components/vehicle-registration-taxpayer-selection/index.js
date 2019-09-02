import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

class VehicleRegistrationTaxpayerSelection extends Component {
  handleTaxpayerSelection = taxpayerType => {
    const { onTaxpayerSelection } = this.props
    onTaxpayerSelection && onTaxpayerSelection(taxpayerType)
  }
  render () {
    const { vehicleRegistrationInfo } = this.props
    return (
      <div
        id="vehicle-registration-taxpayer-type"
        className="taxpayer-type-selection"
      >
        <h2>TAXPAYER TYPE</h2>
        <div className="switch-selection">
          <div
            className={`switch-pill${
              vehicleRegistrationInfo.taxpayerType === 'FILER'
                ? ' selected'
                : ''
            }`}
            style={{
              borderRadius: '5px 0 0 5px',
            }}
            onClick={() => {
              this.handleTaxpayerSelection('FILER')
            }}
          >
            Filer
          </div>
          <div
            className={`switch-pill${
              vehicleRegistrationInfo.taxpayerType === 'NON-FILER'
                ? ' selected'
                : ''
            }`}
            style={{
              borderRadius: '0 5px 5px 0',
            }}
            onClick={() => {
              this.handleTaxpayerSelection('NON-FILER')
            }}
          >
            Non-Filer
          </div>
        </div>
        {vehicleRegistrationInfo.taxpayerType === '' && (
          <p className="help-text">
            Please select a Taxpayer Type to continue...
          </p>
        )}
        <p className="help-text">
          {`(Those Individual/ Companies, who file annual tax returns in FBR and included in Active Taxpayer List are Filers)`}
        </p>
      </div>
    )
  }
}

export default VehicleRegistrationTaxpayerSelection

VehicleRegistrationTaxpayerSelection.propTypes = {
  onTaxpayerSelection: PropTypes.func,
  vehicleRegistrationInfo: PropTypes.object,
}
