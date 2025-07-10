import type { WeeklyMuscleGroupSummary } from "../Routes/WorkoutHistory";

type FetchMuscleGroupData = () => Promise<WeeklyMuscleGroupSummary[]>;

export const fetchMuscleGroupData: FetchMuscleGroupData = async() => {
    try {
        const response = await fetch("http://localhost:5112/muscle-groups");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}