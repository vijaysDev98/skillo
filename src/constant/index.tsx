import {getScaleSize} from './scaleSize';
import {useString} from './string';
import {SHOW_TOAST, SHOW_SUCCESS_TOAST} from './showToast';
import {
  formatDecimalInput,
  openStripeCheckout,
  arrayIcons,
  requestLocationPermission,
  TABBAR_HEIGHT,
  isImageFile,
  prepareMediaForUpload,
  sanitizeAddressInput,
  sanitizeNameInput,
  serviceproviderIndividualDocs,
  serviceSeekerBusinessDocs,
  serviceProviderBusinessDocs,
} from './utils';
import {Storage} from './storage';
import {REGEX} from './regex';
import {getPeerUser, convertProviderToPeerUser} from './chatUsers';
import * as DummyData from './dummyData'

export {
  getScaleSize,
  useString,
  SHOW_TOAST,
  SHOW_SUCCESS_TOAST,
  Storage,
  arrayIcons,
  REGEX,
  isImageFile,
  formatDecimalInput,
  openStripeCheckout,
  requestLocationPermission,
  TABBAR_HEIGHT,
  getPeerUser,
  convertProviderToPeerUser,
  prepareMediaForUpload,
  sanitizeAddressInput,
  sanitizeNameInput,
  serviceproviderIndividualDocs,
  serviceSeekerBusinessDocs,
  serviceProviderBusinessDocs,
  DummyData,
};
