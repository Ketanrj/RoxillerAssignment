import Usercount from '../components/Cards/Usercount';
import Storecount from '../components/Cards/Storecount';
import Ratingcount from '../components/Cards/Ratingcount';
import StoreListings from '../components/StoreListings';
import UserListings from '../components/UserListings';

const Dashboard = () => {
    return (
        <div className="flex h-screen w-full font-satoshi bg-slate-50">
            <div className="flex flex-col w-full">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 px-6 py-4">
                    <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-7xl mx-auto">
                        {/* Metrics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Usercount/>
                            <Storecount/>
                            <Ratingcount/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full gap-8 justify-between mt-4">
                        <div className="flex flex-col w-full items-start py-2 ">
                            <h2 className='text-lg font-semibold py-2'>Store Listings</h2>
                            <StoreListings />
                        </div>
                        <div className="flex flex-col w-full items-start py-2">
                            <h2 className='text-lg font-semibold py-2'>Users Listings</h2>
                            <UserListings />
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
};

export default Dashboard;