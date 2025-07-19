import { daysOfWeek, type SavedWorkoutPlanState, type SetsPerMuscle } from "../Reducers/SavedWorkoutPlanReducer";

export const calculateSetsPerMuscle = (savedWorkoutState: SavedWorkoutPlanState) => {
    const setsPerMuscle = new Map<string, SetsPerMuscle>();

    for (const day of daysOfWeek) {
        const exercisesInWeek = savedWorkoutState[day].exercises;

        for (const exercise of exercisesInWeek) {
            addPrimarySets(setsPerMuscle, exercise.primaryMuscleGroup, exercise.sets);
            for (const muscle of exercise.secondaryMuscleGroups) {
                addSecondarySets(setsPerMuscle, muscle, exercise.sets);
            }
        }
    }

    return setsPerMuscle;
}

const addPrimarySets = (currentSets: Map<string, SetsPerMuscle>, muscle: string, sets: number) => {
    if (currentSets.has(muscle)) {
        let primaryMuscle = currentSets.get(muscle);
        currentSets.set(muscle, { 
            primarySets: (primaryMuscle?.primarySets ?? 0) + sets, 
            secondarySets: primaryMuscle?.secondarySets ?? 0
        })
    } else {
        currentSets.set(muscle, { primarySets: sets, secondarySets: 0});
    }
}

const addSecondarySets = (currentSets: Map<string, SetsPerMuscle>, muscle: string, sets: number) => {
    if (currentSets.has(muscle)) {
        let secondaryMuscle = currentSets.get(muscle);
        currentSets.set(muscle, { 
            primarySets: secondaryMuscle?.primarySets ?? 0, 
            secondarySets: (secondaryMuscle?.secondarySets ?? 0) + sets
        })
    } else {
        currentSets.set(muscle, { primarySets: 0, secondarySets: sets});
    }
}