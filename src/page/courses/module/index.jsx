import { Tabs } from "antd";
import { Link, useLocation } from "react-router-dom";
import Modules from "./tab_1/module";
import QuestionLvl from "./tab_2";

const ModulesTab = () => {
    
    
    const location = useLocation();
    const courseName  = location.state.name


    return (
        <div>
            <h1 className='absolute text-4xl'>
                <Link to='/courses' className='hover:text-black'>
                    Kurslar /
                </Link>
                <span className='hover:text-black'>{courseName}</span>
            </h1>
            <Tabs
                className='pt-20'
                defaultActiveKey='1'
                type='card'
                items={[
                    { label: "Modules", key: "1", children: <Modules /> },
                    {
                        label: "Question Level",
                        key: "2",
                        children: <QuestionLvl />,
                    },
                ]}
            />
        </div>
    );
};

export default ModulesTab;
