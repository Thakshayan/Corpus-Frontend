import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';



const ResultCard = ({album, composer, lyricist, lyrics, metaphors, singers, year, _id}) => {
    return ( 
        <Grid item key={_id} xs={12} sm={6} md={4}>
			<Card
				sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
			>
				<CardMedia
					component="img"
					sx={{
						// 16:9
						// pt: '56.25%',
						}}
					
					// alt="random"
				/>
					<CardContent sx={{ flexGrow: 1 }}>
					<Typography gutterBottom variant="h5" component="h2">
						{album}
					</Typography>
					<Typography
                        sx= {{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
						{lyrics}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">year: {year}</Button>
					<Button size="small">Edit</Button>
				</CardActions>
	        </Card>
		</Grid>
     );
}
 
export default ResultCard;