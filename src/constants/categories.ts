export const AVAILABLE_CATEGORIES: string[] = [
    "City",
    "Service",
    "Culture",
    "Social",
    "Emergencies",
    "Roads",
    "Urgent",
    "Events",
    "Rules",
    "Traffic",
    "Security",
    "IT",
    "For Seniors",
    "Survey"
];

export const CATEGORY_OPTIONS = AVAILABLE_CATEGORIES.map(category => ({
    label: category,
    value: category
}));