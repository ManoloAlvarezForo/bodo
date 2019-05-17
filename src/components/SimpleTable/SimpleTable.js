import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 500,
    },
});

const SimpleTable = (props) => {
    const { classes } = props;
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {
                            props.rowsTitles.map((rowTitle, index) =>
                                <TableCell key={index} align="left">{rowTitle.title}</TableCell>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rowsData.map((row, index) => {
                        return (
                            <TableRow onClick={() => props.selectedAction(row.id)} key={index} hover={true}>
                                {
                                    props.rowsTitles.map((rowTitle, index) => { return (<TableCell style={{ borderBottom: 'none' }} key={index} align="left">{props.getRow(row, rowTitle)}</TableCell>) })
                                }
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);