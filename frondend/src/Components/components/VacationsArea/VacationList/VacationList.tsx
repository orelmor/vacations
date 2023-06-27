import { ChangeEvent, useEffect, useState } from "react";
import "./VacationList.css";
import VacationModel from "../../../../Models/VacationModel";
import vacationService from "../../../../Services/VacationService";
import notificationService from "../../../../Services/NotificationService";
import { authStore } from "../../../../Redux/AuthState";
import ReactPaginate from "react-paginate";
import VacationCard from "../VacationCard/VacationCard";
import useVerifyLoggedIn from "../../../../Utils/useVerifyLoggedIn";
import followService from "../../../../Services/FollowService";
import { vacationStore } from "../../../../Redux/VacationsState";
import { vacationFilterStore } from "../../../../Redux/VacationFilterState";

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
              {vacations.map(v => <div className="col" key={v.vacationCode} ><VacationCard  vacation={v}></VacationCard></div>)}
              </div>
            </div>
        <div className="row">
        <ReactPaginate
                previousLabel={'previous'}
                nextLabel={"next"}
                pageCount={2}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
            
        </div>
    );
}

export default VacationList;
