import React, { useContext } from 'react'
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core'
//import List as MUIList car le compo s'appelle déjà List 
import { Delete, MoneyOff } from '@material-ui/icons'

import { ExpenseTrackerContext } from '../../../../context/context'
import useStyles from './styles.js'

const List = () => {

    const classes = useStyles()
    const { deleteTransaction, transactions} = useContext(ExpenseTrackerContext)

    return (
        <MUIList dense={false} className={classes.list}>
            {/* pas de accolades apres le map parce qu'on retourne un seul obj */}
            {transactions.map((transaction) => (
                <Slide direction='down' in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense} >
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`${transaction.amount}€ - ${transaction.date}`} />
                    
                    <ListItemSecondaryAction>
                        <IconButton edge='end' aria-label='delete' onClick={() => deleteTransaction(transaction.id)}>
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList>
    )
}

export default List
