import { forwardRef, useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import Card from "@mui/material/Card"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Box from "@mui/material/Box"
import Slide from "@mui/material/Slide"
import TextField from "@mui/material/TextField"
import { Grid } from "@mui/material"
import Switch from '@mui/material/Switch';

const Transition = forwardRef(function Transition(props, ref) {
    // @ts-ignore
    return <Slide direction="up" ref={ref} {...props} />
})

export default function Filter({ open, handleClose, searchParams, setSearchParams}) {
    // const [searchParams, setSearchParams] = useSearchParams()
    const [filters, setFIlters] = useState({})

    const handleSearch = () => {
        console.log(filters)
        setSearchParams({ ...filters, filter: true })
    }

    const handleChange = (e) => {
        setFIlters((filters) => {
            const _filters = { ...filters }
            _filters[e.target.name] = e.target.checked
            return _filters
        })
    }

    const handleTextChange = (e) => {
        setFIlters((filters) => {
            const _filters = { ...filters }
            _filters[e.target.name] = e.target.value
            return _filters
        })
    }

    const handleClearFilter = () => {
        setSearchParams({ query: filters.query })
        
    }

    useEffect(() => {
        if (!open) return
        setFIlters(Object.fromEntries([...searchParams]))
    }, [open])

    return (
            <Box >
                <Grid item xs={12} >
					<Box sx={{display: 'flex', flexDirection: 'column',ml:'3'}}>
						<TextField 
							id="outlined-basic" 
							label="Search here..." 
							fullwidth 
							size='medium' 
							variant="outlined" 
							value={filters.query || ""}
                            name="query"
                            onChange={handleTextChange}
						/>
					</Box>					
				</Grid>
                <Card sx={{mt:3, p:3}}>
                <FormGroup>
                    <Grid lg={12} sx={{display:'flex'}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={!!filters.year}
                                    name="year"
                                    onChange={handleChange}
                                />
                            }
                            label="Year"
                            xs={4}
                        />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!!filters.album}
                                name="album"
                                onChange={handleChange}
                            />
                        }
                        label="Album"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!!filters.song_name}
                                name="song_name"
                                onChange={handleChange}
                            />
                        }
                        label="Song Name"
                    />
                    </Grid>
                    <Grid lg={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!!filters.lyricist}
                                name="lyricist"
                                onChange={handleChange}
                            />
                        }
                        label="Lyricist"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!!filters.singers}
                                name="singers"
                                onChange={handleChange}
                            />
                        }
                        label="Singers"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!!filters.composer}
                                name="composer"
                                onChange={handleChange}
                            />
                        }
                        label="Composer"
                    />
                    </Grid>
                </FormGroup>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleSearch}
                >
                    Search
                </Button>
                <Grid lg={12} >
                    <FormControlLabel
                        control={<Switch
                        checked={open}
                        onChange={()=>{handleClose(!open)}}
                                />}
                        label="Remove Filter"
                        sx={{alignItems:'center', justifyContent:'center'}}
                    />
                </Grid>
            </Card>
        </Box>
    )
}
