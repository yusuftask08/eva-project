
import JwtService from "@/common/jwt.service";
import axios from "axios";
import router from "../router/index"
import {
    GET_USER,
    LOGIN,
    LOGOUT,
    REGISTER,
    UPDATE_USER,
    SETTINGS_GET_ALL_MEMBERS,
    CHANGE_PASSWORD,
    UPDATE_PROFILE,
    DELETE_PROFILE,
    FETCH_COLUMN_DATA
}
    from "./actions.type";
import {
    SET_AUTH,
    PURGE_AUTH,
    SET_ERROR,
    GET_USER_SET,
    SET_TOKEN,
    SET_IS_AUTH,
    SET_SUCCESS,
    CLEAR_ERROR,
} from "./mutations.type";

const state = {
    errors: null,
    user: {},
    isAuthenticated: false,
    acsesstoken: "",
};

const getters = {
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.token !== "";
    },
    getUser(state) {
        return state.getUser;
    }
};

const actions = {

    [LOGIN](context, credentials) {
        return new Promise((resolve, reject) => {
            jwt.login(payload.userDetails.email, payload.userDetails.password)
                .then(response => {
                    console.log('response :>> ', response);
                    // If there's user data in response
                    if (response.data.Data) {
                        // Navigate User to homepage
                        router.push(router.currentRoute.query.to || '/')

                        // Set accessToken
                        localStorage.setItem('accessToken', response.data.Data.token)

                        // Update user details
                        commit('UPDATE_USER_INFO', response.data.Data.user, { root: true })

                        // Set bearer token in axios
                        commit('SET_BEARER', response.data.Data.token)

                        resolve(response)
                    } else {
                        reject({ message: 'Wrong Email or Password' })
                    }

                })
                .catch(error => { reject(error) })
        })
    },
    [FETCH_COLUMN_DATA](context, credentials) {

        return new Promise((resolve, reject) => {
            axios.post("https://iapitest.eva.guru/data/sales-finances/", {
                marketplace: "Amazon.com",
                sellerId: "A2AYEFBRNOKNF9",
            }).then((response) => {
                console.log('response :>> ', response);
                commit('SET_COLUMN_CHART_DATA', response.data.Data)
                resolve(response)
            })
                .catch((error) => {
                    console.log('error :>> ', error);
                    reject(error)
                })
        })

    },
    [GET_USER](context) {
        return new Promise((resolve, reject) => {
            ApiService.get("v1/User/GetUser")
                .then(({
                    data
                }) => {
                    context.commit(GET_USER_SET, data.Data);
                    resolve(data);
                })
                .catch(({
                    response
                }) => {
                    console.log('response :>> ', response);
                    reject(response);
                });
        });
    },
    [REGISTER](context, credentials) {
        console.log('credentials :>> ', credentials);
        ApiService.post("v1/User/RegisterUser", {
            Username: credentials.UserName,
            FirstName: credentials.Name,
            Email: credentials.Email,
            PhoneNumber: credentials.Tel,
            LastName: credentials.Lastname,
            Password: credentials.Password,
            ConfirmPassword: credentials.rePassword,
            Role: credentials.Author
        }).then(_ => {
            if (_.data.IsSuccess === true) {
                this.dispatch(SETTINGS_GET_ALL_MEMBERS);
                context.commit(SET_SUCCESS, "Yeni Kullanıcı Ekleme Başarılı")
            } else if (_.data.IsSuccess === false) {
                context.commit(SET_ERROR, _.data.Errors)
            }
        })
            .catch(error => {
                console.log(`err`, error)
                context.commit(SET_ERROR, error);
            })
    },
    [CHANGE_PASSWORD](context, credentials) {
        ApiService.post("v1/User/ChangePassword", {
            OldPassword: credentials.password,
            NewPassword: credentials.newPassword
        }).then(_ => {
            console.log(`_`, _)
            if (_.data.IsSuccess === true) {
                context.commit(SET_SUCCESS, "Şifre Değiştirme Başarılı")
            } else if (_.data.IsSuccess === false) {
                context.commit(SET_ERROR, _.data.Errors)
            }
        })
            .catch(error => {
                console.log(`err`, error)
                context.commit(SET_ERROR, error);
            })
    },
    [UPDATE_PROFILE](context, credentials) {
        ApiService.post("v1/User/UpdateProfile", {
            Image: "string",
            UserName: credentials.Username,
            FirstName: credentials.FirstName,
            Email: credentials.Email,
            PhoneNumber: credentials.PhoneNumber,
            LastName: credentials.LastName,
            Role: credentials.Role
        }).then(_ => {
            if (_.data.IsSuccess === true) {
                context.commit(SET_SUCCESS, "Profil Güncelleme Başarılı")
            } else if (_.data.IsSuccess === false) {
                context.commit(SET_ERROR, _.data.Errors)
            }
        })
            .catch(error => {
                console.log(`err`, error)
                context.commit(SET_ERROR, error);
            })
    },
    [DELETE_PROFILE](context, credentials) {
        ApiService.post(`v1/User/Delete/${credentials}`).then(_ => {
            if (_.data.IsSuccess === true) {
                context.commit(SET_SUCCESS, "Profil Silme Başarılı")
            } else if (_.data.IsSuccess === false) {
                context.commit(SET_ERROR, _.data.Errors)
            }
        })
            .catch(error => {
                console.log(`err`, error)
                context.commit(SET_ERROR, error);
            })
    },
    // [CHECK_AUTH](context) {
    //     console.log("calıstı check auth")
    //     if (JwtService.getToken()) {
    //         ApiService.get("User/GetUser")
    //             .then(({
    //                 data
    //             }) => {
    //                 console.log(`data`, data)
    //                 context.commit(SET_AUTH, data.user);
    //             })
    //             .catch(({
    //                 response
    //             }) => {
    //                 context.commit(SET_ERROR, response.data.errors);
    //             });
    //     } else {
    //         context.commit(PURGE_AUTH);
    //     }
    // },
    [UPDATE_USER](context, payload) {
        const {
            email,
            username,
            password,
            image,
            bio
        } = payload;
        const user = {
            email,
            username,
            bio,
            image
        };
        if (password) {
            user.password = password;
        }
        return ApiService.put("user", user).then(({
            data
        }) => {
            context.commit(SET_AUTH, data.user);
            return data;
        });
    }
};

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [GET_USER_SET](state, item) {
        state.getUser = item;
    },
    [SET_AUTH](state, user) {
        state.token = user.Token
        state.isAuthenticated = true;
        state.user = user;
        JwtService.saveToken(state.user.Token);
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        // state.user = {};
        state.errors = {};
        localStorage.clear('areaId')
        JwtService.destroyToken();
    },
    [SET_TOKEN](state, item) {
        state.token = item
    },
    [SET_IS_AUTH](state) {
        state.isAuthenticated = false
    },
    [CLEAR_ERROR](state) {
        state.errors = false
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};