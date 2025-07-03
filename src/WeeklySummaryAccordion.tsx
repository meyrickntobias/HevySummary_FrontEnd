import { Accordion } from "react-bootstrap";
import type { WeeklyMuscleGroupSummary } from "./App";
import WeeklySummary from "./WeeklySummary";

type WeeklySummaryAccordionProps = {
    muscleGroupData: WeeklyMuscleGroupSummary[];
    onlyShowMuscle: string | undefined;
}

const formatDateStr = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-NZ", { month: 'short', day: '2-digit', year: '2-digit' })
}

const WeeklySummaryAccordion = ({muscleGroupData, onlyShowMuscle} : WeeklySummaryAccordionProps) => {
    return (
        <Accordion defaultActiveKey="0" alwaysOpen>
          {muscleGroupData.map((mg, i) => 
            (
              <Accordion.Item eventKey={i.toString()}>
                <Accordion.Header>
                  <div className="d-flex justify-content-between w-100 p-1">
                    <div>{formatDateStr(mg.startDate)} - {formatDateStr(mg.endDate)}
                    {i == 0 && <span className="ms-3" style={{fontWeight: "100"}}> This Week</span>} 
                    </div>
                    <div style={{fontWeight: "200"}} className="me-4">({mg.workouts} workouts)</div>
                  </div>
                </Accordion.Header>
                <Accordion.Body 
                  className="p-0" 
                  style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <WeeklySummary muscleGroups={mg.muscleGroups} onlyShowMuscle={onlyShowMuscle} />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
    )
}

export default WeeklySummaryAccordion;