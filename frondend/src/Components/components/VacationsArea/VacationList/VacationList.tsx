import { ChangeEvent, useEffect, useState } from "react";
import "./VacationList.css";
import VacationModel from "../../../../Models/VacationModel";
import vacationService from "../../../../Services/VacationService";
import notificationService from "../../../../Services/NotificationService";
import { authStore } from "../../../../Redux/AuthState";


function VacationList(): JSX.Element {

    const [vacations, setVacation] = useState<VacationModel[]>([])
    

    useEffect(() => {
        vacationService.getAllVacationsASC()
            .then(v => setVacation(v))
            .catch(err => notificationService.error(err))

    }, [])

    async function filter(args: ChangeEvent<HTMLSelectElement>) {
        const value = args.target.value
        switch (value) {
            case "all":

                break;
            case "following":
                console.log(value)
                break;
            case "active":
                console.log(value)
                break;
            case "future":
                console.log(value)
                break;
        }
    }


    return (
        <div className="VacationList">
            <hr />
            <select onChange={filter}>
                <option value="all">All Vacations</option>
                <option value="following">Following</option>
                <option value="active">Active Vacations</option>
                <option value="future">Future Vacations</option>
            </select>
            <hr />
            {vacations.map(v => <div key={v.vacationCode}>{v.destination}</div>)}
        </div>
    );
}

export default VacationList;
