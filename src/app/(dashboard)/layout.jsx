import Footer from "@/components/layout/Footer"
import {Navbar} from "@/components/layout/Navbar"

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[ #F7F9FC]">
            <Navbar />

            <main className="flex-1 px-6 py-6">
                {children}
            </main>

            <Footer/>
        </div>
    )
}
export default DashboardLayout