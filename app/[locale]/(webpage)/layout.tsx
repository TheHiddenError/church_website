import NavBar from "./root_components/navbar/navbar";
import Footer from "./root_components/navbar/footer";
import Support from "./root_components/support";

export default async function WebLayout({children}: {children:React.ReactNode}){
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <NavBar />
                <div className="mt-10 h-[40vh] overflow-auto-y flex-1">{children}</div>
                <Support />
                <Footer />
            </div>
        </>
    )
}