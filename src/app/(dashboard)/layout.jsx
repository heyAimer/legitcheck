
const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[ #F7F9FC]">
            <main className="flex-1">
                {children}
            </main>
        </div>
    )
}
export default DashboardLayout