import 'jquery/dist/jquery.min.js';
/* LODASH */
import 'babel-polyfill/dist/polyfill.min.js';
import 'whatwg-fetch';
import 'moment/min/moment.min.js';
import 'numeral/min/numeral.min.js';

import V from 'vue/dist/vue.esm.js';
window.Vue = V;

import H from 'hogan.js/dist/template-3.0.2.min.js';
window.Hogan = H;

import U from 'url-search-params/build/url-search-params.node.js';
window.URLSearchParams = window.URLSearchParams || U;
