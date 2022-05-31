import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import request from "../helpers/request";
import IUser from "../types/user";
import { RECORD_PER_PAGE } from "../constants";
import { toast } from "react-toastify";
import { CreateUserRequest } from "../services/usersService";
import { AxiosError} from "axios";

export const getUserList = createAsyncThunk("users/getUserList", async ({page}: {page: number}) => {
    const response = await request.get(`/clients?_page=${page}&_limit=${RECORD_PER_PAGE}`);
    return {
        data: response.data,
        total: response.headers['x-total-count']
    };
});

export const deleteUser = createAsyncThunk("users/deleteUserList", async (id:number) => {
    const response = await request.delete(`/clients/${id}`);
    return { id };
});

export const updateUser = createAsyncThunk<
    {id: number},
    {id: number, data: CreateUserRequest},
    {
        rejectValue: {
            errorMessage: string
        }
    }
>(
    "users/updateUserList",
    async ({id, data}, { rejectWithValue }) => {
        try {
            const response = await request.put(`/clients/${id}`, data);
            return { id };
        } catch (err) {
            console.log('err', err);
            let error: AxiosError<any> = err as any
            console.log('error', error);

            return rejectWithValue({
                errorMessage: error?.message
            })
    }
});


interface InitialStateType {
    users: IUser[],
    total: number,
    loading: boolean,
    error: string | null
    
}

const initialState: InitialStateType = {
    users: [],
    total: 0,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserList.pending, (state) => {   
                state.loading = true
            })
            .addCase(getUserList.rejected, (state) => {   
                state.error = 'Cant get data from server'
                state.loading = false
            })
            .addCase(getUserList.fulfilled, (state, action) => {   
                state.users = action.payload.data.reverse()
                state.total = Number(action.payload.total)
                state.loading = false
            })
        
        builder
            .addCase(deleteUser.rejected, () => {
                toast('Server Error')
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const newUsers = state.users.filter(user => user.id !== action.payload.id)
                
                state.users = newUsers
                state.total = state.total - 1
                toast('Delete User Success')
            })

        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false
                toast(action.payload?.errorMessage)
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false
                toast('Sửa thành công')
            })
    }
})

export default userSlice.reducer