import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home'
import StockPricePage from './pages/StockPrice'
import CompaniesPage from './pages/Companies'
import FavoritesPage from './pages/Favorites'
import SingleCompanyPage from './pages/SingleCompany'
import LoginRegisterPage from './pages/LoginRegister'
import Layout from './components/layout/Layout';


function App() {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/stock-price'>
                    <StockPricePage />
                </Route>
                <Route path='/companies'>
                    <CompaniesPage />
                </Route>
                <Route path='/favorites'>
                    <FavoritesPage />
                </Route>
                <Route path='/single-company'>
                    <SingleCompanyPage />
                </Route>
                <Route path='/login' exact>
                    <LoginRegisterPage />
                </Route>
                <Route path='/register' exact>
                    <LoginRegisterPage />
                </Route>
                <Route path='/forgot' exact>
                    <LoginRegisterPage />
                </Route>
            </Switch>
        </Layout>
    );
}


export default App;