import Header from '~/layouts/components/Header/Header';
import Nav from '~/layouts/MainLayout/Nav/Nav';
import { PropChildren } from '~/types/Interface/childrenInterface';

function MainLayout({ children }: PropChildren) {
    return (
        <>
            <Header />
            <main>
                <div className="w-screen grid grid-cols-4 gap-x-5 mt-[52px] absolute inset-0 bg-[#f1f1f1]">
                    <Nav />
                    {children}
                </div>
            </main>
        </>
    );
}

export default MainLayout;
