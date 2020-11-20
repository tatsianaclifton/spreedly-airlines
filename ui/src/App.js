import Flights from './Flights';
import Transactions from './Transactions';
import './App.css';

const FLIGHTS = [
    {
        number: 'CF546',
        from: 'Paris',
        to: 'Tampa',
        price: 230
    },
    {
        number: 'FT837',
        from: 'San Diego',
        to: 'Orlando',
        price: 530
    },
    {
        number: 'SD9380',
        from: 'Atlanta',
        to: 'Chicago',
        price: 198
    }
]

function App() {
    return (
        <div className="App">
            <h1>Spreedly Airlines</h1>
            <Flights
                flights={FLIGHTS}
            />
            <Transactions />
        </div>
    );
}

export default App;
