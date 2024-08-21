import apiClient from "@/app/apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const updateUserPhoto = async (id: number, image: File) => {
  try {
    console.log("h");
    const formData = new FormData();
    formData.append("image", image);

    const response = await apiClient.patch(
      `${API_URL}/api/users/${id}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      console.log("Error", response.data);
      throw new Error(response.data);
    }
    return response.data;
  } catch (error: any) {
    console.log("error dude", error);
    throw new Error(error.response?.data || error.message);
  }
};
