import Vue from "vue";
import axios from "axios";
import JwtService from "@/common/jwt.service";
import {
    API_URL
} from "@/common/config";
import VueAxios from 'vue-axios'

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${JwtService.getToken()}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['x-area'] = `${localStorage.getItem('areaId')}`;
        axios.defaults.headers.get['x-area'] = `${localStorage.getItem('areaId')}`;
        axios.defaults.headers.put['x-area'] = `${localStorage.getItem('areaId')}`;
    },

    query(resource, params) {
        return Vue.axios.get(resource, params).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    get(resource) {
        return Vue.axios.get(`${resource}`, this.setHeader()).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}`, params, this.setHeader());
    },

    update(resource, params) {
        return Vue.axios.put(`${resource}`, params, this.setHeader());
    },

    put(resource, params) {
        return Vue.axios.put(`${resource}`, params, this.setHeader());
    },

    delete(resource) {
        return Vue.axios.delete(resource, this.setHeader()).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }
};

export default ApiService;

export const TagsService = {
    get() {
        return ApiService.get("tags");
    }
};

export const ArticlesService = {
    query(type, params) {
        return ApiService.query("articles" + (type === "feed" ? "/feed" : ""), {
            params: params
        });
    },
    get(slug) {
        return ApiService.get("articles", slug);
    },
    create(params) {
        return ApiService.post("articles", {
            article: params
        });
    },
    update(slug, params) {
        return ApiService.update("articles", slug, {
            article: params
        });
    },
    destroy(slug) {
        return ApiService.delete(`articles/${slug}`);
    }
};

export const CommentsService = {
    get(slug) {
        if (typeof slug !== "string") {
            throw new Error(
                "[RWV] CommentsService.get() article slug required to fetch comments"
            );
        }
        return ApiService.get("articles", `${slug}/comments`);
    },

    post(slug, payload) {
        return ApiService.post(`articles/${slug}/comments`, {
            comment: {
                body: payload
            }
        });
    },

    destroy(slug, commentId) {
        return ApiService.delete(`articles/${slug}/comments/${commentId}`);
    }
};

export const FavoriteService = {
    add(slug) {
        return ApiService.post(`articles/${slug}/favorite`);
    },
    remove(slug) {
        return ApiService.delete(`articles/${slug}/favorite`);
    }
};

export const CompanyEntryService = {
    post(slug, payload) {
        return ApiService.post(`Company/${slug}/Entry`, {
            comment: {
                body: payload
            }
        });
    },
    remove(slug) {
        return ApiService.delete(`Company/${slug}/Update`);
    }
}