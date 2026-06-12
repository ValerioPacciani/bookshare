import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import Bookcard from "../components/Bookcard"

const Home = () => {
    return (
        <div className=" min-h-screen">
            <Navbar>

            </Navbar>
            <div className="flex flex-row">
                <Sidebar >
                </Sidebar>
                <Bookcard title="titolo" author="autore">

                </Bookcard>
            </div>

        </div>
    )
}

export default Home