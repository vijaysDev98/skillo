import { API } from "../../api";
import { SHOW_TOAST } from "../../constant";
import { AppDispatch } from "../../redux/store";
import { setLoading, setServiceCategoryData, setServiceCategoryList, setServices } from "./seekerHomeSlice";

export const getServiceCategoryData = (params?: any, onSuccess?: any, callBack?: any) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            let apiUrl = params ? 
            `${API.API_ROUTES.service_seeker.homeServices}?service_name=${params}` 
            : API.API_ROUTES.service_seeker.homeServices
            const result: any = await API.Instance.get(apiUrl);
            console.log("result===>>>", result)
            if (result?.status) {
                if(params == "home services"){

                    console.log("ajbcjkbajkbjdbcjbs")
                  dispatch(setServiceCategoryList(result?.data?.data?.categories))
                  onSuccess?.(result?.data?.data?.categories[0])
                }else{
                    dispatch(setServices(result?.data?.data))
                }
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
        } finally {
            dispatch(setLoading(false));
        }
    };

    export const getSubCategoryData = (id?:string, onSuccess?: any, callBack?: any) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const result: any = await API.Instance.get(`${API.API_ROUTES.service_seeker.homeServices}/${id}`);
            console.log("result===>>>", result)
            dispatch(setServiceCategoryData(null))
            if (result?.status) {
               dispatch(setServiceCategoryData(result?.data?.data))
            }else{
                  dispatch(setLoading(false));
                SHOW_TOAST(result?.message ?? 'Something went wrong', 'error');
            }
        } catch (error: any) {
            SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
        } finally {
            dispatch(setLoading(false));
        }
    };

// export const getServiceCategoryData = (params: any, onSuccess?: any, callBack?: any) =>
//     async (dispatch: AppDispatch) => {
//         try {
//             dispatch(setLoading(true));
//             let apiUrl = params ? 
//             `${API.API_ROUTES.service_seeker.homeServices}?service_name=${params}` 
//             : API.API_ROUTES.service_seeker.homeServices
//             const result: any = await API.Instance.get(apiUrl);
//             console.log("result===>>>", result)
//             if (result?.status) {
//                 if(params == "home services"){
//                   dispatch(setServiceCategoryList(result?.data?.data?.categories))
//                 }else{
//                     dispatch(setServices(result?.data?.data))
//                 }
//             }
//         } catch (error: any) {
//             SHOW_TOAST(error?.message ?? 'Something went wrong', 'error');
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };