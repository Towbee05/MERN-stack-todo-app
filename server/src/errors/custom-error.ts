// Extending the javascript default Error class
class CustomAPIError extends Error{
    statusCode: number
    constructor (
        message: string,
        statusCode: number
    ) {
        super(message);
        this.statusCode= statusCode;
    };
};

const customAPIErrorClass = (message: string, statuscode:number) => {
    return new CustomAPIError(message, statuscode);
};

export { customAPIErrorClass, CustomAPIError };
export default customAPIErrorClass;