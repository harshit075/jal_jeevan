

import { Advisory } from "./types";

export const mockHighRiskHotspots = [
  { village: "Rampur", district: "Kamrup", state: "Assam", risk: "High", reports: 42, position: { lat: 26.1445, lng: 91.7362 } },
  { village: "Sitapur", district: "West Siang", state: "Arunachal Pradesh", risk: "High", reports: 28, position: { lat: 28.23, lng: 94.86 } },
  { village: "Gopalganj", district: "Bishnupur", state: "Manipur", risk: "Medium", reports: 15, position: { lat: 24.66, lng: 93.84 } },
  { village: "Madhupur", district: "East Khasi Hills", state: "Meghalaya", risk: "High", reports: 35, position: { lat: 25.57, lng: 91.88 } },
  { village: "Aizawl", district: "Aizawl", state: "Mizoram", risk: "Low", reports: 5, position: { lat: 23.73, lng: 92.72 } },
  { village: "Kohima", district: "Kohima", state: "Nagaland", risk: "Medium", reports: 12, position: { lat: 25.66, lng: 94.10 } },
];

export const mockAshaWorkers = [
    { name: 'Sunita Devi', location: 'Kamrup, Assam', reportsFiled: 120 },
    { name: 'Priya Sharma', location: 'West Siang, Arunachal Pradesh', reportsFiled: 95 },
    { name: 'Anjali Das', location: 'Bishnupur, Manipur', reportsFiled: 78 },
];

export const mockAdvisories: Advisory[] = [
  {
    advisoryTitle: "Increased Mosquito Activity and Dengue Risk",
    advisorySummary: "Health officials have noted a significant increase in mosquito populations following recent rains. This raises the risk of dengue fever transmission. Be proactive in eliminating breeding grounds.",
    affectedArea: "City-wide",
    riskLevel: "Medium",
    recommendedActions: ["Eliminate standing water in and around your home (e.g., in tires, flower pots, and containers).", "Use mosquito repellent containing DEET, especially during dawn and dusk.", "Wear long-sleeved shirts and long pants to cover your skin.", "Keep windows and doors screened or closed to prevent mosquitos from entering."]
  },
   {
    advisoryTitle: "Boil Water Advisory for Sector 15",
    advisorySummary: "Due to potential contamination, all residents in Sector 15 are advised to boil tap water before consumption or use. Water samples have shown elevated levels of E. coli bacteria.",
    affectedArea: "Sector 15, Township Area",
    riskLevel: "High",
    recommendedActions: ["Boil all drinking water for at least 1 minute.", "Use bottled water for drinking, cooking, and brushing teeth.", "Disinfect all food preparation surfaces.", "Report any gastrointestinal symptoms to your local health clinic immediately."]
  },
  {
    advisoryTitle: "Cholera Outbreak Warning in Riverside Communities",
    advisorySummary: "An increasing number of cholera cases have been reported in communities along the river. The primary source is suspected to be contaminated river water used for drinking and bathing.",
    affectedArea: "All communities along the Great River bank, from Elm Bridge to Pine Ford.",
    riskLevel: "High",
    recommendedActions: ["Drink and use safe water (boiled or treated).", "Wash your hands often with soap and safe water.", "Cook food well, especially seafood, and eat it while it's hot.", "Clean up safely—in the kitchen and when caring for sick family members."]
  },
  {
    advisoryTitle: "Hygiene Alert: Monsoon Season",
    advisorySummary: "The arrival of monsoon season increases the risk of various water and foodborne illnesses. Please take extra precautions to maintain personal and household hygiene.",
    affectedArea: "All Northeast regions",
    riskLevel: "Low",
    recommendedActions: ["Wash hands thoroughly before eating or preparing food.", "Ensure street food is prepared hygienically and served hot.", "Avoid wading in floodwater to prevent skin infections.", "Keep your home and surroundings clean and dry."]
  },
  {
    advisoryTitle: "Heatwave Health Warning",
    advisorySummary: "An extreme heatwave is forecasted for the next 48-72 hours. High temperatures pose a significant health risk, especially for children, the elderly, and those with pre-existing conditions.",
    affectedArea: "Plains districts of Assam and Tripura",
    riskLevel: "Medium",
    recommendedActions: ["Stay hydrated by drinking plenty of water, even if you don't feel thirsty.", "Avoid direct sun exposure between 11 AM and 4 PM.", "Wear lightweight, light-colored, and loose-fitting clothing.", "Never leave children or pets in a parked car."]
  }
];
