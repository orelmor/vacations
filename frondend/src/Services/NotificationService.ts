import { Notyf } from "notyf"

class NotificationService{
    private notification = new Notyf({
        duration: 2500, position: { x: "center", y: "top" }, types: [{ type: 'info', background: 'blue',icon: "Feedback"}]})

    public  succees(message: string): void {
        this.notification.success(message)
    }

    public error(err: any): void {
        const message = this.checkMessageType(err)
        this.notification.error(message)
    }

    public checkMessageType(err: any): string {
        if (typeof err === "string") return err
        if (typeof err.response?.data === "string") return err.response.data
        if (Array.isArray(err.response?.data)) return err.response.data[0]
        if (typeof err.message === "string") return err.message
        return "Some error ocurred, Please try again"
    }
}


const notificationService = new NotificationService()
export default notificationService