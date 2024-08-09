import Header from '~/layouts/components/Header/Header';
import { PropChildren } from '~/types/Interface/childrenInterface';

function HeaderOnly({ children }: PropChildren) {
    return (
        <div>
            <Header />
            <main>
                <div className="w-screen mt-[52px] flex justify-center absolute inset-0 bg-[#f1f1f1] overflow-y-auto scrollbar">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default HeaderOnly;
