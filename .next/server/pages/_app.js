/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./lib/auth-context.tsx":
/*!******************************!*\
  !*** ./lib/auth-context.tsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _supabase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./supabase */ \"./lib/supabase.ts\");\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nfunction AuthProvider({ children }) {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [session, setSession] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Get initial session\n        _supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.getSession().then(({ data: { session } })=>{\n            setSession(session);\n            setUser(session?.user ?? null);\n            setLoading(false);\n        });\n        // Listen for auth changes\n        const { data: { subscription } } = _supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.onAuthStateChange((_event, session)=>{\n            setSession(session);\n            setUser(session?.user ?? null);\n            setLoading(false);\n        });\n        return ()=>subscription.unsubscribe();\n    }, []);\n    const signOut = async ()=>{\n        await _supabase__WEBPACK_IMPORTED_MODULE_2__.supabase.auth.signOut();\n    };\n    const value = {\n        user,\n        session,\n        loading,\n        signOut\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/grant/Desktop/PetTracker/lib/auth-context.tsx\",\n        lineNumber: 50,\n        columnNumber: 10\n    }, this);\n}\nfunction useAuth() {\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (context === undefined) {\n        throw new Error(\"useAuth must be used within an AuthProvider\");\n    }\n    return context;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvYXV0aC1jb250ZXh0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUF1RTtBQUVqQztBQVN0QyxNQUFNSyw0QkFBY0wsb0RBQWFBLENBQThCTTtBQUV4RCxTQUFTQyxhQUFhLEVBQUVDLFFBQVEsRUFBaUM7SUFDdEUsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdQLCtDQUFRQSxDQUFjO0lBQzlDLE1BQU0sQ0FBQ1EsU0FBU0MsV0FBVyxHQUFHVCwrQ0FBUUEsQ0FBaUI7SUFDdkQsTUFBTSxDQUFDVSxTQUFTQyxXQUFXLEdBQUdYLCtDQUFRQSxDQUFDO0lBRXZDRCxnREFBU0EsQ0FBQztRQUNSLHNCQUFzQjtRQUN0QkUsK0NBQVFBLENBQUNXLElBQUksQ0FBQ0MsVUFBVSxHQUFHQyxJQUFJLENBQUMsQ0FBQyxFQUFFQyxNQUFNLEVBQUVQLE9BQU8sRUFBRSxFQUFFO1lBQ3BEQyxXQUFXRDtZQUNYRCxRQUFRQyxTQUFTRixRQUFRO1lBQ3pCSyxXQUFXO1FBQ2I7UUFFQSwwQkFBMEI7UUFDMUIsTUFBTSxFQUNKSSxNQUFNLEVBQUVDLFlBQVksRUFBRSxFQUN2QixHQUFHZiwrQ0FBUUEsQ0FBQ1csSUFBSSxDQUFDSyxpQkFBaUIsQ0FBQyxDQUFDQyxRQUFRVjtZQUMzQ0MsV0FBV0Q7WUFDWEQsUUFBUUMsU0FBU0YsUUFBUTtZQUN6QkssV0FBVztRQUNiO1FBRUEsT0FBTyxJQUFNSyxhQUFhRyxXQUFXO0lBQ3ZDLEdBQUcsRUFBRTtJQUVMLE1BQU1DLFVBQVU7UUFDZCxNQUFNbkIsK0NBQVFBLENBQUNXLElBQUksQ0FBQ1EsT0FBTztJQUM3QjtJQUVBLE1BQU1DLFFBQVE7UUFDWmY7UUFDQUU7UUFDQUU7UUFDQVU7SUFDRjtJQUVBLHFCQUFPLDhEQUFDbEIsWUFBWW9CLFFBQVE7UUFBQ0QsT0FBT0E7a0JBQVFoQjs7Ozs7O0FBQzlDO0FBRU8sU0FBU2tCO0lBQ2QsTUFBTUMsVUFBVTFCLGlEQUFVQSxDQUFDSTtJQUMzQixJQUFJc0IsWUFBWXJCLFdBQVc7UUFDekIsTUFBTSxJQUFJc0IsTUFBTTtJQUNsQjtJQUNBLE9BQU9EO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kb2ctYm91bmRhcnktdHJhY2tlci8uL2xpYi9hdXRoLWNvbnRleHQudHN4P2M5NzIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgVXNlciwgU2Vzc2lvbiB9IGZyb20gXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIjtcbmltcG9ydCB7IHN1cGFiYXNlIH0gZnJvbSBcIi4vc3VwYWJhc2VcIjtcblxudHlwZSBBdXRoQ29udGV4dFR5cGUgPSB7XG4gIHVzZXI6IFVzZXIgfCBudWxsO1xuICBzZXNzaW9uOiBTZXNzaW9uIHwgbnVsbDtcbiAgbG9hZGluZzogYm9vbGVhbjtcbiAgc2lnbk91dDogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbn07XG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxBdXRoQ29udGV4dFR5cGUgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBBdXRoUHJvdmlkZXIoeyBjaGlsZHJlbiB9OiB7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZTxVc2VyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZXNzaW9uLCBzZXRTZXNzaW9uXSA9IHVzZVN0YXRlPFNlc3Npb24gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBHZXQgaW5pdGlhbCBzZXNzaW9uXG4gICAgc3VwYWJhc2UuYXV0aC5nZXRTZXNzaW9uKCkudGhlbigoeyBkYXRhOiB7IHNlc3Npb24gfSB9KSA9PiB7XG4gICAgICBzZXRTZXNzaW9uKHNlc3Npb24pO1xuICAgICAgc2V0VXNlcihzZXNzaW9uPy51c2VyID8/IG51bGwpO1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfSk7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIGF1dGggY2hhbmdlc1xuICAgIGNvbnN0IHtcbiAgICAgIGRhdGE6IHsgc3Vic2NyaXB0aW9uIH0sXG4gICAgfSA9IHN1cGFiYXNlLmF1dGgub25BdXRoU3RhdGVDaGFuZ2UoKF9ldmVudCwgc2Vzc2lvbikgPT4ge1xuICAgICAgc2V0U2Vzc2lvbihzZXNzaW9uKTtcbiAgICAgIHNldFVzZXIoc2Vzc2lvbj8udXNlciA/PyBudWxsKTtcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2lnbk91dCA9IGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBzdXBhYmFzZS5hdXRoLnNpZ25PdXQoKTtcbiAgfTtcblxuICBjb25zdCB2YWx1ZSA9IHtcbiAgICB1c2VyLFxuICAgIHNlc3Npb24sXG4gICAgbG9hZGluZyxcbiAgICBzaWduT3V0LFxuICB9O1xuXG4gIHJldHVybiA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT57Y2hpbGRyZW59PC9BdXRoQ29udGV4dC5Qcm92aWRlcj47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VBdXRoKCkge1xuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChBdXRoQ29udGV4dCk7XG4gIGlmIChjb250ZXh0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VBdXRoIG11c3QgYmUgdXNlZCB3aXRoaW4gYW4gQXV0aFByb3ZpZGVyXCIpO1xuICB9XG4gIHJldHVybiBjb250ZXh0O1xufVxuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJzdXBhYmFzZSIsIkF1dGhDb250ZXh0IiwidW5kZWZpbmVkIiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ1c2VyIiwic2V0VXNlciIsInNlc3Npb24iLCJzZXRTZXNzaW9uIiwibG9hZGluZyIsInNldExvYWRpbmciLCJhdXRoIiwiZ2V0U2Vzc2lvbiIsInRoZW4iLCJkYXRhIiwic3Vic2NyaXB0aW9uIiwib25BdXRoU3RhdGVDaGFuZ2UiLCJfZXZlbnQiLCJ1bnN1YnNjcmliZSIsInNpZ25PdXQiLCJ2YWx1ZSIsIlByb3ZpZGVyIiwidXNlQXV0aCIsImNvbnRleHQiLCJFcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./lib/auth-context.tsx\n");

/***/ }),

/***/ "./lib/supabase.ts":
/*!*************************!*\
  !*** ./lib/supabase.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst supabaseUrl = \"https://fipxnqsreazxexlemojq.supabase.co\";\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpcHhucXNyZWF6eGV4bGVtb2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5Njk1NTYsImV4cCI6MjA3ODU0NTU1Nn0.s29v5AK8_ao6B6x4JcN5lK6WFljyHHiC5jXBxFpZWhM\";\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvc3VwYWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXFEO0FBRXJELE1BQU1DLGNBQWNDLDBDQUFvQztBQUN4RCxNQUFNRyxrQkFBa0JILGtOQUF5QztBQUUxRCxNQUFNSyxXQUFXUCxtRUFBWUEsQ0FBQ0MsYUFBYUksaUJBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG9nLWJvdW5kYXJ5LXRyYWNrZXIvLi9saWIvc3VwYWJhc2UudHM/Yzk5ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwiQHN1cGFiYXNlL3N1cGFiYXNlLWpzXCI7XG5cbmNvbnN0IHN1cGFiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMITtcbmNvbnN0IHN1cGFiYXNlQW5vbktleSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZITtcblxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlID0gY3JlYXRlQ2xpZW50KHN1cGFiYXNlVXJsLCBzdXBhYmFzZUFub25LZXkpO1xuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsInN1cGFiYXNlQW5vbktleSIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIiwic3VwYWJhc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./lib/supabase.ts\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth-context */ \"./lib/auth-context.tsx\");\n\n\n\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_lib_auth_context__WEBPACK_IMPORTED_MODULE_2__.AuthProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/Users/grant/Desktop/PetTracker/pages/_app.tsx\",\n            lineNumber: 8,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/grant/Desktop/PetTracker/pages/_app.tsx\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQThCO0FBRW9CO0FBRW5DLFNBQVNDLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDNUQscUJBQ0UsOERBQUNILDJEQUFZQTtrQkFDWCw0RUFBQ0U7WUFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7OztBQUc5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2RvZy1ib3VuZGFyeS10cmFja2VyLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJAL3N0eWxlcy9nbG9iYWxzLmNzc1wiO1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gXCJuZXh0L2FwcFwiO1xuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSBcIkAvbGliL2F1dGgtY29udGV4dFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxBdXRoUHJvdmlkZXI+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9BdXRoUHJvdmlkZXI+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiQXV0aFByb3ZpZGVyIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();