const users: string = "users";
const months: string = "months";
const stocks: string = "stocks";
const posts: string = "posts";
const comment: string = "comment"

export const environment = {
  production: true,
  apiUrl: 'https://klasinky.pythonanywhere.com/api',
  endpoints: {
    auth: {
      register: users + "/register",
      login: users + "/login",
      profile: users + "/me",
      changePassword: users + "/me" + "/changepassword"
    },
    currency: {
      all: 'currencies'
    },
    months: {
      all: months + "/all",
      create: "/" + months,
      viewset: months + "/"
    },
    category: {
      all: "categories" + "/all"
    },
    amountBase: {
      create: {
        start: months + "/",
        end: "/create/"
      },
      import: {
        start: months + "/",
        end: "/import/"
      },
      export: {
        start: months + "/",
        end: "/export/"
      }
    },
    stocks: {
      list: stocks,
      all: stocks + "/all",
      viewset: stocks + "/"
    },
    posts: {
      create: posts,
      viewset: posts + "/",
      finish: {
        start: posts + "/",
        end: "/finished"
      },
      like: {
        start: posts + "/",
        end: "/like"
      }
    },
    comments: {
      create: {
        start: posts  + "/",
        end: "/" + comment
      },
      delete: {
        start: comment  + "/",
        end: "/delete"
      },
      list: {
        start: posts  + "/",
        end: "/" + comment + "/all"
      },
      like: {
        start: comment  + "/",
        end: "/like"
      },
      answer: {
        start: posts  + "/",
        end: "/" + comment
      }
    }
  }

};
