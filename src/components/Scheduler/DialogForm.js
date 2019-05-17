import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const FormDialog = (
    {
        title,
        content: Content,
        dataModel,
        open,
        setOpenDialog,
        saveMutation: SaveMutation,
        month,
        year,
        locale,
        selectedDate
    }) => {
        
    const [fullWidth] = useState(true)
    const [maxWidth] = useState('sm')
    const [data, setData] = useState(dataModel)

    return (
        <Dialog
            classes={{
                paper: 'dialog-height'
            }}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <Content selectedDate={selectedDate} setData={setData}/>
            </DialogContent>
            <DialogActions style={{ margin: '25px' }}>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                    Discard
                </Button>
                <SaveMutation data={data} setOpenDialog={setOpenDialog} month={month} year={year} locale={locale} />
            </DialogActions>
        </Dialog>
    );
}

export default FormDialog;