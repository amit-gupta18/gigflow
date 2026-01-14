import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const CreateGig = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !budget) return;

        try {
            setLoading(true);
            setError(null);
            await axiosClient.post("/gigs", { 
                title, 
                description, 
                budget: Number(budget) 
            });
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create gig");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 shadow rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Post a New Gig</h2>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Gig Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        required
                        rows={4}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                        Budget ($)
                    </label>
                    <input
                        type="number"
                        id="budget"
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                    >
                        {loading ? "Posting..." : "Post Gig"}
                        Post Gig
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateGig;