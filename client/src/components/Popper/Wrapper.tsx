import { PropChildren } from '~/types/Interface/childrenInterface';

function Wrapper({ children }: PropChildren) {
    return <div>{children}</div>;
}

export default Wrapper;
