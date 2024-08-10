/* eslint-disable react-hooks/exhaustive-deps */
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import * as userService from '~/services/User/userService';
import { useProfile } from "~/hooks";

// Extend the File type to include a preview property
interface PreviewFile extends File {
    preview?: string;
}

function ProfileAdmin() {
    const userProfile = useProfile();
    const [selectedFile, setSelectedFile] = useState<PreviewFile | null>(null);
    const queryClient = useQueryClient();

    const updateUserPictureMutation = useMutation({
        mutationFn: async (formData: FormData) => userService.updateUser(userProfile.id_user || 0, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user/getUser', userProfile.id_user] });
        },
    });

    useEffect(() => {
        const updateUserPicture = async () => {
            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);
                try {
                    await updateUserPictureMutation.mutateAsync(formData);
                    // Handle success, e.g., display a success message
                } catch (error) {
                    // Handle error, e.g., display an error message
                    console.error('Error updating profile picture:', error);
                }
            }
        };

        updateUserPicture();
    }, [selectedFile, userProfile.id_user]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const image = e.target.files && e.target.files[0];
        if (image) {
            console.log('Selected image:', image);

            // Use URL.createObjectURL to create a preview URL
            const previewImage = Object.assign(image, { preview: URL.createObjectURL(image) });
            console.log('Preview URL:', previewImage.preview);

            // Revoke old blob URL if any
            if (selectedFile?.preview) {
                URL.revokeObjectURL(selectedFile.preview);
            }

            setSelectedFile(previewImage);
        }
    };

    return (
        <>
            <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
                <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <h2 className="text-2xl font-semibold text-black">Profile</h2>
                    <nav>
                        <ol className="flex items-center gap-2">
                            <li><a className="font-medium" href="/">Dashboard /</a></li>
                            <li className="font-medium text-main">Profile</li>
                        </ol>
                    </nav>
                </div>
                <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
                    <section className="relative rounded-sm border border-stroke bg-white shadow pb-40">
                        <div className="relative z-20 h-35 md:h-65">
                            <img
                                src="https://react-demo.tailadmin.com/assets/cover-01-e8bbef04.png"
                                alt="profile cover"
                                className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center" />
                            <div className="absolute bottom-1 right-1 z-10 ">
                                <label htmlFor="cover" className="flex cursor-pointer items-center justify-center gap-2 rounded bg-main py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4">
                                    <input type="file" name="cover" id="cover" className="sr-only" />
                                    <FontAwesomeIcon icon={faCamera} />
                                    <span>Edit</span>
                                </label>
                            </div>
                        </div>
                        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                            <div className="absolute left-1/2 bottom-24 -translate-x-1/2 z-30 mx-auto h-30 w-full max-w-30 bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3 rounded-full">
                                <div className="relative drop-shadow-2">
                                    <img src={userProfile.picture_url} alt="profile" className="rounded-full" />
                                    <label htmlFor="profile" className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-main text-white hover:bg-opacity-90">
                                        <input type="file" name="cover" id="profile" className="sr-only" onChange={handleFileChange} />
                                        <FontAwesomeIcon icon={faCamera} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default ProfileAdmin;