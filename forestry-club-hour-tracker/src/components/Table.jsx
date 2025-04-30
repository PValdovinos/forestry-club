import { DataGrid } from "@mui/x-data-grid"

function AdminTable({ rows, columns }) { 
    return (
        <div className="admin-table-container">
            <DataGrid
                className="admin-table"
                rows={rows}
                columns={columns}
            />
        </div>
    )
}

export default AdminTable;