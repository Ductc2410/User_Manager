import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { AppDispatch ,RootState } from "../../store/store"
import { getUserList, deleteUser } from "../../store/user.slice"
import { Button, Table, Pagination, Modal } from "@mantine/core"

const UserList = () => {
    const dispatch: AppDispatch = useDispatch()
    const { users, total, error, loading } = useSelector((state: RootState) => state.users)

    const [activePage, setPage] = useState(1);
    const [opened, setOpened] = useState(false);
    const [id, setId] = useState<number | undefined>()

    useEffect(() => {
        dispatch(getUserList({
            page: activePage
        }))
    }, [activePage]);

    useEffect(() => {
        if(total === (activePage-1)*5 && activePage !== 1){
            setPage(prev => prev - 1)
        }
    }, [users]);

    function handleClick(id: number)  {
        setId(id)
        setOpened(true)
    }

    function removeUser() {
        dispatch(deleteUser(Number(id)))
        setOpened(false)
    }
    
    return (
        <React.Fragment>
            {loading && (
                <div className="box">
                    <h3>Loading....</h3>
                </div>
            )}

            {error && (
                <div className="box">
                    <h3>{error}</h3>
                </div>
            )}

            {!loading && users.length > 0 && (
                <div>
                    <Table
                        highlightOnHover={true}
                        verticalSpacing="md"
                    >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.country}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <Button>
                                                <Link to={`/edit/${user.id}`}>Edit</Link>
                                            </Button>

                                            <Button
                                                ml={10}
                                                onClick={() => handleClick(user.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>

                    <Pagination
                        page={activePage} 
                        total={Math.ceil(total/5)} 
                        onChange={setPage}
                        mt={30}
                    />

                    <Modal
                        opened={opened}
                        onClose={() => {setOpened(false); setId(undefined)}}
                        overlayOpacity={0.3}
                        title="Delete this user ??"
                    >
                        <Button onClick={removeUser}>Delete</Button>
                    </Modal>
                </div>
            )}
        </React.Fragment>

    ) 
}

export default UserList