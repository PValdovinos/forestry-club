import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const MemberStatusControls = ({ isActive, onToggle }) => {
    return (
        <Tooltip title={isActive ? "Set as Inactive" : "Set as Active"}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2">
                    {isActive ? "Active" : "Inactive"}
                </Typography>
                <Switch
                    checked={isActive}
                    onChange={onToggle}
                    color="success"
                    sx={{
                        transform: "scale(0.8)",
                        transformOrigin: "left center"
                    }}
                />
            </Box>
        </Tooltip>
    );
};

export default MemberStatusControls;