interface LoginType {
    email: string,
    password: string
};

interface Signup extends LoginType {
    username: string, 
    confirm_password: string
};

interface List {
    _id?: string,
    completed: boolean,
    name: string,
    user?: string,
    __v?: number,
    createdAt?: Date,
    updatedAt?: Date
};

interface EditType {
    setEditFlag: React.Dispatch<React.SetStateAction<boolean>>
    editItem: List,
    setEditItem: React.Dispatch<React.SetStateAction<List>>,
    refreshUserTask: () => void
};

interface DeleteType {
    deleteFlag: boolean,
    setDeleteFlag: React.Dispatch<React.SetStateAction<boolean>>,
    deleteItem: string,
    refreshUserTask: () => void
}

interface TodoListProp {
    list: List, 
    editFlag?: boolean,
    setEditFlag: React.Dispatch<React.SetStateAction<boolean>>,
    deleteFlag?: boolean,
    setDeleteFlag: React.Dispatch<React.SetStateAction<boolean>>,
    setDeleteItem?: React.Dispatch<React.SetStateAction<string>>,
    setEditItem?: React.Dispatch<React.SetStateAction<List>>
}

interface EditValue {
    name?: string,
    completed?: boolean
};

export type { Signup, LoginType, List, TodoListProp, EditType, EditValue, DeleteType };
