import { API } from "../../api";
import { SHOW_TOAST, Storage } from "../../constant";
import { userRoles } from "../../constant/utils";
import { AppDispatch } from "../../redux/store";
import { SCREENS } from "../../screens";
import NavigationService from "../../screens/NavigationService";
import { resetAuth, setAllCategoriesData, setLoading, setUserData } from "./authSlice";

export const loginAction = (data: any, onSuccess?: (resp?: any) => void, onError?: () => void) =>
    async (dispatch: AppDispatch) => {
        try {
            setLoading(true);
            const result = await API.Instance.post(API.API_ROUTES.auth.login, data);
            if (result.status) {
                Storage.save(Storage.USER_DETAILS, JSON.stringify(result?.data?.data));
                onSuccess?.(result?.data?.data)
                if (
                    result?.data?.data?.user_data?.role == userRoles.Service_Provider_business ||
                    result?.data?.data?.user_data?.role == userRoles.Service_Provider_individual
                ) {
                    dispatch(getProviderProfile())
                } else {
                    dispatch(getSeekerProfile())
                }

                NavigationService.reset(SCREENS.BottomBar.identifier)
            } else {
                SHOW_TOAST(result?.data?.message, 'error');
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? '', 'error');
        } finally {
            setLoading(false);
        }
    }

export const signUpAction =
    (data: any, onSuccess?: any, callBack?: any) =>
        async (dispatch: AppDispatch) => {
            try {
                dispatch(setLoading(true));

                const response = await API.Instance.post(
                    API.API_ROUTES.auth.signup,
                    data
                );
                // ✅ SUCCESS
                if (response?.status) {
                    const meta = response?.data?.data ?? {};


                    if (meta?.is_email_verified === true && meta?.is_password_created === false) {
                        SHOW_TOAST("Create Password Pending", "success");
                        NavigationService.navigate(SCREENS.CreatePassword.identifier, {
                            email: data?.email,
                            id: meta?.id,
                        });
                    } else if (
                        meta?.is_email_verified === true &&
                        meta?.is_password_created === true &&
                        meta?.is_details_completed === false
                    ) {
                        SHOW_TOAST("Personal Details Pending", "success");
                        Storage.save(Storage.USER_DETAILS, JSON.stringify(response?.data?.data));
                        NavigationService.navigate(SCREENS.AddPersonalDetails.identifier, {
                            email: data?.email,
                            id: meta?.id,
                        });
                    }
                    else if (meta?.is_email_verified === true &&
                        meta?.is_password_created === true &&
                        meta?.is_details_completed === true) {
                        SHOW_TOAST("User Already Registered", "success");
                        NavigationService.navigate(SCREENS.Login.identifier)
                    }
                    else {
                        Storage.clear()
                        SHOW_TOAST("Otp Send In Mail", "success");
                        NavigationService.navigate(SCREENS.Otp.identifier, {
                            isFromSignup: true,
                            email: data?.email,
                            id: meta?.id,
                        });
                    }

                    onSuccess?.();
                    return;
                }

                // ❌ ERROR HANDLING
                const message = (response as any)?.message || response?.data?.message;
                const code = (response as any)?.code || response?.data?.code;

                if (code === 409) {
                    switch (message) {
                        case "otp_already_sent":
                            Storage.clear()
                            NavigationService.navigate(SCREENS.Otp.identifier, {
                                isFromSignup: true,
                                email: data?.email,
                                id: response?.data?.id,
                            });
                            break;

                        case "OTP already verified. Redirect to Password page.":
                            NavigationService.navigate(SCREENS.CreatePassword.identifier, {
                                email: data?.email,
                                id: response?.data?.id,
                            });
                            break;

                        case "Password already set. Redirect to Details page.":
                            NavigationService.navigate(SCREENS.AddPersonalDetails.identifier, {
                                email: data?.email,
                                id: response?.data?.id,
                            });
                            break;

                        default:
                            SHOW_TOAST(message ?? "Something went wrong", "error");
                    }
                } else {
                    SHOW_TOAST(message ?? "Something went wrong", "error");
                }

                callBack?.();

            } catch (e: any) {
                console.log("Signup Error:", e);

                const errorMessage =
                    e?.message ||
                    e?.response?.data?.message ||
                    "Something went wrong";

                SHOW_TOAST(errorMessage, "error");
            } finally {
                dispatch(setLoading(false));
            }
        };

export const verifyOtpAction =
    (data: any, onSuccess?: any, callBack?: any) =>
        async (dispatch: AppDispatch) => {
            try {
                dispatch(setLoading(true));
                let apiData = {
                    email: data?.email,
                    otp: data?.otp,
                }

                const result: any = await API.Instance.post(API.API_ROUTES.auth.verifyOtp, apiData);

                if (result?.status) {
                    SHOW_TOAST(result?.data?.message ?? 'OTP verified successfully', 'success');
                    NavigationService.navigate(SCREENS.CreatePassword.identifier, {
                        email: data?.email,
                        id: data?.id
                    });
                    onSuccess?.();
                    return;
                }

                if (result?.code === 409) {
                    const msg = result?.data?.message;
                    if (msg === 'start_signup_allowed') {
                        NavigationService.navigate(SCREENS.CreatePassword.identifier, {
                            email: data?.email,
                            id: data?.id
                        });
                    } else if (msg === 'password_set_allowed') {
                        NavigationService.navigate(SCREENS.AddPersonalDetails.identifier, {
                            email: data?.email,
                            id: data?.id
                        });
                    } else {
                        SHOW_TOAST(msg ?? 'Something went wrong', 'error');
                    }
                } else {
                    SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
                    console.log('verifyOtp error =>', result?.data?.message);
                }

                callBack?.();
            } catch (error: any) {
                SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
                console.log('verifyOtp exception =>', error?.message);
                callBack?.();
            } finally {
                dispatch(setLoading(false));
            }
        };

export const resendOtpAction =
    (data: any, onSuccess?: any, callBack?: any) =>
        async (dispatch: AppDispatch) => {
            try {
                const result = await API.Instance.post(API.API_ROUTES.auth.resendOtp, data);
                
                if (result.status) {
                    SHOW_TOAST(result?.data?.message ?? '', 'success')
                    onSuccess && onSuccess()
                } else {
                    SHOW_TOAST(result?.data?.message ?? '', 'error')
                    console.log('error==>', result?.data?.message)
                }
            }
            catch (error: any) {
                setLoading(false);
                SHOW_TOAST(error?.message ?? '', 'error');
                console.log(error?.message)
            }
            finally {
                //    setLoading(false);
            }
        };


export const createwPasswordAction =
    (data: any, onSuccess?: any, callBack?: any) =>
        async (dispatch: AppDispatch) => {
            try {
                setLoading(true);

                const result: any = await API.Instance.post(API.API_ROUTES.auth.createPassword, data);
                setLoading(false);
                console.log('result', result.status, result)

                if (result.status) {
                    Storage.save(Storage.USER_DETAILS, JSON.stringify(result?.data?.data));
                    SHOW_TOAST(result?.data?.message ?? '', 'success')
                    NavigationService.navigate(SCREENS.AddPersonalDetails.identifier, {
                        email: data?.email,
                        // isPhoneNumber: isPhoneNumber,
                        // countryCode: countryCode,
                    });
                } else {
                    if (result?.code === 409) {
                        if (result?.data?.message == 'Password already set. Redirect to Details page.') {
                            NavigationService.navigate(SCREENS.AddPersonalDetails.identifier, {
                                email: data?.email,
                            })
                        } else {
                            SHOW_TOAST(result?.data?.message ?? '', 'error')
                        }
                    } else {
                        SHOW_TOAST(result?.data?.message ?? '', 'error')
                        console.log('error==>', result?.data?.message)
                    }
                }
            } catch (error: any) {
                setLoading(false);
                SHOW_TOAST(error?.message ?? '', 'error');
                console.log(error?.message)
            } finally {
                setLoading(false);
            }
        };

export const uploadSeekerProfilePhotoAction =
    (data: any, onSuccess?: () => void, onError?: () => void) =>
        async (dispatch: AppDispatch) => {
            try {
                dispatch(setLoading(true));

                const result = await API.Instance.post(
                    API.API_ROUTES.service_seeker.uploadSeekerProfilePhoto,
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );

                console.log("profile Photo result====>>", result?.data?.data)

                if (result?.status) {
                    onSuccess?.(result?.data?.data);
                    // SHOW_TOAST(result?.data?.message ?? 'Profile photo uploaded', 'success');
                } else {
                    SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
                    onError?.();
                }
            } catch (error: any) {
                SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
                onError?.();
            } finally {
                dispatch(setLoading(false));
            }
        };

export const addPersonalDetailsAction =
    (data: any, onSuccess?: (resp?: any) => void, onError?: () => void) =>
        async (dispatch: AppDispatch) => {
            try {
                dispatch(setLoading(true));

                const result = await API.Instance.post(API.API_ROUTES.service_seeker.addPersonalDetails, data);

                if (result?.status) {
                    SHOW_TOAST(result?.data?.message ?? 'Details saved', 'success');
                    onSuccess?.(result?.data);
                } else {
                    SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
                    onError?.();
                }
            } catch (error: any) {
                SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
                onError?.();
            } finally {
                dispatch(setLoading(false));
            }
        };

export const addVerificationDocAction = (data: any, onSuccess?: (resp?: any) => void, onError?: () => void) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const result = await API.Instance.post(API.API_ROUTES.service_seeker.addVerificationDoc, data);

            if (result?.status) {
                SHOW_TOAST(result?.data?.message ?? 'Details saved', 'success');
                dispatch(getSeekerProfile())
                onSuccess?.(result?.data);
            } else {
                SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
                onError?.();
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
            onError?.();
        } finally {
            dispatch(setLoading(false));
        }
    };

export const resetPasswordStartAction = (data: any, onSuccess?: (resp?: any) => void, onError?: () => void) =>
    async (dispatch: AppDispatch) => {
        try {
            setLoading(true);
            const result = await API.Instance.post(API.API_ROUTES.auth.resetPassword, data);
            setLoading(false);
            console.log('result', result.status, result)
            if (result.status) {
                SHOW_TOAST(result?.data?.message ?? '', 'success')
                // NavigationService.navigate(SCREENS.Otp.identifier, {
                //     email: data?.email,
                //     // isPhoneNumber: isPhoneNumber,
                //     // countryCode: countryCode,
                // });
                NavigationService.navigate(SCREENS.Otp.identifier, {
                    email: data?.email,
                    isResetPassword: true,
                });
            } else {
                SHOW_TOAST(result?.data?.message ?? '', 'error')
                console.log('error==>', result?.data?.message)
            }
        } catch (error: any) {
            setLoading(false);
            SHOW_TOAST(error?.message ?? '', 'error');
            console.log(error?.message)
        } finally {
            setLoading(false);
        }
    }

export const resetPasswordVerifyOtpAction =
    (data: any, onSuccess?: any, callBack?: any) =>
        async (dispatch: AppDispatch) => {
            try {
                dispatch(setLoading(true));
                let apiData = {
                    email: data?.email,
                    otp: data?.otp,
                }

                const result: any = await API.Instance.post(API.API_ROUTES.auth.verifyResetPassword, apiData);
                console.log('verifyOtp result', result?.status, result);

                if (result?.status) {
                    SHOW_TOAST(result?.data?.message ?? 'OTP verified successfully', 'success');
                    NavigationService.navigate(SCREENS.NewPassword.identifier, {
                        email: data?.email,
                        id: data?.id
                    });
                    onSuccess?.();
                    return;
                }

                if (result?.code === 409) {
                    const msg = result?.data?.message;
                    if (msg === 'start_signup_allowed') {
                        NavigationService.navigate(SCREENS.CreatePassword.identifier, {
                            email: data?.email,
                            id: data?.id
                        });
                    } else if (msg === 'password_set_allowed') {
                        NavigationService.navigate(SCREENS.AddPersonalDetails.identifier, {
                            email: data?.email,
                            id: data?.id
                        });
                    } else {
                        SHOW_TOAST(msg ?? 'Something went wrong', 'error');
                    }
                } else {
                    SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
                    console.log('verifyOtp error =>', result?.data?.message);
                }

                callBack?.();
            } catch (error: any) {
                SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
                console.log('verifyOtp exception =>', error?.message);
                callBack?.();
            } finally {
                dispatch(setLoading(false));
            }
        };

export const createNewPasswordAction =
    (data: any, onSuccess?: any, callBack?: any) =>
        async (dispatch: AppDispatch) => {
            try {
                setLoading(true);
                const result: any = await API.Instance.post(API.API_ROUTES.auth.createNewPassword, data);
                setLoading(false);
                console.log('result', result.status, result)

                if (result.status) {
                    SHOW_TOAST(result?.data?.message ?? '', 'success')
                    NavigationService.reset(SCREENS.Login.identifier)
                } else {

                    SHOW_TOAST(result?.data?.message ?? '', 'error')
                    console.log('error==>', result?.data?.message)

                }
            } catch (error: any) {
                setLoading(false);
                SHOW_TOAST(error?.message ?? '', 'error');
                console.log(error?.message)
            } finally {
                setLoading(false);
            }
        };

export const addressCreateAction = (data: any, onSuccess?: any, callBack?: any) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const result: any = await API.Instance.post(API.API_ROUTES.service_seeker.addressCreate, data);
            console.log('verifyOtp result', result?.status, result);

            if (result?.status) {
                SHOW_TOAST(result?.data?.message ?? 'Address created successfully', 'success');
                onSuccess?.();
            }

        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
            console.log('verifyOtp exception =>', error?.message);
            callBack?.();
        } finally {
            dispatch(setLoading(false));
        }
    };

export const addProviderPersonalDetailsAction =
    (data: any, onSuccess?: (resp?: any) => void, onError?: () => void) =>
        async (dispatch: AppDispatch) => {
            try {
                dispatch(setLoading(true));

                const result = await API.Instance.post(API.API_ROUTES.service_provider.addProviderPersonalDetails, data);

                if (result?.status) {
                    SHOW_TOAST(result?.data?.message ?? 'Details saved', 'success');
                    onSuccess?.(result?.data);
                } else {
                    SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
                    onError?.();
                }
            } catch (error: any) {
                SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
                onError?.();
            } finally {
                dispatch(setLoading(false));
            }
        };

export const addProviderVerificationDocAction = (data: any, onSuccess?: (resp?: any) => void, onError?: () => void) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const result = await API.Instance.post(API.API_ROUTES.service_provider.addProviderVerificationDoc, data);

            if (result?.status) {
                SHOW_TOAST(result?.data?.message ?? 'Details saved', 'success');
                onSuccess?.(result?.data);
            } else {
                SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
                onError?.();
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
            onError?.();
        } finally {
            dispatch(setLoading(false));
        }
    };

export const addProviderVerificationDetails = (data: any, onSuccess?: (resp?: any) => void, onError?: () => void) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const result = await API.Instance.patch(API.API_ROUTES.service_provider.addProviderVerificationDetails, data);

            if (result?.status) {
                SHOW_TOAST(result?.data?.message ?? 'Details saved', 'success');
                onSuccess?.(result?.data);
            } else {
                SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
                onError?.();
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
            onError?.();
        } finally {
            dispatch(setLoading(false));
        }
    };

export const getAllCategoriesAction = (data: any, onSuccess?: (resp?: any) => void, onError?: () => void) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const result = await API.Instance.get(API.API_ROUTES.common.getAllCategories);
            console.log("result====>>>", result?.data?.data)
            if (result?.status) {
                // return result?.data;
                dispatch(setAllCategoriesData(result?.data?.data))
            } else {
                SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
        } finally {
            dispatch(setLoading(false));
        }
    };

export const updateSelectedCategoriesAction = (data: any, onSuccess?: (resp?: any) => void, onError?: () => void) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const result = await API.Instance.patch(API.API_ROUTES.common.updateSelectedCategories, data);
            console.log("result====>>>", result?.data?.data)
            if (result?.status) {
                onSuccess?.(result?.data?.data)
            } else {
                SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
        } finally {
            dispatch(setLoading(false));
        }
    };

export const uploadProviderProfilePhotoAction =
    (data: any, onSuccess?: () => void, onError?: () => void) =>
        async (dispatch: AppDispatch) => {
            try {
                dispatch(setLoading(true));
                const result = await API.Instance.post(
                    API.API_ROUTES.service_provider.uploadProviderProfilePhoto,
                    data,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        skipAuth: true,
                    },
                );
                console.log("profile Photo result====>>", result?.data?.data)
                if (result?.status) {
                    SHOW_TOAST(result?.data?.message ?? 'Profile photo uploaded', 'success');
                    onSuccess?.(result?.data?.data);
                } else {
                    SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
                    onError?.();
                }
            } catch (error: any) {
                SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
                onError?.();
            } finally {
                dispatch(setLoading(false));
            }
        };

export const providerAddressCreateAction = (data: any, onSuccess?: any, callBack?: any) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const result: any = await API.Instance.post(API.API_ROUTES.service_provider.providerAddressCreate, data);
            console.log('verifyOtp result', result?.status, result);

            if (result?.status) {
                SHOW_TOAST(result?.data?.message ?? 'Address created successfully', 'success');
                onSuccess?.();
            }

        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
            console.log('verifyOtp exception =>', error?.message);
            callBack?.();
        } finally {
            dispatch(setLoading(false));
        }
    };

export const logoutAction = (data: any, onSuccess?: any, callBack?: any) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const result: any = await API.Instance.post(API.API_ROUTES.auth.logout, data);

            if (result?.status) {
                await Storage.clear();
                NavigationService.reset(SCREENS.Login.identifier)
                SHOW_TOAST(result?.data?.message ?? 'Address created successfully', 'success');
                onSuccess?.();
                dispatch(resetAuth())
            }

        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
        } finally {
            dispatch(setLoading(false));
        }
    };

export const getSeekerProfile = (data?: any, onSuccess?: (resp?: any) => void, onError?: () => void) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const result = await API.Instance.get(API.API_ROUTES.service_seeker.seekerProfile);
            console.log("provider profile result ====>>>", result?.data?.data)
            if (result?.status) {
                // return result?.data;
                // dispatch(setAllCategoriesData(result?.data?.data))
                dispatch(setUserData(result?.data?.data))
                onSuccess?.(result?.data?.data)
            } else {
                SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
                onError?.();
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
            onError?.();
        } finally {
            dispatch(setLoading(false));
        }
    };

export const getProviderProfile = (onSuccess?: (resp?: any) => void, onError?: () => void) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));

            const result = await API.Instance.get(API.API_ROUTES.service_provider.providerProfile);
            console.log("provider profile result ====>>>", result?.data?.data)
            if (result?.status) {
                // return result?.data;
                // dispatch(setAllCategoriesData(result?.data?.data))
                dispatch(setUserData(result?.data?.data))
                onSuccess?.(result?.data?.data)
            } else {
                SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
                onError?.();
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
            onError?.();
        } finally {
            dispatch(setLoading(false));
        }
    };

export const editSeekerProfileAction =(data:any,onSuccess?: (resp?: any) => void, onError?: () => void) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const result = await API.Instance.patch(API.API_ROUTES.service_seeker.edit_profile,data);
            console.log("provider profile result ====>>>", result?.data?.data)
            if (result?.status) {
                dispatch(getSeekerProfile())
                 SHOW_TOAST(result?.data?.message , 'success');
                onSuccess?.(result?.data?.data)
            } else {
                SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
                onError?.();
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
            onError?.();
        } finally {
            dispatch(setLoading(false));
        }
    };

    export const editProviderProfileAction =(data:any,onSuccess?: (resp?: any) => void, onError?: () => void) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const result = await API.Instance.patch(API.API_ROUTES.service_provider.edit_profile,data);
            console.log("provider profile result ====>>>", result?.data?.data)
            if (result?.status) {
               dispatch(getProviderProfile())
                 SHOW_TOAST(result?.data?.message , 'success');
                onSuccess?.(result?.data?.data)
            } else {
                SHOW_TOAST(result?.data?.message ?? 'Something went wrong', 'error');
                onError?.();
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
            onError?.();
        } finally {
            dispatch(setLoading(false));
        }
    };