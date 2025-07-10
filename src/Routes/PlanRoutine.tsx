import { useReducer, useState } from "react";
import PlannerDayCard from "../PlannerComponents/PlannerDayCard";
import AddRoutineModal from "../PlannerComponents/AddRoutineModal";
import { Col, Row } from "react-bootstrap";
import PlanTable from "../PlannerComponents/PlanTable";

const daysOfWeek: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export type Routine = {
    title: string;
    notes?: string;
    exercises: Exercise[];
    createdAt: string;
    updatedAt: string;
}

type Exercise = {
    title: string;
    sets: ExerciseSet[];
    primaryMuscleGroup: string;
    secondaryMuscleGroups: string[];
}

type ExerciseSet = {
    reps?: number;
    type: string;
}

export enum RoutineActionType {
    ADD = 'ADD',
    REMOVE = 'REMOVE'
}

export type RoutineActionPayload = {
    day: DayOfWeek;
    routine: Routine;
}

export type RoutineAction = {
    type: RoutineActionType;
    payload: RoutineActionPayload
}

export type DayOfWeek = keyof SavedRoutinesState;

export type SavedRoutinesState = {
    "Monday": Routine[];
    "Tuesday": Routine[];
    "Wednesday": Routine[];
    "Thursday": Routine[];
    "Friday": Routine[];
    "Saturday": Routine[];
    "Sunday": Routine[];
}

// Mocking the data
const setsPerMuscleGroup = new Map<string, SetsPerMuscle>();
setsPerMuscleGroup.set("Biceps", { primarySets: 3, secondarySets: 3 });


const reducer = (state: SavedRoutinesState, action: RoutineAction) => {
    const { day, routine } = action.payload;

    switch (action.type) {
        case RoutineActionType.ADD:
            return {
                ...state,
                [day]: [...state[day], routine]
            };
        case RoutineActionType.REMOVE:
            const routines = {
                ...state
            }
            const indexToRemove = routines[day].indexOf(routine);
            routines[day].splice(indexToRemove);
            return routines;
        default:
            return state;
    }
}

export type SetsPerMuscle = {
    primarySets: number;
    secondarySets: number;
}

const PlanRoutine = () => {
    const [isSearchRoutineModalOpen, setIsSearchRoutineModalOpen] = useState<boolean>(false);
    const [currentDay, setCurrentDay] = useState<DayOfWeek | undefined>();
    const initialRoutines = {"Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": []};

    const [state, dispatch] = useReducer(reducer, initialRoutines);
    
    const clickAddRoutineHandler = (day: DayOfWeek) => {
        setIsSearchRoutineModalOpen(true);
        setCurrentDay(day);
    }

    const getSetsPerMuscle = () => {
        const setsPerMuscle = new Map<string, SetsPerMuscle>();
        daysOfWeek.forEach(dayOfWeek => {
            const routinesInWeek = state[dayOfWeek];
            const exercisesInWeek = routinesInWeek.flatMap(routine => routine.exercises);

            console.log(exercisesInWeek);

            exercisesInWeek.forEach(exercise => {
                if (setsPerMuscle.has(exercise.primaryMuscleGroup)) {
                    let primaryMuscle = setsPerMuscle.get(exercise.primaryMuscleGroup);
                    setsPerMuscle.set(exercise.primaryMuscleGroup, { primarySets: (primaryMuscle?.primarySets ?? 0) + exercise.sets.length, secondarySets: primaryMuscle?.secondarySets ?? 0})
                } else {
                    setsPerMuscle.set(exercise.primaryMuscleGroup, { primarySets: exercise.sets.length, secondarySets: 0});
                }

                exercise.secondaryMuscleGroups.forEach(secondaryMuscleGroup => {
                    if (setsPerMuscle.has(secondaryMuscleGroup)) {
                        let secondaryMuscle = setsPerMuscle.get(secondaryMuscleGroup);
                        setsPerMuscle.set(secondaryMuscleGroup, { primarySets: secondaryMuscle?.primarySets ?? 0, secondarySets: secondaryMuscle?.secondarySets ?? 0 + exercise.sets.length})
                    } else {
                        setsPerMuscle.set(secondaryMuscleGroup, { primarySets: 0, secondarySets: exercise.sets.length});
                    }
                })
            })
        });
        return setsPerMuscle;
    }

    const setsPerMuscle = getSetsPerMuscle();

    return (
        <Row>
            <Col sm={6} className="mt-3" style={{width: "50%", display: "inline-block"}}>
                {daysOfWeek.map(day => (
                    <PlannerDayCard 
                        dayOfWeek={day} 
                        clickAddRoutineHandler={clickAddRoutineHandler} 
                        savedRoutines={state}
                        routineDispatcher={dispatch}
                    />
                ))}
            </Col>
            <Col sm={6} className="mt-3">
                <PlanTable
                    muscleGroupData={setsPerMuscle}
                />
                {/*
                    TODO: add a table that tracks muscle group sets as exercises and routines are added
                */}
                    {/* {setsPerMuscle > 0 ? (
                        <h3>{totalSets} sets</h3>
                    ) : <></> } */}
            </Col>

            
            <AddRoutineModal 
                isOpen={isSearchRoutineModalOpen} 
                onHide={() => setIsSearchRoutineModalOpen(false)} 
                currentDay={currentDay!} 
                routineDispatcher={dispatch}
            />
        </Row>
    );
}

export default PlanRoutine;