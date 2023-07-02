import { useEffect, useState } from "react";
import "./VacationsManager.css";
import VacationModel from "../../../../Models/VacationModel";

import ManagerVacationCard from "../ManagerVacationCard/ManagerVacationCard";
import { vacationStore } from "../../../../Redux/VacationsState";
import vacationService from "../../../../Services/VacationService";
import notificationService from "../../../../Services/NotificationService";
import useVerifyAdmin from "../../../../Utils/useVerifyAdmin";
import Pagination from "../../LayoutArea/Pagination/Pagination";


function VacationsManager(): JSX.Element {
    useVerifyAdmin()

    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(() => {
        vacationService.getAllVacationsASC()
            .then(v => setVacations(v))
            .catch(err => notificationService.error(err))

        const unsub = vacationStore.subscribe(() => {
            vacationService.getAllVacationsASC()
                .then(v => setVacations(v))
                .catch(err => notificationService.error(err))
        })
        return () => {
            unsub()

        }
    }, [])


    // ------ Pagination -------
    const [currentPage, setCurrentPage] = useState(1);
    const vacationsPerPage = 9;
    const totalPages = Math.ceil(vacations.length / vacationsPerPage);
    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    const handlePages = (updatePage: number) => setCurrentPage(updatePage);
    const currentVacations: VacationModel[] = vacations.slice(indexOfFirstVacation, indexOfLastVacation);




    return (
        <div className="VacationsManager container">

            <div className="row">
                {currentVacations.map(vacation =>
                    <div className="col" key={vacation.vacationCode}>
                        <ManagerVacationCard vacation={vacation}></ManagerVacationCard>
                    </div>
                )}
            </div>
            <div className="row">
                <Pagination page={currentPage} totalPages={totalPages} handlePagination={handlePages} ></Pagination>
            </div>

        </div>
    );
}

export default VacationsManager;
