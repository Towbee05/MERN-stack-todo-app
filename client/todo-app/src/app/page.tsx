"use client"
import Image from "next/image"
// import useDarkMode from "@/hooks/useDarkMode";
import { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
import TodoList from "@/components/TodoList";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import Loading from "@/components/Loading";
import { List, Message } from "@/types";
import EditModal from "@/components/EditModal";
import DeleteModal from "@/components/DeleteModal";
import './globals.css'
import { SubmitHandler, useForm } from "react-hook-form";

export default function Dashboard (){
    // const router = useRouter();
    // const { isDarkMode, toggleDarkMode } =  useDarkMode();
    const [ ischecked, setIsChecked ] = useState<boolean>(false);
    const [ userList, setUserList ] = useState<List[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [editFlag, setEditFlag ] = useState<boolean>(false);
    const [deleteFlag, setDeleteFlag ] = useState<boolean>(false);
    const [ editItem, setEditItem ] = useState<List>({name: '', completed: false});
    const [ deleteItem, setDeleteItem ] = useState<string>('');
    const [ filter, setFilter ] = useState<'all' | 'completed' | 'active'>('all');
    const [ filteredList, setFilteredList ] = useState<List[]>([]);
    const token: string | undefined = Cookies.get('token');
    const { register, handleSubmit, watch, formState: { errors } } = useForm<List>();
    const [ message, setMessage ] = useState<Message>({});
    const [ activeMessage, setActiveMessage ] = useState<boolean>(false);
    const [ adding, setAdding ] = useState<boolean>(true);

    // Fetch api for user todolist 
    useEffect(() => {
        const fetchUserData = async (): Promise<void> => {
            try{
                const response = await axios.get('http://localhost:5000/api/v1/tasks/', { headers: { Authorization: `Token ${token}` } });
                setIsLoading(false);
                const { data } = response;
                if (!data.success) {
                    console.log(data);
                };
                setUserList(data.data);
                setFilteredList(data.data);
            } catch (err) {
                const data = err.response.data;
                console.log(data);
                console.log(err);
                // setMessage(err);
            };
        };
        fetchUserData();
    }, [token]);
    
    const refreshUserTask = async (): Promise<void> => {
        try{
            const response = await axios.get('http://localhost:5000/api/v1/tasks/', { headers: { Authorization: `Token ${token}` } });
            setIsLoading(false);
            const { data } = response;
            if (!data.success) {
                console.log(data);
            };
            const response_data = data.data;
            setUserList(response_data);
            console.log(response_data);
            if (filter === 'all') setFilteredList(response_data);
            else if (filter === 'active') setFilteredList(response_data.filter((task: List) => !task.completed));
            else setFilteredList(response_data.filter((task: List) => task.completed));
        } catch (err) {
            console.log(err);
        };
    };

    const onSubmit: SubmitHandler<List> = async (data): Promise<void> => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/tasks/', data, { headers: { Authorization: `Token ${token}` } });
            await refreshUserTask();
        } catch (err) {
            if (axios.isAxiosError(err)){
                const data: Message = err.response?.data;
                setMessage({
                    status: err.status,
                    success: data.success,
                    message: data.message,
                    error: data.error
                });
                setActiveMessage(true);
                setTimeout(() => setActiveMessage(false), 5000);
            } else {
                console.log(err);
            };
        }
        
    };

    const handleBtns = useCallback((category: 'all' | 'completed' | 'active') => {
        switch(category) {
            case 'all':
                setFilteredList(userList);
                setFilter('all');
                break;
            case 'active': 
                setFilteredList(userList.filter(task => !task.completed));
                setFilter('active');
                break;
            case 'completed':
                setFilteredList(userList.filter(task => task.completed));
                setFilter('completed');
                break;
        };
    }, [userList]);

    if (isLoading) {
        return (
            <Loading />
        );
    };
    return (
        <section className="min-h-screen w-full flex justify-center">
            <div className="bg-[url(/img/bg-mobile-light.jpg)] md:bg-[url(/img/bg-bg-desktop-light.jpg)] w-full px-4 bg-no-repeat bg-contain dark:bg-[url(/img/bg-mobile-dark.jpg)] md:dark:bg-[url(/img/bg-desktop-dark.jpg)] dark:bg-slate-950 flex justify-center">
                <div className="max-w-[750px] w-full">
                    <div className="w-full flex justify-between items-center pt-22 md:pt-32 pb-14 px-5">
                        <h1 className="uppercase text-white font-black text-2xl tracking-[1.3rem] ">
                            todo
                        </h1>
                        <button>
                            <Image 
                                src='/img/icon-sun.svg'
                                alt='sun logo for light mode'
                                width={30}
                                height={30}
                                className="block dark:hidden"
                            />
                            <Image 
                                src='/img/icon-moon.svg'
                                alt='moon logo for light mode'
                                width={30}
                                height={30}
                                className="hidden dark:block"
                            />
                        </button>
                    </div>
                    <div className="space-y-10">
                        {/* Message body!! */}
                        {  activeMessage && 
                            <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
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
                        <form action="" method="post" className="flex justify-between items-center w-full bg-white dark:bg-slate-900 py-5 px-6 rounded-2xl" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex w-full gap-5 ">
                                <input type="checkbox" className="absolute opacity-0 w-0 h-0" id='checkmark' {...register('completed')} />
                                <label htmlFor= "checkmark" className={`checkmark flex justify-center items-center w-8 h-8 border-2 border-gray-300 dark:border-2 dark:border-gray-600 dark:bg-slate-900 rounded-full ${watch('completed') ? 'bg-linear-to-r from-purple-500 to-cyan-300': 'bg-white'}`}>
                                    <Image  
                                        src='/img/icon-check.svg'
                                        alt='checked icon'
                                        width={10}
                                        height={10}
                                        className={watch('completed') ? 'block': 'hidden'}
                                    /> 
                                </label>
                                <input type="text" placeholder="Create a new todo ..." className="dark:placeholder:text-gray-200 text-slate-600 text-lg font-bold focus:outline-0 dark:text-gray-400 border-b-2 border-b-slate-600 px-2" {...register('name')} />
                            </div>
                            <button className="cursor-pointer text-slate-600 dark:text-gray-200 bg-purple-600 px-5 py-1 float-right rounded-xl">
                                Add
                            </button>
                        </form>
                        <div>
                            <ul className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-3xl">
                                {/* <TodoList /> */}
                                {/* <hr className=""/> */}
                                { filteredList.length === 0 ? (
                                    <p className="text-gray-300 text-center p-5">
                                        No task added yet!!
                                    </p>
                                    ): (
                                        filteredList.map((list) => {
                                            return <TodoList key={list._id} editFlag deleteFlag setEditFlag={setEditFlag} setDeleteFlag={setDeleteFlag} list={list} setEditItem={setEditItem} setDeleteItem={setDeleteItem}/>
                                        })
                                    )
                                }
                                <div className="flex justify-between items-center dark:text-gray-400 px-6 py-7">
                                    <p>
                                        {(userList.filter(list => !list.completed)).length} items left
                                    </p>
                                    <button className="cursor-pointer">
                                        Clear completed
                                    </button>
                                </div>
                            </ul>
                        </div>
                        <div className="flex justify-center items-center w-full p-6 bg-white dark:bg-slate-900 rounded-2xl gap-4 shadow-3xl">
                            <button className={`cursor-pointer ${filter === 'all'? 'active' : 'text-slate-600 dark:text-gray-400'}`} data-category='all' onClick={() => handleBtns('all')}>
                                All
                            </button>
                            <button className={`cursor-pointer ${filter === 'active'? 'active' : 'text-slate-600 dark:text-gray-400'}`} data-category='active' onClick={() => handleBtns("active")}>
                                Active
                            </button>
                            <button className={`cursor-pointer ${filter === 'completed'? 'active' : 'text-slate-600 dark:text-gray-400'}`} data-category='completed' onClick={() => handleBtns("completed")}>
                                Completed
                            </button>
                        </div>
                        <div className="text-slate-600 dark:text-gray-400 text-center">
                            <p>Drag and drop to reorder list</p>
                        </div>

                </div>

                </div>
          </div>
          { editFlag && <EditModal setEditFlag={setEditFlag} editItem={editItem} setEditItem={setEditItem} refreshUserTask={refreshUserTask}/> }
          { deleteFlag && <DeleteModal deleteFlag={deleteFlag} setDeleteFlag={setDeleteFlag} deleteItem={deleteItem} refreshUserTask={refreshUserTask}/> }
        </section>
    )
};