// import apiClient, { API } from '@services/appClient';
// import NavigationService from '@navigations/NavigationService';
import { AppDispatch } from '../../redux/store';
import { setLoading } from './authSlice';

// export const login =
//   (data: any, onSucess?: any, callBack?: any) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setLoading(true));
//     //   const response = await API.authApi.login(data);

//       if (response?.status == 200) {
//         if (response?.data?.user?.otp_verified !== 0) {
//         //   setAccessToken(response?.data?.user?.remember_token);
//         //   setItem(USER_ID, response?.data?.user?.uuid);
//         //   setItem(USER_TYPE, response?.data?.user?.user_type);
//         // }

//         // dispatch(userProfile({ userid: response?.data?.user?.uuid }));
//         // dispatch(getCityList());
//         if (response?.data?.user?.user_type == 2) {

//           if (response?.data?.user?.otp_verified == 0) {
//             let apiData = {
//               email: data.email,
//               // mobile: state?.phone
//             }
//             callBack && callBack()
//             // dispatch(customerVerifySendOtp(apiData))
//             // dispatch(sendOtp(apiData))
//             // callBack && callBack()
//           } else {
//             onSucess && onSucess();
//             // NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR);
//           }
//         }
//         else if (response?.data?.user?.user_type == 1) {
//           onSucess && onSucess();
//         //   NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR_EXECUTIVE)
//         }
//         else {
//           onSucess && onSucess();
//         //   NavigationService.reset(routes?.BOTTOM_TAB_NAVIGATOR_VENDOR);
//         }

//         // Toast.show(response?.message, Toast.LONG);

//         return;
//       } else {
//         throw new Error('No response data received from backend.');
//       }
//     } catch (e: any) {
//       console.log('e', e);

//       Toast.show(e?.response?.data?.message, Toast.LONG);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };
