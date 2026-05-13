import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toast } from "./Toast";
import { MouseEvent } from "react";

const SideBar = () => {

    const navigate = useNavigate();

    const handleDisco = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        Swal.fire({
            html: ' <p class="font-light text-3xl"> Are you sure you want to disconnect ? </p>',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "Disconnect",
            confirmButtonColor: "black",
            cancelButtonColor: "slate",
            preConfirm: () => {
                navigate('/sign-in');
                Toast.fire({ 
                    title: "User disconnected",
                    icon: 'info'
                })
            }
        });
    }


    return (
        <>
            <aside className="flex flex-col w-full h-full py-8 overflow-y-auto bg-stone-100 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <a className="mx-auto my-3" >
                    <img className="w-auto h-20" src="/assets/images/clothesLogo.png" alt="" />
                </a>

                <div className=" text-sm mx-auto my-3 font-bold text-stone-500 font-sans px-3">E N H A N C E<span className="mx-2">Y O U R</span>S T Y L E</div>
                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav className="-mx-3 space-y-6 me-4">
                        <div className="pt-4 ">
                            <label className="px-3 ms-3 text-xs text-stone-900 font-light uppercase ">C O N T E N T S</label>

                            <div className="d-grid my-4">
                                <Link className=" button_nav" to={'/'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="button_navI ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                                    </svg>

                                    <span className="ms-8 my-1 text-sm font-medium">Clothering</span>
                                </Link>

                            </div>

                            <div className="d-grid my-4">
                                <Link to={'checklists'} className="button_nav" >

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="button_navI">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>

                                    <span className="ms-8 my-1 text-sm font-medium">Checklists</span>
                                </Link>
                            </div>
                        </div>

                        <div className="pt-2 ">
                            <label className="px-3 ms-3 text-xs text-stone-900 font-light uppercase ">M Y <span className="ms-2">S A L E S</span></label>

                            <div className="d-grid my-4">
                                <Link className="button_nav" to={'add_clothes'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="button_navI">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>

                                    <span className="ms-8 my-1 text-sm font-medium">Import</span>
                                </Link>
                            </div>

                            <div className="d-grid my-4 ">
                                <Link className="button_nav" to={'my_sales'} >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="button_navI">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                                    </svg>

                                    <span className="ms-8 my-1 text-sm font-medium">My sales</span>
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-3 ">

                            <div className=" pt-48 "></div>

                            <div className="d-grid my-4 ">
                                <button
                                    className="button_nav w-full"
                                    onClick={(e) => {
                                        handleDisco(e)
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="button_navI">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>

                                    <span className="ms-8 my-1 text-sm font-medium">Log out</span>
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default SideBar
