import { DataGrid } from "@mui/x-data-grid"
import { Box } from "@mui/material"

function AdminTable({ rows, columns }) { 
    return (
        <Box
            sx={{
                minWidth: 900,
                '& .MuiDataGrid-root': {
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    fontSize: 'medium',
                    backgroundColor: '#ffffff',
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'var(--color-table-header-bg)',
                    color: 'var(--color-table-header-text)',
                },
            }}
        >
            <DataGrid rows={rows} columns={columns} />
        </Box>
    )
}

export default AdminTable;