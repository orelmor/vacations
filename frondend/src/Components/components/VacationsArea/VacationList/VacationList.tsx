import { ChangeEvent, useEffect, useState } from "react";
import "./VacationList.css";
import VacationModel from "../../../../Models/VacationModel";
import vacationService from "../../../../Services/VacationService";
import notificationService from "../../../../Services/NotificationService";
import { authStore } from "../../../../Redux/AuthState";
import ReactPaginate from "react-paginate";
import VacationCard from "../VacationCard/VacationCard";
import useVerifyLoggedIn from "../../../../Utils/useVerifyLoggedIn";

function VacationList(): JSX.Element {
    useVerifyLoggedIn()

    const [vacations, setVacations] = useState<VacationModel[]>([])
    
    
    useEffect(() => {
        vacationService.getAllVacationsASC()
            .then(v => setVacations(v))
            .catch(err => notificationService.error(err))
          
    }, [])

    async function handlePageClicked(data: any){
        let currentPage =data.selected +1 

    }

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
        } catch (err:any) {
            notificationService.error(err)
        }  
    }

    return (
        <div className="VacationList">
            <hr />
            <label>Filter by: </label>
            <select onChange={filter}>
                <option value="all">All Vacations</option>
                <option value="following">Following</option>
                <option value="active">Active Vacations</option>
                <option value="future">Future Vacations</option>
            </select>
            <hr />
            {vacations.map(v => <VacationCard key={v.vacationCode} vacation={v}></VacationCard>)}
            <ReactPaginate
            previousLabel={'previous'}
            nextLabel={"next"}
            pageCount={2}
            onPageChange={handlePageClicked} 
            containerClassName={"pagination" }
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"  }  
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}  
            nextClassName={"page-item"}   
            nextLinkClassName={"page-link"}  
            activeClassName={"active"} 
            />
        </div>
    );
}

export default VacationList;
