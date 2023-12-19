import {message} from "antd";

export const $A = (type, payload) => ({
  type,
  payload
});

export const TOKEN = "news-feed-token";

export const DEFAULT_HEADERS = () => {
  return {
    brand: "News Feed"
  };
};

export const showErrorMessage = (error, fallbackMessage = "Something went wrong", messagePrefix = "", duration) => {
  const msg = error && error.message ? error.message : error ? error : fallbackMessage;
  message.error(messagePrefix + msg, duration);
};

export const showWarningMessage = (text = "Something went wrong", duration) => message.warning(text, duration);

export const showSuccessMessage = (text = "Success", duration) => message.success(text, duration);

export const updateQueryString = ({key, value, customUrl, resetPage}) => {
  let url = customUrl || window.location.pathname + window.location.search;
  if (!key) return url;
  var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi");
  if (resetPage) url = updateQueryString({key: "page", value: 1, customUrl: url});
  if (re.test(url)) {
    if ([undefined, null, ""].includes(value)) {
      return url.replace(re, "$1$3").replace(/(&|\?)$/, "");
    }
    return url.replace(re, "$1" + key + "=" + value + "$2$3");
  } else {
    if ([undefined, null, ""].includes(value)) return url;
    var separator = url.indexOf("?") !== -1 ? "&" : "?";
    return url + separator + key + "=" + value;
  }
};

export const capitilaze = (str) => {
  return (
    str
      ?.split(" ")
      .reduce((aggStr, word) => aggStr + " " + word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(), "") || ""
  );
};

export const prepareFilter = (str) => {
  const trimmed = str?.trim();
  if (!trimmed) return "";
  return `(${trimmed.replace(" ", "|").replace(/[^a-zA-Z0-9-|\\.]/g, "")})`;
};
