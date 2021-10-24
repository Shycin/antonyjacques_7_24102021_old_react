import ActualSearch from '../components/ActualSearch'
import ListFiltre from '../components/ListFiltre'
import Search from '../components/Search'
import '../css/home.scss'

const Home = () => (
  <div id='home'>
    <div id='logo'>
      <img src='./img/logo.png' alt='logo' />
    </div>
    <Search />
    <ActualSearch />
    <ListFiltre />
  </div>
)
export default Home
