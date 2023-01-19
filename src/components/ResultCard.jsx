import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormBar from './FormBar';


const ResultCard = ({_source: {album, composer, lyricist, lyrics, metaphors, singers, year, song_name}, _id,handledrop,dropMenu}) => {
    return ( 
        <Grid item xs={12} >
										<Card
											sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
										>
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
     );
}
 
export default ResultCard;