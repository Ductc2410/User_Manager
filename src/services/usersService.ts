import request from '../helpers/request';
import IUser from '../types/user';


export function getUser(id: number): Promise<any> {
    return request.get(`/clients/${id}`);
}

export type CreateUserRequest = Omit<IUser, 'id'>;

export function createUser(formData: CreateUserRequest): Promise<any> {
    return request.post('/clients', formData);
}

export function updateUser(formData: CreateUserRequest, id:number): Promise<any> {
    return request.put(`/clients/${id}`, formData);
}

export function deleteUser(id: number): Promise<any> {
    return request.delete(`/clients/${id}`);
}