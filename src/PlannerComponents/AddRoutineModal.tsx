import { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { RoutineActionType, type DayOfWeek, type Routine, type RoutineAction } from "../Routes/PlanRoutine";
import { fetchRoutines } from "../Api/FetchRoutines";
import { formatDateWithDayAndMon } from "../Helpers/DateHelper";

type AddRoutineModalProps = {
    isOpen: boolean;
    onHide: () => void;
    currentDay: DayOfWeek;
    routineDispatcher: React.ActionDispatch<[action: RoutineAction]>
}

const AddRoutineModal = ({isOpen, onHide, currentDay, routineDispatcher}: AddRoutineModalProps) => {
    const [routines, setRoutines] = useState<Routine[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetchRoutines();
            setRoutines(response);
        }
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
                {/* <Form>
                    <Form.Control 
                        type="text"
                    />
                </Form> */}
                <div>
                    {routines.map(routine => (
                        <Card className="mt-3">
                            <Card.Body>
                                <h6>{routine.title}</h6>
                                <p className="mb-2" style={{fontWeight: "200", fontSize: "0.8rem"}}>Created - {formatDateWithDayAndMon(routine.createdAt)}</p>
                                <ul>
                                {routine.exercises.map(exercise => (
                                    <li>{exercise.title} | {exercise.sets.length} sets</li>
                                ))}
                                </ul>
                                <Button variant="outline-primary" onClick={() => routineDispatcher({ type: RoutineActionType.ADD, payload: {day: currentDay, routine: routine}})}>Add To Plan</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddRoutineModal;