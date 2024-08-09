import PropTypes from 'prop-types';
import { PropChildren } from '~/types/Interface/childrenInterface';
import { Link } from 'react-router-dom';
function Button({ children, to, href, className, onClick, ...passProp }: PropChildren) {
    let Component: React.ElementType = 'button';

    const props: PropChildren = {
        onClick,
        ...passProp,
        children: undefined,
        to: null,
        href: null,
    };

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    return (
        <Component className={className} {...props}>
            {children}
        </Component>
    );
}

export default Button;

//Proptypes
Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};
