import { createLogger, createStore } from "vuex";

const store = createStore({
    state() {
        return {
            cskh: {
                url: "",
            },
            profile: {
                username: "",
                email: "",
                phone: "",
                role: "",
            },
        };
    },
    mutations: {
        setCskh(state, cskh) {
            state.cskh = cskh;
        },
        setProfile(state, profile) {
            state.profile = profile;
        },
    },
    actions: {
        setCskh(context, cskh) {
            context.commit("setCskh", cskh);
        }
    },
    plugins: import.meta.env.MODE !== "production" ? [createLogger()] : [],
});

export default store;