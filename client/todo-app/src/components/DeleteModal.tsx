import { DeleteType, Message } from "@/types";
import { handleFormErrors } from "@/util";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteModal ({ setDeleteFlag, deleteItem, refreshUserTask }: DeleteType) {
    const router = useRouter();
    const token: string | undefined = Cookies.get('token');
    const [ message, setMessage ] = useState<Message>({});
    const [ activeMessage, setActiveMessage ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const handleDeleteTask = async (e: React.MouseEvent): Promise<void> => { 
        try{
            setIsLoading(true);
            const response = await axios.delete(`http://localhost:5000/api/v1/tasks/${deleteItem}`, { headers: { Authorization: `Token ${token}` } });
            console.log(response);
            await refreshUserTask();
            setDeleteFlag(false);
        } catch (err) {
            handleFormErrors(err, setMessage, setActiveMessage, router);
        } finally{
            setIsLoading(false);
        };
    };
    return (
        <div className="fixed w-full">
            <div id="popup-modal" tabIndex={-1} className="overflow-y-auto overflow-x-hidden flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-screen bg-gray-500/75">
                <div className="relative p-4">
                    {  activeMessage && 
                        <div id="alert-border-2" className="flex items-center p-4 mb-10 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                            <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <div className="ms-3 text-sm font-medium text-white space-y-2.5">
                                <h4>
                                    { message.message } 
                                </h4>
                                <p>
                                    { message.error }
                                </p>
                            </div>
                        </div>
                    }
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200 gap-8">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Delete Task - { deleteItem }
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={() => setDeleteFlag(false)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this task?</h3>
                            <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={(e) => handleDeleteTask(e)}>
                                <p className="flex items-center justify-center">
                                    {isLoading ? (
                                        // Loading spinner SVG
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    {isLoading ? "Deleting..." : "Yes, I'm sure"}
                                </p>
                            </button>
                            <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setDeleteFlag(false)}>No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};