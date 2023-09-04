import * as React from 'react';
import { DataGrid , GridFilterListIcon, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios'; 
import  {useState} from 'react';
import { useEffect } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl,Drawer,Button  } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'surname', headerName: 'Surname', width: 130 },
  { field: 'email', headerName: 'Email', width: 200},
  { field: 'role', headerName: 'Role', width: 90, valueGetter: (params) => `${params.row.role.name} `},
  { field: 'company', headerName: 'Company', width: 220 , valueGetter: (params) => `${params.row.company.name} ` },
  { field: 'department', headerName: 'Department', width: 180,valueGetter: (params) => `${params.row.department.name} ` },
  

];

export default function UserTable() {
    const [rows,setRows] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [searchItem, setSearchItem] = useState('');
    const [filteredRows,setFilteredRows] = useState([]);
    const [companyFilter, setCompanyFilter] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [role,setRole] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isAddOpen,setIsAddOpen] = useState(false);
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [email,setEmail] = useState('');
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [emailError,setEmailError] = useState(false);
    //Bu errorlar çeviri dosyasında ona göre yazılacak ayrıca 
    //obje tanımlamaya gerek yok toggle yapılacak setNewPassword gibi
    //const [nameSurnameEmailError, setNameSurnameEmailError] = useState(false);
    //const [roleCompanyDepartmentError, setRoleCompanyDepartmentError] = useState(false);
    const token=localStorage.getItem('token');
    const roleMapping={
      "Admin":1,
      "Manager":2
    }
    const departmentMapping={
      "Genel Müdürlük": 1,
      "Yazılım Geliştirme":2
    }
    const selectedRoleId = roleMapping[role];
    const selectedDepartmentId = departmentMapping[departmentFilter];

    const emailCheck=(email)=>{
      const emailPattern =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
  }


    const handleSearchClick=()=>{
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

      const handleFilteredClick=()=>{
        const filteredRows = rows.filter((row) =>
        (row.company.name.toLowerCase().includes(companyFilter.toLowerCase()) &&
          row.department.name.toLowerCase().includes(departmentFilter.toLowerCase()))
      );
    
      setFilteredRows(filteredRows);
      setIsFilterOpen(false);
    };

    const handleAddClick=()=>{
      if(!emailCheck(email)){
        console.log("Email is not valid. Please enter a valid email.");
        setEmailError(true);
        return;
      }
      if (name.length === 0 || surname.length === 0 || email.length === 0)  {
        console.log("Empty string. Please check empty fields.");
        setErrorSnackbarOpen(true);
        return;
      }
      const addData={
        name: name,
        surname: surname,
        email: email,
        roleId: selectedRoleId,
        departmentId: selectedDepartmentId,
      };
      //console.log(addData);
      //console.log(token);
      setAccessToken(token);
      axios.post("https://delta.eu-west-1.elasticbeanstalk.com/users/create", addData,{
        headers:{Authorization: token}
      })
      .then((Response)=>{
        console.log(Response.data);
        setSuccessSnackbarOpen(true);
      })
      .catch((Error)=>{
        console.error("Error add user:",Error);
        setErrorSnackbarOpen(true);
      });
    }

      const handleClear=()=>{
        setSearchItem('');
        setCompanyFilter('');
        setDepartmentFilter('');
        setFilteredRows(rows);
        setSuccessSnackbarOpen(false);
        setErrorSnackbarOpen(false);
        setEmailError(false);
      }

   useEffect(()=>{
    setAccessToken(token);
        axios.get("https://delta.eu-west-1.elasticbeanstalk.com/users/all",{
            params: {pageSize: 100},
            headers:{Authorization: token}
        })
        .then((Response)=>{
            console.log(Response.data);
            const responseData = Response.data.data.content;
            setRows(responseData);
            setFilteredRows(responseData);
        })
        .catch((Error)=>{
            console.error("Error fetching data:",Error);
        });
        
   },[]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
      <div className='table' 
            style={{ backgroundColor: 'rgb(28, 42, 0)',
                      position: 'absolute',
                      height: 600, 
                      width: '70%',
                      flexGrow: 1, 
                      }}>
      
      <DataGrid
          style={{color: 'whitesmoke',
                  fontFamily: 'Arial, Helvetica, sans-serif'}}
          rows={filteredRows}
          columns={columns}
          initialState={{
          pagination: {
          paginationModel: { page: 0, pageSize: 5 },
          },
        }}
         pageSizeOptions={[5, 10, 20, 30, 40, 50, 100]}
          checkboxSelection
          />
        <div className='searchContainer' 
              style={{ position: 'absolute', bottom: -3, padding: '10px'}}>
          
          <TextField type="text"
                  placeholder="Search..."
                  value={searchItem}
                  className='searchField'
                  size= "small"
                  onChange={(e)=>setSearchItem(e.target.value)}
                  InputProps={{
                    startAdornment:(
                      <IconButton onClick={handleSearchClick}>
                        <SearchIcon/>
                      </IconButton>
                    ),
                    endAdornment:(
                      <>
                      {searchItem && (
                        <IconButton onClick={handleClear}>
                          <ClearIcon/>
                        </IconButton>
                      )}
                      </>
                    )
                  }}
                  style={{ position: 'relative', backgroundColor: 'whitesmoke', opacity: '0.5', border: 'none', borderRadius: '5px'}}
            />
            <IconButton style={{color: 'whitesmoke'}} onClick={() => setIsFilterOpen(true)}>
              <FilterListIcon/>
            </IconButton>   
            <Button startIcon={<AddIcon />} style={{color: 'whitesmoke'}} onClick={()=> setIsAddOpen(true)}> 
               ADD USER
            </Button>
          </div>
          
          <Drawer  anchor="bottom" open={isFilterOpen} onClose={() => setIsFilterOpen(false)}> 
          <h2 style={{fontFamily: 'Arial, Helvetica, sans-serif', padding: '10px'}}>Filters</h2>
            <div style={{ width: 500, padding: '20px', marginBottom: '30px', display: 'flex', flexDirection: 'column'}} className='filterContainer'>
              <FormControl style={{width: '100%',backgroundColor: 'whitesmoke'}} >
                <InputLabel>Company</InputLabel>
                <Select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
                  {Array.from(new Set(rows.map((row) => row.company.name))).map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </div>
              <div style={{ width: 500, marginBottom: '80px', display: 'flex', flexDirection: 'column'}}>
                <FormControl style={{width: '100%',backgroundColor: 'whitesmoke', left:'20px'}} >
                  <InputLabel>Department</InputLabel>
                  <Select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                    {Array.from(new Set(rows.map((row) => row.department.name))).map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
              </FormControl>
              </div>
              <div style={{ padding: '20px',display: 'flex', justifyContent: 'flex-start' }}>
                <Button onClick={() => { setCompanyFilter(''); setDepartmentFilter(''); setFilteredRows(rows)}} style={{ marginRight: '10px' }}>
                  Clear Filters
                </Button>
                <Button onClick={() => setIsFilterOpen(false)} style={{ marginRight: '10px' }}>
                  Cancel
                </Button>
                <Button onClick={handleFilteredClick} color="primary">
                  Filter
                </Button>
              </div>
          </Drawer> 

          <Drawer  anchor="right" open={isAddOpen} onClose={() => setIsAddOpen(false)}> 
          <h2 style={{fontFamily: 'Arial, Helvetica, sans-serif', padding: '10px'}}>Add User</h2>
            <div style={{ width: 300, padding: '20px', marginBottom: '10px', display: 'flex', flexDirection: 'column'}} className='addContainer'>
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  placeholder='Enter your name'
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Surname"
                  placeholder='Enter your Surname'
                  value={surname}
                  onChange={(e)=>setSurname(e.target.value)}
                  style={{ marginTop:'10px', borderRadius: '5px'}}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Email Address"
                  placeholder='Enter your Email Address'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  style={{ marginTop:'10px', borderRadius: '5px'}}
                />
              </div>
              <div style={{ width: 300, marginBottom: '10px', display: 'flex', flexDirection: 'column'}}>
                <FormControl style={{width: '100%', left:'20px'}} >
                  <InputLabel>Role</InputLabel>
                  <Select value={role} onChange={(e) => setRole(e.target.value)}>
                    {Array.from(new Set(rows.map((row) => row.role.name))).map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
              </FormControl>
              </div>
              <div style={{ width: 300, padding: '20px', marginBottom: '10px', display: 'flex', flexDirection: 'column'}} className='filterContainer'>
              <FormControl style={{width: '100%'}} >
                <InputLabel>Company</InputLabel>
                <Select value={companyFilter} onChange={(e)=>setCompanyFilter(e.target.value)}>
                  {Array.from(new Set(rows.map((row) => row.company.name))).map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </div>
              <div style={{ width: 300, marginBottom: '10px', display: 'flex', flexDirection: 'column'}}>
                <FormControl style={{width: '100%', left:'20px'}} >
                  <InputLabel>Department</InputLabel>
                  <Select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                    {Array.from(new Set(rows.map((row) => row.department.name))).map((department) => (
                      <MenuItem key={department} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
              </FormControl>
              </div>
              <div style={{ padding: '20px',display: 'flex', justifyContent: 'flex-start' }}>
                <Button onClick={() => { setCompanyFilter(''); setDepartmentFilter(''); setRole(''); setName(''); setSurname(''); setEmail('')}} style={{ marginRight: '10px' }}>
                  Clear
                </Button>
                <Button onClick={() => setIsAddOpen(false)} style={{ marginRight: '10px' }}>
                  Cancel
                </Button>
                <div>
                  <Button onClick={handleAddClick} color="primary" type='submit' className="addBtn">
                  Add
                </Button>
                          <Snackbar open={successSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClear}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClear} 
                                    severity="success" 
                                    sx={{ width: '200%' }}>
                                      User Added!                                  
                            </Alert>
                        </Snackbar>
                        <Snackbar open={errorSnackbarOpen} 
                                    autoHideDuration={3000} 
                                    onClose={handleClear}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClear} severity="error" sx={{ width: '200%' }}>
                                Strings are empty!
                            </Alert>
                          </Snackbar>
                          <Snackbar open={emailError} 
                                    autoHideDuration={3000} 
                                    onClose={handleClear}
                                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                            <Alert onClose={handleClear} 
                                    severity="error" 
                                    sx={{ width: '200%' }}>
                                    Email does not meet the criteria.
                            </Alert> 
                        </Snackbar>
                </div>
              </div>
          </Drawer>
      </div>
    </div>
    
  );
}

