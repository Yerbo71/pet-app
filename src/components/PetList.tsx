import React, { useContext, useEffect } from "react";
import { AppContext } from "../App.tsx";
import Search from "./Search.tsx";

interface BreedData {
    [breed: string]: string[];
}

const PetList: React.FC = () => {
    const { setPetList } = useContext(AppContext);

    const getPetList = async () => {
        try {
            const res = await fetch("https://dog.ceo/api/breeds/list/all");
            const data: { message: BreedData } = await res.json();
            const formattedData = formatData(data.message);
            const petList = Object.keys(formattedData);
            setPetList(petList);
        } catch (e) {
            console.log(e);
        }
    };

    const formatData = (data: BreedData): BreedData => {
        let formattedData: BreedData = {};
        for (const breed in data) {
            if (data[breed].length > 0) {
                data[breed].forEach((subBreed) => {
                    const formattedBreed = `${breed}/${subBreed}`;
                    formattedData[formattedBreed] = [];
                });
            } else {
                formattedData[breed] = [];
            }
        }
        return formattedData;
    };

    useEffect(() => {
        getPetList();
    }, []);

    return (
        <div className="w-full h-screen">
            <Search/>
        </div>
    );
};

export default PetList;
