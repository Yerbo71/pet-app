import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import PetListPage from "./pages/PetListPage.tsx";

interface ContextValue {
    petList: string[];
    setPetList: React.Dispatch<React.SetStateAction<string[]>>;
}
export const AppContext = createContext<ContextValue>({
    petList: [],
    setPetList: () => {}
});

function App() {
    const [petList, setPetList] = useState<string[]>([]);

    return (
        <BrowserRouter>
            <AppContext.Provider value={{ petList, setPetList }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/petlist" element={<PetListPage />} />
                </Routes>
            </AppContext.Provider>
        </BrowserRouter>
    );
}

export default App;
