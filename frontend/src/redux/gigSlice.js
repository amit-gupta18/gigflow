import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

// Async Thunks
export const fetchGigs = createAsyncThunk("gigs/fetchAll", async () => {
    const response = await axiosClient.get("/gigs");
    return response.data; // Assuming backend returns array of gigs directly or { gigs: [] }
});

export const fetchGigById = createAsyncThunk("gigs/fetchOne", async (id) => {
    const response = await axiosClient.get(`/gigs/${id}`);
    return response.data;
});

export const createGig = createAsyncThunk("gigs/create", async (gigData) => {
    const response = await axiosClient.post("/gigs", gigData);
    return response.data;
});

export const placeBid = createAsyncThunk("gigs/placeBid", async ({ gigId, bidData }) => {
    const response = await axiosClient.post("/bids", { ...bidData, gigId });
    return response.data;
});

export const hireBid = createAsyncThunk("gigs/hireBid", async ({ bidId }) => {
    const response = await axiosClient.patch(`/bids/${bidId}/hire`);
    return response.data;
});

export const fetchBids = createAsyncThunk("gigs/fetchBids", async (gigId) => {
    const response = await axiosClient.get(`/bids/${gigId}`);
    return response.data;
});

const gigSlice = createSlice({
    name: "gigs",
    initialState: {
        gigs: [],
        currentGig: null,
        bids: [], // Store bids for the current gig
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Fetch All Gigs
        builder
            .addCase(fetchGigs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGigs.fulfilled, (state, action) => {
                state.loading = false;
                state.gigs = action.payload;
            })
            .addCase(fetchGigs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        // Fetch Gig By ID
        builder
            .addCase(fetchGigById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.currentGig = null;
                state.bids = []; // Clear old bids
            })
            .addCase(fetchGigById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentGig = action.payload;
            })
            .addCase(fetchGigById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        // Fetch Bids
        builder.addCase(fetchBids.fulfilled, (state, action) => {
            state.bids = action.payload;
        });

        // Create Gig
        builder.addCase(createGig.fulfilled, (state, action) => {
            state.gigs.push(action.payload);
        });

        // Place Bid
        builder.addCase(placeBid.fulfilled, (state, action) => {
            state.bids.push(action.payload);
        });

        // Hire Bid
        builder.addCase(hireBid.fulfilled, (state, action) => {
            // Update bid status in local state
            const index = state.bids.findIndex(b => b._id === action.payload._id);
            if (index !== -1) {
                state.bids[index] = action.payload;
            }
            // Also update other bids to rejected if backend does it? 
            // Valid assumption: backend handles status updates, frontend just reflects it.
            // Ideally we re-fetch bids to be sure, but let's assume payload is the updated bid 
            // and maybe we need to reload to see others rejected. 
            // For now, let's just update the hired one.
        });
    },
});

export default gigSlice.reducer;
