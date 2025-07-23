import { Button, Card, CloseButton, Form, Modal, Stack, Table } from "react-bootstrap";
import { WorkoutActionType, type DayOfWeek, type SavedWorkoutAction, type SavedWorkoutPlanState } from "../Reducers/SavedWorkoutPlanReducer";
import ExerciseRow from "./ExerciseRow";
import { useRef, useState } from "react";

type PlannerDayCardProps = {
    dayOfWeek: DayOfWeek;
    clickAddRoutineHandler: (dayOfWeek: DayOfWeek) => void;
    clickAddExerciseHandler: (dayOfWeek: DayOfWeek) => void;
    savedWorkoutPlan: SavedWorkoutPlanState;
    savedWorkoutDispatch: React.ActionDispatch<[action: SavedWorkoutAction]>
}

const PlannerDayCard = ({dayOfWeek, clickAddRoutineHandler, clickAddExerciseHandler, savedWorkoutPlan, savedWorkoutDispatch}: PlannerDayCardProps) => {
    const [isRestDay, setIsRestDay] = useState(false);
    const restDayToggleRef = useRef<HTMLInputElement>(null);
    const [showConfirmRestModal, setShowConfirmRestModal] = useState(false);

    const hasExercises = savedWorkoutPlan[dayOfWeek].exercises.length > 0;

    const switchOnClickHandler = () => {
        const isChecked = restDayToggleRef.current?.checked
        
        if (isChecked) {
            // Trigger modal first if the user has exercises
            if (savedWorkoutPlan[dayOfWeek].exercises.length > 0) {
                setShowConfirmRestModal(true);
            } else {
                setIsRestDay(true);
            }
        } else {
            setIsRestDay(false);
        }
    }

    const confirmRestDayHandler = () => {
        savedWorkoutDispatch({type: WorkoutActionType.CLEAR_EXERCISES, payload: {day: dayOfWeek}});
        setIsRestDay(true);
        setShowConfirmRestModal(false);
    }

    const onHideRestDayModal = () => {
        setShowConfirmRestModal(false);
        if (restDayToggleRef.current) {
            restDayToggleRef.current.checked = false;
        }
    }

    return (
        <Card bg="light" className={isRestDay ? "rest-day-bg mb-3" : "mb-3"} data-bs-theme="light" >
            <Card.Header className={isRestDay || !hasExercises ? "border-0" : ""}>
                <Stack direction="horizontal" gap={5}>
                    <h4 style={{fontWeight: "300"}}>{dayOfWeek}</h4>
                    <Form.Check style={{float: "right"}} type="switch" label="Rest Day" ref={restDayToggleRef} onClick={() => switchOnClickHandler()} />
                </Stack>
                
            </Card.Header>
            {!isRestDay &&(
                <>
                    {hasExercises && (
                        <Card.Body className="p-0">
                            <Table bordered className="m-0 p-0">
                            <colgroup>
                                <col style={{ width: "auto" }} />
                                <col style={{ width: "120px" }} />
                                <col style={{ width: '30px' }} />
                            </colgroup>
                                <tbody>
                                    {savedWorkoutPlan[dayOfWeek].exercises?.map(exercise => (
                                        <ExerciseRow 
                                            key={exercise.id}
                                            exercise={exercise} 
                                            removeFromExercises={(exerciseId) => savedWorkoutDispatch({ type: WorkoutActionType.REMOVE_EXERCISE, payload: {day: dayOfWeek, exerciseId: exerciseId }})}
                                            updateSets={(title, updatedSets) => savedWorkoutDispatch({ type: WorkoutActionType.MODIFY_EXERCISE_SETS, payload: {day: dayOfWeek, title: title, updatedSets: updatedSets }})}    
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    )}
                    <Card.Footer className="border-0">
                        <Form>
                            <Button variant="outline-dark" style={{fontSize: "0.8rem"}} className="me-2" onClick={() => clickAddExerciseHandler(dayOfWeek)}>
                                Add Exercise
                            </Button>

                            <Button variant="outline-dark" style={{fontSize: "0.8rem"}}onClick={() => clickAddRoutineHandler(dayOfWeek)} className="me-2">
                                Add Routine (from Hevy)
                            </Button>
                        </Form>
                    </Card.Footer>
                </>
            )}

            <Modal show={showConfirmRestModal}>
                <Modal.Body>
                    <Form.Label>Setting {dayOfWeek} as a rest day will remove existing exercises.</Form.Label>
                    <Button onClick={() => confirmRestDayHandler()} variant="danger">Confirm</Button>
                    <CloseButton
                        onClick={() => onHideRestDayModal()}
                        style={{position: "absolute", top: "5px", right: "5px"}} 
                    />
                </Modal.Body>   
            </Modal>
            
        </Card>
    )
}

export default PlannerDayCard;