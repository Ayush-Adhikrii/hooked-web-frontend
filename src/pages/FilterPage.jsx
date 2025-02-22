import { Frown } from "lucide-react";
import { useEffect } from "react";
import { BottomNavigation } from "../components/BottomNavigation";
import { Header } from "../components/Header";
import FilterArea from "../components/FilterArea";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { useMessageStore } from "../store/useMessageStore";

const FilterPage = () => {
    const { isLoadingUserProfiles, getUserProfiles, userProfiles, subscribeToNewMatches, unsubscribeFromNewMatches } =
        useMatchStore();

    const { authUser } = useAuthStore();
    var { showSideBar } = useMessageStore();
    console.log("showSideBar is set to", showSideBar);

    useEffect(() => {
        getUserProfiles();
    }, [getUserProfiles]);

    console.log("userProfiles", userProfiles);

    useEffect(() => {
        authUser && subscribeToNewMatches();

        return () => {
            unsubscribeFromNewMatches();
        };
    }, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);

    return (
        <div
            className='flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100
		 overflow-hidden
		'
        >
            <Sidebar />

            <div className='flex-grow flex flex-col overflow-hidden'>
                <Header />
                <main className='flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden'>
                    <FilterArea />
                </main>
                <BottomNavigation />
            </div>
        </div >
    );
};
export default FilterPage;
