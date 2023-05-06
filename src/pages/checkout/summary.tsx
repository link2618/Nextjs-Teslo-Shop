import NextLink from 'next/link';

import { Link, Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';

import { ShopLayout } from '@/components/layouts';
import { CartList, OrderSummary } from '@/components/cart';

const SummaryPage = () => {
  return (
    <ShopLayout title='Resumen de orden' pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

        <Grid container>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen (3 productos)</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <Link component={NextLink} href='/checkout/address' passHref underline='always'>
                                Editar
                            </Link>
                        </Box>

                        
                        <Typography>Nombre cliente</Typography>
                        <Typography>Mi casa 123</Typography>
                        <Typography>sadf, DSA123</Typography>
                        <Typography>Colombia</Typography>
                        <Typography>+57 123456789</Typography>

                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='end'>
                            <Link component={NextLink} href='/cart' passHref underline='always'>
                                Editar
                            </Link>
                        </Box>

                        <OrderSummary />

                        <Box sx={{ mt: 3 }}>
                            <Button color="secondary" className='circular-btn' fullWidth>
                                Confirmar Orden
                            </Button>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayout>
  )
}

export default SummaryPage;
