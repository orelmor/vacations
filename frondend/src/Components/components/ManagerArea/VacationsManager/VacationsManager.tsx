import { useEffect, useState } from "react";
import "./VacationsManager.css";
import VacationModel from "../../../../Models/VacationModel";
import vacationService from "../../../../Services/VacationService";
import notificationService from "../../../../Services/NotificationService";

function VacationsManager(): JSX.Element {
    
    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(()=>{
        vacationService.getAllVacationsASC()
            .then(vacations => setVacations(vacations))
            .catch(err=> notificationService.error(err))
    },[])
    
    
    return (
        <div className="VacationsManager">
		 <h2>Manager page</h2>
            {vacations.map(vacation => 
                    <p key={vacation.vacationCode}>{vacation.destination}</p>
                )}

        </div>
    );
}

export default VacationsManager;
