import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextField, SelectField, SelectionControl } from 'react-md'

import { districts } from 'libs/consts'

class Step3 extends Component {
  handleOnChange = ({ id, value }) => {
    const { onChange } = this.props
    onChange && onChange({ id, value })
  }
  handleOnCheckChange = ({ id, value }) => {
    const { onCheckChange } = this.props
    onCheckChange && onCheckChange({ id, value })
  }
  render () {
    const { vehicleApplicationInfo } = this.props
    const showIndividualDetails =
      vehicleApplicationInfo.ownerType === 'INDIVIDUAL'
    return (
      <div id="step-3" className="step-3">
        <h2>{vehicleApplicationInfo.ownerType} ADDRESS INFORMATION</h2>
        <div className="form-view md-grid">
          <div className="md-cell md-cell--6-desktop md-cell--4-tablet  md-cell--4-phone md-grid md-grid--no-spacing section">
            <p className="section-heading">Present Address:</p>
            <TextField
              id="present-address"
              label="Address"
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              value={vehicleApplicationInfo.presentAddress || ''}
              onChange={value => {
                this.handleOnChange({ id: 'presentAddress', value })
              }}
            />
            <TextField
              id="present-address-city"
              label="City"
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              value={vehicleApplicationInfo.presentAddressCity || ''}
              onChange={value => {
                this.handleOnChange({ id: 'presentAddressCity', value })
              }}
            />
            <SelectField
              id="present-address-district"
              label="District"
              value={vehicleApplicationInfo.presentAddressDistrict || ''}
              onChange={value => {
                this.handleOnChange({ id: 'presentAddressDistrict', value })
              }}
              itemValue="value"
              menuItems={districts}
              className="md-cell md-cell--12-desktop md-cell--8-tablet  md-cell--4-phone"
              sameWidth
            />
          </div>
          <div className="md-cell md-cell--6-desktop  md-cell--4-tablet  md-cell--4-phone section">
            <p className="section-heading">Permanent Address:</p>
            <TextField
              id="permanent-address"
              label="Address"
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              value={vehicleApplicationInfo.permanentAddress || ''}
              onChange={value => {
                this.handleOnChange({ id: 'permanentAddress', value })
              }}
            />
            <TextField
              id="permanent-address-city"
              label="City"
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              value={vehicleApplicationInfo.permanentAddressCity || ''}
              onChange={value => {
                this.handleOnChange({ id: 'permanentAddressCity', value })
              }}
            />
            <SelectField
              id="permanent-address-district"
              label="District"
              value={vehicleApplicationInfo.permanentAddressDistrict || ''}
              onChange={value => {
                this.handleOnChange({ id: 'permanentAddressDistrict', value })
              }}
              itemValue="value"
              menuItems={districts}
              className="md-cell md-cell--12-desktop md-cell--8-tablet  md-cell--4-phone"
              sameWidth
            />
          </div>
          <div
            className="md-cell md-cell--6-desktop md-cell--4-tablet md-cell--4-phone md-grid"
            style={{ margin: '0' }}
          >
            <TextField
              id="phone-1"
              label="Contact #"
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              value={vehicleApplicationInfo.contactNumber || ''}
              onChange={value => {
                this.handleOnChange({ id: 'contactNumber', value })
              }}
            />
            {showIndividualDetails && (
              <TextField
                id="email"
                label="Email"
                className={`md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone`}
                value={vehicleApplicationInfo.email || ''}
                onChange={value => {
                  this.handleOnChange({ id: 'email', value })
                }}
              />
            )}

            {!showIndividualDetails && (
              <TextField
                id="email"
                label="Email"
                className={`md-cell md-cell--6-desktop  md-cell--4-tablet  md-cell--4-phone`}
                value={vehicleApplicationInfo.email || ''}
                onChange={value => {
                  this.handleOnChange({ id: 'email', value })
                }}
              />
            )}

            {!showIndividualDetails && (
              <TextField
                id="postal-code"
                label="Postal Code"
                className="md-cell md-cell--6-desktop  md-cell--4-tablet  md-cell--4-phone"
                value={vehicleApplicationInfo.postalCode || ''}
                onChange={value => {
                  this.handleOnChange({ id: 'postalCode', value })
                }}
              />
            )}

            {showIndividualDetails && (
              <TextField
                id="old-phone-1"
                label="Old Contact #"
                className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
                value={vehicleApplicationInfo.oldContactNumber || ''}
                onChange={value => {
                  this.handleOnChange({ id: 'oldContactNumber', value })
                }}
              />
            )}
          </div>
          <div
            className="md-cell md-cell--6-desktop md-cell--4-tablet md-cell--4-phone md-grid"
            style={{ margin: '0' }}
          >
            <TextField
              id="phone-2"
              label="Other Contact #"
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              value={vehicleApplicationInfo.otherContactNumber || ''}
              onChange={value => {
                this.handleOnChange({ id: 'otherContactNumber', value })
              }}
            />
            {showIndividualDetails && (
              <TextField
                id="postal-code"
                label="Postal Code"
                className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
                value={vehicleApplicationInfo.postalCode || ''}
                onChange={value => {
                  this.handleOnChange({ id: 'postalCode', value })
                }}
              />
            )}

            <TextField
              id="hpa-party"
              label="H.P.A Party"
              disabled={!vehicleApplicationInfo.hpa}
              className="md-cell md-cell--10-desktop md-cell--6-tablet  md-cell--4-phone"
              value={vehicleApplicationInfo.hpaParty || ''}
              onChange={value => {
                this.handleOnChange({ id: 'hpaParty', value })
              }}
            />

            <div
              style={{
                flex: '1',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <SelectionControl
                id="hpa"
                name="hpa"
                label="H.P.A"
                type="checkbox"
                value="hpa"
                checked={vehicleApplicationInfo.hpa}
                onChange={checked => {
                  this.handleOnCheckChange({ id: 'hpa', value: checked })
                }}
              />
            </div>
          </div>
        </div>
        <p className="help-text">
          Please fill all the valid information to continue...
        </p>
      </div>
    )
  }
}

export default Step3

Step3.propTypes = {
  onChange: PropTypes.func,
  onCheckChange: PropTypes.func,
  vehicleApplicationInfo: PropTypes.object,
}
