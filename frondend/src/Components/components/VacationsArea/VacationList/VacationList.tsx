import { ChangeEvent, useEffect, useState } from "react";
import "./VacationList.css";
import VacationModel from "../../../../Models/VacationModel";
import vacationService from "../../../../Services/VacationService";
import notificationService from "../../../../Services/NotificationService";
import { authStore } from "../../../../Redux/AuthState";
import VacationCard from "../VacationCard/VacationCard";
import useVerifyLoggedIn from "../../../../Utils/useVerifyLoggedIn";
import Pagination from "../../LayoutArea/Pagination/Pagination";

function VacationList(): JSX.Element {
    useVerifyLoggedIn()

    const [vacations, setVacations] = useState<VacationModel[]>([])


    useEffect(() => {

        vacationService.getAllVacationsASC()
            .then(va => setVacations(va))
            .catch(err => notificationService.error(err))


    }, [])


    async function filter(args: ChangeEvent<HTMLSelectElement>) {
        const value = args.target.value
        try {
            switch (value) {
                case "all":
                    const allVacations = await vacationService.getAllVacationsASC()
                    setVacations(allVacations)
                    break;
                case "following":
                    const following = await vacationService.getVacationsFollowedByUser(authStore.getState().user.userCode)
                    setVacations(following)
                    break;
                case "active":
                    const active = await vacationService.getActiveVacations()
                    setVacations(active)
                    break;
                case "future":
                    const future = await vacationService.getFutureVacations()
                    setVacations(future)
                    break;
            }
        } catch (err: any) {
            notificationService.error(err)
        }
    }

    // ------ Pagination -------
    const [currentPage, setCurrentPage] = useState(1);
    const vacationsPerPage = 9;
    const totalPages = Math.ceil(vacations.length / vacationsPerPage);
    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    const handlePages = (updatePage: number) => setCurrentPage(updatePage);
    const currentVacations: VacationModel[] = vacations.slice(indexOfFirstVacation, indexOfLastVacation);


    return (
        <div className="VacationList">
            <hr />
            <label>Filter by: </label>
            <br /><br />
            <select onChange={filter} className="form-select">
                <option value="all">All Vacations</option>
                <option value="following">Following</option>
                <option value="active">Active Vacations</option>
                <option value="future">Future Vacations</option>
            </select>
            <hr />
            <div className="container">
                <div className="row">          
              {currentVacations.map(v =>
                 <div className="col" key={v.vacationCode} ><VacationCard  vacation={v}></VacationCard></div>
                
                 )}
              
            </div>
        <div className="row">
       <Pagination page={currentPage} totalPages={totalPages} handlePagination={handlePages} ></Pagination>
        </div>
        </div>
            
        </div>
    );
}

export default VacationList;
