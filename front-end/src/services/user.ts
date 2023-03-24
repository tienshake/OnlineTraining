import axiosClient from "../api/axiosClient";

interface dataUserTeacher {
  name?: String,
  email?: String,
  password?: String,
  role_id?: Number,
}

const userServices: any = {
  getUserApi: async (id: string) => {
    const response = await axiosClient.get(`user/get?id=${id}&limit=${9}`);
    return response;
  },

  deleteUserApi: async (id: String) => {
    const response = await axiosClient.delete(`user/delete/${id}`);

    return response;
  },

  getUserDetailApi: async (id: String) => {
    const response = await axiosClient.get(`user/get?id=${id}`);

    return response;
  },

  postCreateUserApi: async (dataUser: dataUserTeacher) => {
    const { name, email, password, role_id } = dataUser;

    const response = await axiosClient.post(`user/create`, {
      name: name,
      email: email,
      password: password,
      role_id: role_id,
    });

    return response;
  },

  editUserApi: async (dataUserDetail: any, id: any) => {
    console.log(dataUserDetail, "---", id)
    const { name, age, gender, Phone, Address, Education, Experience, About_Me } = dataUserDetail;

    const response = await axiosClient.put(`user/edit/${id}`, {
      name: name,
      age: age,
      gender: gender,
      phone_number: Phone,
      address: Address,
      education: Education,
      experience: Experience,
      about_me: About_Me,
    });

    console.log(response, "ád")

    return response;
  },
};


export default userServices;

