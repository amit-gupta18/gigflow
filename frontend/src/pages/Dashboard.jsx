import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import GigCard from "../components/GigCard";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axiosClient.get("/gigs");
                setGigs(response.data.gigs || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch gigs");
            } finally {
                setLoading(false);
            }
        };

        fetchGigs();
    }, []);

    const filteredGigs = gigs?.filter((gig) =>
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
