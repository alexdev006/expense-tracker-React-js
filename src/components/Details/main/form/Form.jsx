import React, { useState, useContext } from 'react'
import { TextField, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'
import { ExpenseTrackerContext } from '../../../../context/context'
import { v4 as uuidv4 } from 'uuid' //créer un id unique

import formatDate from '../../../../utils/formatDate'
import useStyles from './styles'
import { incomeCategories, expenseCategories } from '../../../../constants/categories'
import CustomizedSnackbar from '../../../snackbar/Snackbar'

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date()) ,

}


const Form = () => {
    const classes = useStyles()
    const [formData, setFormData] = useState(initialState);
    const { addTransaction } = useContext(ExpenseTrackerContext)
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const createTransaction = () => {
        const transaction = {...formData, amount: Number(formData.amount), id: uuidv4() }
        setOpenSnackbar(true)
        addTransaction(transaction)
        setFormData(initialState)
    }

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories

    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={openSnackbar} setOpen={setOpenSnackbar} />
            <Grid item xs={12}>
                <Typography align='center' variant='subtitle2' gutterBottom>
                    
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {selectedCategories.map((category) => <MenuItem key={category.type} value={category.type} >{category.type}</MenuItem> )}

                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type='number' label="Amount" fullWidth value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })}/>
            </Grid>
            <Grid item xs={6}>
                <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} fullWidth value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })}/>
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form
