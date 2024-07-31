import { Checkbox } from "antd";
import Person from "../../../../public/person-one.jpg";
import PersonTwo from "../../../../public/person-two.jpg";
import PersonThree from "../../../../public/person-three.jpg";
export const userData = [
    {
        key: "1",
        photo: Person,
        show: <Checkbox />,
        name: "John Brown",
        dateOfBirth: "12.04.2000",
        phone: "+998 99 999 99 99",
        series: "AB 1789629",
        passportImg: "/",
    },
    {
        key: "2",
        photo: PersonTwo,
        show: <Checkbox />,
        name: "Jim Green",
        dateOfBirth: "12.04.2000",
        phone: "+998 99 999 99 99",
        series: "AB 1789629",
        passportImg: "/",
    },
    {
        key: "3",
        photo: PersonThree,
        show: <Checkbox />,
        name: "Joe Black",
        dateOfBirth: "12.04.2000",
        phone: "+998 99 999 99 99",
        series: "AB 1789629",
        passportImg: "/",
    },
];
