import { Outlet } from 'react-router-dom';
import { AppShell, Container } from '@mantine/core';
import { ToastContainer } from 'react-toastify';

import Header from '../modules/App/Header';

const MainLayout = () => {
    return (
        <AppShell header={<Header />}>
            <Container>
                <Outlet></Outlet>
            </Container>
            
            <ToastContainer
                hideProgressBar={true}
                autoClose={2000}
                theme='dark'
            />
        </AppShell>
    );
};

export default MainLayout;
