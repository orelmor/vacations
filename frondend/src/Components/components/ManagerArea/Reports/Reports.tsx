import { useEffect, useState } from "react";
import "./Reports.css";
import VacationModel from "../../../../Models/VacationModel";
import vacationService from "../../../../Services/VacationService";
import notificationService from "../../../../Services/NotificationService";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import useVerifyAdmin from "../../../../Utils/useVerifyAdmin";

function Reports(): JSX.Element {
  useVerifyAdmin();

  const [vacations, setVacations] = useState<VacationModel[]>([]);

  useEffect(() => {
    vacationService
      .getAllVacationsASC()
      .then((v) => setVacations(v))
      .catch((err) => notificationService.error(err));
  }, []);



  // Download CSV
  function downloadCSV (){
    const csvContent = "data:text/csv;charset=utf-8," + vacationsToCSV();

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vacations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function vacationsToCSV  () {
    const headers = ["Destination", "Followers Count"];
    const rows = vacations.map((vacation) => [
      vacation.destination,
      vacation.followersCount,
    ]);

    const csvArray = [headers, ...rows];

    return csvArray.map((row) => row.join(",")).join("\n");
  };

  return (
    <div className="Reports">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={vacations}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="destination"
            scale="point"
            padding={{ left: 10, right: 10 }}
            
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            dataKey="followersCount"
            fill="#8884d8"
            background={{ fill: "#eee" }}
          />
        </BarChart>
      </ResponsiveContainer>
      <button onClick={downloadCSV}>Download Data</button>
    </div>
  );
}

export default Reports;