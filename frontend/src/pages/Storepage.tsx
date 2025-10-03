import { Link } from 'react-router';
import StoreListings from '../components/StoreListings';


const StorePage = () => { 

    return (
        <div className="w-full h-screen font-satoshi bg-slate-50">
            <div className="flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 px-6 py-4">
                    <h1 className="text-2xl font-semibold text-slate-900">Stores Page</h1>
                </header>
                <main className="flex-1 p-6 overflow-auto max-w-6xl">
                    <StoreListings/>
                    <div className="mt-8 ">
                        <Link to='/createStore'>
                            <button className='bg-primary text-white text-shadow-2xs px-4 py-2 border border-slate-200 rounded-lg cursor-pointer hover:shadow-sm '>Add new Store</button>
                        </Link>
                    </div>
                </main>

            </div>
        </div>
    );
};

export default StorePage;



