import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./views/Payment";
import Completion from "./views/Completion";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Payment />} />
                <Route path="/completion" element={<Completion />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;