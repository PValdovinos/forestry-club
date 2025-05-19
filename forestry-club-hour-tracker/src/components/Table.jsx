import { DataGrid } from "@mui/x-data-grid"
import { Box } from "@mui/material"

function AdminTable({ rows, columns }) { 
    return (
        <Box 
            sx={{
                width: '100%',
                '& .MuiDataGrid-root': {
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    fontSize: 'medium',
                    bgColor: '#ffffff',
                },
            }}
        >
            <DataGrid 
                rows={rows} 
                columns={columns}             
                sx={{
                    '& .MuiDataGrid-sortIcon': {
                        opacity: 1,
                        color: 'white',
                    },
                    '& .MuiDataGrid-menuIconButton': {
                        opacity: 1,
                        color: 'white'
                    },
                }}
            />
        </Box>
    )
}

export default AdminTable;