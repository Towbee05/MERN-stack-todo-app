import { EditType, EditValue } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";


export default function EditModal({setEditFlag, editItem, refreshUserTask}: EditType) {
    const { register, handleSubmit, watch,formState: { errors }, setValue} = useForm<EditValue>();
    const token: string | undefined = Cookies.get('token');
    useEffect (() => {
        setValue('name', editItem.name);
        setValue('completed', editItem.completed)
    }, []);
    const onSubmit: SubmitHandler<EditValue> = async (data) => {
        console.log(data);
        const response = await axios.patch(`http://localhost:5000/api/v1/tasks/${editItem._id}`, data, { headers: { Authorization: `Token ${token}` } });
        await refreshUserTask();
        setEditFlag(false);
    };
    const handleCloseModal = (e: React.MouseEvent) => {
        e.preventDefault();
        setEditFlag(false);
    };

    return (
        <div className="fixed w-full">
            <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-screen bg-gray-500/75">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Edit Task - {editItem._id}
                            </h3>
                            <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={(e) => handleCloseModal(e)}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Name</label>
                                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter name" {...register("name")} />
                                </div>
                                <div>
                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Completed? 
                                    </p>
                                    <input type="checkbox" className="sr-only" id={`checkmark-${editItem._id}`} {...register('completed')}/>
                                    <label htmlFor= {`checkmark-${editItem._id}`} className={`checkmark flex justify-center items-center w-8 h-8 border-2 border-gray-300 dark:border-2 dark:border-gray-600 dark:bg-slate-900 rounded-full ${watch('completed') ? 'bg-linear-to-r from-purple-500 to-cyan-300': 'bg-white'}`}>
                                        <Image  
                                            src='/img/icon-check.svg'
                                            alt='checked icon'
                                            width={10}
                                            height={10}
                                            className={watch('completed') ? 'block': 'hidden'}
                                        /> 
                                    </label>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Edit Item </button>
                               
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
};