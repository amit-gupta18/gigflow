import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../redux/gigSlice";
import GigCard from "../components/GigCard";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { gigs, loading, error } = useSelector((state) => state.gigs);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchGigs());
    }, [dispatch]);

    const filteredGigs = gigs.filter((gig) =>
        gig.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="text-center mt-10">Loading gigs...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Open Gigs</h1>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />

            {filteredGigs.length === 0 ? (
                <p className="text-gray-500">No gigs found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredGigs.map((gig) => (
                        <GigCard key={gig._id} gig={gig} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
