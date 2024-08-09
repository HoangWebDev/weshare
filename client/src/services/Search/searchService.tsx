import * as instance from '~/utils/httpRequest';

export const search = async (keyword: string) => {
    try {
        const result = await instance.getApi(`users/search`, {
            params: {
                keyword,
            },
        });
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
};
