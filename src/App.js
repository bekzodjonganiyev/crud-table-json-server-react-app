import React, { useEffect, useState } from 'react'
import './app.css'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid } from 'ag-grid-community';
import { Button } from '@mui/material';
import FormDialog from './components/dialog/dialog';
import { useConfirm } from "material-ui-confirm";


function App() {

    const initialValue = {
        name: "",
        email: "",
        phone: "",
        dob: ""
    }

    const [gridApi, setGridApi] = useState(null)

    const [tableData, setTableData] = useState(null)

    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({ initialValue })

    const columnDefs = [
        { headerName: "ID", field: "id" },
        { headerName: "Name", field: "name" },
        { headerName: "Email", field: "email" },
        { headerName: "Phone", field: "phone" },
        { headerName: "Date of Birth", field: "dob" },
        {
            headerName: "Actions", field: "id", cellRendererFramework: (params) => <div>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => { handleUpdate(params.data) }}
                >Update</Button>
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={() => {
                        handleDelete(params.value, params.data.name)
                    }} >Delete</Button>
            </div>
        }
    ]

    const defaultColDefs = {
        sortable: true,
        flex: 1,
        filter: true,
        floatingFilter: true,
    }

    const confirm = useConfirm();


    const OnGridReady = (params) => {
        setGridApi(params)
    }

    const getUsers = () => {
        fetch('http://localhost:4000/users')
            .then(res => res.json())
            .then(res => setTableData(res))
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue)
    };

    const onChange = (e) => {
        const { value, id } = e.target
        setFormData({ ...formData, [id]: value })
    }

    const handleFormSubmit = () => {

        if (formData.id) {
            fetch(`http://localhost:4000/users/${formData.id}`, {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: { 'content-type': "apPlication/json" }
            })
                .then(res => res.json())
                .then(() => {
                    getUsers()
                    handleClose()
                })
        }
        else {
            fetch("http://localhost:4000/users", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { 'content-type': "apPlication/json" }
            })
                .then(res => res.json())
                .then(() => {
                    getUsers()
                    handleClose()
                })
        }
    }

    // const handleDelete = (id) => {
    //     fetch(`http://localhost:4000/users/${id}`, {
    //         method: "DELETE",
    //     })
    //         .then(res => res.json())
    //         .then(() => getUsers())
    // }

    const handleUpdate = (oldData) => {
        setFormData(oldData)
        handleClickOpen()
    }

    const handleDelete = (id, name) => {
        confirm({ description: `This item will permanently delete:  id=${id}, name=${name}` })
            .then(() => {
                fetch(`http://localhost:4000/users/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(() => getUsers())
            })
            .catch(() => console.log("Deletion cancelled."));
    };

    useEffect(() => {
        getUsers()
    }, [])



    return (
        <div>
            <h1 style={{ textAlign: "center" }}>React App</h1>
            <h3 style={{ textAlign: "center" }}>CRUD Operation with Json-server in ag-Grid</h3>
            <Button variant="contained" color="primary" style={{ float: "right" }} onClick={handleClickOpen}>Add user</Button>
            <FormDialog open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
            <br />
            <br />
            <br />
            <div className="ag-theme-alpine" style={{ height: "400px", textAlign: "center" }}>
                <AgGridReact
                    rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDefs}
                    OnGridReady={OnGridReady}
                />
            </div>
        </div>
    );
}

export default App;
