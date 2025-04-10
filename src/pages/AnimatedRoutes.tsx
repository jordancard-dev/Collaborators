// components/AnimatedRoutes.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home, About, User, Room } from '../pages';
import PageWrapper from '../pages/PageWrapper';

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/user" element={<PageWrapper><User /></PageWrapper>} />
                <Route path="/user/:id" element={<PageWrapper><User /></PageWrapper>} />
                <Route path="/room" element={<PageWrapper><Room /></PageWrapper>} />
                <Route path="/room/:id" element={<PageWrapper><Room /></PageWrapper>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
