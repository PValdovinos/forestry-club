import { DataGrid } from "@mui/x-data-grid"

function AdminTable({ rows, columns }) { 
    return (
        <DataGrid 
            rows={rows} 
            columns={columns}             
            sx={{
                width: '100%',
                '& .MuiDataGrid-sortIcon': {
                    opacity: 1,
                    color: 'white',
                },
                '& .MuiDataGrid-menuIconButton': {
                    opacity: 1,
                    color: 'white'
                },
                boxShadow: 3,
            }}
        />
    )
}

export default AdminTable;