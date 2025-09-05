
import { Timestamp } from "firebase/firestore";

export type Advisory = {
  id?: string;
  advisoryTitle: string;
  advisorySummary: string;
  affectedArea: string;
  recommendedActions: string[];
  createdAt?: Timestamp;
};

export type AshaWorker = {
    id: string;
    name: string;
    location: string;
    reportsFiled: number;
}

export type HighRiskHotspot = {
    id: string;
    village: string;
    district: string;
    state: string;
    risk: "High" | "Medium" | "Low";
    reports: number;
    position: {
        lat: number;
        lng: number;
    };
}
