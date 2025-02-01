import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {

    return (
        <div className='mt-5 ml-2 mr-6'>
            <div className="text-center text-xl font-semibold">
                Side Bar
            </div>
            <ul className="mt-6 space-y-2 text-nowrap">
                <Link to={'/admin/hotel'}>
                    <li className="px-4 py-2 hover:bg-gray-400 rounded-2xl cursor-pointer text-lg" >
                        Hotel
                    </li>
                </Link>
                <Link to={'/admin/create-hotel'}>
                    <li className="px-4 min-w-fit py-2 hover:bg-gray-400 rounded-2xl cursor-pointer text-lg" >
                        Create Hotel
                    </li>
                </Link>
                <Link to={'/admin/view-user'}>
                    <li className="px-4 py-2 hover:bg-gray-400 rounded-2xl cursor-pointer text-lg" >
                        View User
                    </li>
                </Link>
            </ul>
        </div>
    );
}

export default SideBar;