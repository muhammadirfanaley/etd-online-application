import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextField, SelectField, DatePicker } from 'react-md'

import './styles.scss'

class VehicleRegistrationForm extends Component {
  state = {
    showSubmissionDialog: false,
    currentSession: {},
  }
  handleOnChange = ({ id, value }) => {
    const { onChange } = this.props
    onChange && onChange({ id, value })
  }
  handleError = ({ id, value = '' }) => {
    const { onHandleError } = this.props
    onHandleError && onHandleError({ id, value })
  }
  render () {
    const { style = {}, vehicleRegistrationInfo, errors } = this.props
    return (
      <div className="vehicle-registration-form" style={style}>
        <div className="md-grid" style={{ height: '100%' }}>
          <div className="md-cell md-cell--1-desktop md-cell--8-tablet md-cell--4-phone" />
          <div className="md-cell md-cell--3-desktop md-cell--4-tablet md-cell--4-phone">
            <SelectField
              id="vehicle-category"
              label="Vehicle Category"
              placeholder="Select vehicle category"
              value={vehicleRegistrationInfo.vehicleCategory || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehicleCategory', value })
              }}
              menuItems={['PRIVATE', 'GOVERNMENT', 'COMMERCIAL']}
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              sameWidth
              required={true}
              error={errors.vehicleCategory}
              onBlur={() => {
                this.handleError({ id: 'vehicleCategory', value: '' })
              }}
            />
            <SelectField
              id="vehicle-body-type"
              label="Vehicle Body Type"
              placeholder="Select vehicle body type"
              value={vehicleRegistrationInfo.vehicleBodyType || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehicleBodyType', value })
              }}
              itemValue="value"
              menuItems={[
                {
                  label: 'MOTORCYLCE',
                  value: 'MOTORCYCLE',
                },
                {
                  label: 'MOTOR CAR',
                  value: 'MOTOR CAR',
                },
                {
                  label: 'PICKUP',
                  value: 'PICKUP',
                },
                {
                  label: 'VAN',
                  value: 'VAN',
                },
                {
                  label: 'JEEP',
                  value: 'JEEP',
                },
                {
                  label: 'MINI BUS',
                  value: 'MINI BUS',
                },
                {
                  label: 'BUS',
                  value: 'BUS',
                },
                {
                  label: 'TRUCK',
                  value: 'TRUCK',
                },
              ]}
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              sameWidth
              required={true}
              error={errors.vehicleBodyType}
              onBlur={() => {
                this.handleError({ id: 'vehicleBodyType', value: '' })
              }}
            />
            <SelectField
              id="vehicle-seats"
              label="No. of Seats"
              value={vehicleRegistrationInfo.vehicleSeats || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehicleSeats', value })
              }}
              menuItems={makeArray(200)}
              className="md-cell md-cell--12-desktop  md-cell--4-tablet  md-cell--4-phone"
              sameWidth
            />
            <SelectField
              id="vehicle-purchase-type"
              label="Purchase Type"
              placeholder="Select purchase type"
              value={vehicleRegistrationInfo.vehiclePurchaseType || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehiclePurchaseType', value })
              }}
              menuItems={['LOCAL', 'IMPORTED', 'AUCTIONED']}
              className="md-cell md-cell--12-desktop  md-cell--4-tablet  md-cell--4-phone"
              sameWidth
              required={true}
              error={errors.vehiclePurchaseType}
              onBlur={() => {
                this.handleError({ id: 'vehiclePurchaseType', value: '' })
              }}
            />
            <SelectField
              id="vehicle-commercial-type"
              label="Commercial Vehicle Type"
              placeholder="Select commercial category"
              helpText={`Only for commercial vehicle`}
              value={vehicleRegistrationInfo.vehicleCommercialCategory || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehicleCommercialCategory', value })
              }}
              menuItems={['PASSENGER VEHICLE', 'GOODS VEHICLE']}
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              sameWidth
              error={errors.vehicleCommercialCategory}
              onBlur={() => {
                this.handleError({ id: 'vehicleCommercialCategory', value: '' })
              }}
            />
          </div>
          <div
            className="md-cell md-cell--4-desktop md-cell--8-tablet md-cell--4-phone"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <TextField
              id="vehicle-value"
              label="Vehicle Value (Rs.)"
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              helpText={
                <p className="md-text-field-message">
                  {`Incase of locally manufectured vehicle: vehicle price is mentioned on the sales invoice Incase of imported vehicle: vehicle value can be assessed from bill of entry and can be estimated `}
                  <a href="http://islamabadexcise.gov.pk/CALCULATORS/IMP_CAL.HTM">
                    here
                  </a>
                  {` Incase of auctioned vehicle: vehicle value is mentioned on the auction vouture`}
                </p>
              }
              type="number"
              value={vehicleRegistrationInfo.vehicleValue || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehicleValue', value })
              }}
              required={true}
              error={errors.vehicleValue}
              onBlur={() => {
                this.handleError({ id: 'vehicleValue', value: '' })
              }}
            />
            <TextField
              id="vehicle-chasis-number"
              label="Chasis Number"
              className="md-cell md-cell--6-desktop  md-cell--4-tablet  md-cell--4-phone"
              value={vehicleRegistrationInfo.vehicleChasisNumber || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehicleChasisNumber', value })
              }}
              required={true}
              error={errors.vehicleChasisNumber}
              onBlur={() => {
                this.handleError({ id: 'vehicleChasisNumber', value: '' })
              }}
            />
            <TextField
              id="vehicle-engine-number"
              label="Engine Number"
              className="md-cell md-cell--6-desktop  md-cell--4-tablet  md-cell--4-phone"
              value={vehicleRegistrationInfo.vehicleEngineNumber || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehicleEngineNumber', value })
              }}
              required={true}
              error={errors.vehicleEngineNumber}
              onBlur={() => {
                this.handleError({ id: 'vehicleEngineNumber', value: '' })
              }}
            />
            <TextField
              id="vehicle-engine-capacity"
              label="Engine Capacity (cc)"
              className="md-cell md-cell--6-desktop  md-cell--4-tablet  md-cell--4-phone"
              type="number"
              value={vehicleRegistrationInfo.vehicleEngineCapacity || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehicleEngineCapacity', value })
              }}
              required={true}
              error={errors.vehicleEngineCapacity}
              onBlur={() => {
                this.handleError({ id: 'vehicleEngineCapacity', value: '' })
              }}
            />
            <TextField
              id="vehicle-laden-weight"
              label="Laden Weight (KG)"
              helpText="Only for Commercial Goods Transport"
              className="md-cell md-cell--6-desktop  md-cell--4-tablet  md-cell--4-phone"
              value={vehicleRegistrationInfo.vehicleLadenWeight || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehicleLadenWeight', value })
              }}
            />
            <DatePicker
              id="vehicle-purchase-date"
              label="Purchase Date"
              helpText="Sales certificate/ bill of entry/auction date"
              className="md-cell md-cell--6-desktop md-cell--4-tablet md-cell--4-phone"
              displayMode="portrait"
              autoOk
              value={vehicleRegistrationInfo.vehiclePurchaseDate || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehiclePurchaseDate', value })
                this.handleError({ id: 'vehiclePurchaseDate', value: '' })
              }}
              required={true}
              error={errors.vehiclePurchaseDate}
              onBlur={() => {
                this.handleError({ id: 'vehiclePurchaseDate', value: '' })
              }}
            />
            <TextField
              id="vehicle-registration-number-preference"
              label="Registration Number Preference"
              placeholder={`Enter here any Registration Number Preference`}
              helpText={`i.e. 001, 786, 111, 900, 45`}
              className="md-cell md-cell--6-desktop  md-cell--4-tablet  md-cell--4-phone"
              value={
                vehicleRegistrationInfo.vehicleRegistrationNumberPreference ||
                ''
              }
              onChange={value => {
                this.handleOnChange({
                  id: 'vehicleRegistrationNumberPreference',
                  value,
                })
              }}
              error={errors.vehicleRegistrationNumberPreference}
              onBlur={() => {
                this.handleError({
                  id: 'vehicleRegistrationNumberPreference',
                  value: '',
                })
              }}
            />
          </div>
          <div className="md-cell md-cell--3-desktop md-cell--4-tablet md-cell--4-phone md-grid">
            <SelectField
              id="vehicle-first-transfer"
              label="First Transfer (Applicable/Not Applicable)"
              helpText={`Incase, vehicle is not to be registered in the same name as mentioned on vehicle purchase/import documents, e.g., sales certificate/ bill of entry etc., Please choose 'Yes'`}
              value={vehicleRegistrationInfo.vehicleFirstTransfer || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehicleFirstTransfer', value })
              }}
              menuItems={['YES', 'NO']}
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              sameWidth
              required={true}
              error={errors.vehicleFirstTransfer}
              onBlur={() => {
                this.handleError({ id: 'vehicleFirstTransfer', value: '' })
              }}
            />
            <SelectField
              id="vehicle-hire-purchase-agreement"
              label="Hire-Purchase Agreement (Applicable/Not Applicable)"
              helpText={`Incase, Vehicle is jointly registered with Bank/Company`}
              value={vehicleRegistrationInfo.vehicleHirePurchaseAgreement || ''}
              onChange={value => {
                this.handleOnChange({
                  id: 'vehicleHirePurchaseAgreement',
                  value,
                })
              }}
              menuItems={['YES', 'NO']}
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              sameWidth
              disabled
              required={true}
              error={errors.vehicleHirePurchaseAgreement}
              onBlur={() => {
                this.handleError({
                  id: 'vehicleHirePurchaseAgreement',
                  value: '',
                })
              }}
            />
            <SelectField
              id="vehicle-residential-proof"
              label="Residential Proof"
              helpText={`Applicant is resident of Islamabad City or not`}
              value={vehicleRegistrationInfo.vehicleResidentialProof || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehicleResidentialProof', value })
              }}
              menuItems={['YES', 'NO']}
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              sameWidth
            />
            <SelectField
              id="vehicle-advance-tax-deduction"
              label="Advance TAX Deducted By Manufacturer"
              helpText={`Incase of locally manufactured vehicle, has the manufacturer deducted 
              advance tax or not. (Mentioned in sales invoice`}
              value={vehicleRegistrationInfo.vehicleAdvanceTaxDeduction || ''}
              onChange={value => {
                this.handleOnChange({ id: 'vehicleAdvanceTaxDeduction', value })
              }}
              menuItems={['YES', 'NO']}
              className="md-cell md-cell--12-desktop  md-cell--8-tablet  md-cell--4-phone"
              sameWidth
            />
          </div>
          <div className="md-cell md-cell--1-desktop md-cell--8-tablet md-cell--4-phone md-grid" />
          <div
            style={{
              width: '100%',
            }}
          />
        </div>
        {/* {vehicleRegistrationInfo.taxpayerType === 'FILER' && (
          <Button
            className="floating-calculate-button"
            secondary
            floating
            onClick={() => {
              this.validate()
            }}
            iconEl={
              <SVGIcon>
                <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
              </SVGIcon>
            }
          >
            Register Vehicle
          </Button>
        )} */}
      </div>
    )
  }
}

export default VehicleRegistrationForm

VehicleRegistrationForm.propTypes = {
  onChange: PropTypes.func,
  onHandleError: PropTypes.func,
  vehicleRegistrationInfo: PropTypes.object,
  vehicleApplicationInfo: PropTypes.object,
  style: PropTypes.object,
  errors: PropTypes.object,
}

const makeArray = count => {
  let result = []
  for (let index = 1; index < count; index++) {
    result.push(`${index}`)
  }
  return result
}
