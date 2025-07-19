import type { Routine } from "../Reducers/SavedWorkoutPlanReducer";

type fetchRoutines = () => Promise<Routine[]>;

export const fetchRoutines: fetchRoutines = async() => {
    try {
        const response = await fetch("http://localhost:5112/routines");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}