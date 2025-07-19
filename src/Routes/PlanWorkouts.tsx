import { useReducer, useState } from "react";
import PlannerDayCard from "../PlannerComponents/PlannerDayCard";
import AddRoutineModal from "../PlannerComponents/AddRoutineModal";
import { Col, Row } from "react-bootstrap";
import PlanTable from "../PlannerComponents/PlanTable";
import { daysOfWeek, initialWorkoutPlan, savedWorkoutReducer, type DayOfWeek } from "../Reducers/SavedWorkoutPlanReducer";
import { calculateSetsPerMuscle } from "../Selectors/SetsPerMuscleGroupSelector";
import AddExerciseModal from "../PlannerComponents/AddExerciseModal";

const PlanWorkouts = () => {
    const [isSearchRoutineModalOpen, setIsSearchRoutineModalOpen] = useState<boolean>(false);
    const [isSearchExerciseModalOpen, setIsSearchExerciseModalOpen] = useState<boolean>(false);
    
    const [currentDay, setCurrentDay] = useState<DayOfWeek | undefined>();

    const [savedWorkoutPlan, savedWorkoutDispatch] = useReducer(savedWorkoutReducer, initialWorkoutPlan);
    
    const clickAddRoutineHandler = (day: DayOfWeek) => {
        setIsSearchRoutineModalOpen(true);
        setCurrentDay(day);
    }

    const clickAddExerciseHandler = (day: DayOfWeek) => {
        setIsSearchExerciseModalOpen(true);
        setCurrentDay(day);
    }

    const setsPerMuscleGroup = calculateSetsPerMuscle(savedWorkoutPlan);

    return (
        <Row className="mb-5">
            <Col sm={6} className="mt-3" style={{width: "50%", display: "inline-block"}}>
                {daysOfWeek.map(day => (
                    <PlannerDayCard 
                        key={day}
                        dayOfWeek={day} 
                        clickAddRoutineHandler={clickAddRoutineHandler} 
                        clickAddExerciseHandler={clickAddExerciseHandler}
                        savedWorkoutPlan={savedWorkoutPlan}
                        savedWorkoutDispatch={savedWorkoutDispatch}
                    />
                ))}
            </Col>
            <Col sm={6} className="mt-3">
                <PlanTable
                    muscleGroupData={setsPerMuscleGroup}
                />
            </Col>

            <AddExerciseModal
                isOpen={isSearchExerciseModalOpen}
                onHide={() => setIsSearchExerciseModalOpen(false)}
                currentDay={currentDay!}
                savedWorkoutDispatch={savedWorkoutDispatch}
            />
            
            <AddRoutineModal 
                isOpen={isSearchRoutineModalOpen} 
                onHide={() => setIsSearchRoutineModalOpen(false)} 
                currentDay={currentDay!} 
                savedWorkoutDispatch={savedWorkoutDispatch}
            />
        </Row>
    );
}

export default PlanWorkouts;