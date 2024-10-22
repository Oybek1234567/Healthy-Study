import { useState } from "react";
import TableMonday from "./tables/monday/table";
import TableTuesday from "./tables/tuesday/table";
import TableFriday from "./tables/friday/table";
import TableWednesday from "./tables/wednesday/table";
import TableThursday from "./tables/thursday/table";
import TableSaturday from "./tables/saturday/table";
import TableSunday from "./tables/sunday/table";
const Timetable = () => {
    const [selected, setSelected] = useState("Monday");
    const handleChange = (e) => {
        setSelected(e.target.value);
    };
    const render = () => {
        switch (selected) {
            case "Monday":
                return <TableMonday />;
            case "Tuesday":
                return <TableTuesday />;
            case "Wednesday":
                return <TableWednesday />;
            case "Thursday":
                return <TableThursday />;
            case "Friday":
                return <TableFriday />;
            case "Saturday":
                return <TableSaturday />;
            case "Sunday":
                return <TableSunday />;
            default:
                return null;
        }
    };
    return (
        <div>
            <h1
                style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                }}>
                Dars Jadvali
            </h1>
            <select
                name='weeks'
                style={{ marginBottom: "20px", marginLeft: "80%" }}
                onChange={handleChange}>
                <option value='Monday'>Monday</option>

                <option value='Tuesday'>Tuesday</option>

                <option value='Wednesday'>Wednesday</option>

                <option value='Thursday'>Thursday</option>

                <option value='Friday'>Friday</option>

                <option value='Saturday'>Saturday</option>

                <option value='Sunday'>Sunday</option>
            </select>
            {render()}
        </div>
    );
};

export default Timetable;
