class DateFormator {

    public formatDateValue = (date: string) => {
        const formattedDate = new Date(date).toISOString().slice(0, 16);
        return formattedDate.replace("T", " ");
      };
    

}

const dateFormator = new DateFormator()
export default dateFormator