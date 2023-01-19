import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField'
import { useSearchParams } from "react-router-dom"
import ResultCard from './components/ResultCard';
import Filter from './components/FilterBar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function App() {
	const [results, setResults] = useState([])
	const [num_results, setNum_results] = useState({result: 0, time: 0})
    const [loading, setLoading] = useState(false)
	const [filter,setFilter] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("query") || "")
	const [dropMenu, setDropMenu] = useState({
										_id:null,
										_show: false
									})

	const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
		console.log("param",searchParams)
		
        setSearchParams((searchParams)=>{
			const param = {...searchParams}
			param['query'] = query
			return param
		})
    }

    useEffect(() => {
        if (!searchParams.get("query")) return
        setLoading(true)
		const body = {
            query: searchParams.get("query"),
        }
        if (
            searchParams.get("filter") &&
            searchParams.get("filter") === "true"
        ) {
            body.filter = true
            body.fields = [...searchParams]
                .filter(
                    (para) => para[1] === "true" && para[0] !== "filter"
                )
                .map((para) => para[0])
        }else if(
			searchParams.get("filter") &&
            searchParams.get("filter") != null
		){
            body.filter = searchParams.get("filter")
        }

		console.log("Into query")
        fetch("http://127.0.0.1:5000/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
				
				setNum_results({result: data.num_results, time: data.time})
                setResults(data.hits)
                setLoading(false)
            })
    }, [searchParams])

	const handledrop = (_id)=>{
		setDropMenu({
			_id: _id,
			_show: !dropMenu._show
		})
	}
	const handleFilter = (value)=>{
		
		setSearchParams((searchParams)=>{
			console.log('param filter', searchParams)
			const param = {...searchParams}
			param['query'] = query
			param['filter'] = value
			return param
		})
		console.log(searchParams)
		setFilter(value)
	}

	const ClearFilter = ()=>{
		setSearchParams({query})
		setFilter(false)
	}

	return (
		<ThemeProvider theme={theme}>
			<Box
				className="bodyClass"
				sx={{position:'relative'}}
			>
				<form onSubmit={handleSubmit} >
				<CssBaseline />
				
				<main>
					<Box
						sx={{
							
							pt: 8,
							pb: 6,
						}}
					>
						<Container maxWidth="md">
							<Box
								sx={{backgroundColor:'#D3D3D3', p:3}}
							>
							{ filter != true ?
							<Stack 
								container 
								spacing={4} 
							>
								<Grid container spacing={2}>
									<Grid item xs={10} >
										<Box sx={{display: 'flex', flexDirection: 'column',ml:'3'}}>
										<TextField 
											id="outlined-basic" 
											label="Search here..." 
											fullwidth 
											size='medium' 
											variant="outlined" 
											value={query}
											onChange={handleChange}
										/>
										</Box>
										
									</Grid>
									
									<Grid item xs={2} >
										<Button 
											variant="contained"
											sx={{height: '100%',background:'black'}}
											type='submit'
										>
											<SearchIcon />
										</Button>
									</Grid>
								</Grid>
								<Box sx={{display:'flex'}}>
								<FormControlLabel
									control={<Switch
										checked={filter==true}
										onChange={()=>{setFilter(!filter)}}
									/>}
									label="Advance Filter"
								/>
								<FormControlLabel
									control={<Switch
										checked={filter=="full"}
										onChange={()=>{handleFilter("full")}}
									/>}
									label="Full Text"
								/>
								<FormControlLabel
									control={<Switch
										checked={filter=="fuzzy"}
										onChange={()=>{handleFilter("fuzzy")}}
									/>}
									label="Fuzzy Search"
								/>
								
								</Box>
							</Stack>
							: filter != "full"  && filter != "fuzzy" ?
								<Stack>
									<Filter
										open={filter}
										handleClose={setFilter}
										query = {query}
										setSearchParams = {setSearchParams}
										searchParams = {searchParams}
									/>
								</Stack>:
								null
							}
							<Button onClick={ClearFilter}>
								ClearFilter
							</Button>
							</Box>
							
						</Container>
					</Box>
					{query ?
						<Container sx={{ py: 2 }} maxWidth="md">
							{console.log(num_results)}
							<Typography variant="body" align="start" color="text.secondary" paragraph>
								About {num_results.result} results ({num_results.time/1000} seconds) 
							</Typography>
							<Grid container spacing={4}>
								{results?.map(({_source, _id}) => (
									<ResultCard
										_source= {_source}
										_id = {_id}
										key = {_id}
										handledrop = {handledrop}
										dropMenu = {dropMenu}
									/>
								
								))}
							</Grid>
						</Container>
					:
						null
					}
				</main>
				
				</form>
			</Box>
		</ThemeProvider>
	);
}