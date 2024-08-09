import Button from '~/components/Button/Button';
import { MenuItemProps } from '~/types/Interface/menuProp';

function MenuItem({ role, className, data, onClick }: MenuItemProps) {
    return (
        <Button className={className} to={data.to} onClick={onClick}>
            {role === "0" ? (
                <div className="flex items-center gap-x-2 px-2 py-1 transition-colors hover:bg-gray-300 hover:rounded">
                    <span className="text-sm">{data.icon}</span>
                    <span className="text-sm">{data.name}</span>
                </div>
            ) : (
                <div className="flex items-center gap-x-2 px-2 py-2 transition-colors hover:text-main">
                    <span className="text-sm">{data.icon}</span>
                    <span className="text-sm">{data.name}</span>
                </div>
            )}
        </Button>

    );
}

export default MenuItem;
