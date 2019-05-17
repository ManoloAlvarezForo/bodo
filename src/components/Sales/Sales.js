import React, { useState, useEffect } from 'react';
import CustomToolBar from '../CustomToolBar/CustomToolBar';
import Paper from '@material-ui/core/Paper';
import CustomTable from './CustomTable';
import SelectItemComponent from '../Select/SelectItemComponent';
import { Typography, Avatar } from '@material-ui/core';
import CustomMenuItem from '../Select/CustomMenuItem';
import { GET_CLIENTS_BY_FILTER } from '../Clients/ClientsQueries';
import { Query } from 'react-apollo';
import SpecialSelectComponent from '../Select/SpecialSelectComponent';
import ProductsSuggestions from '../Sales/ProductsSuggestions';
import CustomSnackBar from '../SnackBar/CustomSnackBar';

const ItemWithAvatar = ({ avatar, title = 'None' }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {
                avatar.length === 1 ?
                    <Avatar style={{ width: 35, height: 35 }}>{(avatar === "") && (title[0])}</Avatar> :
                    <Avatar src={avatar} style={{ margin: 10, width: 35, height: 35 }}></Avatar>
            }
            <Typography style={{ margin: '0px 10px' }} variant="body1">{title}</Typography>
        </div>
    )
}

const ClientsSuggestions = ({clients, item: Item, getItemProps}) => {
    return(
        clients.map((suggestion, index) => {
            return (
                <Item
                    key={index}
                    suggestion={suggestion}
                    itemAvatar={ItemWithAvatar}
                    getItemProps={getItemProps}
                />
        )})
    )        
}

const Suggestions = ({ query, properties = ['name', 'lastName', 'phone'], getItemProps, item}) => {
    return <Query query={GET_CLIENTS_BY_FILTER}
        variables={{ query, properties }}
        skipe={query === ''}
        fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
            if (loading) return <div></div>
            if (error) return `Error!: ${error}`
            return(
                <ClientsSuggestions clients={data.clientsByFilter} item={item} getItemProps={getItemProps} />
            )
        }}
    </Query>
}

const Sales = () => {
    let sale = {
        date: '',
        time: '',
        clientId: '',
        nit: '',
        nitName: '',
        products: [],
        totalPayed: 0
    }
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [client, setClient] = useState({});
    const [nit, setNit] = useState('');
    const [nitName, setNitName] = useState('');
    const [totalPay, setTotalPay] = useState(0);
    const [productSelected, setProductSelected] = useState({});
    const [snackBar, setSnackBar] = useState(false);
    const [snackBarMessage] = useState('El Producto ya se encuentra en la lista.');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setTotalPay(products.reduce((a, b) => {
            return a + b.subTotal;
        }, 0))
    }, [products])

    const _addProduct = newProduct => {
        newProduct['quantity'] = 1;
        verifyIfTheProductExist(newProduct) ? setSnackBar(true) : setProducts([...products, newProduct])
    }

    const verifyIfTheProductExist = product => {
        return products.filter(p => p.productId === product.productId).length > 0;
    }

    useEffect(() => {
        return () => {
          console.log('will unmount');
        }
      }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CustomToolBar title="Sales" />
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100vh' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '70%', margin: '0 5px' }}>
                    <Paper style={{ margin: '5px 0 2px 0', padding: '2px' }} elevation={1}>
                        <SelectItemComponent
                            placeHolder="Buscar Cliente por Nombre, Apellido o Telefono..."
                            label="Cliente"
                            suggestions={Suggestions}
                            item={CustomMenuItem}
                            setItems={setClient}
                        />
                    </Paper>
                    <Paper style={{ margin: '5px 0 2px 0', padding: '2px' }} elevation={1}>
                        <SpecialSelectComponent
                            addItems={_addProduct}
                            placeholder="Buscar Producto por Nombre o Codigo..."
                            label="Producto"
                            suggestions={ProductsSuggestions}
                        />
                    </Paper>
                    <div style={{ height: '40%', margin: '1px 0' }}>
                        <div style={{ height: '100%' }} >
                            <CustomTable
                                setProducts={setProducts}
                                products={products}
                                setProductSelected={setProductSelected}
                            />
                        </div>
                    </div>
                    <div style={{ height: '30%', margin: '5px 0' }}>
                        <Paper style={{ height: '100%' }} elevation={1}>
                            <div>
                                product detail
                            </div>
                        </Paper>
                    </div>
                </div>
                <Paper style={{ height: '100%', width: '30%', margin: '5px 2.5px', height: '100%' }} elevation={1}>
                    <Typography
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '5px',
                        }}
                        variant="h5"
                        gutterBottom>
                        Total a Pagar: {totalPay}
                    </Typography>
                </Paper>
            </div>
            <CustomSnackBar
                openSnackBar={snackBar}
                handleClose={()=> setSnackBar(false)}
                variant='info'
                message={snackBarMessage}
                vertical='top'
                horizontal='right'
            />
        </div>
    );
}
export default Sales;