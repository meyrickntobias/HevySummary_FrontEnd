import { Table } from "react-bootstrap";
import type { SetsPerMuscle } from "../Routes/PlanRoutine";

type PlanTableProps = {
    muscleGroupData: Map<string, SetsPerMuscle>
}

const PlanTable = ({muscleGroupData}: PlanTableProps) => {
    const muscleGroupSets = Array.from(muscleGroupData.entries()).map(([muscle, sets]) => ({
        muscle,
        ...sets,
        calculatedSets: sets.primarySets + (sets.secondarySets * 0.5)
    })).sort((a, b) => (b.calculatedSets - a.calculatedSets))

    return (
        <>
            {muscleGroupData.size > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Muscle Group</th>
                            <th>Sets</th>
                            <th>Primary Sets</th>
                            <th>Secondary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {muscleGroupSets.map((muscleGroup, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{muscleGroup.muscle}</td>
                                <td>{muscleGroup.calculatedSets}</td>
                                <td>{muscleGroup.primarySets}</td>
                                <td>{muscleGroup.secondarySets}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : <></>
        }
        </>
    )
}

export default PlanTable;