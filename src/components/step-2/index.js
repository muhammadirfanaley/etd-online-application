import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextField, SelectField } from 'react-md'

import { countries } from 'libs/consts'

class Step2 extends Component {
  handleOnChange = ({ id, value }) => {
    const { onChange } = this.props
    onChange && onChange({ id, value })
  }
  render () {
    const { vehicleApplicationInfo } = this.props
    const showIndividualDetails =
      vehicleApplicationInfo.ownerType === 'INDIVIDUAL'
    return (
      <div id="step-2" className="step-2">
        <h2>{vehicleApplicationInfo.ownerType} BASIC DETAIL</h2>
        <div className="form-view md-grid">
          {showIndividualDetails && (
            <TextField
              id="cnic"
              label="CNIC"
              className="md-cell md-cell--12-desktop  md-cell--4-tablet  md-cell--4-phone"
              value={vehicleApplicationInfo.cnic || ''}
              onChange={value => {
                this.handleOnChange({ id: 'cnic', value })
              }}
            />
          )}
          <TextField
            id="owner-name"
            label={showIndividualDetails ? 'Owner Name' : 'Organization Name'}
            className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
            value={vehicleApplicationInfo.ownerName || ''}
            onChange={value => {
              this.handleOnChange({ id: 'ownerName', value })
            }}
          />
          {showIndividualDetails && (
            <TextField
              id="father-husband-name"
              label="Father / Husband Name"
              className="md-cell md-cell--12-desktop  md-cell--6-tablet  md-cell--4-phone"
              value={vehicleApplicationInfo.fatherHusbandName || ''}
              onChange={value => {
                this.handleOnChange({ id: 'fatherHusbandName', value })
              }}
            />
          )}
          <TextField
            id="ntn-number"
            label="NTN #"
            className="md-cell md-cell--12-desktop md-cell--6-tablet  md-cell--4-phone"
            value={vehicleApplicationInfo.ntn || ''}
            onChange={value => {
              this.handleOnChange({ id: 'ntn', value })
            }}
          />
          {showIndividualDetails && (
            <TextField
              id="passport"
              label="Passport No."
              className="md-cell md-cell--8-desktop  md-cell--4-tablet  md-cell--4-phone"
              value={vehicleApplicationInfo.passportNumber || ''}
              onChange={value => {
                this.handleOnChange({ id: 'passportNumber', value })
              }}
            />
          )}
          {showIndividualDetails && (
            <SelectField
              id="country-code"
              label="Country"
              value={vehicleApplicationInfo.countryCode || ''}
              onChange={value => {
                this.handleOnChange({ id: 'countryCode', value })
              }}
              itemValue="value"
              menuItems={countries}
              className="md-cell md-cell--4-desktop  md-cell--3-tablet  md-cell--4-phone"
              sameWidth
            />
          )}
        </div>
        <p className="help-text">
          Please fill all the valid information to continue...
        </p>
      </div>
    )
  }
}

export default Step2

Step2.propTypes = {
  onChange: PropTypes.func,
  vehicleApplicationInfo: PropTypes.object,
}
