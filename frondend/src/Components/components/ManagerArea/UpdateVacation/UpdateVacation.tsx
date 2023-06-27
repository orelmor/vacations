import { useNavigate, useParams } from "react-router-dom";
import "./UpdateVacation.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import VacationModel from "../../../../Models/VacationModel";
import notificationService from "../../../../Services/NotificationService";
import managerService from "../../../../Services/ManagerService";
import useVerifyAdmin from "../../../../Utils/useVerifyAdmin";
import dateFormator from "../../../../Services/DateFormator";

function UpdateVacation(): JSX.Element {

    useVerifyAdmin()

    const params = useParams()
    const {register,handleSubmit,formState,setValue} = useForm<VacationModel>()
    const navigate = useNavigate()

   

    useEffect(()=>{

        const vacationCode = +params.vacationCode
        managerService.getOneVacation(vacationCode)
        .then(v=> {
            setValue("destination", v.destination)
            setValue("description", v.description)
            setValue("startDate", v.startDate )
            setValue("endDate", v.endDate)
            setValue("price",v.price)
            setValue("vacationCode",v.vacationCode)
            

        })
        .catch(err => notificationService.error(err))
        
    },[])

    async function send(vacation:VacationModel) {
        try {
            vacation.vacationCode = +params.vacationCode
            console.log(vacation)
            await managerService.updateVacation(vacation)
            navigate("/vacationManager")

        } catch (err:any) {
            notificationService.error(err)
        }
    }


    return (
        <div className="UpdateVacation">
			<h2>Update Vacation</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Destination</label>

                <input type="text" {...register("destination")} required/>


                <label >description:</label>
                <textarea rows={10} cols={140} {...register("description")} required></textarea>

            <div className="dateTime">
                <label>startDate: </label>
                <input type="datetime-local" {...register("startDate")} required />

                <label>endDate: </label>
                <input type="datetime-local" {...register("endDate")} required />
                </div>

                <div className="price">
                <label>price: </label>
                <input type="number" {...register("price")}  required/>
                </div>

            <div className="imageField">
                <label>image: </label>
                <input type="file" className="imageChange"  accept="image/*"{...register("image")}  />
                </div>
                <button type="submit">Update vacation</button>
            </form>
        </div>
    );
}

export default UpdateVacation;
