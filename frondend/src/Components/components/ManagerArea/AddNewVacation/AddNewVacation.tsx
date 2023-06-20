import { useForm } from "react-hook-form";
import "./AddNewVacation.css";
import VacationModel from "../../../../Models/VacationModel";
import notificationService from "../../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import managerService from "../../../../Services/ManagerService";

function AddNewVacation(): JSX.Element {

    const {register,handleSubmit} = useForm<VacationModel>()
    const navigate = useNavigate()

    async function send(vacation:VacationModel){
        try {
            await managerService.addVacation(vacation)
            notificationService.succees("Vacation posted")
            navigate("/vacationManager")
            
        } catch (err:any) {
            notificationService.error(err)
        }
    }
    return (
        <div className="AddNewVacation">
			<h2>Add Vacation</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Destination</label>
                <input type="text" {...register("destination")} required/>


                <label>description</label>
                <textarea rows={20} cols={30} {...register("description")} required></textarea>

                <label>startDate</label>
                <input type="datetime-local" {...register("startDate")} required />

                <label>endDate</label>
                <input type="datetime-local" {...register("endDate")} required />

                <label>price</label>
                <input type="number" {...register("price")}  required/>

                <label>image</label>
                <input type="file" accept="image/*"{...register("image")} required />

                <button type="submit">Post vacation</button>
            </form>
        </div>
    );
}

export default AddNewVacation;
