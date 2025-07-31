import { useReducer, useState } from "react";
import PlannerDayCard from "../PlannerComponents/PlannerDayCard";
import AddRoutineModal from "../PlannerComponents/AddRoutineModal";
import { Alert, Button, CloseButton, Col, Row } from "react-bootstrap";
import PlanTable from "../PlannerComponents/PlanTable";
import { daysOfWeek, initialWorkoutPlan, savedWorkoutReducer, type DayOfWeek } from "../Reducers/SavedWorkoutPlanReducer";
import { calculateSetsPerMuscle } from "../Selectors/SetsPerMuscleGroupSelector";
import AddExerciseModal from "../PlannerComponents/AddExerciseModal";

const PlanWorkouts = () => {
    const [isSearchRoutineModalOpen, setIsSearchRoutineModalOpen] = useState<boolean>(false);
    const [isSearchExerciseModalOpen, setIsSearchExerciseModalOpen] = useState<boolean>(false);
    
    const [currentDay, setCurrentDay] = useState<DayOfWeek | undefined>();

    const [ showInfoAlert, setShowInfoAlert ] = useState<boolean>(false);

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
        <>
            {!showInfoAlert && (
                <Button size="sm" variant="outline-info" className="mb-3" onClick={() => setShowInfoAlert(true)}>What is this?</Button>
            )}

            <Alert transition={false} className="pe-5" variant="info" show={showInfoAlert}>
                <p>
                    The following data is taken from the <a href="https://api.hevyapp.com/docs/">Hevy API</a>, and 
                    aggregates sets into muscle groups, divided into weeks (Mon - Sun). Warmup sets are excluded,
                    and exercises that have secondary muscle groups will contribute to half a set for the combined/calculated 
                    total sets. The split primary/secondary counts are also included. By default, the last 4 weeks (including
                    the current week) is included.
                </p>
                <CloseButton
                    onClick={() => setShowInfoAlert(false)}
                    style={{position: "absolute", top: "5px", right: "5px"}} 
                />
            </Alert>

            <Row className="mb-5">
                <Col md={6} sm={12} className="mt-3">
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
                <Col md={6} sm={12} className="mt-3">
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
        </>
    );
}

export default PlanWorkouts;