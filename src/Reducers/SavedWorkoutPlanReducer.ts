export const daysOfWeek: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export type SetsPerMuscle = {
    primarySets: number;
    secondarySets: number;
}

export type Routine = {
    title: string;
    notes?: string;
    exercises: RoutineExercise[];
    createdAt: string;
    updatedAt: string;
}

export type RoutineExercise = {
    id: string;
    title: string;
    sets: ExerciseSet[];
    primaryMuscleGroup: string;
    secondaryMuscleGroups: string[];
}

export type ExerciseSet = {
    reps?: number;
    type: string;
}

export type Exercise = {
    id: string;
    title: string;
    sets: number;
    primaryMuscleGroup: string;
    secondaryMuscleGroups: string[];
}

export enum WorkoutActionType {
    ADD_ROUTINE = 'ADD_ROUTINE',
    REMOVE_ROUTINE = 'REMOVE_ROUTINE',
    ADD_EXERCISE = 'ADD_EXERCISE',
    MODIFY_EXERCISE_SETS = 'MODIFY_EXERCISE_SETS',
    REMOVE_EXERCISE = 'REMOVE_EXERCISE',
    CLEAR_EXERCISES = 'CLEAR_EXERCISES'
}

export type SavedWorkoutPlanActionPayload = {
    day: DayOfWeek;
    item: Routine | Exercise;
}

type AddExerciseActionPayload = {
    day: DayOfWeek;
    item: Exercise;
}

type AddRoutineActionPayload = {
    day: DayOfWeek;
    item: Routine;
}

type RemoveExerciseActionPayload = {
    day: DayOfWeek;
    exerciseId: string;
}

type ModifyExerciseSetsActionPayload = {
    day: DayOfWeek;
    title: string;
    updatedSets: number;
}

type ClearExercisesActionPayload = {
    day: DayOfWeek;
}

type AddExerciseAction = {
    type: WorkoutActionType.ADD_EXERCISE;
    payload: AddExerciseActionPayload;
}

type RemoveExerciseAction = {
    type: WorkoutActionType.REMOVE_EXERCISE;
    payload: RemoveExerciseActionPayload;
}

type AddRoutineAction = {
    type: WorkoutActionType.ADD_ROUTINE
    payload: AddRoutineActionPayload;
}

type ModifyExerciseSetsAction = {
    type: WorkoutActionType.MODIFY_EXERCISE_SETS;
    payload: ModifyExerciseSetsActionPayload;
}

type ClearExercisesAction = {
    type: WorkoutActionType.CLEAR_EXERCISES;
    payload: ClearExercisesActionPayload;
}

export type SavedWorkoutAction = AddExerciseAction | RemoveExerciseAction | AddRoutineAction | ModifyExerciseSetsAction | ClearExercisesAction;

export type DayOfWeek = keyof SavedWorkoutPlanState;

export type SavedWorkoutDay = {
    exercises: Exercise[];
    isRestDay: boolean;
}

export type SavedWorkoutPlanState = {
    "Monday": SavedWorkoutDay;
    "Tuesday": SavedWorkoutDay;
    "Wednesday": SavedWorkoutDay;
    "Thursday": SavedWorkoutDay;
    "Friday": SavedWorkoutDay;
    "Saturday": SavedWorkoutDay;
    "Sunday": SavedWorkoutDay;
}

export const savedWorkoutReducer = (state: SavedWorkoutPlanState, action: SavedWorkoutAction) => {
    const { day } = action.payload;

    switch (action.type) {
        case WorkoutActionType.ADD_ROUTINE:
            const exercisesInRoutine = action.payload.item.exercises.map(e => ({title: e.title, primaryMuscleGroup: e.primaryMuscleGroup, secondaryMuscleGroups: e.secondaryMuscleGroups, sets: e.sets.length}))
            return {
                ...state,
                [day]: {
                    ...state[day],
                    exercises: [...state[day].exercises, ...exercisesInRoutine]
                }
            };
        case WorkoutActionType.ADD_EXERCISE:
            console.log(state);
            return {
                ...state,
                [day]: {
                    ...state[day],
                    exercises: [...state[day].exercises, action.payload.item]
                }
            };
        case WorkoutActionType.MODIFY_EXERCISE_SETS:
            const exercises = {
                ...state,
                [day]: {
                    ...state[day],
                    exercises: [...state[day].exercises]
                }
            }
            var exerciseToModify = exercises[day].exercises.find(e => e.title === action.payload.title);
            if (exerciseToModify) {
                exerciseToModify.sets = action.payload.updatedSets;
            }
            return exercises;
        case WorkoutActionType.REMOVE_EXERCISE:
            const currentState = {
                ...state
            }
            const exerciseIndexToRemove = currentState[day].exercises.findIndex(e => e.id === action.payload.exerciseId);
            if (exerciseIndexToRemove >= 0){
                currentState[day].exercises.splice(exerciseIndexToRemove, 1)
            }
            
            return currentState;
        case WorkoutActionType.CLEAR_EXERCISES:
            return {
                ...state,
                [day]: {
                    ...state[day],
                    exercises: []
                }
            }
        default:
            return state;
    }
}

export const initialWorkoutPlan = {
    "Monday": {
        routines: [], 
        exercises: [],
        isRestDay: false
    }, 
    "Tuesday": {
        routines: [], 
        exercises: [],
        isRestDay: false
    }, 
    "Wednesday": {
        routines: [], 
        exercises: [],
        isRestDay: false
    }, 
    "Thursday": {
        routines: [], 
        exercises: [],
        isRestDay: false
    }, 
    "Friday": {
        routines: [], 
        exercises: [],
        isRestDay: false
    }, 
    "Saturday": {
        routines: [], 
        exercises: [],
        isRestDay: false
    },
    "Sunday": {
        routines: [], 
        exercises: [],
        isRestDay: false
    }
};