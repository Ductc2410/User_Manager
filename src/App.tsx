import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import MainLayout from './layouts/MainLayout';
import List from './pages/User/List';
import UserForm from './modules/User/UserForm';


function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Navigate to="users" />} />
                <Route path="users" element={<List />}/>
                <Route path="create" element={<UserForm mode="create"/>}/>
                <Route path="edit/:id" element={<UserForm mode="edit"/>}/>
            </Route>
        </Routes>
    );
}

export default App;
