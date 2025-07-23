import { useEffect } from "react";
import { Alert, Badge, Button, Card, CloseButton, Modal, Table } from "react-bootstrap";
import { formatDateWithMonAndYear } from "../Helpers/DateHelper";
import { WorkoutActionType, type DayOfWeek, type Routine, type SavedWorkoutAction } from "../Reducers/SavedWorkoutPlanReducer";
import useFetch from "../Api/useFetch";

type AddRoutineModalProps = {
    isOpen: boolean;
    onHide: () => void;
    currentDay: DayOfWeek;
    savedWorkoutDispatch: React.ActionDispatch<[action: SavedWorkoutAction]>
}

const AddRoutineModal = ({isOpen, onHide, currentDay, savedWorkoutDispatch}: AddRoutineModalProps) => {
    const { fetchData, data, loading, error } = useFetch<Routine[]>("http://localhost:5112/routines");

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Modal
            show={isOpen}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h4>Routines</h4>
                <CloseButton
                    onClick={() => onHide()}
                    style={{position: "absolute", top: "5px", right: "5px"}} 
                />
                <div>

                    {loading && <p>Loading...</p>}

                    {error && (
                        <Alert variant="danger" className="mt-2">There was an error fetching workout routines ): Try refreshing the page.</Alert>
                    )}

                    {data && data.map((routine, i) => (
                        <Card key={i} className="mt-3">
                            <Card.Body>
                                <h5>{routine.title}</h5>
                                <p className="mb-3" style={{fontWeight: "200", fontSize: "0.8rem"}}>Created - {formatDateWithMonAndYear(routine.createdAt)}</p>
                                <Table>
                                    <colgroup>
                                        <col style={{ width: "auto" }} />
                                        <col style={{ width: "100px"}} />
                                    </colgroup>
                                    <tbody>
                                    {routine.exercises.map((exercise, i) => (
                                         <tr key={i} className="mb-3 rounded-0">
                                            <td>
                                                {exercise.title + " "}
        
                                                <Badge pill bg="primary" className="ms-2 me-1">{exercise.primaryMuscleGroup}</Badge>
                                                    {exercise.secondaryMuscleGroups.length > 0 && (
                                                        exercise.secondaryMuscleGroups.map((mg) => (
                                                            <Badge key={mg} pill bg="secondary" className="me-1">
                                                                {mg}
                                                            </Badge>
                                                    ))
                                                )}
                                            </td>
                                            <td>
                                                {exercise.sets.length} sets
                                            </td>
                                        </tr>
                                    ))}
                                       
                                    </tbody>
                                </Table>
                                <Button variant="outline-primary" onClick={() => savedWorkoutDispatch({ type: WorkoutActionType.ADD_ROUTINE, payload: {day: currentDay, item: routine}})}>Add To Plan</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddRoutineModal;