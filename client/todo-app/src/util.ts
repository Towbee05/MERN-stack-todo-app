import { Message } from "./types";
import axios from "axios";

const handleFormErrors = (err: unknown, setMessage: React.Dispatch<React.SetStateAction<Message>>, setActiveMessage: React.Dispatch<React.SetStateAction<boolean>>, router?) => {
    if (axios.isAxiosError(err)){
        if (router) {
            if (err.status === 401) {
                setTimeout(() => router.push('/login'), 3000);
            };
        }
        const data: Message = err.response?.data;
        setMessage({
            status: err.status,
            success: data.success,
            message: data.message || 'Network Error',
            error: data.error || "Please check connectivity"
        });
        setActiveMessage(true);
        setTimeout(() => setActiveMessage(false), 5000);
    } else {
        setMessage({
            status: 500,
            success: false,
            message: 'Server Error',
            error: 'Could not connect to server. Please try'
        });
    };
};

export { handleFormErrors };