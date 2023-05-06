import NextLink from 'next/link';

import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ShopLayout } from '@/components/layouts';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagada la orden o no',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid
                    ? <Chip color="success" label="Pagada" variant='outlined' />
                    : <Chip color="error" label="No pagada" variant='outlined' />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <Link component={NextLink} href={`/orders/${ params.row.id }`} passHref underline='always'>
                    Ver orden
                </Link>
            )
        }
    }
];

const rows = [
    { id: 1, paid: false, fullname: 'Lucas Martinez' },
    { id: 2, paid: true, fullname: 'Camila Gonzalez' },
    { id: 3, paid: true, fullname: 'Joaquin Sanchez' },
    { id: 4, paid: false, fullname: 'Valentina Rodriguez' },
    { id: 5, paid: false, fullname: 'Mateo Gomez' },
    { id: 6, paid: true, fullname: 'Ana Fernandez' },
    { id: 7, paid: false, fullname: 'Santiago Lopez' },
    { id: 8, paid: true, fullname: 'Lara Perez' },
    { id: 9, paid: true, fullname: 'Nicolas Torres' },
    { id: 10, paid: false, fullname: 'Agustina Suarez' },
    { id: 11, paid: true, fullname: 'Luciana Alvarez' },
    { id: 12, paid: false, fullname: 'Maximiliano Gutierrez' },
];


const HistoryPage = () => {
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>


        <Grid container>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    initialState={{
                        pagination: { 
                          paginationModel: { pageSize: 10 } 
                        },
                      }}
                    pageSizeOptions={[10, 20, 30]}
                />

            </Grid>
        </Grid>

    </ShopLayout>
  )
}

export default HistoryPage;