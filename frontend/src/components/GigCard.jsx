import React from "react";
import { Link } from "react-router-dom";

const GigCard = ({ gig }) => {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 truncate w-3/4">
                        {gig.title}
                    </h3>
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${gig.status === "open"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                    >
                        {gig.status.toUpperCase()}
                    </span>
                </div>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p className="line-clamp-3">{gig.description}</p>
                </div>
                <div className="mt-3 text-sm font-semibold text-gray-900">
                    Budget: ${gig.budget}
                </div>
                <div className="mt-4">
                    <Link
                        to={`/gig/${gig._id}`}
                        className="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
                    >
                        View Details &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GigCard;
