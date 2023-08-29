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
    const [isFilterOpen, setIsFilterOpen] = useState(false);


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

      const handleClear=()=>{
        setSearchItem('');
        setCompanyFilter('');
        setDepartmentFilter('');
        setFilteredRows(rows);
      }

   useEffect(()=>{
    const token=localStorage.getItem('token');
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
                      minWidth: 700}}>
      
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
                <Button onClick={() => { setCompanyFilter(''); setDepartmentFilter(''); }} style={{ marginRight: '10px' }}>
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
      </div>
    </div>
    
  );
}

