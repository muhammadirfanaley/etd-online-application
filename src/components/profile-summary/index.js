import React, { Component, Fragment } from 'react'
import { ExpansionList, ExpansionPanel, Button, SVGIcon } from 'react-md'
import PropTypes from 'prop-types'

import './styles.scss'

class ProfileSummary extends Component {
  handleOnChange = ({ id, value }) => {
    const { onVehicleChange } = this.props
    onVehicleChange && onVehicleChange({ id, value })
  }
  componentDidMount () {
    const { vehicleApplicationInfo } = this.props
    if (vehicleApplicationInfo.hpa) {
      this.handleOnChange({
        id: 'vehicleHirePurchaseAgreement',
        value: 'YES',
      })
    } else {
      this.handleOnChange({
        id: 'vehicleHirePurchaseAgreement',
        value: 'NO',
      })
    }
  }
  render () {
    const {
      onEdit,
      vehicleApplicationInfo,
      vehicleRegistrationInfo,
      currentSession,
    } = this.props
    const showIndividualDetails =
      vehicleApplicationInfo.ownerType === 'INDIVIDUAL'
    const infoMessageStyle = {
      color: 'rgba(0,0,0,0.54 )',
      fontSize: '12px',
      width: '100%',
      textAlign: 'center',
      textTransform: 'uppercase',
      transition: 'width 2s, height 0.5s',
    }
    return (
      <div className="profile-summary">
        {/* <h2 className="profile-summary-heading">
          {vehicleApplicationInfo.ownerType} PROFILE SUMMARY
        </h2> */}
        {currentSession.id && (
          <Fragment>
            <p style={{ ...infoMessageStyle, borderTop: '1px solid #ddd' }}>
              {`Your application's Computer Number is:`}
            </p>
            <p style={{ ...infoMessageStyle, fontSize: '36px' }}>{`${
              currentSession.id
            }`}</p>
            <p style={{ ...infoMessageStyle, flex: '1' }}>
              {`Please visit E.T.D Islamabad Office along with original documents.`}
            </p>
          </Fragment>
        )}
        <div
          className="md-grid"
          style={{
            width: '100%',
            overflow: 'auto',
          }}
        >
          <ExpansionList
            className={`md-cell md-cell--12-desktop md-cell--8-tablet md-cell--4-phone`}
          >
            <ExpansionPanel
              defaultExpanded
              label={
                <p
                  style={{
                    margin: '0',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(0,0,0,0.54)',
                    textTransform: 'uppercase',
                    letterSpacing: '5px',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  <SVGIcon
                    size={30}
                    style={{
                      marginRight: '15px',
                    }}
                  >
                    <path
                      fill="#009688"
                      d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                    />
                  </SVGIcon>
                  Basic Details{' '}
                  <Button
                    icon
                    primary
                    onClick={() => {
                      onEdit(2)
                    }}
                  >
                    edit
                  </Button>
                </p>
              }
              footer={null}
            >
              <LabelControlGroup
                label="Owner status:"
                value={vehicleApplicationInfo.ownerStatus}
              />
              <LabelControlGroup
                label="Owner Name:"
                value={vehicleApplicationInfo.ownerName}
              />
              {showIndividualDetails && (
                <LabelControlGroup
                  label="CNIC/ Reg. #:"
                  value={vehicleApplicationInfo.cnic}
                />
              )}
              {showIndividualDetails && (
                <LabelControlGroup
                  label="Passport:"
                  value={vehicleApplicationInfo.passportNumber}
                />
              )}
              {showIndividualDetails && (
                <LabelControlGroup
                  label="Father / Husband Name:"
                  value={vehicleApplicationInfo.fatherHusbandName}
                />
              )}
              <LabelControlGroup
                label="Country Code:"
                value={vehicleApplicationInfo.countryCode}
              />
              <LabelControlGroup
                label="TAX Payer Status:"
                value={vehicleRegistrationInfo.taxpayerType}
              />
            </ExpansionPanel>
            <ExpansionPanel
              defaultExpanded
              label={
                <p
                  style={{
                    margin: '0',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(0, 0, 0, 0.54)',
                    textTransform: 'uppercase',
                    letterSpacing: '5px',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  <SVGIcon
                    size={30}
                    style={{
                      marginRight: '15px',
                    }}
                  >
                    <path
                      fill="#009688"
                      d="M15,19L9,16.89V5L15,7.11M20.5,3C20.44,3 20.39,3 20.34,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z"
                    />
                  </SVGIcon>
                  Address Information{' '}
                  <Button
                    icon
                    primary
                    onClick={() => {
                      onEdit(3)
                    }}
                  >
                    edit
                  </Button>
                </p>
              }
              footer={null}
            >
              <div className="profile-summary-address">
                <div className="profile-summary-address-container">
                  <p className="profile-summary-address-heading">
                    Present Address
                  </p>
                  <LabelControlGroup
                    label="Address:"
                    value={vehicleApplicationInfo.presentAddress}
                  />
                  <LabelControlGroup
                    label="City:"
                    value={vehicleApplicationInfo.presentAddressCity}
                  />
                  <LabelControlGroup
                    label="District:"
                    value={vehicleApplicationInfo.presentAddressDistrict}
                  />
                </div>
                <div className="profile-summary-address-container">
                  <p className="profile-summary-address-heading">
                    Permanent Address
                  </p>
                  <LabelControlGroup
                    label="Address:"
                    value={vehicleApplicationInfo.permanentAddress}
                  />
                  <LabelControlGroup
                    label="City:"
                    value={vehicleApplicationInfo.permanentAddressCity}
                  />
                  <LabelControlGroup
                    label="District:"
                    value={vehicleApplicationInfo.permanentAddressDistrict}
                  />
                </div>
              </div>
            </ExpansionPanel>
            <ExpansionPanel
              defaultExpanded
              label={
                <p
                  style={{
                    margin: '0',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(0, 0, 0, 0.54)',
                    textTransform: 'uppercase',
                    letterSpacing: '5px',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  <SVGIcon
                    size={30}
                    style={{
                      marginRight: '15px',
                    }}
                  >
                    <path
                      fill="#009688"
                      d="M21,8V7L18,9L15,7V8L18,10M22,3H2A2,2 0 0,0 0,5V19A2,2 0 0,0 2,21H22A2,2 0 0,0 24,19V5A2,2 0 0,0 22,3M8,6A3,3 0 0,1 11,9A3,3 0 0,1 8,12A3,3 0 0,1 5,9A3,3 0 0,1 8,6M14,18H2V17C2,15 6,13.9 8,13.9C10,13.9 14,15 14,17M22,12H14V6H22"
                    />
                  </SVGIcon>
                  Contact{' '}
                  <Button
                    icon
                    primary
                    onClick={() => {
                      onEdit(3)
                    }}
                  >
                    edit
                  </Button>
                </p>
              }
              footer={null}
            >
              <LabelControlGroup
                label="Contact #:"
                value={vehicleApplicationInfo.contactNumber}
              />
              <LabelControlGroup
                label="Email:"
                value={vehicleApplicationInfo.email}
              />
              <LabelControlGroup
                label="Other Contact #:"
                value={vehicleApplicationInfo.otherContactNumber}
              />
              {showIndividualDetails && (
                <LabelControlGroup
                  label="Old Contact #:"
                  value={vehicleApplicationInfo.oldContactNumber}
                />
              )}
              <LabelControlGroup
                label="Postal Code:"
                value={vehicleApplicationInfo.postalCode}
              />
              <LabelControlGroup
                label="N.T.N #:"
                value={vehicleApplicationInfo.ntn}
              />
              <LabelControlGroup
                label="H.P.A:"
                value={
                  <SVGIcon size={24}>
                    {vehicleApplicationInfo.hpa ? (
                      <path
                        fill="#4caf50"
                        d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                      />
                    ) : (
                      <path
                        fill="#e53935"
                        d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"
                      />
                    )}
                  </SVGIcon>
                }
              />
            </ExpansionPanel>
            <ExpansionPanel
              defaultExpanded
              label={
                <p
                  style={{
                    margin: '0',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(0, 0, 0, 0.54)',
                    textTransform: 'uppercase',
                    letterSpacing: '5px',
                    fontSize: '14px',
                    fontWeight: '400',
                  }}
                >
                  <SVGIcon
                    size={30}
                    style={{
                      marginRight: '15px',
                    }}
                  >
                    <path
                      fill="#009688"
                      d="M8,11L9.5,6.5H18.5L20,11M18.5,16A1.5,1.5 0 0,1 17,14.5A1.5,1.5 0 0,1 18.5,13A1.5,1.5 0 0,1 20,14.5A1.5,1.5 0 0,1 18.5,16M9.5,16A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 9.5,13A1.5,1.5 0 0,1 11,14.5A1.5,1.5 0 0,1 9.5,16M19.92,6C19.71,5.4 19.14,5 18.5,5H9.5C8.86,5 8.29,5.4 8.08,6L6,12V20A1,1 0 0,0 7,21H8A1,1 0 0,0 9,20V19H19V20A1,1 0 0,0 20,21H21A1,1 0 0,0 22,20V12L19.92,6M14.92,3C14.71,2.4 14.14,2 13.5,2H4.5C3.86,2 3.29,2.4 3.08,3L1,9V17A1,1 0 0,0 2,18H3A1,1 0 0,0 4,17V12.91C3.22,12.63 2.82,11.77 3.1,11C3.32,10.4 3.87,10 4.5,10H4.57L5.27,8H3L4.5,3.5H15.09L14.92,3Z"
                    />
                  </SVGIcon>
                  Vehicle Registration{' '}
                  <Button
                    icon
                    primary
                    onClick={() => {
                      onEdit(5)
                    }}
                  >
                    edit
                  </Button>
                </p>
              }
              footer={null}
            >
              {vehicleInfoConfig.map(info => {
                return (
                  <LabelControlGroup
                    key={info.id}
                    label={`${info.label}:`}
                    value={vehicleRegistrationInfo[info.id]}
                  />
                )
              })}
              {vehicleInfoConfigWithYesNo.map(info => {
                return (
                  <LabelControlGroup
                    key={info.id}
                    label={`${info.label}:`}
                    value={
                      <SVGIcon size={24}>
                        {vehicleRegistrationInfo[info.id] === 'YES' ? (
                          <path
                            fill="#4caf50"
                            d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                          />
                        ) : (
                          <path
                            fill="#e53935"
                            d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"
                          />
                        )}
                      </SVGIcon>
                    }
                  />
                )
              })}
            </ExpansionPanel>
          </ExpansionList>
        </div>
      </div>
    )
  }
}

export default ProfileSummary

ProfileSummary.propTypes = {
  onEdit: PropTypes.func,
  onVehicleChange: PropTypes.func,
  vehicleApplicationInfo: PropTypes.object,
  vehicleRegistrationInfo: PropTypes.object,
  currentSession: PropTypes.object,
}

const LabelControlGroup = props => {
  return (
    <div className="label-control-group">
      <div className="label-control">{props.label || 'Label'}</div>
      <div className="value-control">{props.value || '--'}</div>
    </div>
  )
}

LabelControlGroup.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
}

const vehicleInfoConfig = [
  { id: 'vehicleValue', label: 'Vehicle Value (Rs.)' },
  { id: 'vehicleEngineCapacity', label: 'Engine Capacity (cc)' },
  { id: 'vehicleEngineNumber', label: 'Engine #' },
  { id: 'vehicleBodyType', label: 'Body Type' },
  { id: 'vehicleChasisNumber', label: 'Chasis #' },
  { id: 'vehicleSeats', label: 'Vehicle Seats' },
  { id: 'vehicleCategory', label: 'Category' },
  { id: 'vehicleCommercialCategory', label: 'Commercial Category' },
  { id: 'vehicleLadenWeight', label: 'Laden Weight (Kg)' },
  { id: 'vehiclePurchaseDate', label: 'Purchase Date (MM/DD/YYYY)' },
  { id: 'vehiclePurchaseType', label: 'Purchase Type' },
  { id: 'vehicleRegistrationNumberPreference', label: 'Registration # Ref.' },
]

const vehicleInfoConfigWithYesNo = [
  { id: 'vehicleFirstTransfer', label: 'First Transfer' },
  { id: 'vehicleResidentialProof', label: 'Residential Proof' },
  { id: 'vehicleAdvanceTaxDeduction', label: 'Advance TAX Deduction' },
]
