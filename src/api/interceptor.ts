import axios, { AxiosResponse } from "axios";

// CONSTANTS
import { SHOW_TOAST, Storage } from "../constant";
import { API_BASE_URL, DISABLE_API_LOGS } from "./apiRoutes";

// PACKAGES
import NetInfo from '@react-native-community/netinfo';
import { Alert } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import { isTokenExpire, refreshAccessToken } from "./token";

let hasShownNoInternetAlert = false;

export const Instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        api_key: '9f2e4a7d2b6c4f1e8d3a5c7f0b9e6d1c3a2f8b4c6d7e9f0a1b2c3d4e5f6a7b8',
        api_secrete: 'c7a8e1f3d5b2a9c6f4e7b1d2c8a3f5b0d6e9c2a1f7b4d3e8c5f0a9b7c6d3e2f1'
    }
});

Instance.interceptors.request.use(
    async (config) => {
        const netState = await NetInfo.fetch();

        // if (!netState.isConnected) {
        //     // ✅ Show Alert Only Once
        //     if (!hasShownNoInternetAlert) {
        //         // hasShownNoInternetAlert = true;
        //         // Alert.alert('No Internet', 'Please check your internet connection.');
        //     }

        //     return Promise.reject({
        //         message: 'No internet connection',
        //         code: 503,
        //         status: false,
        //         data: null
        //     });
        // } else {
        //     // 🔄 Reset once internet is back
        //     if (hasShownNoInternetAlert) {
        //         hasShownNoInternetAlert = false;
        //     }
        // }
        if (config.skipAuth) {
            const fullUrl = `${config?.baseURL ?? ''}${config?.url ?? ''}`;
          console.log('[API Request] without token', {
                method: config?.method,
                url: fullUrl,
                headers: config?.headers,
                params: config?.params,
                data: config?.data,
            });  
            return config;
        }
        
        if (!DISABLE_API_LOGS) {
            const fullUrl = `${config?.baseURL ?? ''}${config?.url ?? ''}`;
            console.log('[API Request]', {
                method: config?.method,
                url: fullUrl,
                headers: config?.headers,
                params: config?.params,
                data: config?.data,
            });
        }

        if (!config.headers.Authorization) {
            const userData: any = await Storage.get(Storage.USER_DETAILS);
            if (!userData) {
                console.warn('No stored user data found; request sent without Authorization');
                return config;
            }

            const result = JSON.parse(userData);
            console.log("result", result?.tokens?.access_token)
            const accessToken = result?.tokens?.access_token || result?.access_token;
            console.log('AccessToken====>>', accessToken);

            if (!accessToken) {
                console.warn('No access token found in stored user data; request sent without Authorization');
                return config;
            }

            const isExpired = isTokenExpire(accessToken);
            console.log("isExpired",isExpired)
            console.log("result?.tokens?.refresh_token",result?.refresh_token)
            if (isExpired) {
                const newAccessToken = await refreshAccessToken(result?.refresh_token || result?.tokens?.refresh_token);
                if (newAccessToken) {
                    config.headers.Authorization = 'Bearer ' + `${newAccessToken}`;
                } else {
                    EventRegister.emit('onInvalidToken');
                }
            } else {
                config.headers.Authorization = 'Bearer ' + `${accessToken}`;
            }
        }
        if (!config.headers.Authorization) {
            console.warn('Authorization header missing for request', config.method, config.url);
        } else {
            console.log('Authorization header set:', config.headers.Authorization);
        }

        return config;
    },
    (error) => {
        if (!DISABLE_API_LOGS) {
            console.log(`Config Error ${error}`)
            console.log(`Config Error Status ${error?.response?.status}`)
            console.log(`Config Error Header ${JSON.stringify(error?.response?.config?.headers)}`)
            console.log(`Config Error Base URL ${JSON.stringify(error?.response?.config?.baseURL)}`)
            console.log(`Config Error Data ${JSON.stringify(error?.response?.config?.data)}`)
            console.log(`Config Error Details ${JSON.stringify(error?.response?.data)}`)
        }

        return {
            message: error?.response?.data?.message ?? error?.message ?? 'Something went wrong',
            code: error?.response?.status,
            data: error?.response?.data ?? null,
            status: false,
        };
    }
);

const responseValidator = (response: AxiosResponse<any, any>) => {
    if (!DISABLE_API_LOGS) {
        console.log(`Response Status ${response?.status}`)
        console.log(`Response Config Header ${JSON.stringify(response?.config?.headers)}`)
        console.log(`Response Config Base URL ${JSON.stringify(response?.config?.baseURL)}`)
        console.log(`Response Config Data ${JSON.stringify(response?.config?.data)}`)
        console.log(`Response Details ${JSON.stringify(response?.data)}`)
    }
    const res: any = {
        status: true,
        code: response?.status,
        data: response?.data,
    }
    return res
};

const errorValidator = (error: any) => {

    if (!DISABLE_API_LOGS) {
        console.log(`Error ${error}`)
        console.log(`Error Status ${error?.response?.status}`)
        console.log(`Error Config Header ${JSON.stringify(error?.response?.config?.headers)}`)
        console.log(`Error Config Base URL ${JSON.stringify(error?.response?.config?.baseURL)}`)
        console.log(`Error Config Data ${JSON.stringify(error?.response?.config?.data)}`)
        console.log(`Error Details ${JSON.stringify(error?.response?.data)}`)
    }
    if (error?.response?.status == 401) {
        EventRegister.emit('onInvalidToken')
    }

    if (error?.message === 'canceled') {
        return {
            error: error,
            message: 'Request canceled',
            code: 408,
            data: null,
            status: false
        };
    }

    return {
        error: error,
        code: error?.response?.status,
        message: error?.response?.data?.message ?? error?.message ?? 'Something went wrong',
        data: error?.response?.data ?? {},
        status: false
    };
};

Instance.interceptors.response.use(responseValidator, errorValidator);