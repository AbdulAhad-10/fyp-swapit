// store/requestsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Request {
  _id: string;
  instructorId: {
    _id: string;
    username: string;
    profileImageUrl: string;
  };
  learnerId: {
    _id: string;
    username: string;
    profileImageUrl: string;
  };
  listingId: {
    _id: string;
    title: string;
    duration: string;
  };
  proposedDateTime: string;
  note?: string;
  status: "pending" | "accepted" | "rejected" | "expired";
  createdAt: string;
}

interface RequestsState {
  received: Request[];
  sent: Request[];
}

const initialState: RequestsState = {
  received: [],
  sent: [],
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setRequests: (
      state,
      action: PayloadAction<{ received: Request[]; sent: Request[] }>
    ) => {
      state.received = action.payload.received;
      state.sent = action.payload.sent;
    },
    updateRequestStatus: (
      state,
      action: PayloadAction<{ requestId: string; status: Request["status"] }>
    ) => {
      // Update sent requests
      state.sent = state.sent.map((request) =>
        request._id === action.payload.requestId
          ? { ...request, status: action.payload.status }
          : request
      );

      // Update received requests
      state.received = state.received.map((request) =>
        request._id === action.payload.requestId
          ? { ...request, status: action.payload.status }
          : request
      );
    },
    removeRequest: (state, action: PayloadAction<{ requestId: string }>) => {
      state.sent = state.sent.filter(
        (request) => request._id !== action.payload.requestId
      );
    },
  },
});

export const { setRequests, updateRequestStatus, removeRequest } =
  requestsSlice.actions;
export default requestsSlice.reducer;
