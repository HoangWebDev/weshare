/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as searchService from '~/services/Search/searchService';
import { SearchIcon, CloseSearchIcon, SpinnerIcon } from '~/components/Icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import ListItem from '~/components/ListItem/ListItem';
import Tippy from '@tippyjs/react/headless';
import { useDebounce } from '~/hooks';
import UserModel from '~/models/User';

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<UserModel[]>([]);
    const [showResult, setShowResult] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef<HTMLInputElement>(null);

    const { isLoading, data } = useQuery<UserModel[]>({
        queryKey: ['userSearch', debounced],
        queryFn: async () => {
            if (!debounced) return [];
            try {
                const result = await searchService.search(encodeURIComponent(debounced));
                return result;
            } catch (error) {
                console.error(error); // Xử lý lỗi phù hợp
                return [];
            }
        },
        enabled: !!debounced, // Chỉ chạy truy vấn nếu giá trị debounced không rỗng
    });

    useEffect(() => {
        if (data) {
            setSearchResult(data);
        } else {
            setSearchResult([]);
        }
    }, [data]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
            setSearchResult([]); // Clear the old results
        }
    };

    return (
        <Tippy
            appendTo={document.body}
            visible={showResult && (searchResult.length > 0 || searchValue.trim().length === 0)}
            interactive
            placement="bottom"
            render={(attrs) => (
                <div className="w-[485px]" tabIndex={-1} {...attrs}>
                    <PopperWrapper>
                        <div className="w-full bg-[#e5e5e5] -mt-3 rounded py-3 px-2">
                            <h4 className="w-full text-left text-[#928c8c]">Search Result</h4>
                            {!searchValue.trim() ? (
                                <div className="text-center text-[#928c8c]">Vui lòng nhập từ khóa để tìm kiếm</div>
                            ) : (
                                searchResult.map((result) => <ListItem key={result.id_user} data={result} />)
                            )}
                        </div>
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className="text-left col-span-1 items-center gap-x-2.5 relative py-[10px] hidden md:flex">
                <button className="absolute left-1 p-1 z-10 border-none text-gray-500 w-6 h-6">
                    <SearchIcon />
                </button>
                <input
                    ref={inputRef}
                    placeholder="Search"
                    value={searchValue}
                    spellCheck={false}
                    onChange={handleChange}
                    className="w-full py-1 pr-1 pl-8 rounded-md outline-none bg-neutral-100 transition-shadow focus:shadow-sm focus:shadow-blue-700 hover:shadow-sm hover:shadow-blue-700"
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !isLoading && (
                    <button
                        onClick={handleClear}
                        className="absolute right-1 p-1 z-10 border-none text-gray-500 w-6 h-6"
                    >
                        <CloseSearchIcon className="text-gray-500" />
                    </button>
                )}
                {isLoading && (
                    <SpinnerIcon className="absolute right-1 p-1 z-10 border-none text-gray-500 w-6 h-6 animate-spin" />
                )}
            </div>
        </Tippy>
    );
}

export default Search;
