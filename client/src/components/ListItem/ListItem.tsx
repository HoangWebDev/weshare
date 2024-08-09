import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';

function ListItem({ data }: any) {
    return (
        <Link
            to={`/@profile/${data.id_user}`}
            className="flex justify-between items-center py-2 px-2 cursor-pointer hover:bg-[#16182308]"
        >
            <div className="flex ml-3 gap-x-2">
                <Image className="size-10 rounded-full object-cover" src={data.picture_url} alt={data.username} />

                <p className="text-base font-semibold flex items-center">
                    <span>{data.full_name}</span>
                </p>
            </div>
            <FontAwesomeIcon className="text-[#9fa1a6]" icon={faClose} />
        </Link>
    );
}

export default ListItem;
