import { Badge } from "react-bootstrap";

type MuscleGroupBadgesProps = {
    primaryMuscleGroup: string;
    secondaryMuscleGroups: string[];
}

const MuscleGroupBadges = ({primaryMuscleGroup, secondaryMuscleGroups}: MuscleGroupBadgesProps) => {
    // If there are more than 2 secondary muscle groups, take the first two
    const trimmedSecondaryGroups = secondaryMuscleGroups.slice(0, 2);

    return (
        <>
            <Badge pill bg="primary" className="me-1">{primaryMuscleGroup}</Badge>
            {trimmedSecondaryGroups.length > 0 && (
                trimmedSecondaryGroups.map((mg) => (
                    <Badge key={mg} pill bg="secondary" className="me-1">
                        {mg}
                    </Badge>
                ))
            )}
            {trimmedSecondaryGroups.length < secondaryMuscleGroups.length && (
                <Badge pill bg="info" className="me-1">
                    +{secondaryMuscleGroups.length - trimmedSecondaryGroups.length} 
                </Badge>
            )}
        </>
    )
    
}

export default MuscleGroupBadges;