import { useEffect, useState } from "react";
import "./VacationsManager.css";
import VacationModel from "../../../../Models/VacationModel";

import ManagerVacationCard from "../ManagerVacationCard/ManagerVacationCard";
import { vacationStore } from "../../../../Redux/VacationsState";
import vacationService from "../../../../Services/VacationService";
import notificationService from "../../../../Services/NotificationService";
import useVerifyAdmin from "../../../../Utils/useVerifyAdmin";

function VacationsManager(): JSX.Element {
    useVerifyAdmin()
    
    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(()=>{
        vacationService.getAllVacationsASC()
        .then(v => setVacations(v))
        .catch(err=>notificationService.error(err))
        const unsub = vacationStore.subscribe(()=>{
            vacationService.getAllVacationsASC()
            .then(v => setVacations(v))
            .catch(err=>notificationService.error(err))
        })
        return ()=>{
            unsub()
        }
    },[])
    
    
    return (
        <div className="VacationsManager">
		 <h2>Manager page</h2>
            {vacations.map(vacation => 
                    <ManagerVacationCard key={vacation.vacationCode} vacation={vacation}></ManagerVacationCard>
                )}

        </div>
    );
}

export default VacationsManager;
