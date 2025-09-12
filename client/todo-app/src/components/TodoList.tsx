import { useState } from "react";
import { TodoListProp, List } from "@/types";
import Image from "next/image"
import '../app/globals.css'

export default function TodoList({list, setDeleteFlag, setEditFlag, editFlag, setEditItem, setDeleteItem, filteredList, setFilteredList}: TodoListProp) {
    const handleEditToggle = (e: React.MouseEvent) => {
        setEditFlag(true);
        if (setEditItem) {
            setEditItem(list);
        };
        console.log(editFlag);
    };
    const handleDeleteToggle = (e: React.MouseEvent) => {
        setDeleteFlag(true);
        if (setDeleteItem) {
            if (list?._id) setDeleteItem(list?._id);
        };
    };

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: string| undefined) => {
        if (!id) return;
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.effectAllowed = 'move';
        console.log('start');
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
        console.log('over');
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragDrop = (e: React.DragEvent<HTMLLIElement>, targetID: string | undefined) => {
        e.preventDefault();
        if (!targetID) return;
        console.log('drop');
        const dragItem = e.dataTransfer.getData('text/plain');
        const draggedIndex = filteredList?.findIndex(item => item._id === dragItem);
        const targetIndex = filteredList?.findIndex(item => item._id === targetID);

        console.log(draggedIndex, targetIndex);
        console.log(dragItem);
        if (draggedIndex === undefined || targetIndex === undefined || 
            draggedIndex === -1 || targetIndex === -1 ||
            draggedIndex === targetIndex) {
                return;
        }
        if (!filteredList || !setFilteredList) return;
        const newList = [...filteredList];
        const [ removed ] = newList.splice(draggedIndex, 1);
        newList.splice(targetIndex, 0, removed);
        setFilteredList(newList);
    };  

    return (
        <>
            <li className={`flex justify-between items-center w-full py-7 px-6`} draggable onDragStart={(e) => handleDragStart(e, list._id)} onDragOver={handleDragOver} onDrop={(e) => handleDragDrop(e, list._id)}>
                <div className="flex w-full gap-5 dark:text-gray-400 font-semibold items-center">
                    <input type="checkbox" name="completed" className="absolute opacity-0 w-0 h-0" id={list._id} disabled={true} checked={list.completed} />
                    <label htmlFor= {list._id} className={`checkmark flex justify-center items-center w-8 h-8 border-2 border-gray-300 dark:border-2 dark:border-gray-600 dark:bg-slate-900 rounded-full ${list.completed? 'bg-linear-to-r from-purple-500 to-cyan-300': 'bg-white'}`}>
                        <Image  
                            src='/img/icon-check.svg'
                            alt='checked icon'
                            width={10}
                            height={10}
                            className={list.completed? 'block': 'hidden'}
                        /> 
                    </label>
                    <p>
                        { list.name }
                    </p>
                </div>
                <div className="text-white flex gap-4 items-center justify-center">
                    <button className="cursor-pointer" onClick={(e) => handleEditToggle(e)}>
                        <svg 
                            className="w-7 h-7 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            strokeWidth={1.5}
                            >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
                            />
                        </svg>
                    </button>
                    <button className="cursor-pointer" onClick={(e) => handleDeleteToggle(e)}>
                        <svg 
                            className="w-7 h-7 text-gray-400 hover:text-red-500 transition-colors duration-200"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            strokeWidth={1.5}
                            >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" 
                            />
                        </svg>
                    </button>
                </div>
            </li>
            <hr className="border-gray-300 dark:border-gray-600"/>
        </>
    )
};