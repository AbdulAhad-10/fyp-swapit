export interface SessionData {
  name: string;
  value: number;
  color: string;
}

export interface User {
  _id: string;
  username: string;
  profileImageUrl: string;
}

export interface Listing {
  _id: string;
  title: string;
  description: string;
}

export interface Session {
  _id: string;
  title: string;
  scheduledFor: string;
  status: string;
  duration: string;
  instructorId: User;
  learnerId: User;
  listingId: Listing;
  callId: string;
  createdAt: string;
  updatedAt: string;
}
