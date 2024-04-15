import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

const Search: React.FC = () => {
    const { petList } = useContext(AppContext);
    const [selectedBreed, setSelectedBreed] = useState<string>("affenpinscher".toLowerCase());
    const [selectedCount, setSelectedCount] = useState<number>(1);
    const [randomImages, setRandomImages] = useState<string[]>([]);

    const getData = async () => {
        try {
            const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/${selectedCount}`);
            const data = await response.json();
            if (data.status === "success") {
                setRandomImages(data.message);
            } else {
                console.error("Failed to fetch random images:", data.message);
            }
        } catch (error) {
            console.error("Error fetching random images:", error);
        }
    };

    useEffect(() => {
        getData();
    }, [selectedBreed, selectedCount]);

    const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBreed(e.target.value);
    };

    const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCount(parseInt(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedBreed && selectedCount) {
            await getData();
        }
    };

    return (
        <div>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <select
                    id="breedSelect"
                    className="block w-full p-4 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    value={selectedBreed}
                    onChange={handleBreedChange}
                >
                    <option value="">Select a Breed</option>
                    {petList.map((breed: string, index: number) => (
                        <option key={index} value={breed}>
                            {breed}
                        </option>
                    ))}
                </select>
                <select
                    id="countSelect"
                    className="block w-full p-4 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 mt-4"
                    value={selectedCount}
                    onChange={handleCountChange}
                >
                    <option value={1}>1 Photo</option>
                    <option value={2}>2 Photos</option>
                    <option value={3}>3 Photos</option>
                </select>
                <button type="submit" className="block w-full p-4 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Get Photos
                </button>
            </form>
            {randomImages.length > 0 && (
                <div className="flex justify-center mt-4">
                    {randomImages.map((image: string, index: number) => (
                        <div key={index} className="m-4">
                            <img src={image} alt={`Random Dog ${index + 1}`} className="rounded-lg" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
