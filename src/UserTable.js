import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Drawer, Button, TablePagination } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let editId = 0;
export default function UserTable() {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [role, setRole] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const navigate1 = useNavigate();
  const navigate2 = useNavigate();
  const roleMapping = {
    "Admin": 1,
    "Manager": 2
  }
  const departmentMapping = {
    "Genel Müdürlük": 1,
    "Yazılım Geliştirme": 2
  }
  const selectedRoleId = roleMapping[role];
  const selectedDepartmentId = departmentMapping[departmentFilter];


  // const getUsersById = (id) => {
  //   const link = "https://delta.eu-west-1.elasticbeanstalk.com/users/" + id;
  //   axios.get(link, {
  //     headers: { Authorization: token }
  //   })
  //     .then((Response) => {
  //       console.log("users found", Response.data);
  //       const id = Response.data.id;
  //       return id;
  //     })
  //     .catch((Error) => {
  //       console.error('users not found', Error);
  //       setErrorSnackbarOpen(true);
  //     });
  // };



  const emailCheck = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  const columns = [
    { field: 'id', headerName: t('usertable.id'), width: 90 },
    { field: 'name', headerName: t('usertable.name'), width: 130 },
    { field: 'surname', headerName: t('usertable.surname'), width: 130 },
    { field: 'email', headerName: t('usertable.email'), width: 200 },
    { field: 'role', headerName: t('usertable.role'), width: 90, valueGetter: (params) => `${params.row.role.name} ` },
    { field: 'company', headerName: t('usertable.company'), width: 220, valueGetter: (params) => `${params.row.company.name} ` },
    { field: 'department', headerName: t('usertable.department'), width: 180, valueGetter: (params) => `${params.row.department.name} ` },

  ];

  if (userRole === '1') {
    columns.push({
      field: 'actions', headerName: t('usertable.actions'), width: 100, sortable: false, renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => handleEditClick(params.row.id)}
            style={{ color: 'whitesmoke' }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteClick(params.row.id)}
            style={{ color: 'whitesmoke' }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )
    })
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    console.log("delete", deleteId);
    const link = "https://delta.eu-west-1.elasticbeanstalk.com/users/" + deleteId;
    axios.delete(link, {
      headers: { Authorization: token }
    })
      .then((Response) => {
        console.log("Row deleted", Response.data);
        const updatedRows = rows.filter((item) => item.id !== deleteId);
        setRows(updatedRows);
        setFilteredRows(updatedRows);
        handleCloseDialog();
        setSuccessSnackbarOpen(true);

      })
      .catch((Error) => {
        console.error('Delete Failed', Error);
        handleCloseDialog();
        setErrorSnackbarOpen(true);

      });
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessSnackbarOpen(false);
    setErrorSnackbarOpen(false);
  };


  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditClick = (id) => {
    setEditDialogOpen(true);
    editId = id;
  };


  const handleEditSubmit = (id) => {

    const editData = {
      name: name,
      surname: surname,
      email: email,
      roleId: selectedRoleId,
      departmentId: selectedDepartmentId
    }

    console.log("edit", id);
    console.log("edit data", editData);
    const link = "https://delta.eu-west-1.elasticbeanstalk.com/users/" + id;
    axios.put(link, editData, {
      headers: { Authorization: token }
    })
      .then((Response) => {
        console.log("Row Edited", Response.data);
        const updatedRows = rows.filter((item) => item.id !== id);
        getUsers();
        setSuccessSnackbarOpen(true);
      })
      .catch((Error) => {
        console.error('Edit Failed', Error);
        setErrorSnackbarOpen(true);
      });
  };

  const handleSearchClick = () => {
    console.log("Search clicked");
    console.log("Search item:", searchItem);
    if (searchItem.trim() === '') {
      console.log("No search item, setting all rows");
      setFilteredRows(rows);
    } else {
      const filteredRows = rows.filter((row) =>
        row.name.toLowerCase().includes(searchItem.toLowerCase()) ||
        row.surname.toLowerCase().includes(searchItem.toLowerCase()) ||
        row.email.toLowerCase().includes(searchItem.toLowerCase())
      );
      console.log("Filtered rows:", filteredRows);
      setFilteredRows(filteredRows);
    }
    setIsFilterOpen(false);
    console.log("Search complete");
  };

  const handleFilteredClick = () => {
    const filteredRows = rows.filter((row) =>
    (row.company.name.toLowerCase().includes(companyFilter.toLowerCase()) &&
      row.department.name.toLowerCase().includes(departmentFilter.toLowerCase()))
    );

    setFilteredRows(filteredRows);
    setIsFilterOpen(false);
  };

  const handleAddClick = () => {
    if (!emailCheck(email)) {
      console.log("Email is not valid. Please enter a valid email.");
      setEmailError(true);
      return;
    }
    if (name.length === 0 || surname.length === 0 || email.length === 0) {
      console.log("Empty string. Please check empty fields.");
      setErrorSnackbarOpen(true);
      return;
    }
    const addData = {
      name: name,
      surname: surname,
      email: email,
      roleId: selectedRoleId,
      departmentId: selectedDepartmentId,
    };
    console.log(addData);
    console.log(token);
    setAccessToken(token);
    axios.post("https://delta.eu-west-1.elasticbeanstalk.com/users/create", addData, {
      headers: { Authorization: token }
    })
      .then((Response) => {
        console.log(Response.data);
        getUsers();
        setSuccessSnackbarOpen(true);
      })
      .catch((Error) => {
        console.error("Error add user:", Error);
        setErrorSnackbarOpen(true);
      });
  }

  const handleClear = () => {
    setSearchItem('');
    setCompanyFilter('');
    setDepartmentFilter('');
    setFilteredRows(rows);
    setSuccessSnackbarOpen(false);
    setErrorSnackbarOpen(false);
    setEmailError(false);
  };
  const getUsers = () => {
    setAccessToken(token);
    axios.get("https://delta.eu-west-1.elasticbeanstalk.com/users/all", {
      params: { pageSize: 100 },
      headers: { Authorization: token }
    })
      .then((Response) => {
        console.log(Response.data);
        const responseData = Response.data.data.content;
        setRows(responseData);
        setFilteredRows(responseData);
        const count = Response.data.data.content.length;

        console.log(count);
      })
      .catch((Error) => {
        console.error("Error fetching data:", Error);
      });

  };

  useEffect(() => {
    getUsers();

  }, []);

  const handleClickHomepage = () => {
    navigate1('/homepage');
  };

  const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate2('/');
    setLoggedIn(false);
  }


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  if (token == null) {
    navigate2('/');
  }
  else {
    return (
      <div>
        <Button style={{ color: 'rgb(50, 68, 14)', position: 'absolute', top: 0, left: 0 }}
          onClick={() => setIsMenuOpen(true)}>
          <MenuIcon sx={{ fontSize: 30 }} />
        </Button>
        <Drawer anchor="left" open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', padding: '10px' }}>{t('usertable.menu')}</h2>
          <div >
            <Button onClick={handleClickHomepage} style={{ marginRight: '50px', marginLeft: '10px', color: 'black' }}>
              {t('usertable.homepage')}
            </Button>
            <div>
              <Button style={{ marginRight: '50px', marginLeft: '10px', color: 'black' }} color="primary">
                {t('usertable.users')}
              </Button>
            </div>
            <div>
              {loggedIn ? (
                <>
                  <Button onClick={Logout} style={{ marginRight: '50px', marginLeft: '10px', color: 'black' }} color="primary">
                    <LogoutIcon />
                  </Button>
                </>
              ) : (
                <p>{t('usertable.pleaseLogin')}</p>
              )}
            </div>
          </div>
        </Drawer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>

          <div className='table'
            style={{

              position: 'absolute',
              height: 700,
              width: '62%',
              flexGrow: 1,
            }}>
            <div style={{
              display: 'flex',  
              alignItems: 'center',  
              justifyContent: 'flex-end', 
            }}>
              <TextField type="text"
                placeholder={t('usertable.search')}
                value={searchItem}
                className='searchField'
                size="small"
                onChange={(e) => setSearchItem(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <IconButton onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  ),
                  endAdornment: (
                    <>
                      {searchItem && (
                        <IconButton onClick={handleClear}>
                          <ClearIcon />
                        </IconButton>
                      )}
                    </>
                  )
                }}
                style={{
                  position: 'relative', backgroundColor: 'whitesmoke', bottom: '3px',
                  border: 'none', borderRadius: '5px'
                }}
              />
              <IconButton onClick={() => setIsFilterOpen(true)} style={{ color: 'whitesmoke', backgroundColor: 'rgb(50, 68, 14)', marginRight: '10px', marginLeft: '10px', bottom: '2px' }}>
                <FilterListIcon />
              </IconButton>
              <Button startIcon={<AddIcon />} style={{ color: 'whitesmoke', backgroundColor: 'rgb(50, 68, 14)' }} onClick={() => setIsAddOpen(true)}>
                {t('usertable.addUser')}
              </Button>
            </div>

            {/* <DataGrid
              style={{
                color: 'whitesmoke',
                fontFamily: 'Arial, Helvetica, sans-serif',
                border: 'none',
                backgroundColor: 'rgb(50, 68, 14)'
              }}
              rows={filteredRows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              checkboxSelection
              autoHeight
              // components={{

              //   Pagination: (props) => (
              //     <TablePagination
              //       sx={{color:'whitesmoke'}}
              //       pageSizeOptions={[5, 10, 20, 30, 40, 50, 100]}
              //       rowsPerPageOptions={[10, 50, { value: -1, label: 'All' }]}
              //       labelRowsPerPage= {t('usertable.rowsPerPage')}  
              //       paginationMode="server"
              //       onPageChange={(params) => {
              //         console.log("===params===",params);
              //       }}
              //       labelDisplayedRows={({ from, to, count })=>
                    
              //      `${1}-${5} of ${14}`
              //     }
                  
              //     />
              //   ),
              // }}
            /> */}
            <DataGrid
              sx={{
                backgroundColor: "rgb(50, 68, 14)",
                color: "whitesmoke",
                fontWeight: 100,
                fontFamily: 'Arial, Helvetica, sans-serif',
                border: 'none',
              }}
              rows={filteredRows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}

              pageSizeOptions={[5, 10, 20, 30, 40, 50, 100]}
              autoHeight
            />

            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>{t('usertable.confirmDelete')}</DialogTitle>
              <DialogContent>
                <DialogContentText>{t('usertable.areyousure')}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  {t('usertable.cancel')}
                </Button>
                <Button onClick={handleConfirmDelete} color="primary">
                  {t('usertable.delete')}
                </Button>
                <Snackbar open={successSnackbarOpen}
                  autoHideDuration={3000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                  <Alert onClose={handleClose}
                    severity="success"
                    sx={{ width: '200%' }}>
                    {t('usertable.successfulMessage')}
                  </Alert>
                </Snackbar>
                <Snackbar open={errorSnackbarOpen}
                  autoHideDuration={3000}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                  <Alert onClose={handleClose} severity="error" sx={{ width: '200%' }}>
                    {t('snackbarErrors.notDeleted')}
                  </Alert>
                </Snackbar>
              </DialogActions>
            </Dialog>


            <Drawer anchor="right" open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
              <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', padding: '10px' }}>{t('usertable.editUser')}</h2>
              <div style={{ width: 300, padding: '20px', marginBottom: '10px', display: 'flex', flexDirection: 'column' }} className='addContainer'>
                <TextField
                  label={t('usertable.name')}
                  placeholder={t('usertable.enterName')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label={t('usertable.surname')}
                  placeholder={t('usertable.enterSurname')}
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  style={{ marginTop: '10px', borderRadius: '5px' }}
                />
                <TextField
                  label={t('usertable.email')}
                  placeholder={t('usertable.enterEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginTop: '10px', borderRadius: '5px' }}
                />
              </div>
              <div style={{ width: 300, marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                <FormControl style={{ width: '100%', left: '20px' }} >
                  <InputLabel>{t('usertable.role')}</InputLabel>
                  <Select value={role} onChange={(e) => setRole(e.target.value)}>
                    {Array.from(new Set(rows.map((row) => row.role.name))).map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: 300, padding: '20px', marginBottom: '10px', display: 'flex', flexDirection: 'column' }} className='filterContainer'>
                <FormControl style={{ width: '100%' }} >
                  <InputLabel>{t('usertable.company')}</InputLabel>
                  <Select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
                    {Array.from(new Set(rows.map((row) => row.company.name))).map((company) => (
                      <MenuItem key={company} value={company}>
                        {company}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: 300, marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                <FormControl style={{ width: '100%', left: '20px' }} >
                  <InputLabel>{t('usertable.department')}</InputLabel>
                  <Select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                    {Array.from(new Set(rows.map((row) => row.department.name))).map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <Button onClick={() => { setCompanyFilter(''); setDepartmentFilter(''); setRole(''); setName(''); setSurname(''); setEmail('') }} style={{ marginRight: '10px' }}>
                  {t('usertable.clear')}
                </Button>
                <Button onClick={() => setEditDialogOpen(false)} color="primary">
                  {t('usertable.cancel')}
                </Button>
                <Button onClick={() => handleEditSubmit(editId)} color="primary">
                  {t('usertable.save')}
                </Button>
                <Snackbar open={successSnackbarOpen}
                  autoHideDuration={3000}
                  onClose={handleCloseDialog}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                  <Alert onClose={handleCloseDialog}
                    severity="success"
                    sx={{ width: '200%' }}>
                    {t('usertable.editSuccessful')}
                  </Alert>
                </Snackbar>
                <Snackbar open={errorSnackbarOpen}
                  autoHideDuration={3000}
                  onClose={handleCloseDialog}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                  <Alert onClose={handleCloseDialog} severity="error" sx={{ width: '200%' }}>
                    {t('snackbarErrors.notEdited')}
                  </Alert>
                </Snackbar>
              </div>
            </Drawer>


            <Drawer anchor="right" open={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
              <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', padding: '10px' }}>{t('usertable.filters')}</h2>
              <div style={{ width: 300, padding: '20px', marginBottom: '30px', display: 'flex', flexDirection: 'column' }} className='filterContainer'>
                <FormControl style={{ width: '100%', backgroundColor: 'whitesmoke' }} >
                  <InputLabel>{t('usertable.company')}</InputLabel>
                  <Select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
                    {Array.from(new Set(rows.map((row) => row.company.name))).map((company) => (
                      <MenuItem key={company} value={company}>
                        {company}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: 300, marginBottom: '80px', display: 'flex', flexDirection: 'column' }}>
                <FormControl style={{ width: '100%', backgroundColor: 'whitesmoke', left: '20px' }} >
                  <InputLabel>{t('usertable.department')}</InputLabel>
                  <Select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                    {Array.from(new Set(rows.map((row) => row.department.name))).map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ padding: '20px', display: 'flex', justifyContent: 'flex-start' }}>
                <Button onClick={() => { setCompanyFilter(''); setDepartmentFilter(''); setFilteredRows(rows) }} style={{ marginRight: '10px' }}>
                  {t('usertable.clear')}
                </Button>
                <Button onClick={() => setIsFilterOpen(false)} style={{ marginRight: '10px' }}>
                  {t('usertable.cancel')}
                </Button>
                <Button onClick={handleFilteredClick} color="primary">
                  {t('usertable.filter')}
                </Button>
              </div>
            </Drawer>

            <Drawer anchor="right" open={isAddOpen} onClose={() => setIsAddOpen(false)}>
              <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', padding: '10px' }}>{t('usertable.addUser')}</h2>
              <div style={{ width: 300, padding: '20px', marginBottom: '10px', display: 'flex', flexDirection: 'column' }} className='addContainer'>
                <TextField
                  required
                  id="outlined-required"
                  label={t('usertable.name')}
                  placeholder={t('usertable.enterName')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label={t('usertable.surname')}
                  placeholder={t('usertable.enterSurname')}
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  style={{ marginTop: '10px', borderRadius: '5px' }}
                />
                <TextField
                  required
                  id="outlined-required"
                  label={t('usertable.email')}
                  placeholder={t('usertable.enterEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginTop: '10px', borderRadius: '5px' }}
                />
              </div>
              <div style={{ width: 300, marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                <FormControl style={{ width: '100%', left: '20px' }} >
                  <InputLabel>{t('usertable.role')}</InputLabel>
                  <Select value={role} onChange={(e) => setRole(e.target.value)}>
                    {Array.from(new Set(rows.map((row) => row.role.name))).map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: 300, padding: '20px', marginBottom: '10px', display: 'flex', flexDirection: 'column' }} className='filterContainer'>
                <FormControl style={{ width: '100%' }} >
                  <InputLabel>{t('usertable.company')}</InputLabel>
                  <Select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
                    {Array.from(new Set(rows.map((row) => row.company.name))).map((company) => (
                      <MenuItem key={company} value={company}>
                        {company}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ width: 300, marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
                <FormControl style={{ width: '100%', left: '20px' }} >
                  <InputLabel>{t('usertable.department')}</InputLabel>
                  <Select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                    {Array.from(new Set(rows.map((row) => row.department.name))).map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ padding: '20px', display: 'flex', justifyContent: 'flex-start' }}>
                <Button onClick={() => { setCompanyFilter(''); setDepartmentFilter(''); setRole(''); setName(''); setSurname(''); setEmail('') }} style={{ marginRight: '10px' }}>
                  {t('usertable.clear')}
                </Button>
                <Button onClick={() => setIsAddOpen(false)} style={{ marginRight: '10px' }}>
                  {t('usertable.cancel')}
                </Button>
                <div>
                  <Button onClick={handleAddClick} color="primary" type='submit' className="addBtn">
                    {t('usertable.add')}
                  </Button>
                  <Snackbar open={successSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleClear}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleClear}
                      severity="success"
                      sx={{ width: '200%' }}>
                      {t('usertable.addSuccessful')}
                    </Alert>
                  </Snackbar>
                  <Snackbar open={errorSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleClear}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleClear} severity="error" sx={{ width: '200%' }}>
                      {t('snackbarErrors.stringEmpty')}
                    </Alert>
                  </Snackbar>
                  <Snackbar open={emailError}
                    autoHideDuration={3000}
                    onClose={handleClear}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleClear}
                      severity="error"
                      sx={{ width: '200%' }}>
                      {t('snackbarErrors.emailError')}
                    </Alert>
                  </Snackbar>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    );
  }
}