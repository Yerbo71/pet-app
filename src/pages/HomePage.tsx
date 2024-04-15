import Header from "../components/Header.tsx";
import PetList from "../components/PetList.tsx";

const HomePage = () => {
    return (
        <div className="bg-[#111827]">
            <Header/>
            <div className="p-2">
                <div>
                    <PetList/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;