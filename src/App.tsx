import { useEffect, useState } from 'react';
import { Accordion, Container, ListGroup } from 'react-bootstrap';

type FetchMuscleGroupData = () => Promise<WeeklyMuscleGroupSummary[]>;

type WeeklyMuscleGroupSummary = {
  startDate: string,
  endDate: string,
  workouts: number,
  muscleGroups: MuscleGroup[]
}

type MuscleGroup = {
  muscleGroup: string,
  calculatedSets: number,
  primarySets: number,
  secondarySets: number
}

const fetchMuscleGroupData: FetchMuscleGroupData = async() => {
  try {
    const response = await fetch("http://localhost:5112/muscle-groups");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

const formatMuscleGroupTitle = (muscleGroupTitle: string) => {
  if (muscleGroupTitle.length == 0) return;
  if (muscleGroupTitle.length == 1) return muscleGroupTitle.toLocaleUpperCase();

  const words = muscleGroupTitle.split('_');
  const capitalisedWords = words.map(w => {
    if (w.length == 0) return "";
    if (w.length == 1) return w.toLocaleUpperCase();

    const firstLetter = w.charAt(0);
    return firstLetter.toLocaleUpperCase() + w.substring(1);
  });
  
  return capitalisedWords.join(' ');
}

function App() {
  const [muscleGroupData, setMuscleGroupData] = useState<WeeklyMuscleGroupSummary[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchMuscleGroupData();
      console.log(response);
      setMuscleGroupData(response);
    }
    fetchData();
  }, [])

  useEffect(() => {
    console.log(muscleGroupData);
  }, [muscleGroupData])

  return (
    <Container className="pt-4">
      {muscleGroupData.length > 0 
        && 
        (
          <Accordion>
          {muscleGroupData.map((mg, i) => 
            (
              <Accordion.Item eventKey={i.toString()}>
                <Accordion.Header>
                  <div>{mg.startDate} - {mg.endDate}</div> 
                  <div style={{fontWeight: "200"}} className="float-end">({mg.workouts} workouts)</div>
                </Accordion.Header>
                <Accordion.Body>
                    <ListGroup as="ol" numbered>
                      {mg.muscleGroups.length > 0 
                        && mg.muscleGroups.map(muscle => (
                          <ListGroup.Item as="li" className="pb-3"> 
                            {formatMuscleGroupTitle(muscle.muscleGroup)}
                              <div className="ps-4 pt-2">
                                <span>{muscle.calculatedSets} calculated sets </span>
                                | <span>{muscle.primarySets} primary sets </span>
                                | <span>{muscle.secondarySets} secondary sets</span>
                              </div>
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )
        }
    </Container>
  )
}

export default App
