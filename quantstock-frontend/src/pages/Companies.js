import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Pagination from '@mui/material/Pagination';
import Card from '../components/ui/Card'
import AddNewStock from '../components/companies/AddNewStock'
import classes from '../components/ui/Card.module.css';
import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from '@mui/material/Button';


const useStyles = makeStyles((theme) => ({
    searchbar: {
        display: 'flex',
        // justifyContent: 'left',
        marginLeft: 120,
        marginRight: 120,
        marginBottom: 60,
        justifyContent: 'space-between',
    },
}));


function CompaniesPage() {
    const classes2 = useStyles();
    const [companiesData, setCompaniesData] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [openAddnewStock, setOpenAddnewStock] = React.useState(false);

    const handleOpenAddnewStock = () => {
        setOpenAddnewStock(true);
    };

    const handleCloseAddnewStock = () => {
        setOpenAddnewStock(false);
    };


    const suggestedCompanies = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = companiesData.filter(company => {
                const regex = new RegExp(`${text}`, "gi");
                return company.props.title.match(regex)
            })
        }
        setFilteredCompanies(matches)
        setSearchText(text)
    }

    useEffect(() => {
        setIsLoading(true);
        fetch(
            'http://127.0.0.1:8000/company/?get_all=true'
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const companies = data.map((company) => {
                    return (
                        <Card
                            img={company.info.logo_url}
                            title={company.info.longName}
                            description={company.info.longBusinessSummary.substring(0, 141) + "..."}
                            allData={company.info}
                        />
                    );
                }
                );
                // console.log(data)
                setCompaniesData(companies.sort((a, b) => -b.props.title.localeCompare(a.props.title)));
            }).then(() => {
                setIsLoading(false);
            }
            );
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <div>
            <div className={classes2.searchbar}>
                <div style={{ width: 540 }}>
                    <Autocomplete
                        id="combo-box-demo"
                        clearOnBlur={false}
                        options={companiesData}
                        getOptionLabel={option => option.props.title}
                        onInputChange={(event, value) => suggestedCompanies(value)}
                        renderInput={(params) => <TextField {...params} label="Companies" variant="standard" />}
                    />
                </div>
                <div>
                    <Button variant="contained" size="large" onClick={handleOpenAddnewStock}>Stock not here? Add your favourite stock</Button>
                    <AddNewStock openAddnewStock={openAddnewStock} handleCloseAddnewStock={handleCloseAddnewStock} />
                </div>
            </div>
            <div className={classes.wrapper} id="card-list">
                {searchText ? filteredCompanies : companiesData}
            </div>
            {/* <div className={classes2.pagination}>
                <Pagination count={10} color="primary" />
            </div> */}
        </div>
    );
}

export default CompaniesPage;