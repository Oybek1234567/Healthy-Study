import { useState } from "react";

const useSort = (userData, setUserData) => {
    const [sortConfig, setSortConfig] = useState(null);

    const handleSort = (key) => {
        let direction = "ascending";

        if (sortConfig?.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }

        setSortConfig({ key, direction });

        const sortedData = [...userData].sort((a, b) => {
            if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
            if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
            return 0;
        });

        setUserData(sortedData);
    };

    return { handleSort, sortConfig };
};

export { useSort };
