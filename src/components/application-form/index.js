import React, { Component, Fragment } from 'react';
import {
  ExpansionList,
  ExpansionPanel,
  TextField,
  SelectField,
  SelectionControl,
  DatePicker,
  Button,
} from 'react-md';
import PropTypes from 'prop-types';

import {
  districts,
  vehicleCategories,
  vehiclePurchaseType,
  vehicleBodyType,
  vehicleCommercialCategories,
  taxpayerType,
} from 'libs/consts';

import './styles.scss';

class ApplicationForm extends Component {
  state = {
    selectedSlot: null,
  };
  handleOnVehicleChange = ({ id, value }) => {
    const { onVehicleChange } = this.props;
    onVehicleChange && onVehicleChange({ id, value });
  };
  handleOnInfoChange = ({ id, value }) => {
    const { onInfoChange } = this.props;
    onInfoChange && onInfoChange({ id, value });
  };
  render () {
    const {
      vehicleApplicationInfo,
      vehicleRegistrationInfo,
      currentSession,
      timeSlots,
      reserveSlot,
    } = this.props;
    const { selectedSlot } = this.state;

    const showIndividualDetails =
      vehicleApplicationInfo.ownerType === 'INDIVIDUAL';
    const infoMessageStyle = {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '12px',
      width: '100%',
      textAlign: 'center',
      textTransform: 'uppercase',
      transition: 'width 2s, height 0.5s',
    };
    return (
      <div className="profile-application">
        {/* <h2 className="profile-summary-heading">
          {vehicleApplicationInfo.ownerType} PROFILE SUMMARY
        </h2> */}
        {currentSession.id && (
          <Fragment>
            <p style={{ ...infoMessageStyle, borderTop: '1px solid #ddd' }}>
              {`Your application's Computer Number is:`}
            </p>
            <p
              style={{ ...infoMessageStyle, fontSize: '36px' }}
            >{`${currentSession.id}`}</p>
            {currentSession.ap_time && currentSession.window && (
              <p style={{ ...infoMessageStyle, fontSize: '16px' }}>
                {`Your apointment time is ${currentSession.ap_time} at ${currentSession.window}`}
              </p>
            )}
            <div
              style={{
                ...infoMessageStyle,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {currentSession.ap_time && currentSession.window && (
              <SelectField
                id="select-field-controlled22"
                label="Available Time Slots"
                required
                value={selectedSlot}
                menuItems={timeSlots}
                onChange={selectedSlot => this.setState({ selectedSlot })}
                itemLabel="time_"
                itemValue="id"
                className="md-cell md-cell--4-tablet md-cell--6"
                helpOnFocus
                helpText="Try selecting a value and then selecting the first item in the list."
                errorText={
                  <span>
                    A <em>real</em> value is required for this field
                  </span>
                }
              />
              )}
              {currentSession.ap_time && currentSession.window &&(
              <Button
                flat
                primary
                swapTheming
                onClick={() => reserveSlot(selectedSlot)}
                disabled={!selectedSlot}
              >
                Apply
              </Button>
              )}
            </div>
            <p style={{ ...infoMessageStyle, flex: '1' }}>
              {`Please visit E.T.D Islamabad Office along with original documents.`}{' '}
              <br></br>
              {`Vehicle's registration is subject to:`} <br></br>
              {`1:- Owner's biometric verification from NADRA.`} <br></br>
              {`2:- Vehicle's physical inspection.`} <br></br>
              {`3:- Owner's proof of residence in Islamabad Capital TERRITORY.`}
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
                <p className="tab-heading">
                  OWNER INFORMATION{' '}
                  <span>{`(Person/Company, whose name subjected vehicle is going to register)`}</span>
                </p>
              }
              footer={null}
            >
              {(showIndividualDetails
                ? personalInfoConfig
                : organizationInfoConfig
              ).map((infoConfigGroup, index) => {
                return (
                  <div key={index} className="flexbox-row">
                    {infoConfigGroup.map(infoConfig => {
                      return (
                        <LabelControlGroup
                          key={infoConfig.id}
                          id={infoConfig.id}
                          label={infoConfig.label}
                          value={vehicleApplicationInfo[infoConfig.id]}
                          helpText={infoConfig.helpText}
                          isDropDown={infoConfig.isDropDown || false}
                          menuItems={infoConfig.menuItems || []}
                          handleChange={data => {
                            this.handleOnInfoChange(data);
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
              <div className="flexbox-row" style={{ marginTop: '50px' }}>
                <div className="address-box">
                  <p className="address-box-heading">Temporary Address</p>
                  <div className="control-group">
                    <TextField
                      id="present-address"
                      label="ADDRESS :"
                      rows={3}
                      value={vehicleApplicationInfo.presentAddress || ''}
                      fullWidth
                      onChange={value => {
                        this.handleOnInfoChange({
                          id: 'presentAddress',
                          value,
                        });
                      }}
                    />
                    <TextField
                      id="present-address-city"
                      label="CITY :"
                      value={vehicleApplicationInfo.presentAddressCity || ''}
                      fullWidth
                      onChange={value => {
                        this.handleOnInfoChange({
                          id: 'presentAddressCity',
                          value,
                        });
                      }}
                    />
                    <SelectField
                      id="present-address-district"
                      label="DISTRICT :"
                      value={
                        vehicleApplicationInfo.presentAddressDistrict || ''
                      }
                      onChange={value => {
                        this.handleOnInfoChange({
                          id: 'presentAddressDistrict',
                          value,
                        });
                      }}
                      itemValue="value"
                      menuItems={districts}
                      sameWidth
                      fullWidth
                    />
                  </div>
                </div>
                <div className="address-box">
                  <p className="address-box-heading">Permanent Address</p>
                  <div className="control-group">
                    <TextField
                      id="present-address"
                      label="ADDRESS :"
                      rows={3}
                      value={vehicleApplicationInfo.permanentAddress || ''}
                      fullWidth
                      onChange={value => {
                        this.handleOnInfoChange({
                          id: 'permanentAddress',
                          value,
                        });
                      }}
                    />
                    <TextField
                      id="present-address-city"
                      label="CITY :"
                      value={vehicleApplicationInfo.permanentAddressCity || ''}
                      fullWidth
                      onChange={value => {
                        this.handleOnInfoChange({
                          id: 'permanentAddressCity',
                          value,
                        });
                      }}
                    />
                    <SelectField
                      id="present-address-district"
                      label="DISTRICT :"
                      value={
                        vehicleApplicationInfo.permanentAddressDistrict || ''
                      }
                      onChange={value => {
                        this.handleOnInfoChange({
                          id: 'permanentAddressDistrict',
                          value,
                        });
                      }}
                      itemValue="value"
                      menuItems={districts}
                      sameWidth
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </ExpansionPanel>
            {/* Purchaser Information */}
            <ExpansionPanel
              defaultExpanded
              label={
                <p className="tab-heading">
                  <SelectionControl
                    id="checkbox-vehicleFirstTransfer"
                    name="checkbox-vehicleFirstTransfer"
                    type="checkbox"
                    onChange={checked => {
                      this.handleOnVehicleChange({
                        id: 'vehicleFirstTransfer',
                        value: checked ? 'YES' : 'NO',
                      });
                    }}
                    checked={
                      vehicleRegistrationInfo.vehicleFirstTransfer === 'YES'
                    }
                  />
                  TRANSFER APPLICABLE{' '}
                  <span>{`(Purchaser Information/ person or company whose name vehicle invoice/ bill entry is issued)`}</span>
                </p>
              }
              footer={null}
            >
              {purchaserInfoConfig.map((infoConfigGroup, index) => {
                return (
                  <div key={index} className="flexbox-row">
                    {infoConfigGroup.map(infoConfig => {
                      return (
                        <LabelControlGroup
                          key={infoConfig.id}
                          id={infoConfig.id}
                          label={infoConfig.label}
                          value={vehicleRegistrationInfo[infoConfig.id]}
                          helpText={infoConfig.helpText}
                          isDropDown={infoConfig.isDropDown || false}
                          menuItems={infoConfig.menuItems || []}
                          handleChange={data => {
                            this.handleOnVehicleChange(data);
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </ExpansionPanel>
            {/* Hire Purchase Information */}
            <ExpansionPanel
              defaultExpanded
              label={
                <p className="tab-heading">
                  <SelectionControl
                    id="checkbox-vehicleHirePurchaseAgreement"
                    name="checkbox-vehicleHirePurchaseAgreement"
                    type="checkbox"
                    onChange={checked => {
                      this.handleOnVehicleChange({
                        id: 'vehicleHirePurchaseAgreement',
                        value: checked ? 'YES' : 'NO',
                      });
                    }}
                    checked={
                      vehicleRegistrationInfo.vehicleHirePurchaseAgreement ===
                      'YES'
                    }
                  />
                  HIRE PURCHASE INFORMATION{' '}
                  <span>{`(Pluge with Company / Bank)`}</span>
                </p>
              }
              footer={null}
            >
              {hirePurchaseInfoConfig.map((infoConfigGroup, index) => {
                return (
                  <div key={index} className="flexbox-row">
                    {infoConfigGroup.map(infoConfig => {
                      return (
                        <LabelControlGroup
                          key={infoConfig.id}
                          id={infoConfig.id}
                          label={infoConfig.label}
                          value={vehicleRegistrationInfo[infoConfig.id]}
                          helpText={infoConfig.helpText}
                          isDropDown={infoConfig.isDropDown || false}
                          menuItems={infoConfig.menuItems || []}
                          handleChange={data => {
                            this.handleOnVehicleChange(data);
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </ExpansionPanel>
            {/* TAX PAYER Status Information */}
            <ExpansionPanel
              defaultExpanded
              label={<p className="tab-heading">TAX PAYER CATEGORY</p>}
              footer={null}
            >
              {taxpayerStatusInfoConfig.map((infoConfigGroup, index) => {
                return (
                  <div key={index} className="flexbox-row">
                    {infoConfigGroup.map(infoConfig => {
                      return (
                        <LabelControlGroup
                          key={infoConfig.id}
                          id={infoConfig.id}
                          label={infoConfig.label}
                          value={vehicleRegistrationInfo[infoConfig.id]}
                          helpText={infoConfig.helpText}
                          isDropDown={infoConfig.isDropDown || false}
                          menuItems={infoConfig.menuItems || []}
                          handleChange={data => {
                            this.handleOnVehicleChange(data);
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </ExpansionPanel>
            {/* Vehicle Information */}
            <ExpansionPanel
              defaultExpanded
              label={<p className="tab-heading">VEHICLE INFORMATION</p>}
              footer={null}
            >
              {vehicleInfoConfig.map((infoConfigGroup, index) => {
                return (
                  <div key={index} className="flexbox-row">
                    {infoConfigGroup.map(infoConfig => {
                      if (infoConfig.isDate) {
                        return (
                          <DateControlGroup
                            key={infoConfig.id}
                            id={infoConfig.id}
                            label={infoConfig.label}
                            value={vehicleRegistrationInfo[infoConfig.id]}
                            helpText={infoConfig.helpText}
                            handleChange={data => {
                              this.handleOnVehicleChange(data);
                            }}
                          />
                        );
                      }
                      return (
                        <LabelControlGroup
                          key={infoConfig.id}
                          id={infoConfig.id}
                          label={infoConfig.label}
                          value={vehicleRegistrationInfo[infoConfig.id]}
                          helpText={infoConfig.helpText}
                          isDropDown={infoConfig.isDropDown || false}
                          menuItems={infoConfig.menuItems || []}
                          handleChange={data => {
                            this.handleOnVehicleChange(data);
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </ExpansionPanel>
            {/* Commercial Vehicle Information */}
            <ExpansionPanel
              defaultExpanded
              label={
                <p className="tab-heading">
                  COMMERCIAL VEHICLE <span>{`(ONLY)`}</span>
                </p>
              }
              footer={null}
            >
              {commercialVehicleInfoConfig.map((infoConfigGroup, index) => {
                return (
                  <div key={index} className="flexbox-row">
                    {infoConfigGroup.map(infoConfig => {
                      return (
                        <LabelControlGroup
                          key={infoConfig.id}
                          id={infoConfig.id}
                          label={infoConfig.label}
                          value={vehicleRegistrationInfo[infoConfig.id]}
                          helpText={infoConfig.helpText}
                          isDropDown={infoConfig.isDropDown || false}
                          menuItems={infoConfig.menuItems || []}
                          handleChange={data => {
                            this.handleOnVehicleChange(data);
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </ExpansionPanel>
          </ExpansionList>
        </div>
      </div>
    );
  }
}

export default ApplicationForm;

ApplicationForm.propTypes = {
  onEdit: PropTypes.func,
  onVehicleChange: PropTypes.func,
  onInfoChange: PropTypes.func,
  vehicleApplicationInfo: PropTypes.object,
  vehicleRegistrationInfo: PropTypes.object,
  currentSession: PropTypes.object,
  timeSlots: PropTypes.arrayOf(PropTypes.object),
  reserveSlot: PropTypes.func,
};

const LabelControlGroup = props => {
  return (
    <div className="label-control-group">
      {props.isDropDown && (
        <SelectField
          id={props.id || ''}
          label={props.label || ''}
          value={props.value}
          onChange={value => {
            props.handleChange({ id: props.id, value });
          }}
          itemValue={props.itemValue || 'value'}
          menuItems={props.menuItems || []}
          sameWidth
          fullWidth
        />
      )}
      {!props.isDropDown && (
        <TextField
          id={props.id || ''}
          label={props.label || ''}
          lineDirection="center"
          placeholder={props.placeholder || ''}
          className={props.className || ''}
          value={props.value}
          fullWidth
          onChange={value => {
            props.handleChange({ id: props.id, value });
          }}
          helpText={props.helpText}
        />
      )}
    </div>
  );
};

LabelControlGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  helpText: PropTypes.string,
  itemValue: PropTypes.string,
  menuItems: PropTypes.array,
  isDropDown: PropTypes.bool,
  handleChange: PropTypes.func,
};

const DateControlGroup = props => {
  return (
    <div className="label-control-group">
      <DatePicker
        id={props.id || ''}
        label={props.label || ''}
        lineDirection="center"
        placeholder={props.placeholder || ''}
        className={props.className || ''}
        value={props.value}
        fullWidth
        onChange={value => {
          props.handleChange({ id: props.id, value });
        }}
        helpText={props.helpText}
        displayMode="portrait"
        autoOk
      />
    </div>
  );
};

DateControlGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  helpText: PropTypes.string,
  itemValue: PropTypes.string,
  menuItems: PropTypes.array,
  handleChange: PropTypes.func,
};

const makeArray = count => {
  let result = [];
  for (let index = 1; index < count; index++) {
    result.push({ value: `${index}`, label: `${index}` });
  }
  return result;
};

const personalInfoConfig = [
  [
    {
      id: 'ownerType',
      label: 'OWNERSHIP TYPE :',
      isDropDown: true,
      menuItems: [
        { label: 'INDIVIDUAL', value: 'INDIVIDUAL' },
        { label: 'ORGANIZATION', value: 'ORGANIZATION' },
      ],
    },
    { id: 'ntn', label: 'NTN :' },
  ],
  [
    { id: 'cnic', label: 'CNIC :', helpText: 'i.e: 3740616435939' },
    { id: 'passport', label: 'PASSPORT :' },
  ],
  [{ id: 'ownerName', label: 'NAME :' }],
  [{ id: 'fatherHusbandName', label: 'F/H/W/O NAME :' }],
  [
    {
      id: 'contactNumber',
      label: 'MOBILE NO. :',
      helpText: 'i.e: 923335854784',
    },
  ],
  [
    {
      id: 'otherContactNumber',
      label: 'OTHER PHONE :',
      helpText: 'i.e: 0518854974',
      validate: input => {
        console.log('validated', input);

        return true;
      },
    },
  ],
];

const organizationInfoConfig = [
  [
    {
      id: 'ownerType',
      label: 'OWNERSHIP TYPE :',
      isDropDown: true,
      menuItems: [
        { label: 'INDIVIDUAL', value: 'INDIVIDUAL' },
        { label: 'ORGANIZATION', value: 'ORGANIZATION' },
      ],
    },
    { id: 'ntn', label: 'NTN :' },
  ],
  [{ id: 'ownerName', label: 'NAME :' }],
  [
    {
      id: 'contactNumber',
      label: 'MOBILE NO. :',
      helpText: 'i.e: 923335854784',
    },
  ],
  [
    {
      id: 'otherContactNumber',
      label: 'OTHER PHONE :',
      helpText: 'i.e: 0518854974',
    },
  ],
];

const purchaserInfoConfig = [
  [
    {
      id: 'ownerTypePurchaser',
      label: 'OWNERSHIP TYPE :',
      isDropDown: true,
      menuItems: [
        { label: 'INDIVIDUAL', value: 'INDIVIDUAL' },
        { label: 'ORGANIZATION', value: 'ORGANIZATION' },
      ],
    },
    { id: 'ntnPurchaser', label: 'NTN :' },
  ],
  [
    { id: 'cnicPurchaser', label: 'CNIC :', helpText: 'i.e: 3740616435939' },
    { id: 'passportPurchaser', label: 'PASSPORT :' },
  ],
  [{ id: 'ownerNamePurchaser', label: 'NAME :' }],
  [{ id: 'fatherHusbandNamePurchaser', label: 'F/H/W/O NAME :' }],
];

const hirePurchaseInfoConfig = [
  [{ id: 'vehicleHirePurchaseParty', label: 'BANK/COMPANY NAME :' }],
];

const vehicleInfoConfig = [
  [
    {
      id: 'vehicleCategory',
      label: 'CATEGORY :',
      isDropDown: true,
      menuItems: vehicleCategories,
    },
    {
      id: 'vehiclePurchaseType',
      label: 'PURCHASE TYPE :',
      isDropDown: true,
      menuItems: vehiclePurchaseType,
    },
  ],
  [
    {
      id: 'vehicleBodyType',
      label: 'BODY TYPE :',
      isDropDown: true,
      menuItems: vehicleBodyType,
    },
    {
      id: 'vehicleSeats',
      label: 'NO. OF SEATS :',
      isDropDown: true,
      menuItems: makeArray(200),
    },
  ],
  [
    { id: 'vehicleChasisNumber', label: 'CHASSIS NO. :' },
    { id: 'vehicleEngineNumber', label: 'ENGINE NO. :' },
  ],
  [
    { id: 'vehicleEngineCapacity', label: 'ENGINE SIZE (cc) :' },
    { id: 'vehicleColor', label: 'VEHICLE COLOR :' },
  ],
  [
    { id: 'vehicleValue', label: 'VEHICLE VALUE (Rs.) :' },
    { id: 'vehiclePurchaseDate', label: 'PURCHSE DATE :', isDate: true },
  ],
];

const commercialVehicleInfoConfig = [
  [
    {
      id: 'vehicleCommercialCategory',
      label: 'VEHICLE TYPE :',
      isDropDown: true,
      menuItems: vehicleCommercialCategories,
    },
  ],
  [
    { id: 'vehicleLadenWeight', label: 'LEIDEN WEIGHT (Kg) :' },
    { id: 'vehicleUnLadenWeight', label: 'UNLEIDEN WEIGHT (Kg) :' },
  ],
];

const taxpayerStatusInfoConfig = [
  [
    {
      id: 'taxpayerType',
      label: 'TAX PAYER CATEGORY :',
      isDropDown: true,
      menuItems: taxpayerType,
    },
  ],
];
