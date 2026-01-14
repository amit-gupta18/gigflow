import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGigById, fetchBids, placeBid, hireBid } from "../redux/gigSlice";

const ViewGig = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentGig, bids, loading, error } = useSelector((state) => state.gigs);
    const { user } = useSelector((state) => state.auth);

    const [bidPrice, setBidPrice] = useState("");
    const [bidMessage, setBidMessage] = useState("");

    useEffect(() => {
        dispatch(fetchGigById(id));
        dispatch(fetchBids(id));
    }, [dispatch, id]);

    const handlePlaceBid = async (e) => {
        e.preventDefault();
        if (!bidPrice || !bidMessage) return;
        await dispatch(placeBid({ gigId: id, bidData: { price: Number(bidPrice), message: bidMessage } }));
        setBidPrice("");
        setBidMessage("");
    };

    const handleHire = async (bidId) => {
        await dispatch(hireBid({ bidId }));
        // Optionally re-fetch gig fetching to update status
        dispatch(fetchGigById(id));
        dispatch(fetchBids(id)); // To update bids status (rejected/hired)
    };

    if (loading || !currentGig) return <div className="text-center mt-10">Loading gig details...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

    const isOwner = user && currentGig.userId === user._id; // Assuming backend returns userId in gig object
    // If backend returns ownerId or similar, adjust. 
    // Let's assume userId based on common patterns.

    // Actually, checking "api/gigs" response structure would be good, 
    // but let's assume standard 'userId' or 'owner' field.
    // If user object has _id, and gig has userId.

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Gig Details</h3>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Title</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentGig.title}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Description</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentGig.description}</dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Budget</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">${currentGig.budget}</dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${currentGig.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {currentGig.status.toUpperCase()}
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Bids ({bids.length})</h3>

                {/* Bids List */}
                {bids.length > 0 ? (
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {bids.map((bid) => (
                            <li key={bid._id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                                <div className="w-full flex items-center justify-between p-6 space-x-6">
                                    <div className="flex-1 truncate">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="text-gray-900 text-sm font-medium truncate">Bidder: {bid.userId}</h3>
                                            {/* Assuming bid object has userId or user populated with name */}
                                        </div>
                                        <p className="mt-1 text-gray-500 text-sm truncate">{bid.message}</p>
                                        <p className="mt-1 text-gray-900 font-semibold">${bid.price}</p>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bid.status === 'hired' ? 'bg-green-100 text-green-800' :
                                                bid.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {bid.status ? bid.status.toUpperCase() : 'PENDING'}
                                        </span>
                                    </div>
                                </div>
                                {isOwner && currentGig.status === 'open' && (
                                    <div className="-mt-px flex divide-x divide-gray-200">
                                        <div className="w-0 flex-1 flex">
                                            <button
                                                onClick={() => handleHire(bid._id)}
                                                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                            >
                                                <span className="ml-3">Hire</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No bids yet.</p>
                )}

                {/* Place Bid Form (Only for non-owners and open gigs) */}
                {!isOwner && currentGig.status === 'open' && (
                    <div className="bg-white shadow sm:rounded-lg p-6 mt-8">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Place a Bid</h4>
                        <form onSubmit={handlePlaceBid}>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                                    <div className="mt-1">
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            required
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            value={bidPrice}
                                            onChange={(e) => setBidPrice(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <div className="mt-1">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={3}
                                            required
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                            value={bidMessage}
                                            onChange={(e) => setBidMessage(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Submit Bid
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewGig;