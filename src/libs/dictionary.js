export const dictionary = {
  vehicleApplicationInfo: [
    'cnic',
    'contactNumber',
    'fatherHusbandName',
    'ntn',
    'otherContactNumber',
    'ownerName',
    'ownerType',
    'passport',
    'permanentAddress',
    'permanentAddressCity',
    'permanentAddressDistrict',
    'presentAddress',
    'presentAddressCity',
    'presentAddressDistrict',
    'id',
    'apTime',
    'window',
  ],
  vehicleRegistrationInfo: [
    'cnicPurchaser',
    'fatherHusbandNamePurchaser',
    'ntnPurchaser',
    'ownerNamePurchaser',
    'ownerTypePurchaser',
    'passportPurchaser',
    'taxpayerType',
    'vehicleBodyType',
    'vehicleCategory',
    'vehicleChasisNumber',
    'vehicleColor',
    'vehicleCommercialCategory',
    'vehicleEngineCapacity',
    'vehicleEngineNumber',
    'vehicleFirstTransfer',
    'vehicleHirePurchaseAgreement',
    'vehicleHirePurchaseParty',
    'vehicleLadenWeight',
    'vehiclePurchaseDate',
    'vehiclePurchaseType',
    'vehicleSeats',
    'vehicleUnLadenWeight',
    'vehicleValue',
  ],
};

export const mapping = {
  owner_type: 'ownerType',
  cnic: 'cnic',
  ntn: 'ntn',
  passport_no: 'passportNumber',
  country: 'countryCode',
  name: 'ownerName',
  f_name: 'fatherHusbandName',
  temp_address: 'presentAddress',
  temp_city: 'presentAddressCity',
  temp_dist: 'presentAddressDistrict',
  prmnt_address: 'permanentAddress',
  prmnt_city: 'permanentAddressCity',
  prmnt_district: 'permanentAddressDistrict',
  contact_no: 'contactNumber',
  email: 'email',
  other_contact_number: 'otherContactNumber',
  hpa: 'vehicleHirePurchaseAgreement',
  veh_chasis_no: 'vehicleChasisNumber',
  veh_engine_no: 'vehicleEngineNumber',
  veh_category: 'vehicleCategory',
  veh_body_type: 'vehicleBodyType',
  no_of_seats: 'vehicleSeats',
  purchase_type: 'vehiclePurchaseType',
  commercial_type: 'vehicleCommercialCategory',
  vehicle_value: 'vehicleValue',
  engine_capacity: 'vehicleEngineCapacity',
  laden_weight: 'vehicleLadenWeight',
  purchase_date: 'vehiclePurchaseDate',
  cnic_purchaser: 'cnicPurchaser',
  f_h_name_purchaser: 'fatherHusbandNamePurchaser',
  ntn_purchaser: 'ntnPurchaser',
  owner_name_purchaser: 'ownerNamePurchaser',
  owner_type_purchaser: 'ownerTypePurchaser',
  passport_purchaser: 'passportPurchaser',
  taxpayer_type: 'taxpayerType',
  vehicle_color: 'vehicleColor',
  vehicle_first_transfer: 'vehicleFirstTransfer',
  vehicle_hire_purchase_party: 'vehicleHirePurchaseParty',
  vehicle_unladen_weight: 'vehicleUnLadenWeight',
  id: 'id',
  ap_time: 'apTime',
  window: 'window',
};

/**
 * Skip Case
 * @param {*} key
 */

export const resolveCase = dataInstance => {
  return Object.keys(dataInstance).reduce((sum, next) => {
    sum[next.toLowerCase()] = dataInstance[next];
    return sum;
  }, {});
};

export const getMapping = key => {
  key = key.toLowerCase();

  if (mapping[key]) {
    let stateVariable = ``;
    let inputVariable = ``;
    Object.keys(dictionary).forEach(dictionaryIndex => {
      if (dictionary[dictionaryIndex].includes(mapping[key])) {
        stateVariable = dictionaryIndex;
        inputVariable = mapping[key];
      }
    });
    return {
      stateVariable,
      inputVariable,
    };
  }
  return {
    stateVariable: null,
    inputVariable: null,
  };
};
