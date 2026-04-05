const INVALID_TOKENS = ["", "null", "undefined"];

const extractFromJsonString = (value) => {
    if (!(value.startsWith("{") && value.endsWith("}"))) return value;
    try {
        const parsed = JSON.parse(value);
        if (parsed && typeof parsed === "object" && typeof parsed.token === "string") {
            return parsed.token;
        }
    } catch (err) {}
    return value;
};

const stripBearerPrefix = (value) => value.replace(/^Bearer\s+/i, "");

const normalizeToken = (value) => {
    if (typeof value !== "string") return "";
    let trimmed = value.trim();
    if (INVALID_TOKENS.includes(trimmed)) return "";

    if (
        (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
        trimmed = trimmed.slice(1, -1).trim();
    }

    trimmed = extractFromJsonString(trimmed).trim();
    trimmed = stripBearerPrefix(trimmed).trim();
    if (INVALID_TOKENS.includes(trimmed)) return "";

    const tokenParts = trimmed.split(".");
    if (tokenParts.length !== 3 || tokenParts.some(part => !part)) return "";

    return trimmed;
};

const getAuthToken = () => normalizeToken(localStorage.getItem("solyd_floors:token"));

export default getAuthToken;
