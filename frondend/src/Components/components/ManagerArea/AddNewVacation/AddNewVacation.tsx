import { useForm } from "react-hook-form";
import "./AddNewVacation.css";
import VacationModel from "../../../../Models/VacationModel";
import notificationService from "../../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import managerService from "../../../../Services/ManagerService";
import useVerifyAdmin from "../../../../Utils/useVerifyAdmin";

function AddNewVacation(): JSX.Element {
    useVerifyAdmin()

    const {register,handleSubmit,formState:{errors}} = useForm<VacationModel>()
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

    function validateStartDate(date:any):string {
        const selectedDate = new Date(date)
        const currentDate =  new Date()
       

        if(selectedDate < currentDate){
            return "Start date must be a future date"
        }
    } 

    
    return (
        <div className="AddNewVacation container">
			<h2>Add Vacation</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Destination</label>
                <input type="text" {...register("destination")} required/>


                <label>description: </label>
                <textarea rows={10} cols={140} {...register("description")} required></textarea>

                <label>startDate: </label>
                <input type="date" {...register("startDate",
                     { required: true, validate: validateStartDate },
                )}  />
                {errors.startDate && <p className="errs">{errors.startDate.message}</p>}

                <label> endDate: </label>
                <input type="date" {...register("endDate")} required />

                <label> price: </label>
                <input type="number" {...register("price")}  required/>

                <label> image :</label>
                <input type="file" accept="image/*"{...register("image")} required />
                <br /><br />

                <button type="submit">Post vacation</button>
            </form>
        </div>
    );
}

export default AddNewVacation;
