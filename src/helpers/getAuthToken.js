const INVALID_TOKENS = ["", "null", "undefined"];

const normalizeToken = (value) => {
    if (typeof value !== "string") return "";
    const trimmed = value.trim();
    if (INVALID_TOKENS.includes(trimmed)) return "";

    if (
        (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
        const unwrapped = trimmed.slice(1, -1).trim();
        return INVALID_TOKENS.includes(unwrapped) ? "" : unwrapped;
    }

    return trimmed;
};

const getAuthToken = () => normalizeToken(localStorage.getItem("solyd_floors:token"));

export default getAuthToken;
