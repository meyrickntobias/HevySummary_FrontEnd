import { Table } from "react-bootstrap";
import type { SetsPerMuscle } from "../Reducers/SavedWorkoutPlanReducer";

type PlanTableProps = {
    muscleGroupData: Map<string, SetsPerMuscle>
}

const PlanTable = ({muscleGroupData}: PlanTableProps) => {
    const muscleGroupSets = Array.from(muscleGroupData.entries()).map(([muscle, sets]) => ({
        muscle,
        ...sets,
        calculatedSets: sets.primarySets + (sets.secondarySets * 0.5)
    })).sort((a, b) => (b.calculatedSets - a.calculatedSets))

    return muscleGroupData.size > 0 ? (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Muscle Group</th>
                        <th>* Sets</th>
                        <th>Primary Sets</th>
                        <th>Secondary</th>
                    </tr>
                </thead>
                <tbody>
                    {muscleGroupSets.map((muscleGroup, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{muscleGroup.muscle}</td>
                            <td>{muscleGroup.calculatedSets}</td>
                            <td>{muscleGroup.primarySets}</td>
                            <td>{muscleGroup.secondarySets}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <p>* Sets combine primary sets and secondary sets, where secondary sets count as 0.5 sets.</p>
        </>
    ) : 
    <>
        {/* <p>Start adding exercises to see results.</p> */}
    </>
}

export default PlanTable;