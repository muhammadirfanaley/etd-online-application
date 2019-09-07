import React, { Component, Fragment } from 'react';
import { Button, SVGIcon, CircularProgress } from 'react-md';
import PropTypes from 'prop-types';
import axios from 'axios';

import Step1 from 'components/step-1';
import Step2 from 'components/step-2';
import Step3 from 'components/step-3';
import ApplicationForm from 'components/application-form';
import VehicleRegistrationTaxpayerSelection from 'components/vehicle-registration-taxpayer-selection';
import VehicleRegistrationForm from 'components/vehicle-registration-form';

import { getMapping, resolveCase } from 'libs/dictionary';

import './styles.scss';

class Home extends Component {
  state = {
    timeSlots: [],
    fetching: false,
    vehicleApplicationInfo: {
      ownerType: '',
    },
    vehicleRegistrationInfo: {
      taxpayerType: '',
      vehicleHirePurchaseAgreement: 'NO',
      vehicleFirstTransfer: 'NO',
    },
    step: 4,
    errors: {},
    currentSession: {},
    search: {
      computerId: '',
      chasisNumber: '',
    },
  };
  /** GET AVAILABLE TIME SLOTS */

  getTimeSlots = async () => {
    this.setState({ fetching: true });
    try {
      this.setState({ fetching: true });
      const { data } = await axios('etd-online-be/getTimeSlots.php');
      this.setState({ timeSlots: data.map(ts => resolveCase(ts)) || [] });
    } catch (error) {
      alert(error);
    } finally {
      this.setState({ fetching: false });
    }
  };

  /**
   *  RESERVE SLOT
   *
   */

  reserveSlot = async slot => {
    if (!slot) {
      alert('No Slot Selected');
      return;
    }
    const { currentSession } = this.state;

    if (!currentSession.id) {
      alert('Current Session expired');
      return;
    }

    const payload = {
      computerId: currentSession.id,
      chasis: currentSession.veh_chasis_no,
      session_id: currentSession.session_id,
      timeSlot: Number(slot),
    };

    this.setState({ fetching: true });
    try {
      this.setState({ fetching: true });
      await axios('etd-online-be/updateTimeSlot.php', {
        method: 'post',
        data: payload,
      });
      alert('Slot Reserved Successfully');
    } catch (error) {
      alert(error);
    } finally {
      this.setState({ fetching: false });
    }
  };

  handleError = ({ id, value = '' }) => {
    const { errors } = this.state;
    this.setState({
      errors: {
        ...errors,
        [id]: value,
      },
    });
  };
  getApplicationById = ({ context, computerId, chasisNumber }) => {
    this.setState({ fetching: true });
    axios({
      method: 'post',
      url: '/etd-online-be/get.php',
      data: {
        computerId,
        chasis: chasisNumber,
      },
    })
      .then(response => {
        const { data = [] } = response;
        const [dataInstance] = data;

        if (data.length > 0) {
          let tempState = {};
          Object.keys(dataInstance).forEach(keyIndex => {
            const mapping = getMapping(keyIndex);

            if (mapping.stateVariable && mapping.inputVariable) {
              tempState = {
                ...tempState,
                [mapping.stateVariable]: {
                  ...(tempState[mapping.stateVariable] || {}),
                  [mapping.inputVariable]: dataInstance[keyIndex],
                },
              };
            }
          });

          this.setState({
            ...tempState,
            currentSession: resolveCase(dataInstance),
          });
          console.log('Application loaded successfully.');
        } else {
          alert('Please enter valid Application Computer ID and Chasis No.');
          context.setState({
            currentSession: {},
            search: {
              computerId: '',
              chasisNumber: '',
            },
            vehicleApplicationInfo: {
              ownerType: '',
            },
            vehicleRegistrationInfo: {
              taxpayerType: '',
            },
          });
        }
        this.getTimeSlots();
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => this.setState({ fetching: false }));
  };
  handleSubmitAXIOS = context => {
    const {
      vehicleRegistrationInfo,
      vehicleApplicationInfo,
      currentSession,
    } = context.state;

    this.setState({ fetching: true });

    axios({
      method: 'post',
      url: '/etd-online-be/',
      data: currentSession.id
        ? {
          meta: {
            computerNumber: currentSession.id,
          },
          buyer: vehicleApplicationInfo,
          purchaser: vehicleApplicationInfo,
          vehicle: vehicleRegistrationInfo,
        }
        : {
          buyer: vehicleApplicationInfo,
          purchaser: vehicleApplicationInfo,
          vehicle: vehicleRegistrationInfo,
        },
    })
      .then(response => {
        const { data = [] } = response;
        if (data.length > 0) {
          context.setState({
            currentSession: resolveCase(data[0]),
          });
          alert('Application saved successfully');
          this.getTimeSlots();
        }
      })
      .catch(error => {
        console.log({ error });
        alert('Error while trying to save application. Please Try Again!');
      })
      .finally(() => this.setState({ fetching: false }));
  };
  validate = () => {
    const { vehicleRegistrationInfo } = this.state;
    const {
      vehicleCategory = '',
      vehiclePurchaseType = '',
      vehicleBodyType = '',
      vehicleFirstTransfer = '',
      vehicleHirePurchaseAgreement = '',
      vehicleCommercialCategory = '',
      vehiclePurchaseDate = '',
      vehicleRegistrationNumberPreference = '',
      vehicleValue = '',
      vehicleEngineCapacity = '',
      vehicleEngineNumber = '',
      vehicleChasisNumber = '',
    } = vehicleRegistrationInfo;
    if (vehicleCategory === '') {
      alert('Please select the catagory.');
      this.handleError({
        id: 'vehicleCategory',
        value: 'Please select the catagory.',
      });
      return false;
    }
    if (vehiclePurchaseType === '') {
      alert('Please select the purchase type.');
      this.handleError({
        id: 'vehiclePurchaseType',
        value: 'Please select the purchase type.',
      });
      return false;
    }
    if (vehicleBodyType === '') {
      alert('Please select the body type.');
      this.handleError({
        id: 'vehicleBodyType',
        value: 'Please select the body type.',
      });
      return false;
    }
    if (vehicleFirstTransfer === '') {
      alert('Please select the Transfer (Applicable or not).');
      this.handleError({
        id: 'vehicleFirstTransfer',
        value: 'Please select the Transfer (Applicable or not).',
      });
      return false;
    }
    if (vehicleHirePurchaseAgreement === '') {
      alert('Please select the HPA (Applicable or not).');
      this.handleError({
        id: 'vehicleHirePurchaseAgreement',
        value: 'Please select the HPA (Applicable or not).',
      });
      return false;
    }
    if (vehicleCategory === 'COMMERCIAL' && vehicleCommercialCategory === '') {
      alert('Please select the Commercial Vehicle Category.');
      this.handleError({
        id: 'vehicleCommercialCategory',
        value: 'Please select the Commercial Vehicle Category.',
      });
      return false;
    }
    if (vehiclePurchaseDate === '') {
      alert('Please enter the delivery date.');
      this.handleError({
        id: 'vehiclePurchaseDate',
        value: 'Please enter the delivery date.',
      });
      return false;
    }
    if (
      vehicleRegistrationNumberPreference !== '-' &&
      parseFloat(vehicleRegistrationNumberPreference) > 999
    ) {
      alert('Please enter correct registration number.');
      this.handleError({
        id: 'vehicleRegistrationNumberPreference',
        value: 'Please enter correct registration number.',
      });
      return false;
    }
    if (vehicleValue === '') {
      alert('Please enter the vehicle value (In Rs.).');
      this.handleError({
        id: 'vehicleValue',
        value: 'Please enter the vehicle value (In Rs.).',
      });
      return false;
    }
    if (vehicleEngineCapacity === '') {
      alert('Please enter the vehicle engine capacity (in CC).');
      this.handleError({
        id: 'vehicleEngineCapacity',
        value: 'Please enter the vehicle engine capacity (in CC).',
      });
      return false;
    }
    if (vehicleEngineNumber === '') {
      alert('Please enter the vehicle engine number.');
      this.handleError({
        id: 'vehicleEngineNumber',
        value: 'Please enter the vehicle engine number.',
      });
      return false;
    }
    if (vehicleChasisNumber === '') {
      alert('Please enter the vehicle chasis number.');
      this.handleError({
        id: 'vehicleChasisNumber',
        value: 'Please enter the vehicle chasis number.',
      });
      return false;
    }
    this.handleSubmitAXIOS(this);
  };
  handleOnChange = (stateVairable, { id, value }) => {
    if (id === 'email') {
      this.setState({
        [stateVairable]: {
          ...this.state[stateVairable],
          [id]: value,
        },
      });
    } else {
      this.setState({
        [stateVairable]: {
          ...this.state[stateVairable],
          [id]: value.toUpperCase(),
        },
      });
    }
  };
  handleOnCheckChange = ({ id, value }) => {
    const { vehicleApplicationInfo } = this.state;
    this.setState({
      vehicleApplicationInfo: {
        ...vehicleApplicationInfo,
        [id]: value,
      },
    });
  };
  handleOwnerSelection = ownerType => {
    const { vehicleApplicationInfo } = this.state;
    this.setState({
      vehicleApplicationInfo: {
        ...vehicleApplicationInfo,
        ownerType,
      },
    });
  };
  handleTaxpayerSelection = taxpayerType => {
    const { vehicleRegistrationInfo } = this.state;
    this.setState({
      vehicleRegistrationInfo: {
        ...vehicleRegistrationInfo,
        taxpayerType,
      },
    });
  };
  render () {
    const {
      step,
      vehicleApplicationInfo,
      vehicleRegistrationInfo,
      search,
      fetching,
    } = this.state;
    return (
      <div className="vehicle-registration">
        <div className="top-bar md-paper--1">
          <div className="top-bar-logo">
            {/* <p>Online Application Filling System</p> */}
            <p>New / Imported Vehicle Registration [Trial Version]</p>
          </div>

          <div className="top-bar-actions">
            <div className="control-group">
              <label>Application Computer ID</label>
              <input
                onChange={e => {
                  this.setState({
                    search: {
                      ...search,
                      computerId: e.target.value,
                    },
                  });
                }}
                placeholder="Enter Application Computer No."
              />
            </div>
            <div className="control-group">
              <label>Chasis Number</label>
              <input
                onChange={e => {
                  this.setState({
                    search: {
                      ...search,
                      chasisNumber: e.target.value,
                    },
                  });
                }}
                placeholder="Enter Vehicle Chasis No."
              />
            </div>
            {/* <input
              onChange={e => {
                this.setState({
                  search: {
                    text: e.target.value,
                  },
                })
              }}
              placeholder="Enter Application Computer No."
            /> */}
            <div className="control-group">
              <Button
                onClick={() => {
                  if (search.computerId && search.chasisNumber) {
                    this.getApplicationById({
                      context: this,
                      computerId: search.computerId,
                      chasisNumber: search.chasisNumber,
                    });
                  } else {
                    alert(
                      'Please enter valid Application Computer ID and Chasis No.',
                    );
                  }
                }}
                flat
              >
                Search
              </Button>
            </div>
          </div>
        </div>
        <h2
          style={{
            margin: '10px 0',
            display: 'none',
          }}
        >
          New / Imported Vehicle Registration
        </h2>
        <div className="divider" />
        {fetching && (
          <div>
            <CircularProgress>Loading...</CircularProgress>
          </div>
        )}
        {step === 1 && (
          <Fragment>
            <Step1
              {...this.state}
              onOwnerSelection={ownerType => {
                this.handleOwnerSelection(ownerType);
              }}
            />
            <div className="stepper-actions">
              <Next
                nextStep={4}
                label="Continue"
                onNextClick={step => {
                  this.setState({
                    step,
                  });
                }}
                disabled={vehicleApplicationInfo.ownerType === ''}
              />
            </div>
          </Fragment>
        )}
        {step === 2 && (
          <Fragment>
            <Step2
              {...this.state}
              onChange={({ id, value }) => {
                this.handleOnChange('vehicleApplicationInfo', { id, value });
              }}
            />
            <div className="stepper-actions">
              <Back
                prevStep={4}
                label="Back"
                onBackClick={step => {
                  this.setState({
                    step,
                  });
                }}
                disabled={vehicleApplicationInfo.ownerType === ''}
              />
            </div>
          </Fragment>
        )}
        {step === 3 && (
          <Fragment>
            <Step3
              {...this.state}
              onChange={({ id, value }) => {
                this.handleOnChange('vehicleApplicationInfo', { id, value });
              }}
              onCheckChange={({ id, value }) => {
                this.handleOnCheckChange({ id, value });
              }}
            />
            <div className="stepper-actions">
              <Back
                prevStep={4}
                label="Back"
                onBackClick={step => {
                  this.setState({
                    step,
                  });
                }}
                disabled={vehicleApplicationInfo.ownerType === ''}
              />
            </div>
          </Fragment>
        )}
        {step === 4 && (
          <Fragment>
            <ApplicationForm
              {...this.state}
              reserveSlot={this.reserveSlot}
              onVehicleChange={({ id, value }) => {
                this.handleOnChange('vehicleRegistrationInfo', { id, value });
              }}
              onInfoChange={({ id, value }) => {
                this.handleOnChange('vehicleApplicationInfo', { id, value });
              }}
            />
            <div className="stepper-actions">
              <Next
                nextStep={5}
                label={`Save Vehicle Registration`}
                icon={
                  <SVGIcon>
                    <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                  </SVGIcon>
                }
                onNextClick={step => {
                  window.scrollTo(1, 1);
                  this.validate();
                }}
                disabled={vehicleApplicationInfo.ownerType === ''}
              />
            </div>
          </Fragment>
        )}
        {/* {step === 4 && (
          <Fragment>
            <ProfileSummary
              {...this.state}
              onEdit={step => {
                this.setState({
                  step,
                })
              }}
              onVehicleChange={({ id, value }) => {
                this.handleOnChange('vehicleRegistrationInfo', { id, value })
              }}
            />
            {vehicleRegistrationInfo.taxpayerType === 'FILER' && (
              <div className="stepper-actions">
                <Next
                  nextStep={5}
                  label={`Save Vehicle Registration`}
                  icon={
                    <SVGIcon>
                      <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                    </SVGIcon>
                  }
                  onNextClick={step => {
                    this.validate()
                  }}
                  disabled={vehicleApplicationInfo.ownerType === ''}
                />
              </div>
            )}
          </Fragment>
        )} */}
        {step === 5 && (
          <Fragment>
            <VehicleRegistrationTaxpayerSelection
              {...this.state}
              onTaxpayerSelection={taxpayerType => {
                this.handleTaxpayerSelection(taxpayerType);
              }}
            />
            {vehicleRegistrationInfo.taxpayerType !== 'NON-FILER' && (
              <VehicleRegistrationForm
                {...this.state}
                style={
                  vehicleRegistrationInfo.taxpayerType === 'FILER'
                    ? {}
                    : { height: '0px', display: 'none' }
                }
                onChange={({ id, value }) => {
                  this.handleOnChange('vehicleRegistrationInfo', { id, value });
                }}
                onHandleError={({ id, value = '' }) => {
                  this.handleError({ id, value });
                }}
              />
            )}
            {vehicleRegistrationInfo.taxpayerType === 'NON-FILER' && (
              <p
                style={{
                  color: 'rgba(0,0,0,0.54 )',
                  fontSize: '18px',
                  height: '460px',
                  borderTop: '1px solid #ddd',
                  width: '100%',
                  padding: '10px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  transition: 'width 2s, height 0.5s',
                }}
              >
                {`Sorry, `}
                <u>{`non-filers are not Eligible`}</u>
                {` for (New / Imported) Vehicle Registration`}
              </p>
            )}
            <div className="stepper-actions">
              <Back
                prevStep={4}
                label="Back"
                onBackClick={step => {
                  this.setState({
                    step,
                  });
                }}
                disabled={vehicleApplicationInfo.ownerType === ''}
              />
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Home;

const Next = props => {
  return (
    <Button
      flat
      disabled={props.disabled}
      primary
      iconBefore={false}
      iconEl={
        props.icon || (
          <SVGIcon>
            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
          </SVGIcon>
        )
      }
      onClick={() => {
        props.onNextClick(props.nextStep || 1);
      }}
    >
      {props.label || 'Next'}
    </Button>
  );
};
Next.propTypes = {
  disabled: PropTypes.bool,
  onNextClick: PropTypes.func,
  nextStep: PropTypes.number,
  label: PropTypes.string,
  onPreviuosClick: PropTypes.func,
  icon: PropTypes.SVGIcon,
};

const Back = props => {
  return (
    <Button
      flat
      disabled={props.disabled}
      primary
      iconBefore={true}
      iconEl={
        <SVGIcon>
          <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
        </SVGIcon>
      }
      onClick={() => {
        props.onBackClick(props.prevStep || -1);
      }}
    >
      {props.label || 'Previous'}
    </Button>
  );
};

Back.propTypes = {
  disabled: PropTypes.bool,
  onBackClick: PropTypes.func,
  prevStep: PropTypes.number,
  label: PropTypes.string,
  onPreviuosClick: PropTypes.func,
};
