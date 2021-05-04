// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const users: string = "users";
const months: string = "months";
const stocks: string = "stocks";
const posts: string = "posts";
const comment: string = "comment"

export const environment = {
  production: false,
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
      viewset: months + "/",
      amount: {
        start: months + "/",
        end: "/amounts"
      }
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



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
