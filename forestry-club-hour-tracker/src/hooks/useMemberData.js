import { useEffect, useState } from "react";
import { BASE_URL, USER_ACTIVATED } from "../projectVariables";

function useMemberData(email) {
    const [memberData, setMemberData] = useState([]);
    const [displayName, setDisplayName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/hours.php?email=${email}`, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const content = await response.json();

                if (content.length > 0) {
                    const first = content[0];
                    setDisplayName(`${first.fname} ${first.lname}`);
                    setMemberEmail(first.email);
                    setIsActive(first.active === USER_ACTIVATED);

                    const hasHours = first.submission_id !== null;
                    setMemberData(hasHours ? content : []);
                } else {
                    setDisplayName("Member");
                    setMemberEmail(email);
                    setMemberData([]);
                }
            } catch (error) {
                console.error("Failed to fetch member data:", error);
            }
        };

        fetchMemberData();
    }, [email]);

    return { memberData, displayName, memberEmail, isActive, setMemberData, setIsActive };
}

export default useMemberData