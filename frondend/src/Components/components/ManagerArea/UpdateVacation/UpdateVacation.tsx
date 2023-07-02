import { useNavigate, useParams } from "react-router-dom";
import "./UpdateVacation.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import VacationModel from "../../../../Models/VacationModel";
import notificationService from "../../../../Services/NotificationService";
import managerService from "../../../../Services/ManagerService";
import useVerifyAdmin from "../../../../Utils/useVerifyAdmin";
import appConfig from "../../../../Utils/AppConfig";

function UpdateVacation(): JSX.Element {

    useVerifyAdmin()

    const params = useParams()
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>()
    const navigate = useNavigate()
    const [imageName, setImageName] = useState<string>("")





    useEffect(() => {

        const vacationCode = +params.vacationCode
        managerService.getOneVacation(vacationCode)
            .then(v => {

                setValue("destination", v.destination)
                setValue("description", v.description)
                setValue("startDate", v.startDate)
                setValue("endDate", v.endDate)
                setValue("price", v.price)
                setValue("vacationCode", v.vacationCode)
                setValue("imageName", v.imageName)
                setImageName(v.imageName)

            })
            .catch(err => notificationService.error(err))

    }, [])

    async function send(vacation: VacationModel) {
        try {
            vacation.vacationCode = +params.vacationCode

            await managerService.updateVacation(vacation)
            navigate("/vacationManager")

        } catch (err: any) {
            notificationService.error(err)
        }
    }


    const bgStyle = {
        backgroundImage: `url(${appConfig.imagesUrl + imageName})`,
    };

    return (
        <div className="UpdateVacation">
            <h2>Update Vacation</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Destination</label>

                <input type="text" {...register("destination")} required />


                <label >description:</label>
                <textarea rows={10} cols={140} {...register("description")} required></textarea>

                <div className="dateTime">
                    <label>startDate: </label>
                    <input type="date" {...register("startDate")} required />

                    <label>endDate: </label>
                    <input type="date" {...register("endDate")} required />
                </div>

                <div className="price">
                    <label>price: </label>
                    <input type="number" {...register("price")} required />
                </div>
                <label>image: </label>
                <div className="imageField" style={bgStyle} >
                    <input type="file" className="imageChange" accept="image/*"{...register("image")} />
                </div>
                <button type="submit">Update vacation</button>
            </form>
        </div>
    );
}

export default UpdateVacation;
