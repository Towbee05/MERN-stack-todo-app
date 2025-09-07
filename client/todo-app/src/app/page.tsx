"use client"
import Image from "next/image"
// import useDarkMode from "@/hooks/useDarkMode";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import TodoList from "@/components/TodoList";
import Cookies from "js-cookie";
import axios from "axios";
import Loading from "@/components/Loading";
import { List } from "@/types";
import EditModal from "@/components/EditModal";
import DeleteModal from "@/components/DeleteModal";
import './globals.css'

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
    const token: string | undefined = Cookies.get('token');

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
            } catch (err) {
                console.log(err);
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
            setUserList(data.data);
        } catch (err) {
            console.log(err);
        };
    };

    if (isLoading) {
        return (
            <Loading />
        );
    };
    console.log(userList);
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
                        <div className="flex justify-between items-center w-full bg-white dark:bg-slate-900 py-5 px-6 rounded-2xl">
                            <div className="flex w-full gap-5 ">
                                <input type="checkbox" name="completed" className="absolute opacity-0 w-0 h-0" id='checkmark' onChange={(e) => setIsChecked(e.target.checked)}/>
                                <label htmlFor= "checkmark" className={`checkmark flex justify-center items-center w-8 h-8 border-2 border-gray-300 dark:border-2 dark:border-gray-600 dark:bg-slate-900 rounded-full ${ischecked? 'bg-linear-to-r from-purple-500 to-cyan-300': 'bg-white'}`}>
                                    <Image  
                                        src='/img/icon-check.svg'
                                        alt='checked icon'
                                        width={10}
                                        height={10}
                                        className={ischecked? 'block': 'hidden'}
                                    /> 
                                </label>
                                <input type="text" placeholder="Create a new todo ..." className="dark:placeholder:text-gray-200 text-slate-600 text-lg font-bold focus:outline-0 dark:text-gray-400 border-b-2 border-b-slate-600 px-2 "/>
                            </div>
                            <button className="cursor-pointer text-slate-600 dark:text-gray-200 bg-purple-600 px-5 py-1 float-right rounded-xl">
                                Add
                            </button>
                        </div>
                        <div>
                            <ul className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-3xl">
                                {/* <TodoList /> */}
                                {/* <hr className=""/> */}
                                { userList.length === 0 ? (
                                    <p className="text-gray-300 text-center p-5">
                                        No task added yet!!
                                    </p>
                                    ): (
                                        userList.map((list) => {
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
                        <div className="flex justify-center items-center w-full p-6 bg-white dark:bg-slate-900 rounded-2xl text-slate-600 dark:text-gray-400 gap-4 shadow-3xl">
                            <button className='cursor-pointer active'>
                                All
                            </button>
                            <button className="cursor-pointer">
                                Active
                            </button>
                            <button className="cursor-pointer">
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