import { CustomAPIError } from "../errors/custom-error"

type ApiRespone<T = any> = {
    success: boolean,
    message: string,
    data? : T,
    error? : CustomAPIError
};

const handleResponse = (success: boolean, message: string, data?: {}, error?: CustomAPIError) => {
    return {
        success, 
        message, 
        data,
        error
    };
};

export default handleResponse;