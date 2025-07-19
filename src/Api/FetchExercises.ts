export type ExerciseTemplate = {
    id: string;
    title: string;
    type: string;
    primaryMuscleGroup: string;
    secondaryMuscleGroups: string[];
}

type FetchExercises = (keyword: string) => Promise<ExerciseTemplate[]>;

export const fetchExercises: FetchExercises = async (keyword: string) => {
    try {
        const response = await fetch(`http://localhost:5112/exercise-templates/search?keyword=${keyword}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    } 
}