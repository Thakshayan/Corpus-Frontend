import {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField'
import { useSearchParams } from "react-router-dom"
import ResultCard from './components/ResultCard';
import FormBar from './components/FormBar';
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
        setSearchParams({ query })
    }
	
	useEffect(()=>{
		console.log(results)
	},[results])


    useEffect(() => {
		console.log(searchParams)
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
        }
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
							{! filter ?
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
								<FormControlLabel
									control={<Switch
										checked={filter}
										onChange={()=>{setFilter(!filter)}}
									/>}
									label="Advance Filter"
								/>
							</Stack>
							:
							<Stack>
								<Filter
									open={filter}
									handleClose={setFilter}
									query = {query}
									setSearchParams = {setSearchParams}
									searchParams = {searchParams}
								/>
							</Stack>
							}
							</Box>
							{/* <Stack
								sx={{ pt: 4 }}
								direction="row"
								spacing={2}
								justifyContent="center"
								fullwidth
							>
								<Button variant="contained">All</Button>
								<Button variant="outlined">Year</Button>
							</Stack> */}
						</Container>
					</Box>
					{query ?
						<Container sx={{ py: 2 }} maxWidth="md">
							{console.log(num_results)}
							<Typography variant="body" align="start" color="text.secondary" paragraph>
								About {num_results.result} results ({num_results.time/1000} seconds) 
							</Typography>
							<Grid container spacing={4}>
								{results?.map(({_source: {album, composer, lyricist, lyrics, metaphors, singers, year, song_name}, _id}) => (
									<Grid item key={_id} xs={12} >
										<Card
											sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
										>
											
											{/* <CardMedia
												component="img"
												sx={{
												// 16:9
												// pt: '56.25%',
												}}
												image={`${I_Image}`}
												// alt="random"
											/> */}
											<CardContent sx={{ flexGrow: 1 }}>
												<Typography gutterBottom variant="h5" component="h2">
													Song Name : {song_name}
												</Typography>
												<Typography>
												   Composer : {composer}
												</Typography>
												<Typography
													sx ={{
														display: '-webkit-box',
														overflow: 'hidden',
														textOverflow: 'ellipsis',
														WebkitLineClamp: 2,
														WebkitBoxOrient: 'vertical'
													}}
												>
													{ lyrics}
												</Typography>
											</CardContent>
											<CardActions>
												<Button size="small">year: {year}</Button>
												<Button size="small" onClick={ (e)=>{handledrop(_id)}  } >View</Button>
											</CardActions>
											{ dropMenu._show && dropMenu._id == _id ? 
												<Card>
													{metaphors.map((metaphor) => (
														<Grid>
															<FormBar
																label={"Lyricist"}
																value = {lyricist}
															/>
															<FormBar
																label={"Singers"}
																value = {singers}
															/>
															<FormBar
																label={"Metaphor"}
																value = {metaphor.metaphor}
															/>
															<FormBar
																label={"Source"}
																value = {metaphor.source}
															/>
															<FormBar
																label={"Target"}
																value = {metaphor.target}
															/>
															<FormBar
																label={"Interpretation"}
																value = {metaphor.interpretation}
															/>
														</Grid>
													))}
												</Card>
											:
												null
											}
										</Card>
									</Grid>
								
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