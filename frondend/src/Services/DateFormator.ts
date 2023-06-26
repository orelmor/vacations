class DateFormator {

    public formatDate(date:any):string{
        const date1 = new Date(date)
        let day = date1.getDay()
        let month = date1.getMonth()
        let year = date1.getFullYear()

        return `${day}/${month}/${year}`
    }


}

const dateFormator = new DateFormator()
export default dateFormator