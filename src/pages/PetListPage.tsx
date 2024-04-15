import {useContext} from 'react';
import {AppContext} from "../App.tsx";
import Header from "../components/Header.tsx";

const PetListPage = () => {
    const {petList} = useContext(AppContext)
    return (
        <div className="bg-[#111827] text-white h-screen">
            <Header/>
            <div className="flex w-full flex-wrap gap-2 p-4">
                {petList.map((breed, index) => (
                    <div key={index} className="p-3 border-white rounded-2xl border">{breed}</div>
                ))}
                {}
            </div>
        </div>
    );
};

export default PetListPage;