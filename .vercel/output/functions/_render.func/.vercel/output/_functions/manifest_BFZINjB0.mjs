import { Z as bold, _ as red, $ as yellow, a0 as dim, a1 as blue } from './chunks/astro_CmaGI-iH.mjs';
import 'clsx';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.5.16_typescript@5.4.4/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"var l=\"@vercel/speed-insights\",f=\"1.0.10\",v=()=>{window.si||(window.si=function(...n){(window.siq=window.siq||[]).push(n)})};function w(){return typeof window<\"u\"}function p(){try{const e=\"production\"}catch{}return\"production\"}function c(){return p()===\"development\"}function m(e,n){if(!e||!n)return e;let r=e;try{for(const[s,i]of Object.entries(n)){const t=Array.isArray(i),o=t?i.join(\"/\"):i,u=t?`...${s}`:s,a=new RegExp(`/${S(o)}(?=[/?#]|$)`);a.test(r)&&(r=r.replace(a,`/[${u}]`))}return r}catch{return e}}function S(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,\"\\\\$&\")}var d=\"https://va.vercel-scripts.com/v1/speed-insights\",h=`${d}/script.js`,g=`${d}/script.debug.js`,R=\"/_vercel/speed-insights/script.js\";function y(e={}){var n;if(!w()||e.route===null)return null;v();const s=!!e.dsn?h:R,i=e.scriptSrc||(c()?g:s);if(document.head.querySelector(`script[src*=\"${i}\"]`))return null;e.beforeSend&&((n=window.si)==null||n.call(window,\"beforeSend\",e.beforeSend));const t=document.createElement(\"script\");return t.src=i,t.defer=!0,t.dataset.sdkn=l+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=f,e.sampleRate&&(t.dataset.sampleRate=e.sampleRate.toString()),e.route&&(t.dataset.route=e.route),e.endpoint&&(t.dataset.endpoint=e.endpoint),e.dsn&&(t.dataset.dsn=e.dsn),c()&&e.debug===!1&&(t.dataset.debug=\"false\"),t.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${i}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(t),{setRoute:o=>{t.dataset.route=o??void 0}}}customElements.define(\"vercel-speed-insights\",class extends HTMLElement{constructor(){super();try{const n=JSON.parse(this.dataset.props??\"{}\"),r=JSON.parse(this.dataset.params??\"{}\"),s=m(this.dataset.pathname??\"\",r);y({route:s,...n,framework:\"astro\",beforeSend:window.speedInsightsBeforeSend})}catch(n){throw new Error(`Failed to parse SpeedInsights properties: ${n}`)}}});\n"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/_slug_.C8Y318tw.css"},{"type":"external","src":"/_astro/layout.CNSc0IXU.css"}],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"var l=\"@vercel/speed-insights\",f=\"1.0.10\",v=()=>{window.si||(window.si=function(...n){(window.siq=window.siq||[]).push(n)})};function w(){return typeof window<\"u\"}function p(){try{const e=\"production\"}catch{}return\"production\"}function c(){return p()===\"development\"}function m(e,n){if(!e||!n)return e;let r=e;try{for(const[s,i]of Object.entries(n)){const t=Array.isArray(i),o=t?i.join(\"/\"):i,u=t?`...${s}`:s,a=new RegExp(`/${S(o)}(?=[/?#]|$)`);a.test(r)&&(r=r.replace(a,`/[${u}]`))}return r}catch{return e}}function S(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,\"\\\\$&\")}var d=\"https://va.vercel-scripts.com/v1/speed-insights\",h=`${d}/script.js`,g=`${d}/script.debug.js`,R=\"/_vercel/speed-insights/script.js\";function y(e={}){var n;if(!w()||e.route===null)return null;v();const s=!!e.dsn?h:R,i=e.scriptSrc||(c()?g:s);if(document.head.querySelector(`script[src*=\"${i}\"]`))return null;e.beforeSend&&((n=window.si)==null||n.call(window,\"beforeSend\",e.beforeSend));const t=document.createElement(\"script\");return t.src=i,t.defer=!0,t.dataset.sdkn=l+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=f,e.sampleRate&&(t.dataset.sampleRate=e.sampleRate.toString()),e.route&&(t.dataset.route=e.route),e.endpoint&&(t.dataset.endpoint=e.endpoint),e.dsn&&(t.dataset.dsn=e.dsn),c()&&e.debug===!1&&(t.dataset.debug=\"false\"),t.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${i}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(t),{setRoute:o=>{t.dataset.route=o??void 0}}}customElements.define(\"vercel-speed-insights\",class extends HTMLElement{constructor(){super();try{const n=JSON.parse(this.dataset.props??\"{}\"),r=JSON.parse(this.dataset.params??\"{}\"),s=m(this.dataset.pathname??\"\",r);y({route:s,...n,framework:\"astro\",beforeSend:window.speedInsightsBeforeSend})}catch(n){throw new Error(`Failed to parse SpeedInsights properties: ${n}`)}}});\n"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/_slug_.C8Y318tw.css"},{"type":"external","src":"/_astro/layout.CNSc0IXU.css"}],"routeData":{"route":"/blog/[...slug]","isIndex":false,"type":"page","pattern":"^\\/blog(?:\\/(.*?))?\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/blog/[...slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"var l=\"@vercel/speed-insights\",f=\"1.0.10\",v=()=>{window.si||(window.si=function(...n){(window.siq=window.siq||[]).push(n)})};function w(){return typeof window<\"u\"}function p(){try{const e=\"production\"}catch{}return\"production\"}function c(){return p()===\"development\"}function m(e,n){if(!e||!n)return e;let r=e;try{for(const[s,i]of Object.entries(n)){const t=Array.isArray(i),o=t?i.join(\"/\"):i,u=t?`...${s}`:s,a=new RegExp(`/${S(o)}(?=[/?#]|$)`);a.test(r)&&(r=r.replace(a,`/[${u}]`))}return r}catch{return e}}function S(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,\"\\\\$&\")}var d=\"https://va.vercel-scripts.com/v1/speed-insights\",h=`${d}/script.js`,g=`${d}/script.debug.js`,R=\"/_vercel/speed-insights/script.js\";function y(e={}){var n;if(!w()||e.route===null)return null;v();const s=!!e.dsn?h:R,i=e.scriptSrc||(c()?g:s);if(document.head.querySelector(`script[src*=\"${i}\"]`))return null;e.beforeSend&&((n=window.si)==null||n.call(window,\"beforeSend\",e.beforeSend));const t=document.createElement(\"script\");return t.src=i,t.defer=!0,t.dataset.sdkn=l+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=f,e.sampleRate&&(t.dataset.sampleRate=e.sampleRate.toString()),e.route&&(t.dataset.route=e.route),e.endpoint&&(t.dataset.endpoint=e.endpoint),e.dsn&&(t.dataset.dsn=e.dsn),c()&&e.debug===!1&&(t.dataset.debug=\"false\"),t.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${i}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(t),{setRoute:o=>{t.dataset.route=o??void 0}}}customElements.define(\"vercel-speed-insights\",class extends HTMLElement{constructor(){super();try{const n=JSON.parse(this.dataset.props??\"{}\"),r=JSON.parse(this.dataset.params??\"{}\"),s=m(this.dataset.pathname??\"\",r);y({route:s,...n,framework:\"astro\",beforeSend:window.speedInsightsBeforeSend})}catch(n){throw new Error(`Failed to parse SpeedInsights properties: ${n}`)}}});\n"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/_slug_.C8Y318tw.css"},{"type":"external","src":"/_astro/layout.CNSc0IXU.css"}],"routeData":{"route":"/layout","isIndex":false,"type":"page","pattern":"^\\/layout\\/?$","segments":[[{"content":"layout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/layout.astro","pathname":"/layout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"var l=\"@vercel/speed-insights\",f=\"1.0.10\",v=()=>{window.si||(window.si=function(...n){(window.siq=window.siq||[]).push(n)})};function w(){return typeof window<\"u\"}function p(){try{const e=\"production\"}catch{}return\"production\"}function c(){return p()===\"development\"}function m(e,n){if(!e||!n)return e;let r=e;try{for(const[s,i]of Object.entries(n)){const t=Array.isArray(i),o=t?i.join(\"/\"):i,u=t?`...${s}`:s,a=new RegExp(`/${S(o)}(?=[/?#]|$)`);a.test(r)&&(r=r.replace(a,`/[${u}]`))}return r}catch{return e}}function S(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,\"\\\\$&\")}var d=\"https://va.vercel-scripts.com/v1/speed-insights\",h=`${d}/script.js`,g=`${d}/script.debug.js`,R=\"/_vercel/speed-insights/script.js\";function y(e={}){var n;if(!w()||e.route===null)return null;v();const s=!!e.dsn?h:R,i=e.scriptSrc||(c()?g:s);if(document.head.querySelector(`script[src*=\"${i}\"]`))return null;e.beforeSend&&((n=window.si)==null||n.call(window,\"beforeSend\",e.beforeSend));const t=document.createElement(\"script\");return t.src=i,t.defer=!0,t.dataset.sdkn=l+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=f,e.sampleRate&&(t.dataset.sampleRate=e.sampleRate.toString()),e.route&&(t.dataset.route=e.route),e.endpoint&&(t.dataset.endpoint=e.endpoint),e.dsn&&(t.dataset.dsn=e.dsn),c()&&e.debug===!1&&(t.dataset.debug=\"false\"),t.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${i}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(t),{setRoute:o=>{t.dataset.route=o??void 0}}}customElements.define(\"vercel-speed-insights\",class extends HTMLElement{constructor(){super();try{const n=JSON.parse(this.dataset.props??\"{}\"),r=JSON.parse(this.dataset.params??\"{}\"),s=m(this.dataset.pathname??\"\",r);y({route:s,...n,framework:\"astro\",beforeSend:window.speedInsightsBeforeSend})}catch(n){throw new Error(`Failed to parse SpeedInsights properties: ${n}`)}}});\n"},{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/_slug_.C8Y318tw.css"},{"type":"external","src":"/_astro/layout.CNSc0IXU.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://yashd.tech/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/home/yashd-dev/Documents/hehe/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/home/yashd-dev/Documents/hehe/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/yashd-dev/Documents/hehe/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/home/yashd-dev/Documents/hehe/src/pages/layout.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/layout.astro":"chunks/pages/layout_BAt1wj08.mjs","\u0000@astrojs-manifest":"manifest_BFZINjB0.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.5.16_typescript@5.4.4/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_CpzrH3S-.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"chunks/index_DwYLb8E7.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"chunks/_.._C9WdwREP.mjs","\u0000@astro-page:src/pages/layout@_@astro":"chunks/layout_BYnWpINC.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_xsv6sL6-.mjs","/home/yashd-dev/Documents/hehe/node_modules/.pnpm/@astrojs+vercel@7.5.2_astro@4.5.16/node_modules/@astrojs/vercel/dist/image/build-service.js":"chunks/build-service_BEAsqaJd.mjs","/home/yashd-dev/Documents/hehe/src/content/posts/thoughts-on-going-about-in-tech.md?astroContentCollectionEntry=true":"chunks/thoughts-on-going-about-in-tech_DfU10KLM.mjs","/home/yashd-dev/Documents/hehe/src/content/posts/thoughts-on-going-about-in-tech.md?astroPropagatedAssets":"chunks/thoughts-on-going-about-in-tech_4BbAz2M0.mjs","/home/yashd-dev/Documents/hehe/src/content/posts/thoughts-on-going-about-in-tech.md":"chunks/thoughts-on-going-about-in-tech_Dqzsgr6K.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.CQysFmpR.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/black..B9seynJ8.jpg","/_astro/logo.D2e32l9u.png","/_astro/PFE-Logo.H80X4Lrt.png","/_astro/RPS Screenshot.CkkM2DfD.png","/_astro/chatapp.DkFxm_hy.jpeg","/_astro/aws.CZaueDkG.svg","/_astro/white.C4EOam4b.jpg","/_astro/_slug_.C8Y318tw.css","/_astro/layout.CNSc0IXU.css","/favicon.ico","/favicon.svg","/preview.png","/images/RPS-Screenshot.png","/images/hand-landmarks.png","/images/handlocations.png","/images/handtip.png","/images/initials.png","/images/matrix.png","/images/preview.png","/images/rgb.png","/images/white.jpg","/og/thoughts-on-going-about-in-tech.png"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
