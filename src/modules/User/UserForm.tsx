import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import IUser from "../../types/user";
import { createUser, CreateUserRequest, getUser } from "../../services/usersService";
import { updateUser } from "../../store/user.slice";
import { Button, Container, Input, InputWrapper } from "@mantine/core"

const schema = yup.object({
    name: yup.string().trim().required(),
    avatar: yup.string().trim().required(),
    phone: yup.string().trim().required(),
    job: yup.string().trim().required(),
    country: yup.string().trim().notRequired(),
}).required();

type UserFormProps = {
    mode: 'create'  | 'edit'
}

const UserForm = ({mode}: UserFormProps) => {
    const dispatch: AppDispatch= useDispatch()
    const navigate = useNavigate()
    const [userData, setUserData] = useState();
    const { loading } = useSelector((state: RootState) => state.users)
    const params = useParams()

    const { reset, register, handleSubmit, formState: { errors } } = useForm<IUser>({
        defaultValues: userData,
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: CreateUserRequest) => {
        switch (mode) {
            case 'create': {
                createUser(data)
                navigate('/users')
                break;
            }
            case 'edit': {
                dispatch(updateUser({
                    id: Number(params.id),
                    data
                }))
                navigate('/users')
                break;
            }
            default:
                break;
        }
    }

    useEffect(() => {
        if(params.id){
            const getUserInfor = async() => {
                const { data } = await getUser(Number(params.id))
                reset(data)
            }
            getUserInfor()
        }
    }, [params])

    console.log(errors);
    
    

    return (  
        <div className="user_form">
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputWrapper
                        id="cs"
                        label="Name" mb={"sm"}
                    >
                        <Input {...register("name")}/>
                    </InputWrapper>

                    <InputWrapper label="Phone" mb={"sm"}>
                        <Input {...register("phone")} />
                    </InputWrapper>

                    <InputWrapper label="Country" mb={"sm"}>
                        <Input {...register("country")} />
                    </InputWrapper>

                    
                    <InputWrapper label="Avatar" mb={"sm"}>
                        <Input {...register("avatar")} />
                    </InputWrapper>
                    
                    <InputWrapper label="Job" mb={"sm"}>
                        <Input {...register("job")} />
                    </InputWrapper>

                    <Button type="submit" loading={loading}>
                        {mode === 'create' ? 'Create' : 'Update'}
                    </Button>
                </form>
            </Container>
        </div>
    ) 
}

export default UserForm